import { storage } from './storage';

export interface AnalyticsData {
  userId: number;
  totalQuestions: number;
  correctAnswers: number;
  accuracyRate: number;
  averageTimePerQuestion: number;
  studyStreak: number;
  specialtyBreakdown: Record<string, {
    total: number;
    correct: number;
    accuracy: number;
    weaknessScore: number;
    improvementTrend: number;
  }>;
  weeklyProgress: {
    questionsThisWeek: number;
    accuracyThisWeek: number;
    timeStudiedThisWeek: number;
  };
  recommendations: string[];
  achievements: Array<{
    id: number;
    name: string;
    description: string;
    unlockedAt: Date;
    category: string;
    points: number;
  }>;
}

export interface LeaderboardEntry {
  userId: number;
  username: string;
  country: string;
  city: string;
  flagEmoji: string;
  totalScore: number;
  questionsAnswered: number;
  correctAnswers: number;
  accuracyRate: number;
  studyStreak: number;
  rank: number;
  countryRank: number;
}

export interface WeeklyLeaderboardEntry {
  userId: number;
  username: string;
  country: string;
  flagEmoji: string;
  questionsThisWeek: number;
  correctThisWeek: number;
  studyTimeThisWeek: number;
  weeklyRank: number;
  countryWeeklyRank: number;
}

export class AnalyticsEngine {
  
  async calculateUserAnalytics(userId: number): Promise<AnalyticsData> {
    try {
      // Get user progress data
      const userProgress = await storage.getUserProgress(userId);
      const performanceMetrics = await storage.getPerformanceMetrics(userId);
      const achievements = await storage.getUserAchievements(userId);
      
      // Calculate overall stats
      const totalQuestions = userProgress.length;
      const correctAnswers = userProgress.filter(p => p.isCorrect).length;
      const accuracyRate = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;
      const averageTimePerQuestion = totalQuestions > 0 
        ? userProgress.reduce((sum, p) => sum + p.timeSpent, 0) / totalQuestions 
        : 0;

      // Calculate specialty breakdown
      const specialtyBreakdown: Record<string, any> = {};
      const specialtyGroups = this.groupBySpecialty(userProgress);
      
      for (const [specialty, questions] of Object.entries(specialtyGroups)) {
        const total = questions.length;
        const correct = questions.filter(q => q.isCorrect).length;
        const accuracy = total > 0 ? (correct / total) * 100 : 0;
        
        // Find performance metrics for this specialty
        const metrics = performanceMetrics.find(m => m.specialty === specialty);
        
        specialtyBreakdown[specialty] = {
          total,
          correct,
          accuracy,
          weaknessScore: metrics?.weaknessScore || 0,
          improvementTrend: metrics?.improvementTrend || 0
        };
      }

      // Calculate weekly progress
      const weekStart = this.getWeekStart();
      const weeklyProgress = await this.calculateWeeklyProgress(userId, weekStart);
      
      // Generate recommendations
      const recommendations = this.generateRecommendations(specialtyBreakdown, accuracyRate);
      
      // Get user streak
      const user = await storage.getUserById(userId);
      const studyStreak = user?.studyStreak || 0;

      return {
        userId,
        totalQuestions,
        correctAnswers,
        accuracyRate,
        averageTimePerQuestion,
        studyStreak,
        specialtyBreakdown,
        weeklyProgress,
        recommendations,
        achievements: achievements.map(a => ({
          id: a.achievement.id,
          name: a.achievement.name,
          description: a.achievement.description,
          unlockedAt: a.unlockedAt,
          category: a.achievement.category,
          points: a.achievement.points
        }))
      };
    } catch (error) {
      console.error('Error calculating user analytics:', error);
      throw error;
    }
  }

  async getGlobalLeaderboard(limit: number = 50): Promise<LeaderboardEntry[]> {
    try {
      return await storage.getGlobalLeaderboard(limit);
    } catch (error) {
      console.error('Error fetching global leaderboard:', error);
      throw error;
    }
  }

  async getWeeklyLeaderboard(limit: number = 50): Promise<WeeklyLeaderboardEntry[]> {
    try {
      const weekStart = this.getWeekStart();
      return await storage.getWeeklyLeaderboard(weekStart, limit);
    } catch (error) {
      console.error('Error fetching weekly leaderboard:', error);
      throw error;
    }
  }

  async updatePerformanceMetrics(userId: number, questionData: any): Promise<void> {
    try {
      const specialty = questionData.category || 'general';
      
      // Get existing metrics
      let metrics = await storage.getPerformanceMetricsBySpecialty(userId, specialty);
      
      if (!metrics) {
        // Create new metrics entry
        metrics = {
          userId,
          specialty,
          totalQuestions: 0,
          correctAnswers: 0,
          averageTimePerQuestion: 0,
          difficultyLevel: 'intermediate',
          weaknessScore: 0,
          improvementTrend: 0
        };
      }

      // Update metrics
      const newTotal = metrics.totalQuestions + 1;
      const newCorrect = metrics.correctAnswers + (questionData.isCorrect ? 1 : 0);
      const newAccuracy = (newCorrect / newTotal) * 100;
      
      // Calculate weakness score (inverse of accuracy with time penalty)
      const timePenalty = questionData.timeSpent > 120 ? 0.1 : 0; // 2 minutes threshold
      const weaknessScore = Math.max(0, (100 - newAccuracy) / 100 + timePenalty);
      
      // Calculate improvement trend (simplified)
      const previousAccuracy = metrics.totalQuestions > 0 
        ? (metrics.correctAnswers / metrics.totalQuestions) * 100 
        : 50;
      const improvementTrend = (newAccuracy - previousAccuracy) / 100;

      const updatedMetrics = {
        ...metrics,
        totalQuestions: newTotal,
        correctAnswers: newCorrect,
        averageTimePerQuestion: ((metrics.averageTimePerQuestion * metrics.totalQuestions) + questionData.timeSpent) / newTotal,
        weaknessScore,
        improvementTrend: Math.max(-1, Math.min(1, improvementTrend))
      };

      await storage.updatePerformanceMetrics(userId, specialty, updatedMetrics);
      
      // Update global leaderboard
      await this.updateGlobalLeaderboard(userId);
      
      // Update weekly leaderboard
      await this.updateWeeklyLeaderboard(userId);
      
      // Check for new achievements
      await this.checkAchievements(userId, updatedMetrics);
      
    } catch (error) {
      console.error('Error updating performance metrics:', error);
      throw error;
    }
  }

  private async updateGlobalLeaderboard(userId: number): Promise<void> {
    try {
      const analytics = await this.calculateUserAnalytics(userId);
      const user = await storage.getUserById(userId);
      
      if (!user) return;

      const score = this.calculateGlobalScore(analytics);
      
      await storage.updateGlobalLeaderboard({
        userId,
        totalScore: score,
        questionsAnswered: analytics.totalQuestions,
        correctAnswers: analytics.correctAnswers,
        accuracyRate: analytics.accuracyRate,
        studyStreak: analytics.studyStreak,
        totalStudyTime: Math.floor(analytics.averageTimePerQuestion * analytics.totalQuestions / 60),
        plabCategory: 'plab1',
        rank: 0, // Will be calculated separately
        countryRank: 0 // Will be calculated separately
      });
      
    } catch (error) {
      console.error('Error updating global leaderboard:', error);
    }
  }

  private async updateWeeklyLeaderboard(userId: number): Promise<void> {
    try {
      const weekStart = this.getWeekStart();
      const weekEnd = this.getWeekEnd();
      const weeklyProgress = await this.calculateWeeklyProgress(userId, weekStart);
      
      await storage.updateWeeklyLeaderboard({
        userId,
        weekStart: weekStart.toISOString().split('T')[0],
        weekEnd: weekEnd.toISOString().split('T')[0],
        questionsThisWeek: weeklyProgress.questionsThisWeek,
        correctThisWeek: Math.floor(weeklyProgress.questionsThisWeek * (weeklyProgress.accuracyThisWeek / 100)),
        studyTimeThisWeek: weeklyProgress.timeStudiedThisWeek,
        weeklyRank: 0, // Will be calculated separately
        countryWeeklyRank: 0 // Will be calculated separately
      });
      
    } catch (error) {
      console.error('Error updating weekly leaderboard:', error);
    }
  }

  private async checkAchievements(userId: number, metrics: any): Promise<void> {
    try {
      const existingAchievements = await storage.getUserAchievements(userId);
      const existingIds = existingAchievements.map(a => a.achievementId);
      
      // Check for accuracy achievements
      if (metrics.totalQuestions >= 50 && (metrics.correctAnswers / metrics.totalQuestions) >= 0.9 && !existingIds.includes(1)) {
        await storage.awardAchievement(userId, 1); // 90% accuracy with 50+ questions
      }
      
      // Check for consistency achievements
      if (metrics.totalQuestions >= 100 && !existingIds.includes(2)) {
        await storage.awardAchievement(userId, 2); // 100 questions completed
      }
      
      // Check for specialty mastery
      if ((metrics.correctAnswers / metrics.totalQuestions) >= 0.85 && metrics.totalQuestions >= 30 && !existingIds.includes(3)) {
        await storage.awardAchievement(userId, 3); // Specialty mastery
      }
      
    } catch (error) {
      console.error('Error checking achievements:', error);
    }
  }

  private calculateGlobalScore(analytics: AnalyticsData): number {
    const accuracyBonus = analytics.accuracyRate * 10;
    const volumeBonus = Math.min(analytics.totalQuestions * 2, 1000);
    const streakBonus = analytics.studyStreak * 50;
    const speedBonus = analytics.averageTimePerQuestion < 90 ? 200 : 0;
    
    return Math.floor(accuracyBonus + volumeBonus + streakBonus + speedBonus);
  }

  private groupBySpecialty(progress: any[]): Record<string, any[]> {
    const groups: Record<string, any[]> = {};
    
    for (const item of progress) {
      const specialty = item.category || 'general';
      if (!groups[specialty]) {
        groups[specialty] = [];
      }
      groups[specialty].push(item);
    }
    
    return groups;
  }

  private async calculateWeeklyProgress(userId: number, weekStart: Date): Promise<{
    questionsThisWeek: number;
    accuracyThisWeek: number;
    timeStudiedThisWeek: number;
  }> {
    try {
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 7);
      
      const weeklyProgress = await storage.getWeeklyProgress(userId, weekStart, weekEnd);
      
      return {
        questionsThisWeek: weeklyProgress.length,
        accuracyThisWeek: weeklyProgress.length > 0 
          ? (weeklyProgress.filter(p => p.isCorrect).length / weeklyProgress.length) * 100 
          : 0,
        timeStudiedThisWeek: Math.floor(weeklyProgress.reduce((sum, p) => sum + p.timeSpent, 0) / 60)
      };
    } catch (error) {
      console.error('Error calculating weekly progress:', error);
      return {
        questionsThisWeek: 0,
        accuracyThisWeek: 0,
        timeStudiedThisWeek: 0
      };
    }
  }

  private generateRecommendations(specialtyBreakdown: Record<string, any>, overallAccuracy: number): string[] {
    const recommendations: string[] = [];
    
    // Find weak specialties
    const weakSpecialties = Object.entries(specialtyBreakdown)
      .filter(([_, data]) => data.accuracy < 70 && data.total >= 5)
      .sort((a, b) => a[1].accuracy - b[1].accuracy)
      .slice(0, 3);
    
    if (weakSpecialties.length > 0) {
      recommendations.push(`Focus on ${weakSpecialties.map(([name]) => name).join(', ')} - these areas need improvement`);
    }
    
    // Speed recommendations
    Object.entries(specialtyBreakdown).forEach(([specialty, data]) => {
      if (data.total >= 10 && data.accuracy >= 80) {
        recommendations.push(`Great progress in ${specialty}! Consider advancing to higher difficulty levels`);
      }
    });
    
    // Overall accuracy recommendations
    if (overallAccuracy < 60) {
      recommendations.push('Focus on understanding core concepts before attempting more questions');
    } else if (overallAccuracy > 85) {
      recommendations.push('Excellent accuracy! Try timed practice sessions to improve speed');
    }
    
    return recommendations.slice(0, 5); // Limit to 5 recommendations
  }

  private getWeekStart(): Date {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Monday start
    const weekStart = new Date(now.setDate(diff));
    weekStart.setHours(0, 0, 0, 0);
    return weekStart;
  }

  private getWeekEnd(): Date {
    const weekStart = this.getWeekStart();
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);
    return weekEnd;
  }
}

export const analyticsEngine = new AnalyticsEngine();
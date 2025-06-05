// Advanced Analytics Dashboard for PLAB Preparation
// Provides detailed performance trends, peer comparisons, and predictive scoring

export interface PerformanceTrend {
  date: Date;
  category: string;
  accuracy: number;
  timeSpent: number;
  questionsAttempted: number;
  difficulty: string;
}

export interface PeerComparison {
  userId: number;
  percentile: number;
  categoryRankings: Record<string, number>;
  averageAccuracy: number;
  studyTimeComparison: number; // percentage vs peer average
  improvementRate: number;
}

export interface PredictiveScore {
  plabSuccessProbability: number;
  confidenceInterval: [number, number];
  recommendedExamDate: Date;
  readinessScore: number; // 0-100
  categoryReadiness: Record<string, number>;
  riskFactors: string[];
  strengthAreas: string[];
}

export interface KnowledgeGap {
  category: string;
  subcategory: string;
  gapSeverity: 'low' | 'medium' | 'high' | 'critical';
  affectedTopics: string[];
  recommendedActions: string[];
  estimatedStudyTime: number; // hours
}

export interface StudyHeatMap {
  category: string;
  difficulty: string;
  timeOfDay: number; // 0-23
  dayOfWeek: number; // 0-6
  performance: number; // 0-100
  frequency: number; // how often studied
}

export class AdvancedAnalyticsEngine {
  
  // Calculate comprehensive performance trends
  calculatePerformanceTrends(
    userProgress: any[],
    timeWindow: 'week' | 'month' | 'quarter' = 'month'
  ): {
    overallTrend: 'improving' | 'declining' | 'stable';
    categoryTrends: Record<string, PerformanceTrend[]>;
    trendMagnitude: number;
    projectedPerformance: number;
  } {
    
    const windowDays = timeWindow === 'week' ? 7 : timeWindow === 'month' ? 30 : 90;
    const cutoffDate = new Date(Date.now() - windowDays * 24 * 60 * 60 * 1000);
    
    const recentProgress = userProgress.filter(p => p.attemptedAt >= cutoffDate);
    
    // Group by category and calculate trends
    const categoryTrends: Record<string, PerformanceTrend[]> = {};
    
    recentProgress.forEach(progress => {
      const category = progress.category || 'general';
      if (!categoryTrends[category]) {
        categoryTrends[category] = [];
      }
      
      categoryTrends[category].push({
        date: progress.attemptedAt,
        category,
        accuracy: progress.isCorrect ? 1 : 0,
        timeSpent: progress.timeSpent,
        questionsAttempted: 1,
        difficulty: progress.difficulty || 'medium'
      });
    });
    
    // Calculate overall trend
    const accuracyOverTime = recentProgress.map((p, i) => ({
      index: i,
      accuracy: p.isCorrect ? 1 : 0
    }));
    
    const trend = this.calculateLinearTrend(accuracyOverTime);
    const overallTrend = trend > 0.05 ? 'improving' : trend < -0.05 ? 'declining' : 'stable';
    
    return {
      overallTrend,
      categoryTrends,
      trendMagnitude: Math.abs(trend),
      projectedPerformance: Math.max(0, Math.min(100, 
        (recentProgress.filter(p => p.isCorrect).length / recentProgress.length * 100) + (trend * 100)
      ))
    };
  }

  // Generate peer comparison analytics
  generatePeerComparison(
    userId: number,
    userStats: any,
    allUserStats: any[]
  ): PeerComparison {
    
    const userAccuracy = userStats.correctAnswers / userStats.totalAnswered;
    const accuracyRankings = allUserStats
      .map(stat => stat.correctAnswers / stat.totalAnswered)
      .sort((a, b) => b - a);
    
    const percentile = ((accuracyRankings.length - accuracyRankings.indexOf(userAccuracy)) / accuracyRankings.length) * 100;
    
    // Calculate category rankings
    const categoryRankings: Record<string, number> = {};
    Object.keys(userStats.categoryStats || {}).forEach(category => {
      const userCategoryAccuracy = userStats.categoryStats[category].correct / userStats.categoryStats[category].total;
      const categoryPerformances = allUserStats
        .map(stat => stat.categoryStats?.[category]?.correct / stat.categoryStats?.[category]?.total || 0)
        .filter(acc => acc > 0)
        .sort((a, b) => b - a);
      
      if (categoryPerformances.length > 0) {
        categoryRankings[category] = ((categoryPerformances.length - categoryPerformances.indexOf(userCategoryAccuracy)) / categoryPerformances.length) * 100;
      }
    });
    
    const avgStudyTime = allUserStats.reduce((sum, stat) => sum + (stat.averageTime || 0), 0) / allUserStats.length;
    const studyTimeComparison = ((userStats.averageTime - avgStudyTime) / avgStudyTime) * 100;
    
    return {
      userId,
      percentile: Math.round(percentile),
      categoryRankings,
      averageAccuracy: Math.round(userAccuracy * 100),
      studyTimeComparison: Math.round(studyTimeComparison),
      improvementRate: this.calculateImprovementRate(userId, allUserStats)
    };
  }

  // Predictive scoring for PLAB success
  generatePredictiveScore(
    userStats: any,
    studyPattern: any,
    timeUntilExam: number // days
  ): PredictiveScore {
    
    const currentAccuracy = userStats.correctAnswers / userStats.totalAnswered;
    const studyConsistency = this.calculateStudyConsistency(studyPattern);
    const categoryBalance = this.calculateCategoryBalance(userStats.categoryStats);
    const timeFactorBonus = Math.max(0, Math.min(0.2, timeUntilExam / 90)); // More time = better preparation opportunity
    
    // Weighted success probability calculation
    const baseScore = currentAccuracy * 0.4;
    const consistencyScore = studyConsistency * 0.3;
    const balanceScore = categoryBalance * 0.2;
    const timeScore = timeFactorBonus * 0.1;
    
    const plabSuccessProbability = Math.min(0.95, baseScore + consistencyScore + balanceScore + timeScore);
    
    // Calculate confidence interval
    const variance = this.calculatePerformanceVariance(userStats);
    const confidenceInterval: [number, number] = [
      Math.max(0, plabSuccessProbability - variance),
      Math.min(1, plabSuccessProbability + variance)
    ];
    
    // Category readiness scores
    const categoryReadiness: Record<string, number> = {};
    Object.keys(userStats.categoryStats || {}).forEach(category => {
      const categoryAccuracy = userStats.categoryStats[category].correct / userStats.categoryStats[category].total;
      const categoryAttempts = userStats.categoryStats[category].total;
      const readiness = Math.min(100, (categoryAccuracy * 80) + (Math.min(categoryAttempts / 20, 1) * 20));
      categoryReadiness[category] = Math.round(readiness);
    });
    
    // Identify risk factors and strengths
    const riskFactors = this.identifyRiskFactors(userStats, studyPattern);
    const strengthAreas = this.identifyStrengths(userStats, categoryReadiness);
    
    // Recommended exam date
    const daysNeeded = this.calculateOptimalPreparationTime(plabSuccessProbability, riskFactors.length);
    const recommendedExamDate = new Date(Date.now() + daysNeeded * 24 * 60 * 60 * 1000);
    
    return {
      plabSuccessProbability: Math.round(plabSuccessProbability * 100),
      confidenceInterval: [Math.round(confidenceInterval[0] * 100), Math.round(confidenceInterval[1] * 100)],
      recommendedExamDate,
      readinessScore: Math.round(plabSuccessProbability * 100),
      categoryReadiness,
      riskFactors,
      strengthAreas
    };
  }

  // Generate knowledge gap analysis
  analyseKnowledgeGaps(
    userStats: any,
    recentMistakes: any[]
  ): KnowledgeGap[] {
    
    const gaps: KnowledgeGap[] = [];
    
    // Analyze category performance gaps
    Object.entries(userStats.categoryStats || {}).forEach(([category, stats]: [string, any]) => {
      const accuracy = stats.correct / stats.total;
      const attempts = stats.total;
      
      if (accuracy < 0.6 || attempts < 10) {
        const severity = accuracy < 0.3 ? 'critical' : 
                        accuracy < 0.5 ? 'high' : 
                        accuracy < 0.7 ? 'medium' : 'low';
        
        const categoryMistakes = recentMistakes.filter(m => m.category === category);
        const affectedTopics = [...new Set(categoryMistakes.map(m => m.topic))];
        
        gaps.push({
          category,
          subcategory: 'general',
          gapSeverity: severity,
          affectedTopics,
          recommendedActions: this.generateRecommendedActions(category, severity),
          estimatedStudyTime: this.estimateStudyTime(severity, affectedTopics.length)
        });
      }
    });
    
    // Analyze specific topic gaps within categories
    const topicGaps = this.analyzeTopicSpecificGaps(recentMistakes);
    gaps.push(...topicGaps);
    
    return gaps.sort((a, b) => {
      const severityOrder = { 'critical': 4, 'high': 3, 'medium': 2, 'low': 1 };
      return severityOrder[b.gapSeverity] - severityOrder[a.gapSeverity];
    });
  }

  // Generate study heat map
  generateStudyHeatMap(studyActivity: any[]): StudyHeatMap[] {
    const heatMap: StudyHeatMap[] = [];
    
    // Group activities by category, difficulty, time, and day
    const grouped = new Map();
    
    studyActivity.forEach(activity => {
      const date = new Date(activity.timestamp);
      const key = `${activity.category}-${activity.difficulty}-${date.getHours()}-${date.getDay()}`;
      
      if (!grouped.has(key)) {
        grouped.set(key, {
          category: activity.category,
          difficulty: activity.difficulty,
          timeOfDay: date.getHours(),
          dayOfWeek: date.getDay(),
          performances: [],
          frequency: 0
        });
      }
      
      const entry = grouped.get(key);
      entry.performances.push(activity.performance || 0);
      entry.frequency++;
    });
    
    // Calculate average performance for each time/category combination
    grouped.forEach(entry => {
      const avgPerformance = entry.performances.reduce((sum: number, p: number) => sum + p, 0) / entry.performances.length;
      
      heatMap.push({
        category: entry.category,
        difficulty: entry.difficulty,
        timeOfDay: entry.timeOfDay,
        dayOfWeek: entry.dayOfWeek,
        performance: Math.round(avgPerformance),
        frequency: entry.frequency
      });
    });
    
    return heatMap;
  }

  // Helper methods
  private calculateLinearTrend(data: { index: number; accuracy: number }[]): number {
    if (data.length < 2) return 0;
    
    const n = data.length;
    const sumX = data.reduce((sum, d) => sum + d.index, 0);
    const sumY = data.reduce((sum, d) => sum + d.accuracy, 0);
    const sumXY = data.reduce((sum, d) => sum + d.index * d.accuracy, 0);
    const sumXX = data.reduce((sum, d) => sum + d.index * d.index, 0);
    
    return (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  }

  private calculateStudyConsistency(studyPattern: any): number {
    // Calculate consistency based on regular study sessions
    const dailyStudyTimes = studyPattern.dailyActivity || [];
    const variance = this.calculateVariance(dailyStudyTimes);
    return Math.max(0, 1 - (variance / 100)); // Normalize variance to consistency score
  }

  private calculateCategoryBalance(categoryStats: Record<string, any>): number {
    const categories = Object.keys(categoryStats);
    if (categories.length === 0) return 0;
    
    const accuracies = categories.map(cat => categoryStats[cat].correct / categoryStats[cat].total);
    const variance = this.calculateVariance(accuracies);
    return Math.max(0, 1 - variance); // Lower variance = better balance
  }

  private calculateVariance(values: number[]): number {
    if (values.length === 0) return 0;
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
    const squaredDiffs = values.map(val => Math.pow(val - mean, 2));
    return squaredDiffs.reduce((sum, diff) => sum + diff, 0) / values.length;
  }

  private calculatePerformanceVariance(userStats: any): number {
    // Calculate variance in performance to determine confidence interval width
    const recentAccuracies = userStats.recentSessions?.map((s: any) => s.accuracy) || [];
    return this.calculateVariance(recentAccuracies) * 0.1; // Scale down for confidence interval
  }

  private identifyRiskFactors(userStats: any, studyPattern: any): string[] {
    const risks: string[] = [];
    
    const overallAccuracy = userStats.correctAnswers / userStats.totalAnswered;
    if (overallAccuracy < 0.6) risks.push('Low overall accuracy');
    
    const recentStudyDays = studyPattern.recentActivity?.length || 0;
    if (recentStudyDays < 5) risks.push('Inconsistent study pattern');
    
    const weakCategories = Object.entries(userStats.categoryStats || {})
      .filter(([_, stats]: [string, any]) => stats.correct / stats.total < 0.5).length;
    if (weakCategories > 3) risks.push('Multiple weak subject areas');
    
    if (userStats.averageTime > 180) risks.push('Slow question completion time');
    
    return risks;
  }

  private identifyStrengths(userStats: any, categoryReadiness: Record<string, number>): string[] {
    const strengths: string[] = [];
    
    const strongCategories = Object.entries(categoryReadiness)
      .filter(([_, score]) => score >= 80)
      .map(([category, _]) => category);
    
    if (strongCategories.length > 0) {
      strengths.push(`Strong performance in: ${strongCategories.join(', ')}`);
    }
    
    if (userStats.averageTime < 90) strengths.push('Efficient question completion');
    
    const consistentPerformance = this.calculateStudyConsistency(userStats);
    if (consistentPerformance > 0.8) strengths.push('Consistent study pattern');
    
    return strengths;
  }

  private calculateOptimalPreparationTime(successProbability: number, riskFactorCount: number): number {
    const baseTime = 30; // Base 30 days
    const probabilityAdjustment = (1 - successProbability) * 60; // Up to 60 extra days
    const riskAdjustment = riskFactorCount * 14; // 14 days per risk factor
    
    return Math.round(baseTime + probabilityAdjustment + riskAdjustment);
  }

  private generateRecommendedActions(category: string, severity: string): string[] {
    const baseActions = [
      'Review fundamental concepts',
      'Practice more questions in this area',
      'Read targeted study materials'
    ];
    
    const severityActions = {
      'critical': ['Seek tutoring or mentorship', 'Dedicate 50% of study time to this area', 'Consider delaying exam'],
      'high': ['Focus 30% of study time here', 'Join study group for this topic', 'Use spaced repetition'],
      'medium': ['Regular review sessions', 'Create summary notes', 'Practice weekly'],
      'low': ['Occasional review', 'Monitor progress', 'Maintain current level']
    };
    
    return [...baseActions, ...severityActions[severity]];
  }

  private estimateStudyTime(severity: string, topicCount: number): number {
    const baseHours = { 'critical': 40, 'high': 25, 'medium': 15, 'low': 8 };
    return baseHours[severity] + (topicCount * 3);
  }

  private analyzeTopicSpecificGaps(mistakes: any[]): KnowledgeGap[] {
    const topicGroups = new Map();
    
    mistakes.forEach(mistake => {
      const topic = mistake.topic || 'general';
      if (!topicGroups.has(topic)) {
        topicGroups.set(topic, { count: 0, category: mistake.category });
      }
      topicGroups.get(topic).count++;
    });
    
    return Array.from(topicGroups.entries())
      .filter(([_, data]) => data.count >= 3) // At least 3 mistakes in topic
      .map(([topic, data]) => ({
        category: data.category,
        subcategory: topic,
        gapSeverity: data.count >= 8 ? 'high' : 
                    data.count >= 5 ? 'medium' : 'low' as any,
        affectedTopics: [topic],
        recommendedActions: [`Focus on ${topic} specifically`],
        estimatedStudyTime: data.count * 2
      }));
  }

  private calculateImprovementRate(userId: number, allUserStats: any[]): number {
    // Calculate improvement rate compared to peers (placeholder implementation)
    return Math.random() * 20 - 10; // -10% to +10% improvement rate
  }
}
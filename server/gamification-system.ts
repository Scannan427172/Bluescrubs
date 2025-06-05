// Gamification System for PLAB Preparation
// Achievements, leaderboards, study streaks, and reward systems

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'study' | 'performance' | 'consistency' | 'milestone' | 'community';
  points: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  requirements: {
    type: string;
    target: number;
    timeframe?: string;
    conditions?: any;
  };
  unlockDate?: Date;
}

export interface UserAchievement {
  userId: number;
  achievementId: string;
  unlockedAt: Date;
  progress: number; // 0-100
}

export interface LeaderboardEntry {
  userId: number;
  username: string;
  score: number;
  rank: number;
  points: number;
  streak: number;
  category?: string;
  timeframe: 'daily' | 'weekly' | 'monthly' | 'all-time';
}

export interface StudyStreak {
  userId: number;
  currentStreak: number;
  longestStreak: number;
  lastStudyDate: Date;
  streakType: 'daily' | 'question' | 'category';
  multiplier: number;
}

export interface ChallengeEvent {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  category: string;
  participants: number[];
  rewards: {
    first: number;
    second: number;
    third: number;
    participation: number;
  };
  requirements: any;
}

export class GamificationEngine {
  
  // Define all achievements in the system
  private achievements: Achievement[] = [
    // Study Achievements
    {
      id: 'first_question',
      title: 'First Steps',
      description: 'Answer your first question',
      icon: '🎯',
      category: 'milestone',
      points: 10,
      rarity: 'common',
      requirements: { type: 'questions_answered', target: 1 }
    },
    {
      id: 'century_club',
      title: 'Century Club',
      description: 'Answer 100 questions correctly',
      icon: '💯',
      category: 'performance',
      points: 100,
      rarity: 'rare',
      requirements: { type: 'correct_answers', target: 100 }
    },
    {
      id: 'speed_demon',
      title: 'Speed Demon',
      description: 'Answer 10 questions in under 30 seconds each',
      icon: '⚡',
      category: 'performance',
      points: 75,
      rarity: 'rare',
      requirements: { type: 'fast_answers', target: 10, conditions: { maxTime: 30 } }
    },
    {
      id: 'perfectionist',
      title: 'Perfectionist',
      description: 'Achieve 100% accuracy in a 20-question session',
      icon: '🏆',
      category: 'performance',
      points: 150,
      rarity: 'epic',
      requirements: { type: 'perfect_session', target: 20 }
    },
    {
      id: 'study_streak_7',
      title: 'Week Warrior',
      description: 'Study for 7 consecutive days',
      icon: '🔥',
      category: 'consistency',
      points: 50,
      rarity: 'common',
      requirements: { type: 'daily_streak', target: 7 }
    },
    {
      id: 'study_streak_30',
      title: 'Month Master',
      description: 'Study for 30 consecutive days',
      icon: '🌟',
      category: 'consistency',
      points: 200,
      rarity: 'epic',
      requirements: { type: 'daily_streak', target: 30 }
    },
    {
      id: 'specialty_master',
      title: 'Specialty Master',
      description: 'Achieve 90% accuracy in any specialty',
      icon: '🎓',
      category: 'performance',
      points: 100,
      rarity: 'rare',
      requirements: { type: 'category_mastery', target: 90 }
    },
    {
      id: 'all_rounder',
      title: 'All-Rounder',
      description: 'Score above 70% in all specialties',
      icon: '🌈',
      category: 'performance',
      points: 300,
      rarity: 'legendary',
      requirements: { type: 'all_categories', target: 70 }
    },
    {
      id: 'night_owl',
      title: 'Night Owl',
      description: 'Study between 10 PM and 2 AM for 5 sessions',
      icon: '🦉',
      category: 'study',
      points: 30,
      rarity: 'common',
      requirements: { type: 'time_study', target: 5, conditions: { hours: [22, 23, 0, 1] } }
    },
    {
      id: 'early_bird',
      title: 'Early Bird',
      description: 'Study between 5 AM and 8 AM for 10 sessions',
      icon: '🐦',
      category: 'study',
      points: 40,
      rarity: 'common',
      requirements: { type: 'time_study', target: 10, conditions: { hours: [5, 6, 7] } }
    },
    {
      id: 'marathon_session',
      title: 'Marathon Session',
      description: 'Study for 4+ hours in a single session',
      icon: '🏃',
      category: 'study',
      points: 80,
      rarity: 'rare',
      requirements: { type: 'session_length', target: 240 }
    },
    {
      id: 'community_helper',
      title: 'Community Helper',
      description: 'Help 10 fellow students in forums',
      icon: '🤝',
      category: 'community',
      points: 60,
      rarity: 'rare',
      requirements: { type: 'forum_help', target: 10 }
    },
    {
      id: 'question_creator',
      title: 'Question Creator',
      description: 'Submit 5 quality practice questions',
      icon: '✏️',
      category: 'community',
      points: 100,
      rarity: 'rare',
      requirements: { type: 'questions_submitted', target: 5 }
    },
    {
      id: 'comeback_king',
      title: 'Comeback King',
      description: 'Improve from <50% to >80% accuracy in any category',
      icon: '👑',
      category: 'performance',
      points: 120,
      rarity: 'epic',
      requirements: { type: 'improvement', target: 30 }
    },
    {
      id: 'unstoppable',
      title: 'Unstoppable',
      description: 'Answer 50 questions correctly in a row',
      icon: '🚀',
      category: 'performance',
      points: 250,
      rarity: 'legendary',
      requirements: { type: 'correct_streak', target: 50 }
    }
  ];

  // Check and unlock achievements for a user
  async checkAchievements(
    userId: number, 
    userStats: any, 
    recentActivity: any[]
  ): Promise<UserAchievement[]> {
    const newAchievements: UserAchievement[] = [];
    
    for (const achievement of this.achievements) {
      const isUnlocked = await this.isAchievementUnlocked(userId, achievement.id);
      if (isUnlocked) continue;
      
      const progress = this.calculateAchievementProgress(achievement, userStats, recentActivity);
      
      if (progress >= 100) {
        newAchievements.push({
          userId,
          achievementId: achievement.id,
          unlockedAt: new Date(),
          progress: 100
        });
      }
    }
    
    return newAchievements;
  }

  // Calculate progress towards an achievement
  private calculateAchievementProgress(
    achievement: Achievement, 
    userStats: any, 
    recentActivity: any[]
  ): number {
    const req = achievement.requirements;
    
    switch (req.type) {
      case 'questions_answered':
        return Math.min(100, (userStats.totalAnswered / req.target) * 100);
      
      case 'correct_answers':
        return Math.min(100, (userStats.correctAnswers / req.target) * 100);
      
      case 'daily_streak':
        return Math.min(100, (userStats.studyStreak / req.target) * 100);
      
      case 'category_mastery':
        const categoryAccuracies = Object.values(userStats.categoryStats || {})
          .map((stats: any) => (stats.correct / stats.total) * 100);
        const maxAccuracy = Math.max(...categoryAccuracies, 0);
        return Math.min(100, (maxAccuracy / req.target) * 100);
      
      case 'all_categories':
        const allCategoryAccuracies = Object.values(userStats.categoryStats || {})
          .map((stats: any) => (stats.correct / stats.total) * 100);
        const minAccuracy = Math.min(...allCategoryAccuracies, 0);
        return Math.min(100, (minAccuracy / req.target) * 100);
      
      case 'perfect_session':
        const perfectSessions = recentActivity.filter(session => 
          session.questionsAnswered >= req.target && session.accuracy === 100
        ).length;
        return perfectSessions > 0 ? 100 : 0;
      
      case 'fast_answers':
        const fastAnswers = recentActivity.filter(activity => 
          activity.timeSpent <= req.conditions.maxTime
        ).length;
        return Math.min(100, (fastAnswers / req.target) * 100);
      
      case 'session_length':
        const longSessions = recentActivity.filter(session => 
          session.duration >= req.target
        ).length;
        return longSessions > 0 ? 100 : 0;
      
      default:
        return 0;
    }
  }

  // Generate leaderboards
  async generateLeaderboard(
    timeframe: 'daily' | 'weekly' | 'monthly' | 'all-time',
    category?: string,
    limit: number = 50
  ): Promise<LeaderboardEntry[]> {
    // This would query actual user data in a real implementation
    const mockData: LeaderboardEntry[] = [];
    
    // Generate sample leaderboard data
    for (let i = 1; i <= limit; i++) {
      mockData.push({
        userId: i,
        username: `User${i}`,
        score: Math.floor(Math.random() * 5000) + 1000,
        rank: i,
        points: Math.floor(Math.random() * 1000) + 100,
        streak: Math.floor(Math.random() * 30) + 1,
        category,
        timeframe
      });
    }
    
    return mockData.sort((a, b) => b.score - a.score).map((entry, index) => ({
      ...entry,
      rank: index + 1
    }));
  }

  // Manage study streaks
  updateStudyStreak(userId: number, lastStudy: Date): StudyStreak {
    const now = new Date();
    const lastStudyDate = new Date(lastStudy);
    const daysDiff = Math.floor((now.getTime() - lastStudyDate.getTime()) / (1000 * 60 * 60 * 24));
    
    let currentStreak = 1;
    let multiplier = 1;
    
    if (daysDiff === 1) {
      // Consecutive day - increment streak
      currentStreak += 1;
    } else if (daysDiff > 1) {
      // Streak broken - reset
      currentStreak = 1;
    }
    
    // Calculate multiplier based on streak length
    if (currentStreak >= 30) multiplier = 3;
    else if (currentStreak >= 14) multiplier = 2.5;
    else if (currentStreak >= 7) multiplier = 2;
    else if (currentStreak >= 3) multiplier = 1.5;
    
    return {
      userId,
      currentStreak,
      longestStreak: Math.max(currentStreak, 0), // Would track historical max
      lastStudyDate: now,
      streakType: 'daily',
      multiplier
    };
  }

  // Calculate points for various activities
  calculatePoints(activity: {
    type: 'question_correct' | 'question_incorrect' | 'session_complete' | 'achievement_unlock' | 'streak_bonus';
    data: any;
    streakMultiplier?: number;
  }): number {
    const basePoints = {
      'question_correct': 10,
      'question_incorrect': 2, // Participation points
      'session_complete': 20,
      'achievement_unlock': 0, // Points defined in achievement
      'streak_bonus': 5
    };
    
    let points = basePoints[activity.type];
    
    // Apply difficulty bonuses
    if (activity.data?.difficulty === 'hard') points *= 1.5;
    else if (activity.data?.difficulty === 'medium') points *= 1.2;
    
    // Apply streak multiplier
    if (activity.streakMultiplier) {
      points *= activity.streakMultiplier;
    }
    
    // Speed bonus for quick correct answers
    if (activity.type === 'question_correct' && activity.data?.timeSpent < 60) {
      points += 5;
    }
    
    return Math.round(points);
  }

  // Create challenge events
  createChallenge(challenge: Omit<ChallengeEvent, 'id' | 'participants'>): ChallengeEvent {
    return {
      ...challenge,
      id: `challenge_${Date.now()}`,
      participants: []
    };
  }

  // Join a challenge
  joinChallenge(challengeId: string, userId: number): boolean {
    // Implementation would update database
    return true;
  }

  // Calculate challenge rankings
  calculateChallengeRankings(
    challengeId: string,
    participantScores: { userId: number; score: number }[]
  ): { userId: number; rank: number; reward: number }[] {
    const sorted = participantScores.sort((a, b) => b.score - a.score);
    
    return sorted.map((participant, index) => {
      let reward = 10; // Participation reward
      
      if (index === 0) reward = 100; // First place
      else if (index === 1) reward = 50; // Second place
      else if (index === 2) reward = 25; // Third place
      
      return {
        userId: participant.userId,
        rank: index + 1,
        reward
      };
    });
  }

  // Generate motivational messages based on progress
  generateMotivationalMessage(
    userStats: any,
    recentAchievements: Achievement[],
    currentStreak: number
  ): string {
    const messages = {
      highPerformance: [
        "Outstanding work! You're mastering PLAB concepts brilliantly! 🌟",
        "Excellent progress! Your dedication is really showing in your results! 💪",
        "Fantastic job! You're well on your way to PLAB success! 🎯"
      ],
      improvement: [
        "Great improvement! Keep up the momentum! 📈",
        "You're getting stronger with each session! 💪",
        "Nice progress! Your hard work is paying off! ⭐"
      ],
      streak: [
        `Amazing ${currentStreak}-day streak! You're building great study habits! 🔥`,
        "Your consistency is impressive! Keep the streak alive! ⚡",
        "Fantastic dedication! Daily practice makes perfect! 📚"
      ],
      encouragement: [
        "Every question brings you closer to your goal! Keep going! 🎯",
        "Learning is a journey - you're making great strides! 🚀",
        "Remember: progress, not perfection! You're doing great! ✨"
      ]
    };
    
    const accuracy = userStats.correctAnswers / userStats.totalAnswered;
    
    if (recentAchievements.length > 0) {
      return `🏆 Congratulations on unlocking "${recentAchievements[0].title}"! ${this.getRandomMessage(messages.highPerformance)}`;
    } else if (accuracy > 0.8) {
      return this.getRandomMessage(messages.highPerformance);
    } else if (currentStreak >= 7) {
      return this.getRandomMessage(messages.streak);
    } else if (accuracy > 0.6) {
      return this.getRandomMessage(messages.improvement);
    } else {
      return this.getRandomMessage(messages.encouragement);
    }
  }

  private getRandomMessage(messages: string[]): string {
    return messages[Math.floor(Math.random() * messages.length)];
  }

  private async isAchievementUnlocked(userId: number, achievementId: string): Promise<boolean> {
    // Would check database for existing achievement
    return false; // Placeholder
  }

  // Badge system for visual recognition
  getBadgeForPoints(totalPoints: number): {
    name: string;
    icon: string;
    color: string;
    nextBadge?: { name: string; pointsNeeded: number };
  } {
    const badges = [
      { threshold: 0, name: 'Novice', icon: '🥉', color: '#CD7F32' },
      { threshold: 100, name: 'Student', icon: '📚', color: '#C0C0C0' },
      { threshold: 500, name: 'Scholar', icon: '🎓', color: '#FFD700' },
      { threshold: 1000, name: 'Expert', icon: '💎', color: '#4169E1' },
      { threshold: 2500, name: 'Master', icon: '👑', color: '#9932CC' },
      { threshold: 5000, name: 'Legend', icon: '🏆', color: '#FF1493' }
    ];
    
    const currentBadge = badges.reverse().find(badge => totalPoints >= badge.threshold) || badges[0];
    const nextBadgeIndex = badges.findIndex(badge => badge.threshold > totalPoints);
    const nextBadge = nextBadgeIndex !== -1 ? badges[nextBadgeIndex] : null;
    
    return {
      name: currentBadge.name,
      icon: currentBadge.icon,
      color: currentBadge.color,
      nextBadge: nextBadge ? {
        name: nextBadge.name,
        pointsNeeded: nextBadge.threshold - totalPoints
      } : undefined
    };
  }
}
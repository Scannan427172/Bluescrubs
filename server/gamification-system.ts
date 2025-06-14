import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Advanced Gamification System
export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: 'learning' | 'consistency' | 'improvement' | 'community' | 'milestone' | 'special';
  difficulty: 'bronze' | 'silver' | 'gold' | 'platinum' | 'legendary';
  points: number;
  requirements: AchievementRequirement[];
  rewards: Reward[];
  unlockConditions: string[];
  medicalSignificance: string;
  ukRelevance: string;
  icon: string;
  rarity: number; // 1-100, lower = rarer
  unlockedAt?: Date;
  progress: number; // 0-100
}

export interface AchievementRequirement {
  type: 'questions_answered' | 'streak_days' | 'accuracy_rate' | 'study_time' | 'specialty_mastery' | 'community_participation';
  value: number;
  timeframe?: string;
  specialty?: string;
  conditions?: string[];
}

export interface Reward {
  type: 'points' | 'badge' | 'unlock_content' | 'discount' | 'mentor_session' | 'special_access';
  value: any;
  description: string;
  expires?: Date;
}

export interface StudyStreak {
  currentStreak: number;
  longestStreak: number;
  lastStudyDate: Date;
  streakMultiplier: number;
  milestones: StreakMilestone[];
  recoveryOptions: StreakRecovery[];
}

export interface StreakMilestone {
  days: number;
  title: string;
  reward: Reward;
  unlocked: boolean;
  specialMessage: string;
}

export interface StreakRecovery {
  type: 'freeze' | 'repair' | 'weekend_pass';
  cost: number;
  description: string;
  available: boolean;
  usesRemaining: number;
}

export interface Leaderboard {
  id: string;
  name: string;
  category: 'global' | 'regional' | 'specialty' | 'peer_group' | 'study_group';
  timeframe: 'daily' | 'weekly' | 'monthly' | 'all_time';
  segmentation: {
    byCountry?: string;
    bySpecialty?: string;
    byExamDate?: Date;
    byStudyLevel?: string;
  };
  entries: LeaderboardEntry[];
  rewards: LeaderboardReward[];
  updateFrequency: number; // minutes
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  country: string;
  score: number;
  change: number; // rank change from previous period
  achievements: string[];
  specialtyFocus: string;
}

export interface LeaderboardReward {
  position: number;
  reward: Reward;
  recognition: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'individual' | 'team' | 'community' | 'specialty';
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  duration: number; // days
  startDate: Date;
  endDate: Date;
  objectives: ChallengeObjective[];
  participants: ChallengeParticipant[];
  rewards: Reward[];
  progressTracking: any;
  medicalFocus: string;
}

export interface ChallengeObjective {
  description: string;
  target: number;
  current: number;
  unit: string;
  weight: number; // contribution to overall challenge score
}

export interface ChallengeParticipant {
  userId: string;
  username: string;
  progress: Record<string, number>;
  rank: number;
  teamId?: string;
}

export interface VirtualStudyBuddy {
  id: string;
  name: string;
  personality: 'encouraging' | 'challenging' | 'analytical' | 'supportive' | 'competitive';
  level: number;
  experience: number;
  specialization: string;
  traits: BuddyTrait[];
  interactions: BuddyInteraction[];
  customization: BuddyCustomization;
}

export interface BuddyTrait {
  name: string;
  description: string;
  effect: string;
  unlockLevel: number;
}

export interface BuddyInteraction {
  type: 'encouragement' | 'tip' | 'challenge' | 'celebration' | 'reminder';
  message: string;
  context: string;
  timing: string;
  effectiveness: number;
}

export interface BuddyCustomization {
  appearance: string;
  voice: string;
  responseStyle: string;
  interactionFrequency: string;
  specialtyFocus: string[];
}

export class GamificationSystem {
  // Achievement System
  async generatePersonalizedAchievements(userProfile: any, currentProgress: any): Promise<Achievement[]> {
    const prompt = `Create personalized achievements for a PLAB candidate based on their profile and progress.

User Profile: ${JSON.stringify(userProfile)}
Current Progress: ${JSON.stringify(currentProgress)}

Generate achievements that:
1. Recognize meaningful medical learning milestones
2. Encourage consistent study habits and improvement
3. Celebrate both effort and achievement
4. Include UK-specific medical knowledge recognition
5. Balance challenge with attainability

Create achievements for different categories:
- Learning milestones (specialty mastery, difficult topic completion)
- Consistency rewards (study streaks, regular practice)
- Improvement recognition (performance gains, weakness addressing)
- Community contribution (helping others, sharing knowledge)
- Special milestones (exam readiness, confidence building)

Each achievement should have medical significance and motivational value.`;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a gamification expert specializing in medical education. Create meaningful, motivating achievements that recognize genuine learning progress and professional development."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.6
      });

      const achievements = JSON.parse(response.choices[0].message.content || '{}');
      return this.parseAchievements(achievements);
    } catch (error) {
      console.error('Error generating achievements:', error);
      return [];
    }
  }

  // Dynamic Challenge Generation
  async createWeeklyChallenge(participantProfiles: any[], focusArea: string): Promise<Challenge> {
    const prompt = `Design a weekly medical education challenge for PLAB candidates.

Participants: ${participantProfiles.length} students
Focus Area: ${focusArea}
Participant Profiles: ${JSON.stringify(participantProfiles.slice(0, 5))}

Create a challenge that:
1. Accommodates different skill levels and backgrounds
2. Encourages active participation and learning
3. Includes both individual and collaborative elements
4. Focuses on clinically relevant UK medical knowledge
5. Provides meaningful progression and recognition

The challenge should be:
- Educationally valuable beyond just competition
- Achievable but requires dedicated effort
- Inclusive of different learning styles and schedules
- Connected to real PLAB examination requirements

Include specific objectives, progress tracking, and reward structures.`;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are designing educational challenges that motivate medical students while ensuring genuine learning outcomes and professional development."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.7
      });

      const challenge = JSON.parse(response.choices[0].message.content || '{}');
      return this.parseChallenge(challenge);
    } catch (error) {
      console.error('Error creating challenge:', error);
      throw new Error('Failed to create challenge');
    }
  }

  // Adaptive Leaderboard System
  async generateSegmentedLeaderboards(userPool: any[], criteria: any): Promise<Leaderboard[]> {
    const prompt = `Create meaningful leaderboard segments for medical students preparing for PLAB.

User Pool: ${userPool.length} participants
Segmentation Criteria: ${JSON.stringify(criteria)}

Generate leaderboards that:
1. Create fair competition among similar participants
2. Recognize different types of achievement and progress
3. Motivate improvement rather than just celebrating top performers
4. Account for different backgrounds and starting points
5. Include both academic and professional development metrics

Suggested segments:
- By country/region of medical education
- By specialty interest or focus area
- By study timeline and exam date proximity
- By improvement rate and learning velocity
- By community contribution and peer support

Each leaderboard should have appropriate rewards and recognition systems.`;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are creating fair, motivating competition systems that encourage learning and professional development while maintaining inclusivity and educational focus."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.5
      });

      const leaderboards = JSON.parse(response.choices[0].message.content || '{}');
      return this.parseLeaderboards(leaderboards);
    } catch (error) {
      console.error('Error generating leaderboards:', error);
      return [];
    }
  }

  // Virtual Study Buddy System
  async createStudyBuddy(userPreferences: any, learningStyle: string): Promise<VirtualStudyBuddy> {
    const prompt = `Design a virtual study buddy for a PLAB candidate.

User Preferences: ${JSON.stringify(userPreferences)}
Learning Style: ${learningStyle}

Create a virtual companion that:
1. Matches the user's personality and study preferences
2. Provides appropriate motivation and encouragement
3. Offers contextual tips and study suggestions
4. Celebrates achievements and supports during difficulties
5. Grows and develops alongside the user's progress

The buddy should:
- Have a distinct personality that complements the user
- Provide medical education expertise and guidance
- Adapt communication style to user preferences
- Offer both challenge and support as needed
- Include UK-specific medical knowledge and cultural insight

Design appearance, voice, interaction patterns, and growth mechanics.`;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are designing an AI companion that provides emotional support, motivation, and educational guidance for medical students in a personalized, engaging way."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.8
      });

      const buddy = JSON.parse(response.choices[0].message.content || '{}');
      return this.parseStudyBuddy(buddy);
    } catch (error) {
      console.error('Error creating study buddy:', error);
      throw new Error('Failed to create study buddy');
    }
  }

  // Progress Celebration System
  async generateCelebration(achievement: Achievement, userContext: any): Promise<{
    message: string;
    animation: string;
    rewards: Reward[];
    shareableContent: any;
    nextGoals: string[];
  }> {
    const prompt = `Create a meaningful celebration for a medical student's achievement.

Achievement: ${JSON.stringify(achievement)}
User Context: ${JSON.stringify(userContext)}

Design a celebration that:
1. Recognizes the effort and significance of the achievement
2. Connects the accomplishment to medical practice
3. Motivates continued learning and improvement
4. Provides shareable content for community recognition
5. Sets appropriate next goals and challenges

The celebration should feel genuine, medically relevant, and professionally appropriate while maintaining motivation and engagement.`;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are creating meaningful recognition experiences that celebrate learning achievements while maintaining professional development focus."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.7
      });

      return JSON.parse(response.choices[0].message.content || '{}');
    } catch (error) {
      console.error('Error generating celebration:', error);
      return {
        message: "Congratulations on your achievement!",
        animation: "celebration",
        rewards: [],
        shareableContent: {},
        nextGoals: []
      };
    }
  }

  // Streak Recovery System
  async handleStreakBreak(streak: StudyStreak, userCircumstances: any): Promise<{
    recoveryOptions: StreakRecovery[];
    motivationalMessage: string;
    adjustedGoals: any[];
    supportResources: string[];
  }> {
    const prompt = `Handle a study streak break with empathy and practical solutions.

Broken Streak: ${JSON.stringify(streak)}
User Circumstances: ${JSON.stringify(userCircumstances)}

Provide:
1. Compassionate understanding of the situation
2. Practical streak recovery options
3. Adjusted goals that rebuild confidence
4. Resources for getting back on track
5. Perspective on learning as a journey, not perfection

Focus on resilience, self-compassion, and sustainable study habits rather than punishment or guilt.`;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a supportive learning coach who helps students recover from setbacks with compassion while maintaining motivation and realistic goal-setting."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.6
      });

      return JSON.parse(response.choices[0].message.content || '{}');
    } catch (error) {
      console.error('Error handling streak break:', error);
      return {
        recoveryOptions: [],
        motivationalMessage: "Every expert was once a beginner. You can restart anytime.",
        adjustedGoals: [],
        supportResources: []
      };
    }
  }

  private parseAchievements(data: any): Achievement[] {
    if (!data.achievements) return [];
    
    return data.achievements.map((achievement: any) => ({
      id: achievement.id || `achievement_${Date.now()}_${Math.random()}`,
      title: achievement.title || 'Medical Milestone',
      description: achievement.description || 'A significant learning achievement',
      category: achievement.category || 'learning',
      difficulty: achievement.difficulty || 'bronze',
      points: achievement.points || 100,
      requirements: achievement.requirements || [],
      rewards: achievement.rewards || [],
      unlockConditions: achievement.unlockConditions || [],
      medicalSignificance: achievement.medicalSignificance || '',
      ukRelevance: achievement.ukRelevance || '',
      icon: achievement.icon || '🏆',
      rarity: achievement.rarity || 50,
      progress: 0
    }));
  }

  private parseChallenge(data: any): Challenge {
    return {
      id: data.id || `challenge_${Date.now()}`,
      title: data.title || 'Weekly Medical Challenge',
      description: data.description || 'A learning challenge for medical students',
      type: data.type || 'individual',
      difficulty: data.difficulty || 'intermediate',
      duration: data.duration || 7,
      startDate: new Date(data.startDate || Date.now()),
      endDate: new Date(data.endDate || Date.now() + 7 * 24 * 60 * 60 * 1000),
      objectives: data.objectives || [],
      participants: [],
      rewards: data.rewards || [],
      progressTracking: data.progressTracking || {},
      medicalFocus: data.medicalFocus || 'general medicine'
    };
  }

  private parseLeaderboards(data: any): Leaderboard[] {
    if (!data.leaderboards) return [];
    
    return data.leaderboards.map((board: any) => ({
      id: board.id || `leaderboard_${Date.now()}_${Math.random()}`,
      name: board.name || 'Medical Students Leaderboard',
      category: board.category || 'global',
      timeframe: board.timeframe || 'weekly',
      segmentation: board.segmentation || {},
      entries: [],
      rewards: board.rewards || [],
      updateFrequency: board.updateFrequency || 60
    }));
  }

  private parseStudyBuddy(data: any): VirtualStudyBuddy {
    return {
      id: data.id || `buddy_${Date.now()}`,
      name: data.name || 'StudyPal',
      personality: data.personality || 'encouraging',
      level: 1,
      experience: 0,
      specialization: data.specialization || 'general medicine',
      traits: data.traits || [],
      interactions: data.interactions || [],
      customization: data.customization || {
        appearance: 'friendly',
        voice: 'encouraging',
        responseStyle: 'supportive',
        interactionFrequency: 'moderate',
        specialtyFocus: ['general medicine']
      }
    };
  }
}

export const gamification = new GamificationSystem();
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Real-time Adaptive Learning System
export interface AdaptiveLearningProfile {
  userId: number;
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
  cognitiveLoad: number; // 0-100
  stressLevel: number; // 0-100
  focusWindows: { start: string; end: string; productivity: number }[];
  masteryLevels: Record<string, number>; // specialty -> mastery percentage
  weaknessPatterns: WeaknessPattern[];
  studyEfficiency: number; // questions correct per minute
  retentionRate: number; // knowledge retained after 24 hours
  optimalDifficulty: 'easy' | 'medium' | 'hard';
}

export interface WeaknessPattern {
  specialty: string;
  subtopic: string;
  errorTypes: string[];
  frequency: number;
  lastOccurrence: Date;
  improvementTrend: number; // -1 to 1
}

export interface PredictiveAnalytics {
  examReadinessProbability: number;
  weaknessAlert: {
    specialty: string;
    risk: 'low' | 'medium' | 'high' | 'critical';
    daysUntilFailure: number;
    recommendedActions: string[];
  }[];
  optimalStudySchedule: {
    date: string;
    timeSlot: string;
    specialty: string;
    duration: number;
    difficulty: string;
  }[];
  stressFactors: string[];
  burnoutRisk: number;
}

export class AdvancedAISystem {
  // Predictive Weakness Detection
  async predictWeaknesses(profile: AdaptiveLearningProfile, recentPerformance: any[]): Promise<WeaknessPattern[]> {
    const prompt = `Analyze this medical student's performance data and predict potential weaknesses before they become critical failures.

Learning Profile:
- Learning Style: ${profile.learningStyle}
- Current Stress Level: ${profile.stressLevel}%
- Study Efficiency: ${profile.studyEfficiency} questions/minute
- Retention Rate: ${profile.retentionRate}%

Recent Performance: ${JSON.stringify(recentPerformance.slice(-20))}

Identify patterns that suggest upcoming difficulties in specific medical specialties or topics. Focus on:
1. Performance degradation trends
2. Knowledge gap correlations
3. Stress-related performance impacts
4. Time-based learning efficiency patterns

Provide specific predictions with confidence levels and recommended interventions.`;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are an advanced medical education AI that specializes in predictive learning analytics. Analyze performance patterns to predict and prevent academic failures."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.3
      });

      const analysis = JSON.parse(response.choices[0].message.content || '{}');
      return this.parseWeaknessPatterns(analysis);
    } catch (error) {
      console.error('Error predicting weaknesses:', error);
      return [];
    }
  }

  // Dynamic Difficulty Adjustment
  async calculateOptimalDifficulty(profile: AdaptiveLearningProfile, currentTopic: string): Promise<string> {
    const masteryLevel = profile.masteryLevels[currentTopic] || 0;
    const stressFactor = profile.stressLevel / 100;
    const efficiencyFactor = Math.min(profile.studyEfficiency / 2, 1); // normalize to 0-1

    // AI-enhanced difficulty calculation
    if (masteryLevel < 30 || stressFactor > 0.8) return 'easy';
    if (masteryLevel > 70 && stressFactor < 0.3 && efficiencyFactor > 0.7) return 'hard';
    return 'medium';
  }

  // Personalized Study Path Generation
  async generateStudyPath(profile: AdaptiveLearningProfile, examDate: Date, availableTime: number): Promise<any> {
    const daysUntilExam = Math.ceil((examDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    
    const prompt = `Create a personalized PLAB study plan for a medical graduate with ${daysUntilExam} days until exam.

Student Profile:
- Learning Style: ${profile.learningStyle}
- Available Study Time: ${availableTime} hours/day
- Current Mastery Levels: ${JSON.stringify(profile.masteryLevels)}
- Stress Level: ${profile.stressLevel}%
- Study Efficiency: ${profile.studyEfficiency} questions/minute

Requirements:
1. Prioritize weak areas while maintaining strong areas
2. Account for learning style preferences
3. Include stress management and burnout prevention
4. Optimize for UK medical guidelines and PLAB format
5. Include spaced repetition and active recall techniques

Generate a day-by-day study schedule with specific topics, time allocations, and study methods.`;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a world-class medical education strategist specializing in PLAB preparation. Create highly personalized, evidence-based study plans."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.4
      });

      return JSON.parse(response.choices[0].message.content || '{}');
    } catch (error) {
      console.error('Error generating study path:', error);
      return null;
    }
  }

  // AI Mentor System
  async provideContextualHint(question: string, userAnswer: string, correctAnswer: string, attempts: number): Promise<string> {
    const prompt = `You are an AI medical mentor helping a PLAB candidate. They've attempted this question ${attempts} times.

Question: ${question}
Their Answer: ${userAnswer}
Correct Answer: ${correctAnswer}

Provide a helpful hint that guides them toward the correct reasoning without giving away the answer. Focus on:
1. Clinical reasoning process
2. Differential diagnosis approach
3. UK medical guidelines relevance
4. Common pitfalls to avoid

Be encouraging but educational. Help them understand the "why" behind the correct answer.`;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a supportive medical education mentor. Guide students to discover answers through proper clinical reasoning."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.6
      });

      return response.choices[0].message.content || "Consider the clinical presentation and UK guidelines for this condition.";
    } catch (error) {
      console.error('Error providing hint:', error);
      return "Review the fundamental concepts and UK clinical guidelines for this topic.";
    }
  }

  // Performance Prediction Algorithm
  async calculateExamSuccessProbability(profile: AdaptiveLearningProfile, practiceResults: any[]): Promise<PredictiveAnalytics> {
    const prompt = `Analyze this PLAB candidate's preparation and predict their exam success probability.

Learning Profile: ${JSON.stringify(profile)}
Recent Practice Results: ${JSON.stringify(practiceResults.slice(-50))}

Calculate:
1. Overall success probability (0-100%)
2. Specialty-specific readiness levels
3. Risk factors that could impact performance
4. Optimal study schedule for remaining time
5. Stress and burnout risk assessment

Base predictions on UK medical education standards and PLAB pass rates. Consider learning efficiency, knowledge retention, and performance consistency.`;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a predictive analytics expert specializing in medical education outcomes. Provide accurate, evidence-based predictions."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.2
      });

      return JSON.parse(response.choices[0].message.content || '{}');
    } catch (error) {
      console.error('Error calculating success probability:', error);
      return {
        examReadinessProbability: 0,
        weaknessAlert: [],
        optimalStudySchedule: [],
        stressFactors: [],
        burnoutRisk: 0
      };
    }
  }

  // Real-time Learning Analytics
  async updateLearningProfile(userId: number, sessionData: any): Promise<AdaptiveLearningProfile> {
    // Analyze session performance and update learning profile
    const currentProfile = await this.getLearningProfile(userId);
    
    // Update mastery levels based on performance
    const updatedMastery = { ...currentProfile.masteryLevels };
    for (const result of sessionData.results) {
      const specialty = result.specialty;
      const performance = result.correct / result.total;
      updatedMastery[specialty] = (updatedMastery[specialty] || 0) * 0.8 + performance * 0.2;
    }

    // Update stress level based on response times and accuracy
    const avgResponseTime = sessionData.results.reduce((acc: number, r: any) => acc + r.responseTime, 0) / sessionData.results.length;
    const stressIndicator = avgResponseTime > 120 ? 10 : -5; // stress increases with slow responses
    const updatedStress = Math.max(0, Math.min(100, currentProfile.stressLevel + stressIndicator));

    // Calculate study efficiency
    const questionsPerMinute = sessionData.results.length / (sessionData.totalTime / 60);
    const updatedEfficiency = currentProfile.studyEfficiency * 0.9 + questionsPerMinute * 0.1;

    return {
      ...currentProfile,
      masteryLevels: updatedMastery,
      stressLevel: updatedStress,
      studyEfficiency: updatedEfficiency
    };
  }

  private async getLearningProfile(userId: number): Promise<AdaptiveLearningProfile> {
    // Mock implementation - in real app would fetch from database
    return {
      userId,
      learningStyle: 'visual',
      cognitiveLoad: 65,
      stressLevel: 45,
      focusWindows: [],
      masteryLevels: {},
      weaknessPatterns: [],
      studyEfficiency: 1.8,
      retentionRate: 75,
      optimalDifficulty: 'medium'
    };
  }

  private parseWeaknessPatterns(analysis: any): WeaknessPattern[] {
    if (!analysis.weaknessPatterns) return [];
    
    return analysis.weaknessPatterns.map((pattern: any) => ({
      specialty: pattern.specialty || 'unknown',
      subtopic: pattern.subtopic || 'general',
      errorTypes: pattern.errorTypes || [],
      frequency: pattern.frequency || 0,
      lastOccurrence: new Date(),
      improvementTrend: pattern.improvementTrend || 0
    }));
  }
}

export const advancedAI = new AdvancedAISystem();
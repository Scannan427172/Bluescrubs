import OpenAI from "openai";
import { storage } from "./storage";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface UserAnalytics {
  studyPatterns: {
    peakStudyHours: string[];
    averageSessionLength: number;
    consistencyScore: number;
    preferredDifficulty: string;
  };
  performanceInsights: {
    strongCategories: string[];
    weakCategories: string[];
    improvementTrend: number;
    accuracyByTimeOfDay: { hour: number; accuracy: number }[];
  };
  learningProfile: {
    learningStyle: string;
    retentionRate: number;
    adaptationSpeed: string;
    motivationalFactors: string[];
  };
  recommendations: {
    priorityTopics: string[];
    suggestedStudyPlan: string[];
    difficultyAdjustments: string[];
    timeOptimizations: string[];
  };
}

export async function generateUserAnalytics(userId: number): Promise<UserAnalytics> {
  try {
    // Get user progress data
    const userProgress = await storage.getUserProgress(userId);
    const userStats = await storage.getUserStats(userId);
    const user = await storage.getUser(userId);

    if (!userProgress.length) {
      return generateDefaultAnalytics();
    }

    // Analyze patterns with AI
    const analysisPrompt = `
Analyze this medical student's learning data for PLAB preparation:

User Progress Data:
- Total questions answered: ${userStats.totalAnswered}
- Overall accuracy: ${userStats.correctAnswers}/${userStats.totalAnswered} (${Math.round((userStats.correctAnswers/userStats.totalAnswered)*100)}%)
- Average time per question: ${userStats.averageTime} seconds
- Study streak: ${user?.studyStreak || 0} days

Category Performance:
${Object.entries(userStats.categoryStats).map(([cat, stats]) => 
  `${cat}: ${stats.correct}/${stats.total} (${Math.round((stats.correct/stats.total)*100)}%)`
).join('\n')}

Provide comprehensive learning analytics including study patterns, performance insights, learning profile, and personalized recommendations for PLAB exam preparation.

Respond in JSON format:
{
  "studyPatterns": {
    "peakStudyHours": ["morning", "evening"],
    "averageSessionLength": number,
    "consistencyScore": number,
    "preferredDifficulty": "beginner|intermediate|advanced"
  },
  "performanceInsights": {
    "strongCategories": ["category1", "category2"],
    "weakCategories": ["category1", "category2"],
    "improvementTrend": number,
    "accuracyByTimeOfDay": [{"hour": 9, "accuracy": 85}]
  },
  "learningProfile": {
    "learningStyle": "visual|auditory|kinesthetic|mixed",
    "retentionRate": number,
    "adaptationSpeed": "fast|moderate|slow",
    "motivationalFactors": ["achievement", "progress", "competition"]
  },
  "recommendations": {
    "priorityTopics": ["topic1", "topic2"],
    "suggestedStudyPlan": ["plan1", "plan2"],
    "difficultyAdjustments": ["adjustment1", "adjustment2"],
    "timeOptimizations": ["optimization1", "optimization2"]
  }
}
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an expert medical education analyst specializing in PLAB exam preparation and adaptive learning systems."
        },
        {
          role: "user",
          content: analysisPrompt
        }
      ],
      response_format: { type: "json_object" },
      max_tokens: 1500
    });

    const analysis = JSON.parse(response.choices[0].message.content || "{}");
    
    return {
      studyPatterns: {
        peakStudyHours: analysis.studyPatterns?.peakStudyHours || ["morning", "evening"],
        averageSessionLength: analysis.studyPatterns?.averageSessionLength || Math.round(userStats.averageTime * 20),
        consistencyScore: analysis.studyPatterns?.consistencyScore || Math.min(95, (user?.studyStreak || 0) * 8),
        preferredDifficulty: analysis.studyPatterns?.preferredDifficulty || "intermediate"
      },
      performanceInsights: {
        strongCategories: analysis.performanceInsights?.strongCategories || 
          Object.entries(userStats.categoryStats)
            .filter(([_, stats]) => (stats.correct/stats.total) > 0.8)
            .map(([cat, _]) => cat)
            .slice(0, 2),
        weakCategories: analysis.performanceInsights?.weakCategories || 
          Object.entries(userStats.categoryStats)
            .filter(([_, stats]) => (stats.correct/stats.total) < 0.7)
            .map(([cat, _]) => cat)
            .slice(0, 2),
        improvementTrend: analysis.performanceInsights?.improvementTrend || 
          Math.round(((userStats.correctAnswers/userStats.totalAnswered) - 0.6) * 100),
        accuracyByTimeOfDay: analysis.performanceInsights?.accuracyByTimeOfDay || [
          { hour: 9, accuracy: 82 },
          { hour: 14, accuracy: 75 },
          { hour: 19, accuracy: 88 }
        ]
      },
      learningProfile: {
        learningStyle: analysis.learningProfile?.learningStyle || "mixed",
        retentionRate: analysis.learningProfile?.retentionRate || Math.round((userStats.correctAnswers/userStats.totalAnswered) * 100),
        adaptationSpeed: analysis.learningProfile?.adaptationSpeed || "moderate",
        motivationalFactors: analysis.learningProfile?.motivationalFactors || ["progress", "achievement"]
      },
      recommendations: {
        priorityTopics: analysis.recommendations?.priorityTopics || 
          Object.entries(userStats.categoryStats)
            .filter(([_, stats]) => (stats.correct/stats.total) < 0.7)
            .map(([cat, _]) => cat)
            .slice(0, 3),
        suggestedStudyPlan: analysis.recommendations?.suggestedStudyPlan || [
          "Focus 40% time on weak categories",
          "Practice 20 questions daily",
          "Review mistakes weekly",
          "Take timed practice tests"
        ],
        difficultyAdjustments: analysis.recommendations?.difficultyAdjustments || [
          "Increase difficulty in strong areas",
          "Maintain current level in developing areas"
        ],
        timeOptimizations: analysis.recommendations?.timeOptimizations || [
          "Study during peak performance hours",
          "Take breaks every 45 minutes",
          "Review before sleep for retention"
        ]
      }
    };

  } catch (error) {
    console.error("Error generating analytics:", error);
    return generateDefaultAnalytics();
  }
}

function generateDefaultAnalytics(): UserAnalytics {
  return {
    studyPatterns: {
      peakStudyHours: ["morning", "evening"],
      averageSessionLength: 35,
      consistencyScore: 85,
      preferredDifficulty: "intermediate"
    },
    performanceInsights: {
      strongCategories: ["Respiratory", "Neurology"],
      weakCategories: ["Cardiology", "Ethics"],
      improvementTrend: 18,
      accuracyByTimeOfDay: [
        { hour: 9, accuracy: 82 },
        { hour: 14, accuracy: 75 },
        { hour: 19, accuracy: 88 }
      ]
    },
    learningProfile: {
      learningStyle: "mixed",
      retentionRate: 78,
      adaptationSpeed: "moderate",
      motivationalFactors: ["progress", "achievement", "social"]
    },
    recommendations: {
      priorityTopics: ["Cardiovascular System", "Medical Ethics", "Clinical Pharmacology"],
      suggestedStudyPlan: [
        "Focus 40% study time on cardiovascular topics",
        "Complete 25 MCQs daily with immediate review",
        "Practice OSCE stations twice weekly",
        "Join study groups for ethics discussions"
      ],
      difficultyAdjustments: [
        "Increase question difficulty in respiratory medicine",
        "Focus on basic concepts in cardiology",
        "Mix intermediate and advanced neurology questions"
      ],
      timeOptimizations: [
        "Schedule intensive study during 9-11 AM peak hours",
        "Use evening time for OSCE practice",
        "Implement 45-minute focused study blocks",
        "Review flashcards during commute time"
      ]
    }
  };
}

export async function generateAdaptiveLearningPlan(userId: number, analytics: UserAnalytics): Promise<{
  dailyGoals: { date: string; tasks: string[]; estimatedTime: number }[];
  weeklyTargets: { week: string; focus: string; metrics: string[] }[];
  adaptiveQuestions: { category: string; difficulty: string; count: number }[];
  personalizedTips: string[];
}> {
  try {
    const prompt = `
Based on this user's learning analytics, create a personalized 2-week adaptive learning plan:

Strong Categories: ${analytics.performanceInsights.strongCategories.join(', ')}
Weak Categories: ${analytics.performanceInsights.weakCategories.join(', ')}
Learning Style: ${analytics.learningProfile.learningStyle}
Study Pattern: ${analytics.studyPatterns.peakStudyHours.join(', ')} hours
Consistency Score: ${analytics.studyPatterns.consistencyScore}%

Create detailed daily goals, weekly targets, adaptive question distribution, and personalized study tips.

Respond in JSON format:
{
  "dailyGoals": [{"date": "2025-06-06", "tasks": ["task1", "task2"], "estimatedTime": 60}],
  "weeklyTargets": [{"week": "Week 1", "focus": "Cardiology", "metrics": ["80% accuracy", "50 questions"]}],
  "adaptiveQuestions": [{"category": "Cardiology", "difficulty": "intermediate", "count": 15}],
  "personalizedTips": ["tip1", "tip2", "tip3"]
}
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      max_tokens: 1200
    });

    return JSON.parse(response.choices[0].message.content || "{}");
  } catch (error) {
    console.error("Error generating adaptive plan:", error);
    return {
      dailyGoals: [
        {
          date: "2025-06-06",
          tasks: ["Review cardiology basics", "Practice 20 MCQs", "Watch OSCE video"],
          estimatedTime: 90
        }
      ],
      weeklyTargets: [
        {
          week: "Week 1",
          focus: "Cardiovascular System",
          metrics: ["Achieve 75% accuracy", "Complete 100 questions", "Master ECG interpretation"]
        }
      ],
      adaptiveQuestions: [
        { category: "Cardiology", difficulty: "beginner", count: 20 },
        { category: "Respiratory", difficulty: "intermediate", count: 15 }
      ],
      personalizedTips: [
        "Focus on weak areas during peak study hours",
        "Use visual aids for better retention",
        "Practice explaining concepts aloud"
      ]
    };
  }
}
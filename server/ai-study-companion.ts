// AI-Powered Study Companion for PLAB Preparation
// Provides personalized learning support and real-time assistance

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface StudySession {
  userId: number;
  sessionId: string;
  startTime: Date;
  currentTopic: string;
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
  difficultyLevel: string;
  goals: string[];
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  context?: {
    questionId?: number;
    category?: string;
    userAnswer?: string;
    correctAnswer?: string;
  };
}

export interface PersonalizedExplanation {
  concept: string;
  simplifiedExplanation: string;
  detailedExplanation: string;
  clinicalExample: string;
  memoryTricks: string[];
  relatedTopics: string[];
  practiceQuestions: string[];
}

export class AIStudyCompanion {
  
  // Generate personalized explanation based on user's learning style
  async generatePersonalizedExplanation(
    concept: string, 
    userAnswer: string, 
    correctAnswer: string,
    learningStyle: string,
    previousMistakes: string[]
  ): Promise<PersonalizedExplanation> {
    
    const prompt = `As a medical education AI tutor, explain this concept for a PLAB candidate:

Concept: ${concept}
User's Answer: ${userAnswer}
Correct Answer: ${correctAnswer}
Learning Style: ${learningStyle}
Previous Common Mistakes: ${previousMistakes.join(', ')}

Provide:
1. Simple explanation (2-3 sentences)
2. Detailed explanation with pathophysiology
3. Clinical example/case scenario
4. Memory tricks/mnemonics
5. Related topics to study
6. Practice question suggestions

Adapt the explanation style for ${learningStyle} learners.`;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are an expert medical educator specializing in PLAB preparation. Provide clear, accurate, and engaging explanations adapted to different learning styles."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
      });

      const result = JSON.parse(response.choices[0].message.content || '{}');
      
      return {
        concept,
        simplifiedExplanation: result.simple_explanation || '',
        detailedExplanation: result.detailed_explanation || '',
        clinicalExample: result.clinical_example || '',
        memoryTricks: result.memory_tricks || [],
        relatedTopics: result.related_topics || [],
        practiceQuestions: result.practice_questions || []
      };
    } catch (error) {
      throw new Error("Failed to generate personalized explanation: " + error.message);
    }
  }

  // Interactive chat support for medical questions
  async processStudyQuestion(
    question: string,
    sessionContext: StudySession,
    chatHistory: ChatMessage[]
  ): Promise<string> {
    
    const contextPrompt = `Current study session:
Topic: ${sessionContext.currentTopic}
Learning Style: ${sessionContext.learningStyle}
Difficulty: ${sessionContext.difficultyLevel}
Goals: ${sessionContext.goals.join(', ')}

Recent conversation context:
${chatHistory.slice(-5).map(msg => `${msg.role}: ${msg.content}`).join('\n')}

Student question: ${question}

Provide a helpful, accurate response that:
1. Directly answers the question
2. Relates to current study topic when relevant
3. Suggests follow-up study areas
4. Maintains encouraging tone
5. Uses appropriate difficulty level`;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a knowledgeable PLAB tutor. Provide accurate medical information while being supportive and educational. Always encourage active learning and critical thinking."
          },
          {
            role: "user",
            content: contextPrompt
          }
        ],
      });

      return response.choices[0].message.content || "I apologize, but I couldn't process your question. Please try rephrasing it.";
    } catch (error) {
      throw new Error("Failed to process study question: " + error.message);
    }
  }

  // Generate study plan recommendations
  async generateStudyPlan(
    userProfile: {
      weakAreas: string[];
      strongAreas: string[];
      timeAvailable: number; // hours per week
      examDate: Date;
      currentLevel: string;
    }
  ): Promise<{
    weeklyPlan: any[];
    dailySchedule: any[];
    milestones: any[];
    recommendations: string[];
  }> {
    
    const weeksUntilExam = Math.ceil((userProfile.examDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24 * 7));
    
    const prompt = `Create a personalized PLAB study plan:

Weak Areas: ${userProfile.weakAreas.join(', ')}
Strong Areas: ${userProfile.strongAreas.join(', ')}
Time Available: ${userProfile.timeAvailable} hours/week
Weeks Until Exam: ${weeksUntilExam}
Current Level: ${userProfile.currentLevel}

Generate:
1. Weekly study plan with focus areas
2. Daily schedule breakdown
3. Key milestones and assessments
4. Specific recommendations

Format as JSON with clear structure.`;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are an expert PLAB study planner. Create realistic, effective study schedules that maximize learning efficiency."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
      });

      return JSON.parse(response.choices[0].message.content || '{}');
    } catch (error) {
      throw new Error("Failed to generate study plan: " + error.message);
    }
  }

  // Analyze performance patterns and provide insights
  async analyzePerformancePattern(
    performanceData: {
      category: string;
      accuracy: number;
      timeSpent: number;
      attempts: number;
      recentTrend: 'improving' | 'declining' | 'stable';
    }[]
  ): Promise<{
    overallAssessment: string;
    specificInsights: string[];
    actionItems: string[];
    focusAreas: string[];
  }> {
    
    const prompt = `Analyze this PLAB performance data and provide insights:

${performanceData.map(data => 
  `${data.category}: ${(data.accuracy * 100).toFixed(1)}% accuracy, ${data.attempts} attempts, trend: ${data.recentTrend}`
).join('\n')}

Provide:
1. Overall performance assessment
2. Specific insights for each category
3. Actionable improvement items
4. Priority focus areas for next study sessions

Format as JSON.`;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are an expert in medical education analytics. Provide constructive, specific feedback that helps students improve their PLAB performance."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
      });

      return JSON.parse(response.choices[0].message.content || '{}');
    } catch (error) {
      throw new Error("Failed to analyze performance: " + error.message);
    }
  }

  // Generate case-based discussions
  async generateInteractiveCase(
    specialty: string,
    difficulty: string,
    learningObjectives: string[]
  ): Promise<{
    caseScenario: string;
    patientDetails: any;
    questions: string[];
    teachingPoints: string[];
    differentialDiagnosis: string[];
  }> {
    
    const prompt = `Create an interactive PLAB case study:

Specialty: ${specialty}
Difficulty: ${difficulty}
Learning Objectives: ${learningObjectives.join(', ')}

Generate:
1. Realistic patient scenario
2. Patient demographics and presentation
3. Progressive questioning sequence
4. Key teaching points
5. Differential diagnosis considerations

Make it engaging and clinically relevant for UK practice.`;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a clinical educator creating realistic medical cases for PLAB preparation. Ensure accuracy and relevance to UK medical practice."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
      });

      return JSON.parse(response.choices[0].message.content || '{}');
    } catch (error) {
      throw new Error("Failed to generate interactive case: " + error.message);
    }
  }

  // Real-time feedback during study sessions
  async provideRealTimeFeedback(
    userAction: {
      type: 'question_attempt' | 'concept_review' | 'time_spent';
      data: any;
      timestamp: Date;
    },
    sessionProgress: {
      questionsAnswered: number;
      timeElapsed: number;
      currentStreak: number;
      strugglingAreas: string[];
    }
  ): Promise<{
    encouragement: string;
    suggestions: string[];
    adjustments: string[];
  }> {
    
    const prompt = `Provide real-time study feedback:

User Action: ${userAction.type}
Session Progress: ${JSON.stringify(sessionProgress)}
Current Time: ${userAction.timestamp.toISOString()}

Generate motivating feedback with:
1. Encouraging message
2. Specific suggestions for improvement
3. Session adjustments if needed

Keep it brief but impactful.`;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a supportive study companion providing real-time encouragement and guidance. Be positive and constructive."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
      });

      return JSON.parse(response.choices[0].message.content || '{}');
    } catch (error) {
      throw new Error("Failed to provide real-time feedback: " + error.message);
    }
  }
}

// Learning style detection and adaptation
export class LearningStyleAdaptor {
  
  // Detect user's learning style based on behavior
  detectLearningStyle(userBehavior: {
    timeOnExplanations: number;
    prefersImages: boolean;
    asksManyQuestions: boolean;
    practicesRepeatedly: boolean;
    studySessionLength: number;
  }): 'visual' | 'auditory' | 'kinesthetic' | 'reading' {
    
    let scores = {
      visual: 0,
      auditory: 0,
      kinesthetic: 0,
      reading: 0
    };

    // Visual learner indicators
    if (userBehavior.prefersImages) scores.visual += 3;
    if (userBehavior.timeOnExplanations > 180) scores.visual += 2;

    // Auditory learner indicators  
    if (userBehavior.asksManyQuestions) scores.auditory += 3;
    if (userBehavior.studySessionLength < 45) scores.auditory += 1;

    // Kinesthetic learner indicators
    if (userBehavior.practicesRepeatedly) scores.kinesthetic += 3;
    if (userBehavior.studySessionLength < 30) scores.kinesthetic += 2;

    // Reading learner indicators
    if (userBehavior.timeOnExplanations > 300) scores.reading += 3;
    if (!userBehavior.asksManyQuestions) scores.reading += 2;

    // Return highest scoring style
    return Object.entries(scores).reduce((a, b) => scores[a[0]] > scores[b[0]] ? a : b)[0] as any;
  }

  // Adapt content based on learning style
  adaptContent(content: string, style: string): {
    adaptedContent: string;
    additionalResources: string[];
    studyTips: string[];
  } {
    
    const adaptations = {
      visual: {
        additionalResources: ['Diagrams and flowcharts', 'Mind maps', 'Color-coded notes', 'Medical illustrations'],
        studyTips: ['Use highlighters for key concepts', 'Create visual associations', 'Watch medical videos', 'Draw concept maps']
      },
      auditory: {
        additionalResources: ['Podcast explanations', 'Discussion groups', 'Audio recordings', 'Verbal mnemonics'],
        studyTips: ['Read aloud', 'Discuss with study partners', 'Use audio notes', 'Create verbal associations']
      },
      kinesthetic: {
        additionalResources: ['Practice scenarios', 'Hands-on simulations', 'Movement-based learning', 'Physical models'],
        studyTips: ['Take frequent breaks', 'Use flashcards', 'Practice procedures', 'Walk while studying']
      },
      reading: {
        additionalResources: ['Detailed textbooks', 'Written summaries', 'Research papers', 'Written case studies'],
        studyTips: ['Take comprehensive notes', 'Create written summaries', 'Use bullet points', 'Read multiple sources']
      }
    };

    return {
      adaptedContent: content, // Would be modified based on style
      additionalResources: adaptations[style]?.additionalResources || [],
      studyTips: adaptations[style]?.studyTips || []
    };
  }
}
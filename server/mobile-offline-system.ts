import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Mobile-First Offline Learning System
export interface OfflineContent {
  id: string;
  type: 'microlearning' | 'flashcard' | 'question-bank' | 'study-note' | 'video-summary';
  title: string;
  content: any;
  specialty: string;
  difficulty: string;
  estimatedTime: number; // minutes
  prerequisites: string[];
  downloadSize: number; // bytes
  lastUpdated: Date;
  syncStatus: 'synced' | 'pending' | 'conflict' | 'offline-only';
  priority: 'critical' | 'important' | 'standard' | 'optional';
}

export interface MicrolearningModule {
  id: string;
  title: string;
  duration: number; // 5-10 minutes
  learningObjectives: string[];
  content: {
    introduction: string;
    keyPoints: KeyPoint[];
    clinicalExample: ClinicalExample;
    quickQuiz: QuickQuiz;
    takeaway: string;
  };
  adaptiveElements: {
    difficultyLevel: number;
    personalizedContent: any[];
    nextRecommendations: string[];
  };
  offlineAssets: OfflineAsset[];
}

export interface KeyPoint {
  point: string;
  explanation: string;
  clinicalRelevance: string;
  memoryAid: string;
  visualCue?: string;
}

export interface ClinicalExample {
  scenario: string;
  presentation: string;
  thinking: string;
  action: string;
  outcome: string;
  lessons: string[];
}

export interface QuickQuiz {
  questions: QuickQuestion[];
  passThreshold: number;
  retryAllowed: boolean;
  explanation: string;
}

export interface QuickQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  timeLimit: number;
}

export interface OfflineAsset {
  id: string;
  type: 'image' | 'audio' | 'video' | 'document' | 'interactive';
  url: string;
  localPath: string;
  size: number;
  critical: boolean;
  downloadPriority: number;
}

export interface SmartNotification {
  id: string;
  userId: string;
  type: 'study-reminder' | 'spaced-repetition' | 'achievement' | 'motivational' | 'deadline';
  title: string;
  message: string;
  scheduledTime: Date;
  personalizedContent: any;
  actionItems: NotificationAction[];
  context: {
    userSchedule: any;
    currentGoals: string[];
    recentPerformance: any;
    stressLevel: number;
  };
}

export interface NotificationAction {
  text: string;
  action: 'open-module' | 'start-quiz' | 'review-notes' | 'practice-session' | 'dismiss';
  target: string;
  quickAccess: boolean;
}

export interface VoiceNote {
  id: string;
  audioData: string; // base64 encoded
  transcription: string;
  structuredNotes: StructuredNote;
  generatedFlashcards: any[];
  specialty: string;
  createdAt: Date;
  processingStatus: 'pending' | 'completed' | 'error';
}

export interface StructuredNote {
  mainTopics: string[];
  keyFacts: string[];
  clinicalPearls: string[];
  questionsToReview: string[];
  actionItems: string[];
  connections: TopicConnection[];
}

export interface TopicConnection {
  from: string;
  to: string;
  relationship: 'prerequisite' | 'related' | 'application' | 'contrast';
  strength: number;
}

export class MobileOfflineSystem {
  // Generate Microlearning Modules
  async createMicrolearningModule(topic: string, userLevel: string, timeConstraint: number): Promise<MicrolearningModule> {
    const prompt = `Create a ${timeConstraint}-minute microlearning module on "${topic}" for a ${userLevel} medical student preparing for PLAB.

Design for mobile consumption with:
1. Clear, bite-sized learning objectives
2. Essential key points with memory aids
3. Real UK clinical example with step-by-step thinking
4. Quick self-assessment quiz
5. Actionable takeaway for immediate application

Optimize for:
- Mobile screen reading
- Offline accessibility
- Spaced repetition integration
- Visual memory techniques
- Clinical application focus

Include specific UK medical guidelines and PLAB-relevant information.`;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a mobile learning expert creating micro-modules for medical education. Focus on maximum learning impact in minimal time with mobile-optimized delivery."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.5
      });

      const moduleData = JSON.parse(response.choices[0].message.content || '{}');
      return this.parseMicrolearningModule(moduleData);
    } catch (error) {
      console.error('Error creating microlearning module:', error);
      throw new Error('Failed to create microlearning module');
    }
  }

  // Smart Notification System
  async generatePersonalizedNotifications(
    userId: string,
    userProfile: any,
    currentTime: Date,
    studyGoals: any[]
  ): Promise<SmartNotification[]> {
    const prompt = `Generate personalized study notifications for a PLAB candidate.

User Profile: ${JSON.stringify(userProfile)}
Current Time: ${currentTime.toISOString()}
Study Goals: ${JSON.stringify(studyGoals)}

Create smart notifications that:
1. Respect user's schedule and preferences
2. Optimize for learning retention and motivation
3. Account for stress levels and burnout prevention
4. Provide actionable, time-appropriate study suggestions
5. Use spaced repetition principles

Include notifications for:
- Optimal study times based on circadian rhythm
- Spaced repetition reminders
- Goal milestone celebrations
- Motivational messages during low periods
- Deadline awareness without stress induction`;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a personalized learning assistant that creates intelligent, contextual notifications to optimize study habits and maintain motivation."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.6
      });

      const notifications = JSON.parse(response.choices[0].message.content || '{}');
      return this.parseNotifications(notifications, userId);
    } catch (error) {
      console.error('Error generating notifications:', error);
      return [];
    }
  }

  // Voice Note Transcription and Structuring
  async processVoiceNote(audioBase64: string, context: string): Promise<VoiceNote> {
    // Note: In production, this would use Whisper API for transcription
    const prompt = `Process this medical study voice note and create structured learning content.

Context: ${context}
Audio Content: [Voice note about medical topic - would be transcribed via Whisper API]

From the transcribed content, generate:
1. Clean, organized study notes
2. Key medical facts and clinical pearls
3. Questions for further review
4. Connections to other medical topics
5. Suggested flashcards for spaced repetition

Structure the content for mobile study and offline access.`;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a medical note-taking assistant that transforms voice recordings into structured, actionable study materials optimized for medical education."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.4
      });

      const processedNote = JSON.parse(response.choices[0].message.content || '{}');
      
      return {
        id: `voice_note_${Date.now()}`,
        audioData: audioBase64,
        transcription: processedNote.transcription || "Transcription pending",
        structuredNotes: processedNote.structuredNotes || {
          mainTopics: [],
          keyFacts: [],
          clinicalPearls: [],
          questionsToReview: [],
          actionItems: [],
          connections: []
        },
        generatedFlashcards: processedNote.flashcards || [],
        specialty: processedNote.specialty || 'general',
        createdAt: new Date(),
        processingStatus: 'completed'
      };
    } catch (error) {
      console.error('Error processing voice note:', error);
      return {
        id: `voice_note_${Date.now()}`,
        audioData: audioBase64,
        transcription: "Processing failed",
        structuredNotes: {
          mainTopics: [],
          keyFacts: [],
          clinicalPearls: [],
          questionsToReview: [],
          actionItems: [],
          connections: []
        },
        generatedFlashcards: [],
        specialty: 'general',
        createdAt: new Date(),
        processingStatus: 'error'
      };
    }
  }

  // Offline Content Synchronization
  async optimizeOfflineContent(
    userProfile: any,
    deviceCapacity: number,
    connectionQuality: 'poor' | 'good' | 'excellent'
  ): Promise<{
    prioritizedContent: OfflineContent[];
    downloadStrategy: any;
    syncPlan: any;
  }> {
    const prompt = `Optimize offline content selection for a PLAB candidate with limited device storage.

User Profile: ${JSON.stringify(userProfile)}
Available Storage: ${deviceCapacity} MB
Connection Quality: ${connectionQuality}

Prioritize content for offline access based on:
1. User's weak areas and study goals
2. Upcoming exam dates and deadlines
3. Most frequently accessed content
4. Critical vs supplementary materials
5. Content size vs learning impact ratio

Create a download strategy that maximizes learning value within storage constraints.`;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are an offline learning optimization system that intelligently manages content downloads based on user needs and device constraints."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.3
      });

      return JSON.parse(response.choices[0].message.content || '{}');
    } catch (error) {
      console.error('Error optimizing offline content:', error);
      return {
        prioritizedContent: [],
        downloadStrategy: {},
        syncPlan: {}
      };
    }
  }

  // Adaptive Mobile Interface
  async customizeMobileInterface(
    userBehavior: any,
    deviceSpecs: any,
    usageContext: string
  ): Promise<{
    layoutOptimizations: any[];
    navigationChanges: any[];
    contentPresentation: any[];
    accessibilityEnhancements: any[];
  }> {
    const prompt = `Customize mobile interface for optimal learning experience.

User Behavior: ${JSON.stringify(userBehavior)}
Device Specifications: ${JSON.stringify(deviceSpecs)}
Usage Context: ${usageContext}

Optimize for:
1. One-handed operation during commutes
2. Quick access to frequently used features
3. Minimized cognitive load during study
4. Battery efficiency for extended use
5. Accessibility for diverse users

Suggest specific interface modifications that improve learning efficiency and user experience.`;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a mobile UX specialist optimizing educational interfaces for maximum learning efficiency and accessibility."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.5
      });

      return JSON.parse(response.choices[0].message.content || '{}');
    } catch (error) {
      console.error('Error customizing mobile interface:', error);
      return {
        layoutOptimizations: [],
        navigationChanges: [],
        contentPresentation: [],
        accessibilityEnhancements: []
      };
    }
  }

  // Commute Learning Optimization
  async generateCommuteContent(
    commuteProfile: {
      duration: number;
      transportMode: string;
      timeOfDay: string;
      environmentalFactors: string[];
    },
    learningGoals: string[]
  ): Promise<{
    audioContent: any[];
    visualContent: any[];
    interactiveElements: any[];
    handsFreeOptions: any[];
  }> {
    const prompt = `Design learning content optimized for commute study.

Commute Profile: ${JSON.stringify(commuteProfile)}
Learning Goals: ${JSON.stringify(learningGoals)}

Create content that:
1. Works effectively in transportation environments
2. Accommodates varying attention levels
3. Maximizes learning in limited time windows
4. Considers safety and social appropriateness
5. Enables hands-free or minimal interaction learning

Focus on audio-first content with visual support when appropriate.`;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a mobile learning specialist creating content optimized for study during commutes and travel."
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
      console.error('Error generating commute content:', error);
      return {
        audioContent: [],
        visualContent: [],
        interactiveElements: [],
        handsFreeOptions: []
      };
    }
  }

  private parseMicrolearningModule(data: any): MicrolearningModule {
    return {
      id: data.id || `micro_${Date.now()}`,
      title: data.title || 'Microlearning Module',
      duration: data.duration || 5,
      learningObjectives: data.learningObjectives || [],
      content: data.content || {
        introduction: '',
        keyPoints: [],
        clinicalExample: {},
        quickQuiz: { questions: [], passThreshold: 70, retryAllowed: true, explanation: '' },
        takeaway: ''
      },
      adaptiveElements: data.adaptiveElements || {
        difficultyLevel: 1,
        personalizedContent: [],
        nextRecommendations: []
      },
      offlineAssets: data.offlineAssets || []
    };
  }

  private parseNotifications(data: any, userId: string): SmartNotification[] {
    if (!data.notifications) return [];
    
    return data.notifications.map((notif: any) => ({
      id: `notif_${Date.now()}_${Math.random()}`,
      userId,
      type: notif.type || 'study-reminder',
      title: notif.title || 'Study Reminder',
      message: notif.message || 'Time to study!',
      scheduledTime: new Date(notif.scheduledTime || Date.now()),
      personalizedContent: notif.personalizedContent || {},
      actionItems: notif.actionItems || [],
      context: notif.context || {}
    }));
  }
}

export const mobileOffline = new MobileOfflineSystem();
// Re-export types from shared schema for client use
export type {
  User,
  Question,
  UserProgress,
  StudyPlan,
  CommunityPost,
  PostReply,
  OsceStation,
  UserOsceAttempt
} from "@shared/schema";

// Additional client-specific types
export interface QuizSession {
  questions: Question[];
  currentQuestionIndex: number;
  selectedAnswers: Record<number, string>;
  startTime: Date;
  timeLimit?: number;
}

export interface UserStats {
  totalAnswered: number;
  correctAnswers: number;
  averageTime: number;
  categoryStats: Record<string, { correct: number; total: number }>;
}

export interface StudyTask {
  id: string;
  title: string;
  type: 'mcq' | 'osce' | 'review' | 'mock';
  category?: string;
  duration?: number;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
}

export interface OsceAttemptData {
  stationId: number;
  notes: string;
  timeSpent: number;
  selfAssessment: Record<string, number>;
}

export interface CommunityPostWithDetails extends CommunityPost {
  author: { username: string };
  replyCount: number;
  isLiked?: boolean;
}

export interface NotificationData {
  id: string;
  type: 'reminder' | 'achievement' | 'community' | 'system';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

export interface ProgressData {
  daily: { correct: number; total: number }[];
  weekly: { correct: number; total: number }[];
  monthly: { correct: number; total: number }[];
}

export interface ExamSchedule {
  plabOneDate?: Date;
  plabTwoDate?: Date;
  preparationWeeks: number;
  currentPhase: 'plab1' | 'plab2' | 'nhs_prep';
}

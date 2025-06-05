import { pgTable, text, serial, integer, boolean, timestamp, jsonb, real, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  currentStage: text("current_stage").notNull().default("onboarding"), // onboarding, plab1, plab2, nhs
  studyStreak: integer("study_streak").notNull().default(0),
  totalPoints: integer("total_points").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // mcq, osce
  category: text("category").notNull(), // cardiology, respiratory, etc.
  difficulty: text("difficulty").notNull(), // easy, medium, hard
  content: text("content").notNull(),
  options: jsonb("options"), // for MCQs
  correctAnswer: text("correct_answer").notNull(),
  explanation: text("explanation").notNull(),
  examType: text("exam_type").notNull(), // plab1, plab2
});

export const userProgress = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  questionId: integer("question_id").notNull(),
  isCorrect: boolean("is_correct").notNull(),
  timeSpent: integer("time_spent").notNull(), // in seconds
  attemptedAt: timestamp("attempted_at").defaultNow().notNull(),
});

export const studyPlan = pgTable("study_plan", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  date: text("date").notNull(), // YYYY-MM-DD
  tasks: jsonb("tasks").notNull(), // array of task objects
  completed: boolean("completed").notNull().default(false),
});

export const studySessions = pgTable("study_sessions", {
  id: text("id").primaryKey(),
  userId: integer("user_id").notNull(),
  subject: text("subject").notNull(),
  category: text("category").notNull(),
  difficulty: text("difficulty").notNull(), // foundation, intermediate, advanced
  scheduledStart: timestamp("scheduled_start").notNull(),
  scheduledEnd: timestamp("scheduled_end").notNull(),
  duration: integer("duration").notNull(), // minutes
  priority: text("priority").notNull(), // low, medium, high, critical
  sessionType: text("session_type").notNull(), // review, learning, practice, assessment
  learningObjectives: jsonb("learning_objectives").notNull(), // array of strings
  estimatedQuestions: integer("estimated_questions").notNull(),
  completed: boolean("completed").notNull().default(false),
  actualStart: timestamp("actual_start"),
  actualEnd: timestamp("actual_end"),
  performance: jsonb("performance"), // { accuracy, timePerQuestion, confidence }
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const userPreferences = pgTable("user_preferences", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().unique(),
  preferredStudyHours: jsonb("preferred_study_hours").notNull(), // { start: number, end: number }
  preferredDays: jsonb("preferred_days").notNull(), // array of numbers 0-6
  maxSessionDuration: integer("max_session_duration").notNull().default(60), // minutes
  minBreakBetweenSessions: integer("min_break_between_sessions").notNull().default(15), // minutes
  studyIntensity: text("study_intensity").notNull().default("moderate"), // light, moderate, intensive
  learningStyle: text("learning_style").notNull().default("visual"), // visual, auditory, kinesthetic, reading
  weakAreas: jsonb("weak_areas").notNull().default('[]'), // array of strings
  strongAreas: jsonb("strong_areas").notNull().default('[]'), // array of strings
  examDate: date("exam_date"),
  dailyStudyGoal: integer("daily_study_goal").notNull().default(120), // minutes
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const performanceMetrics = pgTable("performance_metrics", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  category: text("category").notNull(),
  difficulty: text("difficulty").notNull(),
  recentAccuracy: real("recent_accuracy").notNull(),
  averageTimePerQuestion: real("average_time_per_question").notNull(),
  completionRate: real("completion_rate").notNull(),
  retentionRate: real("retention_rate").notNull(),
  improvementTrend: real("improvement_trend").notNull(), // -1 to 1
  lastStudied: timestamp("last_studied").notNull(),
  masteryLevel: integer("mastery_level").notNull(), // 0-100
  strugglingTopics: jsonb("struggling_topics").notNull().default('[]'), // array of strings
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const studyReminders = pgTable("study_reminders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  sessionId: text("session_id").notNull(),
  reminderTime: timestamp("reminder_time").notNull(),
  message: text("message").notNull(),
  type: text("type").notNull(), // preparation, start, break, review
  sent: boolean("sent").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const communityPosts = pgTable("community_posts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(), // plab1, plab2, study-groups, nhs-prep, success-stories
  likes: integer("likes").notNull().default(0),
  replies: integer("replies").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const postReplies = pgTable("post_replies", {
  id: serial("id").primaryKey(),
  postId: integer("post_id").notNull(),
  userId: integer("user_id").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const osceStations = pgTable("osce_stations", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull(), // history-taking, examination, communication
  description: text("description").notNull(),
  timeLimit: integer("time_limit").notNull(), // in minutes
  markingCriteria: jsonb("marking_criteria").notNull(),
  patientInfo: jsonb("patient_info").notNull(),
});

export const userOsceAttempts = pgTable("user_osce_attempts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  stationId: integer("station_id").notNull(),
  score: integer("score").notNull(),
  feedback: text("feedback"),
  completedAt: timestamp("completed_at").defaultNow().notNull(),
});

// Adaptive Learning System Tables
export const userLearningProfile = pgTable("user_learning_profile", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  weakCategories: text("weak_categories").array(),
  strongCategories: text("strong_categories").array(),
  learningVelocity: integer("learning_velocity").default(100), // percentage (100 = normal pace)
  lastUpdated: timestamp("last_updated").defaultNow()
});

export const adaptiveRecommendations = pgTable("adaptive_recommendations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  questionId: integer("question_id").references(() => questions.id),
  priority: integer("priority").notNull(), // 1-10 scale
  reason: text("reason").notNull(), // why this was recommended
  createdAt: timestamp("created_at").defaultNow(),
  isCompleted: boolean("is_completed").default(false)
});

// Enhanced Study Planning
export const smartStudyPlans = pgTable("smart_study_plans", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  examDate: date("exam_date").notNull(),
  dailyHours: real("daily_hours").notNull(),
  autoRebalance: boolean("auto_rebalance").default(true),
  adaptiveMode: boolean("adaptive_mode").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  lastRebalanced: timestamp("last_rebalanced")
});

export const dailyStudyGoals = pgTable("daily_study_goals", {
  id: serial("id").primaryKey(),
  planId: integer("plan_id").notNull().references(() => smartStudyPlans.id),
  date: date("date").notNull(),
  categories: text("categories").array(),
  targetQuestions: integer("target_questions").notNull(),
  targetTime: integer("target_time").notNull(), // in minutes
  isCompleted: boolean("is_completed").default(false),
  actualQuestions: integer("actual_questions").default(0),
  actualTime: integer("actual_time").default(0)
});

// Mentor System
export const mentors = pgTable("mentors", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  specialties: text("specialties").array(),
  plabPassDate: date("plab_pass_date"),
  currentPosition: text("current_position"),
  isVerified: boolean("is_verified").default(false),
  rating: real("rating").default(0),
  totalSessions: integer("total_sessions").default(0),
  hourlyRate: integer("hourly_rate"), // in pence, null for free mentors
  bio: text("bio"),
  availableHours: text("available_hours") // JSON string with schedule
});

export const mentoringSessions = pgTable("mentoring_sessions", {
  id: serial("id").primaryKey(),
  menteeId: integer("mentee_id").notNull().references(() => users.id),
  mentorId: integer("mentor_id").notNull().references(() => mentors.id),
  topic: text("topic").notNull(),
  scheduledAt: timestamp("scheduled_at").notNull(),
  duration: integer("duration").notNull(), // in minutes
  status: text("status").notNull(), // scheduled, completed, cancelled
  feedback: text("feedback"),
  rating: integer("rating") // 1-5 stars
});

// Cultural Context Training
export const culturalModules = pgTable("cultural_modules", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(), // nhs-structure, communication, ethics
  difficulty: text("difficulty").notNull(), // beginner, intermediate, advanced
  estimatedTime: integer("estimated_time").notNull() // in minutes
});

export const userCulturalProgress = pgTable("user_cultural_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  moduleId: integer("module_id").notNull().references(() => culturalModules.id),
  isCompleted: boolean("is_completed").default(false),
  score: integer("score"),
  completedAt: timestamp("completed_at")
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  email: true,
  username: true,
  password: true,
  currentStage: true,
});

export const insertQuestionSchema = createInsertSchema(questions).pick({
  type: true,
  category: true,
  difficulty: true,
  content: true,
  options: true,
  correctAnswer: true,
  explanation: true,
  examType: true,
});

export const insertUserProgressSchema = createInsertSchema(userProgress).pick({
  userId: true,
  questionId: true,
  isCorrect: true,
  timeSpent: true,
});

export const insertStudyPlanSchema = createInsertSchema(studyPlan).pick({
  userId: true,
  date: true,
  tasks: true,
  completed: true,
});

export const insertCommunityPostSchema = createInsertSchema(communityPosts).pick({
  userId: true,
  title: true,
  content: true,
  category: true,
});

export const insertPostReplySchema = createInsertSchema(postReplies).pick({
  postId: true,
  userId: true,
  content: true,
});

export const insertOsceStationSchema = createInsertSchema(osceStations).pick({
  title: true,
  category: true,
  description: true,
  timeLimit: true,
  markingCriteria: true,
  patientInfo: true,
});

export const insertUserOsceAttemptSchema = createInsertSchema(userOsceAttempts).pick({
  userId: true,
  stationId: true,
  score: true,
  feedback: true,
});

export const insertUserLearningProfileSchema = createInsertSchema(userLearningProfile).pick({
  userId: true,
  weakCategories: true,
  strongCategories: true,
  learningVelocity: true,
});

export const insertAdaptiveRecommendationSchema = createInsertSchema(adaptiveRecommendations).pick({
  userId: true,
  questionId: true,
  priority: true,
  reason: true,
});

export const insertSmartStudyPlanSchema = createInsertSchema(smartStudyPlans).pick({
  userId: true,
  examDate: true,
  dailyHours: true,
  autoRebalance: true,
  adaptiveMode: true,
});

export const insertDailyStudyGoalSchema = createInsertSchema(dailyStudyGoals).pick({
  planId: true,
  date: true,
  categories: true,
  targetQuestions: true,
  targetTime: true,
});

export const insertMentorSchema = createInsertSchema(mentors).pick({
  userId: true,
  specialties: true,
  plabPassDate: true,
  currentPosition: true,
  bio: true,
  hourlyRate: true,
  availableHours: true,
});

export const insertMentoringSessionSchema = createInsertSchema(mentoringSessions).pick({
  menteeId: true,
  mentorId: true,
  topic: true,
  scheduledAt: true,
  duration: true,
  status: true,
});

export const insertCulturalModuleSchema = createInsertSchema(culturalModules).pick({
  title: true,
  description: true,
  content: true,
  category: true,
  difficulty: true,
  estimatedTime: true,
});

export const insertUserCulturalProgressSchema = createInsertSchema(userCulturalProgress).pick({
  userId: true,
  moduleId: true,
  score: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Question = typeof questions.$inferSelect;
export type InsertQuestion = z.infer<typeof insertQuestionSchema>;
export type UserProgress = typeof userProgress.$inferSelect;
export type InsertUserProgress = z.infer<typeof insertUserProgressSchema>;
export type StudyPlan = typeof studyPlan.$inferSelect;
export type InsertStudyPlan = z.infer<typeof insertStudyPlanSchema>;
export type CommunityPost = typeof communityPosts.$inferSelect;
export type InsertCommunityPost = z.infer<typeof insertCommunityPostSchema>;
export type PostReply = typeof postReplies.$inferSelect;
export type InsertPostReply = z.infer<typeof insertPostReplySchema>;
export type OsceStation = typeof osceStations.$inferSelect;
export type InsertOsceStation = z.infer<typeof insertOsceStationSchema>;
export type UserOsceAttempt = typeof userOsceAttempts.$inferSelect;
export type InsertUserOsceAttempt = z.infer<typeof insertUserOsceAttemptSchema>;

// Study Scheduler Types
export type StudySession = typeof studySessions.$inferSelect;
export type InsertStudySession = typeof studySessions.$inferInsert;
export type UserPreferences = typeof userPreferences.$inferSelect;
export type InsertUserPreferences = typeof userPreferences.$inferInsert;
export type PerformanceMetrics = typeof performanceMetrics.$inferSelect;
export type InsertPerformanceMetrics = typeof performanceMetrics.$inferInsert;
export type StudyReminder = typeof studyReminders.$inferSelect;
export type InsertStudyReminder = typeof studyReminders.$inferInsert;

// Study Scheduler Schemas
export const insertStudySessionSchema = createInsertSchema(studySessions);
export const insertUserPreferencesSchema = createInsertSchema(userPreferences);
export const insertPerformanceMetricsSchema = createInsertSchema(performanceMetrics);
export const insertStudyReminderSchema = createInsertSchema(studyReminders);

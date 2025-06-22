import { pgTable, text, serial, integer, boolean, timestamp, jsonb, real, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  currentStage: text("current_stage").notNull().default("onboarding"),
  studyStreak: integer("study_streak").notNull().default(0),
  totalPoints: integer("total_points").notNull().default(0),
  country: text("country"),
  city: text("city"),
  flagEmoji: text("flag_emoji"),
  timezone: text("timezone"),
  isLocationPublic: boolean("is_location_public").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(),
  category: text("category").notNull(),
  difficulty: text("difficulty").notNull(),
  content: text("content").notNull(),
  options: jsonb("options"),
  correctAnswer: text("correct_answer").notNull(),
  explanation: text("explanation").notNull(),
  examType: text("exam_type").notNull(),
});

export const userProgress = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  questionId: integer("question_id").notNull(),
  isCorrect: boolean("is_correct").notNull(),
  timeSpent: integer("time_spent").notNull(),
  attemptedAt: timestamp("attempted_at").defaultNow().notNull(),
});

export const studyPlan = pgTable("study_plan", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  date: text("date").notNull(),
  tasks: jsonb("tasks").notNull(),
  completed: boolean("completed").notNull().default(false),
});

// Advanced Analytics Tables
export const globalLeaderboard = pgTable("global_scoreboard", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  totalScore: integer("total_score").notNull().default(0),
  questionsAnswered: integer("questions_answered").notNull().default(0),
  correctAnswers: integer("correct_answers").notNull().default(0),
  accuracyRate: real("accuracy_rate").notNull().default(0),
  studyStreak: integer("study_streak").notNull().default(0),
  totalStudyTime: integer("total_study_time").notNull().default(0),
  plabCategory: text("plab_category").notNull().default("plab1"),
  rank: integer("rank").notNull().default(0),
  countryRank: integer("country_rank").notNull().default(0),
  lastActive: timestamp("last_active").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const weeklyLeaderboard = pgTable("weekly_leaderboard", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  weekStart: text("week_start").notNull(),
  weekEnd: text("week_end").notNull(),
  questionsThisWeek: integer("questions_this_week").notNull().default(0),
  correctThisWeek: integer("correct_this_week").notNull().default(0),
  studyTimeThisWeek: integer("study_time_this_week").notNull().default(0),
  weeklyRank: integer("weekly_rank").notNull().default(0),
  countryWeeklyRank: integer("country_weekly_rank").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const performanceMetrics = pgTable("performance_metrics", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  specialty: text("specialty").notNull(),
  totalQuestions: integer("total_questions").notNull().default(0),
  correctAnswers: integer("correct_answers").notNull().default(0),
  averageTimePerQuestion: real("avg_time_per_question").notNull().default(0),
  difficultyLevel: text("difficulty_level").notNull().default("intermediate"),
  weaknessScore: real("weakness_score").notNull().default(0),
  improvementTrend: real("improvement_trend").notNull().default(0),
  lastAssessed: timestamp("last_assessed").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const studySessions = pgTable("study_sessions", {
  id: text("id").primaryKey(),
  userId: integer("user_id").notNull(),
  sessionType: text("session_type").notNull(),
  category: text("category").notNull(),
  difficulty: text("difficulty").notNull(),
  questionsAttempted: integer("questions_attempted").notNull(),
  correctAnswers: integer("correct_answers").notNull(),
  totalTime: integer("total_time").notNull(),
  accuracyRate: real("accuracy_rate").notNull(),
  averageTimePerQuestion: real("avg_time_per_question").notNull(),
  completed: boolean("completed").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
});

export const achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  requirement: jsonb("requirement").notNull(),
  points: integer("points").notNull().default(0),
  badgeIcon: text("badge_icon").notNull(),
  badgeColor: text("badge_color").notNull(),
  isRare: boolean("is_rare").notNull().default(false),
});

export const userAchievements = pgTable("user_achievements", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  achievementId: integer("achievement_id").notNull(),
  unlockedAt: timestamp("unlocked_at").defaultNow().notNull(),
  isDisplayed: boolean("is_displayed").notNull().default(true),
});

export const adaptiveLearning = pgTable("adaptive_learning", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  specialty: text("specialty").notNull(),
  currentDifficulty: text("current_difficulty").notNull().default("intermediate"),
  masteryLevel: real("mastery_level").notNull().default(0),
  recommendedTopics: jsonb("recommended_topics").notNull(),
  nextReviewDate: timestamp("next_review_date").notNull(),
  spacedRepetitionInterval: integer("spaced_repetition_interval").notNull().default(1),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const studyReminders = pgTable("study_reminders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  reminderType: text("reminder_type").notNull(),
  scheduledTime: text("scheduled_time").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  lastSent: timestamp("last_sent"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Block-based Leaderboards
export const block1Leaderboard = pgTable("block1_leaderboard", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  username: text("username").notNull(),
  timeLimit: integer("time_limit").notNull(),
  questionsCompleted: integer("questions_completed").notNull(),
  correctAnswers: integer("correct_answers").notNull(),
  accuracy: real("accuracy").notNull(),
  questionsPerMinute: real("questions_per_minute").notNull(),
  score: integer("score").notNull(),
  category: text("category").notNull(),
  difficulty: text("difficulty").notNull(),
  completedAt: timestamp("completed_at").defaultNow().notNull(),
});

export const block2Leaderboard = pgTable("block2_leaderboard", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  username: text("username").notNull(),
  timeLimit: integer("time_limit").notNull(),
  questionsCompleted: integer("questions_completed").notNull(),
  correctAnswers: integer("correct_answers").notNull(),
  accuracy: real("accuracy").notNull(),
  questionsPerMinute: real("questions_per_minute").notNull(),
  score: integer("score").notNull(),
  category: text("category").notNull(),
  difficulty: text("difficulty").notNull(),
  completedAt: timestamp("completed_at").defaultNow().notNull(),
});

export const block3Leaderboard = pgTable("block3_leaderboard", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  username: text("username").notNull(),
  totalQuestionsAnswered: integer("total_questions_answered").notNull(),
  totalCorrectAnswers: integer("total_correct_answers").notNull(),
  overallAccuracy: real("overall_accuracy").notNull(),
  studyStreak: integer("study_streak").notNull(),
  sessionsCompleted: integer("sessions_completed").notNull(),
  score: integer("score").notNull(),
  lastUpdated: timestamp("last_updated").defaultNow().notNull(),
});

// Community Features
export const communityPosts = pgTable("community_posts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
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

// OSCE Features
export const osceStations = pgTable("osce_stations", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  difficulty: text("difficulty").notNull(),
  timeLimit: integer("time_limit").notNull(),
  instructions: text("instructions").notNull(),
  examinerChecklist: jsonb("examiner_checklist").notNull(),
  patientInfo: jsonb("patient_info"),
  props: jsonb("props").notNull().default('[]'),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const userOsceAttempts = pgTable("user_osce_attempts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  stationId: integer("station_id").notNull(),
  score: integer("score").notNull(),
  maxScore: integer("max_score").notNull(),
  timeSpent: integer("time_spent").notNull(),
  feedback: text("feedback"),
  checklist: jsonb("checklist").notNull(),
  attemptedAt: timestamp("attempted_at").defaultNow().notNull(),
});

// Schema Types
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertQuestionSchema = createInsertSchema(questions).omit({
  id: true,
});

export const insertUserProgressSchema = createInsertSchema(userProgress).omit({
  id: true,
  attemptedAt: true,
});

export const insertStudyPlanSchema = createInsertSchema(studyPlan).omit({
  id: true,
});

export const insertGlobalLeaderboardSchema = createInsertSchema(globalLeaderboard).omit({
  id: true,
  updatedAt: true,
  lastActive: true,
});

export const insertWeeklyLeaderboardSchema = createInsertSchema(weeklyLeaderboard).omit({
  id: true,
  createdAt: true,
});

export const insertPerformanceMetricsSchema = createInsertSchema(performanceMetrics).omit({
  id: true,
  lastAssessed: true,
  updatedAt: true,
});

export const insertStudySessionSchema = createInsertSchema(studySessions).omit({
  createdAt: true,
  completedAt: true,
});

export const insertAchievementSchema = createInsertSchema(achievements);

export const insertUserAchievementSchema = createInsertSchema(userAchievements).omit({
  id: true,
  unlockedAt: true,
});

export const insertAdaptiveLearningSchema = createInsertSchema(adaptiveLearning).omit({
  id: true,
  updatedAt: true,
});

export const insertStudyReminderSchema = createInsertSchema(studyReminders).omit({
  id: true,
  createdAt: true,
});

export const insertBlock1LeaderboardSchema = createInsertSchema(block1Leaderboard).omit({
  id: true,
  completedAt: true,
});

export const insertBlock2LeaderboardSchema = createInsertSchema(block2Leaderboard).omit({
  id: true,
  completedAt: true,
});

export const insertBlock3LeaderboardSchema = createInsertSchema(block3Leaderboard).omit({
  id: true,
  lastUpdated: true,
});

export const insertCommunityPostSchema = createInsertSchema(communityPosts).omit({
  id: true,
  likes: true,
  replies: true,
  createdAt: true,
});

export const insertPostReplySchema = createInsertSchema(postReplies).omit({
  id: true,
  createdAt: true,
});

export const insertOsceStationSchema = createInsertSchema(osceStations).omit({
  id: true,
  createdAt: true,
});

export const insertUserOsceAttemptSchema = createInsertSchema(userOsceAttempts).omit({
  id: true,
  attemptedAt: true,
});

// Type exports
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Question = typeof questions.$inferSelect;
export type InsertQuestion = z.infer<typeof insertQuestionSchema>;
export type UserProgress = typeof userProgress.$inferSelect;
export type InsertUserProgress = z.infer<typeof insertUserProgressSchema>;
export type StudyPlan = typeof studyPlan.$inferSelect;
export type InsertStudyPlan = z.infer<typeof insertStudyPlanSchema>;
export type GlobalLeaderboard = typeof globalLeaderboard.$inferSelect;
export type InsertGlobalLeaderboard = z.infer<typeof insertGlobalLeaderboardSchema>;
export type WeeklyLeaderboard = typeof weeklyLeaderboard.$inferSelect;
export type InsertWeeklyLeaderboard = z.infer<typeof insertWeeklyLeaderboardSchema>;
export type PerformanceMetrics = typeof performanceMetrics.$inferSelect;
export type InsertPerformanceMetrics = z.infer<typeof insertPerformanceMetricsSchema>;
export type StudySession = typeof studySessions.$inferSelect;
export type InsertStudySession = z.infer<typeof insertStudySessionSchema>;
export type Achievement = typeof achievements.$inferSelect;
export type InsertAchievement = z.infer<typeof insertAchievementSchema>;
export type UserAchievement = typeof userAchievements.$inferSelect;
export type InsertUserAchievement = z.infer<typeof insertUserAchievementSchema>;
export type AdaptiveLearning = typeof adaptiveLearning.$inferSelect;
export type InsertAdaptiveLearning = z.infer<typeof insertAdaptiveLearningSchema>;
export type StudyReminder = typeof studyReminders.$inferSelect;
export type InsertStudyReminder = z.infer<typeof insertStudyReminderSchema>;
export type Block1LeaderboardEntry = typeof block1Leaderboard.$inferSelect;
export type Block2LeaderboardEntry = typeof block2Leaderboard.$inferSelect;
export type Block3LeaderboardEntry = typeof block3Leaderboard.$inferSelect;
export type InsertBlock1Entry = z.infer<typeof insertBlock1LeaderboardSchema>;
export type InsertBlock2Entry = z.infer<typeof insertBlock2LeaderboardSchema>;
export type InsertBlock3Entry = z.infer<typeof insertBlock3LeaderboardSchema>;
export type CommunityPost = typeof communityPosts.$inferSelect;
export type InsertCommunityPost = z.infer<typeof insertCommunityPostSchema>;
export type PostReply = typeof postReplies.$inferSelect;
export type InsertPostReply = z.infer<typeof insertPostReplySchema>;
export type OsceStation = typeof osceStations.$inferSelect;
export type InsertOsceStation = z.infer<typeof insertOsceStationSchema>;
export type UserOsceAttempt = typeof userOsceAttempts.$inferSelect;
export type InsertUserOsceAttempt = z.infer<typeof insertUserOsceAttemptSchema>;
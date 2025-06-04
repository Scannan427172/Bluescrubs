import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
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

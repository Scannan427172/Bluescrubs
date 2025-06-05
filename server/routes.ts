import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { analyzeVideoPerformance, generateStudyPlan } from "./ai-analysis";
import { generateUserAnalytics, generateAdaptiveLearningPlan } from "./analytics-engine";
import { AdvancedAnalyticsEngine } from "./advanced-analytics";
import { GamificationEngine } from "./gamification-system";
import { AIStudyCompanion } from "./ai-study-companion";
import { EnhancedVideoOSCEEngine } from "./enhanced-video-osce";
import { MobileOptimizationEngine } from "./mobile-optimization";
import { ProfessionalDevelopmentEngine } from "./professional-development";
import { CommunityIntegrationEngine } from "./community-integration";
import { findMatchingMentors, generateSessionPlan, getMentorProfiles, bookMentorSession } from "./mentor-matching";
import { generateCulturalContent, assessCulturalCompetency, nhsCulturalModules } from "./cultural-content";
import { 
  insertUserSchema, insertQuestionSchema, insertUserProgressSchema,
  insertStudyPlanSchema, insertCommunityPostSchema, insertPostReplySchema,
  insertUserOsceAttemptSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // User routes
  app.get("/api/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const user = await storage.getUser(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: "Invalid user data" });
    }
  });

  app.patch("/api/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const user = await storage.updateUser(id, updates);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Question routes
  app.get("/api/questions", async (req, res) => {
    try {
      const { examType, category, limit } = req.query;
      const questions = await storage.getQuestions(
        examType as string,
        category as string,
        limit ? parseInt(limit as string) : undefined
      );
      res.json(questions);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/questions/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const question = await storage.getQuestion(id);
      if (!question) {
        return res.status(404).json({ message: "Question not found" });
      }
      res.json(question);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/questions", async (req, res) => {
    try {
      const questionData = insertQuestionSchema.parse(req.body);
      const question = await storage.createQuestion(questionData);
      res.status(201).json(question);
    } catch (error) {
      res.status(400).json({ message: "Invalid question data" });
    }
  });

  // User progress routes
  app.get("/api/users/:userId/progress", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const progress = await storage.getUserProgress(userId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/users/:userId/progress", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const progressData = insertUserProgressSchema.parse({
        ...req.body,
        userId
      });
      const progress = await storage.createUserProgress(progressData);
      res.status(201).json(progress);
    } catch (error) {
      res.status(400).json({ message: "Invalid progress data" });
    }
  });

  app.get("/api/users/:userId/stats", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const stats = await storage.getUserStats(userId);
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Study plan routes
  app.get("/api/users/:userId/study-plan/:date", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const date = req.params.date;
      const plan = await storage.getUserStudyPlan(userId, date);
      if (!plan) {
        return res.status(404).json({ message: "Study plan not found" });
      }
      res.json(plan);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/users/:userId/study-plan", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const planData = insertStudyPlanSchema.parse({
        ...req.body,
        userId
      });
      const plan = await storage.createStudyPlan(planData);
      res.status(201).json(plan);
    } catch (error) {
      res.status(400).json({ message: "Invalid study plan data" });
    }
  });

  app.patch("/api/study-plan/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const plan = await storage.updateStudyPlan(id, updates);
      if (!plan) {
        return res.status(404).json({ message: "Study plan not found" });
      }
      res.json(plan);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Community routes
  app.get("/api/community/posts", async (req, res) => {
    try {
      const { category, limit } = req.query;
      const posts = await storage.getCommunityPosts(
        category as string,
        limit ? parseInt(limit as string) : undefined
      );
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/community/posts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const post = await storage.getCommunityPost(id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/community/posts", async (req, res) => {
    try {
      const postData = insertCommunityPostSchema.parse(req.body);
      const post = await storage.createCommunityPost(postData);
      res.status(201).json(post);
    } catch (error) {
      res.status(400).json({ message: "Invalid post data" });
    }
  });

  app.get("/api/community/posts/:postId/replies", async (req, res) => {
    try {
      const postId = parseInt(req.params.postId);
      const replies = await storage.getPostReplies(postId);
      res.json(replies);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/community/posts/:postId/replies", async (req, res) => {
    try {
      const postId = parseInt(req.params.postId);
      const replyData = insertPostReplySchema.parse({
        ...req.body,
        postId
      });
      const reply = await storage.createPostReply(replyData);
      res.status(201).json(reply);
    } catch (error) {
      res.status(400).json({ message: "Invalid reply data" });
    }
  });

  // OSCE routes
  app.get("/api/osce/stations", async (req, res) => {
    try {
      const stations = await storage.getOsceStations();
      res.json(stations);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/osce/stations/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const station = await storage.getOsceStation(id);
      if (!station) {
        return res.status(404).json({ message: "OSCE station not found" });
      }
      res.json(station);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/users/:userId/osce-attempts", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const attempts = await storage.getUserOsceAttempts(userId);
      res.json(attempts);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/users/:userId/osce-attempts", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const attemptData = insertUserOsceAttemptSchema.parse({
        ...req.body,
        userId
      });
      const attempt = await storage.createUserOsceAttempt(attemptData);
      res.status(201).json(attempt);
    } catch (error) {
      res.status(400).json({ message: "Invalid OSCE attempt data" });
    }
  });

  // AI Analysis routes
  app.post("/api/ai/analyze-video", async (req, res) => {
    try {
      const { stationTitle, stationCategory, learningObjectives, recordingDuration } = req.body;
      
      if (!stationTitle || !stationCategory || !learningObjectives || !recordingDuration) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const analysis = await analyzeVideoPerformance(
        stationTitle,
        stationCategory,
        learningObjectives,
        recordingDuration
      );
      
      res.json(analysis);
    } catch (error) {
      console.error("Video analysis error:", error);
      res.status(500).json({ message: "Failed to analyze video" });
    }
  });

  app.post("/api/ai/generate-study-plan", async (req, res) => {
    try {
      const { analysisResults, weakAreas } = req.body;
      
      if (!analysisResults || !weakAreas) {
        return res.status(400).json({ message: "Missing analysis data" });
      }

      const studyPlan = await generateStudyPlan(analysisResults, weakAreas);
      res.json(studyPlan);
    } catch (error) {
      console.error("Study plan generation error:", error);
      res.status(500).json({ message: "Failed to generate study plan" });
    }
  });

  // Analytics routes
  app.get("/api/analytics/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const analytics = await generateUserAnalytics(userId);
      res.json(analytics);
    } catch (error) {
      console.error("Analytics generation error:", error);
      res.status(500).json({ message: "Failed to generate analytics" });
    }
  });

  app.post("/api/analytics/:userId/adaptive-plan", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const analytics = await generateUserAnalytics(userId);
      const adaptivePlan = await generateAdaptiveLearningPlan(userId, analytics);
      res.json(adaptivePlan);
    } catch (error) {
      console.error("Adaptive plan generation error:", error);
      res.status(500).json({ message: "Failed to generate adaptive plan" });
    }
  });

  // Mentor routes
  app.get("/api/mentors", async (req, res) => {
    try {
      const mentors = await getMentorProfiles();
      res.json(mentors);
    } catch (error) {
      console.error("Error fetching mentors:", error);
      res.status(500).json({ message: "Failed to fetch mentors" });
    }
  });

  app.post("/api/mentors/match", async (req, res) => {
    try {
      const userProfile = req.body;
      const matchingResult = await findMatchingMentors(userProfile);
      res.json(matchingResult);
    } catch (error) {
      console.error("Mentor matching error:", error);
      res.status(500).json({ message: "Failed to find matching mentors" });
    }
  });

  app.post("/api/mentors/:mentorId/session-plan", async (req, res) => {
    try {
      const mentorId = parseInt(req.params.mentorId);
      const { studentWeakAreas, sessionType, duration } = req.body;
      
      const mentors = await getMentorProfiles();
      const mentor = mentors.find(m => m.id === mentorId);
      
      if (!mentor) {
        return res.status(404).json({ message: "Mentor not found" });
      }

      const sessionPlan = await generateSessionPlan(mentor, studentWeakAreas, sessionType, duration);
      res.json(sessionPlan);
    } catch (error) {
      console.error("Session plan generation error:", error);
      res.status(500).json({ message: "Failed to generate session plan" });
    }
  });

  app.post("/api/mentors/:mentorId/book", async (req, res) => {
    try {
      const mentorId = parseInt(req.params.mentorId);
      const { studentId, sessionDetails } = req.body;
      
      const session = await bookMentorSession(mentorId, studentId, {
        ...sessionDetails,
        date: new Date(sessionDetails.date)
      });
      
      res.json(session);
    } catch (error) {
      console.error("Session booking error:", error);
      res.status(500).json({ message: "Failed to book session" });
    }
  });

  // Cultural Training routes
  app.get("/api/cultural-modules", async (req, res) => {
    try {
      res.json(nhsCulturalModules);
    } catch (error) {
      console.error("Error fetching cultural modules:", error);
      res.status(500).json({ message: "Failed to fetch cultural modules" });
    }
  });

  app.post("/api/cultural-modules/generate", async (req, res) => {
    try {
      const { topic, difficulty } = req.body;
      const module = await generateCulturalContent(topic, difficulty);
      res.json(module);
    } catch (error) {
      console.error("Error generating cultural content:", error);
      res.status(500).json({ message: "Failed to generate cultural content" });
    }
  });

  app.post("/api/cultural-competency/assess", async (req, res) => {
    try {
      const { responses } = req.body;
      const assessment = await assessCulturalCompetency(responses);
      res.json(assessment);
    } catch (error) {
      console.error("Error assessing cultural competency:", error);
      res.status(500).json({ message: "Failed to assess cultural competency" });
    }
  });

  // Initialize advanced system engines
  const advancedAnalytics = new AdvancedAnalyticsEngine();
  const gamificationEngine = new GamificationEngine();
  const aiStudyCompanion = new AIStudyCompanion();
  const videoOSCEEngine = new EnhancedVideoOSCEEngine();
  const mobileOptimization = new MobileOptimizationEngine();
  const professionalDevelopment = new ProfessionalDevelopmentEngine();
  const communityIntegration = new CommunityIntegrationEngine();

  // Advanced Analytics API
  app.get("/api/analytics/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const userStats = await storage.getUserStats(userId);
      const userProgress = await storage.getUserProgress(userId);
      
      // Generate comprehensive analytics
      const performanceTrends = advancedAnalytics.calculatePerformanceTrends(userProgress, 'month');
      const allUserStats = await storage.getAllUserStats();
      const peerComparison = advancedAnalytics.generatePeerComparison(userId, userStats, allUserStats);
      const predictiveScore = advancedAnalytics.generatePredictiveScore(userStats, {}, 60);
      const knowledgeGaps = advancedAnalytics.analyzeKnowledgeGaps(userStats, userProgress.slice(-20));
      
      res.json({
        performanceTrends,
        peerComparison,
        predictiveScore,
        knowledgeGaps,
        overallReadiness: predictiveScore.readinessScore,
        lastUpdated: new Date()
      });
    } catch (error) {
      console.error("Advanced analytics error:", error);
      res.status(500).json({ message: "Failed to generate analytics" });
    }
  });

  app.post("/api/analytics/:userId/adaptive-plan", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const userStats = await storage.getUserStats(userId);
      const analytics = await generateUserAnalytics(userId);
      const adaptivePlan = await generateAdaptiveLearningPlan(userId, analytics);
      
      res.json(adaptivePlan);
    } catch (error) {
      console.error("Adaptive plan generation error:", error);
      res.status(500).json({ message: "Failed to generate adaptive plan" });
    }
  });

  // Gamification System API
  app.get("/api/gamification/:userId/achievements", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const userStats = await storage.getUserStats(userId);
      const recentActivity = await storage.getUserProgress(userId);
      
      const newAchievements = await gamificationEngine.checkAchievements(userId, userStats, recentActivity.slice(-50));
      const currentStreak = gamificationEngine.updateStudyStreak(userId, new Date());
      const motivationalMessage = gamificationEngine.generateMotivationalMessage(userStats, [], currentStreak.currentStreak);
      const userPoints = userStats.totalPoints || 0;
      const badge = gamificationEngine.getBadgeForPoints(userPoints);
      
      res.json({
        newAchievements,
        currentStreak,
        motivationalMessage,
        badge,
        totalPoints: userPoints
      });
    } catch (error) {
      console.error("Gamification error:", error);
      res.status(500).json({ message: "Failed to fetch gamification data" });
    }
  });

  app.get("/api/gamification/leaderboard", async (req, res) => {
    try {
      const { timeframe = 'weekly', category, limit = 50 } = req.query;
      const leaderboard = await gamificationEngine.generateLeaderboard(
        timeframe as any, 
        category as string, 
        parseInt(limit as string)
      );
      
      res.json(leaderboard);
    } catch (error) {
      console.error("Leaderboard error:", error);
      res.status(500).json({ message: "Failed to fetch leaderboard" });
    }
  });

  // AI Study Companion API
  app.post("/api/ai-companion/explanation", async (req, res) => {
    try {
      const { concept, userAnswer, correctAnswer, learningStyle, previousMistakes } = req.body;
      const explanation = await aiStudyCompanion.generatePersonalizedExplanation(
        concept, userAnswer, correctAnswer, learningStyle, previousMistakes || []
      );
      
      res.json(explanation);
    } catch (error) {
      console.error("AI explanation error:", error);
      res.status(500).json({ message: "Failed to generate explanation" });
    }
  });

  app.post("/api/ai-companion/study-plan", async (req, res) => {
    try {
      const { userProfile } = req.body;
      const studyPlan = await aiStudyCompanion.generateStudyPlan(userProfile);
      
      res.json(studyPlan);
    } catch (error) {
      console.error("Study plan error:", error);
      res.status(500).json({ message: "Failed to generate study plan" });
    }
  });

  app.post("/api/ai-companion/performance-analysis", async (req, res) => {
    try {
      const { performanceData } = req.body;
      const analysis = await aiStudyCompanion.analyzePerformancePattern(performanceData);
      
      res.json(analysis);
    } catch (error) {
      console.error("Performance analysis error:", error);
      res.status(500).json({ message: "Failed to analyse performance" });
    }
  });

  // Enhanced Video OSCE API
  app.post("/api/video-osce/analyse", async (req, res) => {
    try {
      const { videoData, audioData, stationRequirements } = req.body;
      
      // Convert base64 to blob simulation
      const videoBlob = new Blob([Buffer.from(videoData, 'base64')]);
      const audioBlob = new Blob([Buffer.from(audioData, 'base64')]);
      
      const analysis = await videoOSCEEngine.analyzeOSCEVideo(videoBlob, audioBlob, stationRequirements);
      const feedbackReport = await videoOSCEEngine.generateFeedbackReport(analysis, stationRequirements);
      
      res.json({
        analysis,
        feedbackReport,
        sessionId: `session_${Date.now()}`
      });
    } catch (error) {
      console.error("Video OSCE analysis error:", error);
      res.status(500).json({ message: "Failed to analyse OSCE video" });
    }
  });

  // Professional Development API
  app.post("/api/professional/cv-builder", async (req, res) => {
    try {
      const { profile } = req.body;
      const cvResult = await professionalDevelopment.buildNHSCV(profile);
      
      res.json(cvResult);
    } catch (error) {
      console.error("CV builder error:", error);
      res.status(500).json({ message: "Failed to build CV" });
    }
  });

  app.get("/api/professional/foundation-programme/:year", async (req, res) => {
    try {
      const year = parseInt(req.params.year);
      const programme = await professionalDevelopment.getFoundationProgrammeGuidance(year);
      
      res.json(programme);
    } catch (error) {
      console.error("Foundation programme error:", error);
      res.status(500).json({ message: "Failed to fetch foundation programme data" });
    }
  });

  app.get("/api/professional/specialty-training", async (req, res) => {
    try {
      const specialtyTraining = await professionalDevelopment.getSpecialtyGuidance();
      
      res.json(specialtyTraining);
    } catch (error) {
      console.error("Specialty training error:", error);
      res.status(500).json({ message: "Failed to fetch specialty training data" });
    }
  });

  // Community Features API
  app.post("/api/community/study-groups", async (req, res) => {
    try {
      const { creatorId, groupData } = req.body;
      const studyGroup = await communityIntegration.createStudyGroup(creatorId, groupData);
      
      res.json(studyGroup);
    } catch (error) {
      console.error("Study group creation error:", error);
      res.status(500).json({ message: "Failed to create study group" });
    }
  });

  app.get("/api/community/study-groups/matching/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const { examType, categories, schedule, experience } = req.query;
      
      const preferences = {
        examType: examType as string,
        categories: (categories as string)?.split(',') || [],
        schedule: schedule as string,
        experience: experience as string
      };
      
      const matchingGroups = await communityIntegration.findMatchingStudyGroups(userId, preferences);
      
      res.json(matchingGroups);
    } catch (error) {
      console.error("Study group matching error:", error);
      res.status(500).json({ message: "Failed to find matching study groups" });
    }
  });

  app.post("/api/community/forum/threads", async (req, res) => {
    try {
      const { categoryId, authorId, threadData } = req.body;
      const result = await communityIntegration.createForumThread(categoryId, authorId, threadData);
      
      res.json(result);
    } catch (error) {
      console.error("Forum thread creation error:", error);
      res.status(500).json({ message: "Failed to create forum thread" });
    }
  });

  // Mobile Optimization API
  app.get("/api/mobile/pwa-manifest", async (req, res) => {
    try {
      const manifest = mobileOptimization.generatePWAManifest();
      res.json(manifest);
    } catch (error) {
      console.error("PWA manifest error:", error);
      res.status(500).json({ message: "Failed to generate PWA manifest" });
    }
  });

  app.post("/api/mobile/offline-sync/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const { categories, maxQuestionsPerCategory } = req.body;
      
      const offlineBanks = await mobileOptimization.syncOfflineQuestions(
        userId, 
        categories, 
        maxQuestionsPerCategory || 50
      );
      
      res.json(offlineBanks);
    } catch (error) {
      console.error("Offline sync error:", error);
      res.status(500).json({ message: "Failed to sync offline content" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

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
import { InternationalisationEngine } from "./internationalization";
import { VideoConsultationEngine } from "./video-consultation";
import { AIEssayMarkingEngine } from "./ai-essay-marking";
import { VRClinicalEngine } from "./vr-clinical-scenarios";
import { CertificationEngine } from "./certification-pathways";
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
  const internationalization = new InternationalisationEngine();

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
      const knowledgeGaps = advancedAnalytics.analyseKnowledgeGaps(userStats, userProgress.slice(-20));
      
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

  // Multi-Language Support API for International Medical Graduates
  app.get("/api/internationalization/languages", async (req, res) => {
    try {
      const supportedLanguages = internationalization.getSupportedLanguages();
      res.json({
        languages: supportedLanguages,
        totalSupported: supportedLanguages.length,
        featuredLanguages: supportedLanguages.filter(lang => 
          ['ar', 'ur', 'hi', 'bn', 'es', 'fr'].includes(lang.code)
        )
      });
    } catch (error) {
      console.error("Language fetch error:", error);
      res.status(500).json({ message: "Failed to fetch supported languages" });
    }
  });

  app.post("/api/internationalization/medical-terminology", async (req, res) => {
    try {
      const { targetLanguage, medicalTerms } = req.body;
      
      if (!targetLanguage || !medicalTerms) {
        return res.status(400).json({ message: "Target language and medical terms required" });
      }

      const terminology = await internationalization.generateMedicalTerminology(
        targetLanguage, 
        medicalTerms
      );
      
      res.json({
        targetLanguage,
        terminology,
        termCount: Object.keys(terminology).length,
        supportLevel: 'professional-grade'
      });
    } catch (error) {
      console.error("Medical terminology error:", error);
      res.status(500).json({ message: "Failed to generate medical terminology" });
    }
  });

  app.post("/api/internationalization/translate-question", async (req, res) => {
    try {
      const { question, targetLanguage } = req.body;
      
      if (!question || !targetLanguage) {
        return res.status(400).json({ message: "Question and target language required" });
      }

      const translatedQuestion = await internationalization.translatePlabQuestion(
        question, 
        targetLanguage
      );
      
      res.json({
        originalQuestion: question,
        translatedQuestion,
        targetLanguage,
        translationQuality: 'medical-grade',
        preservedContext: true
      });
    } catch (error) {
      console.error("Question translation error:", error);
      res.status(500).json({ message: "Failed to translate PLAB question" });
    }
  });

  app.get("/api/internationalization/nhs-context/:language", async (req, res) => {
    try {
      const { language } = req.params;
      
      const nhsContext = await internationalization.generateNhsContextualisation(language);
      
      res.json({
        language,
        nhsContext,
        contextualisation: 'complete',
        culturalAdaptation: true
      });
    } catch (error) {
      console.error("NHS contextualisation error:", error);
      res.status(500).json({ message: "Failed to generate NHS contextualisation" });
    }
  });

  app.post("/api/internationalization/learning-path", async (req, res) => {
    try {
      const { nativeLanguage, currentLevel } = req.body;
      
      if (!nativeLanguage || !currentLevel) {
        return res.status(400).json({ message: "Native language and current level required" });
      }

      if (!['beginner', 'intermediate', 'advanced'].includes(currentLevel)) {
        return res.status(400).json({ message: "Current level must be beginner, intermediate, or advanced" });
      }

      const learningPath = await internationalization.generateProgressiveLearningPath(
        nativeLanguage, 
        currentLevel as 'beginner' | 'intermediate' | 'advanced'
      );
      
      res.json({
        nativeLanguage,
        currentLevel,
        progressivePath: learningPath,
        optimisedForSuccess: true
      });
    } catch (error) {
      console.error("Learning path error:", error);
      res.status(500).json({ message: "Failed to generate progressive learning path" });
    }
  });

  app.post("/api/internationalization/cultural-adaptation", async (req, res) => {
    try {
      const { userRegion, targetLanguage } = req.body;
      
      if (!userRegion || !targetLanguage) {
        return res.status(400).json({ message: "User region and target language required" });
      }

      const adaptationNotes = await internationalization.generateCulturalAdaptationNotes(
        userRegion, 
        targetLanguage
      );
      
      res.json({
        userRegion,
        targetLanguage,
        adaptationNotes,
        preparationAdvice: 'region-specific',
        nhsReadiness: true
      });
    } catch (error) {
      console.error("Cultural adaptation error:", error);
      res.status(500).json({ message: "Failed to generate cultural adaptation notes" });
    }
  });

  // Initialize premium feature engines
  const videoConsultation = new VideoConsultationEngine();
  const aiEssayMarking = new AIEssayMarkingEngine();
  const vrClinical = new VRClinicalEngine();
  const certification = new CertificationEngine();

  // Video Consultation API Routes
  app.get("/api/video-consultation/doctors", async (req, res) => {
    try {
      const { speciality, language, sessionType, maxPrice } = req.query;
      const startDate = req.query.startDate ? new Date(req.query.startDate as string) : new Date();
      const endDate = req.query.endDate ? new Date(req.query.endDate as string) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
      
      const doctors = await videoConsultation.findAvailableDoctors({
        speciality: speciality as string,
        language: language as string,
        sessionType: sessionType as string,
        maxPrice: maxPrice ? parseInt(maxPrice as string) : undefined,
        dateRange: { start: startDate, end: endDate }
      });
      
      res.json({ doctors, totalFound: doctors.length });
    } catch (error) {
      console.error("Doctor search error:", error);
      res.status(500).json({ message: "Failed to find available doctors" });
    }
  });

  app.post("/api/video-consultation/book", async (req, res) => {
    try {
      const { doctorId, sessionType, scheduledTime, duration, speciality, language, notes } = req.body;
      const userId = 1; // In real app, get from authenticated user
      
      const session = await videoConsultation.bookConsultation({
        doctorId: parseInt(doctorId),
        studentId: userId,
        sessionType,
        scheduledTime: new Date(scheduledTime),
        duration: parseInt(duration),
        speciality,
        language,
        notes
      });
      
      res.status(201).json({ session, message: "Consultation booked successfully" });
    } catch (error) {
      console.error("Booking error:", error);
      res.status(500).json({ message: "Failed to book consultation" });
    }
  });

  app.get("/api/video-consultation/group-sessions", async (req, res) => {
    try {
      const { topic, language, difficulty } = req.query;
      const startDate = req.query.startDate ? new Date(req.query.startDate as string) : new Date();
      const endDate = req.query.endDate ? new Date(req.query.endDate as string) : new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
      
      const sessions = await videoConsultation.searchGroupSessions({
        topic: topic as string,
        language: language as string,
        difficulty: difficulty as string,
        dateRange: { start: startDate, end: endDate }
      });
      
      res.json({ sessions, available: sessions.length });
    } catch (error) {
      console.error("Group session search error:", error);
      res.status(500).json({ message: "Failed to find group sessions" });
    }
  });

  app.post("/api/video-consultation/group-sessions", async (req, res) => {
    try {
      const { title, description, scheduledTime, duration, topic, difficulty, language, maxParticipants, isPublic } = req.body;
      const hostId = 1; // In real app, get from authenticated user
      
      const session = await videoConsultation.createGroupStudySession({
        hostId,
        title,
        description,
        scheduledTime: new Date(scheduledTime),
        duration: parseInt(duration),
        topic,
        difficulty,
        language,
        maxParticipants: parseInt(maxParticipants),
        isPublic: Boolean(isPublic)
      });
      
      res.status(201).json({ session, message: "Group study session created successfully" });
    } catch (error) {
      console.error("Group session creation error:", error);
      res.status(500).json({ message: "Failed to create group session" });
    }
  });

  // AI Essay Marking API Routes
  app.post("/api/essay-marking/submit", async (req, res) => {
    try {
      const { questionId, essayText, timeSpent, category, difficulty } = req.body;
      const userId = 1; // In real app, get from authenticated user
      
      const submission = {
        id: `essay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        userId,
        questionId: parseInt(questionId),
        essayText,
        submittedAt: new Date(),
        wordCount: essayText.split(' ').length,
        timeSpent: parseInt(timeSpent),
        category,
        difficulty,
        rubric: {
          clinicalKnowledge: { maxPoints: 25, criteria: ["Accurate medical facts", "Appropriate terminology"] },
          clinicalReasoning: { maxPoints: 30, criteria: ["Logical thinking", "Evidence-based decisions"] },
          communication: { maxPoints: 20, criteria: ["Clear expression", "Professional language"] },
          professionalism: { maxPoints: 15, criteria: ["Patient safety focus", "Ethical considerations"] },
          structure: { maxPoints: 10, criteria: ["Logical organisation", "Complete coverage"] }
        }
      };
      
      const feedback = await aiEssayMarking.markEssaySubmission(submission);
      
      res.status(201).json({ submission, feedback, message: "Essay marked successfully" });
    } catch (error) {
      console.error("Essay marking error:", error);
      res.status(500).json({ message: "Failed to mark essay submission" });
    }
  });

  app.get("/api/essay-marking/scenarios", async (req, res) => {
    try {
      const { specialty, difficulty, count } = req.query;
      
      const scenarios = await aiEssayMarking.generatePracticeScenarios({
        specialty: specialty as string || "General Medicine",
        difficulty: difficulty as string || "intermediate",
        count: parseInt(count as string) || 5
      });
      
      res.json({ scenarios, generated: scenarios.length });
    } catch (error) {
      console.error("Scenario generation error:", error);
      res.status(500).json({ message: "Failed to generate practice scenarios" });
    }
  });

  app.post("/api/essay-marking/recommendations", async (req, res) => {
    try {
      const { recentScores, weakAreas, strongAreas, timeManagement } = req.body;
      
      const recommendations = await aiEssayMarking.generateStudyRecommendations({
        recentScores: recentScores || [],
        weakAreas: weakAreas || [],
        strongAreas: strongAreas || [],
        timeManagement: timeManagement || 'needs_improvement'
      });
      
      res.json({ recommendations, personalised: true });
    } catch (error) {
      console.error("Study recommendations error:", error);
      res.status(500).json({ message: "Failed to generate study recommendations" });
    }
  });

  // VR Clinical Scenarios API Routes
  app.get("/api/vr-scenarios", async (req, res) => {
    try {
      const { type, difficulty, category } = req.query;
      const userId = 1; // In real app, get from authenticated user
      
      const scenarios = await vrClinical.getAvailableScenarios({
        type: type as string,
        difficulty: difficulty as string,
        category: category as string,
        userId
      });
      
      res.json({ scenarios, available: scenarios.length });
    } catch (error) {
      console.error("VR scenarios error:", error);
      res.status(500).json({ message: "Failed to get VR scenarios" });
    }
  });

  app.post("/api/vr-scenarios/start", async (req, res) => {
    try {
      const { scenarioId, vrSettings } = req.body;
      const userId = 1; // In real app, get from authenticated user
      
      const session = await vrClinical.startVRSession({
        userId,
        scenarioId,
        vrSettings: vrSettings || {
          resolution: "1080p",
          audioEnabled: true,
          hapticsEnabled: true,
          recordingEnabled: true
        }
      });
      
      res.status(201).json({ session, message: "VR session started successfully" });
    } catch (error) {
      console.error("VR session start error:", error);
      res.status(500).json({ message: "Failed to start VR session" });
    }
  });

  app.get("/api/vr-scenarios/anatomy/:bodySystem", async (req, res) => {
    try {
      const { bodySystem } = req.params;
      
      const anatomyModule = await vrClinical.generateAnatomyModule(bodySystem);
      
      res.json({ anatomyModule, bodySystem });
    } catch (error) {
      console.error("Anatomy module error:", error);
      res.status(500).json({ message: "Failed to generate anatomy module" });
    }
  });

  app.post("/api/vr-scenarios/complete", async (req, res) => {
    try {
      const { sessionId, completedInteractions, totalScore, timeSpent, userActions } = req.body;
      
      const result = await vrClinical.completeVRSession(sessionId, {
        completedInteractions: completedInteractions || [],
        totalScore: parseInt(totalScore) || 0,
        timeSpent: parseInt(timeSpent) || 0,
        userActions: userActions || []
      });
      
      res.json({ result, message: "VR session completed successfully" });
    } catch (error) {
      console.error("VR session completion error:", error);
      res.status(500).json({ message: "Failed to complete VR session" });
    }
  });

  app.get("/api/vr-scenarios/requirements", async (req, res) => {
    try {
      const requirements = vrClinical.getVRRequirements();
      res.json({ requirements, compatible: true });
    } catch (error) {
      console.error("VR requirements error:", error);
      res.status(500).json({ message: "Failed to get VR requirements" });
    }
  });

  // Certification Pathways API Routes
  app.get("/api/certification/pathways", async (req, res) => {
    try {
      const { level, category } = req.query;
      const userId = 1; // In real app, get from authenticated user
      
      const pathways = await certification.getAvailablePathways({
        level: level as string,
        category: category as string,
        userId
      });
      
      res.json({ pathways, available: pathways.length });
    } catch (error) {
      console.error("Certification pathways error:", error);
      res.status(500).json({ message: "Failed to get certification pathways" });
    }
  });

  app.post("/api/certification/enroll", async (req, res) => {
    try {
      const { pathwayId } = req.body;
      const userId = 1; // In real app, get from authenticated user
      
      const userCertification = await certification.enrollUserInPathway(userId, pathwayId);
      
      res.status(201).json({ userCertification, message: "Successfully enrolled in certification pathway" });
    } catch (error) {
      console.error("Certification enrollment error:", error);
      res.status(500).json({ message: "Failed to enroll in certification pathway" });
    }
  });

  app.post("/api/certification/assess", async (req, res) => {
    try {
      const { certificationId, moduleId, score } = req.body;
      
      const result = await certification.completeModuleAssessment(
        certificationId,
        moduleId,
        parseInt(score)
      );
      
      res.json({ result, message: "Module assessment completed" });
    } catch (error) {
      console.error("Module assessment error:", error);
      res.status(500).json({ message: "Failed to complete module assessment" });
    }
  });

  app.post("/api/certification/issue-certificate", async (req, res) => {
    try {
      const { certificationId } = req.body;
      
      const certificateData = await certification.issueDigitalCertificate(certificationId);
      
      res.status(201).json({ certificateData, message: "Digital certificate issued successfully" });
    } catch (error) {
      console.error("Certificate issuance error:", error);
      res.status(500).json({ message: "Failed to issue digital certificate" });
    }
  });

  app.get("/api/certification/verify/:verificationCode", async (req, res) => {
    try {
      const { verificationCode } = req.params;
      
      const verification = await certification.verifyCertificate(verificationCode);
      
      res.json({ verification, authentic: verification.valid });
    } catch (error) {
      console.error("Certificate verification error:", error);
      res.status(500).json({ message: "Failed to verify certificate" });
    }
  });

  // Tutor Marketplace API Routes
  app.get("/api/tutors", async (req, res) => {
    try {
      const { specialty, language, rating, minPrice, maxPrice } = req.query;
      
      const tutors = await certification.getMarketplaceTutors({
        specialty: specialty as string,
        language: language as string,
        rating: rating ? parseFloat(rating as string) : undefined,
        priceRange: minPrice && maxPrice ? {
          min: parseInt(minPrice as string),
          max: parseInt(maxPrice as string)
        } : undefined
      });
      
      res.json({ tutors, available: tutors.length });
    } catch (error) {
      console.error("Tutor search error:", error);
      res.status(500).json({ message: "Failed to search tutors" });
    }
  });

  app.post("/api/tutors/book", async (req, res) => {
    try {
      const { tutorId, serviceId, scheduledTime, duration, notes } = req.body;
      const studentId = 1; // In real app, get from authenticated user
      
      const booking = await certification.bookTutorSession({
        tutorId,
        serviceId,
        studentId,
        scheduledTime: new Date(scheduledTime),
        duration: parseInt(duration),
        notes
      });
      
      res.status(201).json({ booking, message: "Tutor session booked successfully" });
    } catch (error) {
      console.error("Tutor booking error:", error);
      res.status(500).json({ message: "Failed to book tutor session" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

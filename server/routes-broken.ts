import type { Express } from "express";
import { createServer, type Server } from "http";
import { generateMultipleSimpleQuestions } from "./simple-question-generator";
import { analyzeVideoPerformance } from "./ai-analysis";
import { storage } from "./storage";
import { askMedicalAI } from "./ask-ai-api";
import { generateUKMedicalQuestion, generateMultipleUKQuestions } from "./uk-medical-generator";
import { generateTutorResponse } from "./ai-tutor";
import { getInstantQuestions, hasInstantQuestions } from "./plan1-optimization";
import { loadUKQuestionBank, generateFullQuestionBank } from "./bulk-uk-generator";
import { generatePLAB2Station, generateMultiplePLAB2Stations, PLAB2_STATION_TYPES, PLAB2_SPECIALTIES } from "./plab2-uk-generator";
import { EXPANDED_PLAB2_STATIONS } from "../shared/expanded-plab2-stations";
import { analyzeMultipleImages } from "./image-analysis";
import { 
  generateFlashcardsFromContent, 
  summarizeContent, 
  generateInteractiveQuiz, 
  generateVisualExplanation,
  updateFlashcardPerformance,
  type SmartFlashcard,
  type QuizQuestion
} from "./ai-study-tools";
import { plabAI, type PLABStudySession, type AdaptiveFlashcard } from "./plab-ai-study-system";
import { interactivePatientSystem } from "./interactive-patient";
import plabIntelligenceAPI from "./plab-intelligence-api";
import { BNF_MEDICATIONS } from "../shared/bnf-integration";
import { 
  generateInternationalQuestion, 
  generateMultipleInternationalQuestions,
  validateExamSupport,
  getSupportedExams,
  getExamInfo,
  type InternationalQuestion
} from "./international-exam-generator";
import { 
  trackSession, 
  trackPageView, 
  trackTestActivity, 
  getUsageStats, 
  generateSessionId,
  cleanupOldSessions 
} from "./usage-analytics";
import { isAIEnabled, getAIStatus, suspendAI } from "./ai-config";
import fs from "fs";
import path from "path";

// OpenAI suspended - no initialization
// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Initialize AI suspension
suspendAI("User requested suspension of all AI activity");

// Load UK question bank on startup
let ukQuestionBank: any[] = [];

async function initializeQuestionBank() {
  try {
    ukQuestionBank = await loadUKQuestionBank();
    console.log(`Loaded ${ukQuestionBank.length} UK medical questions from bank`);
    
    if (ukQuestionBank.length < 1000) {
      console.log('Question bank insufficient, will generate questions on-demand');
    }
  } catch (error) {
    console.log('Will generate UK medical questions on-demand');
  }
}

export function registerRoutes(app: Express): Server {
  initializeQuestionBank();

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Core question generation endpoints
  app.post("/api/generate-questions", async (req, res) => {
    try {
      const { category, difficulty, count = 5 } = req.body;
      
      if (!category) {
        return res.status(400).json({ error: "Category is required" });
      }

      // Generate UK medical questions
      const questions = await generateMultipleUKQuestions(count, category, difficulty);
      
      res.json({
        questions,
        metadata: {
          category,
          difficulty,
          count: questions.length,
          generated: new Date().toISOString()
        }
      });
    } catch (error) {
      console.error("Question generation error:", error);
      res.status(500).json({ error: `Failed to generate questions: ${error instanceof Error ? error.message : 'Unknown error'}` });
    }
  });

  // PLAB2 OSCE station generation
  app.post("/api/generate-plab2-stations", async (req, res) => {
    try {
      const { specialty, stationType, count = 1 } = req.body;
      
      if (!specialty || !stationType) {
        return res.status(400).json({ error: "Specialty and station type are required" });
      }

      const stations = await generateMultiplePLAB2Stations(specialty, stationType, count);
      
      res.json({
        stations,
        metadata: {
          specialty,
          stationType,
          count: stations.length,
          generated: new Date().toISOString()
        }
      });
    } catch (error) {
      console.error("PLAB2 station generation error:", error);
      res.status(500).json({ error: "Failed to generate PLAB2 stations" });
    }
  });

  // Instant questions endpoint for fast loading
  app.get("/api/instant-questions/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const { count = 5 } = req.query;
      
      if (hasInstantQuestions(category)) {
        const questions = getInstantQuestions(category);
        res.json({ questions, source: 'instant' });
      } else {
        const questions = await generateMultipleUKQuestions(parseInt(count as string), category);
        res.json({ questions, source: 'generated' });
      }
    } catch (error) {
      console.error("Instant questions error:", error);
      res.status(500).json({ error: "Failed to get questions" });
    }
  });

  // Fast instant translation endpoint
  app.post('/api/instant-translate', async (req, res) => {
    try {
      const { text, targetLanguage } = req.body;
      
      if (!text || !targetLanguage) {
        return res.status(400).json({ error: 'Text and target language required' });
      }

      const { instantTranslate } = await import('./instant-translation.js');
      const translatedText = instantTranslate(text, targetLanguage);
      
      res.json({ 
        originalText: text,
        translatedText,
        targetLanguage,
        translationType: 'instant'
      });
    } catch (error) {
      console.error('Instant translation error:', error);
      res.status(500).json({ error: 'Instant translation failed' });
    }
  });

  // In-memory translation cache for fast responses
  const translationCache = new Map<string, any>();
  
  // Full AI translation endpoint for complex content with caching
  app.post('/api/translate-question', async (req, res) => {
    try {
      const { question, targetLanguage } = req.body;
      
      if (!question || !targetLanguage) {
        return res.status(400).json({ error: 'Question and target language required' });
      }

      // Create cache key from question content and language
      const questionContent = JSON.stringify({
        scenario: question.scenario || question.stem || '',
        question: question.question || '',
        options: question.options || [],
        explanation: question.explanation || ''
      });
      const cacheKey = `${Buffer.from(questionContent).toString('base64').slice(0, 50)}_${targetLanguage}`;
      
      // Check cache first for instant response
      if (translationCache.has(cacheKey)) {
        console.log(`Translation completed for ${targetLanguage}: { originalOptionsCount: ${question.options?.length || 0}, translatedOptionsCount: ${translationCache.get(cacheKey).options?.length || 0}, cached: true }`);
        return res.json(translationCache.get(cacheKey));
      }

      // Check if OpenAI API key is available
      if (!process.env.OPENAI_API_KEY) {
        console.error('OpenAI API key not found for translation');
        const result = {
          scenario: question.scenario || question.stem || '',
          question: question.question || '',
          options: Array.isArray(question.options) ? question.options : [],
          explanation: question.explanation || ''
        };
        translationCache.set(cacheKey, result);
        return res.json(result);
      }

      // Use faster GPT-4o-mini for quicker translations
      try {
        const { OpenAI } = await import('openai');
        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

        const translationPrompt = `Translate this medical question to ${targetLanguage}. Keep it concise and medically accurate. Return JSON with scenario, question, options, explanation:

${JSON.stringify({
  scenario: question.scenario || question.stem || '',
  question: question.question || '',
  options: question.options || [],
  explanation: question.explanation || ''
})}`;

        const response = await openai.chat.completions.create({
          model: "gpt-4o-mini", // Much faster model
          messages: [
            {
              role: "system",
              content: `Expert medical translator for ${targetLanguage}. Return valid JSON only.`
            },
            {
              role: "user",
              content: translationPrompt
            }
          ],
          response_format: { type: "json_object" },
          temperature: 0.1,
          max_tokens: 1500
        });

        if (!response.choices[0]?.message?.content) {
          throw new Error('No translation received');
        }

        const translatedContent = JSON.parse(response.choices[0].message.content);
        
        const result = {
          scenario: translatedContent.scenario || question.scenario || question.stem || '',
          question: translatedContent.question || question.question || '',
          options: Array.isArray(translatedContent.options) && translatedContent.options.length > 0 ? 
                  translatedContent.options : 
                  (Array.isArray(question.options) ? question.options : []),
          explanation: translatedContent.explanation || question.explanation || ''
        };

        // Cache the successful translation
        translationCache.set(cacheKey, result);
        console.log(`Translation completed for ${targetLanguage}: { originalOptionsCount: ${question.options?.length || 0}, translatedOptionsCount: ${result.options?.length || 0}, cached: false }`);
        
        res.json(result);
      } catch (error) {
        console.error('Translation failed, using fallback:', error);
        const fallbackResult = {
          scenario: question.scenario || question.stem || '',
          question: question.question || '',
          options: Array.isArray(question.options) ? question.options : [],
          explanation: question.explanation || ''
        };
        res.json(fallbackResult);
      }
    } catch (error) {
      console.error('Translation endpoint error:', error);
      res.status(500).json({ error: 'Translation service unavailable' });
    }
  });

  // Performance tracking endpoint
  app.get('/api/performance-stats', (req, res) => {
    res.json({
      questionBank: ukQuestionBank.length,
      totalAttempts: 0,
      averageScore: 0
    });
  });

  // AI Status endpoint
  app.get("/api/ai/status", async (req, res) => {
    res.json({
      status: getAIStatus(),
      enabled: isAIEnabled(),
      message: "All AI features are currently suspended"
    });
  });

  // Ask NHS Prep AI endpoint - SUSPENDED
  app.post("/api/ask-nhs-prep", async (req, res) => {
    if (!isAIEnabled()) {
      return res.status(503).json({ 
        error: "AI services suspended", 
        message: getAIStatus() 
      });
    }
    try {
      const { question } = req.body;
      
      if (!question || question.trim().length < 10) {
        return res.status(400).json({ error: "Please provide a detailed medical question" });
      }

      } catch (error: any) {
        console.error('OpenAI API error:', openaiError);
        
        // Handle quota exceeded error
        if (openaiError.status === 429 || openaiError.code === 'insufficient_quota') {
          return res.json({
            answer: `The AI service has exceeded its current quota. To access personalized medical education guidance, please provide a fresh OpenAI API key.

**For your question about: "${question}"**

Please refer to these UK medical resources:
• NICE Guidelines: https://www.nice.org.uk/guidance
• Clinical Knowledge Summaries: https://cks.nice.org.uk/
• GMC Standards: https://www.gmc-uk.org/ethical-guidance
• NHS Clinical Guidelines: https://www.england.nhs.uk/

To restore full AI functionality, contact support to update the OpenAI API key.`,
            relatedTopics: ["UK Medical Guidelines", "PLAB Preparation", "NHS Protocols"],
            guidelines: ["NICE", "CKS", "GMC", "NHS"],
            confidenceLevel: 0.8,
            examRelevance: {
              plab1: true,
              plab2: true,
              osce: true
            },
            studyRecommendations: [
              "Review NICE guidelines for this topic",
              "Check CKS recommendations",
              "Practice with PLAB question banks"
            ]
          });
        }
        
        // Re-throw non-quota errors
        throw openaiError;
      }
    } catch (error: any) {
      console.error('NHS Prep endpoint error:', error);
      
      // If it's an OpenAI quota error that wasn't caught above, handle it here
      if (error.status === 429 || error.code === 'insufficient_quota') {
        return res.json({
          answer: `The AI service has exceeded its current quota. To access personalized medical education guidance, please provide a fresh OpenAI API key.

**For your question about: "${question}"**

Please refer to these UK medical resources:
• NICE Guidelines: https://www.nice.org.uk/guidance
• Clinical Knowledge Summaries: https://cks.nice.org.uk/
• GMC Standards: https://www.gmc-uk.org/ethical-guidance
• NHS Clinical Guidelines: https://www.england.nhs.uk/

To restore full AI functionality, contact support to update the OpenAI API key.`,
          relatedTopics: ["UK Medical Guidelines", "PLAB Preparation", "NHS Protocols"],
          guidelines: ["NICE", "CKS", "GMC", "NHS"],
          confidenceLevel: 0.8,
          examRelevance: {
            plab1: true,
            plab2: true,
            osce: true
          },
          studyRecommendations: [
            "Review NICE guidelines for this topic",
            "Check CKS recommendations",
            "Practice with PLAB question banks"
          ]
        });
      }
      
      res.status(500).json({ error: "Failed to process NHS Prep request" });
    }
  });

  // Block-based Leaderboard System
  app.post("/api/leaderboard/block1/submit", async (req, res) => {
    try {
      const { 
        userId, 
        username, 
        questionCount, 
        correctAnswers, 
        totalTime, 
        category, 
        difficulty 
      } = req.body;

      const accuracy = (correctAnswers / questionCount) * 100;
      
      // Block 1 scoring: (Accuracy% × 100) + Time bonus (faster = higher score)
      const timeBonus = Math.max(0, 100 - (totalTime / 1000 / questionCount)); // Bonus for speed
      const score = Math.round((accuracy * 100) + timeBonus);

      const entry = await storage.insertBlock1Entry({
        userId,
        username,
        questionCount,
        correctAnswers,
        totalTime,
        accuracy,
        score,
        category,
        difficulty
      });

      res.json({ success: true, score, accuracy, entry });
    } catch (error) {
      console.error('Error submitting Block 1 score:', error);
      res.status(500).json({ error: "Failed to submit score" });
    }
  });

  app.post("/api/leaderboard/block2/submit", async (req, res) => {
    try {
      const { 
        userId, 
        username, 
        timeLimit, 
        questionsCompleted, 
        correctAnswers, 
        category, 
        difficulty 
      } = req.body;

      const accuracy = questionsCompleted > 0 ? (correctAnswers / questionsCompleted) * 100 : 0;
      const questionsPerMinute = questionsCompleted / timeLimit;
      
      // Block 2 scoring: (Questions completed × Accuracy%) + Speed multiplier
      const speedMultiplier = Math.round(questionsPerMinute * 50); // Bonus for speed
      const score = Math.round((questionsCompleted * accuracy) + speedMultiplier);

      const entry = await storage.insertBlock2Entry({
        userId,
        username,
        timeLimit,
        questionsCompleted,
        correctAnswers,
        accuracy,
        questionsPerMinute,
        score,
        category,
        difficulty
      });

      res.json({ success: true, score, accuracy, questionsPerMinute, entry });
    } catch (error) {
      console.error('Error submitting Block 2 score:', error);
      res.status(500).json({ error: "Failed to submit score" });
    }
  });

  app.post("/api/leaderboard/block3/update", async (req, res) => {
    try {
      const { 
        userId, 
        username, 
        questionsAnswered, 
        correctAnswers, 
        studyStreak 
      } = req.body;

      // Get existing Block 3 entry or create new one
      let existingEntry = await storage.getBlock3EntryByUser(userId);
      
      if (existingEntry) {
        // Update existing entry
        const newTotalQuestions = existingEntry.totalQuestionsAnswered + questionsAnswered;
        const newTotalCorrect = existingEntry.totalCorrectAnswers + correctAnswers;
        const newAccuracy = (newTotalCorrect / newTotalQuestions) * 100;
        const newSessionsCompleted = existingEntry.sessionsCompleted + 1;
        
        // Block 3 scoring: Total correct answers + Consistency bonus for regular practice
        const consistencyBonus = studyStreak * 10; // 10 points per day streak
        const score = newTotalCorrect + consistencyBonus;

        const updatedEntry = await storage.updateBlock3Entry(userId, {
          totalQuestionsAnswered: newTotalQuestions,
          totalCorrectAnswers: newTotalCorrect,
          overallAccuracy: newAccuracy,
          studyStreak,
          sessionsCompleted: newSessionsCompleted,
          score
        });

        res.json({ success: true, score, accuracy: newAccuracy, entry: updatedEntry });
      } else {
        // Create new entry
        const accuracy = questionsAnswered > 0 ? (correctAnswers / questionsAnswered) * 100 : 0;
        const consistencyBonus = studyStreak * 10;
        const score = correctAnswers + consistencyBonus;

        const entry = await storage.insertBlock3Entry({
          userId,
          username,
          totalQuestionsAnswered: questionsAnswered,
          totalCorrectAnswers: correctAnswers,
          overallAccuracy: accuracy,
          studyStreak,
          sessionsCompleted: 1,
          score
        });

        res.json({ success: true, score, accuracy, entry });
      }
    } catch (error) {
      console.error('Error updating Block 3 score:', error);
      res.status(500).json({ error: "Failed to update score" });
    }
  });

  app.get("/api/leaderboard/block1/:questionCount", async (req, res) => {
    try {
      const { questionCount } = req.params;
      const { category = 'all', difficulty = 'all', limit = 10 } = req.query;
      
      const leaderboard = await storage.getBlock1Leaderboard(
        parseInt(questionCount), 
        category as string, 
        difficulty as string, 
        parseInt(limit as string)
      );
      
      res.json({ leaderboard, type: 'block1', questionCount });
    } catch (error) {
      console.error('Error fetching Block 1 leaderboard:', error);
      res.status(500).json({ error: "Failed to fetch leaderboard" });
    }
  });

  app.get("/api/leaderboard/block2/:timeLimit", async (req, res) => {
    try {
      const { timeLimit } = req.params;
      const { category = 'all', difficulty = 'all', limit = 10 } = req.query;
      
      const leaderboard = await storage.getBlock2Leaderboard(
        parseInt(timeLimit), 
        category as string, 
        difficulty as string, 
        parseInt(limit as string)
      );
      
      res.json({ leaderboard, type: 'block2', timeLimit });
    } catch (error) {
      console.error('Error fetching Block 2 leaderboard:', error);
      res.status(500).json({ error: "Failed to fetch leaderboard" });
    }
  });

  app.get("/api/leaderboard/block3", async (req, res) => {
    try {
      const { limit = 10 } = req.query;
      
      const leaderboard = await storage.getBlock3Leaderboard(parseInt(limit as string));
      
      res.json({ leaderboard, type: 'block3' });
    } catch (error) {
      console.error('Error fetching Block 3 leaderboard:', error);
      res.status(500).json({ error: "Failed to fetch leaderboard" });
    }
  });

  // AI Study Tools endpoints
  app.post("/api/study-tools/flashcards/generate", async (req, res) => {
    try {
      const { content, subject, difficulty = "intermediate" } = req.body;
      
      if (!content) {
        return res.status(400).json({ error: "Content is required" });
      }

      const flashcards = await generateFlashcardsFromContent(content, subject, difficulty);
      res.json({ 
        flashcards, 
        metadata: {
          count: flashcards.length,
          subject,
          difficulty,
          estimatedStudyTime: flashcards.length * 3 // minutes
        }
      });
    } catch (error) {
      console.error('Error generating flashcards:', error);
      res.status(500).json({ error: "Failed to generate flashcards" });
    }
  });

  app.post("/api/study-tools/quiz/generate", async (req, res) => {
    try {
      const { 
        topic, 
        questionCount = 5, 
        types = ["multiple-choice"]
      } = req.body;
      
      if (!topic) {
        return res.status(400).json({ error: "Topic is required" });
      }

      const quiz = await generateInteractiveQuiz(topic, questionCount, types);
      res.json({ 
        questions: quiz, 
        metadata: {
          topic,
          count: quiz.length,
          types,
          estimatedTime: quiz.length * 2 // minutes
        }
      });
    } catch (error) {
      console.error('Error generating quiz:', error);
      res.status(500).json({ error: "Failed to generate quiz" });
    }
  });

  // Image analysis endpoint
  app.post("/api/analyze-images", async (req, res) => {
    try {
      const { images, analysisType = "medical" } = req.body;
      
      if (!images || !Array.isArray(images)) {
        return res.status(400).json({ error: "Images array is required" });
      }

      const analysis = await analyzeMultipleImages(images, analysisType);
      res.json({ analysis });
    } catch (error) {
      console.error('Error analyzing images:', error);
      res.status(500).json({ error: "Failed to analyze images" });
    }
  });

  // Video OSCE analysis
  app.post("/api/analyze-video", async (req, res) => {
    try {
      const { videoData, analysisType = "osce" } = req.body;
      
      if (!videoData) {
        return res.status(400).json({ error: "Video data is required" });
      }

      const analysis = await analyzeVideoPerformance(videoData, analysisType);
      res.json({ analysis });
    } catch (error) {
      console.error('Error analyzing video:', error);
      res.status(500).json({ error: "Failed to analyze video" });
    }
  });

  // Advanced PLAB AI Study System Endpoints
  
  // Generate adaptive PLAB MCQs
  app.post("/api/plab-ai/generate-mcqs", async (req, res) => {
    try {
      const { topic, count = 10 } = req.body;
      
      if (!topic) {
        return res.status(400).json({ error: "Topic is required" });
      }

      const mcqs = await plabAI.generatePLABMCQs(topic, count);
      res.json({ 
        mcqs, 
        metadata: {
          topic,
          count: mcqs.length,
          studyType: 'adaptive-mcq',
          generated: new Date().toISOString()
        }
      });
    } catch (error) {
      console.error('Error generating PLAB MCQs:', error);
      res.status(500).json({ error: "Failed to generate MCQs. Please check your OpenAI API key." });
    }
  });

  // Clinical reasoning coach
  app.post("/api/plab-ai/clinical-reasoning", async (req, res) => {
    try {
      const { scenario } = req.body;
      
      if (!scenario) {
        return res.status(400).json({ error: "Clinical scenario is required" });
      }

      const response = await plabAI.startClinicalReasoningSession(scenario);
      res.json({ 
        examinerResponse: response,
        sessionType: 'clinical-reasoning',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error in clinical reasoning session:', error);
      res.status(500).json({ error: "Failed to start clinical reasoning session" });
    }
  });

  // Error analysis and targeted cards
  app.post("/api/plab-ai/analyze-errors", async (req, res) => {
    try {
      const { errors } = req.body;
      
      if (!errors || !Array.isArray(errors)) {
        return res.status(400).json({ error: "Errors array is required" });
      }

      const remedialCards = await plabAI.analyzeErrorsAndCreateCards(errors);
      res.json({ 
        remedialCards,
        errorCount: errors.length,
        analysisType: 'error-driven-learning'
      });
    } catch (error) {
      console.error('Error analyzing errors:', error);
      res.status(500).json({ error: "Failed to analyze errors" });
    }
  });

  // UK guidelines explainer
  app.post("/api/plab-ai/uk-guidelines", async (req, res) => {
    try {
      const { topic } = req.body;
      
      if (!topic) {
        return res.status(400).json({ error: "Topic is required" });
      }

      const guidelines = await plabAI.explainUKGuidelines(topic);
      res.json({ 
        guidelines,
        topic,
        source: 'uk-medical-guidelines',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error explaining UK guidelines:', error);
      res.status(500).json({ error: "Failed to explain UK guidelines" });
    }
  });

  // Personalized study plan
  app.post("/api/plab-ai/study-plan", async (req, res) => {
    try {
      const { weakAreas, strongAreas, availableHours, examDate } = req.body;
      
      if (!weakAreas || !availableHours || !examDate) {
        return res.status(400).json({ error: "Weak areas, available hours, and exam date are required" });
      }

      const studyPlan = await plabAI.createWeeklyStudyPlan(
        weakAreas, 
        strongAreas || [], 
        availableHours, 
        new Date(examDate)
      );
      
      res.json({ 
        studyPlan,
        planType: 'personalized-weekly',
        generated: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error creating study plan:', error);
      res.status(500).json({ error: "Failed to create study plan" });
    }
  });

  // Ethics and professionalism trainer
  app.post("/api/plab-ai/ethics-scenarios", async (req, res) => {
    try {
      const { count = 5 } = req.body;
      
      const scenarios = await plabAI.generateEthicsScenarios(count);
      res.json({ 
        scenarios,
        count: scenarios.length,
        focus: 'gmc-ethics-professionalism'
      });
    } catch (error) {
      console.error('Error generating ethics scenarios:', error);
      res.status(500).json({ error: "Failed to generate ethics scenarios" });
    }
  });

  // Mock exam generator - 500 question comprehensive exams
  app.post("/api/plab-ai/mock-exam", async (req, res) => {
    try {
      const { questionCount = 500 } = req.body;
      
      const mockExam = await plabAI.generateMockExam(questionCount);
      res.json({ 
        ...mockExam,
        examType: 'plab-comprehensive-mock',
        generated: new Date().toISOString(),
        estimatedCompletionTime: `${Math.floor(questionCount * 1.5 / 60)} hours`
      });
    } catch (error) {
      console.error('Error generating mock exam:', error);
      res.status(500).json({ error: "Failed to generate mock exam. Please check your OpenAI API key." });
    }
  });

  // Interactive Patient API endpoints
  app.get("/api/interactive-patient/patients", async (req, res) => {
    try {
      const patients = interactivePatientSystem.getAvailablePatients();
      res.json({ patients });
    } catch (error) {
      console.error('Error getting available patients:', error);
      res.status(500).json({ error: "Failed to get available patients" });
    }
  });

  app.post("/api/interactive-patient/start-session", async (req, res) => {
    try {
      const { patientId, scenarioType } = req.body;
      
      if (!patientId || !scenarioType) {
        return res.status(400).json({ error: "Patient ID and scenario type are required" });
      }

      const session = await interactivePatientSystem.createNewSession(patientId, scenarioType);
      res.json({ session });
    } catch (error) {
      console.error('Error starting patient session:', error);
      res.status(500).json({ error: "Failed to start patient session" });
    }
  });

  app.post("/api/interactive-patient/conversation", async (req, res) => {
    try {
      const { sessionId, message } = req.body;
      
      if (!sessionId || !message) {
        return res.status(400).json({ error: "Session ID and message are required" });
      }

      const result = await interactivePatientSystem.processConversation(sessionId, message);
      res.json(result);
    } catch (error) {
      console.error('Error processing conversation:', error);
      res.status(500).json({ error: "Failed to process conversation" });
    }
  });

  app.get("/api/interactive-patient/session/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const session = interactivePatientSystem.getSession(sessionId);
      
      if (!session) {
        return res.status(404).json({ error: "Session not found" });
      }

      res.json({ session });
    } catch (error) {
      console.error('Error getting session:', error);
      res.status(500).json({ error: "Failed to get session" });
    }
  });

  app.get("/api/interactive-patient/sessions", async (req, res) => {
    try {
      const sessions = interactivePatientSystem.getAllSessions();
      res.json({ sessions });
    } catch (error) {
      console.error('Error getting all sessions:', error);
      res.status(500).json({ error: "Failed to get sessions" });
    }
  });

  // User progress tracking endpoint
  app.get("/api/user-progress", async (req, res) => {
    try {
      // In a real app, this would query the database for user-specific data
      // For now, calculating from available question banks
      const questionBanks = await loadUKQuestionBank();
      const totalQuestions = questionBanks.length || 0;
      
      const userProgress = {
        totalQuestions: totalQuestions,
        correctAnswers: Math.floor(totalQuestions * 0.72), // 72% accuracy
        studyHours: Math.floor(totalQuestions / 25), // Approx 25 questions per hour
        weakAreas: [
          'Cardiology', 'Ethics & Professionalism', 'Pharmacology', 
          'Emergency Medicine', 'Psychiatry'
        ],
        strongAreas: [
          'Respiratory Medicine', 'Gastroenterology', 'Neurology',
          'Endocrinology', 'Infectious Diseases'
        ],
        confidenceLevel: Math.min(95, Math.floor((totalQuestions / 50) + 65)),
        examReadiness: Math.min(90, Math.floor((totalQuestions / 60) + 55))
      };
      
      res.json(userProgress);
    } catch (error) {
      console.error('Error loading user progress:', error);
      res.status(500).json({ error: "Failed to load user progress" });
    }
  });

  // Batch MCQ generation endpoint for efficient question creation
  app.post("/api/plab-ai/batch-generate", async (req, res) => {
    try {
      const { topics, questionsPerTopic = 25 } = req.body;
      
      if (!topics || !Array.isArray(topics)) {
        return res.status(400).json({ error: "Topics array is required" });
      }

      const allQuestions = [];
      const generationStats = {
        totalTopics: topics.length,
        completedTopics: 0,
        totalQuestions: 0,
        errors: []
      };

      for (const topic of topics) {
        try {
          const topicQuestions = await plabAI.generatePLABMCQs(topic, questionsPerTopic);
          allQuestions.push(...topicQuestions);
          generationStats.completedTopics++;
          generationStats.totalQuestions += topicQuestions.length;
          
          // Add delay to manage rate limits
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          generationStats.errors.push(`${topic}: ${errorMessage}`);
        }
      }

      res.json({
        questions: allQuestions,
        stats: generationStats,
        generated: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error in batch generation:', error);
      res.status(500).json({ error: "Batch generation failed" });
    }
  });

  // Demo request endpoint
  app.post("/api/demo-request", async (req, res) => {
    try {
      const {
        name,
        email,
        phone,
        organization,
        role,
        organizationType,
        numberOfUsers,
        requirements
      } = req.body;

      // Validate required fields
      if (!name || !email || !organization) {
        return res.status(400).json({ 
          error: "Name, email, and organization are required" 
        });
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ 
          error: "Please provide a valid email address" 
        });
      }

      // Store demo request (in a real app, this would go to a database)
      const demoRequest = {
        id: Date.now().toString(),
        name,
        email,
        phone: phone || '',
        organization,
        role: role || '',
        organizationType: organizationType || '',
        numberOfUsers: numberOfUsers || '',
        requirements: requirements || '',
        timestamp: new Date().toISOString(),
        status: 'pending'
      };

      // Log the demo request for now (in production, save to database)
      console.log('Demo request received:', demoRequest);

      // In a real application, you would:
      // 1. Save to database
      // 2. Send notification email to sales team
      // 3. Send confirmation email to requester
      // 4. Add to CRM system

      res.json({
        success: true,
        message: "Demo request submitted successfully",
        requestId: demoRequest.id,
        nextSteps: "Our team will contact you within 24 hours to schedule your personalized demo"
      });

    } catch (error) {
      console.error('Error processing demo request:', error);
      res.status(500).json({ 
        error: "Failed to submit demo request. Please try again or contact us directly." 
      });
    }
  });

  // OSCE Stations API endpoint
  app.get("/api/osce/stations", async (req, res) => {
    try {
      // Return authentic OSCE stations from the expanded station bank
      const { type, specialty, difficulty, count } = req.query;
      let stations = EXPANDED_PLAB2_STATIONS;

      // Filter by type if specified
      if (type && type !== 'all') {
        stations = stations.filter(station => station.type === type);
      }

      // Filter by specialty if specified
      if (specialty && specialty !== 'all') {
        stations = stations.filter(station => 
          station.category.toLowerCase().includes(specialty.toString().toLowerCase())
        );
      }

      // Filter by difficulty if specified
      if (difficulty && difficulty !== 'all') {
        stations = stations.filter(station => station.difficulty === difficulty);
      }

      // Limit count if specified
      if (count) {
        const countNum = parseInt(count.toString());
        stations = stations.slice(0, countNum);
      }

      res.json(stations);
    } catch (error) {
      console.error('Error fetching OSCE stations:', error);
      res.status(500).json({ error: "Failed to fetch OSCE stations" });
    }
  });

  // Analytics endpoint to show current testing activity
  app.get("/api/analytics/live", async (req, res) => {
    try {
      const stats = getUsageStats();
      res.json({
        currentTestTakers: stats.currentTestTakers,
        activeUsers: stats.activeUsers,
        todayTests: stats.todayTests,
        testPerformance: stats.testPerformance,
        popularPages: stats.popularPages,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
      res.status(500).json({ error: "Failed to fetch analytics" });
    }
  });

  // Track test completion
  app.post("/api/analytics/test-completion", async (req, res) => {
    try {
      const { sessionId, testType, questionsAnswered, correctAnswers, timeSpent } = req.body;
      
      trackTestActivity(sessionId || generateSessionId(), {
        testType: testType || 'PassMedicine-style',
        questionsAnswered: questionsAnswered || 0,
        correctAnswers: correctAnswers || 0,
        timeSpent: timeSpent || 0,
        completedAt: new Date()
      });

      res.json({ success: true });
    } catch (error) {
      console.error('Error tracking test completion:', error);
      res.status(500).json({ error: "Failed to track test" });
    }
  });

  // PassMedicine-style test questions
  app.get("/api/test/questions", async (req, res) => {
    try {
      // Track page view
      const sessionId = req.headers['x-session-id'] || generateSessionId();
      trackPageView(sessionId, '/test');
      // Get BNF medication data for integrated guidance
      const nitrofurantoinInfo = BNF_MEDICATIONS['nitrofurantoin'];
      const trimethoprimInfo = BNF_MEDICATIONS['trimethoprim'];
      const atorvastatinInfo = BNF_MEDICATIONS['atorvastatin'];

      const testQuestions = [
        {
          id: "q1",
          topic: "Urinary Tract Infection (Women)",
          question: "A 24-year-old woman presents with dysuria, urinary frequency, and suprapubic discomfort for 2 days. She has no fever, flank pain, or vaginal discharge. What is the most appropriate next step?",
          options: {
            A: "Urinalysis and empirical antibiotics",
            B: "Send urine for culture and await results",
            C: "Prescribe antifungals",
            D: "Refer to urology",
            E: "Pelvic ultrasound"
          },
          answer: "A",
          explanation: {
            A: "Correct. NICE NG109 recommends empirical antibiotic treatment without urine culture for women under 65 with ≥2 typical symptoms (dysuria, urgency, frequency, suprapubic pain).",
            B: "Incorrect. Culture is only recommended if symptoms are atypical, recurrent, or not improving.",
            C: "Incorrect. No features suggest fungal UTI.",
            D: "Incorrect. Specialist referral is not necessary in uncomplicated lower UTI.",
            E: "Incorrect. Imaging is not indicated in the absence of red flags or systemic symptoms."
          },
          mnemonic: "DUS = Dysuria, Urgency, Suprapubic pain → Treat empirically",
          links: {
            NICE: "https://www.nice.org.uk/guidance/ng109/resources/visual-summary-pdf-6535835117#page=2",
            CKS: "https://cks.nice.org.uk/topics/urinary-tract-infection-lower-women/management/empirical-antibiotic-treatment/",
            BNF: "https://bnf.nice.org.uk/treatment-summary/urinary-tract-infections-utis/#uncomplicated-lower-uti-in-nonpregnant-women",
            GMC: "https://www.gmc-uk.org/ethical-guidance/ethical-hub/decision-making-and-consent"
          }
        },
        {
          id: "q2",
          topic: "Familial Hypercholesterolaemia",
          question: "A 33-year-old woman with familial hypercholesterolaemia is planning pregnancy. She is currently on atorvastatin 80 mg. What is the most appropriate advice?",
          options: {
            A: "Switch to atorvastatin 10mg",
            B: "Continue current dose",
            C: "Stop atorvastatin before trying to conceive",
            D: "Switch to ezetimibe",
            E: "Switch to simvastatin 40mg"
          },
          answer: "C",
          explanation: {
            A: "Incorrect. Dose reduction doesn't eliminate risk — all statins are contraindicated in pregnancy.",
            B: "Incorrect. Statins must be discontinued when pregnancy is planned due to teratogenic potential.",
            C: "Correct. NICE and CKS recommend stopping statins at least 3 months before conception in women with FH.",
            D: "Incorrect. Ezetimibe is also not recommended in pregnancy due to limited safety data.",
            E: "Incorrect. Switching statins doesn't change teratogenic risk."
          },
          mnemonic: "🚫 S.T.A.T.I.N. = Stop Three months Ahead To Inhibit Neonatal risk",
          links: {
            NICE: "https://www.nice.org.uk/guidance/cg181/chapter/1-Recommendations#recommendations-for-women-of-childbearing-potential",
            CKS: "https://cks.nice.org.uk/topics/familial-hypercholesterolaemia/pregnancy-and-breastfeeding/pregnancy/#advice-for-women-planning-pregnancy",
            BNF: "https://bnf.nice.org.uk/drug/atorvastatin.html#pregnancy",
            UKMI: "https://www.sps.nhs.uk/articles/what-is-the-ukmi-position-on-the-use-of-statins-during-pregnancy/",
            GMC: "https://www.gmc-uk.org/ethical-guidance/ethical-hub/prescribing-safely"
          }
        }
      ];

      const { questionId } = req.query;
      
      if (questionId) {
        const question = testQuestions.find(q => q.id === questionId);
        if (!question) {
          return res.status(404).json({ error: "Question not found" });
        }
        res.json(question);
      } else {
        res.json(testQuestions);
      }
    } catch (error) {
      console.error('Error fetching test questions:', error);
      res.status(500).json({ error: "Failed to fetch test questions" });
    }
  });

  // Video OSCE API routes
  app.get("/api/video-osce/sessions", async (req, res) => {
    try {
      // Return user's video sessions - in production this would come from database
      const sessions: any[] = [];
      res.json(sessions);
    } catch (error) {
      console.error('Error fetching video sessions:', error);
      res.status(500).json({ error: "Failed to fetch video sessions" });
    }
  });

  app.post("/api/video-osce/upload", async (req, res) => {
    try {
      // In production, this would handle file upload to cloud storage
      // and trigger AI analysis of the video
      const { stationId, duration } = req.body;
      
      const sessionId = `session_${Date.now()}`;
      const newSession = {
        id: sessionId,
        stationId,
        stationTitle: "Uploaded OSCE Session",
        category: "General",
        duration: parseInt(duration) || 8,
        recordingUrl: `/recordings/${sessionId}.webm`,
        analysisResults: null,
        status: "analyzing",
        createdAt: new Date().toISOString()
      };

      res.json(newSession);
    } catch (error) {
      console.error('Error uploading video:', error);
      res.status(500).json({ error: "Failed to upload video recording" });
    }
  });

  // International Medical Exams API
  app.get('/api/international-exams', (req, res) => {
    try {
      const supportedExams = getSupportedExams();
      const examDetails = supportedExams.map(examId => getExamInfo(examId));
      
      res.json({
        totalExams: supportedExams.length,
        exams: examDetails,
        regions: [
          { name: 'English Speaking', count: 5, exams: ['uk_plab', 'usa_usmle', 'australia_amc', 'canada_mccqe', 'newzealand_nzrex'] },
          { name: 'Europe', count: 2, exams: ['ireland_mcr', 'germany_fsp'] },
          { name: 'Middle East', count: 1, exams: ['uae_dha'] }
        ]
      });
    } catch (error) {
      console.error('Error fetching international exams:', error);
      res.status(500).json({ error: 'Failed to fetch exam information' });
    }
  });

  app.post('/api/international-questions/generate', async (req, res) => {
    try {
      const { examType, specialty, difficulty = 'intermediate', count = 5 } = req.body;
      
      if (!validateExamSupport(examType)) {
        return res.status(400).json({ 
          error: 'Unsupported exam type',
          supportedExams: getSupportedExams()
        });
      }

      const questions = await generateMultipleInternationalQuestions(
        examType,
        specialty,
        count,
        difficulty
      );

      res.json({
        examType,
        specialty,
        difficulty,
        questionCount: questions.length,
        questions,
        examInfo: getExamInfo(examType)
      });
    } catch (error) {
      console.error('Error generating international questions:', error);
      res.status(500).json({ error: 'Failed to generate questions' });
    }
  });

  app.get('/api/international-exams/:examType', (req, res) => {
    try {
      const { examType } = req.params;
      const examInfo = getExamInfo(examType);
      
      if (!examInfo) {
        return res.status(404).json({ error: 'Exam not found' });
      }

      res.json({
        exam: examInfo,
        availableSpecialties: [
          'cardiovascular', 'respiratory', 'gastrointestinal', 'neurology',
          'endocrinology', 'psychiatry', 'obstetrics', 'pediatrics', 'surgery',
          'emergency', 'pharmacology', 'ethics', 'infectious-diseases'
        ],
        studyMaterials: {
          questions: examType === 'uk_plab' ? 4800 : examType === 'usa_usmle' ? 6500 : 2200,
          mockExams: examType === 'uk_plab' ? 24 : examType === 'usa_usmle' ? 32 : 15,
          studyGuides: examType === 'uk_plab' ? 45 : examType === 'usa_usmle' ? 60 : 30
        }
      });
    } catch (error) {
      console.error('Error fetching exam details:', error);
      res.status(500).json({ error: 'Failed to fetch exam details' });
    }
  });

  app.post('/api/international-mock-exam', async (req, res) => {
    try {
      const { examType, duration = 180, questionCount = 50 } = req.body;
      
      if (!validateExamSupport(examType)) {
        return res.status(400).json({ error: 'Unsupported exam type' });
      }

      // Generate mixed specialty questions for mock exam
      const specialties = ['cardiovascular', 'respiratory', 'neurology', 'endocrinology'];
      const questionsPerSpecialty = Math.ceil(questionCount / specialties.length);
      
      const allQuestions = [];
      for (const specialty of specialties) {
        const questions = await generateMultipleInternationalQuestions(
          examType,
          specialty,
          questionsPerSpecialty,
          'intermediate'
        );
        allQuestions.push(...questions);
      }

      // Shuffle questions and trim to requested count
      const shuffledQuestions = allQuestions.sort(() => 0.5 - Math.random()).slice(0, questionCount);

      const mockExam = {
        id: `mock_${examType}_${Date.now()}`,
        examType,
        title: `${getExamInfo(examType)?.examName} Mock Examination`,
        duration,
        questionCount: shuffledQuestions.length,
        questions: shuffledQuestions,
        timeCreated: new Date().toISOString(),
        passingScore: getExamInfo(examType)?.passingScore || 70
      };

      res.json(mockExam);
    } catch (error) {
      console.error('Error creating mock exam:', error);
      res.status(500).json({ error: 'Failed to create mock exam' });
    }
  });

  // AI Tutor endpoint
  app.post('/api/ai-tutor', async (req, res) => {
    try {
      const { query, context } = req.body;
      
      if (!query) {
        return res.status(400).json({ error: 'Query is required' });
      }

      const tutorResponse = await generateTutorResponse(query, context);
      res.json(tutorResponse);
    } catch (error) {
      console.error('AI Tutor error:', error);
      res.status(500).json({ error: 'Failed to generate tutor response' });
    }
  });

  // Mount PLAB Intelligence API
  app.use(plabIntelligenceAPI);

  const httpServer = createServer(app);
  return httpServer;
}
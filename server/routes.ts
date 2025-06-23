import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { isAIEnabled, getAIStatus, suspendAI } from "./ai-config";
import { BNF_MEDICATIONS } from "../shared/bnf-integration";
import { 
  trackSession, 
  trackPageView, 
  trackTestActivity, 
  getUsageStats, 
  generateSessionId,
  cleanupOldSessions 
} from "./usage-analytics";
import fs from "fs";
import path from "path";

// Initialize AI suspension
suspendAI("User requested suspension of all AI activity");

// Pre-loaded question bank for instant delivery
let ukQuestionBank: any[] = [];

export async function registerRoutes(app: Express): Promise<Server> {
  
  // AI Status endpoint
  app.get("/api/ai/status", async (req, res) => {
    res.json({
      status: getAIStatus(),
      enabled: isAIEnabled(),
      message: "All AI features are currently suspended"
    });
  });

  // All AI endpoints suspended - return 503 for any AI requests
  app.post("/api/ask-nhs-prep", async (req, res) => {
    res.status(503).json({ 
      error: "AI services suspended", 
      message: getAIStatus(),
      fallback: "Please refer to NICE guidelines at https://www.nice.org.uk/guidance for medical guidance"
    });
  });

  app.post("/api/generate-questions", async (req, res) => {
    res.status(503).json({ 
      error: "AI services suspended", 
      message: getAIStatus()
    });
  });

  app.post("/api/tutor", async (req, res) => {
    res.status(503).json({ 
      error: "AI services suspended", 
      message: getAIStatus()
    });
  });

  app.post("/api/ai-analysis", async (req, res) => {
    res.status(503).json({ 
      error: "AI services suspended", 
      message: getAIStatus()
    });
  });

  // Analytics endpoints
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

  // PassMedicine-style test questions - Static content only
  app.get("/api/test/questions", async (req, res) => {
    try {
      // Track page view
      const sessionId = Array.isArray(req.headers['x-session-id']) 
        ? req.headers['x-session-id'][0] 
        : req.headers['x-session-id'] || generateSessionId();
      trackPageView(sessionId, '/test');

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
            NICE: "https://www.nice.org.uk/guidance/ng109/chapter/Recommendations#treatment-of-lower-uti-in-non-pregnant-women-aged-16-and-over",
            CKS: "https://cks.nice.org.uk/topics/urinary-tract-infection-lower-women/management/empirical-antibiotic-treatment/",
            BNF: "https://www.nhs.uk/medicines/nitrofurantoin/",
            GMC: "https://www.gmc-uk.org/"
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
        return res.json(question);
      }

      res.json(testQuestions);
    } catch (error) {
      console.error('Error fetching test questions:', error);
      res.status(500).json({ error: "Failed to fetch questions" });
    }
  });

  // Performance tracking endpoint
  app.get('/api/performance-stats', (req, res) => {
    res.json({
      questionBank: 2, // Static count for the two test questions
      totalAttempts: 0,
      averageScore: 0,
      aiStatus: getAIStatus()
    });
  });

  // Basic endpoints for static content
  app.get('/api/question-bank', (req, res) => {
    res.json({
      questions: [],
      total: 0,
      message: "Question generation suspended - AI services offline"
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Periodic cleanup
setInterval(cleanupOldSessions, 5 * 60 * 1000); // Every 5 minutes
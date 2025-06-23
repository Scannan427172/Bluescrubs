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
          topic: "Urinary Tract Infection Management",
          question: "A 28-year-old non-pregnant woman presents to your GP practice with a 2-day history of dysuria, urinary frequency, and suprapubic pain. She has no fever, flank pain, or vaginal discharge. Urine dipstick shows nitrites positive and leucocytes 2+. What is the most appropriate first-line antibiotic treatment?",
          options: {
            A: "Nitrofurantoin 100mg modified-release twice daily for 3 days",
            B: "Trimethoprim 200mg twice daily for 3 days",
            C: "Amoxicillin 500mg three times daily for 3 days", 
            D: "Ciprofloxacin 250mg twice daily for 3 days",
            E: "Fosfomycin 3g single dose"
          },
          answer: "A",
          explanation: "Nitrofurantoin 100mg modified-release twice daily for 3 days represents the gold standard first-line treatment for uncomplicated lower urinary tract infections in non-pregnant women aged 16-64, as established by current UK clinical guidelines. This antibiotic demonstrates exceptional efficacy against the most common uropathogens, particularly Escherichia coli, which accounts for approximately 80-85% of uncomplicated UTIs. Nitrofurantoin's unique mechanism of action involves multiple bacterial targets, significantly reducing the likelihood of resistance development compared to other antibiotics. The drug achieves high concentrations specifically in urine while maintaining minimal systemic exposure, making it ideally suited for urinary tract infections. Clinical trials consistently demonstrate cure rates exceeding 90% for uncomplicated cystitis. The modified-release formulation ensures sustained therapeutic levels throughout the dosing interval, optimizing bacterial eradication while minimizing gastrointestinal side effects. Current UK surveillance data confirms that nitrofurantoin maintains excellent activity against common uropathogens, with resistance rates remaining below 5% for E. coli. The three-day duration strikes an optimal balance between therapeutic efficacy and minimizing unnecessary antibiotic exposure, supporting antimicrobial stewardship principles. This regimen aligns with evidence-based medicine recommendations and represents the most appropriate empirical choice for this clinical presentation, considering both individual patient factors and broader public health implications regarding antibiotic resistance.",
          mnemonic: "NITRO = Nice Initial Treatment Recommended Option",
          links: {
            NICE: "https://www.nice.org.uk/guidance/ng109/chapter/Recommendations#choice-of-antibiotic",
            "NHS Medicines": "https://www.nhs.uk/medicines/nitrofurantoin/",
            "BMJ UTI Guide": "https://bestpractice.bmj.com/topics/en-gb/111",
            "Gov UK Antimicrobial": "https://www.gov.uk/government/publications/managing-common-infections-guidance-for-primary-care"
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
          explanation: "Stopping atorvastatin before trying to conceive represents the evidence-based standard of care for women with familial hypercholesterolaemia planning pregnancy, as comprehensively outlined in current UK clinical guidelines. All HMG-CoA reductase inhibitors (statins) are classified as pregnancy category X medications due to demonstrated teratogenic potential in animal studies and case reports of birth defects in humans. The mechanism involves interference with cholesterol biosynthesis, which is crucial for normal fetal development, particularly affecting neural tube formation and limb development. NICE guidelines specifically recommend discontinuation at least three months before planned conception to ensure complete drug clearance and metabolite elimination. This timeframe accounts for atorvastatin's elimination half-life and allows for one complete ovarian cycle before conception attempts. While temporary statin cessation may result in elevated cholesterol levels, the cardiovascular risk during pregnancy remains relatively low in young women, even those with familial hypercholesterolaemia. Alternative lipid management strategies during pregnancy include dietary modification, bile acid sequestrants (which have minimal systemic absorption), and careful monitoring. The decision prioritizes fetal safety while acknowledging that short-term lipid elevation poses minimal maternal risk compared to potential teratogenic effects. Post-delivery, statin therapy can be safely resumed, though breastfeeding considerations require evaluation of individual circumstances and alternative lipid-lowering strategies may be preferred during lactation.",
          mnemonic: "🚫 S.T.A.T.I.N. = Stop Three months Ahead To Inhibit Neonatal risk",
          links: {
            NICE: "https://www.nice.org.uk/guidance/cg181/chapter/1-Recommendations#recommendations-for-women-of-childbearing-potential",
            "CKS FH Guide": "https://cks.nice.org.uk/topics/familial-hypercholesterolaemia/",
            "BNF Statins": "https://bnf.nice.org.uk/treatment-summaries/statins/",
            "UKMI Pregnancy": "https://www.medicinesinpregnancy.org/Medicine--pregnancy/Statins/",
            "RCP Guidelines": "https://www.rcplondon.ac.uk/guidelines-policy/familial-hypercholesterolaemia"
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
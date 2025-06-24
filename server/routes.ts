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

  // PLAB practice test questions - Static content only
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
          guidelineSummary: {
            title: "UTI Management in Primary Care (250-word Summary)",
            content: "• **Definition & Diagnosis**: Uncomplicated UTI presents with dysuria, frequency, urgency, suprapubic pain in healthy non-pregnant women aged 16-64. Diagnosis confirmed by positive urine dipstick (nitrites/leucocytes) or MSU culture. Consider alternative diagnoses in atypical presentations.\n\n• **First-line Treatment**: Nitrofurantoin 100mg modified-release BD for 3 days remains gold standard due to excellent E. coli coverage (>95% sensitivity), minimal resistance development, and concentrated urinary excretion. Avoid in eGFR <45ml/min.\n\n• **Alternative Options**: Trimethoprim 200mg BD for 3 days (second-line due to 20-30% E. coli resistance). Fosfomycin 3g single dose for treatment failures or intolerance. Avoid quinolones unless specifically indicated.\n\n• **When to Culture**: Suspected pyelonephritis, treatment failure, recurrent UTIs (≥2 episodes in 6 months), pregnancy, immunocompromised patients, or atypical organisms suspected.\n\n• **Safety Netting**: Advise patients to return if symptoms persist >48 hours post-treatment, develop fever/flank pain, or experience severe systemic symptoms. Provide written information on fluid intake and symptom monitoring.\n\n• **Prevention**: Recommend adequate hydration, complete bladder emptying, post-coital voiding for sexually active women. Consider cranberry products for recurrent cases, though evidence remains limited.\n\n• **Antibiotic Stewardship**: Reserve broad-spectrum antibiotics for complicated cases. Encourage symptom diaries for recurrent infections to identify triggers and optimize prevention strategies."
          },
          links: {
            primary: {
              title: "Primary UK Guidance",
              url: "https://www.nice.org.uk/guidance/ng109",
              description: "NICE NG109: Urinary tract infection (lower) - antimicrobial prescribing"
            },
            supplementary: [
              {
                title: "CKS UTI Management",
                url: "https://cks.nice.org.uk/topics/urinary-tract-infection-lower-women/",
                description: "Clinical Knowledge Summaries - comprehensive UTI guidance"
              },
              {
                title: "BNF Antimicrobial Guidance", 
                url: "https://bnf.nice.org.uk/treatment-summaries/urinary-tract-infections/",
                description: "British National Formulary - UTI treatment protocols"
              },
              {
                title: "PHE Antimicrobial Guidelines",
                url: "https://www.gov.uk/government/publications/managing-common-infections-guidance-for-primary-care",
                description: "Public Health England - managing common infections in primary care"
              },
              {
                title: "SIGN Antimicrobial Prescribing",
                url: "https://www.sign.ac.uk/our-guidelines/antibiotic-prophylaxis-in-surgery/",
                description: "Scottish Intercollegiate Guidelines Network - infection management"
              }
            ]
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
          guidelineSummary: {
            title: "Familial Hypercholesterolaemia & Pregnancy Management (250-word Summary)",
            content: "• **Definition & Recognition**: FH affects 1:250 individuals, characterized by LDL-C >4.9mmol/L, tendon xanthomata, family history of premature CHD. Use Dutch Lipid Clinic Network criteria for diagnosis. Early identification crucial for cardiovascular risk reduction.\n\n• **Pre-conception Planning**: Discontinue all statins ≥3 months before planned conception due to teratogenic risk (Category X). Atorvastatin has 14-hour half-life; clearance requires multiple elimination cycles. Consider switching to bile acid sequestrants if lipid control essential.\n\n• **Pregnancy Management**: Monitor lipid levels but avoid aggressive treatment. Physiological cholesterol increase occurs normally in pregnancy. Focus on dietary modification, omega-3 supplementation, and cardiovascular risk factor optimization (BP, diabetes screening).\n\n• **Alternative Therapies**: Ezetimibe contraindicated (limited safety data). Bile acid sequestrants (cholestyramine/colesevelam) considered safer due to minimal systemic absorption, though may affect fat-soluble vitamin absorption requiring supplementation.\n\n• **Postpartum Care**: Resume statin therapy post-delivery if not breastfeeding. If breastfeeding planned, continue dietary measures and consider specialist lipid clinic referral for complex cases requiring alternative strategies.\n\n• **Family Screening**: Cascade screening essential - test first-degree relatives. Genetic counseling recommended for reproductive planning. Children of affected parents have 50% inheritance risk.\n\n• **Long-term Monitoring**: Annual cardiovascular risk assessment, imaging for atherosclerosis progression, and optimization of other modifiable risk factors throughout reproductive years."
          },
          links: {
            primary: {
              title: "Primary UK Guidance",
              url: "https://www.nice.org.uk/guidance/cg181",
              description: "NICE CG181: Familial hypercholesterolaemia - identification and management"
            },
            supplementary: [
              {
                title: "CKS FH Management",
                url: "https://cks.nice.org.uk/topics/familial-hypercholesterolaemia/",
                description: "Clinical Knowledge Summaries - comprehensive FH guidance"
              },
              {
                title: "ESC Dyslipidaemia Guidelines",
                url: "https://www.escardio.org/Guidelines/Clinical-Practice-Guidelines/ESC-EAS-Guidelines-for-the-management-of-dyslipidaemias",
                description: "European Society of Cardiology - lipid management protocols"
              },
              {
                title: "RCOG Pregnancy Guidelines",
                url: "https://www.rcog.org.uk/guidance/browse-all-guidance/green-top-guidelines/",
                description: "Royal College of Obstetricians - pregnancy and medication guidance"
              },
              {
                title: "BCS Lipid Guidelines",
                url: "https://www.britishcardiovascularsociety.org/resources/guidelines",
                description: "British Cardiovascular Society - specialist lipid management"
              }
            ]
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
import type { Express } from "express";
import { createServer, type Server } from "http";
import { generateMultipleSimpleQuestions } from "./simple-question-generator";
import { communitySystem } from "./community-contribution";
import { analyzeVideoPerformance } from "./ai-analysis";
import { storage } from "./storage";
import { askMedicalAI } from "./ask-ai-api";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Add JSON parsing middleware for API routes
  app.use('/api/*', (req, res, next) => {
    console.log(`API Request: ${req.method} ${req.originalUrl}`);
    next();
  });
  
  // Generate medical questions using OpenAI
  app.post("/api/generate-questions", async (req, res) => {
    try {
      const { category, count = 5, difficulty = 'intermediate' } = req.body;
      
      if (!category) {
        return res.status(400).json({ error: "Category is required" });
      }

      // Limit count to prevent timeout
      const limitedCount = Math.min(count, 3);
      console.log(`Generating ${limitedCount} questions for category: ${category}, difficulty: ${difficulty}`);
      
      // Set timeout for the entire operation  
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Question generation timeout')), 120000); // 2 minute timeout
      });

      // Define subcategories for each medical specialty
      const subcategoriesMap: Record<string, string[]> = {
        cardiovascular: ['heart-failure', 'arrhythmias', 'hypertension', 'coronary-artery-disease', 'valvular-disease'],
        respiratory: ['COPD', 'asthma', 'pneumonia', 'lung-cancer', 'pulmonary-embolism'],
        gastroenterology: ['IBD', 'liver-disease', 'peptic-ulcer', 'colorectal-cancer', 'pancreatitis'],
        neurology: ['stroke', 'epilepsy', 'headache', 'dementia', 'multiple-sclerosis'],
        endocrinology: ['diabetes', 'thyroid-disorders', 'adrenal-disorders', 'obesity', 'osteoporosis'],
        psychiatry: ['depression', 'anxiety', 'psychosis', 'bipolar-disorder', 'substance-abuse'],
        nephrology: ['AKI', 'CKD', 'glomerulonephritis', 'electrolyte-disorders', 'hypertension'],
        haematology: ['anaemia', 'bleeding-disorders', 'thrombosis', 'leukaemia', 'lymphoma']
      };

      const subcategories = subcategoriesMap[category] || ['general'];
      
      console.log(`Generating questions for ${category} at ${difficulty} level, count: ${limitedCount}`);
      const questions = generateMultipleSimpleQuestions(category, difficulty, limitedCount);
      console.log(`Generated questions:`, questions.map(q => ({ id: q.id, category: q.category, hasOptions: !!q.options })));
      
      if (!questions || !Array.isArray(questions) || questions.length === 0) {
        throw new Error('No questions were generated');
      }
      
      res.json({ 
        questions,
        count: questions.length,
        category,
        difficulty
      });
      
    } catch (error) {
      console.error("Question generation error:", error);
      res.status(500).json({ 
        error: "Failed to generate questions",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Bulk question generation endpoint for creating comprehensive question banks
  app.post('/api/generate-bulk-questions', async (req, res) => {
    try {
      const { categories, questionsPerCategory = 100 } = req.body;
      
      if (!categories || !Array.isArray(categories)) {
        return res.status(400).json({ error: "Categories array is required" });
      }

      const allQuestions: any[] = [];
      let totalGenerated = 0;

      const subcategoriesMap: Record<string, string[]> = {
        cardiovascular: ['heart-failure', 'arrhythmias', 'hypertension', 'coronary-artery-disease', 'valvular-disease'],
        respiratory: ['COPD', 'asthma', 'pneumonia', 'lung-cancer', 'pulmonary-embolism'],
        gastroenterology: ['IBD', 'liver-disease', 'peptic-ulcer', 'colorectal-cancer', 'pancreatitis'],
        neurology: ['stroke', 'epilepsy', 'headache', 'dementia', 'multiple-sclerosis'],
        endocrinology: ['diabetes', 'thyroid-disorders', 'adrenal-disorders', 'obesity', 'osteoporosis'],
        psychiatry: ['depression', 'anxiety', 'psychosis', 'bipolar-disorder', 'substance-abuse'],
        'obstetrics-gynaecology': ['pregnancy', 'labour', 'gynaecological-cancers', 'menstrual-disorders', 'contraception'],
        paediatrics: ['neonatal', 'respiratory-infections', 'developmental', 'immunizations', 'child-abuse'],
        surgery: ['general-surgery', 'orthopaedics', 'urology', 'vascular-surgery', 'emergency-surgery'],
        nephrology: ['AKI', 'CKD', 'glomerulonephritis', 'electrolyte-disorders', 'dialysis'],
        haematology: ['anaemia', 'bleeding-disorders', 'thrombosis', 'leukaemia', 'lymphoma'],
        'infectious-diseases': ['sepsis', 'HIV', 'tuberculosis', 'tropical-diseases', 'antimicrobial-resistance'],
        rheumatology: ['rheumatoid-arthritis', 'osteoarthritis', 'gout', 'lupus', 'vasculitis'],
        dermatology: ['skin-cancer', 'eczema', 'psoriasis', 'infections', 'dermatitis'],
        'emergency-medicine': ['trauma', 'poisoning', 'cardiac-arrest', 'shock', 'burns'],
        'ethics-law': ['consent', 'confidentiality', 'end-of-life', 'medical-negligence', 'capacity'],
        'public-health': ['epidemiology', 'health-promotion', 'screening', 'health-policy', 'global-health'],
        'clinical-pharmacology': ['drug-interactions', 'adverse-reactions', 'prescribing', 'pharmacokinetics', 'therapeutics']
      };

      // Generate questions for each category
      for (const category of categories) {
        console.log(`Starting bulk generation for ${category}: ${questionsPerCategory} questions`);
        
        const subcategories = subcategoriesMap[category] || ['general'];
        const difficulties = ['foundation', 'intermediate', 'advanced'];
        const questionsPerDifficulty = Math.ceil(questionsPerCategory / 3);

        // Generate questions for each difficulty level
        for (const difficulty of difficulties) {
          try {
            const categoryQuestions = await generateMultipleSimpleQuestions(
              category, 
              difficulty, 
              questionsPerDifficulty
            );
            
            allQuestions.push(...categoryQuestions);
            totalGenerated += categoryQuestions.length;
            
            console.log(`Generated ${categoryQuestions.length} ${difficulty} questions for ${category}`);
            
            // Delay between categories
            await new Promise(resolve => setTimeout(resolve, 500));
            
          } catch (error) {
            console.error(`Failed to generate ${difficulty} questions for ${category}:`, error);
          }
        }
      }

      console.log(`Bulk generation complete: ${totalGenerated} questions generated`);
      res.json({ 
        questions: allQuestions, 
        totalGenerated,
        categories: categories.length,
        questionsPerCategory 
      });

    } catch (error) {
      console.error('Bulk question generation error:', error);
      res.status(500).json({ error: 'Failed to generate bulk questions' });
    }
  });

  // Translation API endpoint
  app.post("/api/translate", async (req, res) => {
    try {
      const { text, targetLanguage, context } = req.body;
      
      if (!text || !targetLanguage) {
        return res.status(400).json({ error: "Missing text or target language" });
      }

      // Language code mapping for better translation quality
      const languageNames: Record<string, string> = {
        'ur': 'Urdu',
        'hi': 'Hindi', 
        'ar': 'Arabic',
        'bn': 'Bengali',
        'es': 'Spanish',
        'fr': 'French',
        'de': 'German',
        'it': 'Italian',
        'pt': 'Portuguese',
        'zh': 'Chinese',
        'ja': 'Japanese',
        'ko': 'Korean',
        'ru': 'Russian',
        'tr': 'Turkish',
        'pl': 'Polish',
        'ro': 'Romanian'
      };

      const targetLanguageName = languageNames[targetLanguage] || targetLanguage;
      
      const systemPrompt = `You are a professional medical translator specializing in PLAB and medical education content. 
      Translate the following medical text accurately while preserving medical terminology and context.
      Target language: ${targetLanguageName}
      Context: ${context || 'medical_education'}
      
      Important:
      - Maintain medical accuracy
      - Keep medical terms precise
      - Preserve question format and structure
      - Return only the translation, no explanations`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: text }
        ],
        temperature: 0.3,
        max_tokens: 1000
      });

      const translation = response.choices[0].message.content?.trim() || text;
      
      res.json({ translation });
      
    } catch (error) {
      console.error("Translation error:", error);
      res.status(500).json({ error: "Translation service unavailable" });
    }
  });

  // Ask AI Medical Questions Route
  app.post("/api/ask-ai", async (req, res) => {
    try {
      const { question, context } = req.body;
      
      if (!question || typeof question !== 'string' || question.trim().length === 0) {
        return res.status(400).json({ error: "Valid question is required" });
      }

      if (question.length > 500) {
        return res.status(400).json({ error: "Question too long. Maximum 500 characters." });
      }

      const response = await askMedicalAI(question.trim());
      res.json(response);

    } catch (error) {
      console.error("Ask AI error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unable to process question";
      res.status(500).json({ error: errorMessage });
    }
  });
  
  // Question Bank Expansion Routes
  // Test endpoint for OpenAI connection
  app.post("/api/test-ai", async (req, res) => {
    try {
      console.log("Testing OpenAI connection...");
      const question = await generateMultipleSimpleQuestions('cardiology', 'intermediate', 1);
      console.log("OpenAI test successful");
      res.json({ success: true, question });
    } catch (error) {
      console.error("OpenAI test failed:", error);
      res.status(500).json({ error: `OpenAI test failed: ${error instanceof Error ? error.message : 'Unknown error'}` });
    }
  });

  app.post("/api/generate-questions", async (req, res) => {
    try {
      const { examType, specialty, count, difficulty } = req.body;
      
      if (!examType || !specialty) {
        return res.status(400).json({ error: "Missing required parameters" });
      }

      // Limit count to prevent timeout issues
      const limitedCount = Math.min(count || 1, 3);
      
      console.log(`Generating ${limitedCount} questions for ${specialty} at ${difficulty || 'intermediate'} level`);

      const questions = await generateMultipleSimpleQuestions(specialty, difficulty || 'intermediate', limitedCount);
      res.json({ questions });
      
    } catch (error) {
      console.error("Question generation error:", error);
      res.status(500).json({ error: `Failed to generate questions: ${error instanceof Error ? error.message : 'Unknown error'}` });
    }
  });

  app.post("/api/build-competitive-bank", async (req, res) => {
    try {
      console.log("Starting competitive question bank generation...");
      
      const results = await communitySystem.buildCompetitiveQuestionBank();
      
      res.json({
        success: true,
        message: "Question bank expansion completed",
        results
      });
      
    } catch (error) {
      console.error("Bank generation error:", error);
      res.status(500).json({ error: "Failed to build question bank" });
    }
  });

  app.get("/api/question-bank-status", async (req, res) => {
    try {
      const status = {
        currentCounts: {
          PLAB: 20, // Updated from our expansion
          USMLE: 8,
          MCCEE: 1,
          AMC: 1,
          MRCP: 1,
          DHA: 1,
          IELTS: 1
        },
        targetCounts: {
          PLAB: 5000,
          USMLE: 4000,
          MCCEE: 2500,
          AMC: 2000,
          MRCP: 3000,
          DHA: 2000,
          IELTS: 1500
        },
        expansionProgress: {
          phase: "Phase 2: Rapid Content Generation",
          status: "In Progress",
          nextMilestone: "1000 questions per exam type"
        }
      };

      res.json(status);
    } catch (error) {
      res.status(500).json({ error: "Failed to get status" });
    }
  });

  app.post("/api/mass-generate/:examType/:specialty", async (req, res) => {
    try {
      const { examType, specialty } = req.params;
      const { targetCount = 100 } = req.body;

      console.log(`Mass generating ${targetCount} questions for ${examType} ${specialty}`);

      const questions = await communitySystem.generateMassQuestions(
        examType.toUpperCase(),
        specialty,
        Math.min(targetCount, 500), // Safety limit
        85 // Quality threshold
      );

      res.json({
        generated: questions.length,
        examType,
        specialty,
        questions: questions.slice(0, 5) // Return first 5 as preview
      });

    } catch (error) {
      console.error("Mass generation error:", error);
      res.status(500).json({ error: "Mass generation failed" });
    }
  });

  // Specialty-specific rapid expansion
  app.post("/api/expand-specialty-banks", async (req, res) => {
    try {
      const specialties = [
        'cardiovascular', 'respiratory', 'gastroenterology', 'neurology',
        'endocrinology', 'nephrology', 'psychiatry', 'obstetrics-gynaecology',
        'paediatrics', 'emergency-medicine', 'infectious-diseases'
      ];

      const expansionResults = [];

      for (const specialty of specialties) {
        try {
          // Generate 200 questions per specialty for PLAB
          const questions = await communitySystem.generateMassQuestions(
            'PLAB',
            specialty,
            200,
            85
          );

          expansionResults.push({
            specialty,
            generated: questions.length,
            status: 'completed'
          });

          console.log(`Expanded ${specialty}: ${questions.length} questions`);
          
        } catch (error) {
          expansionResults.push({
            specialty,
            generated: 0,
            status: 'failed',
            error: error instanceof Error ? error.message : 'Unknown error'
          });
        }
      }

      res.json({
        message: "Specialty bank expansion completed",
        results: expansionResults,
        totalGenerated: expansionResults.reduce((sum, r) => sum + r.generated, 0)
      });

    } catch (error) {
      res.status(500).json({ error: "Specialty expansion failed" });
    }
  });

  // Video OSCE Analysis Route
  app.post("/api/ai/analyze-video", async (req, res) => {
    try {
      const { stationTitle, stationCategory, learningObjectives, recordingDuration } = req.body;
      
      console.log("Received analysis request:", req.body);
      
      // Validate required parameters with more flexible checking
      if (!stationTitle || !stationCategory) {
        return res.status(400).json({ 
          error: "Missing required parameters",
          required: ["stationTitle", "stationCategory"],
          received: Object.keys(req.body || {})
        });
      }

      const analysis = await analyzeVideoPerformance(
        stationTitle,
        stationCategory,
        learningObjectives || ["General medical assessment"],
        recordingDuration || 60
      );

      res.json(analysis);
      
    } catch (error) {
      console.error("Video analysis error:", error);
      res.status(500).json({ error: "Failed to analyze video" });
    }
  });

  // OSCE Stations API Routes
  app.get("/api/osce/stations", async (req, res) => {
    try {
      const stations = [
        {
          id: 1,
          title: "History Taking - Chest Pain",
          category: "History Taking",
          difficulty: "Beginner",
          duration: 8,
          description: "Take focused history from patient presenting with acute chest pain",
          patientInfo: {
            name: "Mr. John Smith",
            age: 45,
            occupation: "Accountant",
            background: "Presented to A&E with 2-hour history of central chest pain"
          },
          learningObjectives: [
            "Obtain relevant history for chest pain",
            "Assess cardiovascular risk factors", 
            "Show empathy and professionalism",
            "Explain next steps clearly"
          ],
          completed: true,
          attempts: 3,
          bestScore: 92
        },
        {
          id: 2,
          title: "Breaking Bad News - Cancer Diagnosis",
          category: "Communication",
          difficulty: "Advanced",
          duration: 10,
          description: "Break news of cancer diagnosis with sensitivity and clear communication",
          patientInfo: {
            name: "Mrs. Sarah Williams",
            age: 52,
            occupation: "Teacher",
            background: "Awaiting test results after breast lump investigation"
          },
          learningObjectives: [
            "Use appropriate breaking bad news framework",
            "Show empathy and emotional support",
            "Provide clear medical information",
            "Address patient concerns and questions"
          ],
          completed: false,
          attempts: 1,
          bestScore: 85
        }
      ];

      res.json(stations);
    } catch (error) {
      console.error("Error fetching OSCE stations:", error);
      res.status(500).json({ error: "Failed to fetch stations" });
    }
  });

  app.get("/api/users/:userId/osce-attempts", async (req, res) => {
    try {
      const { userId } = req.params;
      
      // Mock OSCE attempt data
      const attempts = [
        {
          id: 1,
          stationId: 1,
          userId: parseInt(userId),
          score: 92,
          duration: 480,
          completedAt: new Date('2024-01-15'),
          feedback: {
            strengths: ["Good rapport building", "Systematic approach"],
            improvements: ["Time management", "Clarifying questions"]
          }
        },
        {
          id: 2,
          stationId: 2,
          userId: parseInt(userId),
          score: 85,
          duration: 600,
          completedAt: new Date('2024-01-10'),
          feedback: {
            strengths: ["Empathetic communication", "Clear explanations"],
            improvements: ["Handling emotional responses", "Follow-up planning"]
          }
        }
      ];

      res.json(attempts);
    } catch (error) {
      console.error("Error fetching OSCE attempts:", error);
      res.status(500).json({ error: "Failed to fetch attempts" });
    }
  });

  app.get("/api/users", async (req, res) => {
    try {
      // Mock user data
      const users = [
        {
          id: 1,
          name: "Dr. Sarah Ahmed",
          email: "sarah.ahmed@example.com",
          country: "Pakistan",
          examTarget: "PLAB",
          studyStreak: 15,
          totalScore: 1248,
          createdAt: new Date('2024-01-01')
        }
      ];

      res.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });

  // Get current question statistics
  app.get("/api/question-stats", async (req, res) => {
    try {
      // These would come from actual database queries
      const stats = {
        totalQuestions: 33, // Current expanded count
        questionsByExam: {
          PLAB: 20,
          USMLE: 8,
          MCCEE: 1,
          AMC: 1,
          MRCP: 1,
          DHA: 1,
          IELTS: 1
        },
        questionsByDifficulty: {
          foundation: 12,
          intermediate: 15,
          advanced: 6
        },
        questionsBySpecialty: {
          cardiovascular: 8,
          respiratory: 4,
          gastroenterology: 3,
          neurology: 2,
          endocrinology: 3,
          obstetrics: 2,
          paediatrics: 2,
          other: 9
        },
        qualityMetrics: {
          averageScore: 87.5,
          medicalAccuracy: 94.2,
          examAlignment: 89.8,
          explanationQuality: 91.3
        },
        competitorComparison: {
          "UWorld": 4000,
          "OnExamination": 2500,
          "Passmedicine": 2000,
          "NHSprep": 33
        },
        expansionTarget: {
          daily: 100,
          weekly: 700,
          monthly: 3000,
          timeToCompetitive: "8-12 months"
        }
      };

      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to get statistics" });
    }
  });

  // Global Scoreboard API Routes
  app.get("/api/scoreboard/global", async (req, res) => {
    try {
      const { category, country, limit } = req.query;
      const filters = {
        category: category as string,
        country: country as string,
        limit: limit ? parseInt(limit as string) : 100
      };
      
      const scoreboard = await storage.getGlobalScoreboard(filters);
      res.json(scoreboard);
    } catch (error) {
      console.error("Global scoreboard error:", error);
      res.status(500).json({ error: "Failed to fetch global scoreboard" });
    }
  });

  app.get("/api/scoreboard/weekly", async (req, res) => {
    try {
      const { country, limit } = req.query;
      const filters = {
        country: country as string,
        limit: limit ? parseInt(limit as string) : 50
      };
      
      const weekly = await storage.getWeeklyLeaderboard(filters);
      res.json(weekly);
    } catch (error) {
      console.error("Weekly leaderboard error:", error);
      res.status(500).json({ error: "Failed to fetch weekly leaderboard" });
    }
  });

  app.get("/api/scoreboard/countries", async (req, res) => {
    try {
      const countries = await storage.getCountryStats();
      res.json(countries);
    } catch (error) {
      console.error("Country stats error:", error);
      res.status(500).json({ error: "Failed to fetch country statistics" });
    }
  });

  // Submit score to scoreboard
  app.post("/api/scoreboard/submit", async (req, res) => {
    try {
      const { userId, category, score, timeSpent, questionsAnswered, accuracy } = req.body;
      
      if (!userId || score === undefined || !timeSpent || !questionsAnswered) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Update global scoreboard
      await storage.updateScoreboard(userId, {
        questionsAnswered,
        correctAnswers: score,
        studyTime: timeSpent,
        category: category || 'PLAB1'
      });

      res.json({ 
        success: true, 
        message: "Score submitted successfully"
      });
      
    } catch (error) {
      console.error("Score submission error:", error);
      res.status(500).json({ error: "Failed to submit score" });
    }
  });

  app.post("/api/users/location", async (req, res) => {
    try {
      const { country, city, flag } = req.body;
      const userId = 1; // For now, using mock user ID - in real app would get from session
      
      await storage.updateUserLocation(userId, {
        country,
        city,
        flagEmoji: flag
      });
      
      res.json({ success: true });
    } catch (error) {
      console.error("Location update error:", error);
      res.status(500).json({ error: "Failed to update location" });
    }
  });

  app.post("/api/scoreboard/update", async (req, res) => {
    try {
      const { questionsAnswered, correctAnswers, studyTime, category } = req.body;
      const userId = 1; // For now, using mock user ID - in real app would get from session
      
      await storage.updateScoreboard(userId, {
        questionsAnswered,
        correctAnswers,
        studyTime,
        category
      });
      
      res.json({ success: true });
    } catch (error) {
      console.error("Scoreboard update error:", error);
      res.status(500).json({ error: "Failed to update scoreboard" });
    }
  });

  app.get("/api/achievements/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const achievements = await storage.getUserAchievements(userId);
      res.json(achievements);
    } catch (error) {
      console.error("Achievements error:", error);
      res.status(500).json({ error: "Failed to fetch achievements" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
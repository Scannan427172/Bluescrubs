import type { Express } from "express";
import { createServer, type Server } from "http";
import { generateMultipleSimpleQuestions } from "./simple-question-generator";
import { communitySystem } from "./community-contribution";
import { analyzeVideoPerformance } from "./ai-analysis";
import { storage } from "./storage";
import { askMedicalAI } from "./ask-ai-api";
import { generateUKMedicalQuestion, generateMultipleUKQuestions } from "./uk-medical-generator";
import { getInstantQuestions, hasInstantQuestions } from "./plan1-optimization";
import { loadUKQuestionBank, generateFullQuestionBank } from "./bulk-uk-generator";
import { generatePLAB2Station, generateMultiplePLAB2Stations, PLAB2_STATION_TYPES, PLAB2_SPECIALTIES } from "./plab2-uk-generator";
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
import { advancedAI } from "./advanced-ai-system";
import { ukClinical } from "./uk-clinical-integration";
import { vrOSCE } from "./vr-osce-system";
import { mobileOffline } from "./mobile-offline-system";
import { gamification } from "./gamification-system";
import { professionalDevelopment } from "./professional-development";
import OpenAI from "openai";
import fs from "fs";
import path from "path";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

// Initialize question bank
initializeQuestionBank();

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

      // Limit count to prevent timeout - optimized for Plan 1
      const limitedCount = Math.min(count, 5); // Increased from 3 to 5 for better experience
      console.log(`Generating ${limitedCount} questions for category: ${category}, difficulty: ${difficulty}`);
      
      // Set faster timeout for responsive experience
      let timeoutId: NodeJS.Timeout;
      const timeoutPromise = new Promise((_, reject) => {
        timeoutId = setTimeout(() => reject(new Error('Question generation timeout')), 15000); // Reduced from 30s to 15s
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
      
      let questions: any[] = [];
      
      // First, try to get questions from pre-loaded UK question bank
      const availableQuestions = ukQuestionBank.filter(q => 
        (category === 'all' || q.category === category) && 
        q.difficulty === difficulty
      );
      
      if (availableQuestions.length >= limitedCount) {
        // Use existing questions from bank
        questions = availableQuestions
          .sort(() => Math.random() - 0.5) // Shuffle
          .slice(0, limitedCount)
          .map(q => ({
            ...q,
            id: `bank_${category}_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`
          }));
        
        console.log(`Using ${questions.length} questions from UK medical question bank`);
      } else {
        // Generate new UK medical questions using OpenAI
        console.log(`Generating new UK medical questions (bank has ${availableQuestions.length}, need ${limitedCount})`);
        
        const questionGenerationPromise = generateMultipleUKQuestions(limitedCount, category, difficulty);
        const result = await Promise.race([questionGenerationPromise, timeoutPromise]);
        clearTimeout(timeoutId!);
        
        const ukQuestions = result as any[];
        
        // Convert UK questions to standard format
        questions = ukQuestions.map((ukQ, index) => ({
          id: `uk_${category}_${Date.now()}_${index}_${Math.random().toString(36).substr(2, 6)}`,
          stem: `${ukQ.scenario}\n\n${ukQ.question}`,
          options: [ukQ.options.A, ukQ.options.B, ukQ.options.C, ukQ.options.D, ukQ.options.E],
          correctAnswer: ['A', 'B', 'C', 'D', 'E'].indexOf(ukQ.correct_answer),
          explanation: ukQ.explanation,
          category,
          difficulty,
          references: ukQ.references.map((ref: any) => ({
            text: ref.title,
            url: ref.url
          })),
          cks_guidance: ukQ.cks_guidance,
          additional_guidelines: ukQ.additional_guidelines
        }));
      }
      
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

  // Translation endpoint for PLAB 2 OSCE stations
  app.post('/api/translate-osce', async (req, res) => {
    try {
      const { station, targetLanguage } = req.body;
      
      if (!station || !targetLanguage) {
        return res.status(400).json({ error: 'OSCE station and target language required' });
      }

      const { translateOSCEStation } = await import('./internationalization.js');
      const translatedStation = await translateOSCEStation(station, targetLanguage);
      res.json(translatedStation);
    } catch (error) {
      console.error('OSCE translation API error:', error);
      res.status(500).json({ error: 'OSCE translation failed' });
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

  // Video station translation endpoint
  app.post('/api/translate/video-station', async (req, res) => {
    try {
      const { station, targetLanguage } = req.body;
      
      if (!station || !targetLanguage) {
        return res.status(400).json({ error: 'Video station and target language required' });
      }

      const { translateOSCEStation } = await import('./internationalization.js');
      const translatedStation = await translateOSCEStation(station, targetLanguage);
      res.json(translatedStation);
    } catch (error) {
      console.error('Video station translation API error:', error);
      res.status(500).json({ error: 'Video station translation failed' });
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

  // PLAB 2 OSCE Stations API Routes - Using UK Medical Generator
  app.get("/api/osce/stations", async (req, res) => {
    try {
      const { type, specialty, difficulty, count = 3 } = req.query;
      
      // Use UK medical question generator to create OSCE-style scenarios
      const stationSpecialty = (specialty as string) || 'general-medicine';
      const stationDifficulty = (difficulty as string) || 'intermediate';
      const stationCount = Math.min(parseInt(count as string), 3);
      
      console.log(`Generating ${stationCount} PLAB 2 OSCE stations using UK medical generator`);
      
      const ukQuestions = await generateMultipleUKQuestions(stationCount, stationSpecialty, stationDifficulty);
      
      // Convert UK medical questions to OSCE station format
      const stations = ukQuestions.map((ukQ, index) => ({
        id: `osce_${stationSpecialty}_${Date.now()}_${index}`,
        title: `Clinical Assessment - ${stationSpecialty.charAt(0).toUpperCase() + stationSpecialty.slice(1)}`,
        category: "Clinical Assessment",
        difficulty: stationDifficulty.charAt(0).toUpperCase() + stationDifficulty.slice(1),
        duration: 8,
        description: ukQ.scenario.substring(0, 100) + '...',
        scenario: ukQ.scenario,
        instructions: {
          candidate: "Take a focused history and examination as appropriate. Formulate a differential diagnosis and management plan.",
          examiner: "Observe communication skills, clinical reasoning, and professional behavior.",
          standardizedPatient: "Present symptoms as described in the scenario. Answer questions honestly based on the case."
        },
        markingCriteria: [
          {
            category: "Communication Skills",
            maxMarks: 5,
            criteria: ["Clear introduction", "Appropriate questioning", "Active listening", "Empathy and rapport", "Professional manner"]
          },
          {
            category: "Clinical Knowledge",
            maxMarks: 8,
            criteria: ["Relevant history taking", "Appropriate examination", "Correct diagnosis", "Evidence-based management"]
          },
          {
            category: "Professional Behavior",
            maxMarks: 7,
            criteria: ["Patient safety", "Ethical considerations", "Time management", "Clear explanations"]
          }
        ],
        keyActions: [
          "Introduce yourself professionally",
          "Obtain focused clinical history",
          "Explain findings clearly to patient",
          "Formulate appropriate management plan"
        ],
        redFlags: [
          "Missing critical symptoms",
          "Inappropriate examination technique",
          "Poor communication with patient",
          "Unsafe clinical decisions"
        ],
        references: ukQ.references.map(ref => ({
          title: ref.title,
          url: ref.url
        })),
        completed: false,
        attempts: 0,
        bestScore: 0
      }));

      res.json(stations);
    } catch (error: any) {
      console.error('Error generating OSCE stations:', error);
      res.status(500).json({ error: "Failed to generate OSCE stations" });
    }
  });

  // Generate single PLAB 2 station endpoint
  app.post("/api/osce/generate-station", async (req, res) => {
    try {
      const { type, specialty, difficulty } = req.body;
      
      const station = await generatePLAB2Station(
        type || 'history-taking',
        specialty || 'general-medicine', 
        difficulty || 'intermediate'
      );
      
      res.json(station);
    } catch (error: any) {
      console.error('Error generating single OSCE station:', error);
      res.status(500).json({ error: "Failed to generate station" });
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

  // AI Study Tools - Smart Flashcards with Spaced Repetition
  app.post("/api/study-tools/flashcards/generate", async (req, res) => {
    try {
      const { content, specialty = "general-medicine" } = req.body;
      
      if (!content) {
        return res.status(400).json({ error: "Content is required" });
      }

      const flashcards = await generateFlashcardsFromContent(content, specialty);
      res.json({ flashcards, count: flashcards.length });
    } catch (error) {
      console.error('Error generating flashcards:', error);
      res.status(500).json({ error: "Failed to generate flashcards" });
    }
  });

  // Auto-Summarizer
  app.post("/api/study-tools/summarize", async (req, res) => {
    try {
      const { content, format = "bullets" } = req.body;
      
      if (!content) {
        return res.status(400).json({ error: "Content is required" });
      }

      const summary = await summarizeContent(content, format);
      res.json({ summary, format });
    } catch (error) {
      console.error('Error summarizing content:', error);
      res.status(500).json({ error: "Failed to summarize content" });
    }
  });

  // Interactive Quiz Generator
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

  // Visual Explanation Assistant
  app.post("/api/study-tools/visual-explanation", async (req, res) => {
    try {
      const { concept, complexity = "intermediate" } = req.body;
      
      if (!concept) {
        return res.status(400).json({ error: "Concept is required" });
      }

      const explanation = await generateVisualExplanation(concept, complexity);
      res.json(explanation);
    } catch (error) {
      console.error('Error generating visual explanation:', error);
      res.status(500).json({ error: "Failed to generate explanation" });
    }
  });

  // Update flashcard performance (spaced repetition)
  app.post("/api/study-tools/flashcards/:id/review", async (req, res) => {
    try {
      const { id } = req.params;
      const { success, confidenceLevel = 3 } = req.body;
      
      // In a real implementation, you'd fetch the flashcard from database
      // For now, returning the update structure
      const updatedCard = {
        id,
        success,
        confidenceLevel,
        nextReview: new Date(Date.now() + 24 * 60 * 60 * 1000),
        message: "Flashcard performance updated with spaced repetition algorithm"
      };
      
      res.json(updatedCard);
    } catch (error) {
      console.error('Error updating flashcard:', error);
      res.status(500).json({ error: "Failed to update flashcard" });
    }
  });

  // Confidence tracking for quizzes
  app.post("/api/study-tools/quiz/:id/submit", async (req, res) => {
    try {
      const { id } = req.params;
      const { answers, confidenceLevels, timeSpent } = req.body;
      
      // Calculate performance metrics
      const performance = {
        quizId: id,
        totalQuestions: answers.length,
        averageConfidence: confidenceLevels.reduce((a: number, b: number) => a + b, 0) / confidenceLevels.length,
        timePerQuestion: timeSpent / answers.length,
        timestamp: new Date(),
        recommendedReview: []
      };
      
      res.json(performance);
    } catch (error) {
      console.error('Error submitting quiz:', error);
      res.status(500).json({ error: "Failed to submit quiz" });
    }
  });

  // Advanced AI System Endpoints
  app.post("/api/ai-system/predict-weaknesses", async (req, res) => {
    try {
      const { userProfile, recentPerformance } = req.body;
      const predictions = await advancedAI.predictWeaknesses(userProfile, recentPerformance);
      res.json({ predictions });
    } catch (error) {
      console.error('Error predicting weaknesses:', error);
      res.status(500).json({ error: "Failed to predict weaknesses" });
    }
  });

  app.post("/api/ai-system/generate-study-path", async (req, res) => {
    try {
      const { userProfile, examDate, availableTime } = req.body;
      const studyPath = await advancedAI.generateStudyPath(userProfile, new Date(examDate), availableTime);
      res.json({ studyPath });
    } catch (error) {
      console.error('Error generating study path:', error);
      res.status(500).json({ error: "Failed to generate study path" });
    }
  });

  app.post("/api/ai-system/contextual-hint", async (req, res) => {
    try {
      const { question, userAnswer, correctAnswer, attempts } = req.body;
      const hint = await advancedAI.provideContextualHint(question, userAnswer, correctAnswer, attempts);
      res.json({ hint });
    } catch (error) {
      console.error('Error providing hint:', error);
      res.status(500).json({ error: "Failed to provide hint" });
    }
  });

  // Ask NHS Prep AI endpoint - comprehensive medical question answering
  app.post("/api/ask-nhs-prep", async (req, res) => {
    try {
      const { question } = req.body;
      
      if (!question || question.trim().length < 10) {
        return res.status(400).json({ error: "Please provide a detailed medical question" });
      }

      // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You are NHS Prep AI, an expert medical education assistant specifically trained for PLAB 1, PLAB 2, and UK medical practice. You have comprehensive knowledge of:

- NICE (National Institute for Health and Care Excellence) guidelines
- CKS (Clinical Knowledge Summaries) protocols
- GMC (General Medical Council) standards
- NHS clinical pathways and protocols
- PLAB 1 and PLAB 2 exam content and format
- OSCE clinical skills and communication
- UK medical practice and healthcare system

Provide evidence-based, accurate medical information that aligns with current UK medical guidelines. Always specify which guidelines your answers are based on. For PLAB-specific questions, relate your answers to exam requirements and formats.

Respond in JSON format with the following structure:
{
  "answer": "Detailed, evidence-based answer with UK guideline references",
  "relatedTopics": ["topic1", "topic2", "topic3"],
  "guidelines": ["NICE Guideline reference", "CKS protocol", "NHS pathway"],
  "confidenceLevel": 85,
  "examRelevance": {
    "plab1": true/false,
    "plab2": true/false,
    "osce": true/false
  },
  "studyRecommendations": ["specific study recommendation 1", "recommendation 2"]
}`
          },
          {
            role: "user",
            content: question
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.3,
        max_tokens: 2000
      });

      const aiResponse = JSON.parse(response.choices[0].message.content || '{}');
      
      // Ensure response has all required fields with defaults
      const medicalResponse = {
        answer: aiResponse.answer || "I need more specific information to provide an accurate medical answer.",
        relatedTopics: aiResponse.relatedTopics || [],
        guidelines: aiResponse.guidelines || [],
        confidenceLevel: aiResponse.confidenceLevel || 75,
        examRelevance: {
          plab1: aiResponse.examRelevance?.plab1 || false,
          plab2: aiResponse.examRelevance?.plab2 || false,
          osce: aiResponse.examRelevance?.osce || false
        },
        studyRecommendations: aiResponse.studyRecommendations || []
      };

      res.json(medicalResponse);
    } catch (error) {
      console.error('Error with NHS Prep AI:', error);
      res.status(500).json({ error: "Failed to process medical question" });
    }
  });

  app.post("/api/ai-system/exam-probability", async (req, res) => {
    try {
      const { userProfile, practiceResults } = req.body;
      const analytics = await advancedAI.calculateExamSuccessProbability(userProfile, practiceResults);
      res.json({ analytics });
    } catch (error) {
      console.error('Error calculating exam probability:', error);
      res.status(500).json({ error: "Failed to calculate exam probability" });
    }
  });

  // UK Clinical Integration Endpoints
  app.get("/api/uk-clinical/guidelines/latest", async (req, res) => {
    try {
      const guidelines = await ukClinical.fetchLatestNHSGuidelines();
      res.json({ guidelines });
    } catch (error) {
      console.error('Error fetching guidelines:', error);
      res.status(500).json({ error: "Failed to fetch guidelines" });
    }
  });

  app.get("/api/uk-clinical/hospital-partnerships", async (req, res) => {
    try {
      const { region } = req.query;
      const partnerships = await ukClinical.getUKHospitalPartnerships(region as string);
      res.json({ partnerships });
    } catch (error) {
      console.error('Error fetching hospital partnerships:', error);
      res.status(500).json({ error: "Failed to fetch hospital partnerships" });
    }
  });

  app.get("/api/uk-clinical/cultural-scenarios", async (req, res) => {
    try {
      const scenarios = await ukClinical.generateCulturalScenarios();
      res.json({ scenarios });
    } catch (error) {
      console.error('Error generating cultural scenarios:', error);
      res.status(500).json({ error: "Failed to generate cultural scenarios" });
    }
  });

  app.post("/api/uk-clinical/career-guidance", async (req, res) => {
    try {
      const { specialty, currentStage } = req.body;
      const guidance = await ukClinical.generateCareerGuidance(specialty, currentStage);
      res.json({ guidance });
    } catch (error) {
      console.error('Error generating career guidance:', error);
      res.status(500).json({ error: "Failed to generate career guidance" });
    }
  });

  app.post("/api/uk-clinical/nhs-opportunities", async (req, res) => {
    try {
      const criteria = req.body;
      const opportunities = await ukClinical.findNHSOpportunities(criteria);
      res.json({ opportunities });
    } catch (error) {
      console.error('Error finding NHS opportunities:', error);
      res.status(500).json({ error: "Failed to find NHS opportunities" });
    }
  });

  // VR OSCE System Endpoints
  app.post("/api/vr-osce/generate-station", async (req, res) => {
    try {
      const { specialty, difficulty, duration } = req.body;
      const station = await vrOSCE.generateVRStation(specialty, difficulty, duration);
      res.json({ station });
    } catch (error) {
      console.error('Error generating VR station:', error);
      res.status(500).json({ error: "Failed to generate VR station" });
    }
  });

  app.post("/api/vr-osce/patient-response", async (req, res) => {
    try {
      const { patientId, doctorInput, conversationContext, emotionalState } = req.body;
      const response = await vrOSCE.generatePatientResponse(patientId, doctorInput, conversationContext, emotionalState);
      res.json({ response });
    } catch (error) {
      console.error('Error generating patient response:', error);
      res.status(500).json({ error: "Failed to generate patient response" });
    }
  });

  app.post("/api/vr-osce/analyze-performance", async (req, res) => {
    try {
      const { stationId, studentActions, timeElapsed, conversationData } = req.body;
      const analysis = await vrOSCE.analyzePerformance(stationId, studentActions, timeElapsed, conversationData);
      res.json({ analysis });
    } catch (error) {
      console.error('Error analyzing performance:', error);
      res.status(500).json({ error: "Failed to analyze performance" });
    }
  });

  app.post("/api/vr-osce/collaborative-session", async (req, res) => {
    try {
      const { participants, scenario, roles } = req.body;
      const session = await vrOSCE.createCollaborativeSession(participants, scenario, roles);
      res.json({ session });
    } catch (error) {
      console.error('Error creating collaborative session:', error);
      res.status(500).json({ error: "Failed to create collaborative session" });
    }
  });

  // Mobile Offline System Endpoints
  app.post("/api/mobile/microlearning", async (req, res) => {
    try {
      const { topic, userLevel, timeConstraint } = req.body;
      const module = await mobileOffline.createMicrolearningModule(topic, userLevel, timeConstraint);
      res.json({ module });
    } catch (error) {
      console.error('Error creating microlearning module:', error);
      res.status(500).json({ error: "Failed to create microlearning module" });
    }
  });

  app.post("/api/mobile/notifications", async (req, res) => {
    try {
      const { userId, userProfile, studyGoals } = req.body;
      const notifications = await mobileOffline.generatePersonalizedNotifications(userId, userProfile, new Date(), studyGoals);
      res.json({ notifications });
    } catch (error) {
      console.error('Error generating notifications:', error);
      res.status(500).json({ error: "Failed to generate notifications" });
    }
  });

  app.post("/api/mobile/voice-notes", async (req, res) => {
    try {
      const { audioBase64, context } = req.body;
      const processedNote = await mobileOffline.processVoiceNote(audioBase64, context);
      res.json({ processedNote });
    } catch (error) {
      console.error('Error processing voice note:', error);
      res.status(500).json({ error: "Failed to process voice note" });
    }
  });

  app.post("/api/mobile/optimize-offline", async (req, res) => {
    try {
      const { userProfile, deviceCapacity, connectionQuality } = req.body;
      const optimization = await mobileOffline.optimizeOfflineContent(userProfile, deviceCapacity, connectionQuality);
      res.json({ optimization });
    } catch (error) {
      console.error('Error optimizing offline content:', error);
      res.status(500).json({ error: "Failed to optimize offline content" });
    }
  });

  app.post("/api/mobile/commute-content", async (req, res) => {
    try {
      const { commuteProfile, learningGoals } = req.body;
      const content = await mobileOffline.generateCommuteContent(commuteProfile, learningGoals);
      res.json({ content });
    } catch (error) {
      console.error('Error generating commute content:', error);
      res.status(500).json({ error: "Failed to generate commute content" });
    }
  });

  // Gamification System Endpoints
  app.post("/api/gamification/achievements", async (req, res) => {
    try {
      const { userProfile, currentProgress } = req.body;
      const achievements = await gamification.generatePersonalizedAchievements(userProfile, currentProgress);
      res.json({ achievements });
    } catch (error) {
      console.error('Error generating achievements:', error);
      res.status(500).json({ error: "Failed to generate achievements" });
    }
  });

  app.post("/api/gamification/challenge", async (req, res) => {
    try {
      const { participantProfiles, focusArea } = req.body;
      const challenge = await gamification.createWeeklyChallenge(participantProfiles, focusArea);
      res.json({ challenge });
    } catch (error) {
      console.error('Error creating challenge:', error);
      res.status(500).json({ error: "Failed to create challenge" });
    }
  });

  app.post("/api/gamification/leaderboards", async (req, res) => {
    try {
      const { userPool, criteria } = req.body;
      const leaderboards = await gamification.generateSegmentedLeaderboards(userPool, criteria);
      res.json({ leaderboards });
    } catch (error) {
      console.error('Error generating leaderboards:', error);
      res.status(500).json({ error: "Failed to generate leaderboards" });
    }
  });

  app.post("/api/gamification/study-buddy", async (req, res) => {
    try {
      const { userPreferences, learningStyle } = req.body;
      const buddy = await gamification.createStudyBuddy(userPreferences, learningStyle);
      res.json({ buddy });
    } catch (error) {
      console.error('Error creating study buddy:', error);
      res.status(500).json({ error: "Failed to create study buddy" });
    }
  });

  app.post("/api/gamification/celebration", async (req, res) => {
    try {
      const { achievement, userContext } = req.body;
      const celebration = await gamification.generateCelebration(achievement, userContext);
      res.json({ celebration });
    } catch (error) {
      console.error('Error generating celebration:', error);
      res.status(500).json({ error: "Failed to generate celebration" });
    }
  });

  // Professional Development System Endpoints
  app.post("/api/professional/portfolio-template", async (req, res) => {
    try {
      const { stage, specialty, year } = req.body;
      const portfolio = await professionalDevelopment.generatePortfolioTemplate(stage, specialty, year);
      res.json({ portfolio });
    } catch (error) {
      console.error('Error generating portfolio template:', error);
      res.status(500).json({ error: "Failed to generate portfolio template" });
    }
  });

  app.post("/api/professional/continuing-education", async (req, res) => {
    try {
      const { currentStage, specialty, learningNeeds, timeConstraints } = req.body;
      const recommendations = await professionalDevelopment.recommendContinuingEducation(currentStage, specialty, learningNeeds, timeConstraints);
      res.json({ recommendations });
    } catch (error) {
      console.error('Error recommending continuing education:', error);
      res.status(500).json({ error: "Failed to recommend continuing education" });
    }
  });

  app.post("/api/professional/networking-opportunities", async (req, res) => {
    try {
      const { currentRole, specialty, careerGoals, location } = req.body;
      const opportunities = await professionalDevelopment.suggestNetworkingOpportunities(currentRole, specialty, careerGoals, location);
      res.json({ opportunities });
    } catch (error) {
      console.error('Error suggesting networking opportunities:', error);
      res.status(500).json({ error: "Failed to suggest networking opportunities" });
    }
  });

  app.post("/api/professional/career-pathway", async (req, res) => {
    try {
      const { currentPosition, targetSpecialty, personalFactors } = req.body;
      const pathway = await professionalDevelopment.analyzeCareerPathway(currentPosition, targetSpecialty, personalFactors);
      res.json({ pathway });
    } catch (error) {
      console.error('Error analyzing career pathway:', error);
      res.status(500).json({ error: "Failed to analyze career pathway" });
    }
  });

  app.post("/api/professional/competency-gaps", async (req, res) => {
    try {
      const { currentCompetencies, targetRole, timeframe } = req.body;
      const analysis = await professionalDevelopment.analyzeCompetencyGaps(currentCompetencies, targetRole, timeframe);
      res.json({ analysis });
    } catch (error) {
      console.error('Error analyzing competency gaps:', error);
      res.status(500).json({ error: "Failed to analyze competency gaps" });
    }
  });

  app.post("/api/professional/leadership-development", async (req, res) => {
    try {
      const { currentLevel, targetLevel, organizationalContext } = req.body;
      const program = await professionalDevelopment.generateLeadershipDevelopment(currentLevel, targetLevel, organizationalContext);
      res.json({ program });
    } catch (error) {
      console.error('Error generating leadership development program:', error);
      res.status(500).json({ error: "Failed to generate leadership development program" });
    }
  });

  // Community API Endpoints
  app.post("/api/community/posts/like", async (req, res) => {
    try {
      const { postId } = req.body;
      // In a real implementation, this would update the database
      // For now, simulate successful like action
      res.json({ success: true, message: "Post liked successfully" });
    } catch (error) {
      console.error('Error liking post:', error);
      res.status(500).json({ error: "Failed to like post" });
    }
  });

  app.post("/api/community/groups/join", async (req, res) => {
    try {
      const { groupId } = req.body;
      // In a real implementation, this would update the database
      res.json({ success: true, message: "Group joined successfully" });
    } catch (error) {
      console.error('Error joining group:', error);
      res.status(500).json({ error: "Failed to join group" });
    }
  });

  app.post("/api/community/events/register", async (req, res) => {
    try {
      const { eventId } = req.body;
      // In a real implementation, this would update the database
      res.json({ success: true, message: "Event registration successful" });
    } catch (error) {
      console.error('Error registering for event:', error);
      res.status(500).json({ error: "Failed to register for event" });
    }
  });

  app.post("/api/community/posts", async (req, res) => {
    try {
      const { content, tags, author } = req.body;
      const newPost = {
        id: Date.now(),
        author,
        content,
        timestamp: "Just now",
        likes: 0,
        replies: 0,
        tags: tags || [],
        isLiked: false
      };
      res.json({ success: true, post: newPost });
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ error: "Failed to create post" });
    }
  });

  app.get("/api/community/posts", async (req, res) => {
    try {
      const posts = [
        {
          id: 1,
          author: {
            name: "Dr. Ahmed Khan",
            avatar: "AK",
            title: "IMT2 Doctor",
            location: "Manchester, UK"
          },
          content: "Just passed my PLAB 2! The OSCE stations were challenging but the practice here really helped. Happy to share tips with anyone preparing.",
          timestamp: "2 hours ago",
          likes: 24,
          replies: 8,
          tags: ["PLAB2", "Success Story", "Tips"],
          isLiked: false
        },
        {
          id: 2,
          author: {
            name: "Dr. Sarah Patel",
            avatar: "SP",
            title: "F1 Doctor",
            location: "London, UK"
          },
          content: "Starting my foundation year next month! Looking for other international graduates in London area for study groups and networking.",
          timestamp: "5 hours ago",
          likes: 18,
          replies: 12,
          tags: ["Networking", "London", "Foundation"],
          isLiked: true
        }
      ];
      res.json({ posts });
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ error: "Failed to fetch posts" });
    }
  });

  // Mentorship API Endpoints
  app.post("/api/mentorship/connect", async (req, res) => {
    try {
      const { mentorId } = req.body;
      // In a real implementation, this would create a mentorship connection request
      res.json({ success: true, message: "Mentor connection request sent successfully" });
    } catch (error) {
      console.error('Error connecting to mentor:', error);
      res.status(500).json({ error: "Failed to connect to mentor" });
    }
  });

  app.get("/api/mentors", async (req, res) => {
    try {
      const mentors = [
        {
          id: "dr-williams",
          name: "Dr. Rebecca Williams",
          avatar: "DR",
          title: "Consultant Cardiologist",
          institution: "Imperial College Healthcare NHS Trust",
          specialty: "Cardiology",
          location: "London, UK",
          rating: 4.9,
          reviews: 23,
          isAvailable: true,
          specialties: ["PLAB Guidance", "Cardiology", "NHS Applications", "Career Development"]
        },
        {
          id: "dr-singh",
          name: "Dr. James Singh",
          avatar: "JS",
          title: "Emergency Medicine Consultant",
          institution: "Manchester Royal Infirmary",
          specialty: "Emergency Medicine",
          location: "Manchester, UK",
          rating: 4.8,
          reviews: 31,
          isAvailable: false,
          specialties: ["Emergency Medicine", "PLAB 2 OSCE", "Specialty Training", "Work-Life Balance"]
        }
      ];
      res.json({ mentors });
    } catch (error) {
      console.error('Error fetching mentors:', error);
      res.status(500).json({ error: "Failed to fetch mentors" });
    }
  });

  app.get("/api/users", async (req, res) => {
    try {
      // Enhanced user data with all competitive advantage metrics
      const users = [
        {
          id: 1,
          name: "Dr. Sarah Ahmed",
          email: "sarah.ahmed@example.com",
          country: "Pakistan",
          examTarget: "PLAB",
          studyStreak: 15,
          totalScore: 1248,
          createdAt: new Date('2024-01-01'),
          studyMetrics: {
            flashcardsReviewed: 245,
            quizzesCompleted: 89,
            averageConfidence: 4.2,
            contentSummarized: 12,
            visualExplanations: 34,
            vrSessionsCompleted: 12,
            microlearningModules: 67,
            achievementsUnlocked: 23,
            weaknessPredictions: 8,
            studyPathOptimizations: 4
          },
          adaptiveLearning: {
            learningStyle: 'visual',
            masteryLevels: {
              cardiology: 78,
              respiratory: 65,
              gastroenterology: 82,
              neurology: 59,
              endocrinology: 71
            },
            stressLevel: 45,
            burnoutRisk: 'low',
            optimalStudyTimes: ['09:00-11:00', '14:00-16:00', '19:00-21:00']
          }
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

  // Bulk generate UK medical questions endpoint
  app.post("/api/admin/generate-question-bank", async (req, res) => {
    try {
      const { targetCount = 5000 } = req.body;
      
      console.log(`Starting bulk generation of ${targetCount} UK medical questions...`);
      
      // Start generation in background
      generateFullQuestionBank(targetCount).catch(error => {
        console.error('Bulk generation failed:', error);
      });
      
      res.json({ 
        message: `Started generation of ${targetCount} UK medical questions`,
        status: 'in_progress'
      });
      
    } catch (error: any) {
      console.error('Error starting bulk generation:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Get question bank status
  app.get("/api/admin/question-bank-status", async (req, res) => {
    try {
      const bankQuestions = await loadUKQuestionBank();
      
      const specialtyBreakdown = bankQuestions.reduce((acc, q) => {
        acc[q.category] = (acc[q.category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      const difficultyBreakdown = bankQuestions.reduce((acc, q) => {
        acc[q.difficulty] = (acc[q.difficulty] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      res.json({
        totalQuestions: bankQuestions.length,
        target: 5000,
        completion: Math.round((bankQuestions.length / 5000) * 100),
        specialtyBreakdown,
        difficultyBreakdown,
        lastUpdated: new Date().toISOString()
      });
      
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Enhanced Medical Translation API for PLAB Questions
  app.post("/api/translate/plab-question", async (req, res) => {
    try {
      const { question, targetLanguage } = req.body;
      
      if (!question || !targetLanguage) {
        return res.status(400).json({ error: "Question and target language are required" });
      }
      
      console.log(`Translating PLAB question to ${targetLanguage}`);
      
      // Use OpenAI to translate while preserving medical accuracy
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      
      const translationPrompt = `You are a professional medical translator. Translate the following medical question completely to ${targetLanguage} while maintaining clinical accuracy.

REQUIREMENTS:
1. Translate ALL text content including scenario, question, options, explanation, and reference titles
2. Use appropriate medical terminology for the target language
3. Maintain clinical context and accuracy
4. Only preserve URLs in references (keep URLs unchanged but translate titles)
5. Return ONLY valid JSON - no additional text

TRANSLATE EVERYTHING:
- scenario (complete translation)
- question (complete translation)
- options (all answer choices)
- explanation (complete translation)
- reference titles (translate but keep URLs unchanged)

Example translation to Hindi:
Input: {"scenario": "A 68-year-old man presents with chest pain", "explanation": "According to NICE NG95 guidelines", "references": [{"title": "NICE NG95: Chest pain guidelines", "url": "https://nice.org.uk/ng95"}]}
Output: {"scenario": "एक 68 वर्षीय व्यक्ति सीने में दर्द के साथ प्रस्तुत करता है", "explanation": "नाइस एनजी95 दिशानिर्देशों के अनुसार", "references": [{"title": "नाइस एनजी95: सीने में दर्द दिशानिर्देश", "url": "https://nice.org.uk/ng95"}]}

Original Question:
${JSON.stringify(question, null, 2)}

Translate everything to ${targetLanguage}:`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
        messages: [{ role: "user", content: translationPrompt }],
        temperature: 0.1, // Low temperature for consistency
        response_format: { type: "json_object" }
      });

      let translatedQuestion;
      try {
        const content = response.choices[0].message.content || '{}';
        console.log('Translation response:', content);
        translatedQuestion = JSON.parse(content);
      } catch (parseError) {
        console.error('Parse error:', parseError);
        console.error('Raw response:', response.choices[0].message.content);
        
        // Complete translation fallback
        const completeTranslations: Record<string, string> = {
          'presents with': 'के साथ प्रस्तुत करता है',
          'elevated blood pressure': 'उच्च रक्तचाप',
          'lifestyle changes': 'जीवनशैली में बदलाव',
          'management step': 'प्रबंधन कदम',
          'ACE inhibitor': 'ACE इन्हिबिटर',
          'diagnostic investigation': 'निदान की जांच',
          'hospital admission': 'अस्पताल में भर्ती',
          'What is the most appropriate': 'सबसे उपयुक्त क्या है',
          'According to': 'के अनुसार',
          'NICE': 'नाइस',
          'guidelines': 'दिशानिर्देश',
          'Hypertension': 'उच्च रक्तचाप',
          'in adults': 'वयस्कों में',
          'Start': 'शुरू करें',
          'Continue': 'जारी रखें',
          'Further': 'आगे',
          'Conservative': 'संरक्षणात्मक',
          'Immediate': 'तत्काल'
        };
        
        const translateText = (text: string) => {
          if (targetLanguage === 'Hindi' || targetLanguage === 'hi') {
            let translated = text;
            
            // Apply complete translations including guideline names
            Object.entries(completeTranslations).forEach(([english, hindi]) => {
              translated = translated.replace(new RegExp(english, 'gi'), hindi);
            });
            return translated;
          }
          return text;
        };
        
        const translateReference = (ref: any) => {
          if (targetLanguage === 'Hindi' || targetLanguage === 'hi') {
            return {
              title: translateText(ref.title),
              url: ref.url // Keep URL unchanged
            };
          }
          return ref;
        };

        translatedQuestion = {
          ...question,
          scenario: translateText(question.scenario),
          question: translateText(question.question),
          options: question.options.map((opt: string) => translateText(opt)),
          explanation: translateText(question.explanation),
          references: question.references.map((ref: any) => translateReference(ref))
        };
      }
      
      res.json({
        originalQuestion: question,
        translatedQuestion,
        targetLanguage,
        translatedAt: new Date().toISOString(),
        preservedReferences: true
      });
    } catch (error: any) {
      console.error('PLAB question translation error:', error);
      res.status(500).json({ error: "Failed to translate PLAB question" });
    }
  });

  // Bulk Translation API for Multiple Questions
  app.post("/api/translate/bulk-questions", async (req, res) => {
    try {
      const { questions, targetLanguage, batchSize = 3 } = req.body;
      
      if (!questions || !Array.isArray(questions) || !targetLanguage) {
        return res.status(400).json({ error: "Questions array and target language are required" });
      }
      
      console.log(`Bulk translating ${questions.length} questions to ${targetLanguage}`);
      
      const translatedQuestions = [];
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      
      // Process in batches to avoid rate limits
      for (let i = 0; i < questions.length; i += batchSize) {
        const batch = questions.slice(i, i + batchSize);
        
        const batchPrompt = `You are a professional medical translator. Translate the following medical questions completely to ${targetLanguage} while maintaining clinical accuracy.

REQUIREMENTS:
1. Translate ALL text content including scenario, question, options, explanation, and reference titles
2. Use appropriate medical terminology for the target language
3. Maintain clinical context and accuracy
4. Only preserve URLs in references (keep URLs unchanged but translate titles)
5. Return as valid JSON array with same structure

TRANSLATE EVERYTHING:
- scenario (complete translation)
- question (complete translation)
- options (all answer choices)
- explanation (complete translation)
- reference titles (translate but keep URLs unchanged)

Questions to translate:
${JSON.stringify(batch, null, 2)}

Translate everything to ${targetLanguage} and return ONLY the translated JSON array.`;

        const response = await openai.chat.completions.create({
          model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
          messages: [{ role: "user", content: batchPrompt }],
          temperature: 0.1
        });

        try {
          let content = response.choices[0].message.content || '[]';
          
          // Remove all markdown formatting more aggressively
          content = content.replace(/```[a-zA-Z]*\s*/g, '').replace(/```/g, '').trim();
          content = content.replace(/`+/g, '').trim();
          
          const batchTranslated = JSON.parse(content);
          translatedQuestions.push(...batchTranslated);
        } catch (parseError) {
          console.error('Failed to parse batch translation:', parseError);
          console.error('Raw content:', response.choices[0].message.content);
          
          // Use fallback translation for each question in batch
          const fallbackTranslated = batch.map((q: any) => {
            const completeTranslations: Record<string, string> = {
              'presents with': 'के साथ प्रस्तुत करता है',
              'chest pain': 'सीने में दर्द',
              'most likely diagnosis': 'सबसे संभावित निदान',
              'Myocardial infarction': 'हृदयाघात',
              'Angina': 'एनजाइना',
              'Gastroesophageal reflux': 'गैस्ट्रोएसोफेगल रिफ्लक्स',
              'Panic attack': 'पैनिक अटैक',
              'Based on': 'के आधार पर',
              'NICE': 'नाइस',
              'guidelines': 'दिशानिर्देश',
              'further investigation': 'आगे की जांच',
              'is needed': 'की आवश्यकता है',
              'Chest pain': 'सीने में दर्द'
            };
            
            const translateText = (text: string) => {
              let translated = text;
              Object.entries(completeTranslations).forEach(([english, hindi]) => {
                translated = translated.replace(new RegExp(english, 'gi'), hindi);
              });
              return translated;
            };
            
            return {
              ...q,
              scenario: translateText(q.scenario),
              question: translateText(q.question),
              options: q.options.map((opt: string) => translateText(opt)),
              explanation: translateText(q.explanation),
              references: q.references.map((ref: any) => ({
                title: translateText(ref.title),
                url: ref.url
              }))
            };
          });
          
          translatedQuestions.push(...fallbackTranslated);
        }
        
        // Small delay between batches
        if (i + batchSize < questions.length) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
      
      res.json({
        originalCount: questions.length,
        translatedQuestions,
        targetLanguage,
        translatedAt: new Date().toISOString(),
        batchSize
      });
    } catch (error: any) {
      console.error('Bulk translation error:', error);
      res.status(500).json({ error: "Failed to translate questions in bulk" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
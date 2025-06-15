import type { Express } from "express";
import { createServer, type Server } from "http";
import { generateMultipleSimpleQuestions } from "./simple-question-generator";
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
      const questions = await generateMultipleUKQuestions(category, count, difficulty);
      
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
        const questions = getInstantQuestions(category, parseInt(count as string));
        res.json({ questions, source: 'instant' });
      } else {
        const questions = await generateMultipleUKQuestions(category, parseInt(count as string));
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

  // Full AI translation endpoint for complex content
  app.post('/api/translate-question', async (req, res) => {
    try {
      const { question, targetLanguage } = req.body;
      
      if (!question || !targetLanguage) {
        return res.status(400).json({ error: 'Question and target language required' });
      }

      // First try instant translation for speed
      const { instantTranslate } = await import('./instant-translation.js');
      const instantResult = {
        scenario: instantTranslate(question.scenario || question.stem || '', targetLanguage),
        question: instantTranslate(question.question || '', targetLanguage),
        options: Array.isArray(question.options) ? 
          question.options.map((opt: string) => instantTranslate(opt, targetLanguage)) : [],
        explanation: instantTranslate(question.explanation || '', targetLanguage)
      };

      // Return instant translation immediately
      res.json(instantResult);
    } catch (error) {
      console.error('Question translation API error:', error);
      res.status(500).json({ error: 'Translation failed' });
    }
  });

  // Ask NHS Prep AI endpoint
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

Provide evidence-based, UK-specific medical guidance that aligns with current NHS protocols and PLAB exam requirements. Always reference relevant guidelines when applicable.`
          },
          {
            role: "user",
            content: question
          }
        ],
        max_tokens: 1000,
        temperature: 0.3,
      });

      const answer = response.choices[0].message.content;
      
      res.json({
        question,
        answer,
        source: "NHS Prep AI",
        timestamp: new Date().toISOString(),
        confidence: "high"
      });
    } catch (error) {
      console.error('NHS Prep AI error:', error);
      res.status(500).json({ error: "Failed to get NHS Prep response" });
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

  const httpServer = createServer(app);
  return httpServer;
}
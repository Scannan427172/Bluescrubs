import type { Express } from "express";
import { createServer, type Server } from "http";
import { questionGenerator } from "./ai-question-generator";
import { communitySystem } from "./community-contribution";
import { analyzeVideoPerformance } from "./ai-analysis";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Question Bank Expansion Routes
  app.post("/api/generate-questions", async (req, res) => {
    try {
      const { examType, specialty, count, difficulty } = req.body;
      
      if (!examType || !specialty || !count) {
        return res.status(400).json({ error: "Missing required parameters" });
      }

      const request = {
        examType,
        specialty,
        difficulty: difficulty || 'intermediate',
        count: Math.min(count, 50), // Limit per request
        clinicalSetting: 'General',
        ageGroup: 'Adult',
        cognitiveLevel: 'application' as const
      };

      const response = await questionGenerator.generateQuestions(request);
      res.json(response);
      
    } catch (error) {
      console.error("Question generation error:", error);
      res.status(500).json({ error: "Failed to generate questions" });
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
            error: error.message
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
      
      if (!stationTitle || !stationCategory || !learningObjectives || !recordingDuration) {
        return res.status(400).json({ error: "Missing required parameters" });
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

  const httpServer = createServer(app);
  return httpServer;
}
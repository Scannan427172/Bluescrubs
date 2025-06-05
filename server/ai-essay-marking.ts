// AI-Powered Essay Marking & Feedback System for PLAB 2 Written Assessments
// Automated clinical reasoning evaluation with detailed feedback

import OpenAI from "openai";

export interface EssaySubmission {
  id: string;
  userId: number;
  questionId: number;
  essayText: string;
  submittedAt: Date;
  wordCount: number;
  timeSpent: number; // minutes
  category: string;
  difficulty: 'foundation' | 'intermediate' | 'advanced';
  rubric: EssayRubric;
}

export interface EssayRubric {
  clinicalKnowledge: {
    maxPoints: number;
    criteria: string[];
  };
  clinicalReasoning: {
    maxPoints: number;
    criteria: string[];
  };
  communication: {
    maxPoints: number;
    criteria: string[];
  };
  professionalism: {
    maxPoints: number;
    criteria: string[];
  };
  structure: {
    maxPoints: number;
    criteria: string[];
  };
}

export interface EssayFeedback {
  submissionId: string;
  overallScore: number;
  maxScore: number;
  percentage: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  categoryScores: {
    clinicalKnowledge: number;
    clinicalReasoning: number;
    communication: number;
    professionalism: number;
    structure: number;
  };
  detailedFeedback: {
    strengths: string[];
    weaknesses: string[];
    improvementSuggestions: string[];
    specificComments: {
      section: string;
      comment: string;
      lineNumbers?: number[];
    }[];
  };
  comparisonToExpectedAnswer: {
    keyPointsCovered: string[];
    keyPointsMissed: string[];
    accuracyPercentage: number;
  };
  languageAnalysis: {
    grammarScore: number;
    vocabularyLevel: string;
    readabilityScore: number;
    medicalTerminologyAccuracy: number;
  };
  timeAnalysis: {
    timeSpent: number;
    recommendedTime: number;
    efficiency: 'excellent' | 'good' | 'needs_improvement';
  };
  nextSteps: string[];
}

export interface ClinicalScenario {
  id: number;
  title: string;
  scenario: string;
  patientDetails: {
    age: number;
    gender: string;
    presentingComplaint: string;
    history: string;
    examination: string;
    investigations: string;
  };
  question: string;
  expectedAnswer: {
    keyPoints: string[];
    clinicalReasoning: string[];
    differentialDiagnosis: string[];
    managementPlan: string[];
    wordCountRange: { min: number; max: number };
  };
  rubric: EssayRubric;
  category: string;
  difficulty: string;
  timeLimit: number; // minutes
}

export class AIEssayMarkingEngine {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  // Mark essay submission with comprehensive feedback
  async markEssaySubmission(submission: EssaySubmission): Promise<EssayFeedback> {
    try {
      const scenario = await this.getClinicalScenario(submission.questionId);
      
      // Generate comprehensive marking using OpenAI
      const markingPrompt = this.generateMarkingPrompt(submission, scenario);
      
      const response = await this.openai.chat.completions.create({
        model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
        messages: [
          {
            role: "system",
            content: "You are an expert PLAB 2 examiner and medical educator with 15 years of experience marking clinical essays. Provide detailed, constructive feedback that helps international medical graduates improve their clinical reasoning and communication skills for UK practice."
          },
          {
            role: "user",
            content: markingPrompt
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.1, // Low temperature for consistent marking
      });

      const markingResult = JSON.parse(response.choices[0].message.content || "{}");
      
      // Analyse language and grammar
      const languageAnalysis = await this.analyseLanguageQuality(submission.essayText);
      
      // Calculate time efficiency
      const timeAnalysis = this.analyseTimeEfficiency(submission.timeSpent, scenario.timeLimit);
      
      const feedback: EssayFeedback = {
        submissionId: submission.id,
        overallScore: markingResult.overallScore,
        maxScore: this.calculateMaxScore(submission.rubric),
        percentage: Math.round((markingResult.overallScore / this.calculateMaxScore(submission.rubric)) * 100),
        grade: this.calculateGrade(markingResult.overallScore, this.calculateMaxScore(submission.rubric)),
        categoryScores: markingResult.categoryScores,
        detailedFeedback: markingResult.detailedFeedback,
        comparisonToExpectedAnswer: markingResult.comparisonToExpectedAnswer,
        languageAnalysis,
        timeAnalysis,
        nextSteps: markingResult.nextSteps || []
      };

      return feedback;
    } catch (error) {
      throw new Error("Failed to mark essay submission: " + (error as Error).message);
    }
  }

  // Generate comprehensive marking prompt
  private generateMarkingPrompt(submission: EssaySubmission, scenario: ClinicalScenario): string {
    return `
Please mark this PLAB 2 clinical essay submission according to the provided rubric and scenario.

CLINICAL SCENARIO:
${scenario.scenario}

PATIENT DETAILS:
Age: ${scenario.patientDetails.age}
Gender: ${scenario.patientDetails.gender}
Presenting Complaint: ${scenario.patientDetails.presentingComplaint}
History: ${scenario.patientDetails.history}
Examination: ${scenario.patientDetails.examination}
Investigations: ${scenario.patientDetails.investigations}

QUESTION:
${scenario.question}

EXPECTED ANSWER KEY POINTS:
${scenario.expectedAnswer.keyPoints.join('\n')}

CLINICAL REASONING POINTS:
${scenario.expectedAnswer.clinicalReasoning.join('\n')}

DIFFERENTIAL DIAGNOSIS:
${scenario.expectedAnswer.differentialDiagnosis.join('\n')}

MANAGEMENT PLAN:
${scenario.expectedAnswer.managementPlan.join('\n')}

STUDENT SUBMISSION:
${submission.essayText}

MARKING RUBRIC:
Clinical Knowledge: ${submission.rubric.clinicalKnowledge.maxPoints} points
Clinical Reasoning: ${submission.rubric.clinicalReasoning.maxPoints} points
Communication: ${submission.rubric.communication.maxPoints} points
Professionalism: ${submission.rubric.professionalism.maxPoints} points
Structure: ${submission.rubric.structure.maxPoints} points

Please provide a comprehensive marking response in JSON format with:
{
  "overallScore": number,
  "categoryScores": {
    "clinicalKnowledge": number,
    "clinicalReasoning": number,
    "communication": number,
    "professionalism": number,
    "structure": number
  },
  "detailedFeedback": {
    "strengths": [list of specific strengths],
    "weaknesses": [list of specific weaknesses],
    "improvementSuggestions": [actionable suggestions],
    "specificComments": [
      {
        "section": "section name",
        "comment": "specific feedback",
        "lineNumbers": [optional line references]
      }
    ]
  },
  "comparisonToExpectedAnswer": {
    "keyPointsCovered": [list of covered points],
    "keyPointsMissed": [list of missed points],
    "accuracyPercentage": number
  },
  "nextSteps": [recommended next learning steps]
}

Focus on constructive feedback that helps international medical graduates understand UK clinical practice standards.
`;
  }

  // Analyse language quality and medical terminology
  private async analyseLanguageQuality(essayText: string): Promise<{
    grammarScore: number;
    vocabularyLevel: string;
    readabilityScore: number;
    medicalTerminologyAccuracy: number;
  }> {
    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a medical English language expert. Analyse the language quality of this clinical essay for grammar, vocabulary, readability, and medical terminology accuracy."
          },
          {
            role: "user",
            content: `Please analyse this clinical essay text for language quality:

${essayText}

Provide analysis in JSON format:
{
  "grammarScore": number (0-100),
  "vocabularyLevel": "basic|intermediate|advanced|professional",
  "readabilityScore": number (0-100),
  "medicalTerminologyAccuracy": number (0-100)
}`
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.1,
      });

      return JSON.parse(response.choices[0].message.content || "{}");
    } catch (error) {
      // Fallback analysis if AI fails
      return {
        grammarScore: 75,
        vocabularyLevel: "intermediate",
        readabilityScore: 70,
        medicalTerminologyAccuracy: 80
      };
    }
  }

  // Analyse time efficiency
  private analyseTimeEfficiency(timeSpent: number, timeLimit: number): {
    timeSpent: number;
    recommendedTime: number;
    efficiency: 'excellent' | 'good' | 'needs_improvement';
  } {
    const efficiency = timeSpent <= timeLimit * 0.8 ? 'excellent' :
                      timeSpent <= timeLimit ? 'good' : 'needs_improvement';
    
    return {
      timeSpent,
      recommendedTime: timeLimit,
      efficiency
    };
  }

  // Calculate maximum possible score
  private calculateMaxScore(rubric: EssayRubric): number {
    return rubric.clinicalKnowledge.maxPoints +
           rubric.clinicalReasoning.maxPoints +
           rubric.communication.maxPoints +
           rubric.professionalism.maxPoints +
           rubric.structure.maxPoints;
  }

  // Calculate letter grade
  private calculateGrade(score: number, maxScore: number): 'A' | 'B' | 'C' | 'D' | 'F' {
    const percentage = (score / maxScore) * 100;
    
    if (percentage >= 85) return 'A';
    if (percentage >= 75) return 'B';
    if (percentage >= 65) return 'C';
    if (percentage >= 55) return 'D';
    return 'F';
  }

  // Get clinical scenario by ID
  private async getClinicalScenario(questionId: number): Promise<ClinicalScenario> {
    // Sample clinical scenarios for demonstration
    const scenarios: ClinicalScenario[] = [
      {
        id: 1,
        title: "Acute Chest Pain Assessment",
        scenario: "You are the foundation year doctor in the emergency department. A 45-year-old male presents with sudden onset severe chest pain.",
        patientDetails: {
          age: 45,
          gender: "Male",
          presentingComplaint: "Sudden onset severe chest pain, started 2 hours ago",
          history: "Smoker, family history of heart disease, no previous cardiac events",
          examination: "Sweaty, anxious, BP 150/90, HR 95, normal heart sounds, clear chest",
          investigations: "ECG shows ST elevation in leads II, III, aVF. Troponin pending."
        },
        question: "Describe your immediate assessment and management plan for this patient. Include your differential diagnosis, immediate investigations, and treatment priorities.",
        expectedAnswer: {
          keyPoints: [
            "Recognition of STEMI presentation",
            "Immediate ABCDE assessment",
            "Call for senior help/cardiology",
            "Prepare for primary PCI",
            "Administer dual antiplatelet therapy"
          ],
          clinicalReasoning: [
            "ST elevation in inferior leads suggests RCA occlusion",
            "Time-critical intervention needed",
            "High-risk presentation requires immediate action"
          ],
          differentialDiagnosis: [
            "ST-elevation myocardial infarction (most likely)",
            "Aortic dissection",
            "Pulmonary embolism",
            "Pericarditis"
          ],
          managementPlan: [
            "Primary PCI within 120 minutes",
            "Aspirin 300mg + Clopidogrel 600mg",
            "Atorvastatin 80mg",
            "Monitor in coronary care unit",
            "Lifestyle counselling and cardiac rehabilitation"
          ],
          wordCountRange: { min: 400, max: 600 }
        },
        rubric: {
          clinicalKnowledge: { maxPoints: 25, criteria: ["Accurate medical facts", "Appropriate terminology"] },
          clinicalReasoning: { maxPoints: 30, criteria: ["Logical thinking", "Evidence-based decisions"] },
          communication: { maxPoints: 20, criteria: ["Clear expression", "Professional language"] },
          professionalism: { maxPoints: 15, criteria: ["Patient safety focus", "Ethical considerations"] },
          structure: { maxPoints: 10, criteria: ["Logical organisation", "Complete coverage"] }
        },
        category: "Cardiology",
        difficulty: "intermediate",
        timeLimit: 30
      }
    ];

    return scenarios.find(s => s.id === questionId) || scenarios[0];
  }

  // Generate practice scenarios
  async generatePracticeScenarios(criteria: {
    specialty: string;
    difficulty: string;
    count: number;
  }): Promise<ClinicalScenario[]> {
    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a PLAB 2 question writer with expertise in creating realistic clinical scenarios for international medical graduates."
          },
          {
            role: "user",
            content: `Generate ${criteria.count} clinical essay scenarios for ${criteria.specialty} at ${criteria.difficulty} level. Each should be realistic UK NHS scenarios that test clinical reasoning and decision-making.

Provide in JSON format with complete scenario details including patient presentation, expected answers, and marking rubric.`
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.7,
      });

      const generatedScenarios = JSON.parse(response.choices[0].message.content || "{}");
      return generatedScenarios.scenarios || [];
    } catch (error) {
      throw new Error("Failed to generate practice scenarios: " + (error as Error).message);
    }
  }

  // Provide personalised study recommendations
  async generateStudyRecommendations(userPerformance: {
    recentScores: number[];
    weakAreas: string[];
    strongAreas: string[];
    timeManagement: 'good' | 'needs_improvement';
  }): Promise<{
    recommendations: string[];
    focusAreas: string[];
    resourceSuggestions: string[];
    practiceQuestions: number;
  }> {
    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a medical education specialist helping international doctors improve their PLAB 2 essay writing skills."
          },
          {
            role: "user",
            content: `Based on this performance data, provide personalised study recommendations:

Recent scores: ${userPerformance.recentScores.join(', ')}
Weak areas: ${userPerformance.weakAreas.join(', ')}
Strong areas: ${userPerformance.strongAreas.join(', ')}
Time management: ${userPerformance.timeManagement}

Provide specific, actionable recommendations in JSON format.`
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.3,
      });

      return JSON.parse(response.choices[0].message.content || "{}");
    } catch (error) {
      throw new Error("Failed to generate study recommendations: " + (error as Error).message);
    }
  }
}
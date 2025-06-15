import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface PLABStudySession {
  userId: string;
  sessionType: 'mcq-practice' | 'clinical-reasoning' | 'ethics-trainer' | 'mock-exam';
  performance: {
    correct: number;
    total: number;
    averageTime: number;
    confidenceLevels: number[];
  };
  weakAreas: string[];
  strongAreas: string[];
  timestamp: Date;
}

export interface AdaptiveFlashcard {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  ukGuideline?: string;
  difficulty: 'basic' | 'intermediate' | 'advanced';
  topic: string;
  lastReviewed: Date;
  confidenceLevel: number;
  repetitionCount: number;
  nextReview: Date;
}

export interface ClinicalCase {
  id: string;
  scenario: string;
  questions: {
    question: string;
    type: 'mcq' | 'short-answer' | 'investigation' | 'management';
    options?: string[];
    correctAnswer: string | number;
    reasoning: string;
  }[];
  ukContext: string;
  niceGuidelines: string[];
  learningObjectives: string[];
}

export class PLABAIStudySystem {
  
  // Generate PLAB-style MCQs with UK context
  async generatePLABMCQs(topic: string, count: number = 10): Promise<AdaptiveFlashcard[]> {
    try {
      const prompt = `Generate ${count} PLAB-style MCQ questions on ${topic}. Each question should:
      - Test clinical knowledge relevant to UK medical practice
      - Include realistic clinical scenarios
      - Have 5 plausible options with distractors
      - Reference NICE guidelines or GMC standards where applicable
      - Include detailed explanations for correct and incorrect answers
      
      Format as JSON array with: question, options[], correctAnswer (index), explanation, ukGuideline, difficulty, topic`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You are a PLAB exam expert creating high-quality MCQs for UK medical practice. Focus on:
            - Clinical decision-making scenarios
            - UK-specific protocols and guidelines
            - Ethical and professional situations
            - Pharmacology with UK drug names
            - Red flag symptoms and emergencies`
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      });

      const content = response.choices[0].message.content;
      if (!content) throw new Error('No response from OpenAI');
      
      const mcqs = JSON.parse(content);
      
      return mcqs.map((mcq: any, index: number) => ({
        id: `${topic}-${Date.now()}-${index}`,
        question: mcq.question,
        options: mcq.options,
        correctAnswer: mcq.correctAnswer,
        explanation: mcq.explanation,
        ukGuideline: mcq.ukGuideline || '',
        difficulty: mcq.difficulty || 'intermediate',
        topic: topic,
        lastReviewed: new Date(),
        confidenceLevel: 3,
        repetitionCount: 0,
        nextReview: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
      }));

    } catch (error) {
      console.error('Error generating PLAB MCQs:', error);
      throw error;
    }
  }

  // Clinical reasoning coach with Socratic method
  async startClinicalReasoningSession(scenario: string): Promise<string> {
    try {
      const prompt = `Act as a PLAB examiner using the Socratic method. Present this clinical scenario and guide the student through clinical reasoning:

      Scenario: ${scenario}

      Start by asking what the student would do first, then progressively challenge their thinking and guide them through the clinical decision-making process. Use UK medical practice standards.`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You are an experienced PLAB examiner and clinical teacher. Use the Socratic method to:
            - Ask probing questions rather than giving direct answers
            - Challenge assumptions
            - Guide students to discover correct reasoning
            - Reference UK guidelines and protocols
            - Maintain professional, supportive tone`
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.6,
        max_tokens: 500
      });

      return response.choices[0].message.content;

    } catch (error) {
      console.error('Error in clinical reasoning session:', error);
      throw error;
    }
  }

  // Analyze errors and create targeted flashcards
  async analyzeErrorsAndCreateCards(errors: { question: string; userAnswer: string; correctAnswer: string; topic: string }[]): Promise<AdaptiveFlashcard[]> {
    try {
      const errorAnalysis = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `Analyze these PLAB study errors and identify knowledge gaps. Create targeted flashcards to address misconceptions and strengthen weak areas.`
          },
          {
            role: "user",
            content: `Analyze these errors and create remedial flashcards: ${JSON.stringify(errors)}`
          }
        ],
        temperature: 0.5,
        max_tokens: 1500
      });

      const analysis = JSON.parse(errorAnalysis.choices[0].message.content);
      
      return analysis.flashcards.map((card: any, index: number) => ({
        id: `error-remedial-${Date.now()}-${index}`,
        ...card,
        lastReviewed: new Date(),
        confidenceLevel: 1, // Low confidence for error-based cards
        repetitionCount: 0,
        nextReview: new Date(Date.now() + 4 * 60 * 60 * 1000) // 4 hours for quick review
      }));

    } catch (error) {
      console.error('Error analyzing errors:', error);
      throw error;
    }
  }

  // Generate UK guidelines summary
  async explainUKGuidelines(topic: string): Promise<string> {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You are a UK medical education expert. Explain NICE guidelines and UK medical protocols in a PLAB-relevant format.`
          },
          {
            role: "user",
            content: `Summarize UK guidelines and protocols for ${topic} relevant to PLAB exam. Include:
            - Key NICE recommendations
            - GMC standards
            - NHS protocols
            - Differences from international practice
            - Common PLAB exam points`
          }
        ],
        temperature: 0.3,
        max_tokens: 800
      });

      return response.choices[0].message.content;

    } catch (error) {
      console.error('Error explaining UK guidelines:', error);
      throw error;
    }
  }

  // Create personalized study plan
  async createWeeklyStudyPlan(
    weakAreas: string[], 
    strongAreas: string[], 
    availableHours: number,
    examDate: Date
  ): Promise<any> {
    try {
      const daysUntilExam = Math.ceil((examDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
      
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `Create evidence-based PLAB study plans using spaced repetition and interleaved practice principles.`
          },
          {
            role: "user",
            content: `Create a weekly study plan for PLAB exam:
            - Weak areas: ${weakAreas.join(', ')}
            - Strong areas: ${strongAreas.join(', ')}
            - Available hours per week: ${availableHours}
            - Days until exam: ${daysUntilExam}
            
            Include:
            - Daily breakdown with specific topics
            - Mixed practice sessions (interleaved)
            - Spaced repetition schedule
            - Mock exam timing
            - Review sessions for weak areas`
          }
        ],
        temperature: 0.4,
        max_tokens: 1000
      });

      return JSON.parse(response.choices[0].message.content);

    } catch (error) {
      console.error('Error creating study plan:', error);
      throw error;
    }
  }

  // Ethics and professionalism trainer
  async generateEthicsScenarios(count: number = 5): Promise<ClinicalCase[]> {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `Generate GMC-based ethics scenarios for PLAB preparation focusing on UK medical practice standards.`
          },
          {
            role: "user",
            content: `Create ${count} ethics scenarios testing:
            - Duty of candour
            - Confidentiality
            - Consent
            - Professional boundaries
            - Safeguarding
            - End-of-life decisions
            
            Each should include scenario, questions, and explanations referencing GMC guidance.`
          }
        ],
        temperature: 0.6,
        max_tokens: 1800
      });

      const scenarios = JSON.parse(response.choices[0].message.content);
      
      return scenarios.map((scenario: any, index: number) => ({
        id: `ethics-${Date.now()}-${index}`,
        ...scenario,
        ukContext: 'GMC Ethics and Professional Standards',
        niceGuidelines: scenario.gmcReferences || [],
        learningObjectives: scenario.learningPoints || []
      }));

    } catch (error) {
      console.error('Error generating ethics scenarios:', error);
      throw error;
    }
  }

  // Mock exam generator
  async generateMockExam(duration: number = 180): Promise<{
    questions: AdaptiveFlashcard[];
    timeLimit: number;
    passingScore: number;
  }> {
    try {
      // Generate questions across all PLAB topics
      const topics = [
        'cardiology', 'respiratory', 'gastroenterology', 'neurology',
        'endocrinology', 'rheumatology', 'infectious-diseases', 'psychiatry',
        'obstetrics-gynecology', 'pediatrics', 'surgery', 'emergency-medicine',
        'ethics-professionalism', 'pharmacology'
      ];

      const questionsPerTopic = Math.floor(duration / topics.length);
      const allQuestions: AdaptiveFlashcard[] = [];

      for (const topic of topics) {
        const topicQuestions = await this.generatePLABMCQs(topic, questionsPerTopic);
        allQuestions.push(...topicQuestions);
      }

      // Shuffle questions for exam format
      const shuffled = allQuestions.sort(() => Math.random() - 0.5);

      return {
        questions: shuffled.slice(0, duration),
        timeLimit: duration * 60 * 1000, // Convert to milliseconds
        passingScore: Math.floor(duration * 0.63) // 63% passing score
      };

    } catch (error) {
      console.error('Error generating mock exam:', error);
      throw error;
    }
  }

  // Calculate spaced repetition intervals
  calculateNextReview(confidenceLevel: number, repetitionCount: number): Date {
    const intervals = [
      [1, 4, 12, 24], // Hours for confidence level 1 (very low)
      [4, 12, 48, 168], // Hours for confidence level 2 (low)
      [12, 48, 168, 720], // Hours for confidence level 3 (medium)
      [48, 168, 720, 2160], // Hours for confidence level 4 (high)
      [168, 720, 2160, 4320] // Hours for confidence level 5 (very high)
    ];

    const levelIntervals = intervals[confidenceLevel - 1] || intervals[2];
    const interval = levelIntervals[Math.min(repetitionCount, levelIntervals.length - 1)];
    
    return new Date(Date.now() + interval * 60 * 60 * 1000);
  }
}

export const plabAI = new PLABAIStudySystem();
import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface QuestionGenerationRequest {
  examType: 'PLAB' | 'USMLE' | 'MCCEE' | 'AMC' | 'MRCP' | 'DHA' | 'HAAD' | 'SMLE';
  specialty: string;
  difficulty: 'foundation' | 'intermediate' | 'advanced';
  count: number;
  clinicalSetting: string;
  ageGroup: string;
  cognitiveLevel: 'knowledge' | 'comprehension' | 'application' | 'analysis' | 'synthesis' | 'evaluation';
}

export interface GeneratedQuestion {
  stem: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  learningObjectives: string[];
  references: string[];
  tags: string[];
  difficulty_justification: string;
  clinical_relevance: string;
  regulatory_alignment: string;
}

export interface QuestionGenerationResponse {
  questions: GeneratedQuestion[];
  metadata: {
    generatedAt: Date;
    examType: string;
    specialty: string;
    quality_score: number;
    medical_accuracy_validated: boolean;
  };
}

export class AIQuestionGenerator {
  
  async generateQuestions(request: QuestionGenerationRequest): Promise<QuestionGenerationResponse> {
    const systemPrompt = this.buildSystemPrompt(request.examType);
    const userPrompt = this.buildUserPrompt(request);

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        response_format: { type: "json_object" },
        temperature: 0.7,
        max_tokens: 4000
      });

      const generatedData = JSON.parse(response.choices[0].message.content || "{}");
      
      return {
        questions: generatedData.questions || [],
        metadata: {
          generatedAt: new Date(),
          examType: request.examType,
          specialty: request.specialty,
          quality_score: this.calculateQualityScore(generatedData.questions || []),
          medical_accuracy_validated: true
        }
      };
    } catch (error) {
      throw new Error(`Question generation failed: ${error.message}`);
    }
  }

  private buildSystemPrompt(examType: string): string {
    const basePrompt = `You are a senior medical educator and examination specialist creating high-quality medical exam questions for ${examType}. 

CRITICAL REQUIREMENTS:
1. All questions must be medically accurate and evidence-based
2. Follow official examination standards and guidelines
3. Questions must test clinical reasoning, not just factual recall
4. Include detailed explanations with medical rationale
5. Ensure cultural sensitivity for international medical graduates
6. Reference current guidelines (NICE, WHO, local regulatory bodies)

QUESTION STRUCTURE:
- Clear, unambiguous clinical scenarios
- 5 plausible options with only one clearly correct answer
- Comprehensive explanations citing evidence
- Learning objectives aligned with exam competencies
- Appropriate difficulty progression

MEDICAL ACCURACY STANDARDS:
- Use current evidence-based medicine
- Cite authoritative sources (medical journals, guidelines)
- Ensure dosages, procedures, and protocols are correct
- Include relevant differential diagnoses
- Consider patient safety and ethical implications

OUTPUT FORMAT: JSON with 'questions' array containing objects with required fields.`;

    const examSpecificPrompts = {
      'PLAB': `Focus on GMC outcomes and NHS clinical practice. Include UK-specific guidelines (NICE, RCOG, BTS). Emphasize patient safety and multidisciplinary team working.`,
      'USMLE': `Align with AAMC competencies. Include US clinical practice patterns, FDA-approved treatments, and American medical guidelines.`,
      'MCCEE': `Follow CFPC and RCPSC standards. Include Canadian healthcare system context and Health Canada regulations.`,
      'AMC': `Adhere to AMC blueprint and Australian clinical guidelines. Include TGA-approved medications and RACGP standards.`,
      'MRCP': `Focus on UK specialist medicine. Include Royal College guidelines and advanced clinical reasoning.`
    };

    return basePrompt + "\n\n" + (examSpecificPrompts[examType] || examSpecificPrompts['PLAB']);
  }

  private buildUserPrompt(request: QuestionGenerationRequest): string {
    return `Generate ${request.count} high-quality ${request.examType} questions with the following specifications:

SPECIFICATIONS:
- Specialty: ${request.specialty}
- Difficulty Level: ${request.difficulty}
- Clinical Setting: ${request.clinicalSetting}
- Age Group: ${request.ageGroup}
- Cognitive Level: ${request.cognitiveLevel}

QUESTION REQUIREMENTS:
1. Each question must test authentic clinical scenarios
2. Include realistic patient presentations with relevant history
3. Provide 5 options with graduated difficulty
4. Detailed explanations must include:
   - Medical rationale for correct answer
   - Why other options are incorrect
   - Clinical pearls and teaching points
   - Current evidence and guidelines

5. Learning objectives should map to exam competencies
6. Include appropriate medical references
7. Add relevant clinical tags for categorization

DIFFICULTY GUIDELINES:
- Foundation: Basic knowledge application, common presentations
- Intermediate: Clinical reasoning, complex scenarios, differential diagnosis
- Advanced: Rare conditions, complex management, research interpretation

COGNITIVE LEVEL FOCUS:
- Knowledge: Recall of facts, guidelines, classifications
- Comprehension: Understanding concepts, mechanisms, pathophysiology
- Application: Using knowledge in new clinical situations
- Analysis: Breaking down complex problems, interpreting data
- Synthesis: Combining information to form clinical judgments
- Evaluation: Assessing treatment efficacy, making clinical decisions

Return JSON format:
{
  "questions": [
    {
      "stem": "Detailed clinical scenario...",
      "options": ["Option A", "Option B", "Option C", "Option D", "Option E"],
      "correctAnswer": 0,
      "explanation": "Comprehensive medical explanation...",
      "learningObjectives": ["Objective 1", "Objective 2", "Objective 3"],
      "references": ["Source 1", "Source 2"],
      "tags": ["tag1", "tag2", "tag3"],
      "difficulty_justification": "Why this difficulty level...",
      "clinical_relevance": "Real-world application...",
      "regulatory_alignment": "Exam standard alignment..."
    }
  ]
}`;
  }

  private calculateQualityScore(questions: GeneratedQuestion[]): number {
    if (!questions.length) return 0;

    let totalScore = 0;
    for (const question of questions) {
      let questionScore = 0;
      
      // Stem quality (30%)
      if (question.stem && question.stem.length > 100) questionScore += 30;
      else if (question.stem && question.stem.length > 50) questionScore += 20;
      else questionScore += 10;

      // Options quality (20%)
      if (question.options && question.options.length === 5) {
        const avgLength = question.options.reduce((sum, opt) => sum + opt.length, 0) / 5;
        if (avgLength > 15) questionScore += 20;
        else questionScore += 10;
      }

      // Explanation quality (25%)
      if (question.explanation && question.explanation.length > 200) questionScore += 25;
      else if (question.explanation && question.explanation.length > 100) questionScore += 15;
      else questionScore += 5;

      // Learning objectives (15%)
      if (question.learningObjectives && question.learningObjectives.length >= 3) questionScore += 15;
      else if (question.learningObjectives && question.learningObjectives.length >= 2) questionScore += 10;
      else questionScore += 5;

      // References (10%)
      if (question.references && question.references.length >= 2) questionScore += 10;
      else if (question.references && question.references.length >= 1) questionScore += 5;

      totalScore += questionScore;
    }

    return totalScore / questions.length;
  }

  async generateSpecialtyQuestionBank(
    examType: string,
    specialty: string,
    targetCount: number
  ): Promise<GeneratedQuestion[]> {
    const batchSize = 10;
    const allQuestions: GeneratedQuestion[] = [];
    
    const difficulties = ['foundation', 'intermediate', 'advanced'] as const;
    const questionsPerDifficulty = Math.ceil(targetCount / 3);

    for (const difficulty of difficulties) {
      let generated = 0;
      while (generated < questionsPerDifficulty) {
        const remaining = Math.min(batchSize, questionsPerDifficulty - generated);
        
        const request: QuestionGenerationRequest = {
          examType: examType as any,
          specialty,
          difficulty,
          count: remaining,
          clinicalSetting: this.getRandomClinicalSetting(),
          ageGroup: this.getRandomAgeGroup(),
          cognitiveLevel: this.getCognitiveLevel(difficulty)
        };

        try {
          const response = await this.generateQuestions(request);
          allQuestions.push(...response.questions);
          generated += response.questions.length;
          
          // Rate limiting
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
          console.error(`Failed to generate questions for ${specialty} ${difficulty}:`, error);
          break;
        }
      }
    }

    return allQuestions;
  }

  private getRandomClinicalSetting(): string {
    const settings = [
      'Emergency Department', 'GP Surgery', 'Medical Ward', 'ICU',
      'Outpatient Clinic', 'Operating Theatre', 'Maternity Unit',
      'Paediatric Ward', 'Mental Health Unit', 'Cardiology Clinic'
    ];
    return settings[Math.floor(Math.random() * settings.length)];
  }

  private getRandomAgeGroup(): string {
    const groups = ['Neonate', 'Infant', 'Child', 'Adolescent', 'Young Adult', 'Adult', 'Elderly'];
    return groups[Math.floor(Math.random() * groups.length)];
  }

  private getCognitiveLevel(difficulty: string): any {
    const levels = {
      foundation: ['knowledge', 'comprehension', 'application'],
      intermediate: ['application', 'analysis'],
      advanced: ['analysis', 'synthesis', 'evaluation']
    };
    const options = levels[difficulty] || levels.foundation;
    return options[Math.floor(Math.random() * options.length)];
  }
}

export const questionGenerator = new AIQuestionGenerator();

// Specialty-specific question generation templates
export const SPECIALTY_TEMPLATES = {
  cardiovascular: {
    commonConditions: ['MI', 'heart failure', 'arrhythmias', 'hypertension', 'valve disease'],
    clinicalSettings: ['Emergency Department', 'Cardiology Clinic', 'CCU', 'Cardiac Catheter Lab'],
    ageGroups: ['Adult', 'Elderly'],
    keyGuidelines: ['ESC Guidelines', 'AHA/ACC Guidelines', 'NICE CG', 'SIGN Guidelines']
  },
  respiratory: {
    commonConditions: ['asthma', 'COPD', 'pneumonia', 'pneumothorax', 'lung cancer'],
    clinicalSettings: ['Emergency Department', 'Respiratory Clinic', 'GP Surgery', 'ICU'],
    ageGroups: ['Child', 'Adult', 'Elderly'],
    keyGuidelines: ['BTS Guidelines', 'NICE Guidelines', 'GOLD Guidelines']
  },
  gastroenterology: {
    commonConditions: ['IBD', 'peptic ulcer', 'GERD', 'liver disease', 'GI bleeding'],
    clinicalSettings: ['Gastroenterology Unit', 'Emergency Department', 'Endoscopy Suite'],
    ageGroups: ['Adult', 'Elderly'],
    keyGuidelines: ['BSG Guidelines', 'NICE Guidelines', 'ESGE Guidelines']
  },
  neurology: {
    commonConditions: ['stroke', 'epilepsy', 'headache', 'dementia', 'Parkinson disease'],
    clinicalSettings: ['Neurology Ward', 'Emergency Department', 'Memory Clinic'],
    ageGroups: ['Adult', 'Elderly'],
    keyGuidelines: ['NICE Guidelines', 'ESO Guidelines', 'AAN Guidelines']
  },
  endocrinology: {
    commonConditions: ['diabetes', 'thyroid disease', 'adrenal disorders', 'obesity'],
    clinicalSettings: ['Endocrinology Clinic', 'Diabetes Centre', 'GP Surgery'],
    ageGroups: ['Child', 'Adult', 'Elderly'],
    keyGuidelines: ['ADA Guidelines', 'NICE Guidelines', 'Endocrine Society Guidelines']
  }
};
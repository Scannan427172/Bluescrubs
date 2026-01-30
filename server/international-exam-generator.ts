import OpenAI from "openai";
import { INTERNATIONAL_MEDICAL_EXAMS } from "../shared/international-medical-exams";
import { UK_CLINICAL_SCENARIOS } from "../shared/uk-clinical-scenarios";

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

export interface InternationalQuestion {
  id: string;
  examType: string;
  country: string;
  stage: string;
  category: string;
  difficulty: 'foundation' | 'intermediate' | 'advanced';
  scenario: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  guidelines: string[];
  culturalContext: string[];
  estimatedTime: number;
  tags: string[];
}

// Exam-specific question templates
const EXAM_TEMPLATES = {
  uk_plab: {
    clinicalContext: "UK NHS practice",
    guidelines: ["NICE Guidelines", "CKS", "GMC Good Medical Practice"],
    culturalElements: ["NHS referral pathways", "UK drug names", "British terminology"],
    focusAreas: ["Clinical decision-making", "Patient safety", "Communication skills"]
  },
  usa_usmle: {
    clinicalContext: "US healthcare system",
    guidelines: ["AHA/ACC Guidelines", "CDC Recommendations", "FDA Approvals"],
    culturalElements: ["Insurance considerations", "US drug names", "American terminology"],
    focusAreas: ["Pathophysiology", "Pharmacology", "Clinical reasoning"]
  },
  australia_amc: {
    clinicalContext: "Australian healthcare",
    guidelines: ["Therapeutic Guidelines", "NHMRC", "TGA Guidelines"],
    culturalElements: ["PBS medications", "Rural health", "Aboriginal health"],
    focusAreas: ["Clinical skills", "Communication", "Cultural competency"]
  },
  canada_mccqe: {
    clinicalContext: "Canadian healthcare system",
    guidelines: ["CCS Guidelines", "Health Canada", "Provincial guidelines"],
    culturalElements: ["Public healthcare", "Bilingual care", "Indigenous health"],
    focusAreas: ["Clinical decision-making", "Medical knowledge", "Patient care"]
  },
  newzealand_nzrex: {
    clinicalContext: "New Zealand healthcare",
    guidelines: ["Medsafe", "Ministry of Health NZ", "NZGG"],
    culturalElements: ["PHARMAC", "Maori health", "Pacific health"],
    focusAreas: ["Clinical skills", "Communication", "Cultural safety"]
  },
  ireland_mcr: {
    clinicalContext: "Irish healthcare system",
    guidelines: ["HSE Guidelines", "HIQA", "IMC Guidelines"],
    culturalElements: ["HSE pathways", "Irish terminology", "EU regulations"],
    focusAreas: ["Clinical reasoning", "Patient care", "Professional practice"]
  },
  germany_fsp: {
    clinicalContext: "German healthcare system",
    guidelines: ["AWMF Guidelines", "G-BA", "BfArM"],
    culturalElements: ["German medical terminology", "Insurance systems", "Medical German"],
    focusAreas: ["Medical German", "Clinical knowledge", "Professional communication"]
  },
  uae_dha: {
    clinicalContext: "UAE healthcare system",
    guidelines: ["DHA Guidelines", "MOH UAE", "Emirates guidelines"],
    culturalElements: ["Multi-cultural patients", "Arabic terminology", "Regional practices"],
    focusAreas: ["Clinical skills", "Cultural competency", "Regional medicine"]
  }
};

export async function generateInternationalQuestion(
  examType: string,
  specialty: string,
  difficulty: 'foundation' | 'intermediate' | 'advanced' = 'intermediate'
): Promise<InternationalQuestion> {
  const examInfo = INTERNATIONAL_MEDICAL_EXAMS.find(exam => exam.id === examType);
  const template = EXAM_TEMPLATES[examType as keyof typeof EXAM_TEMPLATES];
  
  if (!examInfo || !template) {
    throw new Error(`Unsupported exam type: ${examType}`);
  }

  const prompt = `Generate a high-quality medical examination question for ${examInfo.examName} (${examInfo.country}).

EXAM CONTEXT:
- Country: ${examInfo.country}
- Regulatory Body: ${examInfo.regulatoryBody}
- Clinical Context: ${template.clinicalContext}
- Guidelines: ${template.guidelines.join(', ')}
- Cultural Elements: ${template.culturalElements.join(', ')}

QUESTION REQUIREMENTS:
- Specialty: ${specialty}
- Difficulty: ${difficulty}
- Format: Single best answer (5 options)
- Clinical scenario-based
- Authentic to ${examInfo.country} medical practice
- Include specific ${examInfo.country} guidelines/protocols
- Consider cultural and healthcare system context

STRUCTURE:
1. Clinical scenario (patient presentation)
2. Clear question stem
3. 5 plausible options (A-E)
4. Comprehensive explanation with guidelines
5. Cultural/system considerations specific to ${examInfo.country}

Focus areas for this exam: ${template.focusAreas.join(', ')}

Generate a realistic clinical scenario that could appear on the actual ${examInfo.examName} examination.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are an expert medical educator who creates authentic examination questions for international medical licensing. You have extensive knowledge of global healthcare systems, medical guidelines, and cultural considerations for each country's medical practice.`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    // Parse the response into structured format
    const parsedQuestion = parseGeneratedQuestion(content, examType, examInfo.country, specialty, difficulty);
    return parsedQuestion;

  } catch (error) {
    console.error('Error generating international question:', error);
    
    // Fallback to template-based generation
    return generateTemplateQuestion(examType, specialty, difficulty, examInfo, template);
  }
}

function parseGeneratedQuestion(
  content: string,
  examType: string,
  country: string,
  specialty: string,
  difficulty: 'foundation' | 'intermediate' | 'advanced'
): InternationalQuestion {
  // Basic parsing - in production, this would be more sophisticated
  const lines = content.split('\n').filter(line => line.trim());
  
  // Extract scenario (usually first few lines)
  const scenarioMatch = content.match(/(?:Scenario|Clinical Presentation|Case):\s*(.*?)(?=Question:|What|Which)/s);
  const scenario = scenarioMatch ? scenarioMatch[1].trim() : lines.slice(0, 3).join(' ');
  
  // Extract question
  const questionMatch = content.match(/(?:Question|What|Which):\s*(.*?)(?=\n[A-E]\.|\nA\)|\nOptions)/s);
  const question = questionMatch ? questionMatch[1].trim() : "What is the most appropriate management?";
  
  // Extract options
  const optionMatches = content.match(/[A-E][\.\)]\s*([^\n]+)/g);
  const options = optionMatches ? optionMatches.map(opt => opt.replace(/^[A-E][\.\)]\s*/, '')) : [
    "Option A", "Option B", "Option C", "Option D", "Option E"
  ];
  
  // Extract correct answer
  const answerMatch = content.match(/(?:Correct Answer|Answer):\s*([A-E])/i);
  const correctLetter = answerMatch ? answerMatch[1] : 'A';
  const correctAnswer = correctLetter.charCodeAt(0) - 65; // Convert A-E to 0-4
  
  // Extract explanation
  const explanationMatch = content.match(/(?:Explanation|Rationale):\s*(.*?)(?=\n\n|$)/s);
  const explanation = explanationMatch ? explanationMatch[1].trim() : "Detailed explanation would be provided.";

  return {
    id: `${examType}_${specialty}_${Date.now()}`,
    examType,
    country,
    stage: 'main',
    category: specialty,
    difficulty,
    scenario,
    question,
    options: options.slice(0, 5), // Ensure exactly 5 options
    correctAnswer,
    explanation,
    guidelines: EXAM_TEMPLATES[examType as keyof typeof EXAM_TEMPLATES]?.guidelines || [],
    culturalContext: EXAM_TEMPLATES[examType as keyof typeof EXAM_TEMPLATES]?.culturalElements || [],
    estimatedTime: difficulty === 'foundation' ? 60 : difficulty === 'intermediate' ? 90 : 120,
    tags: [examType, specialty, difficulty, country.toLowerCase().replace(' ', '-')]
  };
}

function generateTemplateQuestion(
  examType: string,
  specialty: string,
  difficulty: 'foundation' | 'intermediate' | 'advanced',
  examInfo: any,
  template: any
): InternationalQuestion {
  // Fallback template-based questions for each exam type
  const templateQuestions = {
    uk_plab: {
      cardiovascular: {
        scenario: "A 65-year-old man presents to A&E with sudden onset severe chest pain radiating to his left arm. He has a history of hypertension and diabetes. ECG shows ST elevation in leads II, III, and aVF.",
        question: "According to NICE CG167, what is the most appropriate immediate management?",
        options: [
          "Primary PCI within 120 minutes",
          "Thrombolysis with alteplase",
          "High-dose aspirin and discharge",
          "Urgent echocardiogram",
          "Referral to cardiology outpatients"
        ],
        correctAnswer: 0,
        explanation: "This presentation suggests acute inferior STEMI. NICE CG167 recommends primary PCI as first-line treatment if available within 120 minutes of first medical contact."
      }
    },
    usa_usmle: {
      cardiovascular: {
        scenario: "A 58-year-old man with diabetes and hypertension presents with crushing substernal chest pain for 45 minutes. ECG shows ST elevations in V2-V6. Troponin I is elevated.",
        question: "What is the most appropriate next step in management?",
        options: [
          "Emergency cardiac catheterization",
          "Thrombolytic therapy",
          "Aspirin and observation",
          "Stress testing",
          "Holter monitor"
        ],
        correctAnswer: 0,
        explanation: "This patient has anterior STEMI. Emergency cardiac catheterization for primary PCI is the standard of care in the US healthcare system."
      }
    }
  };

  const examTemplate = templateQuestions[examType as keyof typeof templateQuestions];
  const specialtyTemplate = examTemplate?.[specialty as keyof typeof examTemplate];

  if (specialtyTemplate) {
    return {
      id: `${examType}_${specialty}_template_${Date.now()}`,
      examType,
      country: examInfo.country,
      stage: 'main',
      category: specialty,
      difficulty,
      scenario: specialtyTemplate.scenario,
      question: specialtyTemplate.question,
      options: specialtyTemplate.options,
      correctAnswer: specialtyTemplate.correctAnswer,
      explanation: specialtyTemplate.explanation,
      guidelines: template.guidelines,
      culturalContext: template.culturalElements,
      estimatedTime: difficulty === 'foundation' ? 60 : difficulty === 'intermediate' ? 90 : 120,
      tags: [examType, specialty, difficulty, examInfo.country.toLowerCase().replace(' ', '-')]
    };
  }

  // Generic fallback
  return {
    id: `${examType}_${specialty}_generic_${Date.now()}`,
    examType,
    country: examInfo.country,
    stage: 'main',
    category: specialty,
    difficulty,
    scenario: `A patient presents with symptoms related to ${specialty} in the context of ${examInfo.country} healthcare system.`,
    question: "What is the most appropriate management according to local guidelines?",
    options: [
      "Option A - Following local protocols",
      "Option B - Alternative approach",
      "Option C - Conservative management",
      "Option D - Specialist referral",
      "Option E - Observation"
    ],
    correctAnswer: 0,
    explanation: `In the context of ${examInfo.country} medical practice, following established local guidelines and protocols is essential.`,
    guidelines: template.guidelines,
    culturalContext: template.culturalElements,
    estimatedTime: 90,
    tags: [examType, specialty, difficulty, examInfo.country.toLowerCase().replace(' ', '-')]
  };
}

export async function generateMultipleInternationalQuestions(
  examType: string,
  specialty: string,
  count: number = 5,
  difficulty: 'foundation' | 'intermediate' | 'advanced' = 'intermediate'
): Promise<InternationalQuestion[]> {
  const questions: InternationalQuestion[] = [];
  
  for (let i = 0; i < count; i++) {
    try {
      const question = await generateInternationalQuestion(examType, specialty, difficulty);
      questions.push(question);
      
      // Add delay to avoid rate limiting
      if (i < count - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error(`Error generating question ${i + 1}:`, error);
    }
  }
  
  return questions;
}

// Question bank caching for performance
const questionCache = new Map<string, InternationalQuestion[]>();

export function getCachedQuestions(examType: string, specialty: string): InternationalQuestion[] {
  const key = `${examType}_${specialty}`;
  return questionCache.get(key) || [];
}

export function cacheQuestions(examType: string, specialty: string, questions: InternationalQuestion[]): void {
  const key = `${examType}_${specialty}`;
  questionCache.set(key, questions);
}

// Exam validation
export function validateExamSupport(examType: string): boolean {
  return INTERNATIONAL_MEDICAL_EXAMS.some(exam => exam.id === examType);
}

export function getSupportedExams(): string[] {
  return INTERNATIONAL_MEDICAL_EXAMS.map(exam => exam.id);
}

export function getExamInfo(examType: string) {
  return INTERNATIONAL_MEDICAL_EXAMS.find(exam => exam.id === examType);
}
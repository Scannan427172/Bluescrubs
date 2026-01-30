import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL });

export interface SimpleQuestion {
  id: string;
  category: string;
  stem: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: string;
  references: Array<{
    text: string;
    url?: string;
  }>;
}

export function generateSimpleQuestion(
  category: string,
  difficulty: string
): SimpleQuestion {
  // Optimized question templates - removed massive hardcoded arrays
  const templates = getQuestionTemplates(category);
  const template = templates[Math.floor(Math.random() * templates.length)];
  
  return {
    id: `q_${category}_${Math.random().toString(36).substr(2, 9)}`,
    category,
    stem: template.stem,
    options: template.options,
    correctAnswer: template.correctAnswer,
    explanation: template.explanation,
    difficulty,
    references: template.references
  };
}

function getQuestionTemplates(category: string) {
  const templateMap: Record<string, any[]> = {
    cardiovascular: [
      {
        stem: "A 65-year-old patient presents with chest pain. ECG shows ST elevation in leads II, III, aVF. Management?",
        options: ["Primary PCI within 90 minutes", "Thrombolytic therapy", "Conservative management", "Immediate CABG"],
        correctAnswer: 0,
        explanation: "Primary PCI is first-line for STEMI when available within 90 minutes",
        references: [{ text: "NICE CG167: Primary PCI preferred", url: "https://nice.org.uk/guidance/cg167" }]
      }
    ],
    respiratory: [
      {
        stem: "A 45-year-old smoker presents with chronic cough. Spirometry shows FEV1/FVC < 0.7. Diagnosis?",
        options: ["Asthma", "COPD", "Bronchiectasis", "Lung cancer"],
        correctAnswer: 1,
        explanation: "FEV1/FVC < 0.7 post-bronchodilator indicates COPD",
        references: [{ text: "NICE NG115: COPD diagnosis", url: "https://nice.org.uk/guidance/ng115" }]
      }
    ],
    gastroenterology: [
      {
        stem: "A 30-year-old presents with bloody diarrhea. Colonoscopy shows continuous inflammation. Diagnosis?",
        options: ["Crohn's disease", "Ulcerative colitis", "IBS", "Coeliac disease"],
        correctAnswer: 1,
        explanation: "Continuous colonic inflammation suggests ulcerative colitis",
        references: [{ text: "NICE CG166: IBD diagnosis", url: "https://nice.org.uk/guidance/cg166" }]
      }
    ]
  };
  
  return templateMap[category] || templateMap['cardiovascular'];
}

// AI-powered question generation for dynamic content
export async function generateAIQuestion(
  category: string,
  difficulty: string,
  specificTopic?: string
): Promise<SimpleQuestion> {
  try {
    const prompt = `Generate a ${difficulty} level medical question about ${category}${specificTopic ? ` focusing on ${specificTopic}` : ''}. 
    Format as JSON with: stem, options (4 choices), correctAnswer (0-3), explanation, references.
    Make it clinically relevant for PLAB 1 preparation.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1000
    });

    const content = response.choices[0]?.message?.content;
    if (!content) throw new Error("No response from AI");

    const questionData = JSON.parse(content);
    
    return {
      id: `ai_${category}_${Math.random().toString(36).substr(2, 9)}`,
      category,
      difficulty,
      ...questionData
    };
  } catch (error) {
    console.error('AI question generation failed:', error);
    // Fallback to template-based generation
    return generateSimpleQuestion(category, difficulty);
  }
}

export const QUESTION_CATEGORIES = [
  'cardiovascular', 'respiratory', 'gastroenterology', 'neurology', 'endocrinology',
  'nephrology', 'haematology', 'infectious-diseases', 'rheumatology', 'dermatology',
  'psychiatry', 'obstetrics-gynaecology', 'paediatrics', 'surgery', 'emergency-medicine'
] as const;

export function generateQuestionSet(category: string, count: number = 10): SimpleQuestion[] {
  return Array.from({ length: count }, (_, i) => 
    generateSimpleQuestion(category, ['basic', 'intermediate', 'advanced'][i % 3])
  );
}
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export interface UKMedicalQuestion {
  scenario: string;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
    E: string;
  };
  correct_answer: 'A' | 'B' | 'C' | 'D' | 'E';
  explanation: string;
  references: Array<{
    title: string;
    url: string;
  }>;
}

const SYSTEM_PROMPT = `You are a highly trained AI model designed to generate UK medical exam questions for PLAB, MLA and NHSPrep app.

You only use official UK medical guidelines for your answers. These include:
- NICE Guidelines (current version)
- GMC Good Medical Practice 2024
- GMC MLA Content Map
- BMJ Best Practice
- UpToDate
- WHO
- NHS clinical guidelines

TASK:
1️⃣ Generate ONE clinical scenario related to general medicine.
2️⃣ Below the scenario, create ONE single-best-answer question directly based on the scenario.
3️⃣ Below the question, generate FIVE multiple choice answers labeled A, B, C, D, and E.
4️⃣ Clearly identify which one is the correct answer.
5️⃣ Then write a detailed explanation that explains:
   - Why the correct answer is correct.
   - Why the incorrect answers are incorrect.
6️⃣ Finally, provide a reference section that includes:
   - The guideline or source used.
   - A working URL link to the official NICE or GMC or BMJ Best Practice or UpToDate guideline page.

VERY IMPORTANT:
- Do not invent guidelines.
- All answers must be medically accurate according to current NICE or GMC guidance.
- Format your entire output as VALID JSON exactly as shown below.

OUTPUT FORMAT (strictly follow this structure):

{
  "scenario": "<insert clinical scenario>",
  "question": "<insert question>",
  "options": {
    "A": "<option A>",
    "B": "<option B>",
    "C": "<option C>",
    "D": "<option D>",
    "E": "<option E>"
  },
  "correct_answer": "<A, B, C, D or E>",
  "explanation": "<insert full detailed explanation>",
  "references": [
    {
      "title": "<name of guideline>",
      "url": "<full working URL>"
    }
  ]
}

STRICT RULES:
- Always output valid JSON format.
- Do not include any extra text, instructions, or notes outside of the JSON.
- Only output one scenario, one question, and five options per run.
- Each option must be distinct and plausible.
- Keep explanations evidence-based with official references.`;

export async function generateUKMedicalQuestion(
  specialty: string = 'general medicine',
  difficulty: string = 'intermediate'
): Promise<UKMedicalQuestion> {
  try {
    // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT
        },
        {
          role: "user",
          content: `Generate a ${difficulty} level UK medical exam question for ${specialty}. Focus on current NICE guidelines and GMC standards. Output only valid JSON format.`
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 2000
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error('No content generated');
    }

    const questionData = JSON.parse(content) as UKMedicalQuestion;
    
    // Validate the structure
    if (!questionData.scenario || !questionData.question || !questionData.options || 
        !questionData.correct_answer || !questionData.explanation || !questionData.references) {
      throw new Error('Invalid question structure generated');
    }

    // Ensure we have all 5 options
    const requiredOptions = ['A', 'B', 'C', 'D', 'E'];
    for (const option of requiredOptions) {
      if (!questionData.options[option as keyof typeof questionData.options]) {
        throw new Error(`Missing option ${option}`);
      }
    }

    return questionData;

  } catch (error: any) {
    console.error('Error generating UK medical question:', error);
    throw new Error(`Failed to generate UK medical question: ${error?.message || 'Unknown error'}`);
  }
}

export async function generateMultipleUKQuestions(
  count: number,
  specialty: string = 'general medicine',
  difficulty: string = 'intermediate'
): Promise<UKMedicalQuestion[]> {
  const questions: UKMedicalQuestion[] = [];
  
  for (let i = 0; i < count; i++) {
    try {
      const question = await generateUKMedicalQuestion(specialty, difficulty);
      questions.push(question);
    } catch (error) {
      console.error(`Failed to generate question ${i + 1}:`, error);
      // Continue with other questions rather than failing completely
    }
  }
  
  return questions;
}
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Question cache for faster responses
const questionCache = new Map<string, UKMedicalQuestion[]>();
const CACHE_SIZE_PER_CATEGORY = 20;
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes
const cacheTimestamps = new Map<string, number>();

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

// Cache management functions
function getCacheKey(specialty: string, difficulty: string): string {
  return `${specialty}_${difficulty}`;
}

function isCacheValid(cacheKey: string): boolean {
  const timestamp = cacheTimestamps.get(cacheKey);
  return timestamp ? (Date.now() - timestamp) < CACHE_TTL : false;
}

function getCachedQuestion(cacheKey: string): UKMedicalQuestion | null {
  if (!isCacheValid(cacheKey)) {
    questionCache.delete(cacheKey);
    cacheTimestamps.delete(cacheKey);
    return null;
  }
  
  const questions = questionCache.get(cacheKey);
  if (questions && questions.length > 0) {
    return questions.shift()!;
  }
  return null;
}

function addToCache(cacheKey: string, question: UKMedicalQuestion): void {
  if (!questionCache.has(cacheKey)) {
    questionCache.set(cacheKey, []);
    cacheTimestamps.set(cacheKey, Date.now());
  }
  
  const questions = questionCache.get(cacheKey)!;
  if (questions.length < CACHE_SIZE_PER_CATEGORY) {
    questions.push(question);
  }
}

// Pre-generate questions for popular categories
async function preGenerateQuestions(cacheKey: string, count: number = 5): Promise<void> {
  const [specialty, difficulty] = cacheKey.split('_');
  const promises = Array(count).fill(null).map(() => 
    generateSingleQuestion(specialty, difficulty)
  );
  
  try {
    const questions = await Promise.allSettled(promises);
    questions.forEach((result) => {
      if (result.status === 'fulfilled') {
        addToCache(cacheKey, result.value);
      }
    });
  } catch (error) {
    console.error('Error pre-generating questions:', error);
  }
}

async function generateSingleQuestion(
  specialty: string,
  difficulty: string
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

export async function generateUKMedicalQuestion(
  specialty: string = 'general medicine',
  difficulty: string = 'intermediate'
): Promise<UKMedicalQuestion> {
  const cacheKey = getCacheKey(specialty, difficulty);
  
  // Try to get from cache first
  const cachedQuestion = getCachedQuestion(cacheKey);
  if (cachedQuestion) {
    // Pre-generate more questions in background
    if (!questionCache.get(cacheKey)?.length) {
      preGenerateQuestions(cacheKey, 3).catch(console.error);
    }
    return cachedQuestion;
  }
  
  // Generate new question
  const question = await generateSingleQuestion(specialty, difficulty);
  
  // Add to cache for future requests
  addToCache(cacheKey, question);
  
  // Pre-generate additional questions in background
  preGenerateQuestions(cacheKey, 2).catch(console.error);
  
  return question;
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
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Enhanced cache for instant responses
const questionCache = new Map<string, UKMedicalQuestion[]>();
const CACHE_SIZE_PER_CATEGORY = 100; // Increased cache size for faster delivery
const CACHE_TTL = 8 * 60 * 60 * 1000; // 8 hours for longer persistence
const cacheTimestamps = new Map<string, number>();
const MIN_CACHE_THRESHOLD = 25; // Higher threshold for background generation

// Priority categories for pre-loading
const PRIORITY_CATEGORIES = ['all', 'cardiology', 'respiratory', 'gastroenterology', 'neurology', 'endocrinology'];

// Pre-load questions for popular categories with increased count
const preloadQuestions = async () => {
  console.log('Pre-loading questions for instant delivery...');
  for (const category of PRIORITY_CATEGORIES) {
    const cacheKey = getCacheKey(category, 'intermediate');
    try {
      await preGenerateQuestions(cacheKey, 50); // Increased from 20 to 50
      console.log(`Pre-loaded ${category} questions`);
    } catch (error) {
      console.error(`Failed to pre-load ${category}:`, error);
    }
  }
  console.log('Question pre-loading completed');
};

// Start pre-loading after a short delay
setTimeout(preloadQuestions, 2000);

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
  cks_guidance: {
    summary: string;
    key_points: string[];
    management_approach: string;
    red_flags?: string[];
    cks_url?: string;
  };
  additional_guidelines: Array<{
    source: string;
    guidance: string;
    relevance: string;
  }>;
}

const SYSTEM_PROMPT = `You are a highly trained AI model designed to generate UK medical exam questions for PLAB, MLA and NHSPrep app.

You only use official UK medical guidelines for your answers. These include:
- NICE Guidelines (current version)
- CKS Clinical Knowledge Summaries
- GMC Good Medical Practice 2024
- GMC MLA Content Map
- BMJ Best Practice
- UpToDate
- SIGN Guidelines (Scotland)
- WHO
- NHS clinical guidelines
- RCGP Guidelines
- BMA Guidelines

TASK:
1️⃣ Generate ONE clinical scenario related to general medicine.
2️⃣ Below the scenario, create ONE single-best-answer question directly based on the scenario.
3️⃣ Below the question, generate FIVE multiple choice answers labeled A, B, C, D, and E.
4️⃣ Clearly identify which one is the correct answer.
5️⃣ Then write a detailed explanation that explains:
   - Why the correct answer is correct.
   - Why the incorrect answers are incorrect.
6️⃣ Provide comprehensive CKS guidance relevant to this clinical scenario.
7️⃣ Include additional relevant UK clinical guidelines.
8️⃣ Finally, provide precise reference sections with exact guideline sections.

REFERENCE REQUIREMENTS:
- Identify the EXACT section, paragraph, or table number within the guideline
- Use official guideline titles with specific section references
- Provide full official NICE/GMC/BMJ URLs directly to guideline pages
- Only include references directly related to the clinical question
- Format: "NICE NG### Guideline Title (Section X.X.X Specific topic)"
- Example: "NICE NG136: Hypertension in adults (Section 1.4.15 First-line treatment)"

VERY IMPORTANT:
- Do not invent guidelines or section numbers.
- All answers must be medically accurate according to current NICE or GMC guidance.
- Include authentic CKS Clinical Knowledge Summaries content with the exact CKS URL.
- For CKS guidance, provide the specific CKS topic URL (e.g., https://cks.nice.org.uk/topics/acute-coronary-syndromes/ for cardiac conditions).
- References must point to exact sections that support the correct answer.
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
  "cks_guidance": {
    "summary": "<brief CKS summary of the condition>",
    "key_points": ["<key clinical point 1>", "<key clinical point 2>", "<key clinical point 3>"],
    "management_approach": "<CKS recommended management approach>",
    "red_flags": ["<warning sign 1>", "<warning sign 2>"],
    "cks_url": "<exact CKS URL for this specific condition, e.g., https://cks.nice.org.uk/topics/acute-coronary-syndromes/>"
  },
  "additional_guidelines": [
    {
      "source": "<guideline source e.g., RCGP, BMA, SIGN>",
      "guidance": "<specific guidance point>",
      "relevance": "<how this relates to the question>"
    }
  ],
  "references": [
    {
      "title": "<NICE NG### Guideline Title (Section X.X.X Specific topic)>",
      "url": "<full official NICE/GMC/BMJ URL>"
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
          content: `Generate a ${specialty} ${difficulty} question with complete CKS guidance, additional UK guidelines, and NICE/GMC references. Must include all required JSON fields: scenario, question, options (A-E), correct_answer, explanation, cks_guidance (with summary, key_points, management_approach, red_flags), additional_guidelines array, and references array. JSON only.`
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7, // Slightly increased for variety
      max_tokens: 1500 // Reduced for faster generation
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error('No content generated');
    }

    let questionData = JSON.parse(content) as UKMedicalQuestion;
    
    // Validate the structure
    if (!questionData.scenario || !questionData.question || !questionData.options || 
        !questionData.correct_answer || !questionData.explanation || !questionData.references) {
      throw new Error('Invalid question structure generated');
    }

    // Add default CKS guidance if missing
    if (!questionData.cks_guidance) {
      questionData.cks_guidance = {
        summary: `Clinical guidance for ${specialty} management according to UK standards.`,
        key_points: [
          "Follow evidence-based assessment protocols",
          "Consider patient safety and quality indicators",
          "Apply NICE guidance where applicable"
        ],
        management_approach: "Systematic clinical assessment following UK medical guidelines and best practice recommendations.",
        red_flags: ["Acute deterioration", "Signs requiring urgent intervention"],
        cks_url: `https://cks.nice.org.uk/search?q=${encodeURIComponent(specialty)}`
      };
    }

    // Ensure CKS URL is present
    if (!questionData.cks_guidance.cks_url) {
      questionData.cks_guidance.cks_url = `https://cks.nice.org.uk/search?q=${encodeURIComponent(specialty)}`;
    }

    // Add default additional guidelines if missing
    if (!questionData.additional_guidelines) {
      questionData.additional_guidelines = [
        {
          source: "RCGP",
          guidance: "Apply systematic clinical reasoning in primary care consultations with emphasis on safety netting",
          relevance: "Essential for comprehensive primary care assessment and patient safety"
        },
        {
          source: "GMC Good Medical Practice 2024",
          guidance: "Domain 1: Knowledge, skills and performance - Keep professional knowledge and skills up to date",
          relevance: "Ensures clinical competence and evidence-based practice"
        }
      ];
    }

    // Enhance references with proper NICE formatting if they lack specific sections
    if (questionData.references && questionData.references.length > 0) {
      questionData.references = questionData.references.map((ref: any) => {
        if (typeof ref === 'string') {
          return {
            title: ref,
            url: "https://www.nice.org.uk/guidance"
          };
        }
        // Enhance title with proper NICE format if it doesn't already have it
        if (ref.title && !ref.title.includes('Section') && !ref.title.includes('NG') && !ref.title.includes('CG')) {
          ref.title = `NICE Clinical Guideline: ${ref.title}`;
        }
        return ref;
      });
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
  console.log(`generateMultipleUKQuestions called: count=${count}, specialty=${specialty}, difficulty=${difficulty}`);
  const questions: UKMedicalQuestion[] = [];
  
  const cacheKey = getCacheKey(specialty, difficulty);
  console.log(`Cache key: ${cacheKey}`);
  
  // Try to get from cache first
  const cachedQuestions = questionCache.get(cacheKey) || [];
  console.log(`Found ${cachedQuestions.length} cached questions`);
  const fromCache = cachedQuestions.splice(0, Math.min(count, cachedQuestions.length));
  questions.push(...fromCache);
  
  const remaining = count - fromCache.length;
  console.log(`Need to generate ${remaining} additional questions`);
  
  if (remaining > 0) {
    // Generate all remaining questions in parallel for maximum speed
    const promises = Array(remaining).fill(null).map(() => 
      generateSingleQuestion(specialty, difficulty)
    );
    
    try {
      console.log(`Starting generation of ${remaining} questions...`);
      // Use Promise.allSettled to handle partial failures gracefully
      const results = await Promise.allSettled(promises);
      console.log(`Generation completed, processing ${results.length} results`);
      
      const successfulQuestions = results
        .filter((result): result is PromiseFulfilledResult<UKMedicalQuestion> => 
          result.status === 'fulfilled')
        .map(result => result.value);
      
      console.log(`Successfully generated ${successfulQuestions.length} questions`);
      questions.push(...successfulQuestions);
      
      // Cache extra questions for future requests
      successfulQuestions.forEach(q => addToCache(cacheKey, q));
      
      // Log failures for debugging
      const failures = results.filter(result => result.status === 'rejected');
      if (failures.length > 0) {
        console.log(`Generation failures: ${failures.length}/${remaining}`);
        failures.forEach((failure, index) => {
          console.error(`Failure ${index + 1}:`, failure.reason);
        });
      }
      
    } catch (error) {
      console.error('Error in parallel question generation:', error);
    }
  }
  
  console.log(`Returning ${questions.length} questions total`);
  
  // Pre-generate more questions in background for future requests
  if (questions.length > 0) {
    preGenerateQuestions(cacheKey, 5).catch(console.error);
  }
  
  return questions.slice(0, count);
}
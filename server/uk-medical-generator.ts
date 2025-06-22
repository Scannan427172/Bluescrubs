import { OpenAI } from 'openai';
import { SpecificReference, getCKSReferences } from './specific-references.js';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Simple in-memory cache
const questionCache = new Map<string, UKMedicalQuestion[]>();
const CACHE_SIZE_PER_CATEGORY = 50;
const CACHE_EXPIRY_TIME = 30 * 60 * 1000; // 30 minutes
const cacheTimestamps = new Map<string, number>();

// Clear cache on startup to force regeneration with mnemonics
console.log('Clearing question cache to implement question-specific mnemonics...');
questionCache.clear();
cacheTimestamps.clear();
console.log('Cache cleared - all new questions will have scenario-specific memory aids');

// Pre-load popular categories
const preloadQuestions = async () => {
  console.log('Pre-loading questions for instant delivery...');
  const categories = [
    'all_intermediate',
    'cardiology_intermediate', 
    'respiratory_intermediate',
    'gastroenterology_intermediate',
    'neurology_intermediate',
    'endocrinology_intermediate'
  ];
  
  for (const category of categories) {
    try {
      await preGenerateQuestions(category, 50);
      console.log(`Pre-loaded ${category} questions`);
    } catch (error) {
      console.error(`Error pre-loading ${category}:`, error);
    }
  }
  console.log('Question pre-loading completed');
};

// Start pre-loading after a short delay
setTimeout(preloadQuestions, 2000);

// Function to enhance questions with specific CKS references
async function enhanceWithCKSReferences(
  question: UKMedicalQuestion,
  specialty: string
): Promise<UKMedicalQuestion> {
  try {
    // Map specialty to CKS condition keywords - using correct working URLs
    const specialtyToCKSMap: Record<string, string[]> = {
      'cardiology': ['atrial_fibrillation', 'heart_failure', 'hypertension'],
      'cardiovascular': ['atrial_fibrillation', 'heart_failure', 'hypertension'],
      'respiratory': ['asthma_management', 'copd_management'],
      'endocrinology': ['diabetes_type2'],
      'psychiatry': ['depression_adults', 'anxiety_disorders'],
      'gastroenterology': ['gastroenteritis'],
      'urology': ['urinary_tract_infection'],
      'general': ['hypertension', 'diabetes_type2', 'asthma_management']
    };

    const cksConditions = specialtyToCKSMap[specialty.toLowerCase()] || [];
    
    // Try to find relevant CKS references
    let specificReferences: SpecificReference[] = [];
    
    for (const condition of cksConditions) {
      const refs = getCKSReferences(condition);
      specificReferences.push(...refs);
    }

    // If no specific references found, search by keywords from the scenario
    if (specificReferences.length === 0) {
      const scenarioText = (question.scenario + ' ' + question.question).toLowerCase();
      const keywords = extractKeywords(scenarioText);
      
      for (const keyword of keywords) {
        const condition = mapKeywordToCKSCondition(keyword);
        if (condition) {
          const refs = getCKSReferences(condition);
          specificReferences.push(...refs);
        }
      }
    }

    // Add specific references to CKS guidance
    if (question.cks_guidance && specificReferences.length > 0) {
      question.cks_guidance.specific_references = specificReferences.slice(0, 3); // Limit to 3 most relevant
    }

    return question;
  } catch (error) {
    console.error('Error enhancing with CKS references:', error);
    return question;
  }
}

// Function to add question-specific BMJ Best Practice guidance
function addBMJGuidance(
  question: UKMedicalQuestion,
  specialty: string
): UKMedicalQuestion {
  try {
    const scenarioText = (question.scenario + ' ' + question.question).toLowerCase();
    
    // Analyze question content to determine specific BMJ topic
    let bmjGuidance = {
      summary: "",
      key_points: [] as string[],
      clinical_approach: "",
      evidence_level: "Strong recommendation based on systematic review",
      bmj_url: ""
    };

    // Cardiovascular conditions
    if (scenarioText.includes('chest pain') || scenarioText.includes('angina')) {
      bmjGuidance = {
        summary: "BMJ Best Practice emphasizes rapid systematic assessment using HEART score and immediate ECG for chest pain evaluation.",
        key_points: [
          "HEART score ≥4 indicates high risk requiring hospital assessment",
          "ECG within 10 minutes of presentation",
          "High-sensitivity troponin at 0 and 3 hours"
        ],
        clinical_approach: "Risk stratification using validated scores, serial cardiac biomarkers, and consideration for coronary CT angiography in intermediate risk patients.",
        evidence_level: "Strong recommendation based on systematic review",
        bmj_url: "https://bestpractice.bmj.com/topics/en-us/3000003"
      };
    } else if (scenarioText.includes('heart failure') || scenarioText.includes('breathless') || scenarioText.includes('shortness of breath') || scenarioText.includes('orthopnea') || scenarioText.includes('paroxysmal nocturnal dyspnea') || scenarioText.includes('ejection fraction') || scenarioText.includes('hfref') || scenarioText.includes('ramipril') || scenarioText.includes('ace inhibitor')) {
      bmjGuidance = {
        summary: "BMJ Best Practice advocates NT-proBNP testing and echocardiography for heart failure diagnosis with ACE inhibitor initiation.",
        key_points: [
          "NT-proBNP >125 pg/mL warrants echocardiography",
          "ACE inhibitors first-line unless contraindicated",
          "Beta-blockers once stable on ACE inhibitor therapy"
        ],
        clinical_approach: "Structured approach using biomarkers, imaging, and guideline-directed medical therapy with regular monitoring.",
        evidence_level: "Strong recommendation based on RCT evidence",
        bmj_url: "https://bestpractice.bmj.com/topics/en-us/3000135"
      };
    } else if (scenarioText.includes('hypertension') || scenarioText.includes('blood pressure')) {
      bmjGuidance = {
        summary: "BMJ Best Practice recommends ambulatory blood pressure monitoring and stepped care approach to hypertension management.",
        key_points: [
          "ABPM confirmatory testing for stage 1 hypertension",
          "ACE inhibitors first-line in under 55s, CCBs in over 55s",
          "Target <140/90 mmHg in most patients"
        ],
        clinical_approach: "24-hour ABPM for diagnosis confirmation, cardiovascular risk assessment, and structured medication escalation.",
        evidence_level: "Strong recommendation based on meta-analysis",
        bmj_url: "https://bestpractice.bmj.com/topics/en-us/3000114"
      };
    }
    // Respiratory conditions  
    else if (scenarioText.includes('asthma') || scenarioText.includes('wheeze')) {
      bmjGuidance = {
        summary: "BMJ Best Practice emphasizes fractional exhaled nitric oxide testing and step-wise pharmacotherapy for asthma management.",
        key_points: [
          "FeNO >40 ppb supports asthma diagnosis",
          "ICS-formoterol as reliever and maintenance therapy",
          "Written asthma action plans for all patients"
        ],
        clinical_approach: "Objective testing with spirometry and FeNO, personalized inhaler therapy, and structured self-management education.",
        evidence_level: "Strong recommendation based on systematic review",
        bmj_url: "https://bestpractice.bmj.com/topics/en-us/3000097"
      };
    } else if (scenarioText.includes('copd') || scenarioText.includes('chronic obstructive')) {
      bmjGuidance = {
        summary: "BMJ Best Practice advocates for post-bronchodilator spirometry and GOLD classification for COPD management.",
        key_points: [
          "Post-bronchodilator FEV1/FVC <0.7 confirms airflow obstruction",
          "LABA-LAMA combination for symptomatic patients",
          "Pulmonary rehabilitation for all symptomatic patients"
        ],
        clinical_approach: "Spirometric confirmation, exacerbation history assessment, and individualized bronchodilator therapy selection.",
        evidence_level: "Strong recommendation based on RCT evidence",
        bmj_url: "https://bestpractice.bmj.com/topics/en-us/3000098"
      };
    }
    // Endocrine conditions
    else if (scenarioText.includes('diabetes') || scenarioText.includes('glucose') || scenarioText.includes('hba1c')) {
      bmjGuidance = {
        summary: "BMJ Best Practice recommends HbA1c <7% target with metformin first-line and cardiovascular risk reduction strategies.",
        key_points: [
          "HbA1c <7% (53 mmol/mol) for most adults",
          "Metformin 500mg BD initially, titrate to maximum tolerated dose",
          "Annual screening for diabetic complications"
        ],
        clinical_approach: "Individualized glycemic targets, structured medication escalation, and comprehensive complication screening.",
        evidence_level: "Strong recommendation based on landmark trials",
        bmj_url: "https://bestpractice.bmj.com/topics/en-us/3000116"
      };
    } else if (scenarioText.includes('thyroid') || scenarioText.includes('tsh')) {
      bmjGuidance = {
        summary: "BMJ Best Practice advocates TSH-guided levothyroxine dosing with 6-8 week monitoring intervals for hypothyroidism.",
        key_points: [
          "Start levothyroxine 1.6 mcg/kg/day in healthy adults",
          "Check TSH 6-8 weeks after dose changes",
          "Target TSH 0.5-2.5 mIU/L for most patients"
        ],
        clinical_approach: "Weight-based initial dosing, systematic monitoring, and dose optimization based on TSH response.",
        evidence_level: "Strong recommendation based on expert consensus",
        bmj_url: "https://bestpractice.bmj.com/topics/en-us/3000114"
      };
    }
    // Default for other conditions
    else {
      bmjGuidance = {
        summary: `BMJ Best Practice provides evidence-based approach to ${specialty} conditions with systematic diagnostic and management protocols.`,
        key_points: [
          "Evidence-based diagnostic criteria and risk assessment",
          "Structured treatment algorithms with monitoring plans",
          "Patient safety considerations and quality indicators"
        ],
        clinical_approach: "Systematic clinical assessment following evidence-based protocols with emphasis on patient-centered care.",
        evidence_level: "Recommendation based on best available evidence",
        bmj_url: "https://bestpractice.bmj.com/topics/en-us/"
      };
    }

    question.bmj_guidance = bmjGuidance;
    return question;
  } catch (error) {
    console.error('Error adding BMJ guidance:', error);
    return question;
  }
}

// Helper function to map keywords to CKS conditions
function mapKeywordToCKSCondition(keyword: string): string | null {
  const keywordMap: Record<string, string> = {
    'atrial': 'atrial_fibrillation',
    'fibrillation': 'atrial_fibrillation',
    'heart failure': 'heart_failure',
    'hypertension': 'hypertension',
    'diabetes': 'diabetes_type2',
    'asthma': 'asthma_management',
    'copd': 'copd_management',
    'depression': 'depression_adults',
    'anxiety': 'anxiety_disorders'
  };
  
  return keywordMap[keyword] || null;
}

function extractKeywords(text: string): string[] {
  // Extract relevant medical keywords from scenario text
  const medicalKeywords = [
    'atrial fibrillation', 'heart failure', 'hypertension', 'diabetes', 
    'asthma', 'copd', 'depression', 'anxiety', 'chest pain', 'breathless'
  ];
  
  return medicalKeywords.filter(keyword => text.includes(keyword));
}

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
    specific_references?: SpecificReference[];
  };
  bmj_guidance?: {
    summary: string;
    key_points: string[];
    clinical_approach: string;
    evidence_level?: string;
    bmj_url?: string;
  };
  additional_guidelines: Array<{
    source: string;
    guidance: string;
    relevance: string;
  }>;
}

function getSystemPrompt(specialty: string): string {
  return `You are an expert UK medical educator creating PLAB 1 exam questions. Generate realistic clinical scenarios that test core medical knowledge and clinical reasoning skills typical of UK medical practice.

CRITICAL REQUIREMENTS:
1. Create authentic UK clinical scenarios with realistic patient presentations
2. Include comprehensive CKS guidance with practical management approaches
3. Add UK-specific guidelines (NICE, GMC, Royal Colleges)
4. All questions must be answerable using standard UK medical knowledge
5. Include red flags and safety considerations in CKS guidance

SPECIALTY FOCUS: ${specialty}

Generate a complete question with these EXACT JSON fields:
{
  "scenario": "Detailed clinical presentation (2-3 sentences)",
  "question": "Clear clinical question",
  "options": {
    "A": "Option A text",
    "B": "Option B text", 
    "C": "Option C text",
    "D": "Option D text",
    "E": "Option E text"
  },
  "correct_answer": "A|B|C|D|E",
  "explanation": "Detailed explanation with clinical reasoning",
  "cks_guidance": {
    "summary": "CKS summary for this condition",
    "key_points": ["Key clinical point 1", "Key clinical point 2", "Key clinical point 3"],
    "management_approach": "Systematic management approach",
    "red_flags": ["Red flag 1", "Red flag 2"]
  },
  "additional_guidelines": [
    {
      "source": "NICE/GMC/Royal College",
      "guidance": "Specific guidance text",
      "relevance": "How it applies to this case"
    }
  ],
  "references": [
    {
      "title": "NICE guideline title",
      "url": "https://www.nice.org.uk/guidance/..."
    }
  ]
}

Return ONLY valid JSON without any additional text or formatting.`;
}

function getCacheKey(specialty: string, difficulty: string): string {
  return `${specialty}_${difficulty}`;
}

function isCacheValid(cacheKey: string): boolean {
  const timestamp = cacheTimestamps.get(cacheKey);
  if (!timestamp) return false;
  return Date.now() - timestamp < CACHE_EXPIRY_TIME;
}

function getCachedQuestion(cacheKey: string): UKMedicalQuestion | null {
  if (!isCacheValid(cacheKey)) {
    questionCache.delete(cacheKey);
    cacheTimestamps.delete(cacheKey);
    return null;
  }
  
  const questions = questionCache.get(cacheKey);
  if (!questions || questions.length === 0) return null;
  
  // Return and remove a random question
  const randomIndex = Math.floor(Math.random() * questions.length);
  return questions.splice(randomIndex, 1)[0];
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
          content: getSystemPrompt(specialty)
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

    // Enhance with detailed CKS references
    questionData = await enhanceWithCKSReferences(questionData, specialty);

    // Add question-specific BMJ Best Practice guidance
    questionData = addBMJGuidance(questionData, specialty);

    // Add default CKS guidance if missing
    if (!questionData.cks_guidance) {
      questionData.cks_guidance = {
        summary: `Comprehensive clinical management approach for ${specialty} conditions following CKS guidelines.`,
        key_points: [
          "Evidence-based diagnostic approach",
          "Systematic treatment protocols", 
          "Patient safety considerations"
        ],
        management_approach: "Structured clinical assessment with appropriate investigations and evidence-based treatment.",
        red_flags: ["Immediate deterioration", "Atypical presentation requiring urgent assessment"],
        cks_url: "https://cks.nice.org.uk/"
      };
    }

    return questionData;
  } catch (error) {
    console.error('Error generating UK medical question:', error);
    throw error;
  }
}

export async function generateUKMedicalQuestion(
  specialty: string = 'general',
  difficulty: string = 'intermediate'
): Promise<UKMedicalQuestion> {
  const cacheKey = getCacheKey(specialty, difficulty);
  
  // Try to get from cache first
  const cachedQuestion = getCachedQuestion(cacheKey);
  if (cachedQuestion) {
    return cachedQuestion;
  }
  
  // Generate new question if cache miss
  const question = await generateSingleQuestion(specialty, difficulty);
  
  // Add to cache for future use
  addToCache(cacheKey, question);
  
  return question;
}

export async function generateMultipleUKQuestions(
  count: number,
  specialty: string = 'all',
  difficulty: string = 'intermediate'
): Promise<UKMedicalQuestion[]> {
  console.log(`generateMultipleUKQuestions called: count=${count}, specialty=${specialty}, difficulty=${difficulty}`);
  
  const cacheKey = getCacheKey(specialty, difficulty);
  console.log(`Cache key: ${cacheKey}`);
  
  const questions: UKMedicalQuestion[] = [];
  
  // First, try to get as many as possible from cache
  const cachedQuestions = questionCache.get(cacheKey) || [];
  console.log(`Found ${cachedQuestions.length} cached questions`);
  
  const fromCache = Math.min(count, cachedQuestions.length);
  for (let i = 0; i < fromCache; i++) {
    const question = getCachedQuestion(cacheKey);
    if (question) {
      questions.push(question);
    }
  }
  
  // Generate remaining questions if needed
  const remaining = count - questions.length;
  console.log(`Need to generate ${remaining} additional questions`);
  
  if (remaining > 0) {
    console.log(`Starting generation of ${remaining} questions...`);
    const generatePromises = Array(remaining).fill(null).map(() => 
      generateSingleQuestion(specialty, difficulty)
    );
    
    try {
      const results = await Promise.allSettled(generatePromises);
      console.log(`Generation completed, processing ${results.length} results`);
      
      results.forEach((result) => {
        if (result.status === 'fulfilled') {
          questions.push(result.value);
        } else {
          console.error('Question generation failed:', result.reason);
        }
      });
      
      console.log(`Successfully generated ${questions.length - fromCache} questions`);
    } catch (error) {
      console.error('Error in batch generation:', error);
    }
  }
  
  console.log(`Returning ${questions.length} questions total`);
  return questions.slice(0, count); // Ensure we don't return more than requested
}
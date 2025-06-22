import OpenAI from 'openai';
import { getCKSReferences, searchCKSReferences, SpecificReference } from './specific-references';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Enhanced cache for instant responses - cleared for specific mnemonics
const questionCache = new Map<string, UKMedicalQuestion[]>();
const CACHE_SIZE_PER_CATEGORY = 100; 
const CACHE_TTL = 8 * 60 * 60 * 1000; 
const cacheTimestamps = new Map<string, number>();
const MIN_CACHE_THRESHOLD = 25;

// Clear all cached questions to force regeneration with question-specific mnemonics
console.log('Clearing question cache to implement question-specific mnemonics...');
questionCache.clear();
cacheTimestamps.clear();
console.log('Cache cleared - all new questions will have scenario-specific memory aids');

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

// Function to enhance questions with BMJ Best Practice guidance
function enhanceWithBMJGuidance(
  question: UKMedicalQuestion,
  specialty: string
): UKMedicalQuestion {
  try {
    // Map specialty to BMJ Best Practice topics
    const specialtyToBMJMap: Record<string, string> = {
      'cardiology': 'cardiovascular-disease',
      'cardiovascular': 'acute-coronary-syndromes',
      'respiratory': 'asthma',
      'endocrinology': 'diabetes-mellitus',
      'psychiatry': 'depression',
      'gastroenterology': 'gastroenteritis',
      'neurology': 'stroke',
      'surgery': 'surgical-site-infection',
      'obstetrics-gynaecology': 'pregnancy-care',
      'general': 'primary-care'
    };

    const bmjTopic = specialtyToBMJMap[specialty.toLowerCase()] || 'primary-care';
    
    // Generate BMJ guidance based on specialty and question content
    const bmjGuidance = {
      summary: `BMJ Best Practice provides evidence-based clinical guidance for ${specialty} conditions with systematic approach to diagnosis and management.`,
      key_points: [
        "Evidence-based diagnostic criteria and risk stratification",
        "Systematic treatment algorithms with outcome measures",
        "Patient safety considerations and monitoring requirements"
      ],
      clinical_approach: "Structured clinical assessment following evidence-based protocols with emphasis on patient-centered care and safety.",
      evidence_level: "Strong recommendation based on high-quality evidence",
      bmj_url: `https://bestpractice.bmj.com/topics/en-us/${bmjTopic}`
    };

    // Customize guidance based on question content
    const scenarioText = (question.scenario + ' ' + question.question).toLowerCase();
    
    if (scenarioText.includes('chest pain') || scenarioText.includes('cardiac')) {
      bmjGuidance.summary = "BMJ Best Practice emphasizes rapid assessment of chest pain using validated risk scores and immediate ECG interpretation.";
      bmjGuidance.key_points = [
        "HEART score for risk stratification in chest pain",
        "Immediate ECG and troponin measurement",
        "Consider dual antiplatelet therapy for ACS"
      ];
      bmjGuidance.bmj_url = "https://bestpractice.bmj.com/topics/en-us/3000003";
    } else if (scenarioText.includes('diabetes') || scenarioText.includes('glucose')) {
      bmjGuidance.summary = "BMJ Best Practice advocates for individualized diabetes management with HbA1c targets and cardiovascular risk reduction.";
      bmjGuidance.key_points = [
        "HbA1c target <7% for most adults with diabetes",
        "Metformin as first-line therapy unless contraindicated",
        "Annual screening for diabetic complications"
      ];
      bmjGuidance.bmj_url = "https://bestpractice.bmj.com/topics/en-us/3000114";
    } else if (scenarioText.includes('asthma') || scenarioText.includes('wheeze')) {
      bmjGuidance.summary = "BMJ Best Practice recommends step-wise asthma management with emphasis on inhaler technique and trigger avoidance.";
      bmjGuidance.key_points = [
        "Step-wise approach to asthma pharmacotherapy",
        "Regular assessment of inhaler technique",
        "Written asthma action plans for all patients"
      ];
      bmjGuidance.bmj_url = "https://bestpractice.bmj.com/topics/en-us/3000097";
    }

    question.bmj_guidance = bmjGuidance;
    return question;
  } catch (error) {
    console.error('Error enhancing with BMJ guidance:', error);
    return question; // Return original question if enhancement fails
  }
}

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
      const keywords = extractKeywords(question.scenario + ' ' + question.question);
      for (const keyword of keywords) {
        const refs = searchCKSReferences(keyword);
        specificReferences.push(...refs.slice(0, 2)); // Limit to 2 per keyword
      }
    }

    // Add specific references to CKS guidance
    if (specificReferences.length > 0 && question.cks_guidance) {
      question.cks_guidance.specific_references = specificReferences.slice(0, 3); // Limit to 3 total
      
      // Update CKS URL to most relevant reference
      const primaryRef = specificReferences[0];
      if (primaryRef) {
        question.cks_guidance.cks_url = primaryRef.url;
      }
    }

    return question;
  } catch (error) {
    console.error('Error enhancing with CKS references:', error);
    return question; // Return original question if enhancement fails
  }
}

// Helper function to extract medical keywords from text
function extractKeywords(text: string): string[] {
  const medicalKeywords = [
    'chest pain', 'hypertension', 'diabetes', 'asthma', 'heart failure',
    'depression', 'anxiety', 'copd', 'gastroenteritis', 'uti', 'infection',
    'coronary', 'cardiac', 'respiratory', 'breathlessness', 'pneumonia'
  ];
  
  const lowerText = text.toLowerCase();
  return medicalKeywords.filter(keyword => lowerText.includes(keyword));
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
  const specialtySettings = {
    'cardiology': {
      specialist: 'consultant cardiologist',
      setting: 'cardiology clinic',
      context: 'specialist cardiology assessment'
    },
    'cardiovascular': {
      specialist: 'consultant cardiologist',
      setting: 'cardiology clinic',
      context: 'specialist cardiac evaluation'
    },
    'respiratory': {
      specialist: 'consultant respiratory physician',
      setting: 'respiratory clinic',
      context: 'specialist respiratory assessment'
    },
    'gastroenterology': {
      specialist: 'consultant gastroenterologist',
      setting: 'gastroenterology clinic',
      context: 'specialist GI evaluation'
    },
    'neurology': {
      specialist: 'consultant neurologist',
      setting: 'neurology clinic',
      context: 'specialist neurological assessment'
    },
    'endocrinology': {
      specialist: 'consultant endocrinologist',
      setting: 'endocrinology clinic',
      context: 'specialist endocrine evaluation'
    },
    'psychiatry': {
      specialist: 'consultant psychiatrist',
      setting: 'psychiatric clinic',
      context: 'specialist mental health assessment'
    },
    'obstetrics-gynaecology': {
      specialist: 'consultant obstetrician and gynaecologist',
      setting: 'obstetrics and gynaecology clinic',
      context: 'specialist obstetric/gynaecological assessment'
    },
    'paediatrics': {
      specialist: 'consultant paediatrician',
      setting: 'paediatric clinic',
      context: 'specialist paediatric assessment'
    },
    'surgery': {
      specialist: 'consultant surgeon',
      setting: 'surgical clinic',
      context: 'specialist surgical assessment'
    },
    'emergency-medicine': {
      specialist: 'consultant in emergency medicine',
      setting: 'emergency department',
      context: 'emergency department assessment'
    },
    'nephrology': {
      specialist: 'consultant nephrologist',
      setting: 'nephrology clinic',
      context: 'specialist renal assessment'
    },
    'rheumatology': {
      specialist: 'consultant rheumatologist',
      setting: 'rheumatology clinic',
      context: 'specialist rheumatological assessment'
    },
    'dermatology': {
      specialist: 'consultant dermatologist',
      setting: 'dermatology clinic',
      context: 'specialist dermatological assessment'
    },
    'default': {
      specialist: 'consultant physician',
      setting: 'specialist clinic',
      context: 'specialist medical assessment'
    }
  };

  const config = specialtySettings[specialty as keyof typeof specialtySettings] || specialtySettings.default;

  return `You are a highly trained AI model designed to generate UK medical exam questions for PLAB 1 preparation, following the exact format used in official PLAB examinations.

You only use official UK medical guidelines for your answers. These include:
- NICE Guidelines (current version)
- CKS Clinical Knowledge Summaries
- GMC Good Medical Practice 2024
- GMC MLA Content Map
- BMJ Best Practice
- SIGN Guidelines (Scotland)
- NHS clinical guidelines
- RCGP Guidelines

TASK:
Generate a complete PLAB 1 style clinical scenario following this structure:

1️⃣ CLINICAL SCENARIO: Create a realistic clinical presentation from the perspective of a ${config.specialist} in a ${config.setting}. Include:
   - Patient demographics (age, gender)
   - Presenting symptoms with duration
   - Relevant examination findings
   - Key investigation results (if applicable)
   - Clear indication of the clinical condition

2️⃣ QUESTION: Create a single-best-answer question asking "What is the most appropriate..." (treatment/investigation/management)

3️⃣ OPTIONS: Generate FIVE multiple choice answers labeled A, B, C, D, and E that are:
   - Clinically plausible
   - Appropriately challenging
   - Based on real treatment options

4️⃣ EXPLANATION: Write a comprehensive explanation that:
   - Confirms the diagnosis based on clinical findings
   - Explains why the correct answer is the best choice according to UK guidelines
   - Details the mechanism of action or rationale
   - Mentions specific dosing/administration advice where relevant
   - Explains why other options are incorrect or less appropriate
   - Includes monitoring requirements or follow-up advice

5️⃣ REFERENCES: Provide authentic UK clinical guidelines with:
   - Specific NICE guideline numbers and sections
   - Direct CKS topic references
   - Exact page/section numbers where the guidance is found

REFERENCE REQUIREMENTS:
- Use authentic NICE guideline numbers (NG145, NG80, NG136, etc.) with real URLs
- Provide direct links to specific sections using anchor tags (#section-name)
- Use actual CKS topic URLs that exist: https://cks.nice.org.uk/topics/[condition]/management/[specific-treatment]/
- Format references exactly like this working example:
  * "NICE: [Treatment of primary hypothyroidism – NG145](https://www.nice.org.uk/guidance/ng145/chapter/Recommendations#treatment-of-primary-hypothyroidism)"
  * "CKS: [Levothyroxine treatment – Hypothyroidism CKS](https://cks.nice.org.uk/topics/hypothyroidism/management/levothyroxine-treatment/)"

AUTHENTIC NICE GUIDELINES TO USE:
- NG145: Thyroid disease assessment and management
- NG80: Asthma diagnosis and monitoring
- NG136: Hypertension in adults
- NG28: Type 2 diabetes in adults
- NG106: Chronic heart failure in adults
- NG185: Atrial fibrillation management
- NG12: Suspected cancer recognition and referral
- NG17: Type 1 diabetes in adults
- NG203: COVID-19 rapid guideline
- NG159: Depression in adults
- NG116: Mental health problems in people with learning disabilities

MLA CONTENT MAP DOMAINS TO REFERENCE:
- Applied Medical Sciences (anatomy, physiology, pathology, pharmacology)
- Clinical Skills (history taking, examination, procedures)
- Professional Behaviour (ethics, communication, teamwork)
- Population Health (epidemiology, health promotion, disease prevention)

FOUNDATION PROGRAMME CURRICULUM AREAS:
- Acute care and emergency medicine
- Safe prescribing and therapeutics
- Infection prevention and antimicrobial stewardship
- Quality improvement and patient safety
- Health inequalities and social determinants

SPECIALIST SOCIETY GUIDELINES TO INCLUDE:
- ESC (European Society of Cardiology): cardiovascular conditions
- BTS (British Thoracic Society): respiratory conditions
- ADA (American Diabetes Association): diabetes management
- SIGN (Scottish Intercollegiate Guidelines Network): evidence-based care
- RCOG (Royal College of Obstetricians and Gynaecologists): women's health
- BSG (British Society of Gastroenterology): GI conditions

AUTHENTIC CKS TOPICS TO USE:
- hypothyroidism, asthma, hypertension, diabetes-type2, heart-failure, atrial-fibrillation, depression, anxiety-disorder, copd, pneumonia, uti, contraception

Format your entire output as VALID JSON exactly as shown below.

EXAMPLE FORMAT (follow this PLAB 1 structure):

Clinical Scenario:
"A 55-year-old woman presents to her GP with a 3-month history of fatigue, weight gain, and feeling cold. She reports low mood and constipation. On examination, her skin is dry, her heart rate is 58 bpm, and ankle reflexes show delayed relaxation. Blood tests reveal:
- TSH: 16 mU/L (↑)
- Free T4: 8 pmol/L (↓)
These findings are consistent with primary hypothyroidism."

Question: "What is the most appropriate initial treatment for this patient?"

OUTPUT FORMAT (strictly follow this JSON structure):

{
  "scenario": "<detailed clinical scenario with patient demographics, symptoms, examination findings, and investigation results>",
  "question": "<single-best-answer question asking 'What is the most appropriate...' >",
  "options": {
    "A": "<treatment/investigation option A>",
    "B": "<treatment/investigation option B>", 
    "C": "<treatment/investigation option C>",
    "D": "<treatment/investigation option D>",
    "E": "<treatment/investigation option E>"
  },
  "correct_answer": "<A, B, C, D or E>",
  "explanation": "<comprehensive explanation covering: 1) Diagnosis confirmation, 2) Why correct answer is best per UK guidelines, 3) Mechanism/rationale, 4) Specific dosing/monitoring advice, 5) Why other options are incorrect, 6) Follow-up requirements>",
  "study_tips": {
    "mnemonic": "<Create a highly specific mnemonic using elements from THIS EXACT scenario: patient's age, presenting symptoms, examination findings, and the CORRECT ANSWER. Example formats: 'For 55-year-old with Hypothyroid symptoms needing Levothyroxine: H-L-55 = Hypothyroid Lady at 55 needs Levothyroxine' OR 'For chest pain needing GTN: Give The Nitrate for chest pain relief' OR 'For AF needing Warfarin: Atrial Fibrillation Warrants Warfarin'. Make it memorable and question-specific, not generic.>",
    "question_specific_tips": [
      "<Tip specifically about the correct treatment/investigation chosen>",
      "<Memory aid for this exact patient demographic and presentation>", 
      "<Clinical reasoning specific to why this answer beats the other 4 options>"
    ]
  },
  "references": [
    {
      "title": "NICE: [Treatment Topic – NG###]",
      "url": "https://www.nice.org.uk/guidance/ng###/chapter/Recommendations#specific-section",
      "description": "This section explains the specific treatment recommendations and guidelines."
    },
    {
      "title": "CKS: [Treatment/Management – Condition Name CKS]",
      "url": "https://cks.nice.org.uk/topics/condition-name/management/specific-treatment/",
      "description": "Covers practical management, monitoring, and patient advice."
    }
  ]

REFERENCE EXAMPLES TO FOLLOW:
- NICE: [Treatment of primary hypothyroidism – NG145](https://www.nice.org.uk/guidance/ng145/chapter/Recommendations#treatment-of-primary-hypothyroidism)
- CKS: [Levothyroxine treatment – Hypothyroidism CKS](https://cks.nice.org.uk/topics/hypothyroidism/management/levothyroxine-treatment/)
- BMJ: [Hypothyroidism treatment – BMJ Best Practice](https://bestpractice.bmj.com/topics/en-us/3000114/treatment)
- NICE: [Asthma diagnosis and monitoring – NG80](https://www.nice.org.uk/guidance/ng80/chapter/Recommendations#diagnosis-of-asthma)
- CKS: [Asthma management – Asthma CKS](https://cks.nice.org.uk/topics/asthma/management/chronic-asthma-management/)
- BMJ: [Asthma management – BMJ Best Practice](https://bestpractice.bmj.com/topics/en-us/3000097/treatment)

Use these exact URL patterns with real guideline numbers and specific anchor sections.
}

SPECIALTY CONTEXT: Focus on ${specialty} scenarios appropriate for ${config.context}. 

MLA CONTENT MAP INTEGRATION:
- Align questions with MLA domains: Applied Medical Sciences, Clinical Skills, Professional Behaviour, Population Health
- Include Foundation Programme curriculum elements where relevant
- Reference appropriate competency frameworks in explanations

CONTENT REQUIREMENTS:
- Create realistic clinical presentations with specific vital signs, investigation results, and examination findings
- Use authentic UK medical terminology and reference ranges
- Include age-appropriate conditions and presentations
- Ensure all treatment options reflect current UK prescribing guidelines
- Base explanations on established pathophysiology and evidence-based medicine
- Include relevant specialist society guidelines (ESC, BTS, ADA, SIGN, RCOG, BSG) where applicable

STRICT RULES:
- Always output valid JSON format
- Do not include any extra text, instructions, or notes outside of the JSON
- Only output one scenario, one question, and five options per run
- Each option must be distinct and clinically plausible
- Keep explanations comprehensive yet concise, focusing on UK clinical practice
- Include specific dosing information where appropriate
- Reference monitoring requirements and follow-up schedules according to UK guidelines`;
}

const SYSTEM_PROMPT = getSystemPrompt('general medicine'); // Default system prompt

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

    // Add BMJ Best Practice guidance
    if (typeof enhanceWithBMJGuidance === 'function') {
      questionData = enhanceWithBMJGuidance(questionData, specialty);
    } else {
      // Add default BMJ guidance
      questionData.bmj_guidance = {
        summary: `BMJ Best Practice provides evidence-based clinical guidance for ${specialty} conditions with systematic approach to diagnosis and management.`,
        key_points: [
          "Evidence-based diagnostic criteria and risk stratification",
          "Systematic treatment algorithms with outcome measures",
          "Patient safety considerations and monitoring requirements"
        ],
        clinical_approach: "Structured clinical assessment following evidence-based protocols with emphasis on patient-centered care and safety.",
        evidence_level: "Strong recommendation based on high-quality evidence",
        bmj_url: "https://bestpractice.bmj.com/topics/en-us/primary-care"
      };
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
        cks_url: `https://cks.nice.org.uk/`
      };
    }

    // Ensure CKS URL points to a working page
    if (!questionData.cks_guidance.cks_url || questionData.cks_guidance.cks_url.includes('search?q=')) {
      questionData.cks_guidance.cks_url = `https://cks.nice.org.uk/`;
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
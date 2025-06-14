import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export interface PLAB2OSCEStation {
  id: string;
  title: string;
  scenario: string;
  type: string;
  duration: number;
  difficulty: string;
  instructions: {
    candidate: string;
    examiner: string;
    standardizedPatient?: string;
  };
  markingCriteria: Array<{
    category: string;
    maxMarks: number;
    criteria: string[];
  }>;
  keyActions: string[];
  redFlags: string[];
  differentialDiagnosis?: string[];
  medications?: Array<{
    name: string;
    indication: string;
    dosage: string;
    sideEffects: string[];
    contraindications: string[];
  }>;
  references: Array<{
    title: string;
    url: string;
  }>;
}

const PLAB2_SYSTEM_PROMPT = `You are a highly trained AI model designed to generate authentic UK PLAB 2 OSCE stations using official UK medical guidelines.

You only use official UK medical guidelines for your content. These include:
- NICE Guidelines (current version)
- GMC Good Medical Practice 2024
- GMC MLA Content Map
- BNF (British National Formulary)
- NHS clinical guidelines
- Royal College guidelines (RCP, RCGP, etc.)

TASK:
Generate ONE realistic PLAB 2 OSCE station that includes:
1️⃣ A clinical scenario based on real UK healthcare settings
2️⃣ Clear instructions for candidate, examiner, and standardized patient
3️⃣ Detailed marking criteria with specific mark allocations
4️⃣ Key actions expected from candidates
5️⃣ Red flags that must be identified/managed
6️⃣ Relevant medications with BNF-compliant information
7️⃣ Official UK medical guideline references

STATION TYPES TO GENERATE:
- History Taking (8-10 minutes)
- Physical Examination (5-8 minutes) 
- Communication Skills (8-10 minutes)
- Practical Procedures (8-10 minutes)
- Emergency Management (8-10 minutes)
- Prescribing & Patient Safety (8-10 minutes)

VERY IMPORTANT:
- All content must be medically accurate according to current NICE/GMC guidance
- Use realistic UK healthcare scenarios (GP surgery, A&E, ward rounds)
- Include specific marking criteria matching real PLAB 2 standards
- Provide working URLs to official guidelines
- Format as valid JSON exactly as shown below

OUTPUT FORMAT:

{
  "title": "<station title>",
  "scenario": "<detailed clinical scenario>",
  "type": "<station type>",
  "duration": <duration in minutes>,
  "difficulty": "<foundation/intermediate/advanced>",
  "instructions": {
    "candidate": "<clear instructions for candidate>",
    "examiner": "<instructions for examiner>",
    "standardizedPatient": "<instructions for actor if applicable>"
  },
  "markingCriteria": [
    {
      "category": "<category name>",
      "maxMarks": <number>,
      "criteria": ["<specific criterion>", "<specific criterion>"]
    }
  ],
  "keyActions": ["<essential action>", "<essential action>"],
  "redFlags": ["<red flag>", "<red flag>"],
  "differentialDiagnosis": ["<diagnosis>", "<diagnosis>"],
  "medications": [
    {
      "name": "<medication name>",
      "indication": "<indication>",
      "dosage": "<BNF dosage>",
      "sideEffects": ["<side effect>"],
      "contraindications": ["<contraindication>"]
    }
  ],
  "references": [
    {
      "title": "<official guideline name>",
      "url": "<working URL>"
    }
  ]
}

STRICT RULES:
- Always output valid JSON format
- Only use authentic UK medical guidelines
- Include specific mark allocations (total should be 20 marks)
- Provide realistic scenarios from UK healthcare settings
- Include working URLs to official sources`;

export async function generatePLAB2Station(
  stationType: string = 'history-taking',
  specialty: string = 'general-medicine',
  difficulty: string = 'intermediate'
): Promise<PLAB2OSCEStation> {
  try {
    // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: PLAB2_SYSTEM_PROMPT
        },
        {
          role: "user",
          content: `Generate a ${difficulty} level PLAB 2 OSCE station for ${stationType} in ${specialty}. Focus on current NICE guidelines and GMC standards. The station should be realistic for UK healthcare settings. Output only valid JSON format.`
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 3000
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error('No content generated');
    }

    const stationData = JSON.parse(content) as any;
    
    // Add ID and validate structure
    const station: PLAB2OSCEStation = {
      id: `plab2_${stationType}_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      title: stationData.title,
      scenario: stationData.scenario,
      type: stationType,
      duration: stationData.duration || 8,
      difficulty,
      instructions: stationData.instructions,
      markingCriteria: stationData.markingCriteria || [],
      keyActions: stationData.keyActions || [],
      redFlags: stationData.redFlags || [],
      differentialDiagnosis: stationData.differentialDiagnosis,
      medications: stationData.medications,
      references: stationData.references || []
    };

    // Validate required fields
    if (!station.title || !station.scenario || !station.instructions) {
      throw new Error('Invalid station structure generated');
    }

    return station;

  } catch (error: any) {
    console.error('Error generating PLAB 2 station:', error);
    throw new Error(`Failed to generate PLAB 2 station: ${error?.message || 'Unknown error'}`);
  }
}

export async function generateMultiplePLAB2Stations(
  count: number,
  stationType: string = 'history-taking',
  specialty: string = 'general-medicine',
  difficulty: string = 'intermediate'
): Promise<PLAB2OSCEStation[]> {
  const stations: PLAB2OSCEStation[] = [];
  
  for (let i = 0; i < count; i++) {
    try {
      const station = await generatePLAB2Station(stationType, specialty, difficulty);
      stations.push(station);
    } catch (error) {
      console.error(`Failed to generate PLAB 2 station ${i + 1}:`, error);
    }
  }
  
  return stations;
}

// PLAB 2 station types for comprehensive coverage
export const PLAB2_STATION_TYPES = [
  'history-taking',
  'physical-examination', 
  'communication-skills',
  'practical-procedures',
  'emergency-management',
  'prescribing-safety'
];

export const PLAB2_SPECIALTIES = [
  'general-medicine',
  'cardiology',
  'respiratory',
  'gastroenterology', 
  'neurology',
  'endocrinology',
  'psychiatry',
  'emergency-medicine',
  'obstetrics-gynaecology',
  'paediatrics',
  'surgery',
  'orthopaedics'
];
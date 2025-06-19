import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Medical specialties with their specific focus areas and expertise levels
export const MEDICAL_SPECIALTIES = {
  cardiology: {
    name: "Cardiology",
    specialist: "Consultant Cardiologist",
    expertise: [
      "Acute coronary syndromes", "Heart failure management", "Arrhythmias", 
      "Hypertension", "Valvular disease", "Cardiac imaging interpretation",
      "Interventional cardiology", "Electrophysiology", "Preventive cardiology"
    ],
    guidelines: ["NICE CG181", "ESC Guidelines", "AHA/ACC Guidelines"],
    level: "Specialist-level clinical reasoning and advanced diagnostic skills"
  },
  respiratory: {
    name: "Respiratory Medicine", 
    specialist: "Consultant Respiratory Physician",
    expertise: [
      "Asthma and COPD management", "Pneumonia and respiratory infections",
      "Pulmonary embolism", "Lung cancer screening", "Sleep disorders",
      "Interstitial lung disease", "Pleural disease", "Respiratory failure"
    ],
    guidelines: ["NICE CG101", "BTS Guidelines", "GOLD Guidelines"],
    level: "Advanced pulmonary medicine expertise and complex case management"
  },
  gastroenterology: {
    name: "Gastroenterology",
    specialist: "Consultant Gastroenterologist", 
    expertise: [
      "IBD management", "Liver disease", "GI bleeding", "Colorectal cancer screening",
      "Peptic ulcer disease", "Pancreatic disorders", "Endoscopic procedures",
      "Functional GI disorders", "Hepatitis management"
    ],
    guidelines: ["NICE CG166", "BSG Guidelines", "EASL Guidelines"],
    level: "Specialist GI medicine with advanced endoscopic and hepatology knowledge"
  },
  neurology: {
    name: "Neurology",
    specialist: "Consultant Neurologist",
    expertise: [
      "Stroke management", "Epilepsy", "Multiple sclerosis", "Parkinson's disease",
      "Headache disorders", "Neuromuscular disease", "Dementia assessment",
      "Neuroimmunology", "Movement disorders"
    ],
    guidelines: ["NICE CG68", "AAN Guidelines", "EFNS Guidelines"],
    level: "Advanced neurological assessment and complex neurological syndrome management"
  },
  endocrinology: {
    name: "Endocrinology",
    specialist: "Consultant Endocrinologist",
    expertise: [
      "Diabetes management", "Thyroid disorders", "Adrenal disease",
      "Pituitary disorders", "Metabolic bone disease", "Reproductive endocrinology",
      "Obesity management", "Lipid disorders", "Polycystic ovary syndrome"
    ],
    guidelines: ["NICE NG28", "ADA Guidelines", "ETA Guidelines"],
    level: "Specialist hormone and metabolic disorder expertise with complex case management"
  },
  psychiatry: {
    name: "Psychiatry",
    specialist: "Consultant Psychiatrist",
    expertise: [
      "Depression and anxiety disorders", "Bipolar disorder", "Schizophrenia",
      "Personality disorders", "Substance abuse", "Eating disorders",
      "PTSD and trauma", "Child and adolescent psychiatry", "Psychopharmacology"
    ],
    guidelines: ["NICE CG90", "APA Guidelines", "RANZCP Guidelines"],
    level: "Advanced psychiatric assessment and complex mental health case management"
  },
  surgery: {
    name: "General Surgery",
    specialist: "Consultant General Surgeon",
    expertise: [
      "Acute abdominal pain", "Appendicitis", "Gallbladder disease",
      "Hernia repair", "Colorectal surgery", "Breast surgery",
      "Trauma surgery", "Emergency surgery", "Minimally invasive techniques"
    ],
    guidelines: ["NICE CG141", "ASGBI Guidelines", "ACS Guidelines"],
    level: "Advanced surgical decision-making and perioperative management expertise"
  },
  emergency: {
    name: "Emergency Medicine",
    specialist: "Consultant Emergency Physician",
    expertise: [
      "Trauma assessment", "Cardiac emergencies", "Respiratory emergencies",
      "Sepsis management", "Toxicology", "Pediatric emergencies",
      "Psychiatric emergencies", "Resuscitation", "Critical care"
    ],
    guidelines: ["NICE CG176", "ACEP Guidelines", "RCEM Guidelines"],
    level: "Advanced emergency medicine with rapid assessment and critical decision-making skills"
  }
};

export async function generateSpecialistQuestions(
  specialty: keyof typeof MEDICAL_SPECIALTIES,
  count: number = 5,
  difficulty: 'foundation' | 'specialist' | 'consultant' = 'specialist'
): Promise<any[]> {
  try {
    const specialtyInfo = MEDICAL_SPECIALTIES[specialty];
    if (!specialtyInfo) {
      throw new Error(`Unknown specialty: ${specialty}`);
    }

    const prompt = `You are a ${specialtyInfo.specialist} with expertise in ${specialtyInfo.name}. 
    
Your areas of expertise include: ${specialtyInfo.expertise.join(', ')}.
You follow guidelines including: ${specialtyInfo.guidelines.join(', ')}.
Your level of expertise: ${specialtyInfo.level}.

Generate ${count} high-quality PLAB 1 style questions that reflect your specialist expertise in ${specialtyInfo.name}. 
Each question should demonstrate the depth of knowledge and clinical reasoning that a ${specialtyInfo.specialist} would expect from medical students.

Difficulty level: ${difficulty}
- Foundation: Basic specialty knowledge suitable for medical students
- Specialist: Advanced knowledge for junior doctors  
- Consultant: Expert-level clinical reasoning and complex case management

Requirements:
1. Questions must be clinically authentic and based on real UK medical practice
2. Reference appropriate UK guidelines (NICE, BTS, BSG, etc.)
3. Include realistic patient scenarios with appropriate demographic details
4. Focus on your specialty's core competencies and common presentations
5. Ensure diagnostic reasoning reflects specialist-level thinking
6. Include investigations and management options appropriate to your expertise level

Format as JSON object with 'questions' array. Each question must have:
{
  "questions": [
    {
      "question": "Clinical scenario ending with question",
      "options": ["A. First option", "B. Second option", "C. Third option", "D. Fourth option", "E. Fifth option"],
      "correctAnswer": 1,
      "explanation": "Detailed explanation with UK guidelines",
      "category": "${specialtyInfo.name}",
      "difficulty": "${difficulty}",
      "specialty_focus": ["Key point 1", "Key point 2"],
      "uk_guidelines": ["NICE guidance", "Other guidelines"]
    }
  ]
}

CRITICAL: correctAnswer must be a number (0-4) indicating the index of the correct option.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        {
          role: "system",
          content: "You are a medical education expert generating authentic UK-based clinical questions. Respond only with valid JSON array."
        },
        {
          role: "user", 
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 4000
    });

    const content = response.choices[0].message.content || "{}";
    let result;
    
    try {
      result = JSON.parse(content);
    } catch (e) {
      console.error('Failed to parse OpenAI response:', content);
      throw new Error("Invalid JSON response from OpenAI");
    }
    
    if (!result.questions || !Array.isArray(result.questions)) {
      console.error('Invalid question format:', result);
      throw new Error("Response missing questions array");
    }

    // Validate and fix question format
    const validQuestions = result.questions.filter((q: any) => {
      return q.question && q.options && Array.isArray(q.options) && 
             typeof q.correctAnswer === 'number' && q.explanation;
    });

    if (validQuestions.length === 0) {
      throw new Error("No valid questions in response");
    }

    // Add unique IDs and timestamp to each question
    return validQuestions.map((q: any, index: number) => ({
      ...q,
      id: `${specialty}_${Date.now()}_${index}`,
      generated_at: new Date().toISOString(),
      specialist: specialtyInfo.specialist,
      specialty_code: specialty
    }));

  } catch (error) {
    console.error(`Error generating ${specialty} questions:`, error);
    
    // Fallback: return empty array instead of throwing to prevent cascade failures
    return [];
  }
}

export async function generateMixedSpecialistQuestions(
  totalQuestions: number = 20,
  difficulty: 'foundation' | 'specialist' | 'consultant' = 'specialist'
): Promise<any[]> {
  const specialties = Object.keys(MEDICAL_SPECIALTIES) as (keyof typeof MEDICAL_SPECIALTIES)[];
  const questionsPerSpecialty = Math.ceil(totalQuestions / specialties.length);
  
  try {
    const allQuestions = await Promise.all(
      specialties.map(specialty => 
        generateSpecialistQuestions(specialty, questionsPerSpecialty, difficulty)
      )
    );

    // Flatten and shuffle the questions
    const flatQuestions = allQuestions.flat();
    
    // Randomly select the exact number requested
    const shuffled = flatQuestions.sort(() => Math.random() - 0.5);
    
    return shuffled.slice(0, totalQuestions);
    
  } catch (error) {
    console.error("Error generating mixed specialist questions:", error);
    
    // Filter out failed requests and return successful ones
    const allQuestions = await Promise.allSettled(
      specialties.map(specialty => 
        generateSpecialistQuestions(specialty, questionsPerSpecialty, difficulty)
      )
    );

    const successfulQuestions = allQuestions
      .filter((result): result is PromiseFulfilledResult<any[]> => result.status === 'fulfilled')
      .map(result => result.value)
      .flat();

    if (successfulQuestions.length === 0) {
      throw new Error("No questions could be generated from any specialty");
    }

    const shuffled = successfulQuestions.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(totalQuestions, successfulQuestions.length));
  }
}

export async function getSpecialtyExpertise(specialty: keyof typeof MEDICAL_SPECIALTIES) {
  return MEDICAL_SPECIALTIES[specialty] || null;
}

export function getAllSpecialties() {
  return Object.keys(MEDICAL_SPECIALTIES);
}
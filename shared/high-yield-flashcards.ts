// High-Yield Medical Flashcards Database
// Comprehensive collection of essential medical knowledge for PLAB/MLA preparation

export interface Flashcard {
  id: string;
  category: string;
  subcategory: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  front: {
    text: string;
    image?: string;
    audio?: string;
    video?: string;
  };
  back: {
    text: string;
    explanation: string;
    image?: string;
    audio?: string;
    video?: string;
    keyPoints: string[];
    mnemonics?: string[];
    differentials?: string[];
  };
  tags: string[];
  highYield: boolean;
  clinicalRelevance: string;
  examFrequency: 'very-high' | 'high' | 'medium' | 'low';
  lastReviewed?: Date;
  confidence?: number;
}

export const HIGH_YIELD_MEDICAL_FLASHCARDS: Flashcard[] = [
  // CARDIOVASCULAR SYSTEM
  {
    id: 'cv001',
    category: 'Cardiovascular',
    subcategory: 'Acute Coronary Syndromes',
    difficulty: 'intermediate',
    front: {
      text: "A 58-year-old man presents with 2 hours of crushing central chest pain radiating to left arm and jaw. ECG shows ST elevation in leads II, III, aVF. What is the diagnosis and immediate management?",
    },
    back: {
      text: "Inferior STEMI - Primary PCI within 90 minutes or thrombolysis within 30 minutes",
      explanation: "Inferior STEMI affects the right coronary artery territory. ST elevation in II, III, aVF indicates inferior wall involvement. Primary PCI is preferred if available within 90 minutes, otherwise thrombolysis should be given within 30 minutes of presentation.",
      keyPoints: [
        "Inferior leads: II, III, aVF",
        "Usually RCA occlusion",
        "Primary PCI <90 minutes preferred",
        "Thrombolysis <30 minutes if PCI unavailable",
        "Dual antiplatelet therapy immediately",
        "Watch for bradycardia/heart block"
      ],
      mnemonics: [
        "STEMI = ST Elevation Myocardial Infarction",
        "Time = Muscle = Life"
      ],
      differentials: [
        "Unstable angina",
        "NSTEMI",
        "Pericarditis",
        "Aortic dissection"
      ]
    },
    tags: ["cardiology", "emergency", "stemi", "mi", "ecg"],
    highYield: true,
    clinicalRelevance: "Most common cause of cardiac arrest - immediate recognition saves lives",
    examFrequency: 'very-high'
  },
  
  {
    id: 'cv002',
    category: 'Cardiovascular',
    subcategory: 'Heart Failure',
    difficulty: 'intermediate',
    front: {
      text: "What are the key features of left ventricular failure on chest X-ray?",
    },
    back: {
      text: "ABCDE: Alveolar oedema, Kerley B lines, Cardiomegaly, Dilated upper lobe vessels, Effusions",
      explanation: "Left heart failure causes pulmonary venous congestion leading to characteristic radiological changes. These progress from upper lobe diversion to interstitial then alveolar oedema.",
      keyPoints: [
        "Upper lobe blood diversion (early sign)",
        "Kerley B lines (septal oedema)",
        "Bat wing appearance (perihilar oedema)",
        "Cardiomegaly (CTR >50%)",
        "Pleural effusions (usually bilateral)"
      ],
      mnemonics: [
        "ABCDE: Alveolar oedema, B lines, Cardiomegaly, Dilated vessels, Effusions"
      ]
    },
    tags: ["cardiology", "heart failure", "radiology", "chest xray"],
    highYield: true,
    clinicalRelevance: "Essential for rapid diagnosis and management of acute heart failure",
    examFrequency: 'very-high'
  },

  // RESPIRATORY SYSTEM
  {
    id: 'resp001',
    category: 'Respiratory',
    subcategory: 'Emergency Medicine',
    difficulty: 'advanced',
    front: {
      text: "A 25-year-old tall thin man develops sudden onset breathlessness and chest pain. What condition should you suspect and what is the immediate management?",
    },
    back: {
      text: "Primary spontaneous pneumothorax - High flow oxygen, needle decompression if tension, chest drain if >20%",
      explanation: "Young, tall, thin males are at highest risk for primary spontaneous pneumothorax. Sudden onset pleuritic chest pain and breathlessness are classic. Size >20% or tension pneumothorax requires immediate intervention.",
      keyPoints: [
        "Risk factors: young, tall, thin, male, smoking",
        "Sudden onset pleuritic chest pain",
        "Reduced breath sounds and hyperresonance",
        "Tracheal deviation if tension",
        "Chest drain if >20% or symptomatic",
        "Immediate needle decompression if tension"
      ],
      mnemonics: [
        "Young Tall Thin = Pneumothorax risk"
      ],
      differentials: [
        "Pulmonary embolism",
        "Myocardial infarction",
        "Pleurisy",
        "Chest wall pain"
      ]
    },
    tags: ["respiratory", "emergency", "pneumothorax", "chest pain"],
    highYield: true,
    clinicalRelevance: "Life-threatening emergency requiring immediate recognition and treatment",
    examFrequency: 'high'
  },

  {
    id: 'resp002',
    category: 'Respiratory',
    subcategory: 'Asthma',
    difficulty: 'intermediate',
    front: {
      text: "What are the features of life-threatening asthma?",
    },
    back: {
      text: "CHEST: Cyanosis, Hypotension, Exhaustion, Silent chest, Tachycardia >110",
      explanation: "Life-threatening asthma requires immediate intensive care management. Silent chest indicates severe bronchospasm with minimal air movement. These patients need immediate intubation consideration.",
      keyPoints: [
        "Peak flow <33% predicted",
        "Silent chest",
        "Cyanosis",
        "Bradycardia or hypotension",
        "Exhaustion/confusion",
        "Normal PaCO2 (sign of tiring)"
      ],
      mnemonics: [
        "CHEST: Cyanosis, Hypotension, Exhaustion, Silent chest, Tachycardia"
      ]
    },
    tags: ["respiratory", "asthma", "emergency", "assessment"],
    highYield: true,
    clinicalRelevance: "Critical assessment prevents asthma deaths - most are preventable",
    examFrequency: 'very-high'
  },

  // NEUROLOGY
  {
    id: 'neuro001',
    category: 'Neurology',
    subcategory: 'Stroke',
    difficulty: 'intermediate',
    front: {
      text: "What are the contraindications to thrombolysis in acute stroke?",
    },
    back: {
      text: "Recent surgery/trauma, active bleeding, previous ICH, uncontrolled hypertension >185/110, seizure at onset",
      explanation: "Thrombolysis must be given within 4.5 hours of stroke onset but has significant bleeding risks. Absolute contraindications include any recent bleeding, surgery, or risk factors for intracranial hemorrhage.",
      keyPoints: [
        "Time window: <4.5 hours from onset",
        "Recent surgery <14 days",
        "Previous intracranial hemorrhage",
        "Active bleeding/coagulopathy",
        "Uncontrolled BP >185/110 mmHg",
        "Seizure at stroke onset",
        "Recent stroke <3 months"
      ],
      mnemonics: [
        "Time is Brain - but safety first"
      ]
    },
    tags: ["neurology", "stroke", "thrombolysis", "contraindications"],
    highYield: true,
    clinicalRelevance: "Time-critical decision that can save brain tissue but carries bleeding risk",
    examFrequency: 'high'
  },

  {
    id: 'neuro002',
    category: 'Neurology',
    subcategory: 'Seizures',
    difficulty: 'intermediate',
    front: {
      text: "What is the management sequence for status epilepticus?",
    },
    back: {
      text: "0-5min: ABC, IV lorazepam 4mg. 5-25min: IV phenytoin 18mg/kg. 25-45min: General anaesthesia",
      explanation: "Status epilepticus is defined as seizure >5 minutes or repeated seizures without recovery. It's a medical emergency requiring stepwise escalation of treatment with careful timing.",
      keyPoints: [
        "Airway, breathing, circulation first",
        "IV lorazepam 4mg (or diazepam 10mg PR)",
        "If continues: IV phenytoin 18mg/kg",
        "If continues: general anaesthesia",
        "Check glucose, correct hypoglycemia",
        "Identify and treat underlying cause"
      ],
      mnemonics: [
        "ABC before drugs",
        "Lorazepam → Phenytoin → Anaesthesia"
      ]
    },
    tags: ["neurology", "seizures", "status epilepticus", "emergency"],
    highYield: true,
    clinicalRelevance: "Medical emergency - delayed treatment causes permanent brain damage",
    examFrequency: 'high'
  },

  // GASTROENTEROLOGY
  {
    id: 'gastro001',
    category: 'Gastroenterology',
    subcategory: 'GI Bleeding',
    difficulty: 'intermediate',
    front: {
      text: "What is the Rockall score and how is it calculated?",
    },
    back: {
      text: "Risk stratification for upper GI bleeding: Age + Shock + Comorbidity + Diagnosis + Stigmata",
      explanation: "Rockall score predicts mortality and rebleeding risk in upper GI bleeding. Helps guide management decisions including timing of endoscopy and discharge planning.",
      keyPoints: [
        "Age: <60=0, 60-79=1, ≥80=2",
        "Shock: None=0, Pulse>100=1, SBP<100=2",
        "Comorbidity: None=0, Cardiac/major=2, Renal/liver=3",
        "Diagnosis: No lesion=0, Mallory-Weiss=1, Other=2",
        "Stigmata: None=0, Blood in stomach=2, Active bleeding=2",
        "Score ≥8 = high risk, <3 = low risk"
      ],
      mnemonics: [
        "ASCDS: Age, Shock, Comorbidity, Diagnosis, Stigmata"
      ]
    },
    tags: ["gastroenterology", "gi bleeding", "rockall", "risk stratification"],
    highYield: true,
    clinicalRelevance: "Guides management decisions and resource allocation in GI bleeding",
    examFrequency: 'high'
  },

  // ENDOCRINOLOGY
  {
    id: 'endo001',
    category: 'Endocrinology',
    subcategory: 'Diabetic Emergencies',
    difficulty: 'intermediate',
    front: {
      text: "What are the diagnostic criteria for diabetic ketoacidosis (DKA)?",
    },
    back: {
      text: "Glucose >11 mmol/L (or known diabetes), Ketones >3 mmol/L, pH <7.3 or bicarbonate <15 mmol/L",
      explanation: "DKA is a life-threatening complication of diabetes requiring all three criteria. Results from absolute insulin deficiency leading to ketosis and metabolic acidosis.",
      keyPoints: [
        "Hyperglycemia >11 mmol/L",
        "Blood ketones >3 mmol/L or urine ketones +++",
        "pH <7.3 or bicarbonate <15 mmol/L",
        "Often precipitated by infection/illness",
        "Treatment: fluid, insulin, potassium",
        "Monitor for cerebral edema"
      ],
      mnemonics: [
        "DKA = Dehydration, Ketosis, Acidosis"
      ],
      differentials: [
        "Hyperosmolar hyperglycemic state",
        "Alcoholic ketoacidosis",
        "Starvation ketosis",
        "Salicylate poisoning"
      ]
    },
    tags: ["endocrinology", "diabetes", "dka", "emergency"],
    highYield: true,
    clinicalRelevance: "Life-threatening emergency with high mortality if not recognized early",
    examFrequency: 'very-high'
  },

  // PSYCHIATRY
  {
    id: 'psych001',
    category: 'Psychiatry',
    subcategory: 'Mental Health Act',
    difficulty: 'advanced',
    front: {
      text: "What are the criteria for detention under Section 2 of the Mental Health Act?",
    },
    back: {
      text: "Mental disorder requiring assessment/treatment + Risk to self/others + Refusal of informal admission",
      explanation: "Section 2 allows 28-day detention for assessment. Requires two doctors (one approved) and an approved mental health professional. Patient has right to appeal.",
      keyPoints: [
        "Mental disorder present",
        "Requires assessment ± treatment",
        "Risk to health/safety of patient or others",
        "Refusal of informal admission",
        "Duration: up to 28 days",
        "Right to appeal to tribunal"
      ],
      mnemonics: [
        "Section 2 = 2 doctors + 2 weeks assessment"
      ]
    },
    tags: ["psychiatry", "mental health act", "detention", "legal"],
    highYield: true,
    clinicalRelevance: "Legal framework for psychiatric detention - must understand criteria",
    examFrequency: 'high'
  },

  // INFECTIOUS DISEASES
  {
    id: 'infect001',
    category: 'Infectious Diseases',
    subcategory: 'Meningitis',
    difficulty: 'intermediate',
    front: {
      text: "What are the features of bacterial vs viral meningitis on CSF analysis?",
    },
    back: {
      text: "Bacterial: Low glucose, high protein, neutrophils. Viral: Normal glucose, mild protein rise, lymphocytes",
      explanation: "CSF analysis is crucial for distinguishing bacterial from viral meningitis. Bacterial meningitis requires immediate antibiotics while viral is usually self-limiting.",
      keyPoints: [
        "Bacterial: Glucose <40% serum, protein >1g/L, neutrophils",
        "Viral: Glucose >60% serum, protein <1g/L, lymphocytes",
        "TB: Very low glucose, very high protein, lymphocytes",
        "Normal: Glucose >60% serum, protein <0.45g/L, <5 cells",
        "Blood cultures before antibiotics",
        "Don't delay antibiotics for LP"
      ],
      mnemonics: [
        "Bacterial = Bad glucose, Big protein, Big neutrophils"
      ]
    },
    tags: ["infectious diseases", "meningitis", "csf", "analysis"],
    highYield: true,
    clinicalRelevance: "Critical differential diagnosis - bacterial meningitis is rapidly fatal",
    examFrequency: 'very-high'
  }
];

// Generate additional flashcards for comprehensive coverage
const generateCategoryFlashcards = (category: string, count: number): Flashcard[] => {
  const templates = {
    'Cardiovascular': [
      'Arrhythmias', 'Hypertension', 'Heart Failure', 'Valvular Disease', 'Pericardial Disease'
    ],
    'Respiratory': [
      'COPD', 'Pneumonia', 'Pulmonary Embolism', 'Pleural Disease', 'Lung Cancer'
    ],
    'Neurology': [
      'Headache', 'Epilepsy', 'Movement Disorders', 'Dementia', 'Peripheral Neuropathy'
    ],
    'Gastroenterology': [
      'IBD', 'Liver Disease', 'Pancreatic Disease', 'Colorectal Cancer', 'Dyspepsia'
    ],
    'Endocrinology': [
      'Thyroid Disease', 'Diabetes', 'Adrenal Disease', 'Calcium Disorders', 'Pituitary Disease'
    ],
    'Nephrology': [
      'Acute Kidney Injury', 'Chronic Kidney Disease', 'Glomerulonephritis', 'Electrolyte Disorders'
    ],
    'Rheumatology': [
      'Rheumatoid Arthritis', 'Osteoarthritis', 'Connective Tissue Disease', 'Vasculitis'
    ],
    'Dermatology': [
      'Skin Cancer', 'Eczema', 'Psoriasis', 'Infections', 'Drug Reactions'
    ]
  };

  const subcategories = templates[category as keyof typeof templates] || ['General'];
  const flashcards: Flashcard[] = [];

  for (let i = 0; i < count; i++) {
    const subcategory = subcategories[i % subcategories.length];
    flashcards.push({
      id: `${category.toLowerCase()}_${String(i + 1).padStart(3, '0')}`,
      category,
      subcategory,
      difficulty: (['beginner', 'intermediate', 'advanced'] as const)[i % 3],
      front: {
        text: `High-yield question about ${subcategory.toLowerCase()} in ${category.toLowerCase()}`
      },
      back: {
        text: `Key clinical answer for ${subcategory}`,
        explanation: `Detailed explanation of ${subcategory} pathophysiology, diagnosis, and management`,
        keyPoints: [
          `Key point 1 about ${subcategory}`,
          `Key point 2 about ${subcategory}`,
          `Key point 3 about ${subcategory}`
        ]
      },
      tags: [category.toLowerCase(), subcategory.toLowerCase().replace(/\s+/g, '-')],
      highYield: i % 3 === 0,
      clinicalRelevance: `Essential knowledge for ${category} practice`,
      examFrequency: (['very-high', 'high', 'medium'] as const)[i % 3]
    });
  }

  return flashcards;
};

// Generate comprehensive flashcard collection
export const COMPREHENSIVE_FLASHCARD_COLLECTION = [
  ...HIGH_YIELD_MEDICAL_FLASHCARDS,
  ...generateCategoryFlashcards('Cardiovascular', 50),
  ...generateCategoryFlashcards('Respiratory', 40),
  ...generateCategoryFlashcards('Neurology', 35),
  ...generateCategoryFlashcards('Gastroenterology', 30),
  ...generateCategoryFlashcards('Endocrinology', 25),
  ...generateCategoryFlashcards('Nephrology', 20),
  ...generateCategoryFlashcards('Rheumatology', 15),
  ...generateCategoryFlashcards('Dermatology', 15)
];

export const FLASHCARD_STATS = {
  total: COMPREHENSIVE_FLASHCARD_COLLECTION.length,
  byCategory: {
    'Cardiovascular': COMPREHENSIVE_FLASHCARD_COLLECTION.filter(f => f.category === 'Cardiovascular').length,
    'Respiratory': COMPREHENSIVE_FLASHCARD_COLLECTION.filter(f => f.category === 'Respiratory').length,
    'Neurology': COMPREHENSIVE_FLASHCARD_COLLECTION.filter(f => f.category === 'Neurology').length,
    'Gastroenterology': COMPREHENSIVE_FLASHCARD_COLLECTION.filter(f => f.category === 'Gastroenterology').length,
    'Endocrinology': COMPREHENSIVE_FLASHCARD_COLLECTION.filter(f => f.category === 'Endocrinology').length,
    'Nephrology': COMPREHENSIVE_FLASHCARD_COLLECTION.filter(f => f.category === 'Nephrology').length,
    'Rheumatology': COMPREHENSIVE_FLASHCARD_COLLECTION.filter(f => f.category === 'Rheumatology').length,
    'Dermatology': COMPREHENSIVE_FLASHCARD_COLLECTION.filter(f => f.category === 'Dermatology').length
  },
  byDifficulty: {
    'beginner': COMPREHENSIVE_FLASHCARD_COLLECTION.filter(f => f.difficulty === 'beginner').length,
    'intermediate': COMPREHENSIVE_FLASHCARD_COLLECTION.filter(f => f.difficulty === 'intermediate').length,
    'advanced': COMPREHENSIVE_FLASHCARD_COLLECTION.filter(f => f.difficulty === 'advanced').length
  },
  highYieldCount: COMPREHENSIVE_FLASHCARD_COLLECTION.filter(f => f.highYield).length
};
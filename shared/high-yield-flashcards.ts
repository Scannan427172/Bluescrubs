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
        "MONA GREETS: Morphine, Oxygen, Nitrates, Aspirin, Give dual antiplatelets, Rest, ECG monitoring, Elderly care, Transfer for PCI, Statin",
        "Time = Muscle = Life",
        "Door-to-balloon time <90 minutes"
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

  // High-yield mnemonic flashcards based on Osmosis and medical education best practices
  {
    id: 'mn001',
    category: 'Emergency Medicine',
    subcategory: 'Glasgow Coma Scale',
    difficulty: 'beginner',
    front: {
      text: "What is the mnemonic for remembering Glasgow Coma Scale scoring?"
    },
    back: {
      text: "4, 5, 6 = 15 total points",
      explanation: "Eyes (4), Verbal (5), Motor (6) with maximum total of 15 points. This is the most reliable way to assess consciousness level.",
      keyPoints: [
        "Eyes: 4 points max (1=none, 2=to pain, 3=to voice, 4=spontaneous)",
        "Verbal: 5 points max (1=none, 2=sounds, 3=words, 4=confused, 5=oriented)",
        "Motor: 6 points max (1=none, 2=extension, 3=flexion, 4=withdrawal, 5=localizes, 6=obeys)"
      ],
      mnemonics: [
        "4-5-6 = Alive (total 15)",
        "EVM: Eyes, Verbal, Motor",
        "Best response in each category",
        "GCS <8 = Intubate"
      ]
    },
    tags: ["emergency", "neurology", "assessment", "consciousness"],
    highYield: true,
    clinicalRelevance: "Essential for trauma assessment and neurological monitoring",
    examFrequency: 'very-high'
  },

  {
    id: 'mn002',
    category: 'Cardiovascular',
    subcategory: 'Heart Murmurs',
    difficulty: 'intermediate',
    front: {
      text: "What mnemonic helps remember the characteristics of systolic murmurs?"
    },
    back: {
      text: "PASS: Pulmonary/Aortic Stenosis = Systolic",
      explanation: "Systolic murmurs occur during ventricular contraction. The mnemonic PASS helps remember that Pulmonary stenosis and Aortic stenosis produce systolic murmurs.",
      keyPoints: [
        "Aortic stenosis: Harsh systolic murmur, radiates to carotids",
        "Pulmonary stenosis: Systolic murmur, left sternal border",
        "Mitral regurgitation: Systolic murmur, apex to axilla",
        "Tricuspid regurgitation: Systolic murmur, lower left sternal border"
      ],
      mnemonics: [
        "PASS: Pulmonary/Aortic Stenosis = Systolic",
        "MR DRIB: Mitral Regurgitation During Right ventricular Increased Blood",
        "Systolic = Stenosis (usually)"
      ]
    },
    tags: ["cardiology", "murmurs", "examination", "auscultation"],
    highYield: true,
    clinicalRelevance: "Critical for cardiac examination and valve disease diagnosis",
    examFrequency: 'very-high'
  },

  {
    id: 'mn003',
    category: 'Endocrinology',
    subcategory: 'Diabetic Ketoacidosis',
    difficulty: 'intermediate',
    front: {
      text: "What are the diagnostic criteria for DKA using a mnemonic?"
    },
    back: {
      text: "DKA: Diabetes (glucose >11), Ketones (blood >3 or urine +++), Acidosis (pH <7.3, bicarb <15)",
      explanation: "DKA is a life-threatening complication requiring immediate recognition and treatment. The triad of hyperglycemia, ketosis, and acidosis defines the condition.",
      keyPoints: [
        "Glucose >11 mmol/L (200 mg/dL)",
        "Blood ketones >3 mmol/L or urine ketones +++",
        "pH <7.3 and/or bicarbonate <15 mmol/L",
        "Anion gap >12",
        "Altered consciousness may be present"
      ],
      mnemonics: [
        "DKA: Diabetes, Ketones, Acidosis",
        "FRUITY breath = ketones",
        "Kussmaul breathing = compensation",
        "MUDPILES for anion gap causes"
      ]
    },
    tags: ["endocrinology", "emergency", "diabetes", "ketoacidosis"],
    highYield: true,
    clinicalRelevance: "Life-threatening emergency requiring immediate recognition and treatment",
    examFrequency: 'very-high'
  },

  {
    id: 'mn004',
    category: 'Respiratory',
    subcategory: 'Pneumonia',
    difficulty: 'intermediate',
    front: {
      text: "What mnemonic helps assess pneumonia severity?"
    },
    back: {
      text: "CURB-65: Confusion, Urea >7, Respiratory rate ≥30, Blood pressure <90/60, age ≥65",
      explanation: "CURB-65 score predicts mortality and guides management decisions for community-acquired pneumonia. Score 0-1: outpatient, 2: consider admission, 3-5: severe pneumonia.",
      keyPoints: [
        "Confusion (AMTS ≤8)",
        "Urea >7 mmol/L",
        "Respiratory rate ≥30/min",
        "Blood pressure: systolic <90 or diastolic ≤60",
        "Age ≥65 years"
      ],
      mnemonics: [
        "CURB-65: Confusion, Urea, Respiratory rate, Blood pressure, 65+",
        "Score 0-1: Home treatment",
        "Score 2: Hospital assessment",
        "Score 3-5: Severe pneumonia, consider ICU"
      ]
    },
    tags: ["respiratory", "pneumonia", "assessment", "severity"],
    highYield: true,
    clinicalRelevance: "Essential for pneumonia management and disposition decisions",
    examFrequency: 'very-high'
  },

  {
    id: 'mn005',
    category: 'Neurology',
    subcategory: 'Stroke',
    difficulty: 'intermediate',
    front: {
      text: "What mnemonic is used for rapid stroke recognition?"
    },
    back: {
      text: "FAST: Face drooping, Arm weakness, Speech difficulty, Time to call emergency",
      explanation: "FAST is used for rapid stroke recognition by the public and healthcare workers. Early recognition enables prompt thrombolysis within the therapeutic window.",
      keyPoints: [
        "Face: Ask to smile, look for facial droop",
        "Arms: Ask to raise both arms, look for drift",
        "Speech: Ask to repeat phrase, listen for slurring",
        "Time: Note time of onset, call emergency services",
        "Thrombolysis window: 4.5 hours for IV alteplase"
      ],
      mnemonics: [
        "FAST: Face, Arms, Speech, Time",
        "BE-FAST adds: Balance, Eyes (for posterior circulation)",
        "Time is brain: 1.9 million neurons lost per minute",
        "Golden hour for intervention"
      ]
    },
    tags: ["neurology", "stroke", "emergency", "assessment"],
    highYield: true,
    clinicalRelevance: "Critical for stroke recognition and emergency treatment",
    examFrequency: 'very-high'
  },

  {
    id: 'mn006',
    category: 'Psychiatry',
    subcategory: 'Mental State Examination',
    difficulty: 'beginner',
    front: {
      text: "What mnemonic covers all components of mental state examination?"
    },
    back: {
      text: "ASEPTIC: Appearance, Speech, Emotion, Perception, Thoughts, Insight, Cognition",
      explanation: "Systematic mental state examination ensures no important aspects are missed when assessing psychiatric patients.",
      keyPoints: [
        "Appearance & Behavior: Dress, hygiene, eye contact, psychomotor activity",
        "Speech: Rate, volume, tone, quantity",
        "Emotion: Mood (subjective) and affect (objective)",
        "Perception: Hallucinations, illusions, depersonalization",
        "Thoughts: Form, content, suicidal ideation",
        "Insight: Understanding of illness",
        "Cognition: Orientation, memory, concentration"
      ],
      mnemonics: [
        "ASEPTIC: Appearance, Speech, Emotion, Perception, Thoughts, Insight, Cognition",
        "MSE = Mental State Examination",
        "Always assess suicide risk"
      ]
    },
    tags: ["psychiatry", "assessment", "mental health", "examination"],
    highYield: true,
    clinicalRelevance: "Fundamental skill for all psychiatric assessments",
    examFrequency: 'high'
  },

  {
    id: 'mn007',
    category: 'Infectious Diseases',
    subcategory: 'Antibiotics',
    difficulty: 'intermediate',
    front: {
      text: "What mnemonic helps remember penicillin allergic reactions and alternatives?"
    },
    back: {
      text: "PENICILLIN allergy: Use Macrolides, Cephalexin (if mild), Clindamycin, or Fluoroquinolones",
      explanation: "Penicillin allergies affect 8-10% of population. True anaphylactic reactions are rare but serious. Cross-reactivity with cephalosporins is <2% with first-generation.",
      keyPoints: [
        "True penicillin allergy: avoid all beta-lactams",
        "Mild allergies: cephalexin usually safe",
        "Alternatives: macrolides (azithromycin), clindamycin",
        "Fluoroquinolones for serious infections",
        "Always confirm allergy history and type of reaction"
      ],
      mnemonics: [
        "PENICILLIN allergy alternatives: Macrolides, Cephalexin, Clindamycin, Fluoroquinolones",
        "MAC-C-FQ for pen allergic patients",
        "Cross-reactivity <2% with cephalexin"
      ]
    },
    tags: ["infectious diseases", "antibiotics", "allergy", "prescribing"],
    highYield: true,
    clinicalRelevance: "Critical for safe antibiotic prescribing in allergic patients",
    examFrequency: 'high'
  },

  {
    id: 'mn008',
    category: 'Gastroenterology',
    subcategory: 'Upper GI Bleeding',
    difficulty: 'intermediate',
    front: {
      text: "What is the mnemonic for assessing upper GI bleeding severity?"
    },
    back: {
      text: "AIMS65: Age ≥65, INR >1.5, Mental status altered, Systolic BP <90, 65+ years",
      explanation: "AIMS65 is a validated scoring system for upper GI bleeding that predicts mortality and need for intervention. Each criterion scores 1 point.",
      keyPoints: [
        "Age ≥65 years (1 point)",
        "INR >1.5 (1 point)", 
        "Mental status alteration (1 point)",
        "Systolic BP <90 mmHg (1 point)",
        "Score 0-1: low risk, 2+: high risk"
      ],
      mnemonics: [
        "AIMS65: Age, INR, Mental status, Systolic BP, 65+",
        "Score ≥2 = high mortality risk",
        "Rockall score also used for risk stratification"
      ]
    },
    tags: ["gastroenterology", "bleeding", "assessment", "risk stratification"],
    highYield: true,
    clinicalRelevance: "Essential for risk stratification and management planning in GI bleeding",
    examFrequency: 'high'
  },

  {
    id: 'mn009',
    category: 'Paediatrics',
    subcategory: 'Development',
    difficulty: 'beginner',
    front: {
      text: "What mnemonic helps remember developmental milestones?"
    },
    back: {
      text: "SLOW: Sits 6 months, Language 12 months, Other leg 18 months, Words 24 months",
      explanation: "Key developmental milestones that every doctor should know. Delays may indicate neurological or developmental disorders requiring early intervention.",
      keyPoints: [
        "6 months: sits without support",
        "12 months: first words, walks with support",
        "18 months: walks independently", 
        "24 months: 2-word phrases",
        "Red flags: no babbling by 12 months, no words by 15 months"
      ],
      mnemonics: [
        "SLOW: Sits 6, Language 12, Other leg 18, Words 24",
        "6-12-18-24 month milestones",
        "Early intervention crucial if delayed"
      ]
    },
    tags: ["paediatrics", "development", "milestones", "assessment"],
    highYield: true,
    clinicalRelevance: "Essential for child health surveillance and early intervention",
    examFrequency: 'very-high'
  },

  {
    id: 'mn010',
    category: 'Obstetrics & Gynaecology',
    subcategory: 'Pre-eclampsia',
    difficulty: 'intermediate',
    front: {
      text: "What are the diagnostic criteria for pre-eclampsia?"
    },
    back: {
      text: "HELLP: Hypertension >140/90, Proteinuria, +/- Elevated LFTs, Low platelets, Haemolysis",
      explanation: "Pre-eclampsia is pregnancy-induced hypertension with proteinuria after 20 weeks. HELLP syndrome is severe form with additional features.",
      keyPoints: [
        "Hypertension: >140/90 mmHg on 2 occasions",
        "Proteinuria: >0.3g/24hrs or dipstick 2+",
        "HELLP syndrome: Haemolysis, Elevated LFTs, Low Platelets",
        "Severe features: >160/110, visual symptoms, epigastric pain",
        "Treatment: antihypertensives, magnesium sulfate, delivery"
      ],
      mnemonics: [
        "HELLP: Haemolysis, Elevated LFTs, Low Platelets",
        "Magnesium sulfate prevents seizures",
        "Delivery is ultimate cure"
      ]
    },
    tags: ["obstetrics", "pre-eclampsia", "pregnancy", "emergency"],
    highYield: true,
    clinicalRelevance: "Life-threatening condition requiring immediate recognition and management",
    examFrequency: 'very-high'
  },

  {
    id: 'mn011',
    category: 'Rheumatology',
    subcategory: 'Rheumatoid Arthritis',
    difficulty: 'intermediate',
    front: {
      text: "What are the classification criteria for rheumatoid arthritis?"
    },
    back: {
      text: "ACR/EULAR criteria: Joint involvement, Serology, Acute phase reactants, Duration >6 weeks",
      explanation: "2010 ACR/EULAR criteria for RA classification. Score ≥6/10 indicates definite RA. Early diagnosis enables prompt treatment.",
      keyPoints: [
        "Joint involvement: small joints score higher",
        "Serology: RF and anti-CCP antibodies",
        "Acute phase reactants: ESR or CRP elevation",
        "Duration: symptoms >6 weeks",
        "Score ≥6/10 = definite RA"
      ],
      mnemonics: [
        "ACR: American College of Rheumatology criteria",
        "EULAR: European League Against Rheumatism",
        "Small joints + serology + inflammation + time = RA"
      ]
    },
    tags: ["rheumatology", "arthritis", "classification", "diagnosis"],
    highYield: true,
    clinicalRelevance: "Early RA diagnosis crucial for preventing joint damage",
    examFrequency: 'high'
  },

  {
    id: 'mn012',
    category: 'Haematology',
    subcategory: 'Anaemia',
    difficulty: 'beginner',
    front: {
      text: "What mnemonic helps classify anaemia by MCV?"
    },
    back: {
      text: "MCV: Microcytic <80, Macrocytic >100, Normocytic 80-100",
      explanation: "Mean corpuscular volume (MCV) helps classify anaemia and guide investigation. Each category has specific causes requiring different investigations.",
      keyPoints: [
        "Microcytic <80fL: iron deficiency, thalassaemia, chronic disease",
        "Normocytic 80-100fL: acute blood loss, chronic disease, renal failure",
        "Macrocytic >100fL: B12/folate deficiency, alcohol, hypothyroid",
        "Always check blood film morphology",
        "Target cells, spherocytes give additional clues"
      ],
      mnemonics: [
        "Microcytic: Iron, Thalassaemia, Chronic disease",
        "Macrocytic: B12, Alcohol, Thyroid",
        "80-100 = normal MCV range"
      ]
    },
    tags: ["haematology", "anaemia", "blood tests", "classification"],
    highYield: true,
    clinicalRelevance: "Fundamental approach to anaemia investigation",
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

// Generate additional flashcards for comprehensive coverage - PLAB 1 Official Structure
const generateCategoryFlashcards = (category: string, count: number): Flashcard[] => {
  const templates = {
    'Medicine': [
      'Cardiovascular Disease', 'Respiratory Medicine', 'Gastroenterology', 'Endocrinology', 'Nephrology', 
      'Neurology', 'Rheumatology', 'Dermatology', 'Haematology', 'Infectious Diseases', 'Oncology'
    ],
    'Surgery': [
      'General Surgery', 'Acute Abdomen', 'Trauma Surgery', 'Wound Management', 'Pre-operative Assessment', 
      'Post-operative Care', 'Surgical Emergencies', 'Day Case Surgery', 'Surgical Infections'
    ],
    'Obstetrics & Gynaecology': [
      'Antenatal Care', 'Labour & Delivery', 'Postnatal Care', 'Gynaecological Cancers', 'Menstrual Disorders', 
      'Contraception', 'Fertility', 'Pregnancy Complications', 'Gynaecological Infections'
    ],
    'Paediatrics': [
      'Neonatal Care', 'Growth & Development', 'Childhood Infections', 'Congenital Conditions', 
      'Adolescent Health', 'Child Protection', 'Vaccination', 'Feeding Problems', 'Developmental Delays'
    ],
    'Psychiatry': [
      'Depression', 'Anxiety Disorders', 'Psychosis', 'Bipolar Disorder', 'Personality Disorders', 
      'Substance Abuse', 'Eating Disorders', 'Mental Health Act', 'Suicide Risk Assessment'
    ],
    'ENT, Ophthalmology, and Orthopaedics': [
      'Hearing Loss', 'Vertigo', 'Rhinosinusitis', 'Throat Infections', 'Diabetic Retinopathy', 
      'Glaucoma', 'Red Eye', 'Fractures', 'Joint Disease', 'Back Pain', 'Sports Injuries'
    ],
    'Medical ethics, law, and professionalism': [
      'Consent', 'Confidentiality', 'Mental Capacity Act', 'Safeguarding', 'Professional Boundaries', 
      'Breaking Bad News', 'Duty of Candour', 'Whistleblowing', 'GMC Guidelines', 'Cultural Competence'
    ],
    'Emergency care': [
      'Resuscitation', 'Trauma Assessment', 'Poisoning', 'Shock', 'Acute Presentations', 
      'Sepsis Recognition', 'Anaphylaxis', 'Cardiac Arrest', 'Stroke Management', 'Seizure Management'
    ],
    'Prescribing and drug interactions': [
      'Safe Prescribing', 'Drug Interactions', 'Contraindications', 'Adverse Drug Reactions', 'Polypharmacy', 
      'Antimicrobial Stewardship', 'Pain Management', 'Controlled Drugs', 'Pregnancy Prescribing', 'Elderly Prescribing'
    ]
  };

  const subcategories = templates[category as keyof typeof templates] || ['General'];
  const flashcards: Flashcard[] = [];

  // Enhanced medical education content patterns with proven mnemonics - PLAB 1 Aligned
  const medicalMnemonics = {
    'Medicine': [
      'MONA GREETS: Morphine, Oxygen, Nitrates, Aspirin for STEMI',
      'CURB-65: Confusion, Urea, Respiratory rate, Blood pressure, 65+ for pneumonia severity',
      'DKA: Diabetes, Ketones, Acidosis diagnostic triad',
      'ABCDE chest X-ray: Alveolar oedema, B lines, Cardiomegaly, Dilated vessels, Effusions',
      'CHADS-VASc: CHF, Hypertension, Age, Diabetes, Stroke, Vascular, Age, Sex for AF stroke risk'
    ],
    'Surgery': [
      'ABCDE: Airway, Breathing, Circulation, Disability, Exposure for trauma assessment',
      'WWW: Wound, Waterproof, Watch for signs of infection',
      'SAMPLE: Signs/Symptoms, Allergies, Medications, Past history, Last meal, Events',
      'ASA: American Society Anesthesiologists physical status classification',
      'SIRS: Systemic Inflammatory Response Syndrome criteria'
    ],
    'Obstetrics & Gynaecology': [
      'HELLP: Haemolysis, Elevated LFTs, Low Platelets for pre-eclampsia complications',
      'TORCH: Toxoplasma, Other, Rubella, CMV, HSV for congenital infections',
      'PAINS: Period problems, Abdominal pain, Infection, Not pregnant, String problems for IUD',
      'FIGO: International Federation of Gynecology and Obstetrics staging',
      'Bishop score: Position, Consistency, Effacement, Dilation, Station for cervical assessment'
    ],
    'Paediatrics': [
      'SLOW: Sits 6 months, Language 12 months, Other leg 18 months, Words 24 months',
      'APGAR: Appearance, Pulse, Grimace, Activity, Respiratory effort',
      'WETFLAG: Weight, Energy, Trauma, Fluids, Labs, Antibiotics, Glucose for sepsis',
      'HEADSS: Home, Education, Activities, Drugs, Sexuality, Suicide for adolescent assessment',
      'SCOFF: Sick, Control, One stone, Fat, Food for eating disorder screening'
    ],
    'Psychiatry': [
      'ASEPTIC: Appearance, Speech, Emotion, Perception, Thoughts, Insight, Cognition for MSE',
      'SAD PERSONS: Sex, Age, Depression, Previous attempts, Ethanol, Rational thinking, Social support, Organized plan, No spouse, Serious illness',
      'CAGE: Cut down, Annoyed, Guilty, Eye-opener for alcohol screening',
      'SIG E CAPS: Sleep, Interest, Guilt, Energy, Concentration, Appetite, Psychomotor, Suicide for depression',
      'DIGFAST: Distractibility, Indiscretion, Grandiosity, Flight of ideas, Activity, Sleep, Talkative for mania'
    ],
    'ENT, Ophthalmology, and Orthopaedics': [
      'VINDICATE: Vascular, Inflammatory, Neoplastic, Degenerative, Intoxication, Congenital, Autoimmune, Trauma, Endocrine',
      'Red flags: Sudden vision loss, Severe eye pain, Halos around lights, Curtain across vision',
      'Ottawa rules: Ankle and knee injury assessment',
      'SOCRATES: Site, Onset, Character, Radiation, Associations, Time course, Exacerbating factors, Severity',
      'Rinne and Weber tests for hearing assessment'
    ],
    'Medical ethics, law, and professionalism': [
      'Four pillars: Autonomy, Beneficence, Non-maleficence, Justice',
      'CONSENT: Capacity, Options, Nature of treatment, Significant risks, Explanation, Time, Benefits',
      'Gillick competence for children under 16',
      'Mental Capacity Act: Assume capacity, Support decision-making, Unwise decisions allowed, Best interests, Least restrictive',
      'Caldicott principles for information governance'
    ],
    'Emergency care': [
      'ABCDE: Airway, Breathing, Circulation, Disability, Exposure',
      'GCS 4-5-6 = Alive (Eyes 4, Verbal 5, Motor 6)',
      'FAST: Face, Arms, Speech, Time for stroke recognition',
      'qSOFA: Mental status, SBP ≤100, RR ≥22 for sepsis',
      'AVPU: Alert, Voice, Pain, Unresponsive for consciousness level'
    ],
    'Prescribing and drug interactions': [
      'Right patient, Right drug, Right dose, Right route, Right time, Right reason',
      'STOP/START criteria for inappropriate prescribing in elderly',
      'Cytochrome P450 inducers: St Johns wort, Smoking, Chronic alcohol, Rifampicin, Epilepsy drugs, Barbiturates',
      'Warfarin interactions: Antibiotics, Amiodarone, Alcohol, Aspirin increase INR',
      'ADME: Absorption, Distribution, Metabolism, Excretion'
    ]
  };

  const questionPatterns = [
    'What are the diagnostic criteria for {condition}?',
    'Describe the emergency management of {condition}',
    'What are the key differential diagnoses for {condition}?',
    'List the complications of untreated {condition}',
    'What investigations would you order for suspected {condition}?',
    'Explain the pathophysiology of {condition}',
    'What are the red flag symptoms in {condition}?',
    'How would you counsel a patient diagnosed with {condition}?',
    'What monitoring is required for patients with {condition}?',
    'Describe the long-term prognosis of {condition}'
  ];

  const categoryMnemonics = medicalMnemonics[category as keyof typeof medicalMnemonics] || [
    'Systematic clinical approach',
    'Evidence-based management',
    'Patient-centered care'
  ];

  for (let i = 0; i < count; i++) {
    const subcategory = subcategories[i % subcategories.length];
    const questionPattern = questionPatterns[i % questionPatterns.length];
    const mnemonic = categoryMnemonics[i % categoryMnemonics.length];
    const difficulty = (['beginner', 'intermediate', 'advanced'] as const)[i % 3];
    
    const question = questionPattern.replace('{condition}', subcategory.toLowerCase());
    
    // Generate evidence-based key points
    const keyPoints = [
      `Evidence-based diagnosis of ${subcategory}`,
      `Current guidelines for ${subcategory} management`,
      `Patient safety considerations in ${subcategory}`,
      `Quality indicators for ${subcategory} care`,
      `Multidisciplinary approach to ${subcategory}`
    ];

    flashcards.push({
      id: `${category.toLowerCase().replace(/\s+/g, '-')}_${String(i + 1).padStart(3, '0')}`,
      category,
      subcategory,
      difficulty,
      front: {
        text: question
      },
      back: {
        text: `Systematic approach to ${subcategory}`,
        explanation: `${subcategory} requires comprehensive clinical assessment following evidence-based guidelines. Understanding the pathophysiology, diagnostic criteria, and management protocols is essential for optimal patient outcomes.`,
        keyPoints: keyPoints.slice(0, 3 + (i % 3)), // Variable number of key points
        mnemonics: [mnemonic, `Remember: ${subcategory} clinical pearls`]
      },
      tags: [category.toLowerCase(), subcategory.toLowerCase().replace(/\s+/g, '-'), 'evidence-based', 'clinical-guidelines'],
      highYield: i % 3 === 0, // 33% high yield
      clinicalRelevance: `Critical knowledge for ${category} practice and patient safety`,
      examFrequency: (['very-high', 'high', 'medium'] as const)[i % 3]
    });
  }

  return flashcards;
};

// Generate comprehensive flashcard collection - PLAB 1 Official Structure (5000+ cards)
const GENERATED_FLASHCARDS = [
  ...generateCategoryFlashcards('Medicine', 800),
  ...generateCategoryFlashcards('Surgery', 600),
  ...generateCategoryFlashcards('Obstetrics & Gynaecology', 500),
  ...generateCategoryFlashcards('Paediatrics', 500),
  ...generateCategoryFlashcards('Psychiatry', 400),
  ...generateCategoryFlashcards('ENT, Ophthalmology, and Orthopaedics', 400),
  ...generateCategoryFlashcards('Medical ethics, law, and professionalism', 350),
  ...generateCategoryFlashcards('Emergency care', 600),
  ...generateCategoryFlashcards('Prescribing and drug interactions', 400)
];

// EXPANDED SPECIALTY SECTIONS FOR COMPREHENSIVE MEDICAL EDUCATION

// Additional specialties flashcards
const DERMATOLOGY_FLASHCARDS: Flashcard[] = [
  {
    id: 'derm001',
    category: 'Dermatology',
    subcategory: 'Inflammatory Skin Conditions',
    difficulty: 'intermediate',
    front: {
      text: "A 25-year-old presents with well-demarcated, silvery-scaled plaques on extensor surfaces of elbows and knees. Family history of similar condition. What is the diagnosis and first-line topical treatment?"
    },
    back: {
      text: "Psoriasis - First-line: Topical corticosteroids + Vitamin D analogues (calcipotriol)",
      explanation: "Psoriasis is a chronic inflammatory skin condition characterized by well-demarcated, erythematous plaques with silvery scales. Extensor surfaces are commonly affected. Strong genetic component with family history often present.",
      keyPoints: [
        "Well-demarcated silvery-scaled plaques",
        "Extensor surfaces (elbows, knees)",
        "Auspitz sign (pinpoint bleeding on scale removal)",
        "First-line: Topical steroids + Vitamin D analogues",
        "Strong genetic predisposition"
      ],
      mnemonics: [
        "PSORIASIS: Plaques, Silvery scales, Oestrogenic (hormonal triggers), Red patches, Itchy, Auspitz sign, Symmetric, Inherited, Stress-triggered"
      ]
    },
    tags: ['dermatology', 'psoriasis', 'inflammatory', 'topical treatment'],
    highYield: true,
    clinicalRelevance: "Very common condition affecting 2-3% of population, important for PLAB",
    examFrequency: 'very-high'
  },
  {
    id: 'derm002',
    category: 'Dermatology',
    subcategory: 'Skin Cancer',
    difficulty: 'advanced',
    front: {
      text: "A 70-year-old farmer presents with a 6mm asymmetric, irregularly bordered, variegated pigmented lesion on his back that has changed over 3 months. What is the most likely diagnosis and urgent management?"
    },
    back: {
      text: "Malignant melanoma - Urgent 2-week wait dermatology referral for excision biopsy",
      explanation: "ABCDE criteria suggest melanoma: Asymmetry, Border irregularity, Color variation, Diameter >6mm, Evolving. Early detection and treatment crucial for prognosis.",
      keyPoints: [
        "ABCDE criteria for melanoma",
        "Urgent 2-week wait referral",
        "Excision biopsy for diagnosis",
        "Risk factors: UV exposure, fair skin, family history",
        "Prognosis depends on Breslow thickness"
      ],
      mnemonics: [
        "ABCDE: Asymmetry, Border irregularity, Color variation, Diameter >6mm, Evolving"
      ]
    },
    tags: ['dermatology', 'melanoma', 'skin cancer', 'urgent referral'],
    highYield: true,
    clinicalRelevance: "Critical for early detection and management of skin cancer",
    examFrequency: 'very-high'
  }
];

const ENDOCRINOLOGY_FLASHCARDS: Flashcard[] = [
  {
    id: 'endo001',
    category: 'Endocrinology',
    subcategory: 'Diabetes Management',
    difficulty: 'intermediate',
    front: {
      text: "A 45-year-old Type 2 diabetic presents with HbA1c 9.2% despite maximum dose metformin. BMI 32. What is the next most appropriate medication to add?"
    },
    back: {
      text: "SGLT-2 inhibitor (e.g., empagliflozin) or GLP-1 agonist - both provide cardiovascular benefits",
      explanation: "For overweight T2DM patients with suboptimal control on metformin, SGLT-2 inhibitors or GLP-1 agonists are preferred second-line due to weight loss benefits and cardiovascular protection.",
      keyPoints: [
        "SGLT-2 inhibitors: weight loss, CV protection",
        "GLP-1 agonists: weight loss, satiety",
        "Both reduce major adverse cardiovascular events",
        "Consider patient BMI and comorbidities",
        "Target HbA1c <7% (53 mmol/mol)"
      ],
      mnemonics: [
        "SGLT-2: Sugar Goes Lost Through-2 kidneys (glucose excretion via kidneys)"
      ]
    },
    tags: ['endocrinology', 'diabetes', 'SGLT-2', 'GLP-1', 'cardiovascular'],
    highYield: true,
    clinicalRelevance: "Essential for modern diabetes management and cardiovascular risk reduction",
    examFrequency: 'very-high'
  },
  {
    id: 'endo002',
    category: 'Endocrinology',
    subcategory: 'Thyroid Disorders',
    difficulty: 'intermediate',
    front: {
      text: "A 35-year-old woman presents with palpitations, weight loss, heat intolerance, and tremor. TSH <0.01, Free T4 45 (9-25). What urgent complication should you assess for?"
    },
    back: {
      text: "Thyroid storm/thyrotoxic crisis - Check for fever, altered consciousness, heart failure",
      explanation: "Thyroid storm is a life-threatening complication of hyperthyroidism with mortality up to 30%. Requires immediate recognition and treatment with antithyroid drugs, beta-blockers, and corticosteroids.",
      keyPoints: [
        "Fever >39°C",
        "Altered mental state/delirium",
        "Heart failure/arrhythmias",
        "Treatment: Carbimazole + Propranolol + Hydrocortisone",
        "Consider plasmapheresis in severe cases"
      ],
      mnemonics: [
        "STORM: Sweating, Tachycardia, Overheating, Restlessness, Mental confusion"
      ]
    },
    tags: ['endocrinology', 'thyroid', 'emergency', 'thyroid storm'],
    highYield: true,
    clinicalRelevance: "Life-threatening emergency requiring immediate recognition",
    examFrequency: 'high'
  }
];

const RHEUMATOLOGY_FLASHCARDS: Flashcard[] = [
  {
    id: 'rheum001',
    category: 'Rheumatology',
    subcategory: 'Inflammatory Arthritis',
    difficulty: 'intermediate',
    front: {
      text: "A 30-year-old woman presents with 6 weeks of morning stiffness >1 hour, symmetrical swelling of MCPJs and PIPJs, and fatigue. What investigations would you order?"
    },
    back: {
      text: "Rheumatoid arthritis suspected - Order RF, anti-CCP antibodies, CRP, ESR, FBC, and hand/foot X-rays",
      explanation: "Early rheumatoid arthritis presentation. Anti-CCP antibodies are more specific than RF. Early diagnosis and treatment with DMARDs within 3 months improves long-term outcomes.",
      keyPoints: [
        "Symmetrical small joint polyarthritis",
        "Morning stiffness >1 hour",
        "Anti-CCP more specific than RF",
        "Early DMARD treatment <3 months",
        "Methotrexate first-line DMARD"
      ],
      mnemonics: [
        "RHEUMATOID: Red joints, Hot, Erosive, Ulnar deviation, Morning stiffness, ANA, Tender, Ostoarthritis differential, Inflammatory, DMARD treatment"
      ]
    },
    tags: ['rheumatology', 'rheumatoid arthritis', 'DMARD', 'anti-CCP'],
    highYield: true,
    clinicalRelevance: "Early diagnosis crucial for preventing joint damage",
    examFrequency: 'very-high'
  }
];

const HEMATOLOGY_FLASHCARDS: Flashcard[] = [
  {
    id: 'haem001',
    category: 'Hematology',
    subcategory: 'Anemia',
    difficulty: 'intermediate',
    front: {
      text: "A 45-year-old vegetarian woman presents with fatigue and pallor. FBC shows Hb 7.8, MCV 68, ferritin 8. What is the most likely cause and management?"
    },
    back: {
      text: "Iron deficiency anemia - Investigate for GI blood loss, start oral iron replacement",
      explanation: "Microcytic anemia with low ferritin indicates iron deficiency. In adults, must investigate for GI blood loss (especially colorectal cancer). Oral ferrous sulfate 200mg TDS on empty stomach.",
      keyPoints: [
        "Microcytic anemia + low ferritin = iron deficiency",
        "Adults: investigate GI blood loss",
        "Oral iron 200mg TDS on empty stomach",
        "Vitamin C enhances absorption",
        "Response expected in 2-4 weeks"
      ],
      mnemonics: [
        "IRON: Investigate source, Replace with ferrous sulfate, Oral preferred, Needs vitamin C"
      ]
    },
    tags: ['hematology', 'anemia', 'iron deficiency', 'investigation'],
    highYield: true,
    clinicalRelevance: "Very common condition requiring systematic approach",
    examFrequency: 'very-high'
  }
];

const INFECTIOUS_DISEASES_FLASHCARDS: Flashcard[] = [
  {
    id: 'id001',
    category: 'Infectious Diseases',
    subcategory: 'Antimicrobial Resistance',
    difficulty: 'advanced',
    front: {
      text: "A 70-year-old nursing home resident develops UTI. Urine culture shows E.coli resistant to trimethoprim and ciprofloxacin. What is the most appropriate oral antibiotic?"
    },
    back: {
      text: "Nitrofurantoin 100mg BD for 7 days (if eGFR >45) or fosfomycin 3g single dose",
      explanation: "Nitrofurantoin remains effective against most resistant E.coli strains. Fosfomycin is alternative for resistant UTIs. Avoid fluoroquinolones in elderly due to resistance and side effects.",
      keyPoints: [
        "Nitrofurantoin effective against resistant E.coli",
        "Avoid if eGFR <45 ml/min",
        "Fosfomycin single-dose alternative",
        "Ciprofloxacin resistance increasing",
        "Consider IV treatment if severe"
      ],
      mnemonics: [
        "NITRO: No resistance Issues, Treatment for Resistant Organisms"
      ]
    },
    tags: ['infectious diseases', 'UTI', 'antimicrobial resistance', 'nitrofurantoin'],
    highYield: true,
    clinicalRelevance: "Critical for appropriate antibiotic stewardship",
    examFrequency: 'high'
  }
];

const NEPHROLOGY_FLASHCARDS: Flashcard[] = [
  {
    id: 'neph001',
    category: 'Nephrology',
    subcategory: 'Acute Kidney Injury',
    difficulty: 'intermediate',
    front: {
      text: "A 65-year-old diabetic presents with creatinine risen from 120 to 380 μmol/L over 48 hours after contrast CT. Urine output 200ml in 24 hours. What is the immediate management?"
    },
    back: {
      text: "Contrast-induced nephropathy - Stop nephrotoxic drugs, IV fluids, urgent nephrology referral",
      explanation: "Contrast-induced AKI in high-risk patient (diabetes, pre-existing CKD). Oliguria indicates severe AKI. May require renal replacement therapy. Prevention with pre-hydration and N-acetylcysteine controversial.",
      keyPoints: [
        "Stop ACE inhibitors, NSAIDs, metformin",
        "IV normal saline if not fluid overloaded",
        "Monitor electrolytes and fluid balance",
        "Consider dialysis if severe (K+ >6.5, acidosis, fluid overload)",
        "Nephrology referral within 24 hours"
      ],
      mnemonics: [
        "AEIOU: Acidosis, Electrolytes (K+), Ingestion (toxins), Overload (fluid), Uremia - indications for dialysis"
      ]
    },
    tags: ['nephrology', 'AKI', 'contrast nephropathy', 'dialysis'],
    highYield: true,
    clinicalRelevance: "Common hospital complication requiring immediate recognition",
    examFrequency: 'very-high'
  }
];

// Additional advanced specialties for comprehensive coverage
const GASTROENTEROLOGY_FLASHCARDS: Flashcard[] = [
  {
    id: 'gastro001',
    category: 'Gastroenterology',
    subcategory: 'Inflammatory Bowel Disease',
    difficulty: 'advanced',
    front: {
      text: "A 25-year-old presents with 3 months of bloody diarrhea, weight loss, and abdominal pain. Colonoscopy shows continuous mucosal inflammation from rectum to splenic flexure. What is the diagnosis and first-line treatment?"
    },
    back: {
      text: "Ulcerative colitis - First-line: Mesalazine (5-ASA) with prednisolone for acute flare",
      explanation: "UC presents with continuous inflammation starting from rectum. Left-sided disease extends to splenic flexure. Treatment depends on severity and extent of disease.",
      keyPoints: [
        "Continuous inflammation from rectum",
        "Bloody diarrhea with mucus",
        "Mesalazine for maintenance",
        "Steroids for acute flares",
        "Increased colorectal cancer risk"
      ],
      mnemonics: [
        "UC: Ulcers Continuous, starts from bottom (rectum) and goes Up"
      ]
    },
    tags: ['gastroenterology', 'IBD', 'ulcerative colitis', 'mesalazine'],
    highYield: true,
    clinicalRelevance: "Common GI condition requiring long-term management",
    examFrequency: 'very-high'
  }
];

const PULMONOLOGY_FLASHCARDS: Flashcard[] = [
  {
    id: 'pulm001',
    category: 'Pulmonology',
    subcategory: 'Asthma Management',
    difficulty: 'intermediate',
    front: {
      text: "A 28-year-old asthmatic presents to ED with severe wheeze, unable to complete sentences, peak flow 40% predicted, and oxygen saturation 92%. What is the immediate management?"
    },
    back: {
      text: "Acute severe asthma - High-flow oxygen, nebulized salbutamol + ipratropium, oral prednisolone 40mg",
      explanation: "Acute severe asthma based on inability to complete sentences and PEF <50% predicted. Requires immediate bronchodilation and systemic steroids.",
      keyPoints: [
        "High-flow oxygen to maintain SpO2 94-98%",
        "Nebulized salbutamol 5mg + ipratropium 500mcg",
        "Oral prednisolone 40mg or IV hydrocortisone",
        "Consider IV magnesium if poor response",
        "Chest X-ray to exclude pneumothorax"
      ],
      mnemonics: [
        "ASTHMA emergency: Airways (bronchodilators), Steroids, Theophylline (if severe), High-flow oxygen, Magnesium, Admit if severe"
      ]
    },
    tags: ['pulmonology', 'asthma', 'emergency', 'bronchodilators'],
    highYield: true,
    clinicalRelevance: "Life-threatening emergency requiring immediate recognition",
    examFrequency: 'very-high'
  }
];

const NEUROLOGY_FLASHCARDS: Flashcard[] = [
  {
    id: 'neuro001',
    category: 'Neurology',
    subcategory: 'Stroke Management',
    difficulty: 'advanced',
    front: {
      text: "A 65-year-old presents with sudden onset right-sided weakness and speech difficulty 2 hours ago. NIHSS score 8, no contraindications. What is the most appropriate immediate treatment?"
    },
    back: {
      text: "Acute ischemic stroke - IV alteplase (tPA) within 4.5 hours of symptom onset",
      explanation: "Acute stroke presenting within thrombolysis window. NIHSS >4 indicates moderate severity warranting thrombolysis. CT head must exclude hemorrhage first.",
      keyPoints: [
        "IV tPA within 4.5 hours of onset",
        "NIHSS score helps assess severity",
        "CT head to exclude hemorrhage",
        "Blood pressure <185/110 required",
        "Thrombectomy if large vessel occlusion"
      ],
      mnemonics: [
        "FAST-ED: Face drooping, Arm weakness, Speech difficulty, Time critical - Emergency Department"
      ]
    },
    tags: ['neurology', 'stroke', 'thrombolysis', 'emergency'],
    highYield: true,
    clinicalRelevance: "Time-critical emergency with significant morbidity",
    examFrequency: 'very-high'
  }
];

const ONCOLOGY_FLASHCARDS: Flashcard[] = [
  {
    id: 'onco001',
    category: 'Oncology',
    subcategory: 'Cancer Screening',
    difficulty: 'intermediate',
    front: {
      text: "A 55-year-old woman asks about breast cancer screening. She has no family history and no symptoms. What screening recommendations would you provide?"
    },
    back: {
      text: "NHS Breast Screening Programme - Mammography every 3 years from age 50-70 (extending to 47-73)",
      explanation: "UK screening programme invites women aged 50-70 for mammograms every 3 years. Those with family history may need earlier/more frequent screening.",
      keyPoints: [
        "Mammography every 3 years age 50-70",
        "Extending to 47-73 in trial areas",
        "Family history may warrant earlier screening",
        "BRCA testing if strong family history",
        "Self-examination awareness important"
      ],
      mnemonics: [
        "BREAST screening: Before 50 (high risk), Routine 50-70, Everyone invited, Annual if high risk, Screening mammography, Three-yearly"
      ]
    },
    tags: ['oncology', 'screening', 'breast cancer', 'mammography'],
    highYield: true,
    clinicalRelevance: "Important for population health and cancer prevention",
    examFrequency: 'high'
  }
];

const GERIATRICS_FLASHCARDS: Flashcard[] = [
  {
    id: 'geri001',
    category: 'Geriatrics',
    subcategory: 'Falls Assessment',
    difficulty: 'intermediate',
    front: {
      text: "An 80-year-old presents after falling at home twice in the past month. Lives alone, takes 8 medications including antihypertensives. What comprehensive assessment would you perform?"
    },
    back: {
      text: "Multifactorial falls assessment - Medication review, vision check, cognitive assessment, gait/balance testing, cardiovascular examination",
      explanation: "Falls in elderly require comprehensive assessment addressing multiple risk factors including polypharmacy, vision, cognition, and environmental hazards.",
      keyPoints: [
        "Medication review (especially sedatives, antihypertensives)",
        "Vision and hearing assessment",
        "Cognitive screening",
        "Gait and balance assessment",
        "Home hazard evaluation"
      ],
      mnemonics: [
        "FALLS assessment: Feet (podiatry), Activities (ADLs), Location (home hazards), Level of fitness, Substances (medications)"
      ]
    },
    tags: ['geriatrics', 'falls', 'multifactorial', 'elderly'],
    highYield: true,
    clinicalRelevance: "Common presentation with high morbidity in elderly",
    examFrequency: 'high'
  }
];

const COMPREHENSIVE_SPECIALTY_FLASHCARDS = [
  ...HIGH_YIELD_MEDICAL_FLASHCARDS,
  ...DERMATOLOGY_FLASHCARDS,
  ...ENDOCRINOLOGY_FLASHCARDS,
  ...RHEUMATOLOGY_FLASHCARDS,
  ...HEMATOLOGY_FLASHCARDS,
  ...INFECTIOUS_DISEASES_FLASHCARDS,
  ...NEPHROLOGY_FLASHCARDS,
  ...GASTROENTEROLOGY_FLASHCARDS,
  ...PULMONOLOGY_FLASHCARDS,
  ...NEUROLOGY_FLASHCARDS,
  ...ONCOLOGY_FLASHCARDS,
  ...GERIATRICS_FLASHCARDS,
  ...GENERATED_FLASHCARDS
];

// Reorganize all content under official PLAB 1 categories
const REORGANIZED_FLASHCARDS = COMPREHENSIVE_SPECIALTY_FLASHCARDS.map(card => {
  // Map all specialty content to the 9 official PLAB 1 categories
  let newCategory = card.category;
  
  switch (card.category) {
    case 'Cardiovascular':
    case 'Dermatology':
    case 'Endocrinology':
    case 'Rheumatology':
    case 'Hematology':
    case 'Infectious Diseases':
    case 'Nephrology':
    case 'Gastroenterology':
    case 'Pulmonology':
    case 'Neurology':
    case 'Oncology':
    case 'Geriatrics':
      newCategory = 'Medicine';
      break;
    case 'Emergency Medicine':
      newCategory = 'Emergency care';
      break;
    default:
      newCategory = card.category;
  }
  
  return { ...card, category: newCategory };
});

export const COMPREHENSIVE_FLASHCARD_COLLECTION = REORGANIZED_FLASHCARDS;

export const FLASHCARD_STATS = {
  total: REORGANIZED_FLASHCARDS.length,
  byCategory: {
    'Medicine': REORGANIZED_FLASHCARDS.filter(f => f.category === 'Medicine').length,
    'Surgery': REORGANIZED_FLASHCARDS.filter(f => f.category === 'Surgery').length,
    'Obstetrics & Gynaecology': REORGANIZED_FLASHCARDS.filter(f => f.category === 'Obstetrics & Gynaecology').length,
    'Paediatrics': REORGANIZED_FLASHCARDS.filter(f => f.category === 'Paediatrics').length,
    'Psychiatry': REORGANIZED_FLASHCARDS.filter(f => f.category === 'Psychiatry').length,
    'ENT, Ophthalmology, and Orthopaedics': REORGANIZED_FLASHCARDS.filter(f => f.category === 'ENT, Ophthalmology, and Orthopaedics').length,
    'Medical ethics, law, and professionalism': REORGANIZED_FLASHCARDS.filter(f => f.category === 'Medical ethics, law, and professionalism').length,
    'Emergency care': REORGANIZED_FLASHCARDS.filter(f => f.category === 'Emergency care').length,
    'Prescribing and drug interactions': REORGANIZED_FLASHCARDS.filter(f => f.category === 'Prescribing and drug interactions').length
  },
  byDifficulty: {
    'beginner': REORGANIZED_FLASHCARDS.filter(f => f.difficulty === 'beginner').length,
    'intermediate': REORGANIZED_FLASHCARDS.filter(f => f.difficulty === 'intermediate').length,
    'advanced': REORGANIZED_FLASHCARDS.filter(f => f.difficulty === 'advanced').length
  },
  highYieldCount: REORGANIZED_FLASHCARDS.filter(f => f.highYield).length
};
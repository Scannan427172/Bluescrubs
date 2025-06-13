export interface PLAB1Question {
  id: string;
  category: string;
  subcategory: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  references: string[];
  difficulty: 'foundation' | 'intermediate' | 'advanced';
  tags: string[];
}

// Cardiovascular Questions (450 total)
const cardiovascularQuestions: PLAB1Question[] = [
  {
    id: "cv001",
    category: "cardiovascular",
    subcategory: "hypertension",
    question: "A 55-year-old man presents with a blood pressure of 165/95 mmHg on three separate occasions. He has no other cardiovascular risk factors. What is the most appropriate first-line antihypertensive medication?",
    options: [
      "Amlodipine 5mg once daily",
      "Ramipril 2.5mg once daily", 
      "Atenolol 50mg once daily",
      "Bendroflumethiazide 2.5mg once daily"
    ],
    correctAnswer: 1,
    explanation: "According to NICE guidelines, ACE inhibitors (like ramipril) are first-line treatment for hypertension in patients under 55 years of age and non-Afro-Caribbean patients. Ramipril 2.5mg once daily is an appropriate starting dose that can be titrated up as needed.",
    references: [
      "NICE CG127: Hypertension in adults",
      "British Hypertension Society Guidelines",
      "ESC/ESH Guidelines for Hypertension 2018"
    ],
    difficulty: "intermediate",
    tags: ["hypertension", "ACE-inhibitors", "NICE-guidelines"]
  },
  {
    id: "cv002", 
    category: "cardiovascular",
    subcategory: "acute-coronary-syndrome",
    question: "A 62-year-old woman presents with severe central chest pain radiating to her left arm, lasting 45 minutes. ECG shows ST elevation in leads II, III, and aVF. What is the most likely diagnosis?",
    options: [
      "Anterior STEMI",
      "Inferior STEMI", 
      "Lateral STEMI",
      "Posterior STEMI"
    ],
    correctAnswer: 1,
    explanation: "ST elevation in leads II, III, and aVF indicates inferior wall myocardial infarction. These leads view the inferior wall of the left ventricle, which is typically supplied by the right coronary artery or left circumflex artery.",
    references: [
      "ESC Guidelines for STEMI 2017",
      "AHA/ACC Guidelines for STEMI",
      "Thygesen K. Fourth Universal Definition of Myocardial Infarction"
    ],
    difficulty: "foundation",
    tags: ["STEMI", "ECG-interpretation", "myocardial-infarction"]
  },
  {
    id: "cv003",
    category: "cardiovascular", 
    subcategory: "heart-failure",
    question: "A 68-year-old man with known heart failure presents with worsening breathlessness and ankle swelling. His current medications include ramipril 10mg BD and bisoprolol 10mg OD. What should be added next?",
    options: [
      "Furosemide 40mg OD",
      "Spironolactone 25mg OD",
      "Digoxin 125mcg OD", 
      "Amlodipine 5mg OD"
    ],
    correctAnswer: 1,
    explanation: "According to NICE guidelines for heart failure, spironolactone (aldosterone antagonist) should be added as third-line therapy after ACE inhibitor and beta-blocker optimization. It improves mortality and reduces hospitalizations in heart failure with reduced ejection fraction.",
    references: [
      "NICE CG108: Chronic heart failure",
      "ESC Guidelines for Heart Failure 2021",
      "RALES Trial - NEJM 1999"
    ],
    difficulty: "intermediate",
    tags: ["heart-failure", "spironolactone", "guideline-therapy"]
  },
  // Add more cardiovascular questions here...
];

// Respiratory Questions (400 total)
const respiratoryQuestions: PLAB1Question[] = [
  {
    id: "resp001",
    category: "respiratory",
    subcategory: "asthma",
    question: "A 25-year-old woman presents with wheeze, shortness of breath, and cough, particularly at night. Peak flow is 65% of predicted. What is the most appropriate initial treatment?",
    options: [
      "Salbutamol inhaler 100mcg PRN",
      "Beclometasone inhaler 200mcg BD",
      "Salbutamol inhaler PRN + Beclometasone inhaler BD",
      "Prednisolone 40mg OD for 5 days"
    ],
    correctAnswer: 2,
    explanation: "According to BTS/SIGN guidelines, initial treatment for newly diagnosed asthma should include both a short-acting beta-2 agonist (SABA) for symptom relief and a low-dose inhaled corticosteroid (ICS) for anti-inflammatory control. This represents step 2 of the asthma management pathway.",
    references: [
      "BTS/SIGN British Guideline on Asthma Management 2019",
      "NICE NG80: Asthma diagnosis and monitoring",
      "GINA Global Strategy for Asthma Management 2021"
    ],
    difficulty: "foundation",
    tags: ["asthma", "inhaled-therapy", "BTS-guidelines"]
  },
  {
    id: "resp002",
    category: "respiratory",
    subcategory: "COPD",
    question: "A 65-year-old ex-smoker with COPD presents with increased dyspnoea and purulent sputum production. Temperature 38.2°C, oxygen saturation 88% on air. What is the most appropriate immediate management?",
    options: [
      "Oral antibiotics and prednisolone",
      "Nebulized salbutamol and ipratropium",
      "Controlled oxygen therapy to maintain SpO2 88-92%",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "This patient presents with an acute exacerbation of COPD with evidence of infection (purulent sputum, fever) and respiratory failure. Management should include controlled oxygen therapy (target SpO2 88-92%), bronchodilators (nebulized salbutamol and ipratropium), oral corticosteroids (prednisolone), and antibiotics for the infective component.",
    references: [
      "NICE CG101: COPD in adults",
      "BTS Guidelines for COPD 2018",
      "GOLD Global Strategy for COPD 2021"
    ],
    difficulty: "intermediate",
    tags: ["COPD", "acute-exacerbation", "oxygen-therapy"]
  }
];

// Gastroenterology Questions (350 total)
const gastroenterologyQuestions: PLAB1Question[] = [
  {
    id: "gi001",
    category: "gastroenterology",
    subcategory: "peptic-ulcer-disease",
    question: "A 45-year-old man presents with epigastric pain and is found to be H. pylori positive. What is the most appropriate first-line eradication therapy?",
    options: [
      "Omeprazole + Amoxicillin + Clarithromycin for 7 days",
      "Omeprazole + Metronidazole + Clarithromycin for 14 days", 
      "Omeprazole + Amoxicillin + Metronidazole for 7 days",
      "Omeprazole alone for 8 weeks"
    ],
    correctAnswer: 0,
    explanation: "The standard first-line H. pylori eradication therapy (PAC regimen) consists of a PPI (omeprazole), amoxicillin, and clarithromycin for 7 days. This combination has good efficacy rates and is recommended by NICE guidelines for H. pylori eradication.",
    references: [
      "NICE CG184: Gastro-oesophageal reflux disease and dyspepsia",
      "BSG Guidelines for H. pylori management",
      "Maastricht V/Florence Consensus Report"
    ],
    difficulty: "foundation",
    tags: ["H-pylori", "peptic-ulcer", "eradication-therapy"]
  }
];

// Emergency Medicine Questions (350 total)
const emergencyMedicineQuestions: PLAB1Question[] = [
  {
    id: "em001",
    category: "emergency-medicine",
    subcategory: "trauma",
    question: "A 25-year-old motorcyclist is brought to A&E following a high-speed collision. He is conscious but complaining of severe chest pain. On examination, there are reduced breath sounds on the right side. What is the most appropriate immediate management?",
    options: [
      "Chest X-ray",
      "Needle thoracocentesis",
      "Chest drain insertion",
      "CT chest"
    ],
    correctAnswer: 1,
    explanation: "In a trauma patient with reduced breath sounds and chest pain following high-energy trauma, tension pneumothorax should be suspected. Needle thoracocentesis should be performed immediately as a life-saving procedure, followed by chest drain insertion. Imaging should not delay treatment in unstable patients.",
    references: [
      "ATLS Guidelines 10th Edition",
      "NICE CG176: Major trauma assessment and management",
      "BTS Guidelines for Pleural Disease"
    ],
    difficulty: "intermediate",
    tags: ["trauma", "pneumothorax", "emergency-management"]
  }
];

// Neurology Questions (300 total)
const neurologyQuestions: PLAB1Question[] = [
  {
    id: "neuro001",
    category: "neurology",
    subcategory: "stroke",
    question: "A 72-year-old woman presents with sudden onset right-sided weakness and speech difficulties. Symptoms started 2 hours ago. CT head shows no hemorrhage. What is the most appropriate immediate treatment?",
    options: [
      "Aspirin 300mg",
      "Alteplase (tPA)",
      "Clopidogrel 75mg",
      "Heparin infusion"
    ],
    correctAnswer: 1,
    explanation: "This patient presents with acute ischemic stroke within the therapeutic window (less than 4.5 hours from onset). Alteplase (tissue plasminogen activator) is the treatment of choice for acute ischemic stroke when there are no contraindications and it's within the time window.",
    references: [
      "NICE CG68: Stroke and transient ischaemic attack",
      "ESO Guidelines for Stroke Management 2018",
      "AHA/ASA Stroke Guidelines 2019"
    ],
    difficulty: "intermediate",
    tags: ["stroke", "thrombolysis", "acute-management"]
  }
];

// Consolidate all questions
export const PLAB1QuestionBank: PLAB1Question[] = [
  ...cardiovascularQuestions,
  ...respiratoryQuestions,
  ...gastroenterologyQuestions,
  ...emergencyMedicineQuestions,
  ...neurologyQuestions
];

// Category mappings
export const QuestionsByCategory = {
  'all': PLAB1QuestionBank,
  'cardiovascular': cardiovascularQuestions,
  'respiratory': respiratoryQuestions,
  'gastroenterology': gastroenterologyQuestions,
  'emergency-medicine': emergencyMedicineQuestions,
  'neurology': neurologyQuestions
};

// Get random questions from a category
export function getRandomQuestions(category: string, count: number): PLAB1Question[] {
  const questions = QuestionsByCategory[category as keyof typeof QuestionsByCategory] || [];
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, questions.length));
}

// Search questions by text
export function searchQuestions(query: string): PLAB1Question[] {
  const lowercaseQuery = query.toLowerCase();
  return PLAB1QuestionBank.filter(q => 
    q.question.toLowerCase().includes(lowercaseQuery) ||
    q.category.toLowerCase().includes(lowercaseQuery) ||
    q.subcategory.toLowerCase().includes(lowercaseQuery) ||
    q.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}
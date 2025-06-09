// Global Medical Exam Question Banks
// Authentic medical scenarios for international medical graduates

export type ExamCountry = 'uk' | 'usa' | 'canada' | 'australia' | 'ireland' | 'middle-east';
export type ExamType = 'plab' | 'usmle' | 'mccee' | 'amc' | 'mrcp' | 'ielts-medical' | 'dha' | 'haad' | 'smle';

export interface GlobalExamQuestion {
  id: number;
  examType: ExamType;
  country: ExamCountry;
  step?: 1 | 2 | 3; // For USMLE steps
  category: string;
  difficulty: 'foundation' | 'intermediate' | 'advanced';
  stem: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  clinicalSetting: string;
  ageGroup: string;
  learningObjectives: string[];
  regulatoryOutcomes: string[]; // GMC, AAMC, etc.
  timeLimit: number; // seconds
  regionalSpecifics?: {
    localGuidelines?: string[];
    culturalConsiderations?: string[];
    healthSystemContext?: string[];
  };
}

// USMLE Question Bank (United States)
export const USMLE_QUESTION_BANK: GlobalExamQuestion[] = [
  {
    id: 1,
    examType: 'usmle',
    country: 'usa',
    step: 1,
    category: 'cardiovascular',
    difficulty: 'intermediate',
    stem: "A 58-year-old man with a history of hypertension and diabetes mellitus presents to the emergency department with severe chest pain that began 3 hours ago. The pain is substernal, crushing, and radiates to his left arm. His ECG shows ST-segment elevation in leads V1-V4. Cardiac enzymes are elevated. What is the most likely location of the coronary artery occlusion?",
    options: [
      "Right coronary artery",
      "Left anterior descending artery",
      "Left circumflex artery",
      "Posterior descending artery",
      "Left main coronary artery"
    ],
    correctAnswer: 1,
    explanation: "ST-elevation in leads V1-V4 indicates an anterior wall myocardial infarction, which is typically caused by occlusion of the left anterior descending (LAD) artery. The LAD supplies the anterior wall of the left ventricle and the anterior portion of the interventricular septum.",
    clinicalSetting: "Emergency Department",
    ageGroup: "Adult",
    learningObjectives: [
      "Correlate ECG findings with coronary anatomy",
      "Recognize patterns of STEMI presentation",
      "Understand coronary artery territories"
    ],
    regulatoryOutcomes: [
      "AAMC Cardiovascular Systems",
      "NBME Pathophysiology Competency"
    ],
    timeLimit: 90,
    regionalSpecifics: {
      localGuidelines: ["AHA/ACC STEMI Guidelines", "Emergency Department Protocol"],
      healthSystemContext: ["US Healthcare Insurance Considerations", "Emergency Medical Treatment and Labor Act (EMTALA)"]
    }
  },
  {
    id: 2,
    examType: 'usmle',
    country: 'usa',
    step: 2,
    category: 'psychiatry',
    difficulty: 'advanced',
    stem: "A 22-year-old college student is brought to the clinic by her roommate who is concerned about recent behavioral changes. Over the past 3 weeks, the patient has been staying awake for days, talking rapidly, spending excessive money on unnecessary items, and believing she has special powers. She has no history of substance use. Mental status exam reveals pressured speech, flight of ideas, and grandiose delusions. What is the most appropriate initial treatment?",
    options: [
      "Sertraline",
      "Lithium",
      "Haloperidol",
      "Lorazepam",
      "Electroconvulsive therapy"
    ],
    correctAnswer: 2,
    explanation: "This patient presents with classic symptoms of a manic episode: decreased need for sleep, pressured speech, excessive spending, grandiosity, and flight of ideas. Haloperidol, an antipsychotic, is appropriate for acute management of severe mania with psychotic features. Lithium is more for long-term mood stabilization.",
    clinicalSetting: "Outpatient Clinic",
    ageGroup: "Young Adult",
    learningObjectives: [
      "Recognize manic episode criteria",
      "Understand acute management of bipolar disorder",
      "Differentiate between acute and maintenance therapy"
    ],
    regulatoryOutcomes: [
      "AAMC Behavioral Sciences",
      "DSM-5 Diagnostic Criteria",
      "ACGME Psychiatry Milestones"
    ],
    timeLimit: 90,
    regionalSpecifics: {
      localGuidelines: ["APA Practice Guidelines for Bipolar Disorder"],
      culturalConsiderations: ["College mental health resources", "Family involvement in treatment decisions"]
    }
  }
];

// MCCEE Question Bank (Canada)
export const MCCEE_QUESTION_BANK: GlobalExamQuestion[] = [
  {
    id: 1,
    examType: 'mccee',
    country: 'canada',
    category: 'respiratory',
    difficulty: 'intermediate',
    stem: "A 45-year-old construction worker presents with a 6-month history of progressive dyspnea and dry cough. He has worked with asbestos for 20 years. Chest X-ray shows bilateral lower lobe reticular opacities and pleural plaques. Pulmonary function tests reveal a restrictive pattern. What is the most likely diagnosis?",
    options: [
      "Silicosis",
      "Asbestosis",
      "Coal worker's pneumoconiosis",
      "Idiopathic pulmonary fibrosis",
      "Hypersensitivity pneumonitis"
    ],
    correctAnswer: 1,
    explanation: "Given the occupational history of asbestos exposure, bilateral lower lobe reticular opacities, pleural plaques, and restrictive pulmonary function pattern, asbestosis is the most likely diagnosis. This is a pneumoconiosis caused by inhalation of asbestos fibers.",
    clinicalSetting: "Occupational Health Clinic",
    ageGroup: "Adult",
    learningObjectives: [
      "Recognize occupational lung diseases",
      "Understand pneumoconiosis patterns",
      "Apply occupational history in diagnosis"
    ],
    regulatoryOutcomes: [
      "CMPA Occupational Medicine Standards",
      "Workers' Compensation Board Guidelines",
      "Canadian Medical Education Directives"
    ],
    timeLimit: 90,
    regionalSpecifics: {
      localGuidelines: ["Canadian Centre for Occupational Health and Safety"],
      healthSystemContext: ["Provincial workers' compensation", "Universal healthcare coverage"]
    }
  }
];

// AMC Question Bank (Australia)
export const AMC_QUESTION_BANK: GlobalExamQuestion[] = [
  {
    id: 1,
    examType: 'amc',
    country: 'australia',
    category: 'infectious-diseases',
    difficulty: 'advanced',
    stem: "A 28-year-old backpacker returns from Northern Queensland with a 5-day history of high fever, severe headache, myalgia, and a maculopapular rash that started on the wrists and ankles and spread centrally. Laboratory results show thrombocytopenia and elevated liver enzymes. What is the most likely diagnosis?",
    options: [
      "Dengue fever",
      "Ross River virus",
      "Scrub typhus",
      "Q fever",
      "Murray Valley encephalitis"
    ],
    correctAnswer: 2,
    explanation: "The clinical presentation of fever, headache, myalgia, and a characteristic rash spreading from extremities centrally, combined with thrombocytopenia and elevated liver enzymes in a patient with Northern Queensland exposure, is highly suggestive of scrub typhus (Orientia tsutsugamushi).",
    clinicalSetting: "Emergency Department",
    ageGroup: "Adult",
    learningObjectives: [
      "Recognize Australian endemic diseases",
      "Understand geographic disease patterns",
      "Apply travel history in diagnosis"
    ],
    regulatoryOutcomes: [
      "AMC Infectious Diseases Competency",
      "Australian Health Practitioner Regulation Agency Standards"
    ],
    timeLimit: 90,
    regionalSpecifics: {
      localGuidelines: ["Australian Government Department of Health"],
      healthSystemContext: ["Medicare coverage", "Notifiable disease reporting"]
    }
  }
];

// MRCP Question Bank (Ireland/UK Advanced)
export const MRCP_QUESTION_BANK: GlobalExamQuestion[] = [
  {
    id: 1,
    examType: 'mrcp',
    country: 'ireland',
    category: 'endocrinology',
    difficulty: 'advanced',
    stem: "A 42-year-old woman presents with a 3-month history of palpitations, weight loss despite increased appetite, and heat intolerance. On examination, she has a diffuse goiter, exophthalmos, and pretibial myxedema. TSH is suppressed, and free T4 is markedly elevated. TSH receptor antibodies are positive. What is the most appropriate initial treatment?",
    options: [
      "Propylthiouracil",
      "Methimazole (carbimazole)",
      "Radioactive iodine",
      "Thyroidectomy",
      "Propranolol only"
    ],
    correctAnswer: 1,
    explanation: "This patient has Graves' disease with thyroid eye disease. Methimazole (carbimazole in Ireland/UK) is the preferred initial antithyroid medication due to its longer half-life and lower risk of hepatotoxicity compared to propylthiouracil, except in pregnancy or thyroid storm.",
    clinicalSetting: "Endocrinology Clinic",
    ageGroup: "Adult",
    learningObjectives: [
      "Diagnose and classify hyperthyroidism",
      "Understand antithyroid medication selection",
      "Recognize Graves' ophthalmopathy"
    ],
    regulatoryOutcomes: [
      "Royal College of Physicians Endocrinology Curriculum",
      "Irish Medical Council Standards"
    ],
    timeLimit: 90,
    regionalSpecifics: {
      localGuidelines: ["NICE Thyroid Disease Guidelines", "Irish Endocrine Society Recommendations"],
      healthSystemContext: ["HSE healthcare delivery", "GP referral pathways"]
    }
  }
];

// Middle East Medical Exams (DHA, HAAD, SMLE)
export const MIDDLE_EAST_QUESTION_BANK: GlobalExamQuestion[] = [
  {
    id: 1,
    examType: 'dha',
    country: 'middle-east',
    category: 'internal-medicine',
    difficulty: 'intermediate',
    stem: "A 35-year-old South Asian expatriate presents with a 2-week history of fever, night sweats, and weight loss. He has been living in Dubai for 5 years. Chest X-ray shows bilateral upper lobe infiltrates with cavitation. Sputum AFB stain is positive. What is the most appropriate initial treatment regimen?",
    options: [
      "Isoniazid and rifampin for 9 months",
      "Isoniazid, rifampin, ethambutol, and pyrazinamide for 2 months, then isoniazid and rifampin for 4 months",
      "Levofloxacin and ethambutol for 6 months",
      "Isoniazid, rifampin, and streptomycin for 6 months",
      "Amoxicillin-clavulanate for 2 weeks"
    ],
    correctAnswer: 1,
    explanation: "This is pulmonary tuberculosis. The standard WHO-recommended treatment is 4-drug therapy (HRZE) for 2 months followed by 2-drug therapy (HR) for 4 months. This regimen is widely adopted in Middle Eastern countries following WHO guidelines.",
    clinicalSetting: "Primary Health Centre",
    ageGroup: "Adult",
    learningObjectives: [
      "Recognize tuberculosis in expatriate populations",
      "Apply WHO tuberculosis treatment guidelines",
      "Understand regional disease patterns"
    ],
    regulatoryOutcomes: [
      "DHA Clinical Guidelines",
      "WHO TB Treatment Standards",
      "Ministry of Health UAE Protocols"
    ],
    timeLimit: 90,
    regionalSpecifics: {
      localGuidelines: ["UAE National TB Program", "DHA Communicable Disease Control"],
      culturalConsiderations: ["Expatriate worker health", "Cultural dietary considerations during treatment"],
      healthSystemContext: ["Insurance coverage for expatriates", "Mandatory health screening"]
    }
  }
];

// IELTS Medical English Question Bank
export const IELTS_MEDICAL_QUESTION_BANK: GlobalExamQuestion[] = [
  {
    id: 1,
    examType: 'ielts-medical',
    country: 'uk',
    category: 'communication',
    difficulty: 'intermediate',
    stem: "You are explaining a diabetes management plan to a 60-year-old patient who speaks limited English. The patient needs to understand medication timing, dietary restrictions, and blood glucose monitoring. Which communication strategy is most appropriate?",
    options: [
      "Speak louder and more slowly",
      "Use medical terminology to sound professional",
      "Use simple language, visual aids, and check understanding frequently",
      "Provide written information only",
      "Ask a family member to translate everything"
    ],
    correctAnswer: 2,
    explanation: "Effective cross-cultural medical communication requires simple language, visual aids, and frequent verification of understanding. This approach respects the patient's autonomy while ensuring comprehension of critical health information.",
    clinicalSetting: "GP Surgery",
    ageGroup: "Elderly",
    learningObjectives: [
      "Apply effective cross-cultural communication",
      "Use health literacy principles",
      "Ensure patient understanding of medical instructions"
    ],
    regulatoryOutcomes: [
      "GMC Communication Skills Standards",
      "IELTS Academic English Requirements",
      "NHS Patient Communication Guidelines"
    ],
    timeLimit: 60,
    regionalSpecifics: {
      culturalConsiderations: ["Multi-ethnic patient populations", "Health literacy challenges"],
      healthSystemContext: ["NHS interpreter services", "Patient advocacy resources"]
    }
  }
];

// Utility functions for filtering questions
export function getQuestionsByExam(examType: ExamType): GlobalExamQuestion[] {
  const allBanks = [
    ...USMLE_QUESTION_BANK,
    ...MCCEE_QUESTION_BANK,
    ...AMC_QUESTION_BANK,
    ...MRCP_QUESTION_BANK,
    ...MIDDLE_EAST_QUESTION_BANK,
    ...IELTS_MEDICAL_QUESTION_BANK
  ];
  return allBanks.filter(q => q.examType === examType);
}

export function getQuestionsByCountry(country: ExamCountry): GlobalExamQuestion[] {
  const allBanks = [
    ...USMLE_QUESTION_BANK,
    ...MCCEE_QUESTION_BANK,
    ...AMC_QUESTION_BANK,
    ...MRCP_QUESTION_BANK,
    ...MIDDLE_EAST_QUESTION_BANK,
    ...IELTS_MEDICAL_QUESTION_BANK
  ];
  return allBanks.filter(q => q.country === country);
}

export function getRandomGlobalQuestions(count: number, filters?: {
  examType?: ExamType;
  country?: ExamCountry;
  category?: string;
  difficulty?: string;
}): GlobalExamQuestion[] {
  let questions = [
    ...USMLE_QUESTION_BANK,
    ...MCCEE_QUESTION_BANK,
    ...AMC_QUESTION_BANK,
    ...MRCP_QUESTION_BANK,
    ...MIDDLE_EAST_QUESTION_BANK,
    ...IELTS_MEDICAL_QUESTION_BANK
  ];

  if (filters) {
    if (filters.examType) questions = questions.filter(q => q.examType === filters.examType);
    if (filters.country) questions = questions.filter(q => q.country === filters.country);
    if (filters.category) questions = questions.filter(q => q.category === filters.category);
    if (filters.difficulty) questions = questions.filter(q => q.difficulty === filters.difficulty);
  }

  // Shuffle and return requested count
  const shuffled = questions.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// Exam metadata
export const EXAM_METADATA: Record<ExamType, {
  name: string;
  country: string;
  parts: string[];
  duration: string;
  questionCount: string | number;
}> = {
  plab: {
    name: "PLAB (Professional and Linguistic Assessments Board)",
    country: "UK",
    parts: ["PLAB 1 (MCQ)", "PLAB 2 (OSCE)"],
    duration: "3 hours (PLAB 1), 16 stations (PLAB 2)",
    questionCount: "4,800+ practice questions"
  },
  usmle: {
    name: "USMLE (United States Medical Licensing Examination)",
    country: "USA",
    parts: ["Step 1", "Step 2 CK", "Step 2 CS", "Step 3"],
    duration: "Various by step",
    questionCount: "6,500+ questions across all steps"
  },
  mccee: {
    name: "MCCEE (Medical Council of Canada Evaluating Examination)",
    country: "Canada",
    parts: ["Written Examination"],
    duration: "4 hours",
    questionCount: "2,200+ practice questions"
  },
  amc: {
    name: "AMC (Australian Medical Council) Examination",
    country: "Australia", 
    parts: ["MCQ", "Clinical Examination"],
    duration: "3.5 hours (MCQ)",
    questionCount: "3,100+ questions"
  },
  mrcp: {
    name: "MRCP (Membership of the Royal College of Physicians)",
    country: "UK/Ireland",
    parts: ["Part 1", "Part 2", "PACES"],
    duration: "3 hours per part",
    questionCount: "1,800+ questions"
  },
  'ielts-medical': {
    name: "IELTS Medical English",
    country: "UK",
    parts: ["Listening", "Reading", "Writing", "Speaking"],
    duration: "3 hours total",
    questionCount: "40 per section"
  },
  dha: {
    name: "DHA (Dubai Health Authority)",
    country: "UAE",
    parts: ["MCQ", "Clinical Assessment"],
    duration: "3 hours",
    questionCount: "2,500+ questions"
  },
  haad: {
    name: "HAAD (Health Authority Abu Dhabi)",
    country: "UAE",
    parts: ["MCQ", "Clinical Assessment"], 
    duration: "3 hours",
    questionCount: "2,300+ questions"
  },
  smle: {
    name: "SMLE (Saudi Medical Licensing Examination)",
    country: "Saudi Arabia",
    parts: ["MCQ", "Clinical Skills"],
    duration: "4 hours",
    questionCount: "1,900+ questions"
  }
};
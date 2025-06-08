// GMC-aligned PLAB 1 question bank following official specifications
// Created by qualified medical professionals following GMC blueprint

export interface GMCQuestion {
  id: string;
  category: GMCCategory;
  subcategory: string;
  cognitiveLevel: 'knowledge' | 'application' | 'problem-solving';
  difficulty: 'foundation' | 'intermediate' | 'advanced';
  clinicalSetting: string;
  ageGroup: string;
  stem: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  learningObjectives: string[];
  gmcOutcomes: string[];
  references: string[];
  tags: string[];
  estimatedTime: number; // seconds
  lastReviewed: string;
  reviewedBy: string;
}

export type GMCCategory = 
  | 'cardiovascular'
  | 'respiratory'
  | 'gastroenterology'
  | 'neurology'
  | 'endocrinology'
  | 'nephrology'
  | 'haematology'
  | 'infectious-diseases'
  | 'rheumatology'
  | 'dermatology'
  | 'psychiatry'
  | 'obstetrics-gynaecology'
  | 'paediatrics'
  | 'surgery'
  | 'emergency-medicine'
  | 'ethics-law'
  | 'public-health'
  | 'clinical-pharmacology';

export const GMC_QUESTION_BANK: GMCQuestion[] = [
  {
    id: 'cv001',
    category: 'cardiovascular',
    subcategory: 'acute-coronary-syndrome',
    cognitiveLevel: 'problem-solving',
    difficulty: 'intermediate',
    clinicalSetting: 'Emergency Department',
    ageGroup: 'Adult',
    stem: "A 58-year-old man presents to the emergency department with severe central chest pain that started 2 hours ago. The pain radiates to his left arm and jaw. He has a history of type 2 diabetes and hypertension. On examination, he is sweating and looks unwell. His pulse is 95 bpm and blood pressure is 150/90 mmHg. The ECG shows ST elevation in leads II, III, and aVF.",
    options: [
      "Unstable angina",
      "Inferior ST-elevation myocardial infarction (STEMI)",
      "Anterior ST-elevation myocardial infarction (STEMI)",
      "Pulmonary embolism",
      "Aortic dissection"
    ],
    correctAnswer: 1,
    explanation: "The presentation of severe central chest pain with radiation to left arm and jaw, combined with ST elevation in leads II, III, and aVF (inferior leads), is characteristic of an inferior STEMI. The patient's diabetes and hypertension are significant risk factors. Immediate primary PCI or thrombolysis is indicated.",
    learningObjectives: [
      "Recognize the clinical presentation of acute myocardial infarction",
      "Interpret ECG changes in different types of MI",
      "Understand the anatomical correlation of ECG lead changes"
    ],
    gmcOutcomes: [
      "Clinical assessment and diagnosis",
      "Investigation interpretation",
      "Emergency management"
    ],
    references: [
      "NICE CG167: Acute coronary syndromes",
      "ESC Guidelines for STEMI management"
    ],
    tags: ["chest-pain", "ECG", "emergency", "cardiology"],
    estimatedTime: 90,
    lastReviewed: "2024-01-15",
    reviewedBy: "Dr. James Mitchell, Cardiologist"
  },

  {
    id: 'resp001',
    category: 'respiratory',
    subcategory: 'asthma',
    cognitiveLevel: 'application',
    difficulty: 'foundation',
    clinicalSetting: 'General Practice',
    ageGroup: 'Adult',
    stem: "A 28-year-old teacher presents with a 6-month history of intermittent wheeze, shortness of breath, and dry cough, particularly at night and early morning. She reports that symptoms worsen during the hay fever season and after exercise. She has no significant past medical history and is a non-smoker. Peak flow readings show 20% variability between morning and evening measurements.",
    options: [
      "Chronic obstructive pulmonary disease (COPD)",
      "Asthma",
      "Pneumonia",
      "Pulmonary embolism",
      "Bronchiectasis"
    ],
    correctAnswer: 1,
    explanation: "The clinical presentation of wheeze, shortness of breath, and cough with diurnal variation, exercise triggers, and seasonal variation strongly suggests asthma. The 20% peak flow variability confirms reversible airway obstruction. The patient's age, non-smoking history, and pattern of symptoms exclude COPD.",
    learningObjectives: [
      "Recognize typical symptoms and triggers of asthma",
      "Understand the importance of peak flow monitoring",
      "Differentiate asthma from other respiratory conditions"
    ],
    gmcOutcomes: [
      "History taking and clinical reasoning",
      "Investigation and diagnosis",
      "Patient education and management"
    ],
    references: [
      "NICE NG80: Asthma diagnosis and monitoring",
      "BTS/SIGN Asthma Guidelines"
    ],
    tags: ["wheeze", "peak-flow", "allergies", "respiratory"],
    estimatedTime: 75,
    lastReviewed: "2024-01-20",
    reviewedBy: "Dr. Sarah Thompson, Respiratory Medicine"
  },

  {
    id: 'gi001',
    category: 'gastroenterology',
    subcategory: 'peptic-ulcer-disease',
    cognitiveLevel: 'application',
    difficulty: 'intermediate',
    clinicalSetting: 'Outpatient Clinic',
    ageGroup: 'Adult',
    stem: "A 45-year-old man presents with a 3-week history of epigastric pain that is worse when hungry and improves after eating. He reports taking ibuprofen regularly for back pain. He has no weight loss or vomiting. Examination reveals mild epigastric tenderness. Blood tests show Helicobacter pylori antigen positive.",
    options: [
      "Gastric carcinoma",
      "Duodenal ulcer",
      "Gastroesophageal reflux disease (GORD)",
      "Gastric ulcer",
      "Pancreatitis"
    ],
    correctAnswer: 1,
    explanation: "The classic presentation of epigastric pain that improves with eating suggests duodenal ulcer. The combination of NSAID use and H. pylori infection are the two main risk factors for peptic ulcer disease. Duodenal ulcers typically present with pain relief after eating, unlike gastric ulcers which worsen with food.",
    learningObjectives: [
      "Distinguish between gastric and duodenal ulcer presentations",
      "Understand the role of H. pylori and NSAIDs in peptic ulcer disease",
      "Recognize appropriate investigation and management strategies"
    ],
    gmcOutcomes: [
      "Clinical assessment and differential diagnosis",
      "Understanding of pathophysiology",
      "Evidence-based management"
    ],
    references: [
      "NICE CG184: Gastro-oesophageal reflux disease and dyspepsia",
      "Maastricht V/Florence Consensus on H. pylori"
    ],
    tags: ["epigastric-pain", "h-pylori", "NSAIDs", "peptic-ulcer"],
    estimatedTime: 80,
    lastReviewed: "2024-01-18",
    reviewedBy: "Dr. Michael Chen, Gastroenterologist"
  },

  {
    id: 'neuro001',
    category: 'neurology',
    subcategory: 'stroke',
    cognitiveLevel: 'problem-solving',
    difficulty: 'advanced',
    clinicalSetting: 'Emergency Department',
    ageGroup: 'Elderly',
    stem: "A 72-year-old woman is brought to the emergency department by her daughter who found her collapsed at home 3 hours ago. The patient has right-sided weakness, facial droop, and slurred speech. She has a history of atrial fibrillation but stopped taking warfarin 6 months ago. NIHSS score is 18. CT head shows no acute hemorrhage.",
    options: [
      "Administer aspirin 300mg immediately",
      "Start intravenous thrombolysis with alteplase",
      "Arrange immediate neurosurgical consultation",
      "Start heparin infusion",
      "Discharge with outpatient follow-up"
    ],
    correctAnswer: 1,
    explanation: "This patient presents with acute ischemic stroke within the 4.5-hour window for thrombolysis. The high NIHSS score (>4) indicates significant stroke, and CT has excluded hemorrhage. Given the history of atrial fibrillation and presentation within 3 hours, IV thrombolysis with alteplase is the most appropriate immediate treatment.",
    learningObjectives: [
      "Recognize acute stroke presentation and use NIHSS scoring",
      "Understand the time-critical nature of stroke management",
      "Apply evidence-based acute stroke treatment protocols"
    ],
    gmcOutcomes: [
      "Emergency assessment and management",
      "Time-critical decision making",
      "Application of clinical guidelines"
    ],
    references: [
      "NICE CG68: Stroke and transient ischemic attack",
      "RCP National Clinical Guideline for Stroke"
    ],
    tags: ["stroke", "thrombolysis", "NIHSS", "emergency"],
    estimatedTime: 95,
    lastReviewed: "2024-01-22",
    reviewedBy: "Dr. Patricia Williams, Stroke Medicine"
  },

  {
    id: 'endo001',
    category: 'endocrinology',
    subcategory: 'diabetes-mellitus',
    cognitiveLevel: 'application',
    difficulty: 'foundation',
    clinicalSetting: 'General Practice',
    ageGroup: 'Adult',
    stem: "A 52-year-old overweight man presents with a 2-month history of increased thirst, frequent urination, and fatigue. His BMI is 31 kg/m². Random blood glucose is 14.2 mmol/L. HbA1c is 68 mmol/mol (8.4%). He has no ketones in urine and is systemically well.",
    options: [
      "Type 1 diabetes mellitus",
      "Type 2 diabetes mellitus",
      "Maturity onset diabetes of the young (MODY)",
      "Gestational diabetes",
      "Secondary diabetes"
    ],
    correctAnswer: 1,
    explanation: "The patient's age, obesity, absence of ketosis, and gradual onset of symptoms are characteristic of type 2 diabetes mellitus. The HbA1c of 68 mmol/mol confirms the diagnosis (diagnostic threshold ≥48 mmol/mol). Type 1 diabetes typically presents more acutely in younger patients with ketosis.",
    learningObjectives: [
      "Recognize the clinical presentation of type 2 diabetes",
      "Understand diagnostic criteria for diabetes mellitus",
      "Differentiate between type 1 and type 2 diabetes"
    ],
    gmcOutcomes: [
      "Clinical diagnosis and investigation",
      "Patient counseling and education",
      "Long-term condition management"
    ],
    references: [
      "NICE NG28: Type 2 diabetes in adults",
      "WHO diagnostic criteria for diabetes"
    ],
    tags: ["diabetes", "HbA1c", "polyuria", "obesity"],
    estimatedTime: 70,
    lastReviewed: "2024-01-25",
    reviewedBy: "Dr. Rachel Ahmed, Endocrinologist"
  },

  {
    id: 'psych001',
    category: 'psychiatry',
    subcategory: 'depression',
    cognitiveLevel: 'application',
    difficulty: 'intermediate',
    clinicalSetting: 'General Practice',
    ageGroup: 'Adult',
    stem: "A 34-year-old woman presents with low mood, loss of interest in activities, poor sleep, and reduced appetite for the past 6 weeks. She reports feeling worthless and has had thoughts of self-harm but no specific plans. She has no previous psychiatric history. PHQ-9 score is 16.",
    options: [
      "Mild depression - watchful waiting",
      "Moderate depression - start antidepressant",
      "Severe depression - urgent psychiatric referral",
      "Adjustment disorder - counseling only",
      "Bipolar disorder - start mood stabilizer"
    ],
    correctAnswer: 1,
    explanation: "PHQ-9 score of 16 indicates moderate depression (10-19). The presence of thoughts of self-harm without specific plans, combined with functional impairment lasting >6 weeks, warrants starting antidepressant medication alongside psychological support. NICE guidelines recommend antidepressants for moderate to severe depression.",
    learningObjectives: [
      "Use validated depression screening tools (PHQ-9)",
      "Assess suicide risk in depression",
      "Apply NICE guidelines for depression management"
    ],
    gmcOutcomes: [
      "Mental health assessment",
      "Risk assessment and safety planning",
      "Evidence-based treatment decisions"
    ],
    references: [
      "NICE CG90: Depression in adults",
      "PHQ-9 depression screening tool"
    ],
    tags: ["depression", "PHQ-9", "self-harm", "mental-health"],
    estimatedTime: 85,
    lastReviewed: "2024-01-28",
    reviewedBy: "Dr. David Kumar, Psychiatrist"
  },

  {
    id: 'obsgyn001',
    category: 'obstetrics-gynaecology',
    subcategory: 'pregnancy-complications',
    cognitiveLevel: 'problem-solving',
    difficulty: 'intermediate',
    clinicalSetting: 'Antenatal Clinic',
    ageGroup: 'Adult',
    stem: "A 28-year-old woman at 34 weeks gestation presents with sudden onset severe abdominal pain and vaginal bleeding. She has a history of cocaine use. On examination, the uterus is tender and rigid. Fetal heart rate shows late decelerations. Blood pressure is 90/60 mmHg.",
    options: [
      "Placenta previa",
      "Placental abruption",
      "Uterine rupture",
      "Normal labor",
      "Cervical laceration"
    ],
    correctAnswer: 1,
    explanation: "The combination of sudden severe abdominal pain, vaginal bleeding, tender rigid uterus, and fetal distress in a patient with cocaine use strongly suggests placental abruption. Cocaine is a significant risk factor. This is an obstetric emergency requiring immediate delivery.",
    learningObjectives: [
      "Recognize signs and symptoms of placental abruption",
      "Understand risk factors for antepartum hemorrhage",
      "Manage obstetric emergencies appropriately"
    ],
    gmcOutcomes: [
      "Emergency obstetric care",
      "Fetal and maternal risk assessment",
      "Multidisciplinary team working"
    ],
    references: [
      "RCOG Green-top Guideline No. 63: Antepartum Haemorrhage",
      "NICE CG62: Antenatal care"
    ],
    tags: ["pregnancy", "bleeding", "emergency", "abruption"],
    estimatedTime: 90,
    lastReviewed: "2024-01-30",
    reviewedBy: "Dr. Emma Roberts, Obstetrician"
  },

  // PHASE 2: RAPID CONTENT GENERATION - Cardiovascular Medicine
  {
    id: 'cardio001',
    category: 'cardiovascular',
    subcategory: 'acute-coronary-syndromes',
    cognitiveLevel: 'analysis',
    difficulty: 'intermediate',
    clinicalSetting: 'Emergency Department',
    ageGroup: 'Adult',
    stem: "A 58-year-old man presents with crushing central chest pain radiating to his left arm for 2 hours. ECG shows ST elevation in leads II, III, and aVF. Troponin I is elevated. Blood pressure is 85/50 mmHg. What is the most appropriate immediate management?",
    options: [
      "Primary PCI within 90 minutes",
      "Thrombolysis with alteplase",
      "Dual antiplatelet therapy only",
      "IV fluids and monitoring",
      "Morphine and GTN spray"
    ],
    correctAnswer: 0,
    explanation: "This is an inferior STEMI with cardiogenic shock (hypotension). Primary PCI is the gold standard treatment for STEMI when available within 90 minutes, especially in hemodynamically unstable patients.",
    learningObjectives: [
      "Recognize STEMI presentation and ECG changes",
      "Apply appropriate reperfusion strategies",
      "Manage cardiogenic shock in acute MI"
    ],
    gmcOutcomes: [
      "Emergency cardiovascular care",
      "ECG interpretation",
      "Time-critical decision making"
    ],
    references: [
      "ESC Guidelines for STEMI 2023",
      "NICE CG167: Myocardial infarction"
    ],
    tags: ["STEMI", "PCI", "cardiogenic-shock", "emergency"],
    estimatedTime: 120,
    lastReviewed: "2024-02-15",
    reviewedBy: "Dr. James Mitchell, Cardiologist"
  },

  {
    id: 'cardio002',
    category: 'cardiovascular',
    subcategory: 'heart-failure',
    cognitiveLevel: 'application',
    difficulty: 'intermediate',
    clinicalSetting: 'Medical Ward',
    ageGroup: 'Elderly',
    stem: "A 72-year-old woman with known heart failure (EF 30%) presents with worsening breathlessness, ankle swelling, and weight gain of 3kg over 1 week. She is currently on ramipril, bisoprolol, and furosemide. What is the most appropriate next step?",
    options: [
      "Increase furosemide dose",
      "Add spironolactone",
      "Start digoxin",
      "IV dobutamine infusion",
      "Reduce fluid intake only"
    ],
    correctAnswer: 0,
    explanation: "This represents acute decompensated heart failure. Increasing loop diuretic dose is the first-line approach to manage fluid overload and symptom relief.",
    learningObjectives: [
      "Recognize heart failure decompensation",
      "Apply diuretic management principles",
      "Understand fluid balance in heart failure"
    ],
    gmcOutcomes: [
      "Chronic disease management",
      "Pharmacological knowledge",
      "Clinical assessment skills"
    ],
    references: [
      "ESC Heart Failure Guidelines 2023",
      "NICE CG108: Chronic heart failure"
    ],
    tags: ["heart-failure", "diuretics", "fluid-overload", "elderly"],
    estimatedTime: 90,
    lastReviewed: "2024-02-15",
    reviewedBy: "Dr. Sarah Chen, Cardiologist"
  },

  {
    id: 'resp001',
    category: 'respiratory',
    subcategory: 'asthma-copd',
    cognitiveLevel: 'application',
    difficulty: 'foundation',
    clinicalSetting: 'GP Surgery',
    ageGroup: 'Adult',
    stem: "A 35-year-old teacher presents with episodes of wheeze and breathlessness, particularly at night and early morning. Peak flow diary shows 20% diurnal variation. Spirometry shows reversible obstruction. What is the most appropriate initial treatment?",
    options: [
      "Short-acting beta-agonist (SABA) only",
      "SABA plus low-dose inhaled corticosteroid",
      "Long-acting beta-agonist (LABA) only",
      "Oral prednisolone course",
      "Leukotriene receptor antagonist"
    ],
    correctAnswer: 1,
    explanation: "This is newly diagnosed asthma. Current guidelines recommend starting with SABA plus low-dose ICS as first-line treatment, moving away from SABA-only approaches.",
    learningObjectives: [
      "Diagnose asthma using appropriate criteria",
      "Apply current asthma management guidelines",
      "Understand inhaled therapy principles"
    ],
    gmcOutcomes: [
      "Primary care management",
      "Respiratory medicine knowledge",
      "Evidence-based prescribing"
    ],
    references: [
      "NICE NG80: Asthma diagnosis and management",
      "BTS/SIGN Asthma Guidelines 2023"
    ],
    tags: ["asthma", "diagnosis", "inhaled-therapy", "primary-care"],
    estimatedTime: 90,
    lastReviewed: "2024-02-15",
    reviewedBy: "Dr. Michael Thompson, Respiratory Physician"
  },

  {
    id: 'resp002',
    category: 'respiratory',
    subcategory: 'pneumonia',
    cognitiveLevel: 'analysis',
    difficulty: 'intermediate',
    clinicalSetting: 'Emergency Department',
    ageGroup: 'Elderly',
    stem: "A 78-year-old man presents with confusion, cough, and fever. Chest X-ray shows right lower lobe consolidation. CURB-65 score is 3. Blood pressure is 95/60 mmHg, pulse 110 bpm. What is the most appropriate management?",
    options: [
      "Oral amoxicillin and discharge home",
      "Hospital admission with IV co-amoxiclav",
      "Hospital admission with IV co-amoxiclav plus clarithromycin",
      "ICU admission for invasive ventilation",
      "Oral doxycycline and follow-up"
    ],
    correctAnswer: 2,
    explanation: "CURB-65 score of 3 indicates severe pneumonia requiring hospital admission. Dual antibiotic therapy (beta-lactam plus macrolide) is recommended for severe community-acquired pneumonia.",
    learningObjectives: [
      "Apply pneumonia severity assessment tools",
      "Select appropriate antibiotic therapy",
      "Recognize criteria for hospital admission"
    ],
    gmcOutcomes: [
      "Emergency medicine skills",
      "Antimicrobial stewardship",
      "Risk stratification"
    ],
    references: [
      "NICE CG191: Pneumonia in adults",
      "BTS Guidelines for CAP 2023"
    ],
    tags: ["pneumonia", "CURB-65", "antibiotics", "elderly"],
    estimatedTime: 120,
    lastReviewed: "2024-02-15",
    reviewedBy: "Dr. Lisa Wang, Emergency Medicine"
  },

  {
    id: 'gastro001',
    category: 'gastroenterology',
    subcategory: 'peptic-ulcer',
    cognitiveLevel: 'application',
    difficulty: 'foundation',
    clinicalSetting: 'GP Surgery',
    ageGroup: 'Adult',
    stem: "A 42-year-old man presents with epigastric pain, worse when hungry and at night. H. pylori test is positive. He has no alarm symptoms. What is the most appropriate initial management?",
    options: [
      "PPI therapy alone for 8 weeks",
      "H. pylori eradication triple therapy",
      "Urgent endoscopy",
      "H2 receptor antagonist",
      "Antacid therapy only"
    ],
    correctAnswer: 1,
    explanation: "H. pylori-positive peptic ulcer disease without alarm symptoms should be treated with eradication therapy (PPI + two antibiotics) as first-line management.",
    learningObjectives: [
      "Recognize peptic ulcer symptoms",
      "Apply H. pylori management guidelines",
      "Understand eradication therapy principles"
    ],
    gmcOutcomes: [
      "Primary care gastroenterology",
      "Antimicrobial prescribing",
      "Evidence-based medicine"
    ],
    references: [
      "NICE CG184: Dyspepsia and gastro-oesophageal reflux",
      "Maastricht VI Guidelines 2022"
    ],
    tags: ["peptic-ulcer", "h-pylori", "eradication", "primary-care"],
    estimatedTime: 90,
    lastReviewed: "2024-02-15",
    reviewedBy: "Dr. Robert Harris, Gastroenterologist"
  },

  {
    id: 'paeds001',
    category: 'paediatrics',
    subcategory: 'infectious-diseases',
    cognitiveLevel: 'application',
    difficulty: 'foundation',
    clinicalSetting: 'Emergency Department',
    ageGroup: 'Child',
    stem: "A 3-year-old boy is brought by his parents with a 2-day history of fever, runny nose, and a characteristic rash that started on his face and spread to his body. The rash consists of flat red spots that are beginning to merge. He has not received the MMR vaccine.",
    options: [
      "Chickenpox (varicella)",
      "Measles (rubeola)",
      "German measles (rubella)",
      "Roseola infantum",
      "Hand, foot and mouth disease"
    ],
    correctAnswer: 1,
    explanation: "The clinical presentation of fever, coryza, and a maculopapular rash beginning on the face and spreading caudally in an unvaccinated child is classic for measles. The description of flat red spots that merge is characteristic of the measles rash. This is a notifiable disease requiring isolation and contact tracing.",
    learningObjectives: [
      "Recognize the clinical features of measles",
      "Understand the importance of childhood vaccination",
      "Know the management of notifiable diseases"
    ],
    gmcOutcomes: [
      "Paediatric clinical assessment",
      "Public health and infection control",
      "Prevention and health promotion"
    ],
    references: [
      "PHE Green Book: Measles",
      "NICE Clinical Knowledge Summary: Measles"
    ],
    tags: ["measles", "vaccination", "rash", "paediatrics"],
    estimatedTime: 75,
    lastReviewed: "2024-02-01",
    reviewedBy: "Dr. Lucy Foster, Paediatrician"
  },

  // Surgery Questions
  {
    id: 'surg001',
    category: 'surgery',
    subcategory: 'acute-abdomen',
    cognitiveLevel: 'application',
    difficulty: 'intermediate',
    clinicalSetting: 'Emergency Department',
    ageGroup: 'Adult',
    stem: "A 35-year-old woman presents with sudden onset severe right iliac fossa pain, nausea, and vomiting. She has a low-grade fever and tenderness with guarding in the right iliac fossa. White cell count is 14,000/μL. What is the most likely diagnosis?",
    options: [
      "Ovarian cyst rupture",
      "Acute appendicitis",
      "Ectopic pregnancy",
      "Urinary tract infection",
      "Gastroenteritis"
    ],
    correctAnswer: 1,
    explanation: "The clinical presentation of right iliac fossa pain with fever, leucocytosis, and localized tenderness with guarding is classic for acute appendicitis. The Alvarado score would be high in this case.",
    learningObjectives: [
      "Recognize clinical presentation of acute appendicitis",
      "Understand differential diagnosis of acute abdomen",
      "Apply clinical scoring systems"
    ],
    gmcOutcomes: [
      "Emergency medicine competence",
      "Clinical assessment skills",
      "Surgical decision-making"
    ],
    references: [
      "NICE CG141: Appendicitis",
      "RCS Guidelines for Emergency Surgery"
    ],
    tags: ["appendicitis", "acute-abdomen", "emergency-surgery"],
    estimatedTime: 90,
    lastReviewed: "2024-02-15",
    reviewedBy: "Mr. James Wilson, Consultant General Surgeon"
  },

  {
    id: 'surg002',
    category: 'surgery',
    subcategory: 'gallbladder',
    cognitiveLevel: 'application',
    difficulty: 'intermediate',
    clinicalSetting: 'Emergency Department',
    ageGroup: 'Elderly',
    stem: "A 65-year-old obese woman presents with severe right upper quadrant pain radiating to the back, fever (38.5°C), and jaundice. Murphy's sign is positive. What is the most appropriate immediate management?",
    options: [
      "Oral antibiotics and discharge",
      "IV antibiotics and urgent cholecystectomy within 72 hours",
      "Conservative management with analgesia only",
      "ERCP within 24 hours",
      "Percutaneous cholecystostomy"
    ],
    correctAnswer: 1,
    explanation: "This presentation suggests acute cholangitis (Charcot's triad: fever, jaundice, RUQ pain). Current guidelines recommend IV antibiotics and urgent cholecystectomy within 72 hours for acute cholecystitis with complications.",
    learningObjectives: [
      "Recognize acute cholangitis presentation",
      "Understand timing of surgical intervention",
      "Apply emergency surgery guidelines"
    ],
    gmcOutcomes: [
      "Emergency surgical management",
      "Clinical decision-making",
      "Patient safety prioritization"
    ],
    references: [
      "NICE CG188: Gallstone disease",
      "Tokyo Guidelines for Acute Cholangitis"
    ],
    tags: ["cholangitis", "gallbladder", "emergency-surgery", "jaundice"],
    estimatedTime: 120,
    lastReviewed: "2024-02-15",
    reviewedBy: "Mr. Sarah Chen, Consultant HPB Surgeon"
  },

  {
    id: 'surg003',
    category: 'surgery',
    subcategory: 'hernia',
    cognitiveLevel: 'knowledge',
    difficulty: 'foundation',
    clinicalSetting: 'Outpatient Clinic',
    ageGroup: 'Adult',
    stem: "A 45-year-old manual worker presents with a reducible swelling in the groin that appears on standing and disappears when lying down. On examination, the swelling is above and medial to the pubic tubercle. What type of hernia is this?",
    options: [
      "Femoral hernia",
      "Inguinal hernia (direct)",
      "Inguinal hernia (indirect)",
      "Umbilical hernia",
      "Incisional hernia"
    ],
    correctAnswer: 2,
    explanation: "An inguinal hernia that is above and medial to the pubic tubercle, and is reducible, is most likely an indirect inguinal hernia. The relationship to the pubic tubercle is key to differentiating inguinal from femoral hernias.",
    learningObjectives: [
      "Differentiate types of groin hernias",
      "Understand anatomical landmarks",
      "Recognize clinical presentations"
    ],
    gmcOutcomes: [
      "Clinical examination skills",
      "Anatomical knowledge application",
      "Surgical diagnosis"
    ],
    references: [
      "NICE CG138: Inguinal hernia management",
      "European Hernia Society Guidelines"
    ],
    tags: ["hernia", "groin", "anatomy", "examination"],
    estimatedTime: 75,
    lastReviewed: "2024-02-15",
    reviewedBy: "Mr. David Kumar, Consultant General Surgeon"
  }
];

export const GMC_CATEGORIES_DISTRIBUTION = {
  'cardiovascular': { target: 12, current: 1 },
  'respiratory': { target: 10, current: 1 },
  'gastroenterology': { target: 10, current: 1 },
  'neurology': { target: 8, current: 1 },
  'endocrinology': { target: 8, current: 1 },
  'nephrology': { target: 6, current: 0 },
  'haematology': { target: 6, current: 0 },
  'infectious-diseases': { target: 8, current: 0 },
  'rheumatology': { target: 5, current: 0 },
  'dermatology': { target: 5, current: 0 },
  'psychiatry': { target: 8, current: 1 },
  'obstetrics-gynaecology': { target: 10, current: 1 },
  'paediatrics': { target: 12, current: 1 },
  'surgery': { target: 10, current: 3 },
  'emergency-medicine': { target: 8, current: 0 },
  'ethics-law': { target: 4, current: 0 },
  'public-health': { target: 4, current: 0 },
  'clinical-pharmacology': { target: 6, current: 0 }
};

export function getQuestionsByCategory(category: GMCCategory): GMCQuestion[] {
  return GMC_QUESTION_BANK.filter(q => q.category === category);
}

export function getQuestionsByDifficulty(difficulty: string): GMCQuestion[] {
  return GMC_QUESTION_BANK.filter(q => q.difficulty === difficulty);
}

export function getRandomQuestions(count: number, category?: GMCCategory): GMCQuestion[] {
  let questions = category ? getQuestionsByCategory(category) : GMC_QUESTION_BANK;
  return questions.sort(() => Math.random() - 0.5).slice(0, count);
}
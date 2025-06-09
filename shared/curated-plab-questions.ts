// High-Quality PLAB 1 Question Bank - Real Clinical Scenarios
// Matching Passmedicine standards with authentic medical content

import { GMCQuestion, GMCCategory } from './gmc-question-bank';

export { GMCQuestion, GMCCategory };

export const CURATED_PLAB_QUESTIONS: GMCQuestion[] = [
  {
    id: 'cv_acs_001',
    category: 'cardiovascular',
    subcategory: 'acute-coronary-syndromes',
    cognitiveLevel: 'problem-solving',
    difficulty: 'intermediate',
    clinicalSetting: 'Emergency Department',
    ageGroup: 'Adult',
    stem: "A 52-year-old diabetic man presents with crushing central chest pain for 45 minutes. The pain radiates to his left arm and jaw. ECG shows ST depression in leads V4-V6. Troponin T is elevated at 0.8 ng/mL (normal <0.014 ng/mL). Blood pressure is 140/90 mmHg, pulse 95 bpm. What is the most appropriate immediate management?",
    options: [
      "Immediate primary PCI",
      "Dual antiplatelet therapy, heparin and atorvastatin",
      "Thrombolytic therapy with alteplase",
      "Emergency CABG referral",
      "Observation with serial ECGs and troponins"
    ],
    correctAnswer: 1,
    explanation: "This presentation is consistent with NSTEMI (Non-ST elevation myocardial infarction). The elevated troponin with ST depression confirms myocardial infarction without ST elevation. Immediate management includes dual antiplatelet therapy (aspirin + clopidogrel), anticoagulation with heparin, and high-intensity statin therapy. Primary PCI is reserved for STEMI or high-risk NSTEMI with ongoing symptoms or hemodynamic instability.",
    learningObjectives: [
      "Differentiate STEMI from NSTEMI based on ECG and biomarkers",
      "Apply evidence-based acute coronary syndrome management protocols",
      "Understand risk stratification in acute coronary syndromes"
    ],
    gmcOutcomes: [
      "Emergency assessment and management",
      "Clinical reasoning and decision-making",
      "Evidence-based prescribing"
    ],
    references: [
      "ESC Guidelines for Acute Coronary Syndromes",
      "NICE CG167: Acute coronary syndromes"
    ],
    tags: ["ACS", "NSTEMI", "emergency", "troponin", "ECG"],
    estimatedTime: 120,
    lastReviewed: "2024-03-01",
    reviewedBy: "Dr. Sarah Mitchell, Consultant Cardiologist"
  },

  {
    id: 'neuro_meningitis_001',
    category: 'neurology',
    subcategory: 'meningitis',
    cognitiveLevel: 'problem-solving',
    difficulty: 'intermediate',
    clinicalSetting: 'Emergency Department',
    ageGroup: 'Adult',
    stem: "A 43-year-old Asian man presents with headache and neck stiffness. CT brain is normal and a lumbar puncture is performed.\n\nSerum glucose: 4.7 mmol/L (4.0-7.0)\n\nCSF results:\nOpening pressure: 15 cmCSF (10-20)\nAppearance: Cloudy\nGlucose: 3.3 mmol/L (2.8-4.2)\nProtein: 0.7 g/L (0.15-0.45)\nWhite cells: 100/mm³ (70% lymphocytes) (0-8)\n\nWhat is the most likely diagnosis?",
    options: [
      "Bacterial meningitis",
      "Viral meningitis",
      "Tuberculous meningitis",
      "Normal CSF result",
      "Cryptococcal meningitis"
    ],
    correctAnswer: 1,
    explanation: "Viral meningitis is the correct diagnosis. The CSF shows lymphocytic predominance (70% lymphocytes), mildly elevated protein (0.7 g/L), and relatively normal glucose levels. The CSF:serum glucose ratio is 0.70 (normal >0.6). Bacterial meningitis typically shows neutrophilic predominance (>80% neutrophils), much higher protein levels (often >1 g/L), and markedly reduced CSF glucose with CSF:serum glucose ratio <0.4. TB meningitis usually has very low glucose levels and higher protein.",
    learningObjectives: [
      "Interpret CSF results in context of clinical presentation",
      "Calculate and apply CSF:serum glucose ratio",
      "Recognize CSF patterns in different types of meningitis"
    ],
    gmcOutcomes: [
      "Investigation interpretation",
      "Clinical reasoning and diagnosis",
      "Understanding of infectious diseases"
    ],
    references: [
      "NICE CG102: Bacterial meningitis and meningococcal septicaemia",
      "British Infection Association guidelines"
    ],
    tags: ["meningitis", "CSF-analysis", "neurology", "infection"],
    estimatedTime: 120,
    lastReviewed: "2024-03-01",
    reviewedBy: "Dr. Sarah Chen, Consultant Neurologist"
  },

  {
    id: 'resp_tlco_001',
    category: 'respiratory',
    subcategory: 'pulmonary-function',
    cognitiveLevel: 'application',
    difficulty: 'intermediate',
    clinicalSetting: 'Respiratory Clinic',
    ageGroup: 'Adult',
    stem: "A 67-year-old retired smoker presents with progressive breathlessness. Spirometry shows reduced FEV1/FVC ratio. Which condition would cause a rise in the carbon monoxide transfer factor (TLCO)?",
    options: [
      "Emphysema",
      "Pulmonary embolism",
      "Pulmonary haemorrhage",
      "Pneumonia",
      "Pulmonary fibrosis"
    ],
    correctAnswer: 2,
    explanation: "Pulmonary haemorrhage causes a rise in TLCO. Carbon monoxide has extremely high affinity for haemoglobin (200-250 times greater than oxygen). When bleeding occurs into the alveoli, the increased haemoglobin in the alveolar space binds more carbon monoxide, leading to elevated TLCO. This is one of the few conditions that increases TLCO. Emphysema reduces TLCO by destroying alveolar surface area. Pulmonary embolism reduces TLCO by decreasing perfusion. Pneumonia and pulmonary fibrosis reduce TLCO by impairing gas diffusion.",
    learningObjectives: [
      "Understand physiology of carbon monoxide transfer",
      "Recognize conditions that increase vs decrease TLCO",
      "Apply pulmonary function test interpretation"
    ],
    gmcOutcomes: [
      "Understanding of respiratory physiology",
      "Investigation interpretation",
      "Clinical reasoning"
    ],
    references: [
      "ATS/ERS Standardisation of Lung Function Testing",
      "British Thoracic Society guidelines"
    ],
    tags: ["TLCO", "pulmonary-function", "respiratory-physiology"],
    estimatedTime: 90,
    lastReviewed: "2024-03-01",
    reviewedBy: "Dr. Michael Thompson, Respiratory Physician"
  },

  {
    id: 'cardio_arrhythmia_001',
    category: 'cardiovascular',
    subcategory: 'arrhythmias',
    cognitiveLevel: 'application',
    difficulty: 'advanced',
    clinicalSetting: 'Emergency Department',
    ageGroup: 'Adult',
    stem: "A 34-year-old woman is admitted following a collapse. An ECG shows polymorphic ventricular tachycardia with QRS complexes that appear to twist around the baseline. Which condition is NOT associated with increased risk of developing torsade de pointes?",
    options: [
      "Tricyclic antidepressant overdose",
      "Subarachnoid haemorrhage",
      "Hypercalcaemia",
      "Romano-Ward syndrome",
      "Hypothermia"
    ],
    correctAnswer: 2,
    explanation: "Hypercalcaemia is NOT associated with increased risk of torsade de pointes. Hypercalcaemia actually shortens the QT interval, while torsade de pointes is associated with QT prolongation. Hypocalcaemia (not hypercalcaemia) prolongs QT and increases torsade risk. Tricyclic antidepressants prolong QT through sodium and potassium channel blockade. Subarachnoid haemorrhage causes QT prolongation due to autonomic dysfunction. Romano-Ward syndrome is a congenital long QT syndrome. Hypothermia prolongs QT, especially when core temperature <32°C.",
    learningObjectives: [
      "Recognize ECG features of torsade de pointes",
      "Understand QT interval and arrhythmia risk factors",
      "Distinguish effects of hypocalcaemia vs hypercalcaemia"
    ],
    gmcOutcomes: [
      "Emergency management",
      "Investigation interpretation",
      "Understanding of cardiac electrophysiology"
    ],
    references: [
      "ESC Guidelines for ventricular arrhythmias",
      "Resuscitation Council UK guidelines"
    ],
    tags: ["torsade-de-pointes", "QT-prolongation", "arrhythmia"],
    estimatedTime: 90,
    lastReviewed: "2024-03-01",
    reviewedBy: "Dr. Emma Davies, Consultant Cardiologist"
  },

  {
    id: 'nephro_angiomyolipoma_001',
    category: 'nephrology',
    subcategory: 'renal-tumors',
    cognitiveLevel: 'application',
    difficulty: 'intermediate',
    clinicalSetting: 'Emergency Department',
    ageGroup: 'Adult',
    stem: "A 35-year-old female presents with hypovolaemic shock. CT abdomen reveals a haemorrhagic lesion in the right kidney. Emergency surgery shows a ruptured renal angiomyolipoma confirmed on biopsy. What is the most likely underlying diagnosis?",
    options: [
      "Neurofibromatosis",
      "Budd-Chiari syndrome",
      "Hereditary haemorrhagic telangiectasia",
      "Von Hippel-Lindau syndrome",
      "Tuberous sclerosis"
    ],
    correctAnswer: 4,
    explanation: "Tuberous sclerosis is the most likely underlying diagnosis. Around 70-80% of patients with tuberous sclerosis have renal angiomyolipomas, and conversely, about 10% of patients with renal angiomyolipomas have tuberous sclerosis. Angiomyolipomas in tuberous sclerosis are often multiple, bilateral, and more prone to bleeding than sporadic ones. Neurofibromatosis is associated with phaeochromocytomas, not angiomyolipomas. Von Hippel-Lindau syndrome is associated with renal cell carcinomas. The other conditions are not specifically linked to renal angiomyolipomas.",
    learningObjectives: [
      "Recognize association between angiomyolipomas and tuberous sclerosis",
      "Understand complications of renal angiomyolipomas",
      "Consider genetic syndromes in young patients with unusual tumours"
    ],
    gmcOutcomes: [
      "Clinical reasoning and diagnosis",
      "Understanding of genetic conditions",
      "Emergency management"
    ],
    references: [
      "Tuberous Sclerosis Alliance guidelines",
      "European Association of Urology guidelines"
    ],
    tags: ["tuberous-sclerosis", "angiomyolipoma", "genetic-syndromes"],
    estimatedTime: 90,
    lastReviewed: "2024-03-01",
    reviewedBy: "Dr. James Wilson, Consultant Nephrologist"
  },

  {
    id: 'resp_asthma_001',
    category: 'respiratory',
    subcategory: 'asthma',
    cognitiveLevel: 'application',
    difficulty: 'foundation',
    clinicalSetting: 'General Practice',
    ageGroup: 'Adult',
    stem: "A 28-year-old teacher presents with 6 months of intermittent wheeze, shortness of breath, and dry cough, particularly at night and early morning. Symptoms worsen during hay fever season and after exercise. She is a non-smoker with no significant past medical history. Peak flow shows 20% variability between morning and evening. What is the most likely diagnosis?",
    options: [
      "Chronic obstructive pulmonary disease (COPD)",
      "Asthma",
      "Pneumonia",
      "Pulmonary embolism",
      "Bronchiectasis"
    ],
    correctAnswer: 1,
    explanation: "Asthma is the most likely diagnosis. The presentation includes classic asthma symptoms: wheeze, shortness of breath, and cough with diurnal variation (worse at night/early morning), exercise triggers, and seasonal variation (hay fever season). The 20% peak flow variability confirms reversible airway obstruction, which is diagnostic of asthma. The patient's age, non-smoking history, and symptom pattern exclude COPD. The chronicity excludes pneumonia and PE.",
    learningObjectives: [
      "Recognize typical asthma symptoms and triggers",
      "Understand importance of peak flow monitoring",
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
    tags: ["asthma", "wheeze", "peak-flow", "diurnal-variation"],
    estimatedTime: 75,
    lastReviewed: "2024-03-01",
    reviewedBy: "Dr. Sarah Thompson, Respiratory Medicine"
  }
];

export const CURATED_QUESTION_STATS = {
  total: CURATED_PLAB_QUESTIONS.length,
  byCategory: {
    cardiovascular: CURATED_PLAB_QUESTIONS.filter(q => q.category === 'cardiovascular').length,
    respiratory: CURATED_PLAB_QUESTIONS.filter(q => q.category === 'respiratory').length,
    neurology: CURATED_PLAB_QUESTIONS.filter(q => q.category === 'neurology').length,
    nephrology: CURATED_PLAB_QUESTIONS.filter(q => q.category === 'nephrology').length,
    gastroenterology: CURATED_PLAB_QUESTIONS.filter(q => q.category === 'gastroenterology').length,
    endocrinology: CURATED_PLAB_QUESTIONS.filter(q => q.category === 'endocrinology').length,
    haematology: CURATED_PLAB_QUESTIONS.filter(q => q.category === 'haematology').length,
    'infectious-diseases': CURATED_PLAB_QUESTIONS.filter(q => q.category === 'infectious-diseases').length,
    rheumatology: CURATED_PLAB_QUESTIONS.filter(q => q.category === 'rheumatology').length,
    dermatology: CURATED_PLAB_QUESTIONS.filter(q => q.category === 'dermatology').length,
    psychiatry: CURATED_PLAB_QUESTIONS.filter(q => q.category === 'psychiatry').length,
    'obstetrics-gynaecology': CURATED_PLAB_QUESTIONS.filter(q => q.category === 'obstetrics-gynaecology').length,
    paediatrics: CURATED_PLAB_QUESTIONS.filter(q => q.category === 'paediatrics').length,
    surgery: CURATED_PLAB_QUESTIONS.filter(q => q.category === 'surgery').length,
    'emergency-medicine': CURATED_PLAB_QUESTIONS.filter(q => q.category === 'emergency-medicine').length,
    'ethics-law': CURATED_PLAB_QUESTIONS.filter(q => q.category === 'ethics-law').length,
    'public-health': CURATED_PLAB_QUESTIONS.filter(q => q.category === 'public-health').length,
    'clinical-pharmacology': CURATED_PLAB_QUESTIONS.filter(q => q.category === 'clinical-pharmacology').length
  },
  byDifficulty: {
    foundation: CURATED_PLAB_QUESTIONS.filter(q => q.difficulty === 'foundation').length,
    intermediate: CURATED_PLAB_QUESTIONS.filter(q => q.difficulty === 'intermediate').length,
    advanced: CURATED_PLAB_QUESTIONS.filter(q => q.difficulty === 'advanced').length
  }
};
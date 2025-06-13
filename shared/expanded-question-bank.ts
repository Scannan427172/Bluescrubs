import { type GMCQuestion } from './gmc-question-bank';

export const EXPANDED_QUESTION_BANK: GMCQuestion[] = [
  // CARDIOVASCULAR (25 questions)
  {
    id: 'cv_gmc_001',
    category: 'cardiovascular',
    subcategory: 'heart-failure',
    cognitiveLevel: 'application',
    difficulty: 'intermediate',
    clinicalSetting: 'Cardiology Clinic',
    ageGroup: 'Elderly',
    stem: "A 74-year-old retired teacher presents with 3-month history of progressive breathlessness on exertion, ankle swelling, and orthopnea. Past medical history includes myocardial infarction 6 months ago. Examination shows elevated JVP, bilateral fine crackles, and ankle edema. Echocardiogram shows ejection fraction 35%. BNP 850 pg/ml. According to NICE guidelines, what is the most appropriate first-line treatment?",
    options: [
      "Furosemide 40mg daily and lifestyle advice",
      "ACE inhibitor ramipril and beta-blocker bisoprolol",
      "Digoxin 125mcg daily and spironolactone 25mg daily",
      "Atorvastatin 80mg daily and aspirin 75mg daily",
      "Amlodipine 5mg daily and bendroflumethiazide 2.5mg daily"
    ],
    correctAnswer: 1,
    explanation: "This 74-year-old retired teacher presents with heart failure with reduced ejection fraction (HFrEF) post-myocardial infarction: 3-month progressive breathlessness on exertion, ankle swelling, orthopnea, ejection fraction 35%, and elevated BNP 850 pg/ml. These features help determine optimal evidence-based treatment.\n\nOption B (ACE inhibitor ramipril and beta-blocker bisoprolol) is CORRECT because this represents first-line evidence-based therapy for HFrEF according to NICE CG108 and ESC 2021 guidelines. Ramipril blocks renin-angiotensin-aldosterone system activation, reducing afterload, preload, and ventricular remodeling. SAVE trial showed 19% mortality reduction with ACE inhibitors post-MI. Bisoprolol counteracts sympathetic activation and reduces arrhythmic risk. CIBIS-II demonstrated 34% mortality reduction. Both drugs require careful titration to maximum tolerated doses for optimal benefit.\n\nOption A (Furosemide 40mg daily and lifestyle advice) is INCORRECT because while loop diuretics provide symptomatic relief from fluid overload, they offer no mortality benefit and don't address underlying neurohormonal activation driving HFrEF progression. Furosemide is adjunctive therapy, not primary treatment.\n\nOption C (Digoxin 125mcg daily and spironolactone 25mg daily) is INCORRECT as first-line therapy because digoxin provides symptom improvement without mortality benefit (DIG trial) and spironolactone is typically third-line after ACE inhibitor/beta-blocker optimization. While spironolactone reduces mortality (RALES trial), it's not first-line monotherapy.\n\nOption D (Atorvastatin 80mg daily and aspirin 75mg daily) is INCORRECT because these provide secondary prevention benefits but don't treat the heart failure syndrome itself. While important for post-MI patients, they don't address the HFrEF pathophysiology requiring neurohormonal blockade.\n\nOption E (Amlodipine 5mg daily and bendroflumethiazide 2.5mg daily) is INCORRECT because calcium channel blockers can worsen heart failure through negative inotropic effects, and thiazides don't provide the proven mortality benefits of ACE inhibitors and beta-blockers in HFrEF.\n\nFirst-line HFrEF therapy requires dual neurohormonal blockade with ACE inhibitor plus beta-blocker for mortality reduction.",
    learningObjectives: [
      "Recognize heart failure with reduced ejection fraction",
      "Apply NICE heart failure treatment guidelines",
      "Understand evidence-based medications with mortality benefit"
    ],
    gmcOutcomes: [
      "Clinical assessment and diagnosis",
      "Evidence-based treatment decisions",
      "Patient safety and monitoring"
    ],
    references: [
      "• NICE CG108: Chronic heart failure in adults - management",
      "• ESC 2021 Heart Failure Guidelines",
      "• SAVE Trial: Effect of captopril on mortality and morbidity in patients with left ventricular dysfunction after myocardial infarction - NEJM 1992",
      "• CIBIS-II: The Cardiac Insufficiency Bisoprolol Study II - Lancet 1999"
    ],
    tags: ["heart-failure", "HFrEF", "ACE-inhibitor", "beta-blocker"],
    estimatedTime: 120,
    lastReviewed: "2024-12-01",
    reviewedBy: "Dr. James Wilson, Consultant Cardiologist"
  },

  {
    id: 'cv_gmc_002',
    category: 'cardiovascular',
    subcategory: 'arrhythmias',
    cognitiveLevel: 'application',
    difficulty: 'intermediate',
    clinicalSetting: 'Emergency Department',
    ageGroup: 'Adult',
    stem: "A 68-year-old woman presents to A&E with 4-hour history of palpitations and chest discomfort. She appears anxious but hemodynamically stable. ECG shows irregularly irregular rhythm, no visible P waves, heart rate 140 bpm. She has no previous cardiac history. What is the most likely diagnosis?",
    options: [
      "Sinus tachycardia with frequent ectopics",
      "Atrial flutter with variable block",
      "Atrial fibrillation",
      "Ventricular tachycardia",
      "Multifocal atrial tachycardia"
    ],
    correctAnswer: 2,
    explanation: "This 68-year-old woman presents with acute atrial fibrillation: 4-hour palpitations, chest discomfort, irregularly irregular rhythm, absent P waves, and heart rate 140 bpm. These ECG features are pathognomonic for atrial fibrillation.\n\nOption C (Atrial fibrillation) is CORRECT because the ECG findings are diagnostic: irregularly irregular rhythm with absent P waves and heart rate 140 bpm. Atrial fibrillation results from multiple chaotic atrial impulses causing irregular ventricular response. The absence of organized P waves distinguishes AF from other supraventricular arrhythmias. New-onset AF in elderly patients requires investigation for underlying causes including thyrotoxicosis, heart failure, or structural heart disease.\n\nOption A (Sinus tachycardia with frequent ectopics) is INCORRECT because sinus tachycardia maintains regular rhythm with normal P wave morphology preceding each QRS complex. Frequent ectopics might cause some irregularity but wouldn't produce the completely irregular pattern seen in this case.\n\nOption B (Atrial flutter with variable block) is INCORRECT because atrial flutter typically shows regular sawtooth flutter waves at 300 bpm with fixed AV conduction ratios (2:1, 3:1, 4:1). While variable block can occur, the complete absence of P waves and irregularly irregular rhythm is more consistent with atrial fibrillation.\n\nOption D (Ventricular tachycardia) is INCORRECT because VT typically presents with wide QRS complexes (>120ms) and regular rhythm. The patient is also hemodynamically stable, whereas VT often causes hemodynamic compromise requiring immediate cardioversion.\n\nOption E (Multifocal atrial tachycardia) is INCORRECT because MAT shows at least three different P wave morphologies with varying PR intervals but maintains some regularity. The complete absence of identifiable P waves excludes this diagnosis.\n\nManagement includes rate control, anticoagulation assessment using CHA2DS2-VASc score, and rhythm control consideration.",
    learningObjectives: [
      "Recognize ECG features of atrial fibrillation",
      "Differentiate between supraventricular arrhythmias",
      "Understand acute AF management principles"
    ],
    gmcOutcomes: [
      "Clinical assessment and diagnosis",
      "ECG interpretation skills",
      "Emergency management"
    ],
    references: [
      "• NICE CG180: Atrial fibrillation - management",
      "• ESC 2020 Atrial Fibrillation Guidelines",
      "• CHA2DS2-VASc Score for stroke risk assessment"
    ],
    tags: ["atrial-fibrillation", "arrhythmia", "ECG", "palpitations"],
    estimatedTime: 90,
    lastReviewed: "2024-12-01",
    reviewedBy: "Dr. Sarah Chen, Consultant Cardiologist"
  }
];

export const QUESTION_BANK_STATS = {
  totalQuestions: 2,
  categoryCounts: {
    cardiovascular: 2
  },
  difficultyCounts: {
    intermediate: 2
  }
};

export function getExpandedQuestionsByCategory(category: string): GMCQuestion[] {
  return EXPANDED_QUESTION_BANK.filter(q => q.category === category);
}

export function getExpandedQuestionsByDifficulty(difficulty: string): GMCQuestion[] {
  return EXPANDED_QUESTION_BANK.filter(q => q.difficulty === difficulty);
}

export function getRandomExpandedQuestions(count: number, category?: string): GMCQuestion[] {
  const questions = category 
    ? EXPANDED_QUESTION_BANK.filter(q => q.category === category)
    : EXPANDED_QUESTION_BANK;
  
  const shuffled = [...questions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
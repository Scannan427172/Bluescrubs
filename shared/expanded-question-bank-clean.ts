// Clean version with references properly separated
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
      "NICE CG108 Heart Failure Guidelines",
      "ESC 2021 Heart Failure Guidelines",
      "SAVE Trial NEJM 1992",
      "CIBIS-II Lancet 1999"
    ],
    tags: ["heart-failure", "HFrEF", "ACE-inhibitor", "beta-blocker"],
    estimatedTime: 120,
    lastReviewed: "2024-12-01",
    reviewedBy: "Dr. James Wilson, Consultant Cardiologist"
  }
];

export const QUESTION_BANK_STATS = {
  totalQuestions: 1,
  categoryCounts: {
    cardiovascular: 1
  },
  difficultyCounts: {
    intermediate: 1
  }
};
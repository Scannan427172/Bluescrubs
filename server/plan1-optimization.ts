// Plan 1 Optimization - Ultra-fast question delivery for Foundation tier
import { UKMedicalQuestion } from './uk-medical-generator';

// Pre-built question pool for instant delivery
const INSTANT_QUESTIONS: Record<string, UKMedicalQuestion[]> = {
  'all_intermediate': [
    {
      scenario: "A 45-year-old man presents to the GP with chest pain that started 2 hours ago. The pain is crushing in nature, radiating to his left arm and jaw. He is sweating and looks pale.",
      question: "What is the most appropriate immediate management?",
      options: {
        A: "Arrange urgent ECG and give aspirin 300mg",
        B: "Prescribe GTN spray and arrange routine cardiology referral",
        C: "Give paracetamol and advise rest",
        D: "Arrange chest X-ray and blood tests",
        E: "Refer to physiotherapy for musculoskeletal assessment"
      },
      correct_answer: 'A',
      explanation: "This presentation is highly suggestive of acute coronary syndrome. Immediate ECG and aspirin are essential first steps in management according to NICE guidelines.",
      references: [
        {
          title: "NICE CG95: Chest pain of recent onset",
          url: "https://www.nice.org.uk/guidance/cg95"
        }
      ],
      cks_guidance: {
        summary: "Acute chest pain requires immediate assessment for ACS",
        key_points: ["ECG within 10 minutes", "Aspirin 300mg unless contraindicated", "Urgent cardiology assessment"],
        management_approach: "ABCDE approach with immediate ECG and cardiac markers",
        red_flags: ["Crushing chest pain", "Radiation to arm/jaw", "Sweating", "Pallor"]
      },
      additional_guidelines: ["AHA/ESC Guidelines on STEMI", "Resuscitation Council UK Guidelines"]
    },
    {
      scenario: "A 28-year-old woman presents with a 3-day history of dysuria, frequency, and urgency. She has no fever or flank pain. Urine dipstick shows nitrites positive and leucocytes ++.",
      question: "What is the most appropriate first-line antibiotic treatment?",
      options: {
        A: "Trimethoprim 200mg twice daily for 3 days",
        B: "Amoxicillin 500mg three times daily for 7 days",
        C: "Ciprofloxacin 500mg twice daily for 7 days",
        D: "Nitrofurantoin 100mg twice daily for 3 days",
        E: "Co-amoxiclav 625mg three times daily for 7 days"
      },
      correct_answer: 'A',
      explanation: "For uncomplicated UTI in non-pregnant women, trimethoprim or nitrofurantoin are first-line choices. Trimethoprim 3-day course is effective for cystitis.",
      references: [
        {
          title: "NICE CKS: Urinary tract infection (lower) - women",
          url: "https://cks.nice.org.uk/topics/urinary-tract-infection-lower-women/"
        }
      ],
      cks_guidance: {
        summary: "Lower UTI in women - first-line antibiotic therapy",
        key_points: ["3-day course adequate for cystitis", "Check local resistance patterns", "Safety-net advice"],
        management_approach: "Antibiotic choice based on local guidelines and patient factors",
        red_flags: ["Fever", "Flank pain", "Vomiting", "Signs of pyelonephritis"]
      },
      additional_guidelines: ["PHE UTI diagnosis and management guidance"]
    }
  ],
  'cardiovascular_intermediate': [
    {
      scenario: "A 65-year-old man with known heart failure presents with worsening breathlessness and ankle swelling. His current medications include ramipril 10mg daily and bisoprolol 5mg daily.",
      question: "What is the most appropriate next step in management?",
      options: {
        A: "Add furosemide 40mg daily",
        B: "Increase bisoprolol to 10mg daily",
        C: "Stop ramipril and start losartan",
        D: "Add amlodipine 5mg daily",
        E: "Refer for cardiac catheterization"
      },
      correct_answer: 'A',
      explanation: "Worsening heart failure symptoms with fluid retention requires diuretic therapy. Furosemide is first-line for symptom relief.",
      references: [
        {
          title: "NICE NG106: Chronic heart failure in adults",
          url: "https://www.nice.org.uk/guidance/ng106"
        }
      ],
      cks_guidance: {
        summary: "Heart failure management - symptomatic treatment",
        key_points: ["Diuretics for fluid overload", "Monitor renal function", "Lifestyle advice"],
        management_approach: "Step-wise approach to heart failure management",
        red_flags: ["Acute pulmonary edema", "Hypotension", "Renal impairment"]
      },
      additional_guidelines: ["ESC Heart failure guidelines"]
    }
  ]
};

export function getInstantQuestions(category: string, difficulty: string, count: number): UKMedicalQuestion[] {
  const key = `${category}_${difficulty}`;
  const available = INSTANT_QUESTIONS[key] || INSTANT_QUESTIONS['all_intermediate'] || [];
  
  // Return shuffled questions up to requested count
  const shuffled = [...available].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export function hasInstantQuestions(category: string, difficulty: string): boolean {
  const key = `${category}_${difficulty}`;
  return (INSTANT_QUESTIONS[key]?.length || 0) > 0;
}
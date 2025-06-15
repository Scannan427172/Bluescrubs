// Sample PLAB questions for demonstration when API quota is reached
export const samplePLABQuestions = {
  cardiology: [
    {
      id: "cardio-001",
      question: "A 65-year-old man presents with chest pain radiating to his left arm. ECG shows ST elevation in leads II, III, and aVF. Which coronary artery is most likely affected?",
      options: [
        "Left anterior descending artery",
        "Right coronary artery", 
        "Left circumflex artery",
        "Left main stem",
        "Posterior descending artery"
      ],
      correctAnswer: 1,
      explanation: "ST elevation in leads II, III, and aVF indicates an inferior STEMI, typically caused by right coronary artery occlusion.",
      difficulty: "intermediate",
      topic: "cardiology",
      confidenceLevel: 85,
      ukGuideline: "NICE CG167: Myocardial infarction with ST-segment elevation"
    },
    {
      id: "cardio-002", 
      question: "A 45-year-old woman with rheumatic heart disease presents with palpitations and irregular pulse. ECG shows absence of P waves and irregularly irregular QRS complexes. What is the most appropriate initial management?",
      options: [
        "Immediate DC cardioversion",
        "Rate control with beta-blockers",
        "Anticoagulation with warfarin",
        "Emergency pacing",
        "Amiodarone loading"
      ],
      correctAnswer: 2,
      explanation: "Atrial fibrillation in rheumatic heart disease requires anticoagulation due to high stroke risk (CHA2DS2-VASc ≥2).",
      difficulty: "advanced",
      topic: "cardiology", 
      confidenceLevel: 90,
      ukGuideline: "NICE CG180: Atrial fibrillation management"
    }
  ],
  respiratory: [
    {
      id: "resp-001",
      question: "A 28-year-old asthmatic presents with severe breathlessness, inability to complete sentences, and peak flow 40% of predicted. What is the most appropriate immediate treatment?",
      options: [
        "Oral prednisolone 40mg",
        "Nebulised salbutamol 5mg",
        "High-flow oxygen via non-rebreather mask", 
        "IV magnesium sulphate",
        "Nebulised ipratropium bromide"
      ],
      correctAnswer: 1,
      explanation: "Severe asthma attack requires immediate high-dose bronchodilators. Nebulised salbutamol 5mg is first-line treatment.",
      difficulty: "intermediate",
      topic: "respiratory",
      confidenceLevel: 92,
      ukGuideline: "BTS/SIGN Asthma Guidelines 2019"
    }
  ],
  ethics: [
    {
      id: "ethics-001",
      question: "A 16-year-old girl requests contraception but asks you not to tell her parents. She demonstrates understanding of the treatment. What is the most appropriate action?",
      options: [
        "Refuse treatment until parents are informed",
        "Provide contraception without parental consent",
        "Contact social services immediately",
        "Insist on involving a chaperone",
        "Refer to family planning clinic"
      ],
      correctAnswer: 1,
      explanation: "Under Fraser guidelines, competent minors can consent to contraceptive treatment without parental knowledge if it's in their best interests.",
      difficulty: "intermediate", 
      topic: "ethics",
      confidenceLevel: 88,
      ukGuideline: "GMC Good Practice Guidelines: 0-18 years"
    }
  ],
  pharmacology: [
    {
      id: "pharm-001",
      question: "A patient on warfarin presents with INR of 8.5 and minor bleeding. What is the most appropriate management?",
      options: [
        "Stop warfarin, give vitamin K 10mg IV",
        "Stop warfarin, give vitamin K 1-3mg PO", 
        "Continue warfarin, monitor closely",
        "Stop warfarin, give fresh frozen plasma",
        "Stop warfarin, give prothrombin complex concentrate"
      ],
      correctAnswer: 1,
      explanation: "INR >8 with minor bleeding requires warfarin cessation and low-dose oral vitamin K to reverse anticoagulation gradually.",
      difficulty: "advanced",
      topic: "pharmacology",
      confidenceLevel: 85,
      ukGuideline: "NICE CG144: Venous thromboembolism prevention"
    }
  ]
};

export const sampleStudyPlan = {
  weeklyPlan: [
    {
      day: "Monday",
      topics: ["Cardiology", "ECG Interpretation"],
      duration: 3,
      sessionType: "Active Learning"
    },
    {
      day: "Tuesday", 
      topics: ["Respiratory Medicine", "Radiology"],
      duration: 3,
      sessionType: "Case Studies"
    },
    {
      day: "Wednesday",
      topics: ["Ethics", "Communication Skills"],
      duration: 2,
      sessionType: "Interactive Practice"
    },
    {
      day: "Thursday",
      topics: ["Pharmacology", "Drug Interactions"],
      duration: 3,
      sessionType: "Spaced Repetition"
    },
    {
      day: "Friday",
      topics: ["Emergency Medicine", "Clinical Skills"],
      duration: 3,
      sessionType: "Simulation"
    },
    {
      day: "Saturday",
      topics: ["Mock Exam Practice"],
      duration: 4,
      sessionType: "Assessment"
    },
    {
      day: "Sunday",
      topics: ["Review", "Weak Areas"],
      duration: 2,
      sessionType: "Consolidation"
    }
  ],
  recommendations: [
    "Focus on high-yield topics with frequent PLAB appearances",
    "Use active recall techniques for better retention",
    "Practice clinical reasoning with case-based scenarios",
    "Review UK guidelines and local protocols regularly",
    "Take timed mock exams to improve exam technique"
  ],
  focusAreas: ["Clinical Reasoning", "UK Guidelines", "Emergency Protocols"]
};

export const sampleEthicsScenarios = [
  {
    id: "ethics-scenario-001",
    title: "Confidentiality vs Patient Safety",
    scenario: "A 17-year-old patient discloses recreational drug use but refuses to let you inform their parents. They're asking for help to stop using drugs.",
    dilemma: "Balancing patient confidentiality with duty of care and parental involvement",
    considerations: [
      "Patient autonomy and confidentiality rights",
      "Gillick competence assessment",
      "Duty of care and patient safety",
      "Professional guidelines on treating minors"
    ],
    gmcGuidance: "Good Medical Practice: Confidentiality and consent in treating young people"
  },
  {
    id: "ethics-scenario-002", 
    title: "Resource Allocation in Emergency",
    scenario: "During a major incident, you have limited resources and must decide treatment priority between two critically injured patients.",
    dilemma: "Ethical triage decisions under resource constraints",
    considerations: [
      "Principles of medical triage",
      "Greatest good for greatest number",
      "Clinical likelihood of survival",
      "Professional duty and fairness"
    ],
    gmcGuidance: "Good Medical Practice: Making decisions about treatment and care"
  }
];

export function getSampleQuestions(topic: string, count: number = 10) {
  const topicQuestions = samplePLABQuestions[topic as keyof typeof samplePLABQuestions] || [];
  const questions = [];
  
  for (let i = 0; i < count; i++) {
    if (i < topicQuestions.length) {
      questions.push({
        ...topicQuestions[i],
        nextReview: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      });
    } else {
      // Generate additional sample questions by modifying existing ones
      const baseQuestion = topicQuestions[i % topicQuestions.length];
      if (baseQuestion) {
        questions.push({
          ...baseQuestion,
          id: `${baseQuestion.id}-variant-${i}`,
          nextReview: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        });
      }
    }
  }
  
  return questions;
}
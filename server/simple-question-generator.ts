import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface SimpleQuestion {
  id: string;
  category: string;
  stem: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: string;
}

export function generateSimpleQuestion(
  category: string,
  difficulty: string
): SimpleQuestion {
  // Fast question templates to reduce generation time
  const questionTemplates = {
    cardiovascular: [
      {
        stem: "A 65-year-old patient presents with chest pain and shortness of breath. ECG shows ST elevation in leads II, III, and aVF. What is the most appropriate immediate management?",
        options: [
          "Primary PCI within 90 minutes",
          "Thrombolytic therapy",
          "Conservative management with monitoring",
          "Immediate CABG referral"
        ],
        correctAnswer: 0,
        explanation: "Option A (Primary PCI within 90 minutes) is CORRECT because ST elevation in inferior leads (II, III, aVF) indicates inferior STEMI requiring immediate reperfusion. NICE guidelines CG167 state primary PCI is first-line treatment when available within 90 minutes, showing 30% mortality reduction vs thrombolysis (DANAMI-2 trial).\n\nOption B (Thrombolytic therapy) is INCORRECT because while effective for STEMI, primary PCI is superior when available within the 90-minute window, reducing mortality and reinfarction rates.\n\nOption C (Conservative management) is INCORRECT because STEMI requires urgent reperfusion therapy - conservative management would result in significant myocardial necrosis and potential death.\n\nOption D (Immediate CABG referral) is INCORRECT because emergency CABG is not first-line for acute STEMI - primary PCI provides faster reperfusion with better outcomes."
      },
      {
        stem: "A 55-year-old man with diabetes presents with severe chest pain radiating to the left arm. ECG shows ST depression in V3-V6. Troponin is elevated. What is the diagnosis?",
        options: [
          "Unstable angina",
          "NSTEMI",
          "STEMI",
          "Pericarditis"
        ],
        correctAnswer: 1,
        explanation: "Option B (NSTEMI) is CORRECT because ST depression in V3-V6 with elevated troponin definitively indicates Non-ST elevation myocardial infarction. ESC guidelines state this combination confirms myocardial necrosis without complete coronary occlusion, requiring urgent dual antiplatelet therapy and risk stratification.\n\nOption A (Unstable angina) is INCORRECT because elevated troponin rules out unstable angina by definition - unstable angina has normal troponin levels with ischemic symptoms but no myocardial necrosis.\n\nOption C (STEMI) is INCORRECT because ST depression (not elevation) is present. STEMI requires ST elevation ≥1mm in two contiguous leads or new LBBB, indicating complete coronary occlusion.\n\nOption D (Pericarditis) is INCORRECT because pericarditis typically shows widespread ST elevation with PR depression, not localized ST depression, and troponin is usually normal unless myopericarditis."
      }
    ],
    respiratory: [
      {
        stem: "A 45-year-old smoker presents with persistent cough, weight loss, and hemoptysis for 6 weeks. Chest X-ray shows a peripheral lung mass. What is the next most appropriate investigation?",
        options: [
          "Sputum cytology",
          "CT chest with contrast",
          "Bronchoscopy",
          "PET scan"
        ],
        correctAnswer: 1,
        explanation: "CT chest with contrast is the next appropriate step to characterize the lung mass, assess for mediastinal involvement, and guide further management including staging and biopsy approach."
      },
      {
        stem: "A 35-year-old man presents with sudden onset severe breathlessness and pleuritic chest pain. He is tall and thin. Chest X-ray shows absent lung markings on the right side. What is the most likely diagnosis?",
        options: [
          "Pulmonary embolism",
          "Pneumonia",
          "Spontaneous pneumothorax",
          "Pleural effusion"
        ],
        correctAnswer: 2,
        explanation: "Sudden onset breathlessness and pleuritic pain in a tall, thin young man with absent lung markings suggests spontaneous pneumothorax, which is more common in this demographic."
      }
    ],
    gastroenterology: [
      {
        stem: "A 28-year-old patient presents with bloody diarrhea, abdominal cramping, and weight loss for 3 months. Colonoscopy shows continuous inflammation from rectum to sigmoid colon. What is the most likely diagnosis?",
        options: [
          "Crohn's disease",
          "Ulcerative colitis",
          "Infectious colitis",
          "Irritable bowel syndrome"
        ],
        correctAnswer: 1,
        explanation: "Continuous inflammation from rectum extending proximally is characteristic of ulcerative colitis, unlike the skip lesions seen in Crohn's disease."
      },
      {
        stem: "A 50-year-old man presents with epigastric pain and coffee-ground vomiting. He has a history of NSAID use. What is the most appropriate initial management?",
        options: [
          "Immediate endoscopy",
          "IV PPI and resuscitation",
          "H. pylori testing",
          "Barium meal"
        ],
        correctAnswer: 1,
        explanation: "Coffee-ground vomiting suggests upper GI bleeding. Initial management involves IV PPI therapy and resuscitation before considering endoscopy based on severity."
      }
    ],
    neurology: [
      {
        stem: "A 72-year-old patient presents with sudden onset right-sided weakness and aphasia. CT head is normal. What is the most appropriate immediate treatment?",
        options: [
          "Aspirin 300mg",
          "Alteplase (tPA) if within 4.5 hours",
          "Heparin infusion",
          "Emergency craniotomy"
        ],
        correctAnswer: 1,
        explanation: "Alteplase (tPA) should be given within 4.5 hours of symptom onset for acute ischemic stroke when CT excludes hemorrhage and there are no contraindications."
      },
      {
        stem: "A 25-year-old woman presents with sudden severe headache described as 'worst headache of my life'. She is photophobic and has neck stiffness. What is the most appropriate initial investigation?",
        options: [
          "MRI brain",
          "CT head",
          "Lumbar puncture",
          "EEG"
        ],
        correctAnswer: 1,
        explanation: "Sudden severe headache with meningism suggests subarachnoid hemorrhage. CT head is the initial investigation of choice to detect blood in the subarachnoid space."
      }
    ],
    endocrinology: [
      {
        stem: "A 35-year-old woman presents with palpitations, weight loss, and heat intolerance. TSH is suppressed and free T4 is elevated. What is the most likely diagnosis?",
        options: [
          "Hypothyroidism",
          "Hyperthyroidism",
          "Thyroiditis",
          "Thyroid cancer"
        ],
        correctAnswer: 1,
        explanation: "Suppressed TSH with elevated free T4, along with symptoms of palpitations, weight loss, and heat intolerance, indicates hyperthyroidism."
      }
    ],
    psychiatry: [
      {
        stem: "A 30-year-old man presents with low mood, loss of interest, poor sleep, and feelings of worthlessness for 6 weeks. What is the most appropriate first-line treatment?",
        options: [
          "Cognitive behavioral therapy",
          "SSRI antidepressant",
          "Tricyclic antidepressant",
          "ECT"
        ],
        correctAnswer: 1,
        explanation: "For moderate to severe depression, SSRI antidepressants are first-line pharmacological treatment due to their efficacy and favorable side effect profile."
      }
    ]
  };

  const questionId = `fast_${category.slice(0,4)}_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
  
  // Use template if available, otherwise create generic question
  const templates = questionTemplates[category as keyof typeof questionTemplates];
  
  if (templates && Array.isArray(templates) && templates.length > 0) {
    // Randomly select from available templates
    const template = templates[Math.floor(Math.random() * templates.length)];
    return {
      id: questionId,
      category: category,
      stem: template.stem,
      options: [...template.options],
      correctAnswer: template.correctAnswer,
      explanation: template.explanation,
      difficulty: difficulty
    };
  }

  // Generic fallback for other categories
  return {
    id: questionId,
    category: category,
    stem: `A patient presents with ${category}-related symptoms requiring clinical assessment. What is the most appropriate initial management?`,
    options: [
      "Detailed history and examination",
      "Immediate specialist referral",
      "Further diagnostic investigation", 
      "Conservative management"
    ],
    correctAnswer: 0,
    explanation: `In ${category} cases, a systematic approach starting with thorough history and examination is essential for appropriate diagnosis and management.`,
    difficulty: difficulty
  };
}

export function generateMultipleSimpleQuestions(
  category: string,
  difficulty: string,
  count: number
): SimpleQuestion[] {
  console.log(`Generating ${count} questions for ${category} at ${difficulty} level`);
  
  const questions: SimpleQuestion[] = [];
  
  // Fast generation using templates - no API calls needed
  for (let i = 0; i < count; i++) {
    const baseQuestion = generateSimpleQuestion(category, difficulty);
    const uniqueQuestion: SimpleQuestion = {
      ...baseQuestion,
      id: `fast_${category.slice(0,4)}_${Date.now()}_${i}_${Math.random().toString(36).substr(2, 6)}`
    };
    questions.push(uniqueQuestion);
  }
  
  console.log(`Generated ${questions.length}/${count} questions successfully instantly`);
  return questions;
}
// GMC-aligned question templates based on official PLAB 1 blueprint
// These follow the official examination format and content specifications

export interface PlabQuestionTemplate {
  id: string;
  category: PlabCategory;
  subcategory: string;
  questionType: 'single-best-answer' | 'extended-matching';
  cognitiveLevel: 'knowledge' | 'application' | 'problem-solving';
  difficulty: 'foundation' | 'intermediate' | 'advanced';
  clinicalSetting: ClinicalSetting;
  ageGroup: AgeGroup;
  template: string;
  learningObjectives: string[];
  gmcOutcomes: string[];
}

export type PlabCategory = 
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
  | 'clinical-pharmacology'
  | 'ethics-law'
  | 'public-health';

export type ClinicalSetting = 
  | 'general-practice'
  | 'emergency-department' 
  | 'hospital-ward'
  | 'outpatient-clinic'
  | 'community'
  | 'intensive-care';

export type AgeGroup = 
  | 'neonate'
  | 'infant'
  | 'child'
  | 'adolescent'
  | 'adult'
  | 'elderly';

// GMC-approved question framework based on official PLAB 1 specification
export const GMC_QUESTION_FRAMEWORK = {
  // Official PLAB 1 content areas as per GMC blueprint
  contentAreas: {
    'applied-basic-sciences': {
      weight: 15,
      topics: [
        'Anatomy and physiology',
        'Pathology and pathophysiology', 
        'Clinical biochemistry',
        'Clinical microbiology',
        'Clinical pharmacology'
      ]
    },
    'clinical-knowledge': {
      weight: 70,
      topics: [
        'History taking and clinical examination',
        'Investigation and diagnosis',
        'Treatment and management',
        'Prognosis and follow-up',
        'Prevention and health promotion'
      ]
    },
    'professional-attributes': {
      weight: 15,
      topics: [
        'Patient safety and clinical governance',
        'Communication and consultation skills',
        'Professional development and reflective practice',
        'Medical ethics and law',
        'Public health and health promotion'
      ]
    }
  },

  // Official cognitive levels as per GMC framework
  cognitiveLevels: {
    'recall': {
      description: 'Factual knowledge',
      percentage: 20
    },
    'application': {
      description: 'Application of knowledge to clinical scenarios',
      percentage: 50
    },
    'problem-solving': {
      description: 'Analysis and synthesis in complex clinical situations',
      percentage: 30
    }
  },

  // GMC-specified question format
  questionFormat: {
    type: 'single-best-answer',
    options: 5,
    timeLimit: 60, // seconds per question
    totalQuestions: 180,
    examDuration: 180 // minutes
  }
};

// Template examples following GMC guidelines
export const PLAB_QUESTION_TEMPLATES: PlabQuestionTemplate[] = [
  {
    id: 'cardio-001',
    category: 'cardiovascular',
    subcategory: 'acute-coronary-syndrome',
    questionType: 'single-best-answer',
    cognitiveLevel: 'problem-solving',
    difficulty: 'intermediate',
    clinicalSetting: 'emergency-department',
    ageGroup: 'adult',
    template: 'A [age]-year-old [gender] presents with [chief complaint]. [Clinical history]. [Examination findings]. [Investigation results]. What is the most appropriate [action/diagnosis/treatment]?',
    learningObjectives: [
      'Recognize acute coronary syndrome presentation',
      'Interpret ECG changes in ACS',
      'Apply appropriate emergency management'
    ],
    gmcOutcomes: [
      'Clinical skills - history and examination',
      'Investigation and diagnosis',
      'Treatment and management'
    ]
  },
  {
    id: 'resp-001', 
    category: 'respiratory',
    subcategory: 'asthma-copd',
    questionType: 'single-best-answer',
    cognitiveLevel: 'application',
    difficulty: 'foundation',
    clinicalSetting: 'general-practice',
    ageGroup: 'adult',
    template: 'A [age]-year-old [occupation] with a history of [relevant history] presents with [symptoms]. [Duration and pattern]. [Examination findings]. What is the most likely diagnosis?',
    learningObjectives: [
      'Differentiate between asthma and COPD',
      'Recognize severity indicators',
      'Apply appropriate diagnostic criteria'
    ],
    gmcOutcomes: [
      'Clinical knowledge and skills',
      'Investigation and diagnosis'
    ]
  }
];

// Official GMC learning outcomes mapped to question categories
export const GMC_LEARNING_OUTCOMES = {
  'patient-care': {
    'history-examination': 'Take and record a patient history and perform a clinical examination',
    'clinical-reasoning': 'Apply clinical reasoning to make diagnoses',
    'investigation': 'Order appropriate investigations and interpret results',
    'treatment': 'Formulate treatment plans and prescribe safely'
  },
  'patient-safety': {
    'risk-assessment': 'Identify and assess clinical risks',
    'error-prevention': 'Take action to prevent patient harm',
    'incident-management': 'Respond appropriately to patient safety incidents'
  },
  'communication': {
    'patient-communication': 'Communicate effectively with patients and relatives',
    'colleague-communication': 'Work effectively with healthcare colleagues',
    'documentation': 'Maintain accurate and legible medical records'
  },
  'professionalism': {
    'ethical-practice': 'Practice within ethical and legal frameworks',
    'reflective-practice': 'Reflect on and improve clinical practice',
    'continuing-development': 'Engage in continuing professional development'
  }
};

// Question difficulty calibration based on pass rates and GMC standards
export const DIFFICULTY_CALIBRATION = {
  foundation: {
    description: 'Basic knowledge and straightforward application',
    targetPassRate: 85,
    cognitiveLoad: 'low'
  },
  intermediate: {
    description: 'Integration of knowledge with clinical reasoning',
    targetPassRate: 70,
    cognitiveLoad: 'medium'
  },
  advanced: {
    description: 'Complex problem-solving and synthesis',
    targetPassRate: 50,
    cognitiveLoad: 'high'
  }
};

export function generateQuestionFromTemplate(template: PlabQuestionTemplate): any {
  // This would integrate with AI to generate questions following GMC guidelines
  return {
    id: template.id,
    category: template.category,
    format: template.questionType,
    difficulty: template.difficulty,
    gmcAlignment: template.gmcOutcomes,
    clinicalContext: template.clinicalSetting
  };
}
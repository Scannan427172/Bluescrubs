export interface MLAOutcome {
  id: string;
  domain: string;
  category: string;
  title: string;
  description: string;
  knowledgeLevel: 'know' | 'know-how' | 'show-how' | 'does';
  examWeight: number;
  relatedSpecialties: string[];
  keyTerms: string[];
  clinicalApplications: string[];
  assessmentCriteria: string[];
}

export const MLA_CONTENT_MAP: MLAOutcome[] = [
  // Professional Values and Behaviours
  {
    id: 'PVB001',
    domain: 'Professional Values and Behaviours',
    category: 'Professional Behaviour',
    title: 'Demonstrate professional behaviour with patients, families and colleagues',
    description: 'Show respect, empathy, and appropriate communication in all professional interactions',
    knowledgeLevel: 'does',
    examWeight: 15,
    relatedSpecialties: ['general-practice', 'psychiatry', 'paediatrics'],
    keyTerms: ['professionalism', 'communication', 'empathy', 'respect', 'boundaries'],
    clinicalApplications: [
      'Patient consultations',
      'Breaking bad news',
      'Multidisciplinary team meetings',
      'Dealing with difficult situations'
    ],
    assessmentCriteria: [
      'Maintains professional boundaries',
      'Shows empathy and respect',
      'Communicates effectively',
      'Works collaboratively'
    ]
  },
  {
    id: 'PVB002',
    domain: 'Professional Values and Behaviours',
    category: 'Ethical Practice',
    title: 'Apply ethical principles in medical practice',
    description: 'Understand and apply the four pillars of medical ethics in clinical decision-making',
    knowledgeLevel: 'know-how',
    examWeight: 12,
    relatedSpecialties: ['general-practice', 'surgery', 'medicine'],
    keyTerms: ['autonomy', 'beneficence', 'non-maleficence', 'justice', 'consent'],
    clinicalApplications: [
      'Informed consent procedures',
      'End-of-life care decisions',
      'Resource allocation',
      'Confidentiality issues'
    ],
    assessmentCriteria: [
      'Applies ethical frameworks',
      'Respects patient autonomy',
      'Considers best interests',
      'Maintains confidentiality'
    ]
  },

  // Professional Skills
  {
    id: 'PS001',
    domain: 'Professional Skills',
    category: 'Communication',
    title: 'Communicate effectively with patients and colleagues',
    description: 'Demonstrate clear, appropriate communication skills across different contexts',
    knowledgeLevel: 'show-how',
    examWeight: 20,
    relatedSpecialties: ['general-practice', 'psychiatry', 'emergency-medicine'],
    keyTerms: ['active listening', 'non-verbal communication', 'cultural sensitivity', 'health literacy'],
    clinicalApplications: [
      'History taking',
      'Explaining diagnoses',
      'Discussing treatment options',
      'Handover communications'
    ],
    assessmentCriteria: [
      'Uses appropriate language',
      'Checks understanding',
      'Shows active listening',
      'Adapts to patient needs'
    ]
  },
  {
    id: 'PS002',
    domain: 'Professional Skills',
    category: 'Clinical Examination',
    title: 'Perform systematic clinical examinations',
    description: 'Conduct thorough, systematic examinations appropriate to presenting complaints',
    knowledgeLevel: 'show-how',
    examWeight: 25,
    relatedSpecialties: ['general-practice', 'medicine', 'surgery', 'paediatrics'],
    keyTerms: ['inspection', 'palpation', 'percussion', 'auscultation', 'systematic approach'],
    clinicalApplications: [
      'Cardiovascular examination',
      'Respiratory examination',
      'Abdominal examination',
      'Neurological examination'
    ],
    assessmentCriteria: [
      'Systematic approach',
      'Appropriate technique',
      'Identifies abnormalities',
      'Ensures patient comfort'
    ]
  },

  // Professional Knowledge
  {
    id: 'PK001',
    domain: 'Professional Knowledge',
    category: 'Applied Biomedical Science',
    title: 'Apply knowledge of normal structure and function',
    description: 'Understand normal anatomy, physiology, and biochemistry relevant to clinical practice',
    knowledgeLevel: 'know-how',
    examWeight: 18,
    relatedSpecialties: ['medicine', 'surgery', 'pathology'],
    keyTerms: ['anatomy', 'physiology', 'biochemistry', 'pathophysiology', 'pharmacology'],
    clinicalApplications: [
      'Understanding disease processes',
      'Interpreting investigations',
      'Predicting drug effects',
      'Explaining symptoms'
    ],
    assessmentCriteria: [
      'Applies basic science knowledge',
      'Links structure to function',
      'Explains pathophysiology',
      'Predicts clinical outcomes'
    ]
  },
  {
    id: 'PK002',
    domain: 'Professional Knowledge',
    category: 'Clinical Knowledge',
    title: 'Demonstrate knowledge of common clinical conditions',
    description: 'Understand presentation, investigation, and management of common conditions',
    knowledgeLevel: 'know-how',
    examWeight: 30,
    relatedSpecialties: ['medicine', 'surgery', 'general-practice', 'emergency-medicine'],
    keyTerms: ['differential diagnosis', 'red flags', 'investigations', 'management', 'prognosis'],
    clinicalApplications: [
      'Chest pain assessment',
      'Shortness of breath evaluation',
      'Abdominal pain workup',
      'Headache investigation'
    ],
    assessmentCriteria: [
      'Recognizes common presentations',
      'Formulates differential diagnoses',
      'Orders appropriate investigations',
      'Initiates suitable management'
    ]
  },

  // Cardiovascular System
  {
    id: 'CV001',
    domain: 'Professional Knowledge',
    category: 'Cardiovascular',
    title: 'Acute coronary syndromes',
    description: 'Recognize, investigate and manage acute coronary syndromes including STEMI and NSTEMI',
    knowledgeLevel: 'know-how',
    examWeight: 8,
    relatedSpecialties: ['cardiology', 'emergency-medicine', 'medicine'],
    keyTerms: ['STEMI', 'NSTEMI', 'unstable angina', 'troponin', 'ECG', 'thrombolysis'],
    clinicalApplications: [
      'ECG interpretation',
      'Risk stratification',
      'Emergency management',
      'Secondary prevention'
    ],
    assessmentCriteria: [
      'Identifies ACS presentations',
      'Interprets ECG changes',
      'Initiates appropriate treatment',
      'Arranges timely intervention'
    ]
  },
  {
    id: 'CV002',
    domain: 'Professional Knowledge',
    category: 'Cardiovascular',
    title: 'Heart failure',
    description: 'Understand pathophysiology, presentation, investigation and management of heart failure',
    knowledgeLevel: 'know-how',
    examWeight: 6,
    relatedSpecialties: ['cardiology', 'medicine', 'general-practice'],
    keyTerms: ['systolic dysfunction', 'diastolic dysfunction', 'BNP', 'ACE inhibitors', 'diuretics'],
    clinicalApplications: [
      'Clinical assessment',
      'Echocardiography interpretation',
      'Medication optimization',
      'Lifestyle advice'
    ],
    assessmentCriteria: [
      'Recognizes heart failure signs',
      'Orders appropriate investigations',
      'Prescribes evidence-based treatment',
      'Monitors response to therapy'
    ]
  },

  // Respiratory System
  {
    id: 'RS001',
    domain: 'Professional Knowledge',
    category: 'Respiratory',
    title: 'Asthma and COPD',
    description: 'Distinguish between asthma and COPD, understand management approaches',
    knowledgeLevel: 'know-how',
    examWeight: 7,
    relatedSpecialties: ['respiratory', 'general-practice', 'emergency-medicine'],
    keyTerms: ['bronchodilators', 'inhaled steroids', 'peak flow', 'spirometry', 'exacerbation'],
    clinicalApplications: [
      'Inhaler technique assessment',
      'Acute exacerbation management',
      'Step-up therapy',
      'Patient education'
    ],
    assessmentCriteria: [
      'Differentiates asthma from COPD',
      'Assesses severity appropriately',
      'Prescribes correct inhalers',
      'Provides self-management plans'
    ]
  },
  {
    id: 'RS002',
    domain: 'Professional Knowledge',
    category: 'Respiratory',
    title: 'Pneumonia',
    description: 'Recognize, investigate and manage community and hospital-acquired pneumonia',
    knowledgeLevel: 'know-how',
    examWeight: 5,
    relatedSpecialties: ['respiratory', 'medicine', 'emergency-medicine'],
    keyTerms: ['CURB-65', 'chest X-ray', 'antibiotics', 'sepsis', 'oxygen therapy'],
    clinicalApplications: [
      'Severity assessment',
      'Antibiotic selection',
      'Oxygen prescription',
      'Discharge planning'
    ],
    assessmentCriteria: [
      'Uses severity scoring tools',
      'Orders appropriate investigations',
      'Selects suitable antibiotics',
      'Monitors clinical response'
    ]
  },

  // Gastroenterology
  {
    id: 'GI001',
    domain: 'Professional Knowledge',
    category: 'Gastroenterology',
    title: 'Peptic ulcer disease and dyspepsia',
    description: 'Understand causes, investigation and management of peptic ulcer disease',
    knowledgeLevel: 'know-how',
    examWeight: 4,
    relatedSpecialties: ['gastroenterology', 'general-practice', 'surgery'],
    keyTerms: ['H. pylori', 'NSAIDs', 'PPI', 'endoscopy', 'alarm symptoms'],
    clinicalApplications: [
      'Risk factor assessment',
      'H. pylori testing',
      'PPI therapy',
      'Endoscopy referral'
    ],
    assessmentCriteria: [
      'Identifies risk factors',
      'Tests for H. pylori appropriately',
      'Prescribes acid suppression',
      'Recognizes alarm symptoms'
    ]
  },
  {
    id: 'GI002',
    domain: 'Professional Knowledge',
    category: 'Gastroenterology',
    title: 'Inflammatory bowel disease',
    description: 'Distinguish between Crohn\'s disease and ulcerative colitis, understand management',
    knowledgeLevel: 'know',
    examWeight: 3,
    relatedSpecialties: ['gastroenterology', 'medicine'],
    keyTerms: ['Crohn\'s disease', 'ulcerative colitis', 'immunosuppression', 'biologics', 'flare'],
    clinicalApplications: [
      'Disease classification',
      'Monitoring disease activity',
      'Immunosuppressive therapy',
      'Complication recognition'
    ],
    assessmentCriteria: [
      'Differentiates IBD types',
      'Understands treatment options',
      'Recognizes complications',
      'Knows monitoring requirements'
    ]
  },

  // Neurology
  {
    id: 'NE001',
    domain: 'Professional Knowledge',
    category: 'Neurology',
    title: 'Stroke and TIA',
    description: 'Recognize, investigate and manage acute stroke and transient ischemic attacks',
    knowledgeLevel: 'know-how',
    examWeight: 7,
    relatedSpecialties: ['neurology', 'emergency-medicine', 'medicine'],
    keyTerms: ['FAST', 'CT scan', 'thrombolysis', 'anticoagulation', 'rehabilitation'],
    clinicalApplications: [
      'Rapid assessment',
      'Time-critical treatment',
      'Secondary prevention',
      'Rehabilitation planning'
    ],
    assessmentCriteria: [
      'Uses stroke assessment tools',
      'Initiates time-critical treatment',
      'Arranges appropriate imaging',
      'Plans secondary prevention'
    ]
  },
  {
    id: 'NE002',
    domain: 'Professional Knowledge',
    category: 'Neurology',
    title: 'Epilepsy',
    description: 'Understand seizure types, investigation and management of epilepsy',
    knowledgeLevel: 'know',
    examWeight: 4,
    relatedSpecialties: ['neurology', 'emergency-medicine'],
    keyTerms: ['seizure types', 'EEG', 'anticonvulsants', 'status epilepticus', 'driving'],
    clinicalApplications: [
      'Seizure classification',
      'First seizure management',
      'Medication selection',
      'Lifestyle advice'
    ],
    assessmentCriteria: [
      'Classifies seizure types',
      'Orders appropriate investigations',
      'Understands treatment options',
      'Provides safety advice'
    ]
  },

  // Endocrinology
  {
    id: 'EN001',
    domain: 'Professional Knowledge',
    category: 'Endocrinology',
    title: 'Diabetes mellitus',
    description: 'Understand types, complications, and management of diabetes mellitus',
    knowledgeLevel: 'know-how',
    examWeight: 8,
    relatedSpecialties: ['endocrinology', 'general-practice', 'medicine'],
    keyTerms: ['Type 1', 'Type 2', 'HbA1c', 'insulin', 'complications', 'screening'],
    clinicalApplications: [
      'Diagnosis and classification',
      'Blood glucose monitoring',
      'Medication management',
      'Complication screening'
    ],
    assessmentCriteria: [
      'Distinguishes diabetes types',
      'Uses appropriate investigations',
      'Initiates suitable treatment',
      'Screens for complications'
    ]
  },
  {
    id: 'EN002',
    domain: 'Professional Knowledge',
    category: 'Endocrinology',
    title: 'Thyroid disorders',
    description: 'Recognize and manage hyper- and hypothyroidism',
    knowledgeLevel: 'know',
    examWeight: 4,
    relatedSpecialties: ['endocrinology', 'general-practice'],
    keyTerms: ['TSH', 'T4', 'hyperthyroidism', 'hypothyroidism', 'thyroid function tests'],
    clinicalApplications: [
      'Symptom recognition',
      'Laboratory interpretation',
      'Treatment initiation',
      'Monitoring therapy'
    ],
    assessmentCriteria: [
      'Recognizes thyroid dysfunction',
      'Interprets function tests',
      'Understands treatment options',
      'Knows monitoring requirements'
    ]
  }
];

export function getMLAOutcomesBySpecialty(specialty: string): MLAOutcome[] {
  return MLA_CONTENT_MAP.filter(outcome => 
    outcome.relatedSpecialties.includes(specialty)
  );
}

export function getMLAOutcomesByDomain(domain: string): MLAOutcome[] {
  return MLA_CONTENT_MAP.filter(outcome => 
    outcome.domain === domain
  );
}

export function searchMLAOutcomes(query: string): MLAOutcome[] {
  const lowercaseQuery = query.toLowerCase();
  return MLA_CONTENT_MAP.filter(outcome =>
    outcome.title.toLowerCase().includes(lowercaseQuery) ||
    outcome.description.toLowerCase().includes(lowercaseQuery) ||
    outcome.keyTerms.some(term => term.toLowerCase().includes(lowercaseQuery)) ||
    outcome.clinicalApplications.some(app => app.toLowerCase().includes(lowercaseQuery))
  );
}

export function getMLAOutcomeById(id: string): MLAOutcome | undefined {
  return MLA_CONTENT_MAP.find(outcome => outcome.id === id);
}

export function getHighPriorityOutcomes(): MLAOutcome[] {
  return MLA_CONTENT_MAP.filter(outcome => outcome.examWeight >= 15);
}

export function getOutcomesByKnowledgeLevel(level: string): MLAOutcome[] {
  return MLA_CONTENT_MAP.filter(outcome => outcome.knowledgeLevel === level);
}
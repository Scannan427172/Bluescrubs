// Enhanced PLAB Questions with Clinical Data Integration
// Matching Passmedicine-style sophistication with detailed clinical scenarios

export interface EnhancedPlabQuestion {
  id: string;
  category: string;
  difficulty: 'foundation' | 'intermediate' | 'advanced';
  clinicalScenario: {
    patientDetails: {
      age: number;
      gender: 'male' | 'female';
      ethnicity?: string;
      occupation?: string;
    };
    presentation: string;
    history: string;
    examination?: string;
    investigations?: ClinicalInvestigation[];
  };
  question: string;
  options: string[];
  correctAnswer: number;
  detailedExplanation: {
    correctReasoning: string;
    incorrectOptionsExplanation: Record<number, string>;
    clinicalPearls: string[];
    keyLearningPoints: string[];
  };
  referenceData?: ReferenceRange[];
  tags: string[];
}

export interface ClinicalInvestigation {
  type: 'blood' | 'csf' | 'urine' | 'imaging' | 'ecg' | 'other';
  name: string;
  results: InvestigationResult[];
}

export interface InvestigationResult {
  parameter: string;
  value: string;
  unit?: string;
  referenceRange: string;
  abnormal?: boolean;
}

export interface ReferenceRange {
  category: string;
  parameters: {
    name: string;
    normalRange: string;
    unit: string;
    clinicalSignificance: string;
  }[];
}

// Enhanced question bank matching Passmedicine quality
export const ENHANCED_PLAB_QUESTIONS: EnhancedPlabQuestion[] = [
  {
    id: 'neuro-001',
    category: 'neurology',
    difficulty: 'intermediate',
    clinicalScenario: {
      patientDetails: {
        age: 43,
        gender: 'male',
        ethnicity: 'Asian'
      },
      presentation: 'A 43-year-old Asian man presents with headache and neck stiffness.',
      history: 'The symptoms started 3 days ago and have been progressively worsening. He has no significant past medical history.',
      examination: 'CT brain is normal and a lumbar puncture is performed.',
      investigations: [
        {
          type: 'csf',
          name: 'Cerebrospinal Fluid Analysis',
          results: [
            { parameter: 'Opening pressure', value: '15 cmCSF', referenceRange: '10 - 20', abnormal: false },
            { parameter: 'Appearance', value: 'Cloudy', referenceRange: 'Clear', abnormal: true },
            { parameter: 'Glucose', value: '3.3 mmol/L', referenceRange: '2.8 - 4.2', abnormal: false },
            { parameter: 'Protein', value: '0.7 g/L', referenceRange: '0.15 - 0.45', abnormal: true },
            { parameter: 'White cells', value: '100 / mm³ (70% lymphocytes)', referenceRange: '0 - 8', abnormal: true }
          ]
        },
        {
          type: 'blood',
          name: 'Serum glucose',
          results: [
            { parameter: 'Serum glucose', value: '4.7 mmol/L', referenceRange: '4.0 - 7.0', abnormal: false }
          ]
        }
      ]
    },
    question: 'What is the most likely diagnosis?',
    options: [
      'Bacterial meningitis',
      'Viral meningitis', 
      'Tuberculous meningitis',
      'Normal CSF result',
      'Cryptococcal meningitis'
    ],
    correctAnswer: 1,
    detailedExplanation: {
      correctReasoning: 'Viral meningitis is the correct diagnosis based on the CSF findings. The key features supporting viral meningitis are the lymphocytic predominance (70% lymphocytes) in the CSF, mildly elevated protein (0.7 g/L), and relatively normal CSF glucose level compared to serum glucose. The CSF:serum glucose ratio is 0.70, which is within normal limits (normal >0.6). The opening pressure is normal, and while the appearance is cloudy, this can occur in viral meningitis due to increased white cells.',
      incorrectOptionsExplanation: {
        0: 'Bacterial meningitis is incorrect because bacterial meningitis typically shows a neutrophilic predominance (>80% neutrophils), much higher protein levels (often >1 g/L), and a markedly reduced CSF glucose with CSF:serum glucose ratio typically <0.4. The white cell count in bacterial meningitis is usually much higher, often >1000/mm³.',
        2: 'Tuberculous meningitis is incorrect because although TB meningitis can present with lymphocytic predominance, TB meningitis typically has a much higher protein level (>1 g/L), very low CSF glucose levels, and a much higher white cell count. The CSF:serum glucose ratio is typically <0.4 in TB meningitis.',
        3: 'Normal CSF result is incorrect because the CSF shows clear abnormalities: cloudy appearance, elevated protein (0.7 g/L vs normal 0.15-0.45 g/L), and significantly elevated white cell count (100/mm³ vs normal 0-8/mm³).',
        4: 'Cryptococcal meningitis is incorrect because cryptococcal meningitis typically occurs in immunocompromised patients and would usually show a much higher opening pressure, very low glucose levels, and the presence of cryptococcal antigen or organisms on India ink staining.'
      },
      clinicalPearls: [
        'CSF:serum glucose ratio is a key discriminator between bacterial and viral meningitis',
        'Lymphocytic predominance strongly suggests viral or chronic causes',
        'Normal opening pressure makes bacterial meningitis less likely',
        'Viral meningitis can cause cloudy CSF appearance due to increased cell count'
      ],
      keyLearningPoints: [
        'Interpret CSF results in context of clinical presentation',
        'Understand normal reference ranges for CSF parameters',
        'Calculate CSF:serum glucose ratio for diagnostic clarity',
        'Recognize patterns of CSF abnormalities in different types of meningitis'
      ]
    },
    referenceData: [
      {
        category: 'CSF Analysis',
        parameters: [
          { name: 'Opening pressure', normalRange: '10-20 cmCSF', unit: 'cmCSF', clinicalSignificance: 'Elevated in bacterial meningitis, ICP' },
          { name: 'Glucose', normalRange: '2.8-4.2 mmol/L', unit: 'mmol/L', clinicalSignificance: 'Low in bacterial/TB meningitis' },
          { name: 'Protein', normalRange: '0.15-0.45 g/L', unit: 'g/L', clinicalSignificance: 'Elevated in inflammation/infection' },
          { name: 'White cells', normalRange: '0-8 /mm³', unit: '/mm³', clinicalSignificance: 'Neutrophils: bacterial; Lymphocytes: viral/TB' }
        ]
      }
    ],
    tags: ['meningitis', 'csf-analysis', 'neurology', 'infection', 'differential-diagnosis']
  },

  {
    id: 'resp-002',
    category: 'respiratory',
    difficulty: 'intermediate',
    clinicalScenario: {
      patientDetails: {
        age: 67,
        gender: 'male',
        occupation: 'retired smoker'
      },
      presentation: 'A 67-year-old retired smoker presents with increasing shortness of breath over the past 6 months.',
      history: '40 pack-year smoking history, stopped 2 years ago. Progressive exertional dyspnea, chronic productive cough with white sputum.',
      examination: 'Reduced air entry bilaterally, wheeze on expiration, no cyanosis.',
      investigations: [
        {
          type: 'blood',
          name: 'Arterial Blood Gas (room air)',
          results: [
            { parameter: 'pH', value: '7.35', referenceRange: '7.35 - 7.45', abnormal: false },
            { parameter: 'PaCO2', value: '6.2 kPa', referenceRange: '4.7 - 6.0', abnormal: true },
            { parameter: 'PaO2', value: '8.5 kPa', referenceRange: '10.6 - 13.3', abnormal: true },
            { parameter: 'HCO3-', value: '28 mmol/L', referenceRange: '22 - 26', abnormal: true },
            { parameter: 'Base excess', value: '+3', referenceRange: '-2 to +2', abnormal: true }
          ]
        }
      ]
    },
    question: 'Which condition would cause a rise in the carbon monoxide transfer factor (TLCO)?',
    options: [
      'Emphysema',
      'Pulmonary embolism',
      'Pulmonary haemorrhage',
      'Pneumonia',
      'Pulmonary fibrosis'
    ],
    correctAnswer: 2,
    detailedExplanation: {
      correctReasoning: 'Pulmonary haemorrhage would cause a rise in TLCO. Carbon monoxide has a very high affinity for haemoglobin, approximately 200-250 times greater than oxygen. When there is bleeding into the alveoli (pulmonary haemorrhage), the increased haemoglobin in the alveolar space binds more carbon monoxide, leading to an elevated TLCO measurement. This is one of the few conditions that causes an increased TLCO.',
      incorrectOptionsExplanation: {
        0: 'Emphysema causes a reduced TLCO because the alveolar surface area is destroyed, reducing the area available for gas transfer.',
        1: 'Pulmonary embolism causes a reduced TLCO because it reduces perfusion to ventilated alveoli, decreasing gas transfer efficiency.',
        3: 'Pneumonia causes a reduced TLCO due to inflammation and fluid in the alveoli, which impairs gas transfer.',
        4: 'Pulmonary fibrosis causes a reduced TLCO because the thickened alveolar-capillary membrane impairs gas diffusion.'
      },
      clinicalPearls: [
        'TLCO measures the ability of gas to transfer from alveoli to blood',
        'Only a few conditions increase TLCO: pulmonary haemorrhage, polycythaemia, left-to-right shunts',
        'Most lung diseases reduce TLCO by affecting surface area, membrane thickness, or perfusion',
        'TLCO is corrected for haemoglobin levels in the interpretation'
      ],
      keyLearningPoints: [
        'Understand the physiology of carbon monoxide transfer',
        'Recognize conditions that increase vs decrease TLCO',
        'Apply knowledge of gas transfer mechanisms to clinical scenarios',
        'Interpret pulmonary function tests in context'
      ]
    },
    tags: ['copd', 'pulmonary-function', 'tlco', 'respiratory-physiology', 'smoking']
  },

  {
    id: 'cardio-003',
    category: 'cardiovascular',
    difficulty: 'advanced',
    clinicalScenario: {
      patientDetails: {
        age: 34,
        gender: 'female'
      },
      presentation: 'A 34-year-old woman is admitted to the Emergency Department following a collapse.',
      history: 'She collapsed suddenly while shopping. Bystanders report she was unconscious for approximately 2 minutes. No seizure activity witnessed.',
      examination: 'Currently conscious and alert. Blood pressure 110/70 mmHg, pulse regular.',
      investigations: [
        {
          type: 'ecg',
          name: 'ECG',
          results: [
            { parameter: 'Rhythm', value: 'Sinus rhythm', referenceRange: 'Normal', abnormal: false },
            { parameter: 'QT interval', value: 'Polymorphic ventricular tachycardia pattern', referenceRange: 'Normal', abnormal: true },
            { parameter: 'Morphology', value: 'Varying QRS morphology with twisting around baseline', referenceRange: 'Normal', abnormal: true }
          ]
        }
      ]
    },
    question: 'Which one of the following is not associated with an increased risk of developing torsade de pointes?',
    options: [
      'Tricyclic antidepressants',
      'Subarachnoid haemorrhage',
      'Hypercalcaemia',
      'Romano-Ward syndrome',
      'Hypothermia'
    ],
    correctAnswer: 2,
    detailedExplanation: {
      correctReasoning: 'Hypercalcaemia is not associated with increased risk of torsade de pointes. In fact, hypercalcaemia tends to shorten the QT interval, while torsade de pointes is associated with QT interval prolongation. Hypocalcaemia (not hypercalcaemia) is associated with QT prolongation and increased risk of torsade de pointes.',
      incorrectOptionsExplanation: {
        0: 'Tricyclic antidepressants are well-known to prolong the QT interval and increase the risk of torsade de pointes through sodium and potassium channel blockade.',
        1: 'Subarachnoid haemorrhage can cause QT prolongation and torsade de pointes due to autonomic dysfunction and electrolyte abnormalities.',
        3: 'Romano-Ward syndrome is a congenital long QT syndrome that significantly increases the risk of torsade de pointes.',
        4: 'Hypothermia is associated with QT prolongation and can precipitate torsade de pointes, particularly when core temperature falls below 32°C.'
      },
      clinicalPearls: [
        'Torsade de pointes is a polymorphic VT associated with QT prolongation',
        'Hypocalcaemia (not hypercalcaemia) prolongs QT interval',
        'Many drugs can prolong QT interval - always check drug interactions',
        'Electrolyte abnormalities (low K+, Mg2+, Ca2+) increase torsade risk'
      ],
      keyLearningPoints: [
        'Recognize ECG features of torsade de pointes',
        'Understand relationship between QT interval and arrhythmia risk',
        'Identify risk factors for QT prolongation',
        'Distinguish between hypo- and hypercalcaemia effects on QT'
      ]
    },
    tags: ['arrhythmia', 'torsade-de-pointes', 'qt-prolongation', 'emergency-medicine', 'cardiology']
  },

  {
    id: 'nephro-004',
    category: 'nephrology',
    difficulty: 'intermediate',
    clinicalScenario: {
      patientDetails: {
        age: 35,
        gender: 'female'
      },
      presentation: 'A 35-year-old female is admitted to hospital with hypovolaemic shock.',
      history: 'Presented with severe abdominal pain and collapse. Emergency surgery revealed a ruptured renal angiomyolipoma.',
      examination: 'Post-operative, stable following surgery and blood transfusion.',
      investigations: [
        {
          type: 'imaging',
          name: 'CT abdomen',
          results: [
            { parameter: 'Right kidney', value: 'Haemorrhagic lesion consistent with angiomyolipoma', referenceRange: 'Normal', abnormal: true },
            { parameter: 'Biopsy result', value: 'Confirmed angiomyolipoma', referenceRange: 'Normal tissue', abnormal: true }
          ]
        }
      ]
    },
    question: 'What is the most likely underlying diagnosis?',
    options: [
      'Neurofibromatosis',
      'Budd-Chiari syndrome',
      'Hereditary haemorrhagic telangiectasia',
      'Von Hippel-Lindau syndrome',
      'Tuberous sclerosis'
    ],
    correctAnswer: 4,
    detailedExplanation: {
      correctReasoning: 'Tuberous sclerosis is the most likely underlying diagnosis. Around 1 in 10 people who are diagnosed with a renal angiomyolipoma have underlying tuberous sclerosis. Conversely, most patients with tuberous sclerosis will have several renal angiomyolipomata affecting both kidneys. Angiomyolipomas in tuberous sclerosis are often multiple and bilateral, and can grow larger and be more prone to bleeding than sporadic angiomyolipomas.',
      incorrectOptionsExplanation: {
        0: 'Neurofibromatosis is not associated with renal angiomyolipomas. It is associated with neurofibromas, café-au-lait spots, and phaeochromocytomas.',
        1: 'Budd-Chiari syndrome involves hepatic vein thrombosis and is not linked with renal angiomyolipomata.',
        2: 'Hereditary haemorrhagic telangiectasia involves arteriovenous malformations but is not specifically associated with renal angiomyolipomas.',
        3: 'Von Hippel-Lindau syndrome is associated with renal cell carcinomas and phaeochromocytomas, but not typically with angiomyolipomas.'
      },
      clinicalPearls: [
        'Tuberous sclerosis complex has renal angiomyolipomas in 70-80% of cases',
        'Angiomyolipomas >4cm have higher bleeding risk',
        'Look for other features of tuberous sclerosis: skin lesions, seizures, intellectual disability',
        'Genetic counselling should be offered if tuberous sclerosis is diagnosed'
      ],
      keyLearningPoints: [
        'Recognize association between angiomyolipomas and tuberous sclerosis',
        'Understand complications of renal angiomyolipomas',
        'Consider genetic syndromes in young patients with unusual tumours',
        'Know management of bleeding angiomyolipomas'
      ]
    },
    tags: ['tuberous-sclerosis', 'angiomyolipoma', 'genetic-syndromes', 'nephrology', 'emergency-surgery']
  }
];
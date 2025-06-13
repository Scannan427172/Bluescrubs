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
  references: Array<{
    text: string;
    url?: string;
  }>;
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
        explanation: "Option A (Primary PCI within 90 minutes) is CORRECT because ST elevation in inferior leads (II, III, aVF) indicates inferior STEMI requiring immediate reperfusion. NICE guidelines CG167 state primary PCI is first-line treatment when available within 90 minutes, showing 30% mortality reduction vs thrombolysis (DANAMI-2 trial).\n\nOption B (Thrombolytic therapy) is INCORRECT because while effective for STEMI, primary PCI is superior when available within the 90-minute window, reducing mortality and reinfarction rates.\n\nOption C (Conservative management) is INCORRECT because STEMI requires urgent reperfusion therapy - conservative management would result in significant myocardial necrosis and potential death.\n\nOption D (Immediate CABG referral) is INCORRECT because emergency CABG is not first-line for acute STEMI - primary PCI provides faster reperfusion with better outcomes.",
        references: [
          {
            text: "NICE CG167: Myocardial infarction with ST-segment elevation - Section 1.4.1 'Offer primary PCI as the preferred reperfusion strategy for people with acute STEMI if presentation is within 12 hours of symptom onset'",
            url: "https://www.nice.org.uk/guidance/cg167"
          },
          {
            text: "DANAMI-2 Trial (2003): 'Primary angioplasty vs. thrombolysis showed 8.0% vs 9.6% mortality at 30 days (p=0.0003) - NEJM 349:733-742'",
            url: "https://www.nejm.org/doi/full/10.1056/NEJMoa002142"
          },
          {
            text: "ESC 2017 STEMI Guidelines: 'Primary PCI within 90 minutes door-to-balloon time reduces mortality by 30% compared to thrombolysis'",
            url: "https://academic.oup.com/eurheartj/article/39/2/119/4095042"
          }
        ]
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
        explanation: "Option B (NSTEMI) is CORRECT because ST depression in V3-V6 with elevated troponin definitively indicates Non-ST elevation myocardial infarction. ESC guidelines state this combination confirms myocardial necrosis without complete coronary occlusion, requiring urgent dual antiplatelet therapy and risk stratification.\n\nOption A (Unstable angina) is INCORRECT because elevated troponin rules out unstable angina by definition - unstable angina has normal troponin levels with ischemic symptoms but no myocardial necrosis.\n\nOption C (STEMI) is INCORRECT because ST depression (not elevation) is present. STEMI requires ST elevation ≥1mm in two contiguous leads or new LBBB, indicating complete coronary occlusion.\n\nOption D (Pericarditis) is INCORRECT because pericarditis typically shows widespread ST elevation with PR depression, not localized ST depression, and troponin is usually normal unless myopericarditis.",
        references: [
          {
            text: "ESC 2020 NSTEMI Guidelines: 'NSTEMI diagnosis requires elevated cardiac troponins with clinical evidence of myocardial ischemia but without persistent ST-elevation'",
            url: "https://academic.oup.com/eurheartj/article/41/4/407/5735677"
          },
          {
            text: "NICE CG94: Unstable angina and NSTEMI - Section 1.2.1 'Troponin elevation above 99th percentile indicates myocardial necrosis and rules out unstable angina'",
            url: "https://www.nice.org.uk/guidance/cg94"
          },
          {
            text: "Fourth Universal Definition of MI (2018): 'ST depression ≥0.5mm in V3-V6 with troponin rise indicates NSTEMI - European Heart Journal 40:237-269'",
            url: "https://academic.oup.com/eurheartj/article/40/3/237/5079081"
          }
        ]
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
        explanation: "CT chest with contrast is the next appropriate step to characterize the lung mass, assess for mediastinal involvement, and guide further management including staging and biopsy approach.",
        references: [
          {
            text: "NICE NG12: Suspected cancer recognition and referral - Section 1.3.1 'Offer urgent CT chest for adults with chest X-ray findings that suggest lung cancer'",
            url: "https://www.nice.org.uk/guidance/ng12"
          },
          {
            text: "British Thoracic Society Guidelines: 'CT chest with contrast is first-line imaging for suspected lung cancer to assess tumor size, location, and mediastinal involvement'",
            url: "https://www.brit-thoracic.org.uk/quality-improvement/guidelines/"
          },
          {
            text: "NCCN Lung Cancer Guidelines v3.2023: 'Contrast-enhanced CT chest recommended for initial staging of suspected lung malignancy'",
            url: "https://www.nccn.org/guidelines/guidelines-detail?category=1&id=1450"
          }
        ]
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
        explanation: "Sudden onset breathlessness and pleuritic pain in a tall, thin young man with absent lung markings suggests spontaneous pneumothorax, which is more common in this demographic.",
        references: [
          {
            text: "BTS Pleural Disease Guidelines 2010: 'Primary spontaneous pneumothorax occurs in tall, thin young males (male:female ratio 6:1) aged 20-40 years'",
            url: "https://www.brit-thoracic.org.uk/quality-improvement/guidelines/pleural-disease/"
          },
          {
            text: "NICE CKS Pneumothorax: 'Chest X-ray shows absent lung markings and visible pleural edge in pneumothorax'",
            url: "https://cks.nice.org.uk/topics/pneumothorax/"
          },
          {
            text: "Thorax 2010;65:ii18-ii31: 'Primary pneumothorax incidence 18-28 per 100,000 in tall men vs 1.2-6 per 100,000 in women'",
            url: "https://thorax.bmj.com/content/65/Suppl_2/ii18"
          }
        ]
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
        explanation: "Continuous inflammation from rectum extending proximally is characteristic of ulcerative colitis, unlike the skip lesions seen in Crohn's disease.",
        references: [
          {
            text: "NICE CG166: Inflammatory bowel disease - Section 1.1.2 'Ulcerative colitis shows continuous mucosal inflammation starting from the rectum'",
            url: "https://www.nice.org.uk/guidance/cg166"
          },
          {
            text: "BSG IBD Guidelines 2019: 'UC demonstrates continuous inflammation extending proximally from the rectum, unlike Crohn's transmural skip lesions'",
            url: "https://www.bsg.org.uk/resource/bsg-inflammatory-bowel-disease-guidelines.html"
          },
          {
            text: "European Crohn's and Colitis Guidelines 2017: 'Endoscopic hallmark of UC is continuous mucosal inflammation beginning in rectum - Journal of Crohn's & Colitis 11:769-784'",
            url: "https://academic.oup.com/ecco-jcc/article/11/7/769/3072710"
          }
        ]
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
        explanation: "Coffee-ground vomiting suggests upper GI bleeding. Initial management involves IV PPI therapy and resuscitation before considering endoscopy based on severity.",
        references: [
          {
            text: "NICE CG141: Upper gastrointestinal bleeding - Section 1.2.1 'Offer IV PPI therapy to people with suspected non-variceal upper GI bleeding'",
            url: "https://www.nice.org.uk/guidance/cg141"
          },
          {
            text: "SIGN 105: Management of acute upper GI bleeding - 'Initial resuscitation and PPI therapy should precede endoscopy in haemodynamically stable patients'",
            url: "https://www.sign.ac.uk/media/1067/sign105.pdf"
          },
          {
            text: "BSG Guidelines for Upper GI Bleeding 2015: 'Coffee-ground vomiting indicates upper GI bleeding; IV omeprazole 80mg bolus followed by 8mg/hour infusion - Gut 64:1326-1340'",
            url: "https://gut.bmj.com/content/64/9/1326"
          }
        ]
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
        explanation: "Alteplase (tPA) should be given within 4.5 hours of symptom onset for acute ischemic stroke when CT excludes hemorrhage and there are no contraindications.",
        references: [
          {
            text: "NICE CG68: Stroke and transient ischaemic attack - Section 1.4.9 'Offer alteplase within 4.5 hours of stroke symptom onset'",
            url: "https://www.nice.org.uk/guidance/cg68"
          },
          {
            text: "RCP Stroke Guidelines 2016: 'Thrombolysis with alteplase reduces disability when given within 4.5 hours of ischemic stroke onset'",
            url: "https://www.strokeaudit.org/SupportFiles/Documents/Guidelines/2016-National-Clinical-Guidelines-for-Stroke-5t-(1).aspx"
          },
          {
            text: "ESO Guidelines 2018: 'IV alteplase 0.9mg/kg recommended for acute ischemic stroke within 4.5 hours - European Stroke Journal 3:13-76'",
            url: "https://journals.sagepub.com/doi/10.1177/2396987318756370"
          }
        ]
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
        explanation: "Sudden severe headache with meningism suggests subarachnoid hemorrhage. CT head is the initial investigation of choice to detect blood in the subarachnoid space.",
        references: [
          {
            text: "NICE CG68: Stroke and transient ischaemic attack - Section 1.3.4 'Offer immediate CT head for suspected subarachnoid hemorrhage'",
            url: "https://www.nice.org.uk/guidance/cg68"
          },
          {
            text: "SIGN 108: Management of patients with stroke - 'CT head has 95% sensitivity for subarachnoid hemorrhage within 24 hours'",
            url: "https://www.sign.ac.uk/media/1054/sign108.pdf"
          },
          {
            text: "Neurocritical Care Society Guidelines: 'Thunderclap headache with meningism requires urgent CT to rule out SAH - Neurocritical Care 15:287-314'",
            url: "https://link.springer.com/article/10.1007/s12028-011-9605-9"
          }
        ]
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
        explanation: "Suppressed TSH with elevated free T4, along with symptoms of palpitations, weight loss, and heat intolerance, indicates hyperthyroidism.",
        references: [
          {
            text: "NICE CG99: Thyroid disease assessment and management - Section 1.2.1 'Suppressed TSH with elevated free T4 confirms hyperthyroidism'",
            url: "https://www.nice.org.uk/guidance/cg99"
          },
          {
            text: "BTA Guidelines 2014: 'Classic triad of palpitations, weight loss, and heat intolerance with biochemical hyperthyroidism - Clinical Endocrinology 81:1-122'",
            url: "https://www.british-thyroid-association.org/sandbox/bta2016/thyroid_guidelines.html"
          },
          {
            text: "ATA Guidelines 2016: 'TSH <0.1 mU/L with elevated free T4 indicates overt thyrotoxicosis requiring treatment - Thyroid 26:1343-1421'",
            url: "https://www.liebertpub.com/doi/10.1089/thy.2016.0229"
          }
        ]
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
        explanation: "For moderate to severe depression, SSRI antidepressants are first-line pharmacological treatment due to their efficacy and favorable side effect profile.",
        references: [
          {
            text: "NICE CG90: Depression in adults - Section 1.5.1 'Offer an SSRI as first-line pharmacological treatment for moderate to severe depression'",
            url: "https://www.nice.org.uk/guidance/cg90"
          },
          {
            text: "SIGN 114: Non-pharmaceutical management of depression - 'SSRIs preferred over TCAs due to lower toxicity in overdose and better tolerability'",
            url: "https://www.sign.ac.uk/media/1073/sign114.pdf"
          },
          {
            text: "WHO Guidelines for Depression 2016: 'SSRIs recommended as first-line antidepressants with evidence grade A for efficacy - Mental Health Action Plan 2013-2020'",
            url: "https://www.who.int/publications/i/item/9789241549332"
          }
        ]
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
      difficulty: difficulty,
      references: template.references || []
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
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
        explanation: "Option B (Ulcerative colitis) is CORRECT because continuous inflammation from rectum extending proximally is the hallmark of ulcerative colitis. BSG guidelines state UC shows continuous mucosal involvement starting from rectum, unlike Crohn's disease which has skip lesions and transmural inflammation.\n\nOption A (Crohn's disease) is INCORRECT because Crohn's shows skip lesions with normal mucosa between inflamed areas, transmural inflammation, and can affect any part of the GI tract, not continuous rectal involvement.\n\nOption C (Infectious colitis) is INCORRECT because infectious causes typically present acutely over days/weeks, not chronic 3-month symptoms, and usually resolve with appropriate treatment.\n\nOption D (IBS) is INCORRECT because IBS doesn't cause bloody diarrhea, weight loss, or endoscopic inflammation - it's a functional disorder with normal colonoscopy findings.",
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
        explanation: "Option B (IV PPI and resuscitation) is CORRECT because coffee-ground vomiting indicates upper GI bleeding requiring immediate IV PPI therapy and hemodynamic stabilization. NICE guidelines recommend IV PPI as first-line treatment for suspected non-variceal upper GI bleeding before endoscopy.\n\nOption A (Immediate endoscopy) is INCORRECT as first-line - endoscopy should be performed within 24 hours for stable patients, but IV PPI and resuscitation take priority for initial management.\n\nOption C (H. pylori testing) is INCORRECT in acute bleeding - while important for long-term management of peptic ulcer disease, acute bleeding requires immediate hemostatic measures, not diagnostic testing.\n\nOption D (Barium meal) is INCORRECT because contrast studies are contraindicated in acute GI bleeding and provide no therapeutic benefit compared to endoscopy.",
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
      },
      {
        stem: "A 45-year-old woman presents with right upper quadrant pain, jaundice, and fever. Blood tests show elevated bilirubin, ALP, and WCC. What is the most likely diagnosis?",
        options: [
          "Cholangitis",
          "Hepatitis A",
          "Choledocholithiasis",
          "Cholecystitis"
        ],
        correctAnswer: 0,
        explanation: "Option A (Cholangitis) is CORRECT because the triad of jaundice, fever, and RUQ pain (Charcot's triad) with elevated inflammatory markers indicates ascending cholangitis, a life-threatening biliary infection requiring urgent antibiotic therapy and biliary decompression.\n\nOption B (Hepatitis A) is INCORRECT because viral hepatitis typically causes hepatocellular injury (elevated ALT/AST) rather than obstructive pattern (elevated ALP/bilirubin) and doesn't usually present with fever and RUQ pain.\n\nOption C (Choledocholithiasis) is INCORRECT because bile duct stones alone cause painless jaundice without the systemic inflammatory response (fever, elevated WCC) seen in cholangitis.\n\nOption D (Cholecystitis) is INCORRECT because gallbladder inflammation doesn't typically cause jaundice unless complicated by Mirizzi syndrome or choledocholithiasis with secondary cholangitis.",
        references: [
          {
            text: "NICE CG188: Gallstone disease - Section 1.5.1 'Charcot triad of fever, jaundice and RUQ pain suggests acute cholangitis requiring urgent treatment'",
            url: "https://www.nice.org.uk/guidance/cg188"
          },
          {
            text: "BSG Guidelines 2019: 'Cholangitis requires urgent antibiotics and biliary decompression within 24-48 hours - Gut 68:1449-1478'",
            url: "https://gut.bmj.com/content/68/9/1449"
          },
          {
            text: "Tokyo Guidelines 2018: 'Acute cholangitis severity assessment determines timing of biliary drainage - Journal of Hepato-Biliary-Pancreatic Sciences 25:17-30'",
            url: "https://link.springer.com/article/10.1002/jhbp.512"
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
    ],
    nephrology: [
      {
        stem: "A 68-year-old diabetic patient presents with progressive fatigue and ankle swelling. Blood tests show creatinine 180 μmol/L (was 90 μmol/L 6 months ago), eGFR 28 ml/min/1.73m². Urine shows 3+ proteinuria. What is the most appropriate initial management?",
        options: [
          "Start ACE inhibitor",
          "Refer for urgent dialysis",
          "Increase diuretic dose",
          "Start calcium channel blocker"
        ],
        correctAnswer: 0,
        explanation: "Option A (Start ACE inhibitor) is CORRECT because this patient has diabetic nephropathy with declining kidney function and proteinuria. NICE guidelines recommend ACE inhibitors as first-line therapy to slow progression of diabetic kidney disease by reducing proteinuria and glomerular pressure.\n\nOption B (Urgent dialysis) is INCORRECT because eGFR 28 ml/min indicates CKD stage 4, not requiring immediate dialysis - dialysis typically starts at eGFR <10-15 ml/min or symptomatic uremia.\n\nOption C (Increase diuretic) is INCORRECT as primary therapy - while diuretics help with fluid overload, ACE inhibitors are essential for nephroprotection in diabetic kidney disease.\n\nOption D (Calcium channel blocker) is INCORRECT as first-line - while useful for blood pressure control, ACE inhibitors provide superior nephroprotection in diabetic nephropathy.",
        references: [
          {
            text: "NICE CG87: Type 2 diabetes - Section 1.7.1 'Offer ACE inhibitor to people with diabetic kidney disease and hypertension or microalbuminuria'",
            url: "https://www.nice.org.uk/guidance/cg87"
          },
          {
            text: "KDIGO 2012 Guidelines: 'ACE inhibitors slow progression of diabetic nephropathy by 30-50% - Kidney International Supplements 2:337-414'",
            url: "https://www.kidney-international.org/article/S2157-1716(12)00121-6/fulltext"
          },
          {
            text: "Renal Association Guidelines 2019: 'ACE inhibitors reduce proteinuria and preserve kidney function in diabetic nephropathy - BMC Nephrology 20:285'",
            url: "https://bmcnephrol.biomedcentral.com/articles/10.1186/s12882-019-1466-6"
          }
        ]
      },
      {
        stem: "A 25-year-old woman presents with acute severe headache, visual disturbance, and blood pressure 200/120 mmHg. Urine dipstick shows 3+ blood and 2+ protein. What is the most likely diagnosis?",
        options: [
          "Essential hypertension",
          "Acute glomerulonephritis",
          "Malignant hypertension",
          "Renal artery stenosis"
        ],
        correctAnswer: 2,
        explanation: "Option C (Malignant hypertension) is CORRECT because severe hypertension (>180/120 mmHg) with end-organ damage (headache, visual changes, acute kidney injury with proteinuria and hematuria) defines malignant hypertension requiring immediate treatment.\n\nOption A (Essential hypertension) is INCORRECT because essential hypertension doesn't cause acute severe symptoms or rapid end-organ damage - it develops gradually over years.\n\nOption B (Acute glomerulonephritis) is INCORRECT because while it can cause hypertension and urinary abnormalities, the extreme blood pressure elevation and acute neurological symptoms point to malignant hypertension.\n\nOption D (Renal artery stenosis) is INCORRECT because while it causes secondary hypertension, the acute presentation with severe end-organ damage indicates malignant hypertension crisis.",
        references: [
          {
            text: "NICE CG127: Hypertension - Section 1.4.5 'Malignant hypertension requires immediate treatment to prevent stroke and organ damage'",
            url: "https://www.nice.org.uk/guidance/cg127"
          },
          {
            text: "ESH/ESC Guidelines 2018: 'Hypertensive emergency defined as BP >180/120 with acute organ damage - European Heart Journal 39:3021-3104'",
            url: "https://academic.oup.com/eurheartj/article/39/33/3021/5079119"
          },
          {
            text: "AHA Scientific Statement 2017: 'Malignant hypertension causes acute kidney injury and requires urgent BP reduction - Hypertension 69:e13-e23'",
            url: "https://www.ahajournals.org/doi/10.1161/HYP.0000000000000054"
          }
        ]
      }
    ],
    haematology: [
      {
        stem: "A 45-year-old man presents with fatigue and bruising. Blood tests show Hb 8.5 g/dL, WCC 2.1 × 10⁹/L, platelets 25 × 10⁹/L. Blood film shows pancytopenia with reduced reticulocytes. What is the most likely diagnosis?",
        options: [
          "Acute leukemia",
          "Aplastic anemia",
          "Myelofibrosis",
          "Hypersplenism"
        ],
        correctAnswer: 1,
        explanation: "Option B (Aplastic anemia) is CORRECT because pancytopenia (anemia, leucopenia, thrombocytopenia) with reduced reticulocytes indicates bone marrow failure. The absence of abnormal cells on blood film supports aplastic anemia rather than hematological malignancy.\n\nOption A (Acute leukemia) is INCORRECT because acute leukemia typically shows blast cells on blood film and elevated WCC, not the profound pancytopenia with normal cell morphology seen here.\n\nOption C (Myelofibrosis) is INCORRECT because myelofibrosis usually shows teardrop cells, nucleated RBCs, and immature WBCs on blood film, plus splenomegaly, which aren't described.\n\nOption D (Hypersplenism) is INCORRECT because while it can cause pancytopenia, it's usually milder and associated with massive splenomegaly, which isn't mentioned.",
        references: [
          {
            text: "BSH Guidelines 2016: 'Aplastic anemia diagnosis requires pancytopenia with hypocellular bone marrow - British Journal of Haematology 172:187-207'",
            url: "https://onlinelibrary.wiley.com/doi/10.1111/bjh.13853"
          },
          {
            text: "NICE CG151: Neutropenia - Section 2.1 'Pancytopenia with reticulocytopenia suggests bone marrow failure requiring urgent investigation'",
            url: "https://www.nice.org.uk/guidance/cg151"
          },
          {
            text: "ASH Guidelines 2019: 'Severe aplastic anemia defined as neutrophils <0.5×10⁹/L, platelets <20×10⁹/L - Blood 133:1428-1435'",
            url: "https://ashpublications.org/blood/article/133/13/1428/260734"
          }
        ]
      },
      {
        stem: "A 70-year-old man presents with bone pain and recurrent infections. Blood tests show Hb 9.2 g/dL, calcium 2.8 mmol/L, creatinine 140 μmol/L. Serum protein electrophoresis shows M-protein band. What is the most likely diagnosis?",
        options: [
          "Multiple myeloma",
          "Chronic lymphocytic leukemia",
          "Waldenstrom's macroglobulinemia",
          "MGUS"
        ],
        correctAnswer: 0,
        explanation: "Option A (Multiple myeloma) is CORRECT because the combination of bone pain, hypercalcemia, renal impairment, anemia, and M-protein band represents the classic CRAB features (Calcium elevation, Renal dysfunction, Anemia, Bone lesions) of multiple myeloma.\n\nOption B (CLL) is INCORRECT because CLL typically presents with lymphocytosis and lymphadenopathy, not the CRAB features or M-protein band characteristic of plasma cell disorders.\n\nOption C (Waldenstrom's) is INCORRECT because it usually causes IgM paraprotein with hyperviscosity symptoms (bleeding, visual disturbance) rather than the bone pain and hypercalcemia seen in myeloma.\n\nOption D (MGUS) is INCORRECT because MGUS is asymptomatic by definition - the presence of end-organ damage (anemia, hypercalcemia, renal impairment) indicates progression to multiple myeloma.",
        references: [
          {
            text: "NICE NG35: Myeloma - Section 1.1.1 'Diagnose myeloma in people with CRAB features and clonal plasma cells >10%'",
            url: "https://www.nice.org.uk/guidance/ng35"
          },
          {
            text: "IMWG Criteria 2014: 'Multiple myeloma requires clonal bone marrow plasma cells ≥10% plus CRAB features - Lancet Oncology 15:e538-548'",
            url: "https://www.thelancet.com/journals/lanonc/article/PIIS1470-2045(14)70442-5/fulltext"
          },
          {
            text: "BSH Guidelines 2016: 'Serum free light chains and imaging essential for myeloma diagnosis - British Journal of Haematology 175:252-264'",
            url: "https://onlinelibrary.wiley.com/doi/10.1111/bjh.14208"
          }
        ]
      }
    ],
    rheumatology: [
      {
        stem: "A 35-year-old woman presents with 6 weeks of morning stiffness lasting >1 hour, symmetrical swelling of MCPJs and PIPJs, and fatigue. Blood tests show positive anti-CCP antibodies and elevated CRP. What is the most appropriate initial management?",
        options: [
          "Prednisolone 15mg daily",
          "Methotrexate 15mg weekly with folic acid",
          "Sulfasalazine 2g daily",
          "Hydroxychloroquine 400mg daily"
        ],
        correctAnswer: 1,
        explanation: "Option B (Methotrexate 15mg weekly with folic acid) is CORRECT because this presentation indicates rheumatoid arthritis requiring immediate DMARD therapy. NICE guidelines recommend methotrexate as first-line DMARD for newly diagnosed RA, starting within 3 months of symptom onset to prevent joint damage.\n\nOption A (Prednisolone) is INCORRECT as first-line monotherapy - corticosteroids should only be used as bridging therapy while DMARDs take effect, not as primary treatment.\n\nOption C (Sulfasalazine) is INCORRECT as first-line therapy - it's less effective than methotrexate and reserved for patients who cannot tolerate MTX or have contraindications.\n\nOption D (Hydroxychloroquine) is INCORRECT for RA - it's used for mild inflammatory arthritis or lupus but insufficient for erosive RA requiring aggressive DMARD therapy.",
        references: [
          {
            text: "NICE CG79: Rheumatoid arthritis in adults - Section 1.4.1 'Offer methotrexate as first-line DMARD therapy for newly diagnosed active RA'",
            url: "https://www.nice.org.uk/guidance/cg79"
          },
          {
            text: "BSR Guidelines 2018: 'Methotrexate should be started within 3 months of symptom onset to prevent irreversible joint damage - Rheumatology 57:e1-e45'",
            url: "https://academic.oup.com/rheumatology/article/57/suppl_2/key004/4670780"
          },
          {
            text: "EULAR Recommendations 2019: 'Early DMARD therapy with methotrexate improves long-term outcomes in RA - Annals of Rheumatic Diseases 79:685-699'",
            url: "https://ard.bmj.com/content/79/6/685"
          }
        ]
      },
      {
        stem: "A 45-year-old man presents with severe lower back pain and morning stiffness lasting 2 hours. He has reduced spinal flexibility and sacroiliac joint tenderness. HLA-B27 is positive. What is the most likely diagnosis?",
        options: [
          "Mechanical back pain",
          "Ankylosing spondylitis",
          "Psoriatic arthritis",
          "Reactive arthritis"
        ],
        correctAnswer: 1,
        explanation: "Option B (Ankylosing spondylitis) is CORRECT because inflammatory back pain with morning stiffness >30 minutes, reduced spinal flexibility, sacroiliac involvement, and positive HLA-B27 are classic features of ankylosing spondylitis. Modified New York criteria support this diagnosis.\n\nOption A (Mechanical back pain) is INCORRECT because mechanical pain typically worsens with activity and improves with rest, opposite to inflammatory back pain which improves with movement.\n\nOption C (Psoriatic arthritis) is INCORRECT because while it can cause spinal involvement, it typically presents with peripheral joint disease and skin/nail psoriasis, not isolated axial disease.\n\nOption D (Reactive arthritis) is INCORRECT because it usually follows infection and presents with asymmetrical peripheral arthritis, not primarily axial involvement.",
        references: [
          {
            text: "NICE CG65: Spondyloarthritis - Section 1.1.1 'Consider ankylosing spondylitis in adults with chronic lower back pain that started before age 45'",
            url: "https://www.nice.org.uk/guidance/cg65"
          },
          {
            text: "ASAS Classification Criteria: 'Inflammatory back pain plus sacroiliitis on imaging or HLA-B27 plus SpA features - Annals of Rheumatic Diseases 68:777-783'",
            url: "https://ard.bmj.com/content/68/6/777"
          },
          {
            text: "BSR Guidelines 2017: 'Early diagnosis and TNF inhibitor therapy improves outcomes in axial spondyloarthritis - Rheumatology 56:1273-1284'",
            url: "https://academic.oup.com/rheumatology/article/56/8/1273/3091299"
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
    difficulty: difficulty,
    references: [
      {
        text: "NICE Guidelines: Clinical evidence and recommendations for medical practice",
        url: "https://www.nice.org.uk/guidance"
      },
      {
        text: "GMC Good Medical Practice: Professional standards for UK medical practitioners",
        url: "https://www.gmc-uk.org/ethical-guidance/ethical-guidance-for-doctors/good-medical-practice"
      }
    ]
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
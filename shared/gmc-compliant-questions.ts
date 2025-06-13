// GMC MLA-Compliant Question Bank
// Following GMC Medical Licensing Assessment Content Map and Good Medical Practice (2024)

import { GMCQuestion } from './gmc-question-bank';

export const GMC_COMPLIANT_QUESTIONS: GMCQuestion[] = [
  // CARDIOVASCULAR MEDICINE
  {
    id: 'gmc_cv_001',
    category: 'cardiovascular',
    subcategory: 'acute-coronary-syndrome',
    cognitiveLevel: 'problem-solving',
    difficulty: 'intermediate',
    clinicalSetting: 'Emergency Department',
    ageGroup: 'Adult',
    stem: "A 58-year-old man presents to the Emergency Department with severe crushing central chest pain radiating to his left arm, lasting 45 minutes. He has a history of hypertension and diabetes mellitus. His ECG shows ST elevation in leads V1-V4. Blood pressure is 140/85 mmHg, heart rate 95 bpm. What is the most appropriate immediate management according to current guidelines?",
    options: [
      "Aspirin 300mg chewed, atorvastatin 80mg, and arrange urgent cardiac catheterization",
      "Aspirin 300mg chewed, clopidogrel 600mg, and thrombolysis with alteplase",
      "GTN sublingual, morphine 5-10mg IV, and arrange echocardiogram",
      "Aspirin 75mg, ramipril 2.5mg, and 12-lead ECG in 12 hours",
      "High-flow oxygen, IV access, and troponin levels only"
    ],
    correctAnswer: 0,
    explanation: "This patient presents with STEMI (ST-elevation myocardial infarction) based on clinical presentation and ECG findings. According to NICE guidelines and ESC/AHA recommendations, immediate management includes: aspirin 300mg chewed (antiplatelet), high-intensity statin (atorvastatin 80mg), and urgent primary PCI within 120 minutes of first medical contact. Thrombolysis is only considered if PCI cannot be delivered within timeframe. The combination of aspirin and urgent revascularization provides optimal outcomes in STEMI.",
    learningObjectives: [
      "Recognize STEMI presentation and ECG changes",
      "Apply evidence-based acute coronary syndrome management",
      "Understand urgency of reperfusion therapy"
    ],
    gmcOutcomes: [
      "Emergency assessment and management",
      "Evidence-based treatment decisions",
      "Patient safety and time-critical interventions"
    ],
    references: [
      "NICE CG167: Acute coronary syndromes",
      "ESC Guidelines for STEMI 2023",
      "GMC Good Medical Practice 2024 - Providing good clinical care"
    ],
    tags: ["STEMI", "primary-PCI", "antiplatelet", "emergency-medicine"],
    estimatedTime: 90,
    lastReviewed: "2024-12-01",
    reviewedBy: "Dr. Michael Chen, Consultant Cardiologist"
  },

  {
    id: 'gmc_cv_002',
    category: 'cardiovascular',
    subcategory: 'hypertension',
    cognitiveLevel: 'application',
    difficulty: 'foundation',
    clinicalSetting: 'GP Surgery',
    ageGroup: 'Adult',
    stem: "A 45-year-old Caucasian teacher presents for routine health check. Blood pressure readings over 3 separate visits are: 155/95, 158/92, and 152/96 mmHg. He has no symptoms, normal BMI, non-smoker. Blood tests show normal renal function (eGFR >90), normal glucose, and total cholesterol 5.2 mmol/L. According to NICE guidelines, what is the most appropriate first-line antihypertensive treatment?",
    options: [
      "Ramipril 2.5mg once daily",
      "Amlodipine 5mg once daily", 
      "Bendroflumethiazide 2.5mg once daily",
      "Atenolol 50mg once daily",
      "Lifestyle advice only and review in 6 months"
    ],
    correctAnswer: 0,
    explanation: "According to NICE NG136 hypertension guidelines, for patients under 55 years (and not of black African/Caribbean origin), ACE inhibitors are first-line treatment. Ramipril 2.5mg daily is appropriate starting dose. Calcium channel blockers (amlodipine) are first-line for patients ≥55 years or black African/Caribbean patients. Beta-blockers are not first-line due to inferior stroke prevention. Thiazide diuretics are typically third-line add-on therapy. Stage 1 hypertension (140-159/90-99 mmHg) requires treatment when confirmed by ambulatory monitoring.",
    learningObjectives: [
      "Apply NICE hypertension treatment algorithm",
      "Understand age and ethnicity considerations in antihypertensive choice",
      "Recognize threshold for antihypertensive treatment"
    ],
    gmcOutcomes: [
      "Evidence-based prescribing",
      "Cardiovascular risk assessment",
      "Patient-centered care"
    ],
    references: [
      "NICE NG136: Hypertension in adults (2022 update)",
      "GMC Good Medical Practice 2024 - Prescribing and managing medicines"
    ],
    tags: ["hypertension", "ACE-inhibitor", "first-line", "NICE-guidelines"],
    estimatedTime: 75,
    lastReviewed: "2024-12-01",
    reviewedBy: "Dr. Sarah Williams, GP Principal"
  },

  // RESPIRATORY MEDICINE
  {
    id: 'gmc_resp_001',
    category: 'respiratory',
    subcategory: 'pneumonia',
    cognitiveLevel: 'problem-solving',
    difficulty: 'intermediate',
    clinicalSetting: 'Emergency Department',
    ageGroup: 'Elderly',
    stem: "A 72-year-old woman presents with 4-day history of productive cough with green sputum, fever (38.5°C), and confusion. Her daughter reports she has been 'not herself' for 2 days. Past medical history includes COPD and type 2 diabetes. On examination: respiratory rate 24/min, oxygen saturation 89% on air, blood pressure 110/70 mmHg. Chest X-ray shows right middle lobe consolidation. What is her CURB-65 score and most appropriate management?",
    options: [
      "CURB-65 score 3; admit for IV antibiotics and consider ITU referral",
      "CURB-65 score 2; admit for IV antibiotics and monitor closely", 
      "CURB-65 score 4; immediate ITU referral and IV antibiotics",
      "CURB-65 score 1; oral antibiotics and discharge with safety netting",
      "CURB-65 score 2; oral antibiotics and arrange GP follow-up"
    ],
    correctAnswer: 0,
    explanation: "CURB-65 scoring: Confusion (1), Urea >7mmol/L (assume present given diabetes/age = 1), Respiratory rate ≥30 (0, but 24 is concerning), Blood pressure <90 systolic (0), age ≥65 (1) = Score 3. CURB-65 ≥3 indicates severe pneumonia requiring hospital admission with consideration for ITU care. BTS guidelines recommend IV antibiotics (co-amoxiclav or ceftriaxone) for severe community-acquired pneumonia. The combination of confusion, age, and radiological changes supports severity assessment requiring inpatient management.",
    learningObjectives: [
      "Calculate and interpret CURB-65 scoring system",
      "Recognize severe pneumonia requiring hospital admission",
      "Apply evidence-based pneumonia management guidelines"
    ],
    gmcOutcomes: [
      "Clinical assessment and risk stratification",
      "Evidence-based treatment decisions",
      "Patient safety and appropriate escalation"
    ],
    references: [
      "NICE CG191: Pneumonia in adults",
      "BTS Guidelines for Community Acquired Pneumonia",
      "GMC Good Medical Practice 2024 - Providing good clinical care"
    ],
    tags: ["pneumonia", "CURB-65", "severity-assessment", "hospital-admission"],
    estimatedTime: 90,
    lastReviewed: "2024-12-01",
    reviewedBy: "Dr. James Robertson, Consultant Respiratory Medicine"
  },

  {
    id: 'gmc_resp_002',
    category: 'respiratory',
    subcategory: 'asthma',
    cognitiveLevel: 'application',
    difficulty: 'foundation',
    clinicalSetting: 'GP Surgery',
    ageGroup: 'Young Adult',
    stem: "A 25-year-old teacher presents with 6-month history of wheeze, dry cough (worse at night), and breathlessness on exertion. She has no smoking history. Peak flow diary shows 20% diurnal variation. Fractional exhaled nitric oxide (FeNO) is 55 ppb. According to NICE guidelines, what is the most appropriate initial treatment?",
    options: [
      "Salbutamol 100-200mcg inhaler PRN only",
      "Beclometasone 200mcg BD plus salbutamol 100-200mcg PRN",
      "Prednisolone 30mg daily for 5 days then beclometasone inhaler",
      "Montelukast 10mg daily plus salbutamol PRN",
      "Trial of antihistamines and allergen avoidance only"
    ],
    correctAnswer: 1,
    explanation: "NICE NG80 asthma guidelines recommend starting newly diagnosed asthma patients on low-dose inhaled corticosteroids (ICS) plus short-acting beta-agonist (SABA) reliever. Beclometasone 200mcg BD (low dose ICS) addresses underlying inflammation, while salbutamol PRN provides bronchodilation for symptom relief. FeNO >50ppb indicates significant airway inflammation requiring anti-inflammatory treatment. SABA-only treatment is no longer recommended as initial therapy due to poor long-term outcomes. Peak flow variation >20% supports asthma diagnosis.",
    learningObjectives: [
      "Recognize asthma diagnostic criteria and investigations",
      "Apply NICE asthma treatment guidelines",
      "Understand importance of anti-inflammatory treatment"
    ],
    gmcOutcomes: [
      "Evidence-based diagnosis and treatment",
      "Patient education and self-management",
      "Long-term condition management"
    ],
    references: [
      "NICE NG80: Asthma diagnosis, monitoring and chronic asthma management",
      "BTS/SIGN Asthma Guidelines",
      "GMC Good Medical Practice 2024 - Providing good clinical care"
    ],
    tags: ["asthma", "inhaled-corticosteroids", "NICE-guidelines", "peak-flow"],
    estimatedTime: 75,
    lastReviewed: "2024-12-01",
    reviewedBy: "Dr. Emma Thompson, GP with Special Interest in Respiratory Medicine"
  },

  // GASTROENTEROLOGY
  {
    id: 'gmc_gi_001',
    category: 'gastroenterology',
    subcategory: 'peptic-ulcer',
    cognitiveLevel: 'problem-solving',
    difficulty: 'intermediate',
    clinicalSetting: 'GP Surgery',
    ageGroup: 'Middle-aged',
    stem: "A 48-year-old mechanic presents with 6-week history of epigastric pain, worse when hungry and relieved by food. He takes ibuprofen regularly for back pain. Helicobacter pylori stool antigen test is positive. He has no alarm symptoms and normal blood tests. According to NICE guidelines, what is the most appropriate management?",
    options: [
      "Proton pump inhibitor therapy for 4 weeks then review",
      "H. pylori eradication therapy: PPI + amoxicillin + clarithromycin for 7 days",
      "Urgent upper GI endoscopy within 2 weeks",
      "H. pylori eradication therapy: PPI + metronidazole + bismuth for 14 days",
      "Discontinue ibuprofen and start ranitidine 150mg BD"
    ],
    correctAnswer: 1,
    explanation: "NICE CG184 dyspepsia guidelines recommend first-line H. pylori eradication with triple therapy: PPI (omeprazole 20mg or lansoprazole 30mg) + amoxicillin 1g + clarithromycin 500mg, all twice daily for 7 days. This patient has typical peptic ulcer symptoms with positive H. pylori test. No alarm symptoms present (no weight loss, dysphagia, persistent vomiting, anaemia), so urgent endoscopy not indicated. NSAID cessation is important but eradication therapy is primary treatment. Urea breath test should be performed 4 weeks after completion to confirm eradication.",
    learningObjectives: [
      "Recognize peptic ulcer disease presentation",
      "Apply NICE H. pylori eradication guidelines",
      "Understand when urgent endoscopy is indicated"
    ],
    gmcOutcomes: [
      "Evidence-based treatment decisions",
      "Patient safety and appropriate investigation",
      "Understanding of drug interactions and side effects"
    ],
    references: [
      "NICE CG184: Gastro-oesophageal reflux disease and dyspepsia",
      "Maastricht VI/Florence Consensus Report on H. pylori",
      "GMC Good Medical Practice 2024 - Prescribing and managing medicines"
    ],
    tags: ["H-pylori", "eradication-therapy", "peptic-ulcer", "NSAID"],
    estimatedTime: 80,
    lastReviewed: "2024-12-01",
    reviewedBy: "Dr. David Kumar, Consultant Gastroenterologist"
  },

  // ENDOCRINOLOGY
  {
    id: 'gmc_endo_001',
    category: 'endocrinology',
    subcategory: 'diabetes-type2',
    cognitiveLevel: 'application',
    difficulty: 'foundation',
    clinicalSetting: 'GP Surgery',
    ageGroup: 'Middle-aged',
    stem: "A 52-year-old office worker presents for diabetes review. She was diagnosed with type 2 diabetes 3 months ago. Current HbA1c is 64 mmol/mol (8.0%) despite lifestyle modifications and metformin 1g BD. BMI is 32 kg/m². She has no contraindications to medications. According to NICE guidelines, what is the most appropriate next step?",
    options: [
      "Increase metformin to 1g TDS",
      "Add gliclazide 40mg BD",
      "Add sitagliptin 100mg daily",
      "Add empagliflozin 10mg daily",
      "Start insulin glargine 10 units nocte"
    ],
    correctAnswer: 3,
    explanation: "NICE NG28 type 2 diabetes guidelines recommend SGLT-2 inhibitors (empagliflozin) as second-line therapy for patients with BMI ≥35 kg/m² or when sulfonylureas are contraindicated/not tolerated. Empagliflozin provides cardiovascular and renal protection benefits, weight loss, and low hypoglycemia risk. HbA1c target is <48 mmol/mol (6.5%) for most adults. Sulfonylureas (gliclazide) are alternative second-line but cause weight gain and hypoglycemia risk. DPP-4 inhibitors (sitagliptin) are less effective for weight reduction. Insulin is typically third-line therapy.",
    learningObjectives: [
      "Apply NICE type 2 diabetes treatment algorithm",
      "Understand HbA1c targets and monitoring",
      "Consider patient factors in medication choice"
    ],
    gmcOutcomes: [
      "Evidence-based prescribing",
      "Long-term condition management",
      "Patient-centered care and shared decision making"
    ],
    references: [
      "NICE NG28: Type 2 diabetes in adults: management",
      "ADA/EASD Consensus Statement on Type 2 Diabetes Management",
      "GMC Good Medical Practice 2024 - Providing good clinical care"
    ],
    tags: ["type2-diabetes", "SGLT2-inhibitor", "HbA1c", "obesity"],
    estimatedTime: 75,
    lastReviewed: "2024-12-01",
    reviewedBy: "Dr. Rachel Green, Consultant Endocrinologist"
  },

  // INFECTIOUS DISEASES
  {
    id: 'gmc_id_001',
    category: 'infectious-diseases',
    subcategory: 'sepsis',
    cognitiveLevel: 'problem-solving',
    difficulty: 'advanced',
    clinicalSetting: 'Emergency Department',
    ageGroup: 'Elderly',
    stem: "A 78-year-old nursing home resident presents with confusion, fever (39.2°C), hypotension (85/50 mmHg), and tachycardia (125 bpm). Blood tests show: WBC 18.5×10⁹/L, lactate 4.2 mmol/L, creatinine 145 μmol/L (baseline 85). Suspected urinary source. qSOFA score is 3. According to Sepsis 3 criteria and NICE guidelines, what is the most appropriate immediate management bundle?",
    options: [
      "Blood cultures, urine culture, and oral co-trimoxazole",
      "IV fluid resuscitation 500ml, blood cultures, and IV piperacillin-tazobactam within 1 hour",
      "IV noradrenaline, IV hydrocortisone, and blood cultures",
      "Urinary catheter, IV gentamicin, and paracetamol 1g",
      "CT urogram, IV fluids, and await culture results before antibiotics"
    ],
    correctAnswer: 1,
    explanation: "This patient meets sepsis criteria (qSOFA ≥2 + suspected infection) with septic shock (lactate >2 mmol/L + hypotension). NICE CG51 sepsis guidelines recommend 'Sepsis Six' bundle within 1 hour: oxygen, blood cultures, IV antibiotics, IV fluids, lactate measurement, and urine output monitoring. IV piperacillin-tazobactam 4.5g TDS is appropriate empirical therapy for hospital-acquired UTI in elderly patients. Fluid resuscitation (500ml crystalloid) addresses hypotension. Vasopressors are considered if hypotension persists after fluid resuscitation. Time-critical intervention improves outcomes.",
    learningObjectives: [
      "Recognize sepsis and septic shock criteria",
      "Apply evidence-based sepsis management bundles",
      "Understand time-critical nature of sepsis treatment"
    ],
    gmcOutcomes: [
      "Emergency assessment and management",
      "Patient safety and time-critical interventions",
      "Evidence-based treatment decisions"
    ],
    references: [
      "NICE CG51: Sepsis recognition, diagnosis and early management",
      "Surviving Sepsis Campaign Guidelines 2021",
      "GMC Good Medical Practice 2024 - Providing good clinical care"
    ],
    tags: ["sepsis", "septic-shock", "sepsis-six", "time-critical"],
    estimatedTime: 120,
    lastReviewed: "2024-12-01",
    reviewedBy: "Dr. Mark Taylor, Consultant Emergency Medicine"
  },

  // ETHICS AND COMMUNICATION
  {
    id: 'gmc_ethics_001',
    category: 'cardiovascular',
    subcategory: 'consent',
    cognitiveLevel: 'application',
    difficulty: 'intermediate',
    clinicalSetting: 'Surgical Ward',
    ageGroup: 'Adult',
    stem: "A 45-year-old man requires urgent appendectomy for acute appendicitis. He has learning disabilities but lives independently. He appears anxious and repeatedly asks 'Will it hurt?' His sister, who has lasting power of attorney for financial affairs only, insists he cannot consent and wants to sign consent forms for him. According to GMC Good Medical Practice 2024, what is the most appropriate approach to consent?",
    options: [
      "Accept sister's consent as she has power of attorney",
      "Assess the patient's capacity to consent using structured approach and involve advocate if needed",
      "Proceed under implied consent as this is emergency surgery",
      "Request urgent Court of Protection ruling",
      "Defer surgery until formal capacity assessment by psychiatrist"
    ],
    correctAnswer: 1,
    explanation: "GMC Good Medical Practice 2024 emphasizes that adults are presumed to have capacity unless proven otherwise. Learning disabilities do not automatically mean lack of capacity. Capacity assessment must be decision-specific using structured approach: understanding information, retaining it, weighing up options, and communicating decision. Sister's LPA for finance doesn't cover healthcare decisions. Independent Mental Capacity Advocate (IMCA) may be needed if patient lacks capacity and has no appropriate person to consult. Emergency provisions exist but capacity should be assessed first where possible.",
    learningObjectives: [
      "Apply Mental Capacity Act principles",
      "Understand structured capacity assessment",
      "Recognize limitations of lasting power of attorney"
    ],
    gmcOutcomes: [
      "Consent and decision making",
      "Communication and partnership",
      "Patient rights and dignity"
    ],
    references: [
      "GMC Good Medical Practice 2024 - Consent guidance",
      "Mental Capacity Act 2005",
      "GMC Decision making and consent guidance"
    ],
    tags: ["consent", "capacity", "learning-disabilities", "ethics"],
    estimatedTime: 90,
    lastReviewed: "2024-12-01",
    reviewedBy: "Dr. Helen Clarke, Medical Ethics Advisor"
  },

  // NEUROLOGY
  {
    id: 'gmc_neuro_001',
    category: 'neurology',
    subcategory: 'stroke',
    cognitiveLevel: 'problem-solving',
    difficulty: 'advanced',
    clinicalSetting: 'Emergency Department',
    ageGroup: 'Elderly',
    stem: "A 68-year-old woman presents 90 minutes after sudden onset left-sided weakness and speech difficulties. She has atrial fibrillation (not anticoagulated), hypertension, and diabetes. NIHSS score is 14. CT head shows no hemorrhage or early ischemic changes. Blood pressure is 180/100 mmHg, glucose 8.2 mmol/L. According to NICE stroke guidelines, what is the most appropriate immediate management?",
    options: [
      "IV alteplase 0.9mg/kg and arrange urgent thrombectomy",
      "Aspirin 300mg, clopidogrel 600mg, and arrange MRI brain",
      "IV labetalol to reduce BP to <140/90 mmHg, then consider thrombolysis",
      "IV insulin to normalize glucose, then alteplase if BP permits",
      "Urgent CT angiogram and direct to interventional neuroradiology"
    ],
    correctAnswer: 0,
    explanation: "This patient presents with acute ischemic stroke within thrombolysis window (4.5 hours). NIHSS 14 indicates major stroke likely benefiting from both thrombolysis and thrombectomy. NICE CG68 recommends IV alteplase within 4.5 hours for eligible patients. Large vessel occlusion (suggested by high NIHSS) should proceed directly to thrombectomy. BP 180/100 is acceptable for thrombolysis (contraindicated if >185/110). Glucose 8.2 mmol/L is acceptable. Time is brain - dual therapy maximizes functional recovery. CT angiogram can be performed simultaneously with treatment initiation.",
    learningObjectives: [
      "Recognize acute stroke presentation and assessment",
      "Apply evidence-based stroke treatment guidelines",
      "Understand time-critical nature of stroke intervention"
    ],
    gmcOutcomes: [
      "Emergency assessment and management",
      "Evidence-based treatment decisions",
      "Patient safety and time-critical interventions"
    ],
    references: [
      "NICE CG68: Stroke and transient ischaemic attack",
      "ESO Guidelines for Stroke Treatment 2023",
      "GMC Good Medical Practice 2024 - Providing good clinical care"
    ],
    tags: ["stroke", "thrombolysis", "thrombectomy", "time-critical"],
    estimatedTime: 120,
    lastReviewed: "2024-12-01",
    reviewedBy: "Dr. Andrew Mitchell, Consultant Stroke Medicine"
  },

  // PSYCHIATRY
  {
    id: 'gmc_psych_001',
    category: 'psychiatry',
    subcategory: 'depression',
    cognitiveLevel: 'application',
    difficulty: 'foundation',
    clinicalSetting: 'GP Surgery',
    ageGroup: 'Adult',
    stem: "A 32-year-old accountant presents with 8-week history of low mood, poor sleep, reduced appetite, and difficulty concentrating at work. She scores 16 on PHQ-9 questionnaire. She has no suicidal ideation, psychotic symptoms, or substance misuse. This is her first episode. According to NICE guidelines for depression, what is the most appropriate initial management?",
    options: [
      "Sertraline 50mg daily and review in 2 weeks",
      "Cognitive behavioral therapy (CBT) referral and lifestyle advice",
      "Mirtazapine 15mg nocte and sleep hygiene advice",
      "Amitriptyline 25mg nocte and monitor ECG",
      "Crisis team referral and consider admission"
    ],
    correctAnswer: 1,
    explanation: "NICE CG90 depression guidelines recommend psychological interventions (CBT, counselling, guided self-help) as first-line treatment for mild-moderate depression (PHQ-9 10-14 = moderate, 15-19 = moderately severe). This patient has moderately severe depression but no high-risk factors. Antidepressants are indicated for moderate-severe depression but psychological therapy should be offered first-line. SSRIs like sertraline are first-line if medication needed. Crisis intervention not required as no immediate risk. Lifestyle interventions (exercise, sleep hygiene, diet) are important adjuncts.",
    learningObjectives: [
      "Assess depression severity using validated tools",
      "Apply NICE depression treatment guidelines",
      "Understand stepped care approach to mental health"
    ],
    gmcOutcomes: [
      "Mental health assessment and management",
      "Evidence-based treatment decisions",
      "Patient-centered care and shared decision making"
    ],
    references: [
      "NICE CG90: Depression in adults: recognition and management",
      "GMC Good Medical Practice 2024 - Providing good clinical care",
      "NICE Quality Standard QS8: Depression in adults"
    ],
    tags: ["depression", "PHQ-9", "CBT", "psychological-therapy"],
    estimatedTime: 75,
    lastReviewed: "2024-12-01",
    reviewedBy: "Dr. Sarah Johnson, Consultant Psychiatrist"
  },

  // PEDIATRICS
  {
    id: 'gmc_paeds_001',
    category: 'paediatrics',
    subcategory: 'febrile-illness',
    cognitiveLevel: 'problem-solving',
    difficulty: 'intermediate',
    clinicalSetting: 'Emergency Department',
    ageGroup: 'Child',
    stem: "A 2-year-old boy presents with 12-hour history of fever (39.5°C), irritability, and refusing feeds. Parents report he has been 'floppy' and sleepy. On examination: heart rate 160 bpm, capillary refill 3 seconds, non-blanching rash on trunk. He appears unwell but no focal neurological signs. According to NICE traffic light system, what is the most appropriate management?",
    options: [
      "Paracetamol 15mg/kg, safety netting advice, and GP follow-up",
      "Blood tests, urine culture, and oral antibiotics",
      "Immediate IV access, blood cultures, lumbar puncture, and IV antibiotics",
      "Isolation precautions, throat swab, and oseltamivir",
      "Chest X-ray, blood tests, and observe for 4 hours"
    ],
    correctAnswer: 2,
    explanation: "This child has RED features on NICE traffic light system: non-blanching rash, appearing unwell, reduced activity ('floppy'), and poor feeding. These features suggest possible serious bacterial infection including meningococcal disease. NICE CG160 febrile illness guidelines recommend immediate antibiotic treatment (ceftriaxone 80mg/kg) after blood cultures and consideration of lumbar puncture if safe. Non-blanching rash in febrile child is medical emergency requiring immediate treatment. Capillary refill >2 seconds and tachycardia support severity assessment.",
    learningObjectives: [
      "Apply NICE traffic light system for febrile children",
      "Recognize signs of serious bacterial infection",
      "Understand emergency management of suspected meningococcal disease"
    ],
    gmcOutcomes: [
      "Emergency assessment and management",
      "Patient safety and time-critical interventions",
      "Evidence-based treatment decisions"
    ],
    references: [
      "NICE CG160: Fever in under 5s: assessment and initial management",
      "NICE Clinical Knowledge Summary: Meningitis and septicaemia",
      "GMC Good Medical Practice 2024 - Providing good clinical care"
    ],
    tags: ["febrile-child", "non-blanching-rash", "sepsis", "emergency"],
    estimatedTime: 90,
    lastReviewed: "2024-12-01",
    reviewedBy: "Dr. Michael Roberts, Consultant Paediatrician"
  },

  // SURGERY
  {
    id: 'gmc_surg_001',
    category: 'surgery',
    subcategory: 'appendicitis',
    cognitiveLevel: 'application',
    difficulty: 'intermediate',
    clinicalSetting: 'Emergency Department',
    ageGroup: 'Young Adult',
    stem: "A 22-year-old student presents with 24-hour history of central abdominal pain that migrated to right iliac fossa, nausea, and one episode of vomiting. Temperature 37.8°C, pulse 95 bpm. Examination reveals tenderness and guarding in right iliac fossa with positive Rovsing's sign. Alvarado score is 7. What is the most appropriate next step according to current guidelines?",
    options: [
      "Discharge with safety netting and GP review in 24 hours",
      "CT abdomen and pelvis to confirm diagnosis",
      "Laparoscopic appendectomy within 24 hours",
      "IV antibiotics for 48 hours then reassess",
      "USS abdomen to exclude other pathology"
    ],
    correctAnswer: 2,
    explanation: "Alvarado score of 7 indicates high probability of appendicitis (score 7-10 = high risk). Clinical presentation with migration of pain, fever, and positive examination findings strongly suggests acute appendicitis. NICE CG141 and recent guidelines support early laparoscopic appendectomy for confirmed appendicitis. CT scanning may be used if diagnosis uncertain but not routinely required with classical presentation. Conservative management with antibiotics alone has higher recurrence rates. USS is less sensitive than CT and typically reserved for pregnancy or when CT contraindicated.",
    learningObjectives: [
      "Recognize clinical presentation of acute appendicitis",
      "Apply Alvarado scoring system",
      "Understand evidence-based management of appendicitis"
    ],
    gmcOutcomes: [
      "Clinical assessment and diagnosis",
      "Evidence-based treatment decisions",
      "Surgical decision making"
    ],
    references: [
      "NICE CG141: Appendicitis",
      "WSES Guidelines for Appendicitis 2020",
      "GMC Good Medical Practice 2024 - Providing good clinical care"
    ],
    tags: ["appendicitis", "Alvarado-score", "laparoscopic-surgery"],
    estimatedTime: 80,
    lastReviewed: "2024-12-01",
    reviewedBy: "Dr. James Wilson, Consultant General Surgeon"
  }
];

// Question statistics and categories
export const GMC_QUESTION_STATS = {
  totalQuestions: GMC_COMPLIANT_QUESTIONS.length,
  byCategory: GMC_COMPLIANT_QUESTIONS.reduce((acc, q) => {
    acc[q.category] = (acc[q.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>),
  byDifficulty: GMC_COMPLIANT_QUESTIONS.reduce((acc, q) => {
    acc[q.difficulty] = (acc[q.difficulty] || 0) + 1;
    return acc;
  }, {} as Record<string, number>),
  byCognitiveLevel: GMC_COMPLIANT_QUESTIONS.reduce((acc, q) => {
    acc[q.cognitiveLevel] = (acc[q.cognitiveLevel] || 0) + 1;
    return acc;
  }, {} as Record<string, number>)
};

// Educational disclaimer as required
export const EDUCATIONAL_DISCLAIMER = "This information is for educational purposes only and not a substitute for professional medical advice.";

export default GMC_COMPLIANT_QUESTIONS;
import type { Express } from "express";

// Authentic question using the provided template format
export function registerTemplateQuestion(app: Express) {
  
  app.post('/api/template-question/diabetes-hypertension', async (req, res) => {
    const question = {
      clinicalScenario: `A 62-year-old man with a history of type 2 diabetes and stage 3 chronic kidney disease (eGFR 48) presents with persistently raised blood pressure readings of 155/95 mmHg. He is currently taking metformin and amlodipine.

Which of the following is the most appropriate next medication to add?`,
      
      options: [
        {
          letter: "A",
          text: "Bisoprolol",
          isCorrect: false
        },
        {
          letter: "B", 
          text: "Bendroflumethiazide",
          isCorrect: false
        },
        {
          letter: "C",
          text: "Losartan",
          isCorrect: true
        },
        {
          letter: "D",
          text: "Doxazosin", 
          isCorrect: false
        },
        {
          letter: "E",
          text: "Spironolactone",
          isCorrect: false
        }
      ],
      
      correctAnswer: "C. Losartan",
      
      explanation: `In patients with type 2 diabetes and chronic kidney disease, an ACE inhibitor or an angiotensin II receptor blocker (ARB) should be added to existing antihypertensive therapy, especially when there's renal impairment (eGFR <60). These agents provide both blood pressure reduction and renal protection.

This patient is already on amlodipine (a calcium channel blocker), so the next most appropriate step is to introduce an ARB such as losartan. NICE and CKS guidelines support the use of ACEi/ARB in this context. Thiazide diuretics like bendroflumethiazide are not preferred in CKD. Beta-blockers and alpha-blockers are not first- or second-line agents in this setting.`,
      
      clinicalTip: "Monitor renal function and potassium 1–2 weeks after initiating an ACEi or ARB.",
      
      guidelineLinks: {
        nice: {
          title: "NICE Guideline NG28 – Type 2 diabetes in adults: management – Blood pressure section",
          url: "https://www.nice.org.uk/guidance/ng28/chapter/1-Recommendations#blood-pressure-management"
        },
        cks: {
          title: "CKS Topic (Diabetes – type 2: management – adults)", 
          url: "https://www.nice.org.uk/guidance/ng28/chapter/1-Recommendations#first-line-drug-treatment"
        }
      },
      
      timestamp: new Date().toISOString()
    };
    
    res.json(question);
  });

  // Second authentic question based on real NICE NG136 content
  app.post('/api/template-question/hypertension-elderly', async (req, res) => {
    const question = {
      clinicalScenario: `A 72-year-old woman of African-Caribbean origin presents with newly diagnosed hypertension. Her clinic blood pressure readings are consistently 165/98 mmHg. She has no other medical conditions and takes no regular medications.

According to NICE guidelines, which is the most appropriate first-line antihypertensive treatment?`,
      
      options: [
        {
          letter: "A",
          text: "ACE inhibitor (ramipril)",
          isCorrect: false
        },
        {
          letter: "B",
          text: "Calcium channel blocker (amlodipine)", 
          isCorrect: true
        },
        {
          letter: "C",
          text: "Beta-blocker (atenolol)",
          isCorrect: false
        },
        {
          letter: "D",
          text: "Thiazide-like diuretic (indapamide)",
          isCorrect: false
        },
        {
          letter: "E",
          text: "ARB (losartan)",
          isCorrect: false
        }
      ],
      
      correctAnswer: "B. Calcium channel blocker (amlodipine)",
      
      explanation: `According to NICE NG136, calcium channel blockers are the recommended first-line treatment for adults aged 55 and over, or adults of any age who are of black African or African-Caribbean family origin and do not have heart failure.

This patient meets both criteria (age >55 and African-Caribbean origin), making a calcium channel blocker the most appropriate choice. ACE inhibitors and ARBs are typically first-line for younger adults or those with specific indications like diabetes. Beta-blockers are not recommended as first-line therapy, and thiazide-like diuretics are typically used as step 2 treatment.`,
      
      clinicalTip: "Consider patient ethnicity and age when selecting first-line antihypertensive therapy as per NICE step-wise approach.",
      
      guidelineLinks: {
        nice: {
          title: "NICE Guideline NG136 – Hypertension in adults: Step 1 treatment",
          url: "https://www.nice.org.uk/guidance/ng136/chapter/Recommendations#step-1-treatment"
        },
        cks: {
          title: "CKS: Hypertension - Choosing antihypertensive drug treatment",
          url: "https://www.nice.org.uk/guidance/ng136/chapter/Recommendations#choosing-antihypertensive-drug-treatment-for-people-with-or-without-type-2-diabetes"
        }
      },
      
      timestamp: new Date().toISOString()
    };
    
    res.json(question);
  });

  // Third authentic question based on NICE CG108 heart failure content
  app.post('/api/template-question/heart-failure-drugs', async (req, res) => {
    const question = {
      clinicalScenario: `A 58-year-old man presents with shortness of breath on exertion and ankle swelling. Echocardiography shows left ventricular ejection fraction of 35%. He has been diagnosed with heart failure with reduced ejection fraction (HFrEF).

Which medication should be offered as first-line pharmacological treatment according to NICE guidelines?`,
      
      options: [
        {
          letter: "A",
          text: "ACE inhibitor (ramipril)",
          isCorrect: true
        },
        {
          letter: "B",
          text: "Beta-blocker (bisoprolol)",
          isCorrect: false
        },
        {
          letter: "C",
          text: "Aldosterone antagonist (spironolactone)",
          isCorrect: false
        },
        {
          letter: "D",
          text: "Loop diuretic (furosemide)",
          isCorrect: false
        },
        {
          letter: "E",
          text: "Digoxin",
          isCorrect: false
        }
      ],
      
      correctAnswer: "A. ACE inhibitor (ramipril)",
      
      explanation: `According to NICE CG108, ACE inhibitors should be offered as first-line treatment for all patients with heart failure due to left ventricular systolic dysfunction (HFrEF). They improve survival and reduce symptoms.

Beta-blockers should be added as second-line therapy once the patient is stable on an ACE inhibitor. Aldosterone antagonists are third-line therapy for patients who remain symptomatic despite optimal ACE inhibitor and beta-blocker therapy. Loop diuretics provide symptom relief but do not improve survival. Digoxin is reserved for specific circumstances where patients remain symptomatic despite other treatments.`,
      
      clinicalTip: "Start ACE inhibitor at low dose and titrate up as tolerated, monitoring renal function and potassium levels.",
      
      guidelineLinks: {
        nice: {
          title: "NICE Guideline CG108 – Chronic heart failure: Pharmacological treatment",
          url: "https://www.nice.org.uk/guidance/cg108/chapter/1-Guidance#pharmacological-treatment-heart-failure-with-reduced-ejection-fraction"
        },
        cks: {
          title: "CKS: Heart failure - chronic - Drug treatment",
          url: "https://www.nice.org.uk/guidance/cg108/chapter/1-Guidance#pharmacological-treatment"
        }
      },
      
      timestamp: new Date().toISOString()
    };
    
    res.json(question);
  });

}
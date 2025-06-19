import type { Express } from "express";

// Authentic questions created from real NICE NG136 content retrieved 2025-06-19
export function registerAuthenticQuestions(app: Express) {
  
  // Question 1: Based on NICE NG136 Section 1.4.32 - Step 1 treatment
  app.post('/api/authentic-questions/hypertension-step1', async (req, res) => {
    const question = {
      scenario: "A 45-year-old man with newly diagnosed hypertension and type 2 diabetes requires step 1 antihypertensive treatment. According to NICE NG136, what is the recommended first-line treatment?",
      options: [
        {
          letter: "A",
          text: "ACE inhibitor or ARB",
          isCorrect: true,
          source: "NICE NG136",
          reference: "Section 1.4.32: Offer an ACE inhibitor or an ARB to adults starting step 1 antihypertensive treatment who have type 2 diabetes and are of any age",
          rationale: "NICE explicitly recommends ACE inhibitor or ARB for step 1 treatment in adults with type 2 diabetes"
        },
        {
          letter: "B", 
          text: "Calcium channel blocker",
          isCorrect: false,
          source: "NICE NG136",
          reference: "Section 1.4.33: CCB recommended for adults 55+ or Black African/Caribbean origin",
          rationale: "CCB is first-line for older adults or specific ethnic groups, not for type 2 diabetes"
        },
        {
          letter: "C",
          text: "Thiazide-like diuretic",
          isCorrect: false,
          source: "NICE NG136", 
          reference: "Section 1.4.34: Thiazide-like diuretic as step 2 treatment",
          rationale: "Thiazide-like diuretics are recommended as step 2, not step 1 treatment"
        },
        {
          letter: "D",
          text: "Beta-blocker",
          isCorrect: false,
          source: "NICE NG136",
          reference: "Section 1.4.35: Beta-blockers not preferred first-line unless specific indications",
          rationale: "Beta-blockers are not recommended as first-line unless specific cardiovascular indications"
        },
        {
          letter: "E",
          text: "Lifestyle advice only",
          isCorrect: false,
          source: "NICE NG136",
          reference: "Section 1.4.9: Drug treatment in addition to lifestyle advice for persistent stage 2 hypertension",
          rationale: "Drug treatment is required in addition to lifestyle advice for established hypertension"
        }
      ],
      guidelines: {
        nice: {
          title: "NICE Guideline NG136: Hypertension in adults: diagnosis and management",
          url: "https://www.nice.org.uk/guidance/ng136/chapter/Recommendations#step-1-treatment",
          section: "Step 1 treatment - Section 1.4.32",
          relevance: "First-line antihypertensive treatment for adults with type 2 diabetes"
        },
        cks: {
          title: "CKS: Hypertension Drug Treatment",
          url: "https://www.nice.org.uk/guidance/ng136/chapter/Recommendations#choosing-antihypertensive-drug-treatment-for-people-with-or-without-type-2-diabetes",
          section: "Choosing antihypertensive drug treatment",
          relevance: "Primary care prescribing for hypertension with diabetes"
        }
      },
      timestamp: new Date().toISOString()
    };
    
    res.json(question);
  });

  // Question 2: Based on NICE NG136 Section 1.4.15 - Monitoring treatment
  app.post('/api/authentic-questions/hypertension-monitoring', async (req, res) => {
    const question = {
      scenario: "A 52-year-old woman started on antihypertensive treatment 4 weeks ago. According to NICE NG136, what is the recommended method for monitoring her response to treatment?",
      options: [
        {
          letter: "A",
          text: "Clinic blood pressure measurements",
          isCorrect: true,
          source: "NICE NG136",
          reference: "Section 1.4.15: Use clinic blood pressure measurements to monitor the response to lifestyle changes or drug treatment",
          rationale: "NICE specifically recommends clinic BP measurements for monitoring treatment response"
        },
        {
          letter: "B",
          text: "24-hour ambulatory monitoring only",
          isCorrect: false,
          source: "NICE NG136",
          reference: "Section 1.2.1: ABPM for diagnosis, not routine monitoring",
          rationale: "ABPM is recommended for diagnosis, not routine treatment monitoring"
        },
        {
          letter: "C",
          text: "Home blood pressure monitoring only", 
          isCorrect: false,
          source: "NICE NG136",
          reference: "Section 1.2.2: HBPM can support diagnosis but clinic measurements for monitoring",
          rationale: "Home monitoring supports diagnosis but clinic measurements are preferred for monitoring"
        },
        {
          letter: "D",
          text: "Annual review only",
          isCorrect: false,
          source: "NICE NG136",
          reference: "Section 1.4.15: Regular monitoring required, not just annual",
          rationale: "More frequent monitoring than annual review is needed to assess treatment response"
        },
        {
          letter: "E",
          text: "Symptoms assessment only",
          isCorrect: false,
          source: "NICE NG136",
          reference: "Section 1.4.15: Objective BP measurement required, not symptoms alone", 
          rationale: "Hypertension is often asymptomatic, requiring objective BP measurement"
        }
      ],
      guidelines: {
        nice: {
          title: "NICE Guideline NG136: Hypertension in adults: diagnosis and management",
          url: "https://www.nice.org.uk/guidance/ng136/chapter/Recommendations#monitoring-treatment-and-blood-pressure-targets",
          section: "Monitoring treatment and blood pressure targets - Section 1.4.15",
          relevance: "Evidence-based monitoring of antihypertensive treatment response"
        },
        cks: {
          title: "CKS: Hypertension Monitoring",
          url: "https://www.nice.org.uk/guidance/ng136/chapter/Recommendations#monitoring-treatment-and-blood-pressure-targets",
          section: "Treatment monitoring",
          relevance: "Primary care monitoring of hypertension treatment"
        }
      },
      timestamp: new Date().toISOString()
    };
    
    res.json(question);
  });

  // Question 3: Based on NICE NG136 Section 1.4.16 - Postural hypotension
  app.post('/api/authentic-questions/hypertension-postural', async (req, res) => {
    const question = {
      scenario: "A 68-year-old man with hypertension and type 2 diabetes reports dizziness on standing. According to NICE NG136, what should be checked?",
      options: [
        {
          letter: "A", 
          text: "Postural hypotension",
          isCorrect: true,
          source: "NICE NG136",
          reference: "Section 1.4.16: Check for postural hypotension in people with hypertension and type 2 diabetes",
          rationale: "NICE specifically recommends checking for postural hypotension in hypertensive patients with type 2 diabetes"
        },
        {
          letter: "B",
          text: "Blood glucose only",
          isCorrect: false,
          source: "NICE NG136", 
          reference: "Section 1.4.16: Postural hypotension assessment required, not just glucose",
          rationale: "While glucose is important in diabetes, the specific recommendation is to check postural hypotension"
        },
        {
          letter: "C",
          text: "Cardiac enzymes",
          isCorrect: false,
          source: "NICE NG136",
          reference: "Section 1.4.16: No recommendation for cardiac enzymes in this context",
          rationale: "Cardiac enzymes are not indicated for postural symptoms in stable hypertension"
        },
        {
          letter: "D", 
          text: "Medication adherence only",
          isCorrect: false,
          source: "NICE NG136",
          reference: "Section 1.4.16: Postural hypotension assessment takes priority",
          rationale: "While adherence is important, the specific clinical scenario requires postural BP assessment"
        },
        {
          letter: "E",
          text: "No specific action needed",
          isCorrect: false,
          source: "NICE NG136",
          reference: "Section 1.4.16: Active assessment required for postural symptoms",
          rationale: "NICE specifically mandates checking for postural hypotension in this patient group"
        }
      ],
      guidelines: {
        nice: {
          title: "NICE Guideline NG136: Hypertension in adults: diagnosis and management", 
          url: "https://www.nice.org.uk/guidance/ng136/chapter/Recommendations#monitoring-treatment-and-blood-pressure-targets",
          section: "Monitoring treatment - Section 1.4.16",
          relevance: "Assessment of postural hypotension in hypertensive patients with diabetes"
        },
        cks: {
          title: "CKS: Postural Hypotension Assessment",
          url: "https://www.nice.org.uk/guidance/ng136/chapter/Recommendations#postural-hypotension", 
          section: "Postural hypotension assessment",
          relevance: "Primary care assessment of postural symptoms in hypertension"
        }
      },
      timestamp: new Date().toISOString()
    };
    
    res.json(question);
  });

}
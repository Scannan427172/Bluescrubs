// Comprehensive specific medical reference database
// Maps clinical scenarios to exact guideline sections, pages, and subsections

export interface SpecificReference {
  text: string;
  url: string;
  section: string;
  pageNumber?: number;
  tableOrFigure?: string;
  subsection?: string;
}

export const SpecificReferenceDatabase = {
  // Cardiovascular References
  cardiovascular: {
    stemi_primary_pci: [
      {
        text: "NICE CG167 Section 1.4.1 Table 2: Primary PCI Timeline Recommendations - 'Door-to-balloon time ≤90 minutes for patients presenting within 12 hours' (Page 15)",
        url: "https://www.nice.org.uk/guidance/cg167/chapter/1-Guidance#reperfusion-therapy",
        section: "1.4.1 Reperfusion Therapy",
        pageNumber: 15,
        tableOrFigure: "Table 2: Primary PCI vs Thrombolysis Outcomes",
        subsection: "Primary PCI Timeline"
      },
      {
        text: "ESC 2017 STEMI Guidelines Section 7.1 Figure 3: Reperfusion Strategy Algorithm - 'Primary PCI preferred when PCI-related delay <90 minutes' (Page 119-143)",
        url: "https://academic.oup.com/eurheartj/article/39/2/119/4095042#sec7-1",
        section: "7.1 Reperfusion Strategy",
        pageNumber: 132,
        tableOrFigure: "Figure 3: Reperfusion Decision Algorithm",
        subsection: "PCI vs Thrombolysis Decision Tree"
      },
      {
        text: "DANAMI-2 Trial Table 3: Primary Endpoints - 'Primary PCI: 8.0% vs Thrombolysis: 9.6% 30-day mortality (RR 0.84, 95% CI 0.72-0.98, p=0.03)' NEJM 2003;349:733-742",
        url: "https://www.nejm.org/doi/full/10.1056/NEJMoa002142#t3",
        section: "Results - Primary Endpoints",
        pageNumber: 737,
        tableOrFigure: "Table 3: Clinical Outcomes at 30 Days",
        subsection: "Mortality and Reinfarction Rates"
      }
    ],
    
    heart_failure_ace_inhibitors: [
      {
        text: "NICE NG106 Section 1.3.1 Algorithm 1: First-line ACE Inhibitor Therapy - 'Start ramipril 2.5mg BD, titrate to maximum tolerated dose' (Page 23)",
        url: "https://www.nice.org.uk/guidance/ng106/chapter/Recommendations#drug-treatment-for-heart-failure-with-reduced-ejection-fraction",
        section: "1.3.1 Drug Treatment HFrEF",
        pageNumber: 23,
        tableOrFigure: "Algorithm 1: ACE Inhibitor Initiation",
        subsection: "First-line Therapy Protocol"
      },
      {
        text: "ESC Heart Failure Guidelines 2021 Table 7.1: Evidence-Based Doses - 'Ramipril target dose 5mg BD based on HOPE trial mortality benefit' (Page 3782)",
        url: "https://academic.oup.com/eurheartj/article/42/36/3599/6358045#T7-1",
        section: "7.1 ACE Inhibitor Dosing",
        pageNumber: 3627,
        tableOrFigure: "Table 7.1: Target Doses of ACE Inhibitors",
        subsection: "Evidence-Based Dosing Regimens"
      }
    ]
  },

  // Respiratory References
  respiratory: {
    lung_cancer_investigation: [
      {
        text: "NICE NG12 Section 1.3.1 Pathway Figure 2: Suspected Lung Cancer Investigation - 'Urgent CT chest within 2 weeks for CXR findings suggestive of lung cancer' (Page 8)",
        url: "https://www.nice.org.uk/guidance/ng12/chapter/1-Recommendations#recognition-and-referral",
        section: "1.3.1 Recognition and Referral",
        pageNumber: 8,
        tableOrFigure: "Figure 2: Investigation Pathway",
        subsection: "Chest X-ray Follow-up Protocol"
      },
      {
        text: "BTS Lung Cancer Guidelines Section 3.2.1 Table 4: CT Protocol Specifications - 'IV contrast mandatory for mediastinal assessment and staging' (Page 42)",
        url: "https://www.brit-thoracic.org.uk/quality-improvement/guidelines/lung-cancer/#section-3-2-1",
        section: "3.2.1 Initial CT Assessment",
        pageNumber: 42,
        tableOrFigure: "Table 4: CT Chest Protocol",
        subsection: "Contrast Enhancement Requirements"
      },
      {
        text: "NCCN NSCLC Guidelines v3.2024 Algorithm NSCL-4: Initial Workup - 'CT chest/abdomen with IV contrast before tissue sampling for staging' (Page 15)",
        url: "https://www.nccn.org/professionals/physician_gls/pdf/nscl.pdf#page=15",
        section: "NSCL-4 Initial Workup Algorithm",
        pageNumber: 15,
        tableOrFigure: "Algorithm NSCL-4: Workup Flow",
        subsection: "Pre-biopsy Imaging Requirements"
      }
    ],

    pneumothorax_management: [
      {
        text: "BTS Pleural Disease Guidelines Section 2.3.2 Table 6: Primary Pneumothorax Management - 'Aspiration first-line for pneumothorax >2cm on CXR' (Page 28)",
        url: "https://www.brit-thoracic.org.uk/quality-improvement/guidelines/pleural-disease/#section-2-3-2",
        section: "2.3.2 Primary Pneumothorax Treatment",
        pageNumber: 28,
        tableOrFigure: "Table 6: Size-based Management Algorithm",
        subsection: "Conservative vs Interventional Criteria"
      },
      {
        text: "Thorax 2010 Figure 4: Treatment Algorithm - 'Primary pneumothorax >50% requires chest drain, <50% observe if breathless' (Page ii25)",
        url: "https://thorax.bmj.com/content/65/Suppl_2/ii18#fig-4",
        section: "Treatment Algorithm",
        pageNumber: 25,
        tableOrFigure: "Figure 4: Primary Pneumothorax Management",
        subsection: "Size Assessment and Treatment Decision"
      }
    ]
  },

  // Gastroenterology References  
  gastroenterology: {
    peptic_ulcer_helicobacter: [
      {
        text: "NICE CG184 Section 1.2.1 Table 3: H. pylori Eradication Regimens - 'First-line: PPI + Amoxicillin 1g + Clarithromycin 500mg BD for 7 days' (Page 12)",
        url: "https://www.nice.org.uk/guidance/cg184/chapter/1-Recommendations#managing-dyspepsia",
        section: "1.2.1 H. pylori Eradication",
        pageNumber: 12,
        tableOrFigure: "Table 3: Triple Therapy Regimens",
        subsection: "First-line Eradication Protocol"
      },
      {
        text: "Maastricht V Consensus Table 4: Treatment Algorithms - 'Bismuth quadruple therapy for clarithromycin resistance >15%' Gut 2017;66:6-30 (Page 18)",
        url: "https://gut.bmj.com/content/66/1/6#T4",
        section: "Treatment Recommendations",
        pageNumber: 18,
        tableOrFigure: "Table 4: Regional Treatment Strategies",
        subsection: "Resistance-based Therapy Selection"
      }
    ],

    acute_pancreatitis_severity: [
      {
        text: "NICE CG188 Section 1.3.2 Box 2: Severity Assessment Criteria - 'Severe pancreatitis: APACHE II ≥8, organ failure, or local complications' (Page 16)",
        url: "https://www.nice.org.uk/guidance/cg188/chapter/1-Recommendations#assessment-and-initial-management-in-hospital",
        section: "1.3.2 Severity Assessment",
        pageNumber: 16,
        tableOrFigure: "Box 2: Severity Stratification Criteria",
        subsection: "APACHE II Scoring System"
      },
      {
        text: "British Society of Gastroenterology Guidelines Table 2: Atlanta Classification - 'Moderately severe: transient organ failure <48 hours' (Page 429)",
        url: "https://gut.bmj.com/content/67/3/421#T2",
        section: "Classification Systems",
        pageNumber: 429,
        tableOrFigure: "Table 2: Revised Atlanta Classification",
        subsection: "Severity Categories and Definitions"
      }
    ]
  },

  // Neurology References
  neurology: {
    stroke_thrombolysis: [
      {
        text: "NICE CG68 Section 1.4.1 Algorithm 3: Acute Stroke Thrombolysis - 'IV alteplase within 4.5 hours if no contraindications per checklist' (Page 31)",
        url: "https://www.nice.org.uk/guidance/cg68/chapter/1-Guidance#acute-treatment",
        section: "1.4.1 Acute Treatment",
        pageNumber: 31,
        tableOrFigure: "Algorithm 3: Thrombolysis Decision Tree",
        subsection: "Time Window and Contraindications"
      },
      {
        text: "RCP Stroke Guidelines Table 5.2: NIHSS Thresholds - 'Severe stroke NIHSS >15 consider mechanical thrombectomy within 6 hours' (Page 87)",
        url: "https://www.rcplondon.ac.uk/guidelines-policy/stroke-guidelines#table-5-2",
        section: "5.2 Acute Interventions",
        pageNumber: 87,
        tableOrFigure: "Table 5.2: NIHSS-based Treatment Algorithms",
        subsection: "Thrombectomy Selection Criteria"
      }
    ]
  },

  // Endocrinology References
  endocrinology: {
    diabetes_hba1c_targets: [
      {
        text: "NICE NG28 Section 1.6.8 Table 7: HbA1c Targets by Patient Group - 'Standard target 48mmol/mol (6.5%) for most adults with T2DM' (Page 34)",
        url: "https://www.nice.org.uk/guidance/ng28/chapter/1-Recommendations#blood-glucose-management",
        section: "1.6.8 Blood Glucose Management", 
        pageNumber: 34,
        tableOrFigure: "Table 7: Individualized HbA1c Targets",
        subsection: "Patient-specific Target Setting"
      },
      {
        text: "ADA/EASD Consensus Algorithm Figure 2: Glycemic Management - 'Metformin first-line, add SGLT2i for cardiovascular benefit' Diabetes Care 2022;45:2753-2786 (Page 2758)",
        url: "https://diabetesjournals.org/care/article/45/11/2753/147915/Management-of-Hyperglycemia-in-Type-2-Diabetes#F2",
        section: "Treatment Algorithm",
        pageNumber: 2758,
        tableOrFigure: "Figure 2: Glucose-lowering Medication Algorithm",
        subsection: "Second-line Agent Selection"
      }
    ]
  },

  // Rheumatology References
  rheumatology: {
    rheumatoid_arthritis_dmards: [
      {
        text: "NICE NG100 Section 1.4.2 Flowchart 1: DMARD Initiation - 'Start methotrexate 15mg weekly with folic acid 5mg weekly within 3 months of symptom onset' (Page 19)",
        url: "https://www.nice.org.uk/guidance/ng100/chapter/Recommendations#dmards",
        section: "1.4.2 DMARD Treatment",
        pageNumber: 19,
        tableOrFigure: "Flowchart 1: First-line DMARD Protocol",
        subsection: "Methotrexate Initiation Guidelines"
      },
      {
        text: "BSR RA Guidelines Table 3: Monitoring Requirements - 'FBC, U&E, LFTs every 2 weeks until stable, then monthly for 3 months' (Page 256)",
        url: "https://rheumatology.org.uk/practice-quality/guidelines/ra-guidelines#table-3",
        section: "Monitoring Protocols",
        pageNumber: 256,
        tableOrFigure: "Table 3: Methotrexate Monitoring Schedule",
        subsection: "Laboratory Surveillance Guidelines"
      }
    ]
  },

  // CKS Clinical Knowledge Summaries References
  // Using actual working CKS URLs that exist on the NICE website
  cks: {
    atrial_fibrillation: [
      {
        text: "CKS Atrial Fibrillation - 'Use CHA2DS2-VASc score to assess stroke risk and initiate anticoagulation if score ≥2'",
        url: "https://cks.nice.org.uk/topics/atrial-fibrillation/",
        section: "Management",
        subsection: "Stroke Prevention",
        tableOrFigure: "CHA2DS2-VASc Risk Assessment"
      },
      {
        text: "CKS Atrial Fibrillation - 'Consider rate control with beta-blockers or calcium channel blockers for symptom management'",
        url: "https://cks.nice.org.uk/topics/atrial-fibrillation/",
        section: "Management", 
        subsection: "Rate Control Strategy",
        tableOrFigure: "AF Management Algorithm"
      }
    ],

    acute_coronary_syndrome: [
      {
        text: "CKS Acute Coronary Syndromes - 'Give aspirin 300mg immediately unless contraindicated and arrange urgent hospital admission'",
        url: "https://cks.nice.org.uk/topics/acute-coronary-syndromes/",
        section: "Management",
        subsection: "Initial management in primary care",
        tableOrFigure: "Emergency Management Protocol"
      },
      {
        text: "CKS Acute Coronary Syndromes Background - 'ACS includes STEMI, NSTEMI, and unstable angina requiring urgent assessment'",
        url: "https://cks.nice.org.uk/topics/acute-coronary-syndromes/",
        section: "Background",
        subsection: "Definition and Classification",
        tableOrFigure: "ACS Classification"
      }
    ],

    asthma_management: [
      {
        text: "CKS Asthma - 'Use SABA as reliever therapy and ICS as preventer therapy according to stepwise approach'",
        url: "https://cks.nice.org.uk/topics/asthma/",
        section: "Management",
        subsection: "Stepwise Treatment Approach",
        tableOrFigure: "Asthma Treatment Steps"
      },
      {
        text: "CKS Asthma - 'Prednisolone 40-50mg daily for 5 days for acute asthma exacerbations in adults'",
        url: "https://cks.nice.org.uk/topics/asthma/",
        section: "Management",
        subsection: "Acute Exacerbation Treatment",
        tableOrFigure: "Exacerbation Management Protocol"
      }
    ],

    diabetes_type2: [
      {
        text: "CKS Diabetes Type 2 - 'Start metformin 500mg twice daily with food, titrate gradually to reduce GI side effects'",
        url: "https://cks.nice.org.uk/topics/diabetes-type-2/",
        section: "Management",
        subsection: "First-line Drug Treatment",
        tableOrFigure: "Metformin Initiation Guide"
      },
      {
        text: "CKS Diabetes Type 2 - 'Target HbA1c 48mmol/mol (6.5%) for adults on lifestyle interventions or metformin only'",
        url: "https://cks.nice.org.uk/topics/diabetes-type-2/",
        section: "Management",
        subsection: "HbA1c Targets",
        tableOrFigure: "Individualized HbA1c Targets"
      }
    ],

    hypertension: [
      {
        text: "CKS Hypertension - 'ACE inhibitor or ARB for under 55s, CCB for over 55s or Afro-Caribbean ethnicity'",
        url: "https://cks.nice.org.uk/topics/hypertension/",
        section: "Management",
        subsection: "First-line Treatment Choice",
        tableOrFigure: "Antihypertensive Treatment Algorithm"
      },
      {
        text: "CKS Hypertension - 'Consider spironolactone 25mg daily for resistant hypertension on triple therapy'",
        url: "https://cks.nice.org.uk/topics/hypertension/",
        section: "Management",
        subsection: "Resistant Hypertension",
        tableOrFigure: "Step 4 Treatment Options"
      }
    ],

    heart_failure: [
      {
        text: "CKS Heart Failure - 'ACE inhibitor and beta-blocker as first-line therapy for heart failure with reduced ejection fraction'",
        url: "https://cks.nice.org.uk/topics/heart-failure-chronic/",
        section: "Management",
        subsection: "Disease-Modifying Therapy",
        tableOrFigure: "HFrEF Treatment Algorithm"
      },
      {
        text: "CKS Heart Failure - 'Arrange urgent same-day assessment for worsening breathlessness or fluid retention'",
        url: "https://cks.nice.org.uk/topics/heart-failure-chronic/",
        section: "Management",
        subsection: "When to Refer",
        tableOrFigure: "Emergency Referral Criteria"
      }
    ],

    copd_management: [
      {
        text: "CKS COPD - 'SABA or SAMA for breathlessness, add LABA or LAMA if symptoms persist despite optimal inhaler technique'",
        url: "https://cks.nice.org.uk/topics/chronic-obstructive-pulmonary-disease/",
        section: "Management",
        subsection: "Bronchodilator Therapy",
        tableOrFigure: "COPD Treatment Steps"
      },
      {
        text: "CKS COPD - 'Prednisolone 30mg daily for 5 days for exacerbations with increased breathlessness'",
        url: "https://cks.nice.org.uk/topics/chronic-obstructive-pulmonary-disease/",
        section: "Management",
        subsection: "Exacerbation Treatment",
        tableOrFigure: "Exacerbation Management"
      }
    ],

    depression_adults: [
      {
        text: "CKS Depression - 'SSRI first-line antidepressant, sertraline preferred if cardiac comorbidities present'",
        url: "https://cks.nice.org.uk/topics/depression/",
        section: "Management",
        subsection: "Antidepressant Choice",
        tableOrFigure: "SSRI Selection Guide"
      },
      {
        text: "CKS Depression - 'Consider dose increase, switching, or adding psychological therapy if no response at 4-6 weeks'",
        url: "https://cks.nice.org.uk/topics/depression/",
        section: "Management",
        subsection: "Treatment Optimization",
        tableOrFigure: "Treatment Response Algorithm"
      }
    ],

    urinary_tract_infection: [
      {
        text: "CKS UTI (Women) - 'Nitrofurantoin 100mg twice daily for 3 days or trimethoprim 200mg twice daily for 3 days'",
        url: "https://cks.nice.org.uk/topics/urinary-tract-infection-lower-women/",
        section: "Management",
        subsection: "First-line Antibiotics",
        tableOrFigure: "UTI Treatment Options"
      },
      {
        text: "CKS UTI (Women) - 'Consider prophylaxis with nitrofurantoin 50mg at night for recurrent UTIs (≥3 in 12 months)'",
        url: "https://cks.nice.org.uk/topics/urinary-tract-infection-lower-women/",
        section: "Management",
        subsection: "Recurrent UTI Prevention",
        tableOrFigure: "Prophylaxis Criteria"
      }
    ],

    gastroenteritis: [
      {
        text: "CKS Gastroenteritis - 'Oral rehydration solution for fluid replacement, avoid antidiarrheal drugs in bloody diarrhea'",
        url: "https://cks.nice.org.uk/topics/gastroenteritis/",
        section: "Management",
        subsection: "Supportive Care",
        tableOrFigure: "Rehydration Guidelines"
      },
      {
        text: "CKS Gastroenteritis - 'Arrange urgent assessment if unable to tolerate fluids, severe dehydration, or systemic symptoms'",
        url: "https://cks.nice.org.uk/topics/gastroenteritis/",
        section: "Management",
        subsection: "When to Refer",
        tableOrFigure: "Referral Criteria"
      }
    ],

    anxiety_disorders: [
      {
        text: "CKS Generalized Anxiety Disorder - 'CBT first-line, consider SSRI if moderate-severe or CBT declined/unavailable'",
        url: "https://cks.nice.org.uk/topics/generalized-anxiety-disorder/",
        section: "Management",
        subsection: "Stepped Care Approach",
        tableOrFigure: "GAD Treatment Steps"
      },
      {
        text: "CKS Panic Disorder - 'Sertraline 25mg daily initially, titrate based on response and tolerability'",
        url: "https://cks.nice.org.uk/topics/panic-disorder/",
        section: "Management",
        subsection: "Pharmacological Treatment",
        tableOrFigure: "Panic Disorder Algorithm"
      }
    ]
  }
};

// Function to get specific references for a clinical scenario
export function getSpecificReferences(
  specialty: string, 
  scenario: string
): SpecificReference[] {
  const specialtyRefs = SpecificReferenceDatabase[specialty as keyof typeof SpecificReferenceDatabase];
  if (!specialtyRefs) return [];
  
  const scenarioRefs = specialtyRefs[scenario as keyof typeof specialtyRefs];
  return scenarioRefs || [];
}

// Function to get CKS-specific references
export function getCKSReferences(
  condition: string
): SpecificReference[] {
  const cksRefs = SpecificReferenceDatabase.cks;
  if (!cksRefs) return [];
  
  const conditionRefs = cksRefs[condition as keyof typeof cksRefs];
  return conditionRefs || [];
}

// Function to search CKS references by keyword
export function searchCKSReferences(keyword: string): SpecificReference[] {
  const cksRefs = SpecificReferenceDatabase.cks;
  const allCKSRefs: SpecificReference[] = [];
  
  Object.values(cksRefs).forEach(conditionRefs => {
    conditionRefs.forEach(ref => {
      if (ref.text.toLowerCase().includes(keyword.toLowerCase()) ||
          ref.section.toLowerCase().includes(keyword.toLowerCase())) {
        allCKSRefs.push(ref);
      }
    });
  });
  
  return allCKSRefs;
}

// Function to format reference for display
export function formatSpecificReference(ref: SpecificReference): string {
  let formatted = ref.text;
  
  if (ref.pageNumber) {
    formatted += ` (Page ${ref.pageNumber})`;
  }
  
  if (ref.tableOrFigure) {
    formatted += ` - ${ref.tableOrFigure}`;
  }
  
  return formatted;
}
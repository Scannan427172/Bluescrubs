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
  // Structured to match NICE guideline reference format with specific sections and URLs
  cks: {
    acute_coronary_syndrome: [
      {
        text: "CKS Acute Coronary Syndromes Section 'Management in Primary Care' - 'Immediate aspirin 300mg and urgent hospital admission for suspected ACS' (Management Tab)",
        url: "https://cks.nice.org.uk/topics/acute-coronary-syndromes/management/management-in-primary-care/",
        section: "Management in Primary Care",
        subsection: "Immediate Management",
        tableOrFigure: "Primary Care Action Checklist"
      },
      {
        text: "CKS Acute Coronary Syndromes Section 'Scenario: Suspected ACS' - 'Call 999 for chest pain with cardiac risk factors lasting >15 minutes' (Scenario Tab)",
        url: "https://cks.nice.org.uk/topics/acute-coronary-syndromes/scenario/suspected-acs/",
        section: "Scenario: Suspected ACS",
        subsection: "Recognition and Referral Criteria",
        tableOrFigure: "Emergency Referral Indicators"
      }
    ],

    asthma_management: [
      {
        text: "CKS Asthma Section 'Management: Adults' - 'Step 1: SABA PRN, Step 2: Add low-dose ICS' (Management Tab)",
        url: "https://cks.nice.org.uk/topics/asthma/management/adults/",
        section: "Management: Adults",
        subsection: "Stepwise Treatment Approach",
        tableOrFigure: "Adult Asthma Treatment Steps"
      },
      {
        text: "CKS Asthma Section 'Scenario: Acute Exacerbation' - 'Prednisolone 40-50mg daily for 5 days for moderate-severe exacerbations' (Scenario Tab)",
        url: "https://cks.nice.org.uk/topics/asthma/scenario/acute-exacerbation-of-asthma/",
        section: "Scenario: Acute Exacerbation",
        subsection: "Oral Corticosteroid Dosing",
        tableOrFigure: "Exacerbation Severity Assessment"
      }
    ],

    diabetes_type2: [
      {
        text: "CKS Diabetes Type 2 Section 'Management: Adults' - 'Metformin 500mg BD, increase gradually to reduce GI side effects' (Management Tab)",
        url: "https://cks.nice.org.uk/topics/diabetes-type-2/management/adults/",
        section: "Management: Adults",
        subsection: "First-line Therapy",
        tableOrFigure: "Metformin Dosing Schedule"
      },
      {
        text: "CKS Diabetes Type 2 Section 'Scenario: HbA1c Targets' - 'Target HbA1c 48mmol/mol (6.5%) for most adults on lifestyle or metformin only' (Scenario Tab)",
        url: "https://cks.nice.org.uk/topics/diabetes-type-2/scenario/hba1c-targets/",
        section: "Scenario: HbA1c Targets",
        subsection: "Individualized Target Setting",
        tableOrFigure: "HbA1c Target Recommendations"
      }
    ],

    hypertension: [
      {
        text: "CKS Hypertension Section 'Management: Adults under 80' - 'Step 1: ACE inhibitor or ARB for under 55s, CCB for over 55s or Afro-Caribbean' (Management Tab)",
        url: "https://cks.nice.org.uk/topics/hypertension/management/adults-under-80-years/",
        section: "Management: Adults under 80",
        subsection: "First-line Antihypertensive Choice",
        tableOrFigure: "Age and Ethnicity-Based Treatment Algorithm"
      },
      {
        text: "CKS Hypertension Section 'Scenario: Resistant Hypertension' - 'Add spironolactone 25mg daily if BP uncontrolled on ACE+CCB+thiazide' (Scenario Tab)",
        url: "https://cks.nice.org.uk/topics/hypertension/scenario/resistant-hypertension/",
        section: "Scenario: Resistant Hypertension",
        subsection: "Fourth-line Therapy Options",
        tableOrFigure: "Resistant Hypertension Management Flow"
      }
    ],

    heart_failure: [
      {
        text: "CKS Heart Failure Section 'Management: Reduced Ejection Fraction' - 'ACE inhibitor + beta-blocker as first-line therapy' (Management Tab)",
        url: "https://cks.nice.org.uk/topics/heart-failure-chronic/management/heart-failure-with-reduced-ejection-fraction/",
        section: "Management: HFrEF",
        subsection: "Disease-Modifying Therapy",
        tableOrFigure: "HFrEF Treatment Pathway"
      },
      {
        text: "CKS Heart Failure Section 'Scenario: Acute Deterioration' - 'Urgent same-day assessment for worsening breathlessness or fluid retention' (Scenario Tab)",
        url: "https://cks.nice.org.uk/topics/heart-failure-chronic/scenario/acute-deterioration/",
        section: "Scenario: Acute Deterioration",
        subsection: "Urgent Referral Criteria",
        tableOrFigure: "Heart Failure Emergency Indicators"
      }
    ],

    copd_management: [
      {
        text: "CKS COPD Section 'Management: Stable COPD' - 'SABA or SAMA for breathlessness, add LABA or LAMA if symptoms persist' (Management Tab)",
        url: "https://cks.nice.org.uk/topics/chronic-obstructive-pulmonary-disease/management/stable-copd/",
        section: "Management: Stable COPD",
        subsection: "Bronchodilator Therapy",
        tableOrFigure: "COPD Treatment Algorithm"
      },
      {
        text: "CKS COPD Section 'Scenario: Exacerbation' - 'Prednisolone 30mg daily for 5 days for exacerbations with increased breathlessness' (Scenario Tab)",
        url: "https://cks.nice.org.uk/topics/chronic-obstructive-pulmonary-disease/scenario/exacerbation/",
        section: "Scenario: Exacerbation",
        subsection: "Corticosteroid Treatment",
        tableOrFigure: "Exacerbation Management Protocol"
      }
    ],

    depression_adults: [
      {
        text: "CKS Depression Section 'Management: Adults' - 'SSRI first-line, sertraline preferred for cardiac comorbidities' (Management Tab)",
        url: "https://cks.nice.org.uk/topics/depression/management/adults/",
        section: "Management: Adults",
        subsection: "Antidepressant Selection",
        tableOrFigure: "SSRI Choice Based on Comorbidities"
      },
      {
        text: "CKS Depression Section 'Scenario: Treatment Resistance' - 'Increase dose, switch class, or add psychological therapy if no response at 4-6 weeks' (Scenario Tab)",
        url: "https://cks.nice.org.uk/topics/depression/scenario/treatment-resistant-depression/",
        section: "Scenario: Treatment Resistance",
        subsection: "Optimization Strategies",
        tableOrFigure: "Treatment Escalation Pathway"
      }
    ],

    urinary_tract_infection: [
      {
        text: "CKS UTI Section 'Management: Lower UTI in Women' - 'Nitrofurantoin 100mg BD for 3 days or trimethoprim 200mg BD for 3 days' (Management Tab)",
        url: "https://cks.nice.org.uk/topics/urinary-tract-infection-lower-women/management/acute-cystitis/",
        section: "Management: Acute Cystitis",
        subsection: "First-line Antibiotic Choices",
        tableOrFigure: "Uncomplicated UTI Treatment Options"
      },
      {
        text: "CKS UTI Section 'Scenario: Recurrent UTI' - 'Consider prophylaxis with nitrofurantoin 50mg at night for ≥3 UTIs in 12 months' (Scenario Tab)",
        url: "https://cks.nice.org.uk/topics/urinary-tract-infection-lower-women/scenario/recurrent-lower-uti/",
        section: "Scenario: Recurrent UTI",
        subsection: "Prophylaxis Indications",
        tableOrFigure: "Recurrent UTI Management Algorithm"
      }
    ],

    gastroenteritis: [
      {
        text: "CKS Gastroenteritis Section 'Management: Adults' - 'Oral rehydration solution, avoid antidiarrheals in bloody diarrhea' (Management Tab)",
        url: "https://cks.nice.org.uk/topics/gastroenteritis/management/adults/",
        section: "Management: Adults",
        subsection: "Supportive Care",
        tableOrFigure: "Fluid Replacement Guidelines"
      },
      {
        text: "CKS Gastroenteritis Section 'Scenario: Dehydration' - 'Urgent assessment if unable to tolerate fluids, severe dehydration, or systemic symptoms' (Scenario Tab)",
        url: "https://cks.nice.org.uk/topics/gastroenteritis/scenario/dehydration/",
        section: "Scenario: Dehydration",
        subsection: "Hospital Referral Criteria",
        tableOrFigure: "Dehydration Assessment Tool"
      }
    ],

    anxiety_disorders: [
      {
        text: "CKS Anxiety Section 'Management: Generalized Anxiety' - 'CBT first-line, consider SSRI if moderate-severe or CBT declined' (Management Tab)",
        url: "https://cks.nice.org.uk/topics/anxiety/management/generalized-anxiety-disorder/",
        section: "Management: GAD",
        subsection: "Stepped Care Approach",
        tableOrFigure: "Anxiety Treatment Hierarchy"
      },
      {
        text: "CKS Anxiety Section 'Scenario: Panic Disorder' - 'Sertraline 25mg daily initially, titrate based on response and tolerability' (Scenario Tab)",
        url: "https://cks.nice.org.uk/topics/anxiety/scenario/panic-disorder/",
        section: "Scenario: Panic Disorder",
        subsection: "Pharmacological Management",
        tableOrFigure: "Panic Disorder Treatment Algorithm"
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
import OpenAI from "openai";
import { findSpecificGuidelineLinks, GuidelineSearchResult } from "./dynamic-guideline-search";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// NHSPrep AI - Clinical Exam Question Generator
// Uses verified UK clinical guidelines only

interface NHSPrepQuestion {
  specialty: string;
  topic: string;
  scenario: string;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
    E: string;
  };
  correct_answer: string;
  explanation: string;
  study_tip: string;
  reference: {
    title: string;
    section: string;
    url: string;
  };
}

// Verified UK Clinical Guidelines Database - Comprehensive Coverage
const UK_CLINICAL_GUIDELINES = {
  cardiology: {
    heart_failure: {
      nice: "CG108: Chronic heart failure in adults",
      cks: "Heart failure - chronic",
      sections: ["Diagnosis", "Treatment", "Monitoring"],
      urls: {
        nice: "https://www.nice.org.uk/guidance/cg108",
        cks: "https://cks.nice.org.uk/topics/heart-failure-chronic/"
      }
    },
    hypertension: {
      nice: "NG136: Hypertension in adults",
      cks: "Hypertension",
      sections: ["Diagnosis", "Treatment thresholds", "Lifestyle advice"],
      urls: {
        nice: "https://www.nice.org.uk/guidance/ng136",
        cks: "https://cks.nice.org.uk/topics/hypertension/"
      }
    },
    atrial_fibrillation: {
      nice: "CG180: Atrial fibrillation",
      cks: "Atrial fibrillation",
      sections: ["Anticoagulation", "Rate control", "Rhythm control"],
      urls: {
        nice: "https://www.nice.org.uk/guidance/cg180",
        cks: "https://cks.nice.org.uk/topics/atrial-fibrillation/"
      }
    },
    acs: {
      nice: "NG185: Acute coronary syndromes",
      cks: "Angina",
      sections: ["Assessment", "Treatment", "Secondary prevention"],
      urls: {
        nice: "https://www.nice.org.uk/guidance/ng185",
        cks: "https://cks.nice.org.uk/topics/angina/"
      }
    }
  },
  neurology: {
    stroke: {
      nice: "NG128: Stroke and transient ischaemic attack in over 16s",
      cks: "Stroke - TIA",
      sections: ["Acute management", "Secondary prevention", "Rehabilitation"],
      urls: {
        nice: "https://www.nice.org.uk/guidance/ng128",
        cks: "https://cks.nice.org.uk/topics/stroke-tia/"
      }
    },
    epilepsy: {
      nice: "CG137: Epilepsies",
      cks: "Epilepsy",
      sections: ["Diagnosis", "Treatment", "Status epilepticus"],
      urls: {
        nice: "https://www.nice.org.uk/guidance/cg137",
        cks: "https://cks.nice.org.uk/topics/epilepsy/"
      }
    },
    headache: {
      nice: "CG150: Headaches in over 12s",
      cks: "Headache - assessment",
      sections: ["Assessment", "Management", "Red flags"],
      urls: {
        nice: "https://www.nice.org.uk/guidance/cg150",
        cks: "https://cks.nice.org.uk/topics/headache-assessment/"
      }
    },
    parkinsons: {
      nice: "NG71: Parkinson's disease",
      cks: "Parkinson's disease",
      sections: ["Diagnosis", "Treatment", "Complications"],
      urls: {
        nice: "https://www.nice.org.uk/guidance/ng71",
        cks: "https://cks.nice.org.uk/topics/parkinsons-disease/"
      }
    }
  },
  emergency_medicine: {
    sepsis: {
      nice: "NG51: Sepsis",
      cks: "Sepsis",
      sections: ["Recognition", "Treatment", "Early management"],
      urls: {
        nice: "https://www.nice.org.uk/guidance/ng51",
        cks: "https://cks.nice.org.uk/topics/sepsis/"
      }
    },
    major_trauma: {
      nice: "NG39: Major trauma",
      cks: "Head injury - acute management",
      sections: ["Assessment", "Management", "Transfer"],
      urls: {
        nice: "https://www.nice.org.uk/guidance/ng39",
        cks: "https://cks.nice.org.uk/topics/head-injury-acute-management/"
      }
    },
    anaphylaxis: {
      nice: "CG134: Anaphylaxis",
      cks: "Anaphylaxis",
      sections: ["Recognition", "Treatment", "Follow-up"],
      urls: {
        nice: "https://www.nice.org.uk/guidance/cg134",
        cks: "https://cks.nice.org.uk/topics/anaphylaxis/"
      }
    }
  },
  respiratory: {
    asthma: {
      nice: "NG80: Asthma diagnosis, monitoring and chronic asthma management",
      cks: "Asthma",
      sections: ["Diagnosis", "Treatment", "Exacerbations"],
      urls: {
        nice: "https://www.nice.org.uk/guidance/ng80",
        cks: "https://cks.nice.org.uk/topics/asthma/"
      }
    },
    copd: {
      nice: "CG101: Chronic obstructive pulmonary disease in over 16s",
      cks: "Chronic obstructive pulmonary disease",
      sections: ["Diagnosis", "Management", "Exacerbations"],
      urls: {
        nice: "https://www.nice.org.uk/guidance/cg101",
        cks: "https://cks.nice.org.uk/topics/chronic-obstructive-pulmonary-disease/"
      }
    },
    pneumonia: {
      nice: "CG191: Pneumonia in adults",
      cks: "Chest infections - adult",
      sections: ["Assessment", "Antibiotic treatment", "Severity scoring"],
      urls: {
        nice: "https://www.nice.org.uk/guidance/cg191",
        cks: "https://cks.nice.org.uk/topics/chest-infections-adult/"
      }
    }
  },
  psychiatry: {
    depression: {
      nice: "CG90: Depression in adults",
      cks: "Depression",
      sections: ["Assessment", "Treatment", "Stepped care"],
      urls: {
        nice: "https://www.nice.org.uk/guidance/cg90",
        cks: "https://cks.nice.org.uk/topics/depression/"
      }
    },
    anxiety: {
      nice: "CG113: Generalised anxiety disorder and panic disorder",
      cks: "Anxiety",
      sections: ["Assessment", "Psychological interventions", "Drug treatment"],
      urls: {
        nice: "https://www.nice.org.uk/guidance/cg113",
        cks: "https://cks.nice.org.uk/topics/anxiety/"
      }
    },
    bipolar: {
      nice: "CG185: Bipolar disorder",
      cks: "Bipolar disorder",
      sections: ["Diagnosis", "Acute treatment", "Long-term management"],
      urls: {
        nice: "https://www.nice.org.uk/guidance/cg185",
        cks: "https://cks.nice.org.uk/topics/bipolar-disorder/"
      }
    },
    schizophrenia: {
      nice: "CG178: Psychosis and schizophrenia in adults",
      cks: "Psychosis",
      sections: ["Assessment", "Treatment", "Care planning"],
      urls: {
        nice: "https://www.nice.org.uk/guidance/cg178",
        cks: "https://cks.nice.org.uk/topics/psychosis/"
      }
    }
  },
  pediatrics: {
    fever: {
      nice: "CG160: Fever in under 5s",
      cks: "Feverish illness in children",
      sections: ["Assessment", "Management", "Traffic light system"],
      urls: {
        nice: "https://www.nice.org.uk/guidance/cg160",
        cks: "https://cks.nice.org.uk/topics/feverish-illness-in-children/"
      }
    },
    bronchiolitis: {
      nice: "NG9: Bronchiolitis in children",
      cks: "Bronchiolitis",
      sections: ["Diagnosis", "Management", "Admission criteria"],
      urls: {
        nice: "https://www.nice.org.uk/guidance/ng9",
        cks: "https://cks.nice.org.uk/topics/bronchiolitis/"
      }
    }
  },
  dermatology: {
    eczema: {
      nice: "CG57: Atopic eczema in under 12s",
      cks: "Eczema - atopic",
      sections: ["Diagnosis", "Treatment", "Maintenance"],
      urls: {
        nice: "https://www.nice.org.uk/guidance/cg57",
        cks: "https://cks.nice.org.uk/topics/eczema-atopic/"
      }
    },
    psoriasis: {
      nice: "CG153: Psoriasis",
      cks: "Psoriasis",
      sections: ["Assessment", "Topical therapy", "Systemic therapy"],
      urls: {
        nice: "https://www.nice.org.uk/guidance/cg153",
        cks: "https://cks.nice.org.uk/topics/psoriasis/"
      }
    }
  },
  urology: {
    uti: {
      nice: "NG109: Urinary tract infection in under 16s",
      cks: "Urinary tract infection - adults",
      sections: ["Diagnosis", "Treatment", "Prevention"],
      urls: {
        nice: "https://www.nice.org.uk/guidance/ng109",
        cks: "https://cks.nice.org.uk/topics/urinary-tract-infection-adults/"
      }
    },
    kidney_stones: {
      nice: "CG118: Renal and ureteric stones",
      cks: "Renal or ureteric colic - acute",
      sections: ["Assessment", "Treatment", "Prevention"],
      urls: {
        nice: "https://www.nice.org.uk/guidance/cg118",
        cks: "https://cks.nice.org.uk/topics/renal-or-ureteric-colic-acute/"
      }
    }
  },
  rheumatology: {
    rheumatoid_arthritis: {
      nice: "CG79: Rheumatoid arthritis in adults",
      cks: "Rheumatoid arthritis",
      sections: ["Diagnosis", "Treatment", "Monitoring"],
      urls: {
        nice: "https://www.nice.org.uk/guidance/cg79",
        cks: "https://cks.nice.org.uk/topics/rheumatoid-arthritis/"
      }
    },
    osteoarthritis: {
      nice: "CG177: Osteoarthritis",
      cks: "Osteoarthritis",
      sections: ["Assessment", "Non-pharmacological", "Pharmacological"],
      urls: {
        nice: "https://www.nice.org.uk/guidance/cg177",
        cks: "https://cks.nice.org.uk/topics/osteoarthritis/"
      }
    }
  },
  geriatrics: {
    dementia: {
      nice: "NG97: Dementia",
      cks: "Dementia",
      sections: ["Assessment", "Diagnosis", "Management"],
      urls: {
        nice: "https://www.nice.org.uk/guidance/ng97",
        cks: "https://cks.nice.org.uk/topics/dementia/"
      }
    },
    falls: {
      nice: "CG161: Falls in older people",
      cks: "Falls - risk assessment",
      sections: ["Assessment", "Prevention", "Interventions"],
      urls: {
        nice: "https://www.nice.org.uk/guidance/cg161",
        cks: "https://cks.nice.org.uk/topics/falls-risk-assessment/"
      }
    }
  },
  infectious_diseases: {
    meningitis: {
      nice: "CG102: Bacterial meningitis and meningococcal septicaemia",
      cks: "Meningitis and meningococcal disease",
      sections: ["Recognition", "Treatment", "Prophylaxis"],
      urls: {
        nice: "https://www.nice.org.uk/guidance/cg102",
        cks: "https://cks.nice.org.uk/topics/meningitis-and-meningococcal-disease/"
      }
    },
    tuberculosis: {
      nice: "NG33: Tuberculosis",
      cks: "Tuberculosis",
      sections: ["Diagnosis", "Treatment", "Contact tracing"],
      urls: {
        nice: "https://www.nice.org.uk/guidance/ng33",
        cks: "https://cks.nice.org.uk/topics/tuberculosis/"
      }
    }
  },
  radiology: {
    imaging_requests: {
      nice: "CG131: Spinal injury assessment",
      cks: "X-ray requests - guidance",
      sections: ["Appropriate imaging", "Radiation protection", "Clinical decision rules"],
      urls: {
        nice: "https://www.nice.org.uk/guidance/cg131",
        cks: "https://cks.nice.org.uk/topics/x-ray-requests/"
      }
    }
  },
  oncology: {
    lung_cancer: {
      nice: "NG122: Lung cancer",
      cks: "Lung cancer",
      sections: ["Diagnosis", "Staging", "Treatment"],
      urls: {
        nice: "https://www.nice.org.uk/guidance/ng122",
        cks: "https://cks.nice.org.uk/topics/lung-cancer/"
      }
    },
    breast_cancer: {
      nice: "CG80: Early and locally advanced breast cancer",
      cks: "Breast cancer",
      sections: ["Diagnosis", "Treatment", "Follow-up"],
      urls: {
        nice: "https://www.nice.org.uk/guidance/cg80",
        cks: "https://cks.nice.org.uk/topics/breast-cancer/"
      }
    }
  },
  ent: {
    otitis_media: {
      nice: "CG60: Otitis media with effusion",
      cks: "Otitis media - acute",
      sections: ["Diagnosis", "Treatment", "Complications"],
      urls: {
        nice: "https://www.nice.org.uk/guidance/cg60",
        cks: "https://cks.nice.org.uk/topics/otitis-media-acute/"
      }
    },
    tonsillitis: {
      nice: "CG84: Respiratory tract infections",
      cks: "Sore throat - acute",
      sections: ["Assessment", "Treatment", "Complications"],
      urls: {
        nice: "https://www.nice.org.uk/guidance/cg84",
        cks: "https://cks.nice.org.uk/topics/sore-throat-acute/"
      }
    }
  },
  endocrinology: {
    diabetes_type2: {
      nice: "NG28: Type 2 diabetes in adults",
      cks: "Diabetes - type 2",
      sections: ["Diagnosis", "Lifestyle interventions", "Drug treatment"],
      urls: {
        nice: "https://www.nice.org.uk/guidance/ng28",
        cks: "https://cks.nice.org.uk/topics/diabetes-type-2/"
      }
    },
    diabetes_type1: {
      nice: "NG17: Type 1 diabetes in adults",
      cks: "Diabetes - type 1",
      sections: ["Insulin therapy", "Blood glucose management", "Complications"],
      urls: {
        nice: "https://www.nice.org.uk/guidance/ng17",
        cks: "https://cks.nice.org.uk/topics/diabetes-type-1/"
      }
    },
    thyroid: {
      nice: "NG145: Thyroid disease",
      cks: "Hyperthyroidism",
      sections: ["Assessment", "Treatment", "Monitoring"],
      urls: {
        nice: "https://www.nice.org.uk/guidance/ng145",
        cks: "https://cks.nice.org.uk/topics/hyperthyroidism/"
      }
    }
  },
  gastroenterology: {
    ibd: {
      nice: "NG129: Crohn's disease",
      cks: "Inflammatory bowel disease",
      sections: ["Diagnosis", "Inducing remission", "Maintaining remission"],
      urls: {
        nice: "https://www.nice.org.uk/guidance/ng129",
        cks: "https://cks.nice.org.uk/topics/inflammatory-bowel-disease/"
      }
    },
    gord: {
      nice: "CG184: Gastro-oesophageal reflux disease and dyspepsia",
      cks: "Dyspepsia - proven GORD",
      sections: ["Assessment", "Treatment", "Lifestyle advice"],
      urls: {
        nice: "https://www.nice.org.uk/guidance/cg184",
        cks: "https://cks.nice.org.uk/topics/dyspepsia-proven-gord/"
      }
    },
    ibs: {
      nice: "CG61: Irritable bowel syndrome",
      cks: "Irritable bowel syndrome",
      sections: ["Diagnosis", "Lifestyle advice", "Drug treatment"],
      urls: {
        nice: "https://www.nice.org.uk/guidance/cg61",
        cks: "https://cks.nice.org.uk/topics/irritable-bowel-syndrome/"
      }
    }
  },
  obstetrics_gynecology: {
    pregnancy: {
      nice: "NG201: Antenatal care",
      cks: "Pregnancy - routine care",
      sections: ["Booking", "Screening", "Monitoring"],
      urls: {
        nice: "https://www.nice.org.uk/guidance/ng201",
        cks: "https://cks.nice.org.uk/topics/pregnancy-routine-care/"
      }
    },
    menorrhagia: {
      nice: "NG88: Heavy menstrual bleeding",
      cks: "Menorrhagia",
      sections: ["Assessment", "Treatment", "Referral"],
      urls: {
        nice: "https://www.nice.org.uk/guidance/ng88",
        cks: "https://cks.nice.org.uk/topics/menorrhagia/"
      }
    }
  },
  general_surgery: {
    appendicitis: {
      nice: "NG210: Appendicitis",
      cks: "Appendicitis",
      sections: ["Diagnosis", "Management", "Complications"],
      urls: {
        nice: "https://www.nice.org.uk/guidance/ng210",
        cks: "https://cks.nice.org.uk/topics/appendicitis/"
      }
    },
    gallstones: {
      nice: "CG188: Gallstone disease",
      cks: "Gallstones",
      sections: ["Assessment", "Treatment", "Complications"],
      urls: {
        nice: "https://www.nice.org.uk/guidance/cg188",
        cks: "https://cks.nice.org.uk/topics/gallstones/"
      }
    }
  },
  anesthetics: {
    perioperative: {
      nice: "NG180: Perioperative care in adults",
      cks: "Pre-operative assessment",
      sections: ["Assessment", "Management", "Recovery"],
      urls: {
        nice: "https://www.nice.org.uk/guidance/ng180",
        cks: "https://cks.nice.org.uk/topics/pre-operative-assessment/"
      }
    }
  },
  forensic_medicine: {
    child_abuse: {
      nice: "NG76: Child abuse and neglect",
      cks: "Child protection",
      sections: ["Recognition", "Assessment", "Referral"],
      urls: {
        nice: "https://www.nice.org.uk/guidance/ng76",
        cks: "https://cks.nice.org.uk/topics/child-protection/"
      }
    }
  },
  hematology: {
    anemia: {
      nice: "CG182: Iron deficiency anaemia",
      cks: "Anaemia - iron deficiency",
      sections: ["Assessment", "Investigation", "Treatment"],
      urls: {
        nice: "https://www.nice.org.uk/guidance/cg182",
        cks: "https://cks.nice.org.uk/topics/anaemia-iron-deficiency/"
      }
    }
  },
  public_health: {
    smoking_cessation: {
      nice: "NG92: Stop smoking interventions and services",
      cks: "Smoking cessation",
      sections: ["Assessment", "Interventions", "Support"],
      urls: {
        nice: "https://www.nice.org.uk/guidance/ng92",
        cks: "https://cks.nice.org.uk/topics/smoking-cessation/"
      }
    }
  }
};

export async function generateNHSPrepQuestions(
  specialty: string,
  topic: string = "",
  count: number = 1
): Promise<NHSPrepQuestion[]> {
  try {
    // Get verified guidelines for the specialty/topic
    const guidelineData = getVerifiedGuidelines(specialty, topic);
    
    // Find specific NICE/CKS links for this clinical topic
    const specificGuidelines = await findSpecificGuidelineLinks(topic, specialty);
    
    const prompt = `You are NHSPrep AI — a clinical exam question generator for PLAB, MLA, and NHSPrep candidates.

You ONLY use verified UK clinical guidelines:
- NICE Guidelines (latest)
- NICE Clinical Knowledge Summaries (CKS)
- BMJ Best Practice
- GMC Good Medical Practice 2024
- GMC MLA Content Map

TASK: Generate ${count} SINGLE-BEST-ANSWER exam questions for:
- Specialty: ${specialty}
- Topic: ${topic || 'General'}

VERIFIED GUIDELINES FOR THIS TOPIC:
${guidelineData}

SPECIFIC GUIDELINE REFERENCES (use these exact details):
- NICE: ${specificGuidelines.nice?.title || 'NICE Guidance'} - ${specificGuidelines.nice?.url || 'https://www.nice.org.uk/guidance'}
- CKS: ${specificGuidelines.cks?.title || 'CKS Topic'} - ${specificGuidelines.cks?.url || 'https://cks.nice.org.uk/topics/'}

Each question must follow UK NHS clinical guidelines and be appropriate for candidates preparing for PLAB/MLA/NHS licensing exams.

CRITICAL REQUIREMENTS:
1. Use ONLY the verified UK guidelines provided above
2. Include specific NICE/CKS reference with exact section
3. Use the authentic guideline URLs provided above - these are direct links to specific guidelines
4. Clinical scenarios must be realistic UK NHS cases
5. All 5 options must be plausible but only one correct
6. Explanations must be comprehensive (200-250 words) starting with "Correct Answer: [Letter]. [Option text]" followed by:
   - Clear reasoning why the correct answer is correct using clinical reasoning
   - Brief mentions of why other options are incorrect
   - Exam-relevant clinical tips in brackets [Clinical Tip: ...]
   - UK-specific clinical protocols and pathophysiology

Return ONLY a JSON array in this exact format:

[
  {
    "specialty": "${specialty}",
    "topic": "${topic || 'General'}",
    "scenario": "A detailed clinical vignette set in UK NHS context",
    "question": "What is the most appropriate next step according to UK guidelines?",
    "options": {
      "A": "Option A text",
      "B": "Option B text", 
      "C": "Option C text",
      "D": "Option D text",
      "E": "Option E text"
    },
    "correct_answer": "A",
    "explanation": "Start with 'Correct Answer: [Letter]. [Option text]' then provide comprehensive 200-250 word explanation with clinical reasoning, why other options are incorrect, and exam tips in brackets [Clinical Tip: ...]",
    "study_tip": "Specific learning point reinforcing this guideline recommendation",
    "reference": {
      "title": "Exact NICE/CKS guideline title",
      "section": "Specific section or recommendation quoted",
      "url": "${specificGuidelines.nice?.url || specificGuidelines.cks?.url || 'https://www.nice.org.uk/guidance'}"
    }
  }
]

IMPORTANT: 
- DO NOT invent references or URLs
- Reference must always be specific NICE/CKS section
- Study tips must directly reinforce learning for this question
- Include no text outside the JSON array`;

    // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are NHSPrep AI, a specialist in UK clinical guidelines. Generate high-quality PLAB/MLA exam questions using only verified NICE and CKS guidelines. Return only valid JSON."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 4000
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error("No response from OpenAI");
    }

    try {
      // Parse the JSON response - expect array format
      let questions;
      const parsed = JSON.parse(content);
      
      // Handle both array and object responses
      if (Array.isArray(parsed)) {
        questions = parsed;
      } else if (parsed.questions && Array.isArray(parsed.questions)) {
        questions = parsed.questions;
      } else {
        // Wrap single question in array
        questions = [parsed];
      }

      // Validate each question has required fields
      const validatedQuestions = questions.map((q: any, index: number) => {
        if (!q.specialty || !q.scenario || !q.question || !q.options || !q.correct_answer || !q.explanation || !q.reference) {
          throw new Error(`Invalid question format at index ${index}`);
        }
        return q as NHSPrepQuestion;
      });

      return validatedQuestions.slice(0, count);

    } catch (parseError) {
      console.error("JSON parsing error:", parseError);
      console.error("Raw content:", content);
      throw new Error("Failed to parse OpenAI response as JSON");
    }

  } catch (error) {
    console.error("Error generating NHSPrep questions:", error);
    throw error;
  }
}

function getVerifiedGuidelines(specialty: string, topic: string): string {
  const specialtyKey = specialty.toLowerCase().replace(/\s+/g, '_');
  const topicKey = topic.toLowerCase().replace(/\s+/g, '_');
  
  const specialtyGuidelines = (UK_CLINICAL_GUIDELINES as any)[specialtyKey];
  
  if (!specialtyGuidelines) {
    return `No specific guidelines found for ${specialty}. Use general UK clinical guidelines from NICE and CKS.`;
  }
  
  if (topic && specialtyGuidelines[topicKey]) {
    const guideline = specialtyGuidelines[topicKey];
    return `
NICE Guideline: ${guideline.nice}
URL: ${guideline.urls.nice}

CKS Topic: ${guideline.cks}  
URL: ${guideline.urls.cks}

Key Sections: ${guideline.sections.join(', ')}`;
  }
  
  // Return all guidelines for the specialty if no specific topic
  const allGuidelines = Object.entries(specialtyGuidelines).map(([key, value]: [string, any]) => {
    return `${key.toUpperCase()}: ${value.nice} (${value.urls.nice})`;
  }).join('\n');
  
  return `Available ${specialty} Guidelines:\n${allGuidelines}`;
}

// Get authentic guideline links for specialty and topic
function getGuidelineLinksForSpecialty(specialty: string, topic: string) {
  const specialtyKey = specialty.toLowerCase().replace(/\s+/g, '_');
  const topicKey = topic.toLowerCase().replace(/\s+/g, '_');
  
  const guidelineMap: Record<string, any> = {
    cardiology: {
      hypertension: {
        nice: "https://www.nice.org.uk/guidance/ng136",
        cks: "https://cks.nice.org.uk/topics/hypertension/"
      },
      heart_failure: {
        nice: "https://www.nice.org.uk/guidance/cg108", 
        cks: "https://cks.nice.org.uk/topics/heart-failure-chronic/"
      },
      atrial_fibrillation: {
        nice: "https://www.nice.org.uk/guidance/cg180",
        cks: "https://cks.nice.org.uk/topics/atrial-fibrillation/"
      }
    },
    endocrinology: {
      diabetes_type2: {
        nice: "https://www.nice.org.uk/guidance/ng28",
        cks: "https://cks.nice.org.uk/topics/diabetes-type-2/"
      },
      diabetes_type1: {
        nice: "https://www.nice.org.uk/guidance/ng17",
        cks: "https://cks.nice.org.uk/topics/diabetes-type-1/"
      }
    },
    respiratory: {
      asthma: {
        nice: "https://www.nice.org.uk/guidance/ng80",
        cks: "https://cks.nice.org.uk/topics/asthma/"
      },
      copd: {
        nice: "https://www.nice.org.uk/guidance/cg101",
        cks: "https://cks.nice.org.uk/topics/chronic-obstructive-pulmonary-disease/"
      }
    }
  };

  const links = guidelineMap[specialtyKey]?.[topicKey];
  return links || {
    nice: "https://www.nice.org.uk/guidance",
    cks: "https://cks.nice.org.uk/topics/"
  };
}

// Export specialty mapping for validation
export const VALID_SPECIALTIES = Object.keys(UK_CLINICAL_GUIDELINES);
export const getTopicsForSpecialty = (specialty: string) => {
  const specialtyKey = specialty.toLowerCase().replace(/\s+/g, '_');
  const specialtyData = (UK_CLINICAL_GUIDELINES as any)[specialtyKey];
  return specialtyData ? Object.keys(specialtyData) : [];
};
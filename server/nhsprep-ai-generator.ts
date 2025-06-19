import OpenAI from "openai";

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

// Verified UK Clinical Guidelines Database
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

Each question must follow UK NHS clinical guidelines and be appropriate for candidates preparing for PLAB/MLA/NHS licensing exams.

CRITICAL REQUIREMENTS:
1. Use ONLY the verified UK guidelines provided above
2. Include specific NICE/CKS reference with exact section
3. Provide working URLs to the guidelines
4. Clinical scenarios must be realistic UK NHS cases
5. All 5 options must be plausible but only one correct
6. Explanations must cite specific guideline recommendations

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
    "explanation": "Detailed explanation citing specific NICE/CKS recommendations. Why correct answer is right and why others are wrong.",
    "study_tip": "Specific learning point reinforcing this guideline recommendation",
    "reference": {
      "title": "Exact NICE/CKS guideline title",
      "section": "Specific section or recommendation quoted",
      "url": "Direct working URL to the guideline page"
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

// Export specialty mapping for validation
export const VALID_SPECIALTIES = Object.keys(UK_CLINICAL_GUIDELINES);
export const getTopicsForSpecialty = (specialty: string) => {
  const specialtyKey = specialty.toLowerCase().replace(/\s+/g, '_');
  const specialtyData = (UK_CLINICAL_GUIDELINES as any)[specialtyKey];
  return specialtyData ? Object.keys(specialtyData) : [];
};
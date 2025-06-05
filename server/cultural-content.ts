import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface CulturalModule {
  id: number;
  title: string;
  category: string;
  difficulty: string;
  duration: number;
  description: string;
  content: {
    keyPoints: string[];
    scenarios: string[];
    practicalTips: string[];
    commonMistakes: string[];
  };
  interactiveElements: {
    quiz: { question: string; options: string[]; correct: number; explanation: string }[];
    rolePlay: { scenario: string; objectives: string[]; feedback: string }[];
  };
  completed: boolean;
  score?: number;
}

export async function generateCulturalContent(topic: string, difficulty: string): Promise<CulturalModule> {
  try {
    const prompt = `
Create detailed cultural training content for international medical graduates working in the UK NHS, focusing on: ${topic}

Difficulty level: ${difficulty}

Generate authentic, practical content including:
1. Key cultural points specific to UK healthcare
2. Real scenarios that international doctors encounter
3. Practical tips for successful integration
4. Common cultural mistakes to avoid
5. Interactive quiz questions with explanations
6. Role-play scenarios with learning objectives

Focus on authentic NHS practices, UK medical culture, and practical guidance.

Respond in JSON format:
{
  "title": "Module Title",
  "category": "category",
  "difficulty": "${difficulty}",
  "duration": number,
  "description": "description",
  "content": {
    "keyPoints": ["point1", "point2", "point3", "point4"],
    "scenarios": ["scenario1", "scenario2", "scenario3"],
    "practicalTips": ["tip1", "tip2", "tip3"],
    "commonMistakes": ["mistake1", "mistake2", "mistake3"]
  },
  "interactiveElements": {
    "quiz": [
      {
        "question": "question text",
        "options": ["option1", "option2", "option3", "option4"],
        "correct": 0,
        "explanation": "explanation"
      }
    ],
    "rolePlay": [
      {
        "scenario": "scenario description",
        "objectives": ["objective1", "objective2"],
        "feedback": "feedback text"
      }
    ]
  }
}
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an expert in UK medical culture and NHS practices, creating training content for international medical graduates."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      max_tokens: 2000
    });

    const content = JSON.parse(response.choices[0].message.content || "{}");
    
    return {
      id: Date.now(),
      title: content.title || `${topic} Training`,
      category: content.category || "general",
      difficulty: content.difficulty || difficulty,
      duration: content.duration || 30,
      description: content.description || `Cultural training module for ${topic}`,
      content: {
        keyPoints: content.content?.keyPoints || [],
        scenarios: content.content?.scenarios || [],
        practicalTips: content.content?.practicalTips || [],
        commonMistakes: content.content?.commonMistakes || []
      },
      interactiveElements: {
        quiz: content.interactiveElements?.quiz || [],
        rolePlay: content.interactiveElements?.rolePlay || []
      },
      completed: false
    };

  } catch (error) {
    console.error("Error generating cultural content:", error);
    return generateDefaultModule(topic, difficulty);
  }
}

export async function assessCulturalCompetency(responses: { moduleId: number; answers: any[]; timeSpent: number }[]): Promise<{
  overallScore: number;
  categoryScores: { [category: string]: number };
  recommendations: string[];
  nextSteps: string[];
}> {
  try {
    const prompt = `
Assess cultural competency based on these training module responses:

${responses.map(r => `
Module ${r.moduleId}: ${r.answers.length} responses, ${r.timeSpent} minutes spent
`).join('\n')}

Provide overall assessment with specific recommendations for improving cultural competency in UK healthcare.

Respond in JSON format:
{
  "overallScore": number,
  "categoryScores": {"communication": number, "nhs_structure": number, "ethics": number},
  "recommendations": ["recommendation1", "recommendation2"],
  "nextSteps": ["step1", "step2"]
}
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      max_tokens: 800
    });

    return JSON.parse(response.choices[0].message.content || "{}");
  } catch (error) {
    console.error("Error assessing cultural competency:", error);
    return {
      overallScore: 75,
      categoryScores: { communication: 78, nhs_structure: 72, ethics: 76 },
      recommendations: [
        "Focus on understanding NHS hierarchy and referral protocols",
        "Practice patient-centered communication in multicultural contexts",
        "Review GMC ethical guidelines specific to UK practice"
      ],
      nextSteps: [
        "Complete advanced communication skills module",
        "Shadow senior colleagues during patient interactions",
        "Attend cultural competency workshops"
      ]
    };
  }
}

function generateDefaultModule(topic: string, difficulty: string): CulturalModule {
  return {
    id: Date.now(),
    title: `${topic} - UK Healthcare Context`,
    category: "general",
    difficulty,
    duration: 25,
    description: `Understanding ${topic} within the UK NHS healthcare system`,
    content: {
      keyPoints: [
        "UK-specific approaches and protocols",
        "Cultural considerations for patient care",
        "Professional standards and expectations",
        "Integration with NHS systems and processes"
      ],
      scenarios: [
        "Real-world application in NHS settings",
        "Common challenges faced by international doctors",
        "Best practices for cultural adaptation"
      ],
      practicalTips: [
        "Observe and learn from experienced colleagues",
        "Ask questions when uncertain about protocols",
        "Maintain professional standards while adapting to local culture"
      ],
      commonMistakes: [
        "Assuming practices are the same as home country",
        "Not understanding NHS hierarchy and protocols",
        "Insufficient cultural awareness in patient interactions"
      ]
    },
    interactiveElements: {
      quiz: [
        {
          question: `What is the most important consideration when adapting to UK healthcare culture?`,
          options: [
            "Following exact protocols from previous experience",
            "Understanding local practices while maintaining professional standards",
            "Avoiding any cultural differences",
            "Only focusing on medical knowledge"
          ],
          correct: 1,
          explanation: "Successful adaptation requires understanding local practices while maintaining high professional standards and being culturally sensitive."
        }
      ],
      rolePlay: [
        {
          scenario: "You are working with a multidisciplinary team and need to communicate effectively with colleagues from different backgrounds",
          objectives: [
            "Demonstrate cultural awareness",
            "Communicate clearly and professionally",
            "Show respect for diverse perspectives"
          ],
          feedback: "Focus on clear communication, active listening, and cultural sensitivity in all professional interactions."
        }
      ]
    },
    completed: false
  };
}

export const nhsCulturalModules: CulturalModule[] = [
  {
    id: 1,
    title: "NHS Structure & Hierarchy",
    category: "nhs-structure",
    difficulty: "beginner",
    duration: 25,
    description: "Understanding the NHS organizational structure, roles, and referral pathways",
    content: {
      keyPoints: [
        "NHS organizational structure from trusts to departments",
        "Understanding medical hierarchy: FY1, FY2, SHO, Registrar, Consultant",
        "Referral pathways and when to escalate",
        "Multi-disciplinary team (MDT) roles and responsibilities"
      ],
      scenarios: [
        "When to call the registrar vs consultant during on-call duties",
        "How to make appropriate specialty referrals",
        "Understanding discharge planning processes and social services"
      ],
      practicalTips: [
        "Always introduce yourself with name and role when calling colleagues",
        "Use SBAR (Situation, Background, Assessment, Recommendation) for handovers",
        "Understand local escalation policies and emergency procedures"
      ],
      commonMistakes: [
        "Bypassing the hierarchy during non-emergency situations",
        "Not understanding the role of different healthcare professionals",
        "Inappropriate use of emergency referral pathways"
      ]
    },
    interactiveElements: {
      quiz: [
        {
          question: "When should you contact the consultant directly instead of the registrar?",
          options: [
            "For all patient concerns",
            "Only during true medical emergencies or when specifically requested",
            "When the registrar is not immediately available",
            "For routine patient updates"
          ],
          correct: 1,
          explanation: "Consultants should be contacted directly only for true emergencies or when specifically requested. The registrar is usually the first point of escalation."
        }
      ],
      rolePlay: [
        {
          scenario: "You need to refer a patient urgently but are unsure of the appropriate pathway",
          objectives: [
            "Identify the correct referral pathway",
            "Communicate urgency appropriately",
            "Follow NHS escalation procedures"
          ],
          feedback: "Always clarify urgency levels and use appropriate channels. When in doubt, seek guidance from senior colleagues."
        }
      ]
    },
    completed: true,
    score: 92
  }
];
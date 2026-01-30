import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

export interface PatientProfile {
  id: string;
  name: string;
  age: number;
  gender: string;
  presenting_complaint: string;
  medical_history: string[];
  medications: string[];
  social_history: string;
  examination_findings: Record<string, any>;
  investigation_results: Record<string, any>;
  diagnosis: string;
  management_plan: string[];
  learning_objectives: string[];
  difficulty_level: 'foundation' | 'intermediate' | 'advanced';
  specialty: string;
  scenario_type: 'history_taking' | 'examination' | 'counselling' | 'breaking_bad_news' | 'ethics';
}

export interface ConversationTurn {
  id: string;
  speaker: 'doctor' | 'patient';
  message: string;
  timestamp: Date;
  analysis?: {
    communication_score: number;
    empathy_score: number;
    clinical_relevance: number;
    suggestions: string[];
  };
}

export interface InteractiveSession {
  id: string;
  patient_id: string;
  scenario_type: string;
  conversation: ConversationTurn[];
  current_phase: 'introduction' | 'history' | 'examination' | 'explanation' | 'management' | 'completed';
  session_score: {
    overall: number;
    communication: number;
    clinical_knowledge: number;
    professionalism: number;
    time_management: number;
  };
  feedback: {
    strengths: string[];
    areas_for_improvement: string[];
    specific_advice: string[];
    next_steps: string[];
  };
  duration_minutes: number;
  completed: boolean;
}

// Sample patient profiles for demonstration
const samplePatients: PatientProfile[] = [
  {
    id: "patient-001",
    name: "Sarah Johnson",
    age: 34,
    gender: "Female",
    presenting_complaint: "Chest pain for 2 hours",
    medical_history: ["Hypertension", "Type 2 diabetes"],
    medications: ["Amlodipine 5mg OD", "Metformin 500mg BD"],
    social_history: "Non-smoker, occasional alcohol, works as teacher",
    examination_findings: {
      "vital_signs": "BP 145/95, HR 88, RR 18, O2 sat 98%",
      "cardiovascular": "Regular rhythm, no murmurs",
      "respiratory": "Clear breath sounds bilaterally",
      "abdominal": "Soft, non-tender"
    },
    investigation_results: {
      "ECG": "Normal sinus rhythm, no ST changes",
      "troponin": "Negative",
      "chest_xray": "Normal heart size, clear lung fields"
    },
    diagnosis: "Atypical chest pain, likely musculoskeletal",
    management_plan: [
      "Reassurance and explanation",
      "Simple analgesia as needed",
      "Follow-up if symptoms persist",
      "Lifestyle advice for cardiovascular risk factors"
    ],
    learning_objectives: [
      "History taking for chest pain",
      "Risk stratification",
      "Patient reassurance",
      "Communication skills"
    ],
    difficulty_level: "intermediate",
    specialty: "Emergency Medicine",
    scenario_type: "history_taking"
  },
  {
    id: "patient-002", 
    name: "Robert Williams",
    age: 68,
    gender: "Male",
    presenting_complaint: "Breathlessness and ankle swelling",
    medical_history: ["Previous MI 2015", "Hypertension", "Hyperlipidemia"],
    medications: ["Ramipril 10mg OD", "Bisoprolol 5mg OD", "Atorvastatin 40mg ON"],
    social_history: "Ex-smoker (quit 2015), lives with wife, retired engineer",
    examination_findings: {
      "vital_signs": "BP 110/70, HR 65, RR 22, O2 sat 94% on air",
      "cardiovascular": "Irregular rhythm, soft S3 gallop",
      "respiratory": "Fine bibasal crackles",
      "peripheries": "Bilateral ankle edema ++"
    },
    investigation_results: {
      "ECG": "Atrial fibrillation, rate 65",
      "BNP": "Elevated (450 pg/mL)",
      "echocardiogram": "LVEF 35%, moderate mitral regurgitation"
    },
    diagnosis: "Heart failure with reduced ejection fraction, atrial fibrillation",
    management_plan: [
      "ACE inhibitor optimization",
      "Diuretic therapy",
      "Anticoagulation for AF",
      "Heart failure education",
      "Cardiology follow-up"
    ],
    learning_objectives: [
      "Heart failure assessment",
      "Medication review",
      "Patient education",
      "Multidisciplinary care planning"
    ],
    difficulty_level: "advanced",
    specialty: "Cardiology",
    scenario_type: "counselling"
  },
  {
    id: "patient-003",
    name: "Emma Thompson",
    age: 28,
    gender: "Female", 
    presenting_complaint: "Anxiety about pregnancy test results",
    medical_history: ["Nil significant"],
    medications: ["Folic acid 400mcg OD"],
    social_history: "Lives with partner, works in marketing, planned pregnancy",
    examination_findings: {
      "vital_signs": "BP 120/80, HR 75, normal",
      "general": "Anxious but well",
      "abdominal": "Not examined today"
    },
    investigation_results: {
      "pregnancy_test": "Positive",
      "booking_bloods": "Pending"
    },
    diagnosis: "Early pregnancy (6 weeks gestation)",
    management_plan: [
      "Confirm pregnancy and dating",
      "Antenatal care pathway",
      "Lifestyle advice",
      "Booking appointment arrangement"
    ],
    learning_objectives: [
      "Breaking good news",
      "Antenatal care counselling", 
      "Addressing patient concerns",
      "Empathetic communication"
    ],
    difficulty_level: "foundation",
    specialty: "Obstetrics & Gynaecology",
    scenario_type: "counselling"
  }
];

export class InteractivePatientSystem {
  private sessions: Map<string, InteractiveSession> = new Map();

  async createNewSession(patientId: string, scenarioType: string): Promise<InteractiveSession> {
    const patient = samplePatients.find(p => p.id === patientId) || samplePatients[0];
    
    const session: InteractiveSession = {
      id: `session-${Date.now()}`,
      patient_id: patientId,
      scenario_type: scenarioType,
      conversation: [],
      current_phase: 'introduction',
      session_score: {
        overall: 0,
        communication: 0,
        clinical_knowledge: 0,
        professionalism: 0,
        time_management: 0
      },
      feedback: {
        strengths: [],
        areas_for_improvement: [],
        specific_advice: [],
        next_steps: []
      },
      duration_minutes: 0,
      completed: false
    };

    this.sessions.set(session.id, session);
    return session;
  }

  async processConversation(sessionId: string, doctorMessage: string): Promise<{
    patientResponse: string;
    analysis: any;
    updatedSession: InteractiveSession;
  }> {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error('Session not found');
    }

    const patient = samplePatients.find(p => p.id === session.patient_id);
    if (!patient) {
      throw new Error('Patient not found');
    }

    try {
      // Generate patient response using AI
      const patientResponse = await this.generatePatientResponse(patient, session, doctorMessage);
      
      // Analyze doctor's communication
      const analysis = await this.analyzeConversation(doctorMessage, session.current_phase);

      // Add conversation turns
      session.conversation.push({
        id: `turn-${Date.now()}-doctor`,
        speaker: 'doctor',
        message: doctorMessage,
        timestamp: new Date(),
        analysis
      });

      session.conversation.push({
        id: `turn-${Date.now()}-patient`,
        speaker: 'patient',
        message: patientResponse,
        timestamp: new Date()
      });

      // Update session phase and scoring
      this.updateSessionProgress(session, analysis);

      return {
        patientResponse,
        analysis,
        updatedSession: session
      };

    } catch (error) {
      // Fallback response when API is unavailable
      const fallbackResponse = this.getFallbackPatientResponse(patient, session, doctorMessage);
      const fallbackAnalysis = this.getFallbackAnalysis(doctorMessage);

      session.conversation.push({
        id: `turn-${Date.now()}-doctor`,
        speaker: 'doctor',
        message: doctorMessage,
        timestamp: new Date(),
        analysis: fallbackAnalysis
      });

      session.conversation.push({
        id: `turn-${Date.now()}-patient`, 
        speaker: 'patient',
        message: fallbackResponse,
        timestamp: new Date()
      });

      return {
        patientResponse: fallbackResponse,
        analysis: fallbackAnalysis,
        updatedSession: session
      };
    }
  }

  private async generatePatientResponse(patient: PatientProfile, session: InteractiveSession, doctorMessage: string): Promise<string> {
    const conversationHistory = session.conversation.map(turn => 
      `${turn.speaker}: ${turn.message}`
    ).join('\n');

    const prompt = `You are roleplaying as ${patient.name}, a ${patient.age}-year-old ${patient.gender} patient with the following profile:

Presenting complaint: ${patient.presenting_complaint}
Medical history: ${patient.medical_history.join(', ')}
Current phase: ${session.current_phase}

Previous conversation:
${conversationHistory}

Doctor just said: "${doctorMessage}"

Respond as the patient would, staying in character. Be realistic about:
- Patient's knowledge level and medical understanding
- Emotional state appropriate to the condition
- Natural speech patterns
- Relevant symptoms or concerns they might mention

Keep responses concise (1-3 sentences) and authentic to a real patient interaction.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        { role: "system", content: "You are an expert at roleplaying patients for medical education." },
        { role: "user", content: prompt }
      ],
      max_tokens: 150,
      temperature: 0.7
    });

    return response.choices[0].message.content || "I'm not sure what you mean, doctor.";
  }

  private async analyzeConversation(doctorMessage: string, phase: string): Promise<any> {
    const prompt = `Analyze this doctor's communication in a clinical scenario:

Doctor said: "${doctorMessage}"
Current phase: ${phase}

Provide analysis in JSON format:
{
  "communication_score": (1-10),
  "empathy_score": (1-10), 
  "clinical_relevance": (1-10),
  "suggestions": ["specific improvement suggestion 1", "suggestion 2"]
}

Consider:
- Use of open-ended questions
- Empathetic language
- Clinical relevance
- Professional communication
- Patient-centered approach`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        { role: "system", content: "You are a medical education expert analyzing clinical communication." },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" },
      max_tokens: 200
    });

    try {
      return JSON.parse(response.choices[0].message.content || '{}');
    } catch {
      return this.getFallbackAnalysis(doctorMessage);
    }
  }

  private getFallbackPatientResponse(patient: PatientProfile, session: InteractiveSession, doctorMessage: string): string {
    const responses: Record<string, string[]> = {
      'introduction': [
        `Hello doctor, I'm ${patient.name}. I've been having ${patient.presenting_complaint}.`,
        `Thank you for seeing me, doctor. I'm quite worried about this ${patient.presenting_complaint}.`
      ],
      'history': [
        `The pain started about ${Math.floor(Math.random() * 12) + 1} hours ago.`,
        `It's been getting gradually worse since this morning.`,
        `I've never had anything like this before.`
      ],
      'examination': [
        `Yes, you can examine me doctor.`,
        `It hurts more when you press there.`,
        `I feel a bit short of breath.`
      ],
      'explanation': [
        `What does that mean, doctor?`,
        `Is it serious? I'm quite worried.`,
        `What should I do next?`
      ]
    };

    const phaseResponses = responses[session.current_phase] || responses['introduction'];
    return phaseResponses[Math.floor(Math.random() * phaseResponses.length)];
  }

  private getFallbackAnalysis(doctorMessage: string): any {
    const isQuestion = doctorMessage.includes('?');
    const isEmpathetic = /sorry|understand|worried|concerned/i.test(doctorMessage);
    const isOpen = /how|what|tell me|describe/i.test(doctorMessage);

    return {
      communication_score: isQuestion && isOpen ? 8 : 6,
      empathy_score: isEmpathetic ? 8 : 5,
      clinical_relevance: doctorMessage.length > 20 ? 7 : 5,
      suggestions: [
        isQuestion ? "Good use of questioning technique" : "Try using more open-ended questions",
        isEmpathetic ? "Excellent empathetic communication" : "Consider acknowledging patient's concerns more explicitly"
      ]
    };
  }

  private updateSessionProgress(session: InteractiveSession, analysis: any): void {
    // Update scores based on analysis
    const turnCount = session.conversation.filter(t => t.speaker === 'doctor').length;
    
    session.session_score.communication += (analysis.communication_score || 5);
    session.session_score.clinical_knowledge += (analysis.clinical_relevance || 5);
    session.session_score.professionalism += (analysis.empathy_score || 5);
    
    // Calculate averages
    session.session_score.overall = Math.round(
      (session.session_score.communication + 
       session.session_score.clinical_knowledge + 
       session.session_score.professionalism) / (turnCount * 3)
    );

    // Progress through phases
    if (turnCount >= 3 && session.current_phase === 'introduction') {
      session.current_phase = 'history';
    } else if (turnCount >= 6 && session.current_phase === 'history') {
      session.current_phase = 'examination';
    } else if (turnCount >= 9 && session.current_phase === 'examination') {
      session.current_phase = 'explanation';
    } else if (turnCount >= 12) {
      session.current_phase = 'completed';
      session.completed = true;
      this.generateFinalFeedback(session);
    }
  }

  private generateFinalFeedback(session: InteractiveSession): void {
    const avgCommunication = session.session_score.communication / session.conversation.filter(t => t.speaker === 'doctor').length;
    const avgClinical = session.session_score.clinical_knowledge / session.conversation.filter(t => t.speaker === 'doctor').length;
    
    session.feedback = {
      strengths: [
        avgCommunication > 7 ? "Excellent communication skills demonstrated" : "Good rapport building",
        avgClinical > 7 ? "Strong clinical questioning technique" : "Appropriate clinical focus"
      ],
      areas_for_improvement: [
        avgCommunication < 6 ? "Work on empathetic communication" : "Continue developing active listening skills",
        avgClinical < 6 ? "Focus on more targeted clinical questions" : "Enhance systematic approach to history taking"
      ],
      specific_advice: [
        "Practice using more open-ended questions to encourage patient disclosure",
        "Remember to acknowledge patient emotions and concerns explicitly",
        "Consider using the ICE framework (Ideas, Concerns, Expectations)"
      ],
      next_steps: [
        "Review communication skills resources",
        "Practice with different patient scenarios",
        "Focus on empathetic responses in clinical interactions"
      ]
    };
  }

  getAvailablePatients(): PatientProfile[] {
    return samplePatients;
  }

  getSession(sessionId: string): InteractiveSession | undefined {
    return this.sessions.get(sessionId);
  }

  getAllSessions(): InteractiveSession[] {
    return Array.from(this.sessions.values());
  }
}

export const interactivePatientSystem = new InteractivePatientSystem();
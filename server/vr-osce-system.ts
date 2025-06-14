import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Virtual Reality OSCE System
export interface VRStation {
  id: string;
  title: string;
  type: 'history-taking' | 'physical-examination' | 'communication' | 'procedural-skills' | 'emergency';
  difficulty: 'foundation' | 'intermediate' | 'advanced';
  duration: number;
  environment: VREnvironment;
  patient: VirtualPatient;
  objectives: LearningObjective[];
  assessmentCriteria: AssessmentCriterion[];
  realTimeTracking: PerformanceMetric[];
}

export interface VREnvironment {
  setting: 'consultation-room' | 'emergency-department' | 'ward' | 'clinic' | 'home-visit';
  lighting: 'bright' | 'dim' | 'natural' | 'clinical';
  ambientSounds: string[];
  interactiveObjects: VRObject[];
  spatialConstraints: {
    movementArea: { width: number; height: number; depth: number };
    accessibleEquipment: string[];
    patientPosition: { x: number; y: number; z: number };
  };
}

export interface VirtualPatient {
  id: string;
  demographics: {
    age: number;
    gender: string;
    ethnicity: string;
    occupation: string;
    location: string;
  };
  presentation: {
    chiefComplaint: string;
    historyOfPresentingComplaint: string;
    pastMedicalHistory: string[];
    medications: string[];
    allergies: string[];
    socialHistory: string;
    familyHistory: string[];
  };
  physicalFindings: {
    generalAppearance: string;
    vitalSigns: VitalSigns;
    systemicExamination: Record<string, ExaminationFinding>;
  };
  psychologicalProfile: {
    anxietyLevel: number;
    cooperationLevel: number;
    communicationStyle: 'direct' | 'hesitant' | 'verbose' | 'defensive';
    culturalConsiderations: string[];
  };
  aiPersonality: {
    responsePatterns: ResponsePattern[];
    emotionalStates: EmotionalState[];
    conversationFlow: ConversationNode[];
  };
}

export interface VitalSigns {
  heartRate: number;
  bloodPressure: { systolic: number; diastolic: number };
  respiratoryRate: number;
  temperature: number;
  oxygenSaturation: number;
  consciousnessLevel: string;
}

export interface ExaminationFinding {
  normal: boolean;
  findings: string[];
  severity: 'mild' | 'moderate' | 'severe';
  location: string[];
  reproducible: boolean;
}

export interface ResponsePattern {
  trigger: string;
  responses: string[];
  emotionalTone: 'neutral' | 'anxious' | 'frustrated' | 'cooperative' | 'defensive';
  followUpQuestions: string[];
}

export interface EmotionalState {
  emotion: string;
  intensity: number;
  triggers: string[];
  duration: number;
  physicalManifestations: string[];
}

export interface ConversationNode {
  id: string;
  patientStatement: string;
  expectedDoctorResponses: string[];
  scoringWeight: number;
  nextNodes: string[];
  clinicalRelevance: 'critical' | 'important' | 'supportive';
}

export interface LearningObjective {
  id: string;
  description: string;
  competencyArea: 'clinical-skills' | 'communication' | 'professionalism' | 'patient-safety';
  measurable: boolean;
  timeToComplete: number;
  difficulty: number;
}

export interface AssessmentCriterion {
  id: string;
  category: string;
  description: string;
  maxPoints: number;
  passingThreshold: number;
  realTimeIndicators: string[];
}

export interface PerformanceMetric {
  metric: string;
  currentValue: number;
  targetValue: number;
  trend: 'improving' | 'stable' | 'declining';
  lastUpdated: Date;
}

export interface VRObject {
  id: string;
  name: string;
  type: 'equipment' | 'furniture' | 'medical-device' | 'document';
  interactionType: 'grab' | 'touch' | 'examine' | 'operate';
  position: { x: number; y: number; z: number };
  state: Record<string, any>;
  clinicalUse: string[];
}

export class VROSCESystem {
  // Generate Dynamic VR Station
  async generateVRStation(specialty: string, difficulty: string, duration: number): Promise<VRStation> {
    const prompt = `Create a comprehensive Virtual Reality OSCE station for ${specialty} at ${difficulty} level, duration ${duration} minutes.

Design a realistic clinical scenario that includes:
1. Detailed virtual environment with appropriate setting and equipment
2. AI-powered virtual patient with complex medical history and personality
3. Specific learning objectives aligned with UK medical standards
4. Real-time assessment criteria and performance tracking
5. Interactive elements that respond to student actions

The station should test:
- Clinical reasoning and decision-making
- Communication skills and bedside manner  
- Physical examination techniques
- Professional behavior and ethics
- Emergency response if applicable

Make the scenario challenging but fair, with multiple valid approaches to success.`;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a medical education technology expert designing cutting-edge VR OSCE stations that provide immersive, realistic clinical training experiences."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.6
      });

      const stationData = JSON.parse(response.choices[0].message.content || '{}');
      return this.parseVRStation(stationData);
    } catch (error) {
      console.error('Error generating VR station:', error);
      throw new Error('Failed to generate VR station');
    }
  }

  // AI Patient Actor System
  async generatePatientResponse(
    patientId: string,
    doctorInput: string,
    conversationContext: string[],
    currentEmotionalState: string
  ): Promise<{
    response: string;
    emotionalChange: string;
    physicalCues: string[];
    clinicalHints: string[];
    nextSuggestions: string[];
  }> {
    const prompt = `You are an AI-powered virtual patient in a medical OSCE station. Generate a realistic response to the doctor's input.

Patient Context: ${patientId}
Doctor's Input: "${doctorInput}"
Conversation History: ${conversationContext.join(' -> ')}
Current Emotional State: ${currentEmotionalState}

Generate a response that:
1. Maintains character consistency and medical accuracy
2. Responds appropriately to the doctor's communication style
3. Reveals clinical information based on questioning quality
4. Shows realistic emotional responses and physical cues
5. Provides subtle hints for learning without being obvious

The response should feel natural and help assess the doctor's clinical and communication skills.`;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a sophisticated AI patient actor that provides realistic, educational interactions for medical training. Your responses should be medically accurate, emotionally authentic, and educationally valuable."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.7
      });

      return JSON.parse(response.choices[0].message.content || '{}');
    } catch (error) {
      console.error('Error generating patient response:', error);
      return {
        response: "I'm not feeling well, doctor.",
        emotionalChange: "neutral",
        physicalCues: [],
        clinicalHints: [],
        nextSuggestions: []
      };
    }
  }

  // Real-time Performance Analysis
  async analyzePerformance(
    stationId: string,
    studentActions: any[],
    timeElapsed: number,
    conversationData: any[]
  ): Promise<{
    currentScore: number;
    strengthAreas: string[];
    improvementAreas: string[];
    realTimeFeedback: string;
    suggestedActions: string[];
    confidenceLevel: number;
  }> {
    const prompt = `Analyze this medical student's real-time performance in VR OSCE station.

Station: ${stationId}
Time Elapsed: ${timeElapsed} minutes
Student Actions: ${JSON.stringify(studentActions)}
Conversation Data: ${JSON.stringify(conversationData)}

Evaluate:
1. Clinical reasoning and decision-making
2. Communication effectiveness and empathy
3. Physical examination technique and thoroughness
4. Time management and efficiency
5. Professional behavior and patient safety

Provide immediate, constructive feedback that guides improvement without revealing answers.`;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a medical education assessor providing real-time performance analysis for VR OSCE training. Your feedback should be immediate, specific, and educational."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.4
      });

      return JSON.parse(response.choices[0].message.content || '{}');
    } catch (error) {
      console.error('Error analyzing performance:', error);
      return {
        currentScore: 0,
        strengthAreas: [],
        improvementAreas: [],
        realTimeFeedback: "Continue with your assessment",
        suggestedActions: [],
        confidenceLevel: 0
      };
    }
  }

  // Adaptive Scenario Modification
  async adaptScenario(
    currentStation: VRStation,
    studentPerformance: any,
    timeRemaining: number
  ): Promise<{
    modifications: any[];
    difficultyAdjustment: number;
    newObjectives: string[];
    environmentChanges: any[];
  }> {
    const prompt = `Adapt this VR OSCE station based on student performance.

Current Station: ${JSON.stringify(currentStation)}
Student Performance: ${JSON.stringify(studentPerformance)}
Time Remaining: ${timeRemaining} minutes

Modifications should:
1. Maintain educational value and realism
2. Adjust difficulty based on student capability
3. Introduce new challenges or simplify if needed
4. Keep the scenario clinically relevant
5. Provide appropriate learning opportunities

Suggest specific changes to patient responses, environmental factors, or available information.`;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are an adaptive learning system that modifies VR medical training scenarios in real-time to optimize educational outcomes."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.5
      });

      return JSON.parse(response.choices[0].message.content || '{}');
    } catch (error) {
      console.error('Error adapting scenario:', error);
      return {
        modifications: [],
        difficultyAdjustment: 0,
        newObjectives: [],
        environmentChanges: []
      };
    }
  }

  // Multi-User Collaborative Sessions
  async createCollaborativeSession(
    participants: string[],
    scenario: string,
    roles: Record<string, string>
  ): Promise<{
    sessionId: string;
    roleAssignments: Record<string, any>;
    collaborationObjectives: string[];
    communicationProtocols: any[];
    assessmentMethod: string;
  }> {
    const prompt = `Create a collaborative VR OSCE session for multiple participants.

Participants: ${participants.join(', ')}
Scenario: ${scenario}
Role Assignments: ${JSON.stringify(roles)}

Design a session that:
1. Assigns specific roles and responsibilities
2. Creates interdisciplinary collaboration opportunities
3. Includes clear communication protocols
4. Provides individual and team assessment criteria
5. Simulates realistic healthcare team dynamics

Focus on teamwork, leadership, and professional communication skills.`;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are designing collaborative medical training experiences that simulate real healthcare team dynamics and interdisciplinary communication."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.6
      });

      return JSON.parse(response.choices[0].message.content || '{}');
    } catch (error) {
      console.error('Error creating collaborative session:', error);
      return {
        sessionId: `session_${Date.now()}`,
        roleAssignments: {},
        collaborationObjectives: [],
        communicationProtocols: [],
        assessmentMethod: 'peer-evaluation'
      };
    }
  }

  private parseVRStation(data: any): VRStation {
    return {
      id: data.id || `vr_station_${Date.now()}`,
      title: data.title || 'VR OSCE Station',
      type: data.type || 'history-taking',
      difficulty: data.difficulty || 'intermediate',
      duration: data.duration || 15,
      environment: data.environment || {},
      patient: data.patient || {},
      objectives: data.objectives || [],
      assessmentCriteria: data.assessmentCriteria || [],
      realTimeTracking: data.realTimeTracking || []
    };
  }
}

export const vrOSCE = new VROSCESystem();
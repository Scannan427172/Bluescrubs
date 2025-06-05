// Virtual Reality Clinical Scenarios for Immersive PLAB Training
// 3D hospital ward simulations and cultural communication scenarios

export interface VRScenario {
  id: string;
  title: string;
  description: string;
  type: 'ward-simulation' | 'anatomy-practice' | 'cultural-communication' | 'emergency-response';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // minutes
  category: string;
  vrEnvironment: {
    setting: string;
    props: string[];
    characters: VRCharacter[];
    interactions: VRInteraction[];
  };
  learningObjectives: string[];
  assessmentCriteria: {
    clinicalSkills: string[];
    communication: string[];
    professionalism: string[];
    culturalSensitivity: string[];
  };
  prerequisites: string[];
  completionRewards: {
    points: number;
    certificates: string[];
    badges: string[];
  };
}

export interface VRCharacter {
  id: string;
  name: string;
  role: 'patient' | 'colleague' | 'supervisor' | 'family-member';
  demographics: {
    age: number;
    gender: string;
    ethnicity: string;
    language: string;
    culturalBackground: string;
  };
  personality: {
    traits: string[];
    communicationStyle: string;
    concerns: string[];
  };
  medicalCondition?: {
    diagnosis: string;
    symptoms: string[];
    severity: string;
    complications: string[];
  };
  dialogue: {
    initial: string;
    responses: { trigger: string; response: string }[];
    reactions: { action: string; reaction: string }[];
  };
}

export interface VRInteraction {
  id: string;
  type: 'examination' | 'conversation' | 'procedure' | 'documentation';
  trigger: string;
  description: string;
  requiredActions: string[];
  feedback: {
    correct: string;
    incorrect: string;
    hints: string[];
  };
  scoring: {
    maxPoints: number;
    deductionRules: { action: string; points: number }[];
  };
}

export interface VRSession {
  id: string;
  userId: number;
  scenarioId: string;
  startTime: Date;
  endTime?: Date;
  status: 'active' | 'completed' | 'paused' | 'failed';
  progress: {
    currentStep: number;
    totalSteps: number;
    completedInteractions: string[];
    score: number;
    maxScore: number;
  };
  performance: {
    clinicalSkills: number;
    communication: number;
    professionalism: number;
    culturalSensitivity: number;
    timeEfficiency: number;
  };
  feedback: string[];
  replay: {
    enabled: boolean;
    recordingUrl?: string;
    keyMoments: { timestamp: number; description: string; score: number }[];
  };
}

export interface AnatomyVRModule {
  id: string;
  bodySystem: string;
  title: string;
  description: string;
  anatomicalStructures: {
    name: string;
    description: string;
    function: string;
    clinicalRelevance: string;
    interactions: string[];
  }[];
  examinations: {
    technique: string;
    steps: string[];
    normalFindings: string[];
    abnormalFindings: string[];
    clinicalSignificance: string[];
  }[];
  case Studies: {
    patientPresentation: string;
    relevantAnatomy: string[];
    diagnosticApproach: string[];
    learningPoints: string[];
  }[];
}

export class VRClinicalEngine {
  
  // Get available VR scenarios
  async getAvailableScenarios(criteria: {
    type?: string;
    difficulty?: string;
    category?: string;
    userId: number;
  }): Promise<VRScenario[]> {
    
    const scenarios: VRScenario[] = [
      {
        id: "vr_ward_001",
        title: "NHS Medical Ward Round",
        description: "Join a consultant-led ward round in a busy NHS medical ward. Practice communication with diverse patients and learn UK clinical protocols.",
        type: "ward-simulation",
        difficulty: "intermediate",
        duration: 45,
        category: "General Medicine",
        vrEnvironment: {
          setting: "NHS Medical Ward - 6-bed bay with side rooms",
          props: ["Hospital beds", "Patient charts", "Medical equipment", "Hand sanitizer stations", "Privacy curtains"],
          characters: [
            {
              id: "patient_001",
              name: "Mrs. Fatima Al-Zahra",
              role: "patient",
              demographics: {
                age: 67,
                gender: "Female",
                ethnicity: "Arab",
                language: "Arabic/English",
                culturalBackground: "Middle Eastern Muslim"
              },
              personality: {
                traits: ["Anxious", "Religious", "Family-oriented"],
                communicationStyle: "Soft-spoken, prefers indirect communication",
                concerns: ["Pain management", "Modesty", "Family involvement"]
              },
              medicalCondition: {
                diagnosis: "Type 2 Diabetes with diabetic nephropathy",
                symptoms: ["Fatigue", "Swollen ankles", "Frequent urination"],
                severity: "Moderate",
                complications: ["Early kidney disease"]
              },
              dialogue: {
                initial: "Doctor, I am worried about my kidneys. My family says diabetes runs in our blood.",
                responses: [
                  { trigger: "greeting", response: "Assalamu alaikum, thank you for seeing me doctor." },
                  { trigger: "pain_inquiry", response: "The pain is bearable, but I worry about my future." }
                ],
                reactions: [
                  { action: "respectful_greeting", reaction: "Smiles and relaxes slightly" },
                  { action: "cultural_insensitivity", reaction: "Becomes withdrawn and anxious" }
                ]
              }
            }
          ],
          interactions: [
            {
              id: "cultural_greeting",
              type: "conversation",
              trigger: "Patient encounter begins",
              description: "Greet the patient appropriately considering cultural background",
              requiredActions: ["Respectful greeting", "Introduction", "Permission to examine"],
              feedback: {
                correct: "Excellent cultural sensitivity. You acknowledged her greeting and showed respect.",
                incorrect: "Consider the patient's cultural background when greeting. A respectful acknowledgment goes a long way.",
                hints: ["Notice the patient's greeting style", "Ask permission before physical examination"]
              },
              scoring: {
                maxPoints: 10,
                deductionRules: [
                  { action: "ignoring_cultural_cues", points: -5 },
                  { action: "inappropriate_physical_contact", points: -3 }
                ]
              }
            }
          ]
        },
        learningObjectives: [
          "Practice culturally sensitive patient communication",
          "Learn NHS ward round protocols",
          "Develop clinical reasoning in diverse patient populations",
          "Understand family dynamics in healthcare decisions"
        ],
        assessmentCriteria: {
          clinicalSkills: ["History taking", "Physical examination", "Clinical reasoning"],
          communication: ["Cultural sensitivity", "Clear explanation", "Active listening"],
          professionalism: ["Respectful behavior", "Time management", "Team collaboration"],
          culturalSensitivity: ["Religious considerations", "Language barriers", "Family involvement"]
        },
        prerequisites: ["Basic communication skills", "Medical history taking"],
        completionRewards: {
          points: 100,
          certificates: ["Cultural Competency in Healthcare"],
          badges: ["Diversity Champion", "NHS Ready"]
        }
      },
      {
        id: "vr_emergency_001",
        title: "A&E Trauma Response",
        description: "Respond to a multi-trauma patient in a busy emergency department. Practice rapid assessment and team communication.",
        type: "emergency-response",
        difficulty: "advanced",
        duration: 30,
        category: "Emergency Medicine",
        vrEnvironment: {
          setting: "NHS Emergency Department - Resuscitation bay",
          props: ["Trauma trolley", "Monitoring equipment", "Defibrillator", "Intubation kit", "Blood products"],
          characters: [
            {
              id: "trauma_patient",
              name: "John Miller",
              role: "patient",
              demographics: {
                age: 28,
                gender: "Male",
                ethnicity: "Caucasian",
                language: "English",
                culturalBackground: "British"
              },
              personality: {
                traits: ["Unconscious", "Critical condition"],
                communicationStyle: "Non-responsive",
                concerns: ["Life-threatening injuries"]
              },
              medicalCondition: {
                diagnosis: "Multi-trauma from RTC",
                symptoms: ["Unconscious", "Hypotensive", "Tachycardic", "Abdominal distension"],
                severity: "Critical",
                complications: ["Possible internal bleeding", "Head injury"]
              },
              dialogue: {
                initial: "Patient is unconscious and unresponsive",
                responses: [],
                reactions: [
                  { action: "rapid_assessment", reaction: "Vital signs respond to interventions" },
                  { action: "delayed_response", reaction: "Condition deteriorates" }
                ]
              }
            }
          ],
          interactions: [
            {
              id: "primary_survey",
              type: "examination",
              trigger: "Patient arrival",
              description: "Perform rapid ABCDE assessment",
              requiredActions: ["Airway assessment", "Breathing check", "Circulation assessment", "Disability check", "Exposure"],
              feedback: {
                correct: "Excellent primary survey. You followed ATLS protocols systematically.",
                incorrect: "Remember the ABCDE approach for trauma patients. Each step is critical.",
                hints: ["Start with airway", "Check for catastrophic hemorrhage", "Assess neurological status"]
              },
              scoring: {
                maxPoints: 20,
                deductionRules: [
                  { action: "missed_airway_issue", points: -10 },
                  { action: "wrong_sequence", points: -5 }
                ]
              }
            }
          ]
        },
        learningObjectives: [
          "Master ABCDE trauma assessment",
          "Practice emergency team communication",
          "Learn UK emergency protocols",
          "Develop crisis management skills"
        ],
        assessmentCriteria: {
          clinicalSkills: ["Rapid assessment", "Prioritisation", "Procedure skills"],
          communication: ["Team coordination", "Clear instructions", "Handover skills"],
          professionalism: ["Calm under pressure", "Leadership", "Decision making"],
          culturalSensitivity: ["Family communication", "Breaking bad news"]
        },
        prerequisites: ["ABCDE assessment knowledge", "Basic life support"],
        completionRewards: {
          points: 150,
          certificates: ["Emergency Response Competency"],
          badges: ["Trauma Hero", "Life Saver"]
        }
      }
    ];

    return scenarios.filter(scenario => {
      if (criteria.type && scenario.type !== criteria.type) return false;
      if (criteria.difficulty && scenario.difficulty !== criteria.difficulty) return false;
      if (criteria.category && scenario.category !== criteria.category) return false;
      return true;
    });
  }

  // Start VR session
  async startVRSession(sessionData: {
    userId: number;
    scenarioId: string;
    vrSettings: {
      resolution: string;
      audioEnabled: boolean;
      hapticsEnabled: boolean;
      recordingEnabled: boolean;
    };
  }): Promise<VRSession> {
    
    const sessionId = `vr_session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const scenario = await this.getScenarioById(sessionData.scenarioId);
    
    const session: VRSession = {
      id: sessionId,
      userId: sessionData.userId,
      scenarioId: sessionData.scenarioId,
      startTime: new Date(),
      status: 'active',
      progress: {
        currentStep: 0,
        totalSteps: scenario.vrEnvironment.interactions.length,
        completedInteractions: [],
        score: 0,
        maxScore: scenario.vrEnvironment.interactions.reduce((sum, interaction) => sum + interaction.scoring.maxPoints, 0)
      },
      performance: {
        clinicalSkills: 0,
        communication: 0,
        professionalism: 0,
        culturalSensitivity: 0,
        timeEfficiency: 0
      },
      feedback: [],
      replay: {
        enabled: sessionData.vrSettings.recordingEnabled,
        keyMoments: []
      }
    };

    return session;
  }

  // Generate 3D anatomy modules
  async generateAnatomyModule(bodySystem: string): Promise<AnatomyVRModule> {
    
    const anatomyModules = {
      cardiovascular: {
        id: "anatomy_cardio_001",
        bodySystem: "Cardiovascular System",
        title: "Heart and Circulation VR Experience",
        description: "Explore the heart's structure and function in interactive 3D",
        anatomicalStructures: [
          {
            name: "Left Ventricle",
            description: "Main pumping chamber of the heart",
            function: "Pumps oxygenated blood to systemic circulation",
            clinicalRelevance: "Site of myocardial infarction in most heart attacks",
            interactions: ["Palpate apex beat", "Auscultate mitral valve", "Assess wall motion"]
          },
          {
            name: "Coronary Arteries",
            description: "Blood vessels supplying the heart muscle",
            function: "Deliver oxygen and nutrients to myocardium",
            clinicalRelevance: "Blockage causes myocardial infarction",
            interactions: ["Trace vessel pathways", "Identify stenosis", "Plan intervention"]
          }
        ],
        examinations: [
          {
            technique: "Cardiac Auscultation",
            steps: ["Position patient", "Place stethoscope", "Listen systematically", "Identify sounds"],
            normalFindings: ["S1 and S2 clearly audible", "No murmurs", "Regular rhythm"],
            abnormalFindings: ["Murmurs", "Gallop sounds", "Irregular rhythm"],
            clinicalSignificance: ["Valve disease", "Heart failure", "Arrhythmias"]
          }
        ],
        caseStudies: [
          {
            patientPresentation: "45-year-old with chest pain and shortness of breath",
            relevantAnatomy: ["Coronary circulation", "Left ventricle", "Pulmonary vessels"],
            diagnosticApproach: ["ECG analysis", "Cardiac enzymes", "Echocardiogram"],
            learningPoints: ["STEMI recognition", "Door-to-balloon time", "Post-MI care"]
          }
        ]
      }
    };

    return anatomyModules[bodySystem as keyof typeof anatomyModules] || anatomyModules.cardiovascular;
  }

  // Complete VR session with performance analysis
  async completeVRSession(sessionId: string, finalData: {
    completedInteractions: string[];
    totalScore: number;
    timeSpent: number;
    userActions: { timestamp: number; action: string; success: boolean }[];
  }): Promise<{
    session: VRSession;
    certificate?: string;
    recommendations: string[];
  }> {
    
    // Calculate performance metrics
    const performance = this.calculateVRPerformance(finalData);
    
    // Generate completion certificate if criteria met
    const certificate = performance.overallScore >= 80 ? 
      `VR Clinical Competency Certificate - ${new Date().toISOString()}` : undefined;
    
    // Generate personalised recommendations
    const recommendations = this.generateVRRecommendations(performance);
    
    const completedSession: VRSession = {
      id: sessionId,
      userId: 1, // This would be retrieved from session
      scenarioId: "vr_scenario_001",
      startTime: new Date(Date.now() - finalData.timeSpent * 60000),
      endTime: new Date(),
      status: 'completed',
      progress: {
        currentStep: finalData.completedInteractions.length,
        totalSteps: finalData.completedInteractions.length,
        completedInteractions: finalData.completedInteractions,
        score: finalData.totalScore,
        maxScore: 100
      },
      performance: {
        clinicalSkills: performance.clinicalSkills,
        communication: performance.communication,
        professionalism: performance.professionalism,
        culturalSensitivity: performance.culturalSensitivity,
        timeEfficiency: performance.timeEfficiency
      },
      feedback: performance.feedback,
      replay: {
        enabled: true,
        keyMoments: finalData.userActions.filter(action => action.success).map(action => ({
          timestamp: action.timestamp,
          description: action.action,
          score: 10
        }))
      }
    };

    return {
      session: completedSession,
      certificate,
      recommendations
    };
  }

  // Get VR hardware requirements
  getVRRequirements(): {
    minimum: any;
    recommended: any;
    supported_devices: string[];
  } {
    return {
      minimum: {
        headset: "Oculus Quest 2 or equivalent",
        memory: "8GB RAM",
        graphics: "GTX 1060 / RX 580",
        storage: "5GB available space",
        internet: "Broadband connection for cloud features"
      },
      recommended: {
        headset: "Meta Quest 3, PICO 4, or PC VR setup",
        memory: "16GB RAM",
        graphics: "RTX 3070 / RX 6700 XT or better",
        storage: "10GB available space",
        internet: "High-speed broadband for 4K streaming"
      },
      supported_devices: [
        "Meta Quest 2/3",
        "PICO 4",
        "HTC Vive",
        "Valve Index",
        "Windows Mixed Reality",
        "Mobile VR (limited features)"
      ]
    };
  }

  // Private helper methods
  private async getScenarioById(scenarioId: string): Promise<VRScenario> {
    const scenarios = await this.getAvailableScenarios({ userId: 1 });
    return scenarios.find(s => s.id === scenarioId) || scenarios[0];
  }

  private calculateVRPerformance(finalData: any): any {
    const successfulActions = finalData.userActions.filter((action: any) => action.success).length;
    const totalActions = finalData.userActions.length;
    const successRate = totalActions > 0 ? (successfulActions / totalActions) * 100 : 0;
    
    return {
      overallScore: Math.round((finalData.totalScore / 100) * 100),
      clinicalSkills: Math.round(successRate * 0.3),
      communication: Math.round(successRate * 0.25),
      professionalism: Math.round(successRate * 0.2),
      culturalSensitivity: Math.round(successRate * 0.15),
      timeEfficiency: Math.round(successRate * 0.1),
      feedback: [
        `Completed ${successfulActions} out of ${totalActions} interactions successfully`,
        `Overall performance: ${successRate.toFixed(1)}%`,
        finalData.totalScore >= 80 ? "Excellent clinical performance!" : "Good effort, focus on key clinical skills"
      ]
    };
  }

  private generateVRRecommendations(performance: any): string[] {
    const recommendations = [];
    
    if (performance.clinicalSkills < 70) {
      recommendations.push("Practice more clinical examination techniques in VR");
    }
    
    if (performance.communication < 70) {
      recommendations.push("Focus on patient communication scenarios");
    }
    
    if (performance.culturalSensitivity < 70) {
      recommendations.push("Complete cultural competency VR modules");
    }
    
    if (recommendations.length === 0) {
      recommendations.push("Excellent performance! Try advanced VR scenarios");
    }
    
    return recommendations;
  }
}
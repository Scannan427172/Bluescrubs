// Advanced Certification Pathways & Professional Development System
// Digital certificates, CPD tracking, and specialty pathway guidance

export interface CertificationPath {
  id: string;
  title: string;
  description: string;
  level: 'foundation' | 'intermediate' | 'advanced' | 'specialist';
  category: string;
  prerequisites: string[];
  modules: CertificationModule[];
  assessments: Assessment[];
  duration: number; // hours
  cpdPoints: number;
  accreditation: {
    body: string;
    recognised: boolean;
    validityPeriod: number; // months
  };
  completionRewards: {
    digitalCertificate: boolean;
    badge: string;
    verifiableCredentials: boolean;
    portfolioPoints: number;
  };
}

export interface CertificationModule {
  id: string;
  title: string;
  description: string;
  content: {
    type: 'video' | 'interactive' | 'reading' | 'simulation';
    url: string;
    duration: number;
    transcript?: string;
  }[];
  learningObjectives: string[];
  selfAssessment: {
    questions: SelfAssessmentQuestion[];
    passingScore: number;
  };
  practicalExercises: {
    title: string;
    instructions: string;
    submissionFormat: 'text' | 'video' | 'file';
    rubric: AssessmentRubric;
  }[];
}

export interface SelfAssessmentQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  difficulty: string;
}

export interface Assessment {
  id: string;
  title: string;
  type: 'written-exam' | 'practical-assessment' | 'portfolio-review' | 'peer-evaluation';
  timeLimit: number; // minutes
  attempts: number;
  passingScore: number;
  questions: AssessmentQuestion[];
  rubric: AssessmentRubric;
  scheduling: {
    available: boolean;
    bookingRequired: boolean;
    assessorRequired: boolean;
  };
}

export interface AssessmentQuestion {
  id: string;
  content: string;
  type: 'mcq' | 'essay' | 'case-study' | 'osce-station';
  points: number;
  timeAllocation: number;
  materials?: string[];
  expectedResponse: {
    keyPoints: string[];
    rubric: string[];
    sampleAnswer?: string;
  };
}

export interface AssessmentRubric {
  criteria: {
    name: string;
    description: string;
    levels: {
      level: string;
      score: number;
      description: string;
    }[];
  }[];
  overallGrading: {
    excellent: { min: number; max: number };
    good: { min: number; max: number };
    satisfactory: { min: number; max: number };
    needsImprovement: { min: number; max: number };
  };
}

export interface UserCertification {
  id: string;
  userId: number;
  pathwayId: string;
  status: 'enrolled' | 'in-progress' | 'completed' | 'expired';
  enrollmentDate: Date;
  completionDate?: Date;
  progress: {
    modulesCompleted: string[];
    assessmentsPassed: string[];
    currentModule: string;
    overallPercentage: number;
  };
  grades: {
    moduleId: string;
    score: number;
    grade: string;
    attempts: number;
    completedAt: Date;
  }[];
  digitalCertificate?: {
    certificateId: string;
    issueDate: Date;
    verificationCode: string;
    downloadUrl: string;
    blockchainHash?: string;
  };
  cpdRecord: {
    pointsEarned: number;
    activitiesCompleted: string[];
    verificationStatus: 'verified' | 'pending' | 'rejected';
  };
}

export interface TutorMarketplace {
  id: string;
  tutorId: number;
  profile: {
    name: string;
    qualifications: string[];
    specialties: string[];
    languages: string[];
    experience: number;
    rating: number;
    totalSessions: number;
    successRate: number;
    verificationStatus: 'verified' | 'pending' | 'rejected';
    backgroundCheck: boolean;
    profileImage: string;
    bio: string;
  };
  services: TutorService[];
  availability: {
    timezone: string;
    schedule: {
      dayOfWeek: number;
      startTime: string;
      endTime: string;
      available: boolean;
    }[];
    bookingWindow: number; // days in advance
    cancellationPolicy: string;
  };
  pricing: {
    hourlyRate: number;
    packageDeals: {
      sessions: number;
      discount: number;
      price: number;
    }[];
    specialRates: {
      service: string;
      rate: number;
    }[];
  };
  reviews: TutorReview[];
  analytics: {
    totalEarnings: number;
    monthlyBookings: number;
    studentRetentionRate: number;
    responseTime: number; // hours
  };
}

export interface TutorService {
  id: string;
  name: string;
  description: string;
  category: 'one-on-one' | 'group-session' | 'essay-review' | 'mock-exam' | 'career-guidance';
  duration: number; // minutes
  maxStudents: number;
  price: number;
  materials: string[];
  learningOutcomes: string[];
  requirements: string[];
}

export interface TutorReview {
  id: string;
  studentId: number;
  sessionId: string;
  rating: number;
  review: string;
  categories: {
    knowledge: number;
    communication: number;
    punctuality: number;
    helpfulness: number;
  };
  date: Date;
  verified: boolean;
  response?: {
    tutorReply: string;
    replyDate: Date;
  };
}

export class CertificationEngine {
  
  // Get available certification pathways
  async getAvailablePathways(criteria: {
    level?: string;
    category?: string;
    userId: number;
  }): Promise<CertificationPath[]> {
    
    const pathways: CertificationPath[] = [
      {
        id: "cert_plab_foundation",
        title: "PLAB Foundation Certificate",
        description: "Comprehensive foundation-level certification covering core PLAB 1 and PLAB 2 competencies",
        level: "foundation",
        category: "PLAB Preparation",
        prerequisites: ["Basic medical knowledge", "English proficiency"],
        modules: [
          {
            id: "module_anatomy",
            title: "Clinical Anatomy and Physiology",
            description: "Essential anatomy and physiology for PLAB examinations",
            content: [
              {
                type: "interactive",
                url: "/content/anatomy-3d",
                duration: 120,
                transcript: "Interactive 3D anatomy exploration with clinical correlations"
              },
              {
                type: "video",
                url: "/content/physiology-lectures",
                duration: 180,
                transcript: "Comprehensive physiology lectures with PLAB focus"
              }
            ],
            learningObjectives: [
              "Identify anatomical structures relevant to PLAB",
              "Understand physiological processes",
              "Apply knowledge to clinical scenarios"
            ],
            selfAssessment: {
              questions: [
                {
                  id: "q1",
                  question: "Which chamber of the heart has the thickest muscular wall?",
                  type: "multiple-choice",
                  options: ["Right atrium", "Left atrium", "Right ventricle", "Left ventricle"],
                  correctAnswer: "Left ventricle",
                  explanation: "The left ventricle has the thickest wall as it pumps blood to the entire systemic circulation",
                  difficulty: "intermediate"
                }
              ],
              passingScore: 80
            },
            practicalExercises: [
              {
                title: "Virtual Heart Examination",
                instructions: "Perform a complete cardiac examination using our VR simulator",
                submissionFormat: "video",
                rubric: {
                  criteria: [
                    {
                      name: "Technique",
                      description: "Proper examination technique",
                      levels: [
                        { level: "Excellent", score: 4, description: "Perfect technique with no errors" },
                        { level: "Good", score: 3, description: "Minor technique errors" }
                      ]
                    }
                  ],
                  overallGrading: {
                    excellent: { min: 90, max: 100 },
                    good: { min: 80, max: 89 },
                    satisfactory: { min: 70, max: 79 },
                    needsImprovement: { min: 0, max: 69 }
                  }
                }
              }
            ]
          }
        ],
        assessments: [
          {
            id: "final_assessment",
            title: "PLAB Foundation Final Assessment",
            type: "written-exam",
            timeLimit: 180,
            attempts: 3,
            passingScore: 75,
            questions: [
              {
                id: "fa_q1",
                content: "A 45-year-old patient presents with chest pain. Describe your approach to assessment.",
                type: "essay",
                points: 25,
                timeAllocation: 30,
                expectedResponse: {
                  keyPoints: ["History taking", "Physical examination", "Investigations", "Differential diagnosis"],
                  rubric: ["Clinical reasoning", "Systematic approach", "Patient safety"],
                  sampleAnswer: "Begin with focused history taking including pain characteristics..."
                }
              }
            ],
            rubric: {
              criteria: [
                {
                  name: "Clinical Knowledge",
                  description: "Accuracy and depth of medical knowledge",
                  levels: [
                    { level: "Excellent", score: 4, description: "Comprehensive and accurate knowledge" },
                    { level: "Good", score: 3, description: "Good knowledge with minor gaps" }
                  ]
                }
              ],
              overallGrading: {
                excellent: { min: 85, max: 100 },
                good: { min: 75, max: 84 },
                satisfactory: { min: 65, max: 74 },
                needsImprovement: { min: 0, max: 64 }
              }
            },
            scheduling: {
              available: true,
              bookingRequired: true,
              assessorRequired: false
            }
          }
        ],
        duration: 40,
        cpdPoints: 15,
        accreditation: {
          body: "Royal College of Physicians",
          recognised: true,
          validityPeriod: 24
        },
        completionRewards: {
          digitalCertificate: true,
          badge: "PLAB Foundation Graduate",
          verifiableCredentials: true,
          portfolioPoints: 100
        }
      },
      {
        id: "cert_clinical_communication",
        title: "Clinical Communication Excellence",
        description: "Advanced certification in patient communication and professional interactions",
        level: "advanced",
        category: "Professional Skills",
        prerequisites: ["PLAB Foundation Certificate", "6 months clinical experience"],
        modules: [
          {
            id: "module_communication",
            title: "Patient Communication Mastery",
            description: "Advanced patient communication skills for diverse populations",
            content: [
              {
                type: "simulation",
                url: "/vr/communication-scenarios",
                duration: 240,
                transcript: "VR communication scenarios with diverse patient backgrounds"
              }
            ],
            learningObjectives: [
              "Master culturally sensitive communication",
              "Handle difficult conversations",
              "Break bad news effectively"
            ],
            selfAssessment: {
              questions: [
                {
                  id: "comm_q1",
                  question: "When breaking bad news, which approach is most appropriate?",
                  type: "multiple-choice",
                  options: ["Direct and quick", "Graduated disclosure", "Written only", "Via family"],
                  correctAnswer: "Graduated disclosure",
                  explanation: "Graduated disclosure allows patients to process information at their own pace",
                  difficulty: "advanced"
                }
              ],
              passingScore: 85
            },
            practicalExercises: [
              {
                title: "Breaking Bad News Simulation",
                instructions: "Demonstrate breaking bad news to a patient with cancer diagnosis",
                submissionFormat: "video",
                rubric: {
                  criteria: [
                    {
                      name: "Empathy",
                      description: "Demonstration of empathetic communication",
                      levels: [
                        { level: "Excellent", score: 4, description: "Exceptional empathy and emotional intelligence" }
                      ]
                    }
                  ],
                  overallGrading: {
                    excellent: { min: 90, max: 100 },
                    good: { min: 80, max: 89 },
                    satisfactory: { min: 70, max: 79 },
                    needsImprovement: { min: 0, max: 69 }
                  }
                }
              }
            ]
          }
        ],
        assessments: [
          {
            id: "comm_practical",
            title: "Communication Skills OSCE",
            type: "practical-assessment",
            timeLimit: 120,
            attempts: 2,
            passingScore: 80,
            questions: [
              {
                id: "osce_station1",
                content: "Station 1: Breaking bad news - Cancer diagnosis",
                type: "osce-station",
                points: 50,
                timeAllocation: 15,
                materials: ["Patient notes", "Investigation results"],
                expectedResponse: {
                  keyPoints: ["Preparation", "Graduated disclosure", "Emotional support", "Follow-up plan"],
                  rubric: ["Communication skills", "Empathy", "Information delivery", "Patient support"]
                }
              }
            ],
            rubric: {
              criteria: [
                {
                  name: "Communication Skills",
                  description: "Verbal and non-verbal communication effectiveness",
                  levels: [
                    { level: "Excellent", score: 4, description: "Outstanding communication throughout" }
                  ]
                }
              ],
              overallGrading: {
                excellent: { min: 90, max: 100 },
                good: { min: 80, max: 89 },
                satisfactory: { min: 70, max: 79 },
                needsImprovement: { min: 0, max: 69 }
              }
            },
            scheduling: {
              available: true,
              bookingRequired: true,
              assessorRequired: true
            }
          }
        ],
        duration: 60,
        cpdPoints: 25,
        accreditation: {
          body: "Academy of Medical Royal Colleges",
          recognised: true,
          validityPeriod: 36
        },
        completionRewards: {
          digitalCertificate: true,
          badge: "Communication Excellence",
          verifiableCredentials: true,
          portfolioPoints: 200
        }
      }
    ];

    return pathways.filter(pathway => {
      if (criteria.level && pathway.level !== criteria.level) return false;
      if (criteria.category && pathway.category !== criteria.category) return false;
      return true;
    });
  }

  // Enroll user in certification pathway
  async enrollUserInPathway(userId: number, pathwayId: string): Promise<UserCertification> {
    const certificationId = `cert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const userCertification: UserCertification = {
      id: certificationId,
      userId,
      pathwayId,
      status: 'enrolled',
      enrollmentDate: new Date(),
      progress: {
        modulesCompleted: [],
        assessmentsPassed: [],
        currentModule: 'module_anatomy',
        overallPercentage: 0
      },
      grades: [],
      cpdRecord: {
        pointsEarned: 0,
        activitiesCompleted: [],
        verificationStatus: 'pending'
      }
    };

    return userCertification;
  }

  // Complete module assessment
  async completeModuleAssessment(certificationId: string, moduleId: string, score: number): Promise<{
    passed: boolean;
    grade: string;
    nextModule?: string;
    certificateEligible: boolean;
  }> {
    const grade = score >= 85 ? 'A' : score >= 75 ? 'B' : score >= 65 ? 'C' : 'F';
    const passed = score >= 65;
    
    return {
      passed,
      grade,
      nextModule: passed ? 'module_communication' : undefined,
      certificateEligible: passed && score >= 80
    };
  }

  // Issue digital certificate
  async issueDigitalCertificate(certificationId: string): Promise<{
    certificateUrl: string;
    verificationCode: string;
    blockchainHash: string;
  }> {
    const verificationCode = `VERIFY_${Date.now()}_${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
    const blockchainHash = `0x${Math.random().toString(16).substr(2, 64)}`;
    
    return {
      certificateUrl: `/certificates/${certificationId}.pdf`,
      verificationCode,
      blockchainHash
    };
  }

  // Get marketplace tutors
  async getMarketplaceTutors(criteria: {
    specialty?: string;
    language?: string;
    rating?: number;
    priceRange?: { min: number; max: number };
  }): Promise<TutorMarketplace[]> {
    
    const tutors: TutorMarketplace[] = [
      {
        id: "tutor_001",
        tutorId: 101,
        profile: {
          name: "Dr. Sarah Thompson",
          qualifications: ["MBBS", "MRCP", "PLAB Examiner"],
          specialties: ["Cardiology", "General Medicine", "OSCE Training"],
          languages: ["English", "French"],
          experience: 10,
          rating: 4.9,
          totalSessions: 245,
          successRate: 94,
          verificationStatus: "verified",
          backgroundCheck: true,
          profileImage: "/tutors/sarah-thompson.jpg",
          bio: "Experienced cardiologist and PLAB examiner with 10 years of tutoring international medical graduates"
        },
        services: [
          {
            id: "service_001",
            name: "PLAB 2 OSCE Practice",
            description: "One-on-one OSCE practice with real-time feedback",
            category: "one-on-one",
            duration: 60,
            maxStudents: 1,
            price: 8000, // £80
            materials: ["OSCE stations", "Feedback forms", "Recording"],
            learningOutcomes: ["Improve OSCE performance", "Build confidence", "Receive detailed feedback"],
            requirements: ["Basic PLAB knowledge", "Webcam and microphone"]
          },
          {
            id: "service_002",
            name: "Cardiology Masterclass",
            description: "Group session covering cardiology for PLAB",
            category: "group-session",
            duration: 90,
            maxStudents: 6,
            price: 3500, // £35 per person
            materials: ["Lecture slides", "Practice questions", "ECG examples"],
            learningOutcomes: ["Master cardiology concepts", "Practice with peers", "Expert guidance"],
            requirements: ["PLAB 1 completion recommended"]
          }
        ],
        availability: {
          timezone: "GMT",
          schedule: [
            { dayOfWeek: 1, startTime: "09:00", endTime: "17:00", available: true },
            { dayOfWeek: 2, startTime: "09:00", endTime: "17:00", available: true },
            { dayOfWeek: 3, startTime: "09:00", endTime: "17:00", available: true }
          ],
          bookingWindow: 14,
          cancellationPolicy: "24 hours notice required for full refund"
        },
        pricing: {
          hourlyRate: 8000,
          packageDeals: [
            { sessions: 5, discount: 10, price: 36000 },
            { sessions: 10, discount: 15, price: 68000 }
          ],
          specialRates: [
            { service: "essay-review", rate: 4000 },
            { service: "mock-exam", rate: 12000 }
          ]
        },
        reviews: [
          {
            id: "review_001",
            studentId: 201,
            sessionId: "session_001",
            rating: 5,
            review: "Excellent tutor! Really helped me understand OSCE techniques and gave detailed feedback.",
            categories: {
              knowledge: 5,
              communication: 5,
              punctuality: 5,
              helpfulness: 5
            },
            date: new Date(),
            verified: true,
            response: {
              tutorReply: "Thank you for the feedback! Keep practicing and you'll do great in PLAB 2.",
              replyDate: new Date()
            }
          }
        ],
        analytics: {
          totalEarnings: 95000,
          monthlyBookings: 18,
          studentRetentionRate: 85,
          responseTime: 2
        }
      }
    ];

    return tutors.filter(tutor => {
      if (criteria.specialty && !tutor.profile.specialties.some(spec => 
        spec.toLowerCase().includes(criteria.specialty!.toLowerCase()))) {
        return false;
      }
      
      if (criteria.language && !tutor.profile.languages.includes(criteria.language)) {
        return false;
      }
      
      if (criteria.rating && tutor.profile.rating < criteria.rating) {
        return false;
      }
      
      if (criteria.priceRange && 
          (tutor.pricing.hourlyRate < criteria.priceRange.min || 
           tutor.pricing.hourlyRate > criteria.priceRange.max)) {
        return false;
      }
      
      return tutor.profile.verificationStatus === "verified";
    });
  }

  // Book tutor session
  async bookTutorSession(booking: {
    tutorId: string;
    serviceId: string;
    studentId: number;
    scheduledTime: Date;
    duration: number;
    notes?: string;
  }): Promise<{
    sessionId: string;
    paymentRequired: number;
    confirmationDetails: any;
  }> {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Get tutor and service details for pricing
    const tutors = await this.getMarketplaceTutors({});
    const tutor = tutors.find(t => t.id === booking.tutorId);
    const service = tutor?.services.find(s => s.id === booking.serviceId);
    
    const paymentRequired = service?.price || 8000;
    
    return {
      sessionId,
      paymentRequired,
      confirmationDetails: {
        tutorName: tutor?.profile.name,
        serviceName: service?.name,
        scheduledTime: booking.scheduledTime,
        duration: booking.duration,
        totalCost: paymentRequired
      }
    };
  }

  // Verify certificate authenticity
  async verifyCertificate(verificationCode: string): Promise<{
    valid: boolean;
    certificateDetails?: any;
    issueDate?: Date;
    expiryDate?: Date;
  }> {
    // Sample verification - in real implementation, check against database/blockchain
    const isValid = verificationCode.startsWith('VERIFY_');
    
    if (isValid) {
      return {
        valid: true,
        certificateDetails: {
          holderName: "Sample Student",
          courseName: "PLAB Foundation Certificate",
          issuer: "NHSprep Education Platform",
          grade: "A"
        },
        issueDate: new Date(),
        expiryDate: new Date(Date.now() + 24 * 30 * 24 * 60 * 60 * 1000) // 24 months
      };
    }
    
    return { valid: false };
  }
}
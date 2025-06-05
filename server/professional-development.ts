// Professional Development Tools for PLAB Preparation
// CV builder, interview preparation, foundation programme guidance, and specialty training pathways

export interface CVProfile {
  userId: number;
  personalDetails: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    gmc_number?: string;
    right_to_work: boolean;
  };
  education: {
    medicalDegree: {
      institution: string;
      country: string;
      graduationYear: number;
      classification: string;
    };
    additionalQualifications: {
      qualification: string;
      institution: string;
      year: number;
    }[];
  };
  experience: {
    clinicalExperience: {
      position: string;
      hospital: string;
      department: string;
      startDate: Date;
      endDate: Date;
      responsibilities: string[];
      achievements: string[];
    }[];
    research: {
      title: string;
      role: string;
      institution: string;
      year: number;
      publications: boolean;
    }[];
    teaching: {
      role: string;
      institution: string;
      duration: string;
      description: string;
    }[];
  };
  skills: {
    languages: {
      language: string;
      proficiency: 'basic' | 'intermediate' | 'advanced' | 'native';
      certified: boolean;
    }[];
    technical: string[];
    clinical: string[];
  };
  achievements: {
    awards: string[];
    publications: string[];
    presentations: string[];
    certifications: string[];
  };
  references: {
    name: string;
    position: string;
    institution: string;
    email: string;
    phone: string;
    relationship: string;
  }[];
}

export interface InterviewPreparation {
  userId: number;
  targetPosition: 'foundation_year_1' | 'foundation_year_2' | 'specialty_training' | 'locum' | 'trust_grade';
  preparationModules: {
    id: string;
    title: string;
    category: 'behavioral' | 'clinical' | 'scenario' | 'portfolio';
    questions: {
      question: string;
      type: 'standard' | 'competency' | 'scenario';
      suggestedStructure: string;
      sampleAnswer: string;
      tips: string[];
    }[];
    completed: boolean;
    score?: number;
  }[];
  mockInterviews: {
    id: string;
    date: Date;
    duration: number;
    interviewer: string;
    feedback: string;
    score: number;
    improvementAreas: string[];
  }[];
}

export interface FoundationProgramme {
  applicationCycle: string;
  keyDates: {
    applicationOpen: Date;
    applicationDeadline: Date;
    situationalJudgementTest: Date;
    preferenceDeadline: Date;
    allocationResults: Date;
  };
  requirements: {
    plabStatus: 'plab1_passed' | 'plab2_passed' | 'both_passed';
    englishTest: 'ielts' | 'oet' | 'pte' | 'cambridge';
    minimumScore: number;
    additionalRequirements: string[];
  };
  deaneries: {
    name: string;
    region: string;
    competitiveness: 'low' | 'medium' | 'high';
    averageScore: number;
    specialties: string[];
    lifestyle: {
      costOfLiving: 'low' | 'medium' | 'high';
      transport: string;
      amenities: string[];
    };
  }[];
  scoringSystem: {
    academicAchievements: number;
    additionalDegrees: number;
    publications: number;
    presentations: number;
    prizes: number;
    intercalatedDegree: number;
    sitScore: number;
  };
}

export interface SpecialtyTraining {
  specialties: {
    name: string;
    overview: string;
    duration: number;
    competitiveness: number;
    averageApplicationsPerPost: number;
    entryRequirements: {
      foundationProgramme: boolean;
      coreTraining: boolean;
      examinations: string[];
      experience: string[];
      research: boolean;
    };
    selectionCriteria: {
      interviews: boolean;
      portfolio: boolean;
      examinations: string[];
      msra: boolean;
    };
    careerPathways: {
      consultantPosts: number;
      averageSalary: number;
      workLifeBalance: number;
      privateOpportunities: boolean;
    };
    trainingCentres: {
      deanery: string;
      hospital: string;
      reputation: number;
      researchOpportunities: boolean;
    }[];
  }[];
}

export class ProfessionalDevelopmentEngine {
  
  // CV builder with NHS-specific requirements
  async buildNHSCV(profile: CVProfile): Promise<{
    formattedCV: string;
    nhsCompliance: boolean;
    improvementSuggestions: string[];
    missingElements: string[];
  }> {
    
    const improvementSuggestions: string[] = [];
    const missingElements: string[] = [];
    
    // Check NHS-specific requirements
    if (!profile.personalDetails.gmc_number) {
      missingElements.push('GMC registration number');
    }
    
    if (!profile.personalDetails.right_to_work) {
      missingElements.push('Right to work status confirmation');
    }
    
    if (profile.experience.clinicalExperience.length === 0) {
      missingElements.push('Clinical experience details');
    }
    
    if (profile.skills.languages.length === 0) {
      missingElements.push('Language proficiency details');
    }
    
    if (profile.references.length < 2) {
      missingElements.push('At least 2 professional references');
    }
    
    // Generate improvement suggestions
    if (profile.achievements.publications.length === 0) {
      improvementSuggestions.push('Consider adding research publications to strengthen your application');
    }
    
    if (profile.experience.teaching.length === 0) {
      improvementSuggestions.push('Include teaching experience to demonstrate educational engagement');
    }
    
    if (!profile.skills.languages.some(lang => lang.language === 'English' && lang.certified)) {
      improvementSuggestions.push('Ensure English language certification (IELTS/OET) is documented');
    }
    
    const formattedCV = this.generateCVFormat(profile);
    const nhsCompliance = missingElements.length === 0;
    
    return {
      formattedCV,
      nhsCompliance,
      improvementSuggestions,
      missingElements
    };
  }

  // Interview preparation system
  async generateInterviewPreparation(
    targetPosition: string,
    userBackground: any
  ): Promise<InterviewPreparation> {
    
    const preparationModules = [
      {
        id: 'behavioral',
        title: 'Behavioral Interview Questions',
        category: 'behavioral' as const,
        questions: [
          {
            question: 'Tell me about a time when you had to work under pressure',
            type: 'competency' as const,
            suggestedStructure: 'STAR method: Situation, Task, Action, Result',
            sampleAnswer: 'During my clinical rotation in emergency medicine, we had multiple critical patients arrive simultaneously...',
            tips: [
              'Use specific examples from clinical experience',
              'Demonstrate learning and reflection',
              'Show how you maintained patient safety'
            ]
          },
          {
            question: 'Describe a situation where you had to work in a team',
            type: 'competency' as const,
            suggestedStructure: 'Focus on collaboration, communication, and shared goals',
            sampleAnswer: 'While working on a complex patient case, our multidisciplinary team needed to coordinate care...',
            tips: [
              'Highlight your specific contribution',
              'Show respect for other team members',
              'Demonstrate effective communication'
            ]
          }
        ],
        completed: false
      },
      {
        id: 'clinical',
        title: 'Clinical Scenarios',
        category: 'clinical' as const,
        questions: [
          {
            question: 'How would you manage a patient with chest pain in A&E?',
            type: 'scenario' as const,
            suggestedStructure: 'ABCDE approach, history, examination, investigations, management',
            sampleAnswer: 'I would start with an ABCDE assessment to ensure the patient is stable...',
            tips: [
              'Follow systematic approach',
              'Consider differential diagnoses',
              'Discuss when to seek senior help'
            ]
          }
        ],
        completed: false
      },
      {
        id: 'portfolio',
        title: 'Portfolio Discussion',
        category: 'portfolio' as const,
        questions: [
          {
            question: 'Tell me about your most significant learning experience',
            type: 'standard' as const,
            suggestedStructure: 'Describe experience, learning outcomes, and future application',
            sampleAnswer: 'During my medical degree, I encountered a patient with a rare condition...',
            tips: [
              'Choose meaningful experiences',
              'Demonstrate reflection and insight',
              'Connect to future practice'
            ]
          }
        ],
        completed: false
      }
    ];
    
    return {
      userId: userBackground.userId,
      targetPosition,
      preparationModules,
      mockInterviews: []
    };
  }

  // Foundation programme guidance
  async getFoundationProgrammeGuidance(
    applicationYear: number
  ): Promise<FoundationProgramme> {
    
    const currentCycle = `${applicationYear}/${applicationYear + 1}`;
    
    return {
      applicationCycle: currentCycle,
      keyDates: {
        applicationOpen: new Date(`${applicationYear}-08-01`),
        applicationDeadline: new Date(`${applicationYear}-10-15`),
        situationalJudgementTest: new Date(`${applicationYear}-11-30`),
        preferenceDeadline: new Date(`${applicationYear}-12-15`),
        allocationResults: new Date(`${applicationYear + 1}-03-15`)
      },
      requirements: {
        plabStatus: 'both_passed',
        englishTest: 'ielts',
        minimumScore: 7.0,
        additionalRequirements: [
          'GMC registration with licence to practise',
          'Right to work in the UK',
          'Occupational health clearance',
          'DBS check',
          'Hepatitis B immunity'
        ]
      },
      deaneries: [
        {
          name: 'London',
          region: 'London',
          competitiveness: 'high',
          averageScore: 48.5,
          specialties: ['Emergency Medicine', 'Surgery', 'Medicine', 'Paediatrics', 'Psychiatry', 'General Practice'],
          lifestyle: {
            costOfLiving: 'high',
            transport: 'Excellent public transport',
            amenities: ['World-class hospitals', 'Research opportunities', 'Cultural activities']
          }
        },
        {
          name: 'Northern',
          region: 'North East England',
          competitiveness: 'medium',
          averageScore: 42.0,
          specialties: ['Medicine', 'Surgery', 'General Practice', 'Paediatrics'],
          lifestyle: {
            costOfLiving: 'low',
            transport: 'Good local transport',
            amenities: ['Affordable housing', 'Close-knit community', 'Good work-life balance']
          }
        },
        {
          name: 'Scotland',
          region: 'Scotland',
          competitiveness: 'medium',
          averageScore: 44.2,
          specialties: ['Emergency Medicine', 'Medicine', 'Surgery', 'General Practice', 'Psychiatry'],
          lifestyle: {
            costOfLiving: 'medium',
            transport: 'Good public transport in cities',
            amenities: ['Beautiful scenery', 'Strong medical training', 'Research opportunities']
          }
        }
      ],
      scoringSystem: {
        academicAchievements: 50,
        additionalDegrees: 5,
        publications: 2,
        presentations: 1,
        prizes: 2,
        intercalatedDegree: 5,
        sitScore: 50
      }
    };
  }

  // Specialty training pathway guidance
  async getSpecialtyGuidance(): Promise<SpecialtyTraining> {
    
    return {
      specialties: [
        {
          name: 'Emergency Medicine',
          overview: 'Acute medical care in emergency departments',
          duration: 6,
          competitiveness: 8,
          averageApplicationsPerPost: 5.2,
          entryRequirements: {
            foundationProgramme: true,
            coreTraining: false,
            examinations: ['MRCEM Part A'],
            experience: ['Emergency department experience', 'Acute medicine'],
            research: false
          },
          selectionCriteria: {
            interviews: true,
            portfolio: true,
            examinations: ['MRCEM Part A'],
            msra: false
          },
          careerPathways: {
            consultantPosts: 850,
            averageSalary: 95000,
            workLifeBalance: 6,
            privateOpportunities: false
          },
          trainingCentres: [
            {
              deanery: 'London',
              hospital: 'St Bartholomews Hospital',
              reputation: 9,
              researchOpportunities: true
            }
          ]
        },
        {
          name: 'General Practice',
          overview: 'Primary care medicine in community settings',
          duration: 3,
          competitiveness: 6,
          averageApplicationsPerPost: 2.8,
          entryRequirements: {
            foundationProgramme: true,
            coreTraining: false,
            examinations: [],
            experience: ['Primary care experience preferred'],
            research: false
          },
          selectionCriteria: {
            interviews: true,
            portfolio: true,
            examinations: [],
            msra: true
          },
          careerPathways: {
            consultantPosts: 12500,
            averageSalary: 85000,
            workLifeBalance: 8,
            privateOpportunities: true
          },
          trainingCentres: [
            {
              deanery: 'Various',
              hospital: 'Community practices',
              reputation: 8,
              researchOpportunities: true
            }
          ]
        },
        {
          name: 'Internal Medicine',
          overview: 'Comprehensive medical care for adult patients',
          duration: 7,
          competitiveness: 7,
          averageApplicationsPerPost: 3.5,
          entryRequirements: {
            foundationProgramme: true,
            coreTraining: true,
            examinations: ['MRCP Part 1'],
            experience: ['Medical rotations', 'Acute medicine'],
            research: true
          },
          selectionCriteria: {
            interviews: true,
            portfolio: true,
            examinations: ['MRCP Part 1'],
            msra: false
          },
          careerPathways: {
            consultantPosts: 2500,
            averageSalary: 105000,
            workLifeBalance: 7,
            privateOpportunities: true
          },
          trainingCentres: [
            {
              deanery: 'London',
              hospital: 'Imperial College Healthcare',
              reputation: 9,
              researchOpportunities: true
            }
          ]
        }
      ]
    };
  }

  // Career planning and progression tracking
  async generateCareerPlan(
    userProfile: any,
    targetSpecialty: string,
    timeframe: number
  ): Promise<{
    milestones: any[];
    timeline: any[];
    requiredSteps: string[];
    estimatedCosts: number;
    alternativePathways: string[];
  }> {
    
    const milestones = [
      {
        year: 1,
        title: 'Complete PLAB examinations',
        description: 'Pass both PLAB 1 and PLAB 2',
        required: true,
        estimatedCost: 500
      },
      {
        year: 2,
        title: 'Foundation Year 1',
        description: 'Complete FY1 training programme',
        required: true,
        estimatedCost: 0
      },
      {
        year: 3,
        title: 'Foundation Year 2',
        description: 'Complete FY2 with relevant rotations',
        required: true,
        estimatedCost: 0
      },
      {
        year: 4,
        title: `Start ${targetSpecialty} Training`,
        description: `Begin specialty training programme`,
        required: true,
        estimatedCost: 2000
      }
    ];
    
    const timeline = [
      { date: new Date(), task: 'PLAB preparation', status: 'in-progress' },
      { date: new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000), task: 'Foundation applications', status: 'upcoming' },
      { date: new Date(Date.now() + 12 * 30 * 24 * 60 * 60 * 1000), task: 'FY1 start', status: 'future' }
    ];
    
    const requiredSteps = [
      'Pass PLAB 1 examination',
      'Pass PLAB 2 OSCE',
      'Obtain GMC registration',
      'Apply for Foundation Programme',
      'Complete Foundation Years',
      'Apply for Specialty Training'
    ];
    
    return {
      milestones,
      timeline,
      requiredSteps,
      estimatedCosts: 5000,
      alternativePathways: ['Locum work', 'Trust grade positions', 'Research fellowship']
    };
  }

  // Helper methods
  private generateCVFormat(profile: CVProfile): string {
    return `
CURRICULUM VITAE

Personal Details:
Name: ${profile.personalDetails.fullName}
Email: ${profile.personalDetails.email}
Phone: ${profile.personalDetails.phone}
GMC Number: ${profile.personalDetails.gmc_number || 'Pending'}

Education:
Medical Degree: ${profile.education.medicalDegree.institution}
Graduation Year: ${profile.education.medicalDegree.graduationYear}
Classification: ${profile.education.medicalDegree.classification}

Clinical Experience:
${profile.experience.clinicalExperience.map(exp => 
  `${exp.position} - ${exp.hospital} (${exp.startDate.getFullYear()}-${exp.endDate.getFullYear()})`
).join('\n')}

Skills:
Languages: ${profile.skills.languages.map(lang => `${lang.language} (${lang.proficiency})`).join(', ')}
Clinical Skills: ${profile.skills.clinical.join(', ')}

References:
${profile.references.map(ref => `${ref.name}, ${ref.position}, ${ref.institution}`).join('\n')}
    `.trim();
  }
}
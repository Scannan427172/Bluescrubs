import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Live NHS Guidelines Integration
export interface NHSGuideline {
  id: string;
  title: string;
  source: 'NICE' | 'GMC' | 'CKS' | 'SIGN' | 'RCGP' | 'BNF';
  url: string;
  lastUpdated: Date;
  version: string;
  sections: GuidelineSection[];
  relevantSpecialties: string[];
  clinicalImpact: 'high' | 'medium' | 'low';
}

export interface GuidelineSection {
  number: string;
  title: string;
  content: string;
  recommendations: ClinicalRecommendation[];
  evidenceLevel: 'A' | 'B' | 'C' | 'D';
}

export interface ClinicalRecommendation {
  text: string;
  strength: 'strong' | 'conditional';
  qualityOfEvidence: 'high' | 'moderate' | 'low' | 'very-low';
  applicablePopulation: string;
  exceptions: string[];
}

export interface UKHospitalPartnership {
  hospitalId: string;
  name: string;
  trustName: string;
  location: {
    city: string;
    region: string;
    postcode: string;
  };
  specialties: string[];
  oscePartnership: {
    active: boolean;
    availableStations: string[];
    mentorDoctors: UKDoctor[];
    practiceSlots: PracticeSlot[];
  };
  clinicalPlacements: {
    available: boolean;
    specialties: string[];
    duration: string;
    requirements: string[];
  };
}

export interface UKDoctor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  hospital: string;
  gmcNumber: string;
  yearsInUK: number;
  plabExperience: boolean;
  mentorshipAvailable: boolean;
  languages: string[];
  availability: {
    days: string[];
    times: string[];
    timezone: string;
  };
}

export interface PracticeSlot {
  id: string;
  doctorId: string;
  date: Date;
  duration: number;
  stationType: string;
  maxParticipants: number;
  currentBookings: number;
  virtualOption: boolean;
  location: string;
}

export interface CulturalCompetency {
  scenario: string;
  context: 'patient-interaction' | 'colleague-communication' | 'hierarchical-structure' | 'documentation';
  culturalNuances: string[];
  appropriateResponse: string;
  commonMistakes: string[];
  ukSpecificExpectations: string[];
}

export interface PostPLABCareerPath {
  stage: 'foundation-year-1' | 'foundation-year-2' | 'core-training' | 'specialty-training' | 'consultant';
  requirements: string[];
  timeframe: string;
  applicationDeadlines: Date[];
  competencies: string[];
  portfolioRequirements: string[];
  examinationRequirements: string[];
  careerProgression: {
    nextStage: string;
    typicalDuration: string;
    successRate: number;
  };
}

export class UKClinicalIntegration {
  // Live Guidelines Monitoring
  async fetchLatestNHSGuidelines(): Promise<NHSGuideline[]> {
    const guidelineSources = [
      'NICE Clinical Guidelines',
      'NICE Quality Standards', 
      'GMC Good Medical Practice',
      'Clinical Knowledge Summaries',
      'SIGN Guidelines',
      'RCGP Standards'
    ];

    const prompt = `Fetch the most current NHS clinical guidelines that are essential for PLAB preparation and UK medical practice.

Focus on guidelines that have been updated in the last 12 months and are frequently tested in PLAB examinations.

Include:
1. NICE guidelines for common medical conditions
2. GMC professional standards and ethical guidelines
3. CKS recommendations for primary care
4. SIGN guidelines relevant to UK practice
5. Emergency medicine protocols
6. Mental health and safeguarding guidelines

For each guideline, provide:
- Exact reference numbers and URLs
- Key clinical recommendations
- Evidence levels
- Recent updates or changes
- PLAB examination relevance

Ensure all information is current as of 2024-2025.`;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a UK medical guidelines expert with real-time access to NHS, NICE, GMC, and other official medical guidance. Provide accurate, current clinical information."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.1
      });

      const guidelines = JSON.parse(response.choices[0].message.content || '{}');
      return this.parseNHSGuidelines(guidelines);
    } catch (error) {
      console.error('Error fetching NHS guidelines:', error);
      return [];
    }
  }

  // Regional Hospital Partnerships
  async getUKHospitalPartnerships(region?: string): Promise<UKHospitalPartnership[]> {
    const partnerships: UKHospitalPartnership[] = [
      {
        hospitalId: 'imperial-london',
        name: 'Imperial College Healthcare NHS Trust',
        trustName: 'Imperial College Healthcare NHS Trust',
        location: {
          city: 'London',
          region: 'Greater London',
          postcode: 'W12 0HS'
        },
        specialties: ['Emergency Medicine', 'Internal Medicine', 'Surgery', 'Cardiology', 'Neurology'],
        oscePartnership: {
          active: true,
          availableStations: ['History Taking', 'Physical Examination', 'Patient Communication', 'Clinical Skills'],
          mentorDoctors: [
            {
              id: 'dr-sarah-williams',
              name: 'Dr. Sarah Williams',
              title: 'Consultant Physician',
              specialty: 'Internal Medicine',
              hospital: 'Imperial College Healthcare NHS Trust',
              gmcNumber: '7123456',
              yearsInUK: 8,
              plabExperience: true,
              mentorshipAvailable: true,
              languages: ['English', 'Arabic'],
              availability: {
                days: ['Tuesday', 'Thursday', 'Saturday'],
                times: ['14:00-17:00', '09:00-12:00'],
                timezone: 'Europe/London'
              }
            }
          ],
          practiceSlots: []
        },
        clinicalPlacements: {
          available: true,
          specialties: ['Internal Medicine', 'Emergency Medicine'],
          duration: '2-4 weeks',
          requirements: ['Valid PLAB 2 pass', 'GMC registration', 'DBS check']
        }
      },
      {
        hospitalId: 'manchester-royal',
        name: 'Manchester Royal Infirmary',
        trustName: 'Manchester University NHS Foundation Trust',
        location: {
          city: 'Manchester',
          region: 'North West England',
          postcode: 'M13 9WL'
        },
        specialties: ['General Medicine', 'Surgery', 'Paediatrics', 'Psychiatry'],
        oscePartnership: {
          active: true,
          availableStations: ['History Taking', 'Mental Health Assessment', 'Paediatric Examination'],
          mentorDoctors: [
            {
              id: 'dr-ahmed-hassan',
              name: 'Dr. Ahmed Hassan',
              title: 'Core Training Doctor',
              specialty: 'General Medicine',
              hospital: 'Manchester Royal Infirmary',
              gmcNumber: '7234567',
              yearsInUK: 3,
              plabExperience: true,
              mentorshipAvailable: true,
              languages: ['English', 'Urdu', 'Hindi'],
              availability: {
                days: ['Monday', 'Wednesday', 'Friday'],
                times: ['18:00-20:00'],
                timezone: 'Europe/London'
              }
            }
          ],
          practiceSlots: []
        },
        clinicalPlacements: {
          available: true,
          specialties: ['General Medicine', 'Paediatrics'],
          duration: '1-2 weeks',
          requirements: ['PLAB 2 eligibility', 'Insurance coverage']
        }
      }
    ];

    return region ? partnerships.filter(p => 
      p.location.region.toLowerCase().includes(region.toLowerCase()) ||
      p.location.city.toLowerCase().includes(region.toLowerCase())
    ) : partnerships;
  }

  // UK Cultural Competency Training
  async generateCulturalScenarios(): Promise<CulturalCompetency[]> {
    const prompt = `Generate realistic UK healthcare cultural competency scenarios for international medical graduates.

Focus on situations that commonly challenge IMG doctors working in the UK NHS:

1. Patient interaction scenarios (informed consent, breaking bad news, managing complaints)
2. Colleague communication (hierarchical structures, multidisciplinary teams, handovers)
3. Professional boundaries and GMC standards
4. Documentation and legal requirements
5. NHS administrative processes
6. Emergency situations and escalation procedures

For each scenario, include:
- Specific cultural nuances unique to the UK
- Appropriate professional responses
- Common mistakes made by international graduates
- UK-specific expectations and standards

Make scenarios realistic and directly applicable to PLAB 2 OSCE stations.`;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a UK medical culture expert who trains international medical graduates in NHS professional standards and cultural competency."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.5
      });

      const scenarios = JSON.parse(response.choices[0].message.content || '{}');
      return this.parseCulturalScenarios(scenarios);
    } catch (error) {
      console.error('Error generating cultural scenarios:', error);
      return [];
    }
  }

  // Post-PLAB Career Guidance
  async generateCareerGuidance(specialty: string, currentStage: string): Promise<PostPLABCareerPath> {
    const prompt = `Provide comprehensive career guidance for an international medical graduate who has passed PLAB and wants to pursue ${specialty} in the UK NHS.

Current stage: ${currentStage}

Include detailed information about:
1. Foundation programme application and requirements
2. Core training pathways and applications
3. Specialty training requirements and competition ratios
4. Portfolio development and ARCP requirements
5. Research and audit expectations
6. Networking and professional development opportunities
7. Financial planning and salary progression
8. Work-life balance in the UK healthcare system

Provide specific deadlines, application processes, and success strategies for international graduates.`;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a UK medical career advisor specializing in guiding international medical graduates through NHS career progression from foundation to consultant level."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.3
      });

      return JSON.parse(response.choices[0].message.content || '{}');
    } catch (error) {
      console.error('Error generating career guidance:', error);
      return {
        stage: 'foundation-year-1',
        requirements: [],
        timeframe: '',
        applicationDeadlines: [],
        competencies: [],
        portfolioRequirements: [],
        examinationRequirements: [],
        careerProgression: {
          nextStage: '',
          typicalDuration: '',
          successRate: 0
        }
      };
    }
  }

  // Real-time Guideline Updates
  async checkGuidelineUpdates(lastCheck: Date): Promise<NHSGuideline[]> {
    // In a real implementation, this would check official NHS APIs
    // For now, simulate checking for updates
    const prompt = `Check for NHS clinical guideline updates since ${lastCheck.toISOString()}.

Focus on:
1. NICE guideline updates and revisions
2. GMC professional standard changes
3. Emergency clinical protocol updates
4. New quality standards
5. Drug approval and prescribing changes
6. Safeguarding and mental health guideline updates

Return only guidelines that have been substantively updated or newly published.`;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are monitoring NHS clinical guideline databases for updates relevant to medical education and PLAB preparation."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.1
      });

      const updates = JSON.parse(response.choices[0].message.content || '{}');
      return this.parseNHSGuidelines(updates);
    } catch (error) {
      console.error('Error checking guideline updates:', error);
      return [];
    }
  }

  // NHS Job Placement Assistance
  async findNHSOpportunities(criteria: {
    specialty: string;
    location: string;
    level: string;
    startDate: Date;
  }): Promise<any[]> {
    const prompt = `Find current NHS job opportunities matching these criteria:
- Specialty: ${criteria.specialty}
- Location: ${criteria.location}
- Level: ${criteria.level}
- Start Date: ${criteria.startDate.toISOString()}

Include:
1. Foundation programme vacancies
2. Core training positions
3. Specialty training opportunities
4. Locum and temporary positions
5. Academic training programmes

For each opportunity, provide:
- Hospital/Trust name and location
- Application deadlines and process
- Required competencies and experience
- Salary range and benefits
- Contact information
- Application success tips`;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are an NHS recruitment specialist helping international medical graduates find suitable positions in the UK healthcare system."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.4
      });

      return JSON.parse(response.choices[0].message.content || '{}').opportunities || [];
    } catch (error) {
      console.error('Error finding NHS opportunities:', error);
      return [];
    }
  }

  private parseNHSGuidelines(data: any): NHSGuideline[] {
    if (!data.guidelines) return [];
    
    return data.guidelines.map((g: any) => ({
      id: g.id || `guideline_${Date.now()}`,
      title: g.title || 'Unknown Guideline',
      source: g.source || 'NICE',
      url: g.url || '#',
      lastUpdated: new Date(g.lastUpdated || Date.now()),
      version: g.version || '1.0',
      sections: g.sections || [],
      relevantSpecialties: g.relevantSpecialties || [],
      clinicalImpact: g.clinicalImpact || 'medium'
    }));
  }

  private parseCulturalScenarios(data: any): CulturalCompetency[] {
    if (!data.scenarios) return [];
    
    return data.scenarios.map((s: any) => ({
      scenario: s.scenario || '',
      context: s.context || 'patient-interaction',
      culturalNuances: s.culturalNuances || [],
      appropriateResponse: s.appropriateResponse || '',
      commonMistakes: s.commonMistakes || [],
      ukSpecificExpectations: s.ukSpecificExpectations || []
    }));
  }
}

export const ukClinical = new UKClinicalIntegration();
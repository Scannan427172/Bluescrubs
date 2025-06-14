import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Professional Development System
export interface ARCPPortfolio {
  userId: string;
  stage: 'foundation' | 'core' | 'specialty';
  year: number;
  competencies: Competency[];
  assessments: Assessment[];
  reflections: Reflection[];
  evidence: Evidence[];
  supervisorFeedback: any[];
  learningAgreements: any[];
  auditProjects: any[];
  researchActivities: any[];
  qualityImprovementProjects: any[];
  teachingActivities: any[];
  progressStatus: 'on-track' | 'concern' | 'inadequate';
  nextARCPDate: Date;
}

export interface Competency {
  id: string;
  domain: string;
  competencyStatement: string;
  evidenceRequired: string[];
  currentLevel: 'not-started' | 'developing' | 'meets-expectations' | 'excellent';
  evidenceCount: number;
  lastUpdated: Date;
  supervisorSignOff: boolean;
  gmcOutcomes: string[];
}

export interface Assessment {
  id: string;
  type: 'DOPS' | 'Mini-CEX' | 'CbD' | 'MSF' | 'ACAT' | 'Mini-PAT';
  date: Date;
  assessor: string;
  setting: string;
  focus: string;
  competenciesAssessed: string[];
  scores: Record<string, number>;
  strengths: string[];
  areasForDevelopment: string[];
  actionPlan: string;
  overallGrade: number;
  feedback: string;
}

export interface Reflection {
  id: string;
  date: Date;
  trigger: 'patient-encounter' | 'feedback' | 'learning-event' | 'critical-incident';
  description: string;
  analysisFramework: 'gibbs' | 'johns' | 'kolb' | 'borton';
  reflection: {
    whatHappened: string;
    thoughtsAndFeelings: string;
    evaluation: string;
    analysis: string;
    conclusion: string;
    actionPlan: string;
  };
  learningOutcomes: string[];
  competenciesAddressed: string[];
  evidence: string[];
}

export interface Evidence {
  id: string;
  type: 'assessment' | 'certificate' | 'reflection' | 'audit' | 'research' | 'teaching' | 'feedback';
  title: string;
  description: string;
  date: Date;
  competenciesSupported: string[];
  file: string;
  verified: boolean;
  supervisor: string;
}

export interface ContinuingEducation {
  id: string;
  type: 'formal-course' | 'conference' | 'workshop' | 'e-learning' | 'journal-club' | 'simulation';
  title: string;
  provider: string;
  duration: number;
  cpdPoints: number;
  date: Date;
  learningObjectives: string[];
  competenciesAddressed: string[];
  reflection: string;
  impact: string;
  certificates: string[];
}

export interface NetworkConnection {
  id: string;
  name: string;
  role: string;
  specialty: string;
  institution: string;
  connectionType: 'mentor' | 'peer' | 'supervisor' | 'colleague' | 'senior-doctor';
  established: Date;
  interactions: NetworkInteraction[];
  availability: {
    mentoring: boolean;
    careerAdvice: boolean;
    researchCollaboration: boolean;
    referenceProvider: boolean;
  };
}

export interface NetworkInteraction {
  date: Date;
  type: 'meeting' | 'email' | 'call' | 'informal-chat' | 'formal-supervision';
  topic: string;
  outcome: string;
  nextActions: string[];
}

export interface CareerPathway {
  specialty: string;
  currentStage: string;
  targetStage: string;
  timeline: CareerMilestone[];
  requirements: PathwayRequirement[];
  competitionRatio: number;
  salaryProgression: any[];
  workLifeBalance: {
    typicalHours: string;
    onCallFrequency: string;
    flexibilityOptions: string[];
    familyFriendly: boolean;
  };
  geographicalConsiderations: {
    availability: Record<string, number>;
    competitiveRegions: string[];
    lessCompetitiveOptions: string[];
  };
}

export interface CareerMilestone {
  stage: string;
  timeframe: string;
  requirements: string[];
  competencies: string[];
  assessments: string[];
  typicalChallenges: string[];
  successFactors: string[];
}

export interface PathwayRequirement {
  type: 'examination' | 'competency' | 'research' | 'audit' | 'teaching' | 'leadership';
  description: string;
  timeline: string;
  preparationTime: string;
  passingRate: number;
  resources: string[];
}

export interface QualityMetric {
  metric: string;
  current: number;
  target: number;
  benchmark: number;
  trend: 'improving' | 'stable' | 'declining';
  timeframe: string;
}

export class ProfessionalDevelopmentSystem {
  // ARCP Portfolio Builder
  async generatePortfolioTemplate(stage: string, specialty: string, year: number): Promise<ARCPPortfolio> {
    const prompt = `Generate a comprehensive ARCP portfolio template for a UK medical trainee.

Training Stage: ${stage}
Specialty: ${specialty}
Training Year: ${year}

Create a portfolio template that includes:
1. Required competencies for this stage and specialty
2. Assessment framework and requirements
3. Evidence collection guidelines
4. Reflection templates and frameworks
5. Learning agreement structure
6. Audit and QI project expectations
7. Teaching and research requirements
8. Timeline and milestone planning

Base this on current GMC standards and Royal College requirements for ${specialty}.`;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a UK medical education expert specializing in postgraduate training portfolios and ARCP requirements. Provide accurate, current guidance based on GMC and Royal College standards."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.3
      });

      const portfolioData = JSON.parse(response.choices[0].message.content || '{}');
      return this.parsePortfolioTemplate(portfolioData, stage, specialty, year);
    } catch (error) {
      console.error('Error generating portfolio template:', error);
      throw new Error('Failed to generate portfolio template');
    }
  }

  // Continuing Education Recommendations
  async recommendContinuingEducation(
    currentStage: string,
    specialty: string,
    learningNeeds: string[],
    timeConstraints: any
  ): Promise<ContinuingEducation[]> {
    const prompt = `Recommend continuing education opportunities for a UK medical trainee.

Current Stage: ${currentStage}
Specialty: ${specialty}
Learning Needs: ${JSON.stringify(learningNeeds)}
Time Constraints: ${JSON.stringify(timeConstraints)}

Recommend education that:
1. Addresses specific learning needs and gaps
2. Fits within time and geographical constraints
3. Provides appropriate CPD points
4. Supports portfolio development
5. Enhances career prospects in ${specialty}

Include a mix of:
- Formal courses and qualifications
- Conferences and symposiums
- Online learning platforms
- Simulation and practical workshops
- Research and audit opportunities
- Teaching and leadership development

Provide specific providers, dates, costs, and registration details where possible.`;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a medical education advisor with extensive knowledge of UK continuing education opportunities, CPD requirements, and professional development pathways."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.4
      });

      const educationData = JSON.parse(response.choices[0].message.content || '{}');
      return this.parseContinuingEducation(educationData);
    } catch (error) {
      console.error('Error recommending continuing education:', error);
      return [];
    }
  }

  // Professional Network Building
  async suggestNetworkingOpportunities(
    currentRole: string,
    specialty: string,
    careerGoals: string[],
    location: string
  ): Promise<{
    mentorshipOpportunities: any[];
    professionalSocieties: any[];
    conferences: any[];
    localNetworks: any[];
    onlineNetworks: any[];
    volunteeringOpportunities: any[];
  }> {
    const prompt = `Suggest professional networking opportunities for a UK medical professional.

Current Role: ${currentRole}
Specialty: ${specialty}
Career Goals: ${JSON.stringify(careerGoals)}
Location: ${location}

Recommend networking opportunities that:
1. Connect with senior professionals in ${specialty}
2. Provide mentorship and career guidance
3. Support specific career goals and aspirations
4. Are accessible from ${location}
5. Offer both formal and informal networking

Include:
- Professional societies and Royal Colleges
- Specialty-specific associations
- Local medical societies and groups
- Conferences and symposiums
- Online professional networks
- Volunteer opportunities
- Research collaborations
- Teaching and training roles

Provide contact details, membership requirements, and costs where available.`;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a professional networking expert specializing in UK medical careers and professional development opportunities."
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
      console.error('Error suggesting networking opportunities:', error);
      return {
        mentorshipOpportunities: [],
        professionalSocieties: [],
        conferences: [],
        localNetworks: [],
        onlineNetworks: [],
        volunteeringOpportunities: []
      };
    }
  }

  // Career Pathway Analysis
  async analyzeCareerPathway(
    currentPosition: string,
    targetSpecialty: string,
    personalFactors: any
  ): Promise<CareerPathway> {
    const prompt = `Analyze the career pathway for transitioning to ${targetSpecialty} in the UK.

Current Position: ${currentPosition}
Target Specialty: ${targetSpecialty}
Personal Factors: ${JSON.stringify(personalFactors)}

Provide detailed analysis including:
1. Step-by-step career progression pathway
2. Timeline and milestone requirements
3. Competition ratios and success rates
4. Required competencies and assessments
5. Salary progression and financial considerations
6. Work-life balance and lifestyle factors
7. Geographic considerations and job availability
8. Alternative pathways and contingency options

Include realistic timelines, potential challenges, and success strategies.`;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a UK medical career advisor with comprehensive knowledge of specialty training pathways, competition ratios, and career progression in the NHS."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.3
      });

      const pathwayData = JSON.parse(response.choices[0].message.content || '{}');
      return this.parseCareerPathway(pathwayData, targetSpecialty);
    } catch (error) {
      console.error('Error analyzing career pathway:', error);
      throw new Error('Failed to analyze career pathway');
    }
  }

  // Competency Gap Analysis
  async analyzeCompetencyGaps(
    currentCompetencies: any[],
    targetRole: string,
    timeframe: string
  ): Promise<{
    gaps: any[];
    developmentPlan: any[];
    resources: any[];
    timeline: any[];
    assessmentStrategy: any[];
  }> {
    const prompt = `Analyze competency gaps for career progression in UK medical practice.

Current Competencies: ${JSON.stringify(currentCompetencies)}
Target Role: ${targetRole}
Development Timeframe: ${timeframe}

Identify:
1. Critical competency gaps that need addressing
2. Priority order for development
3. Specific learning objectives and outcomes
4. Available resources and training opportunities
5. Assessment and validation methods
6. Realistic timeline for competency development

Focus on both clinical and non-clinical competencies including leadership, research, teaching, and management skills.`;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a competency development expert specializing in UK medical education and professional development frameworks."
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
      console.error('Error analyzing competency gaps:', error);
      return {
        gaps: [],
        developmentPlan: [],
        resources: [],
        timeline: [],
        assessmentStrategy: []
      };
    }
  }

  // Leadership Development Program
  async generateLeadershipDevelopment(
    currentLevel: string,
    targetLevel: string,
    organizationalContext: string
  ): Promise<{
    assessmentTools: any[];
    developmentActivities: any[];
    mentorshipPlan: any[];
    learningResources: any[];
    projectOpportunities: any[];
    measurementStrategy: any[];
  }> {
    const prompt = `Design a leadership development program for a UK medical professional.

Current Leadership Level: ${currentLevel}
Target Leadership Level: ${targetLevel}
Organizational Context: ${organizationalContext}

Create a comprehensive program that:
1. Assesses current leadership capabilities
2. Identifies development priorities
3. Provides structured learning experiences
4. Includes mentorship and coaching
5. Offers practical leadership opportunities
6. Measures progress and impact

Focus on NHS leadership frameworks and medical leadership competencies including patient safety, quality improvement, and team management.`;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a medical leadership development expert with deep knowledge of NHS leadership frameworks and healthcare management principles."
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
      console.error('Error generating leadership development program:', error);
      return {
        assessmentTools: [],
        developmentActivities: [],
        mentorshipPlan: [],
        learningResources: [],
        projectOpportunities: [],
        measurementStrategy: []
      };
    }
  }

  private parsePortfolioTemplate(data: any, stage: string, specialty: string, year: number): ARCPPortfolio {
    return {
      userId: 'template',
      stage: stage as any,
      year,
      competencies: data.competencies || [],
      assessments: [],
      reflections: [],
      evidence: [],
      supervisorFeedback: [],
      learningAgreements: data.learningAgreements || [],
      auditProjects: [],
      researchActivities: [],
      qualityImprovementProjects: [],
      teachingActivities: [],
      progressStatus: 'on-track',
      nextARCPDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
    };
  }

  private parseContinuingEducation(data: any): ContinuingEducation[] {
    if (!data.opportunities) return [];
    
    return data.opportunities.map((opp: any) => ({
      id: `ce_${Date.now()}_${Math.random()}`,
      type: opp.type || 'e-learning',
      title: opp.title || 'Continuing Education Opportunity',
      provider: opp.provider || 'Unknown Provider',
      duration: opp.duration || 1,
      cpdPoints: opp.cpdPoints || 1,
      date: new Date(opp.date || Date.now()),
      learningObjectives: opp.learningObjectives || [],
      competenciesAddressed: opp.competenciesAddressed || [],
      reflection: '',
      impact: '',
      certificates: []
    }));
  }

  private parseCareerPathway(data: any, specialty: string): CareerPathway {
    return {
      specialty,
      currentStage: data.currentStage || 'foundation',
      targetStage: data.targetStage || 'consultant',
      timeline: data.timeline || [],
      requirements: data.requirements || [],
      competitionRatio: data.competitionRatio || 1.0,
      salaryProgression: data.salaryProgression || [],
      workLifeBalance: data.workLifeBalance || {
        typicalHours: '40-48 hours per week',
        onCallFrequency: 'Variable',
        flexibilityOptions: [],
        familyFriendly: true
      },
      geographicalConsiderations: data.geographicalConsiderations || {
        availability: {},
        competitiveRegions: [],
        lessCompetitiveOptions: []
      }
    };
  }
}

export const professionalDevelopment = new ProfessionalDevelopmentSystem();
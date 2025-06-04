import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Resources() {
  const applicationResources = [
    {
      title: "NHS Jobs Portal Guide",
      description: "Complete walkthrough of the NHS Jobs application system",
      type: "Guide",
      duration: "15 min read",
      icon: "📋",
    },
    {
      title: "CV Templates for IMGs",
      description: "Professional CV templates specifically designed for international medical graduates",
      type: "Template",
      duration: "Download",
      icon: "📄",
    },
    {
      title: "Portfolio Building Checklist",
      description: "Essential components and evidence required for your medical portfolio",
      type: "Checklist",
      duration: "10 min read",
      icon: "✅",
    },
    {
      title: "Reference Letter Templates",
      description: "Templates and guidelines for requesting effective reference letters",
      type: "Template",
      duration: "Download",
      icon: "📝",
    },
  ];

  const interviewResources = [
    {
      title: "Mock Interview Sessions",
      description: "Practice interviews with real NHS interview questions and scenarios",
      type: "Interactive",
      duration: "30-45 min",
      icon: "🎤",
    },
    {
      title: "Competency-Based Questions Bank",
      description: "200+ common NHS interview questions with sample answers",
      type: "Question Bank",
      duration: "Study material",
      icon: "❓",
    },
    {
      title: "Presentation Skills Workshop",
      description: "Learn how to deliver effective presentations for NHS interviews",
      type: "Workshop",
      duration: "60 min",
      icon: "📊",
    },
    {
      title: "Body Language & Communication",
      description: "Professional communication skills for healthcare interviews",
      type: "Guide",
      duration: "20 min read",
      icon: "🗣️",
    },
  ];

  const cultureResources = [
    {
      title: "NHS Hierarchy & Structure",
      description: "Understanding the NHS organizational structure and reporting lines",
      type: "Guide",
      duration: "25 min read",
      icon: "🏥",
    },
    {
      title: "Patient Communication Styles",
      description: "UK-specific approaches to patient interaction and communication",
      type: "Training",
      duration: "40 min",
      icon: "💬",
    },
    {
      title: "Professional Development Paths",
      description: "Career progression routes within the NHS for international doctors",
      type: "Career Guide",
      duration: "30 min read",
      icon: "📈",
    },
    {
      title: "Clinical Guidelines & Protocols",
      description: "Essential NICE guidelines and NHS clinical protocols",
      type: "Reference",
      duration: "Study material",
      icon: "📚",
    },
  ];

  const careerPathways = [
    {
      pathway: "Foundation Year 2 (F2)",
      duration: "12 months",
      salary: "£34,012 - £39,027",
      requirements: "PLAB 1 & 2 passed",
      description: "Most common entry point for PLAB graduates",
      color: "bg-primary",
    },
    {
      pathway: "Specialty Training (ST1-ST8)",
      duration: "3-8 years",
      salary: "£40,257 - £69,325",
      requirements: "PLAB + Experience",
      description: "Direct entry for experienced doctors",
      color: "bg-secondary",
    },
    {
      pathway: "Staff Grade / Associate Specialist",
      duration: "Permanent",
      salary: "£50,819 - £82,089",
      requirements: "Specialist experience",
      description: "Non-training permanent positions",
      color: "bg-accent",
    },
    {
      pathway: "Consultant",
      duration: "Permanent",
      salary: "£88,364 - £119,133",
      requirements: "CCT or equivalent",
      description: "Senior clinical leadership roles",
      color: "bg-success",
    },
  ];

  const timelineSteps = [
    {
      step: 1,
      title: "PLAB Success",
      description: "Pass both PLAB 1 and PLAB 2 examinations",
      timeframe: "Months 0-12",
      color: "bg-primary",
    },
    {
      step: 2,
      title: "GMC Registration",
      description: "Obtain full GMC registration and license to practice",
      timeframe: "Month 13",
      color: "bg-success",
    },
    {
      step: 3,
      title: "NHS Position",
      description: "Secure Foundation Year 2 or specialty training position",
      timeframe: "Months 14-18",
      color: "bg-secondary",
    },
    {
      step: 4,
      title: "Career Progression",
      description: "Progress through specialty training or pursue consultant roles",
      timeframe: "Years 2-8",
      color: "bg-accent",
    },
  ];

  const ResourceCard = ({ resource }: { resource: any }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="text-2xl">{resource.icon}</div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-lg">{resource.title}</h3>
              <Badge variant="outline">{resource.type}</Badge>
            </div>
            <p className="text-muted-foreground text-sm mb-3">
              {resource.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{resource.duration}</span>
              <Button size="sm">Access Resource</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">NHS Job Preparation</h1>
          <p className="text-muted-foreground text-lg">
            Complete guidance for starting your NHS career after PLAB success
          </p>
        </div>

        <Tabs defaultValue="resources" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="pathways">Career Pathways</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>

          <TabsContent value="resources" className="space-y-8">
            
            {/* Resource Categories */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Application Process */}
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold mb-2">Application Process</h2>
                  <p className="text-muted-foreground text-sm">
                    Step-by-step guide to NHS job applications
                  </p>
                </div>
                
                <div className="space-y-4">
                  {applicationResources.map((resource, index) => (
                    <ResourceCard key={index} resource={resource} />
                  ))}
                </div>
              </div>

              {/* Interview Preparation */}
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold mb-2">Interview Mastery</h2>
                  <p className="text-muted-foreground text-sm">
                    Practice and preparation for NHS interviews
                  </p>
                </div>
                
                <div className="space-y-4">
                  {interviewResources.map((resource, index) => (
                    <ResourceCard key={index} resource={resource} />
                  ))}
                </div>
              </div>

              {/* Cultural Integration */}
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-success/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold mb-2">UK Healthcare Culture</h2>
                  <p className="text-muted-foreground text-sm">
                    Understanding NHS culture and expectations
                  </p>
                </div>
                
                <div className="space-y-4">
                  {cultureResources.map((resource, index) => (
                    <ResourceCard key={index} resource={resource} />
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="pathways" className="space-y-8">
            
            {/* Career Pathways Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center">NHS Career Pathways for International Graduates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {careerPathways.map((pathway, index) => (
                    <Card key={index} className="border-l-4 border-l-primary">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className={`w-12 h-12 ${pathway.color} rounded-full flex items-center justify-center text-white font-bold`}>
                            {pathway.pathway.match(/\b\w/g)?.join('').substring(0, 2)}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold">{pathway.pathway}</h3>
                            <p className="text-sm text-muted-foreground">{pathway.description}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Duration:</span>
                            <span className="font-medium">{pathway.duration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Salary Range:</span>
                            <span className="font-medium">{pathway.salary}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Requirements:</span>
                            <span className="font-medium">{pathway.requirements}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Salary Progression Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Salary Progression Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground mb-4">
                    Annual salary ranges for different NHS positions (England, 2024)
                  </div>
                  
                  {careerPathways.map((pathway, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-32 text-sm font-medium">{pathway.pathway}</div>
                      <div className="flex-1 bg-muted rounded-full h-8 relative">
                        <div 
                          className={`${pathway.color} h-8 rounded-full flex items-center justify-end pr-3 text-white text-sm font-medium`}
                          style={{ width: `${Math.min(100, (parseInt(pathway.salary.split(' - ')[1].replace(/[£,]/g, '')) / 120000) * 100)}%` }}
                        >
                          {pathway.salary}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-8">
            
            {/* Career Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center">Typical Career Timeline for PLAB Graduates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative max-w-4xl mx-auto">
                  {/* Timeline line */}
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>
                  
                  {/* Timeline items */}
                  <div className="space-y-12">
                    {timelineSteps.map((step, index) => (
                      <div key={index} className="flex items-start space-x-6">
                        <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0 relative z-10`}>
                          {step.step}
                        </div>
                        <div className="flex-1 pb-8">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-bold">{step.title}</h3>
                            <Badge variant="outline">{step.timeframe}</Badge>
                          </div>
                          <p className="text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Key Milestones */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">PLAB Completion</h3>
                  <p className="text-muted-foreground text-sm">
                    Average time to complete both PLAB 1 and PLAB 2 examinations
                  </p>
                  <div className="text-2xl font-bold text-primary mt-3">6-12 months</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 112 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">First NHS Position</h3>
                  <p className="text-muted-foreground text-sm">
                    Time from PLAB completion to securing first NHS role
                  </p>
                  <div className="text-2xl font-bold text-success mt-3">3-6 months</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Career Progression</h3>
                  <p className="text-muted-foreground text-sm">
                    Time to progress from F2 to specialty training
                  </p>
                  <div className="text-2xl font-bold text-secondary mt-3">1-2 years</div>
                </CardContent>
              </Card>
            </div>

            {/* Success Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Success Tips for Your NHS Journey</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-primary flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Before Starting
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start space-x-2">
                        <span className="text-primary">•</span>
                        <span>Research potential employers and hospital trusts</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-primary">•</span>
                        <span>Prepare a comprehensive portfolio</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-primary">•</span>
                        <span>Network with current NHS doctors</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-primary">•</span>
                        <span>Understand visa and immigration requirements</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-success flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      During Your Career
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start space-x-2">
                        <span className="text-success">•</span>
                        <span>Continuously develop your clinical skills</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-success">•</span>
                        <span>Engage in audit and research activities</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-success">•</span>
                        <span>Seek mentorship from senior colleagues</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-success">•</span>
                        <span>Consider leadership and management training</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

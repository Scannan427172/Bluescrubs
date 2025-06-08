import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  GraduationCap, FileText, Users, Briefcase, MapPin, 
  Calendar, Clock, CheckCircle, ArrowRight, Download,
  Star, TrendingUp, Award, Building, Phone, Mail
} from "lucide-react";

export default function NhsPrep() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const toggleStepComplete = (stepId: number) => {
    setCompletedSteps(prev => 
      prev.includes(stepId) 
        ? prev.filter(id => id !== stepId)
        : [...prev, stepId]
    );
  };

  const careerPathways = [
    {
      title: "Foundation Year 2 (FY2)",
      description: "Most common entry point for PLAB graduates",
      duration: "12 months",
      salary: "£34,012 - £39,027",
      requirements: "PLAB 1 & 2 passed, GMC registration",
      competitiveness: "Moderate",
      icon: "👨‍⚕️"
    },
    {
      title: "Core Training (CT1-3)",
      description: "Structured training in medical specialties",
      duration: "2-3 years",
      salary: "£40,257 - £51,017",
      requirements: "Foundation training completed",
      competitiveness: "High",
      icon: "🩺"
    },
    {
      title: "Specialty Training (ST1-8)",
      description: "Direct entry for experienced doctors",
      duration: "3-8 years",
      salary: "£40,257 - £69,325",
      requirements: "PLAB + relevant experience",
      competitiveness: "Very High",
      icon: "⚕️"
    }
  ];

  const applicationSteps = [
    {
      id: 1,
      title: "GMC Registration",
      description: "Obtain full GMC registration and license to practice",
      timeframe: "4-6 weeks",
      requirements: ["PLAB 1 & 2 certificates", "Medical degree verification", "English language certificate", "Good standing certificate"],
      resources: ["GMC online portal", "Required documents checklist"]
    },
    {
      id: 2,
      title: "NHS Jobs Registration",
      description: "Create profile on NHS Jobs portal",
      timeframe: "1-2 hours",
      requirements: ["GMC number", "Updated CV", "Personal statement", "References"],
      resources: ["NHS Jobs website", "CV template", "Personal statement guide"]
    },
    {
      id: 3,
      title: "Application Submission",
      description: "Apply for suitable positions",
      timeframe: "2-4 weeks",
      requirements: ["Completed application form", "Supporting documents", "Interview availability"],
      resources: ["Application tracker", "Position search filters"]
    },
    {
      id: 4,
      title: "Interview Preparation",
      description: "Prepare for competency-based interviews",
      timeframe: "2-3 weeks",
      requirements: ["Practice questions", "Portfolio review", "Presentation preparation"],
      resources: ["Interview question bank", "Mock interview sessions"]
    },
    {
      id: 5,
      title: "Job Offer & Induction",
      description: "Accept offer and complete NHS induction",
      timeframe: "1-2 weeks",
      requirements: ["Occupational health clearance", "DBS check", "Mandatory training"],
      resources: ["Induction schedule", "Trust orientation materials"]
    }
  ];

  const interviewQuestions = [
    {
      category: "Clinical Scenarios",
      questions: [
        "Describe how you would manage a patient with chest pain in A&E",
        "How would you approach breaking bad news to a patient's family?",
        "What steps would you take if you made a clinical error?"
      ]
    },
    {
      category: "NHS Values",
      questions: [
        "How do the NHS core values align with your personal values?",
        "Describe a time when you worked effectively in a team",
        "How would you handle a conflict with a colleague?"
      ]
    },
    {
      category: "Professional Development",
      questions: [
        "What are your career aspirations within the NHS?",
        "How do you stay updated with medical knowledge?",
        "Describe a challenging case that taught you something important"
      ]
    }
  ];

  const resources = [
    {
      category: "Application Resources",
      items: [
        { title: "NHS CV Template", type: "Download", icon: FileText },
        { title: "Personal Statement Guide", type: "PDF", icon: FileText },
        { title: "Reference Request Template", type: "Download", icon: FileText },
        { title: "GMC Registration Checklist", type: "Checklist", icon: CheckCircle }
      ]
    },
    {
      category: "Interview Preparation",
      items: [
        { title: "Common Interview Questions", type: "Resource", icon: Users },
        { title: "Portfolio Building Guide", type: "Guide", icon: Briefcase },
        { title: "Presentation Templates", type: "Download", icon: FileText },
        { title: "Mock Interview Booking", type: "Service", icon: Calendar }
      ]
    },
    {
      category: "Cultural Integration",
      items: [
        { title: "NHS Structure Overview", type: "Guide", icon: Building },
        { title: "UK Healthcare System", type: "Course", icon: GraduationCap },
        { title: "Communication Styles", type: "Training", icon: Users },
        { title: "Professional Expectations", type: "Handbook", icon: Star }
      ]
    }
  ];

  const progressPercentage = (completedSteps.length / applicationSteps.length) * 100;

  return (
    <div className="min-h-screen bg-light-bg pb-20 md:pb-0">
      {/* Header */}
      <div className="bg-white py-12 border-b" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4" style={{ color: '#000000' }}>NHS Career Preparation</h1>
            <p className="text-xl" style={{ color: '#666666' }}>Your complete guide to starting your NHS career after PLAB success</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold mb-1" style={{ color: '#000000' }}>
                {completedSteps.length}/{applicationSteps.length}
              </div>
              <div className="text-sm" style={{ color: '#666666' }}>Steps Completed</div>
            </CardContent>
          </Card>

          <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold mb-1" style={{ color: '#000000' }}>Active</div>
              <div className="text-sm" style={{ color: '#666666' }}>Study Program</div>
            </CardContent>
          </Card>

          <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold mb-1" style={{ color: '#000000' }}>Available</div>
              <div className="text-sm" style={{ color: '#666666' }}>Study Resources</div>
            </CardContent>
          </Card>

          <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="text-2xl font-bold mb-1" style={{ color: '#000000' }}>6-8</div>
              <div className="text-sm" style={{ color: '#666666' }}>Weeks Average</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="pathway" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="pathway">Career Pathways</TabsTrigger>
            <TabsTrigger value="application">Application Process</TabsTrigger>
            <TabsTrigger value="interview">Interview Prep</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          {/* Career Pathways */}
          <TabsContent value="pathway" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center">
                  <GraduationCap className="w-6 h-6 mr-3 text-mint-green" />
                  NHS Career Pathways for International Graduates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {careerPathways.map((pathway, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="text-center mb-4">
                        <div className="text-4xl mb-2">{pathway.icon}</div>
                        <h3 className="text-lg font-bold text-gray-900">{pathway.title}</h3>
                        <p className="text-sm text-gray-600">{pathway.description}</p>
                      </div>
                      
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Duration:</span>
                          <span className="font-medium">{pathway.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Salary:</span>
                          <span className="font-medium">{pathway.salary}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Competition:</span>
                          <Badge variant={
                            pathway.competitiveness === 'Moderate' ? 'secondary' :
                            pathway.competitiveness === 'High' ? 'default' : 
                            'destructive'
                          }>
                            {pathway.competitiveness}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-xs text-gray-600 mb-3">
                          <strong>Requirements:</strong> {pathway.requirements}
                        </p>
                        <Button className="w-full btn-medical">
                          Learn More
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold">Typical Career Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-300"></div>
                  
                  <div className="space-y-8">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-medical-blue rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">1</div>
                      <div>
                        <h3 className="font-semibold text-gray-900">PLAB Success</h3>
                        <p className="text-gray-600 text-sm">Pass both PLAB 1 and PLAB 2 examinations</p>
                        <span className="text-xs text-medical-blue">Months 0-12</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-mint-green rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">2</div>
                      <div>
                        <h3 className="font-semibold text-gray-900">GMC Registration</h3>
                        <p className="text-gray-600 text-sm">Obtain full GMC registration and license to practice</p>
                        <span className="text-xs text-mint-green">Month 13</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-deep-rose rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">3</div>
                      <div>
                        <h3 className="font-semibold text-gray-900">NHS Position</h3>
                        <p className="text-gray-600 text-sm">Secure Foundation Year 2 or specialty training position</p>
                        <span className="text-xs text-deep-rose">Months 14-18</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-purple-accent rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">4</div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Career Progression</h3>
                        <p className="text-gray-600 text-sm">Progress through specialty training or pursue consultant roles</p>
                        <span className="text-xs text-purple-accent">Years 2-8</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Application Process */}
          <TabsContent value="application" className="space-y-8">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-bold flex items-center">
                    <FileText className="w-6 h-6 mr-3 text-medical-blue" />
                    Application Process
                  </CardTitle>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-medical-blue">{Math.round(progressPercentage)}%</div>
                    <div className="text-sm text-gray-600">Complete</div>
                  </div>
                </div>
                <Progress value={progressPercentage} className="mt-4" />
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {applicationSteps.map((step) => {
                    const isCompleted = completedSteps.includes(step.id);
                    
                    return (
                      <div key={step.id} className={`border rounded-lg p-6 transition-all ${
                        isCompleted ? 'border-mint-green bg-green-50' : 'border-gray-200'
                      }`}>
                        <div className="flex items-start space-x-4">
                          <button
                            onClick={() => toggleStepComplete(step.id)}
                            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                              isCompleted 
                                ? 'bg-mint-green text-white' 
                                : 'border-2 border-gray-300 hover:border-medical-blue'
                            }`}
                          >
                            {isCompleted ? (
                              <CheckCircle className="w-5 h-5" />
                            ) : (
                              <span className="font-semibold">{step.id}</span>
                            )}
                          </button>
                          
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className={`text-lg font-semibold ${
                                isCompleted ? 'text-mint-green' : 'text-gray-900'
                              }`}>
                                {step.title}
                              </h3>
                              <Badge variant="outline" className="text-xs">
                                {step.timeframe}
                              </Badge>
                            </div>
                            
                            <p className="text-gray-600 mb-4">{step.description}</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-medium text-gray-900 mb-2">Requirements:</h4>
                                <ul className="text-sm text-gray-600 space-y-1">
                                  {step.requirements.map((req, index) => (
                                    <li key={index} className="flex items-center space-x-2">
                                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                                      <span>{req}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              
                              <div>
                                <h4 className="font-medium text-gray-900 mb-2">Resources:</h4>
                                <div className="space-y-1">
                                  {step.resources.map((resource, index) => (
                                    <button
                                      key={index}
                                      className="flex items-center space-x-2 text-sm text-medical-blue hover:underline"
                                    >
                                      <Download className="w-3 h-3" />
                                      <span>{resource}</span>
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Interview Preparation */}
          <TabsContent value="interview" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center">
                  <Users className="w-6 h-6 mr-3 text-deep-rose" />
                  Interview Preparation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {interviewQuestions.map((category, index) => (
                    <div key={index} className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">{category.category}</h3>
                      <div className="space-y-3">
                        {category.questions.map((question, qIndex) => (
                          <div key={qIndex} className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-700">{question}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-bold">Interview Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-medical-blue">
                      <h4 className="font-semibold text-gray-900 mb-2">📋 Preparation</h4>
                      <p className="text-sm text-gray-700">
                        Research the trust, understand their values, and prepare specific examples using the STAR method.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-mint-green">
                      <h4 className="font-semibold text-gray-900 mb-2">🗣️ Communication</h4>
                      <p className="text-sm text-gray-700">
                        Practice clear, concise answers. Show enthusiasm and ask thoughtful questions about the role.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-accent">
                      <h4 className="font-semibold text-gray-900 mb-2">👔 Professional</h4>
                      <p className="text-sm text-gray-700">
                        Dress professionally, arrive early, and bring multiple copies of your CV and portfolio.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-bold">Mock Interview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-deep-rose/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-deep-rose" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Practice with Experts</h3>
                    <p className="text-gray-600 mb-6">
                      Book a mock interview session with NHS recruitment specialists to get personalized feedback.
                    </p>
                    <Button className="btn-secondary">
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Mock Interview
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Resources */}
          <TabsContent value="resources" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {resources.map((category, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg font-bold">{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {category.items.map((item, itemIndex) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={itemIndex}
                            className="w-full flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
                          >
                            <Icon className="w-5 h-5 text-medical-blue" />
                            <div className="flex-1">
                              <div className="font-medium text-gray-900">{item.title}</div>
                              <div className="text-sm text-gray-600">{item.type}</div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-400" />
                          </button>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Contact Support */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold">Need Additional Support?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-gray-50 rounded-lg">
                    <Phone className="w-8 h-8 text-medical-blue mx-auto mb-4" />
                    <h3 className="font-semibold text-gray-900 mb-2">Phone Support</h3>
                    <p className="text-sm text-gray-600 mb-4">Speak with our NHS career advisors</p>
                    <Button variant="outline" size="sm">Call Now</Button>
                  </div>
                  
                  <div className="text-center p-6 bg-gray-50 rounded-lg">
                    <Mail className="w-8 h-8 text-medical-blue mx-auto mb-4" />
                    <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
                    <p className="text-sm text-gray-600 mb-4">Get detailed guidance via email</p>
                    <Button variant="outline" size="sm">Send Email</Button>
                  </div>
                  
                  <div className="text-center p-6 bg-gray-50 rounded-lg">
                    <Users className="w-8 h-8 text-medical-blue mx-auto mb-4" />
                    <h3 className="font-semibold text-gray-900 mb-2">1-on-1 Mentoring</h3>
                    <p className="text-sm text-gray-600 mb-4">Personal guidance from NHS doctors</p>
                    <Button variant="outline" size="sm">Book Session</Button>
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

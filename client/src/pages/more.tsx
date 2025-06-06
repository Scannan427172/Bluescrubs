import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, Shield, Lock, Eye, Users, 
  Cookie, Scale, HelpCircle, Mail, Phone,
  Building, Globe, Download, ExternalLink, Heart,
  Stethoscope, Twitter, Facebook, Linkedin, Instagram, MapPin,
  Brain, Microscope, Activity, Pill, BookOpen, GraduationCap,
  Briefcase, FileCheck, Calendar, Target, MessageCircle, 
  HeadphonesIcon, Video, Bot, Mic, ClipboardList, Award,
  Accessibility, Volume2, Palette, Type, Timer, Focus, 
  Lightbulb, Settings2, UserCheck, Headset,
  Building2, Map, CheckCircle, AlertCircle,
  TrendingUp, PieChart, BarChart3, Clock, Star,
  Zap, Cpu, Headphones, Gamepad2, Camera,
  FileImage, TestTube, Syringe, Thermometer, MonitorSpeaker
} from "lucide-react";

export default function More() {
  const [activeDocument, setActiveDocument] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState("overview");

  // Medical Specialization Features
  const specializationModules = [
    {
      id: "surgical-skills",
      title: "Surgical Skills VR",
      icon: Syringe,
      description: "Virtual reality surgical simulations with haptic feedback",
      level: "Advanced",
      completion: 0,
      premium: true
    },
    {
      id: "radiology-training",
      title: "Radiology Interpretation",
      icon: FileImage,
      description: "X-ray, MRI, and CT scan analysis with AI guidance",
      level: "Intermediate",
      completion: 0,
      premium: false
    },
    {
      id: "lab-results",
      title: "Laboratory Analysis",
      icon: TestTube,
      description: "Blood work, microbiology, and pathology interpretation",
      level: "Foundation",
      completion: 0,
      premium: false
    },
    {
      id: "pharmacology",
      title: "Drug Interaction Checker",
      icon: Pill,
      description: "Comprehensive drug database with interaction warnings",
      level: "Advanced",
      completion: 0,
      premium: true
    },
    {
      id: "clinical-guidelines",
      title: "Clinical Protocols",
      icon: ClipboardList,
      description: "Latest NICE guidelines and NHS protocols",
      level: "All Levels",
      completion: 0,
      premium: false
    }
  ];

  // Career Support Features
  const careerSupport = [
    {
      id: "nhs-applications",
      title: "NHS Job Applications",
      icon: Briefcase,
      description: "Step-by-step guidance for NHS job applications",
      status: "Available",
      premium: false
    },
    {
      id: "cv-optimization",
      title: "CV/Resume Builder",
      icon: FileCheck,
      description: "UK medical CV templates and optimization tools",
      status: "Available",
      premium: true
    },
    {
      id: "interview-prep",
      title: "NHS Interview Prep",
      icon: UserCheck,
      description: "Mock interviews with NHS consultants",
      status: "Available",
      premium: true
    },
    {
      id: "locum-marketplace",
      title: "Locum Work Platform",
      icon: Calendar,
      description: "Find and book locum positions across the UK",
      status: "Coming Soon",
      premium: true
    },
    {
      id: "insurance-guidance",
      title: "Medical Indemnity",
      icon: Shield,
      description: "Compare medical insurance and indemnity options",
      status: "Available",
      premium: false
    }
  ];

  // AI-Powered Features
  const aiFeatures = [
    {
      id: "voice-recognition",
      title: "Clinical Voice Training",
      icon: Mic,
      description: "Practice history taking with voice recognition",
      accuracy: 85,
      premium: true
    },
    {
      id: "accent-coaching",
      title: "Accent & Communication",
      icon: Headphones,
      description: "Real-time accent coaching for better patient communication",
      accuracy: 92,
      premium: true
    },
    {
      id: "ai-patient",
      title: "AI Patient Simulator",
      icon: Bot,
      description: "Complex case discussions with AI-powered virtual patients",
      accuracy: 88,
      premium: true
    },
    {
      id: "study-companion",
      title: "Personal Study AI",
      icon: Brain,
      description: "24/7 AI companion for questions and explanations",
      accuracy: 94,
      premium: false
    },
    {
      id: "clinical-notes",
      title: "Note Writing Practice",
      icon: FileText,
      description: "Automated feedback on clinical documentation",
      accuracy: 90,
      premium: true
    }
  ];

  // GMC Registration & Compliance
  const regulatoryTools = [
    {
      id: "gmc-application",
      title: "GMC Registration Guide",
      icon: Award,
      description: "Complete step-by-step GMC application assistance",
      progress: 0,
      totalSteps: 8
    },
    {
      id: "document-checker",
      title: "Document Verification",
      icon: CheckCircle,
      description: "Automated document checklist and validation",
      progress: 0,
      totalSteps: 12
    },
    {
      id: "registration-tracker",
      title: "Registration Status",
      icon: TrendingUp,
      description: "Real-time tracking of your GMC application",
      progress: 0,
      totalSteps: 6
    },
    {
      id: "revalidation-system",
      title: "Revalidation Reminders",
      icon: AlertCircle,
      description: "Automated CPD tracking and revalidation alerts",
      progress: 0,
      totalSteps: 4
    },
    {
      id: "cpd-tracker",
      title: "CPD Management",
      icon: BookOpen,
      description: "Continuing Professional Development portfolio",
      progress: 0,
      totalSteps: 10
    }
  ];

  // Enhanced Learning Technologies
  const learningTech = [
    {
      id: "vr-scenarios",
      title: "VR Clinical Scenarios",
      icon: Headset,
      description: "Immersive virtual reality patient interactions",
      scenarios: 45,
      premium: true
    },
    {
      id: "study-groups",
      title: "Virtual Study Groups",
      icon: Users,
      description: "Video conferencing with collaborative tools",
      activeGroups: 128,
      premium: false
    },
    {
      id: "peer-review",
      title: "Peer Assessment System",
      icon: MessageCircle,
      description: "Student-to-student case review and feedback",
      reviews: 1240,
      premium: false
    },
    {
      id: "knowledge-marketplace",
      title: "Knowledge Sharing Hub",
      icon: Building2,
      description: "Buy and sell study materials and notes",
      items: 340,
      premium: true
    },
    {
      id: "regional-meetups",
      title: "Local Meetup Coordinator",
      icon: Map,
      description: "Find and organize study meetups in your area",
      events: 23,
      premium: false
    }
  ];

  // Assessment & Analytics
  const assessmentTools = [
    {
      id: "timed-exams",
      title: "Realistic Exam Conditions",
      icon: Clock,
      description: "Full PLAB mock exams with authentic timing",
      exams: 15,
      avgScore: 0
    },
    {
      id: "weakness-analysis",
      title: "Weakness Identification",
      icon: Target,
      description: "AI-powered weak area detection and remediation",
      areas: 8,
      improvement: 0
    },
    {
      id: "peer-comparison",
      title: "Anonymous Peer Data",
      icon: BarChart3,
      description: "Compare your progress with similar students",
      percentile: 0,
      totalUsers: 15420
    },
    {
      id: "performance-analytics",
      title: "Advanced Analytics",
      icon: PieChart,
      description: "Detailed performance insights and predictions",
      metrics: 12,
      accuracy: 89
    },
    {
      id: "question-bank",
      title: "Expanded Question Bank",
      icon: FileText,
      description: "User-contributed questions with peer validation",
      questions: 8750,
      verified: 7200
    }
  ];

  const legalDocuments = [
    {
      id: "privacy-policy",
      title: "Privacy Policy",
      icon: Shield,
      description: "How we collect, use, and protect your personal information",
      lastUpdated: "June 2025"
    },
    {
      id: "terms-of-service",
      title: "Terms of Service",
      icon: FileText,
      description: "Terms and conditions for using NHSprep platform",
      lastUpdated: "June 2025"
    },
    {
      id: "gdpr-compliance",
      title: "GDPR Compliance",
      icon: Lock,
      description: "Your rights under the General Data Protection Regulation",
      lastUpdated: "June 2025"
    },
    {
      id: "cookie-policy",
      title: "Cookie Policy",
      icon: Cookie,
      description: "Information about cookies and tracking technologies",
      lastUpdated: "June 2025"
    }
  ];

  const supportOptions = [
    {
      title: "Contact Support",
      description: "Get help with technical issues or account problems",
      icon: HelpCircle,
      action: "mailto:support@nhsprep.com"
    },
    {
      title: "Email Us",
      description: "General inquiries and feedback",
      icon: Mail,
      action: "mailto:hello@nhsprep.com"
    },
    {
      title: "Phone Support",
      description: "Speak to our team directly",
      icon: Phone,
      action: "tel:+44-20-1234-5678"
    },
    {
      title: "Company Information",
      description: "Learn more about NHSprep Ltd",
      icon: Building,
      action: "/company-info"
    }
  ];

  const renderFeatureCard = (feature: any, type: string) => {
    const IconComponent = feature.icon;
    
    return (
      <Card key={feature.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <IconComponent className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-base font-semibold">{feature.title}</CardTitle>
                {feature.level && (
                  <Badge variant="outline" className="mt-1 text-xs">
                    {feature.level}
                  </Badge>
                )}
                {feature.status && (
                  <Badge 
                    variant={feature.status === "Available" ? "default" : "secondary"} 
                    className="mt-1 text-xs"
                  >
                    {feature.status}
                  </Badge>
                )}
              </div>
            </div>
            {feature.premium && (
              <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                Premium
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground mb-3">{feature.description}</p>
          
          {/* Progress indicators */}
          {feature.completion !== undefined && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Progress</span>
                <span>{feature.completion}%</span>
              </div>
              <Progress value={feature.completion} className="h-2" />
            </div>
          )}
          
          {feature.progress !== undefined && feature.totalSteps && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Steps Completed</span>
                <span>{feature.progress}/{feature.totalSteps}</span>
              </div>
              <Progress value={(feature.progress / feature.totalSteps) * 100} className="h-2" />
            </div>
          )}
          
          {/* Metrics display */}
          {feature.accuracy && (
            <div className="flex justify-between items-center mt-3 p-2 bg-green-50 rounded-lg">
              <span className="text-xs font-medium text-green-700">Accuracy</span>
              <span className="text-sm font-bold text-green-600">{feature.accuracy}%</span>
            </div>
          )}
          
          {feature.scenarios && (
            <div className="flex justify-between items-center mt-3 p-2 bg-blue-50 rounded-lg">
              <span className="text-xs font-medium text-blue-700">Available Scenarios</span>
              <span className="text-sm font-bold text-blue-600">{feature.scenarios}</span>
            </div>
          )}
          
          {feature.activeGroups && (
            <div className="flex justify-between items-center mt-3 p-2 bg-purple-50 rounded-lg">
              <span className="text-xs font-medium text-purple-700">Active Groups</span>
              <span className="text-sm font-bold text-purple-600">{feature.activeGroups}</span>
            </div>
          )}
          
          {feature.questions && (
            <div className="space-y-2 mt-3">
              <div className="flex justify-between items-center p-2 bg-indigo-50 rounded-lg">
                <span className="text-xs font-medium text-indigo-700">Total Questions</span>
                <span className="text-sm font-bold text-indigo-600">{feature.questions.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-green-50 rounded-lg">
                <span className="text-xs font-medium text-green-700">Verified</span>
                <span className="text-sm font-bold text-green-600">{feature.verified?.toLocaleString()}</span>
              </div>
            </div>
          )}
          
          {feature.percentile !== undefined && (
            <div className="flex justify-between items-center mt-3 p-2 bg-yellow-50 rounded-lg">
              <span className="text-xs font-medium text-yellow-700">Your Percentile</span>
              <span className="text-sm font-bold text-yellow-600">{feature.percentile}th</span>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container max-w-7xl mx-auto p-3 sm:p-4 lg:p-6">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">More Features</h1>
        <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
          Comprehensive medical career platform beyond PLAB preparation
        </p>
      </div>

      <Tabs value={activeSection} onValueChange={setActiveSection} className="space-y-4 sm:space-y-6">
        <TabsList className="grid w-full grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 h-auto p-1 gap-1">
          <TabsTrigger value="overview" className="flex flex-col gap-1 h-auto py-2 sm:py-3 px-1 sm:px-2">
            <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="text-xs sm:text-xs font-medium">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="specialization" className="flex flex-col gap-1 h-auto py-2 sm:py-3 px-1 sm:px-2 lg:flex">
            <Stethoscope className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="text-xs sm:text-xs font-medium hidden sm:block lg:block">Specialty</span>
            <span className="text-xs sm:text-xs font-medium sm:hidden">Med</span>
          </TabsTrigger>
          <TabsTrigger value="career" className="flex flex-col gap-1 h-auto py-2 sm:py-3 px-1 sm:px-2">
            <Briefcase className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="text-xs sm:text-xs font-medium">Career</span>
          </TabsTrigger>
          <TabsTrigger value="ai-features" className="flex flex-col gap-1 h-auto py-2 sm:py-3 px-1 sm:px-2 hidden sm:flex">
            <Brain className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="text-xs sm:text-xs font-medium">AI</span>
          </TabsTrigger>
          <TabsTrigger value="regulatory" className="flex flex-col gap-1 h-auto py-2 sm:py-3 px-1 sm:px-2 hidden lg:flex">
            <Award className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="text-xs sm:text-xs font-medium">GMC</span>
          </TabsTrigger>
          <TabsTrigger value="learning-tech" className="flex flex-col gap-1 h-auto py-2 sm:py-3 px-1 sm:px-2 hidden lg:flex">
            <Headset className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="text-xs sm:text-xs font-medium">Learning</span>
          </TabsTrigger>
          <TabsTrigger value="legal-support" className="flex flex-col gap-1 h-auto py-2 sm:py-3 px-1 sm:px-2 hidden lg:flex">
            <Scale className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="text-xs sm:text-xs font-medium">Legal</span>
          </TabsTrigger>
          <TabsTrigger value="accessibility" className="flex flex-col gap-1 h-auto py-2 sm:py-3 px-1 sm:px-2 hidden lg:flex">
            <Accessibility className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="text-xs sm:text-xs font-medium">Access</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <Heart className="h-6 w-6" />
                Complete Medical Career Platform
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-800 mb-4">
                Beyond PLAB preparation, NHSprep offers comprehensive support for your entire medical career journey in the UK.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <div className="bg-white/60 p-3 sm:p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-blue-900 text-sm sm:text-base">Medical Specialization</h4>
                  <p className="text-xs sm:text-sm text-blue-700">VR surgical training, radiology interpretation, pharmacology tools</p>
                </div>
                <div className="bg-white/60 p-3 sm:p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-blue-900 text-sm sm:text-base">Career Support</h4>
                  <p className="text-xs sm:text-sm text-blue-700">NHS applications, CV optimization, interview preparation</p>
                </div>
                <div className="bg-white/60 p-3 sm:p-4 rounded-lg sm:col-span-2 lg:col-span-1">
                  <h4 className="font-semibold mb-2 text-blue-900 text-sm sm:text-base">AI-Powered Learning</h4>
                  <p className="text-xs sm:text-sm text-blue-700">Voice training, accent coaching, AI patient simulations</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <Card className="text-center">
              <CardContent className="pt-4 sm:pt-6">
                <div className="text-2xl sm:text-3xl font-bold text-primary mb-2">50+</div>
                <p className="text-xs sm:text-sm text-muted-foreground">Advanced Features</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-4 sm:pt-6">
                <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-2">45</div>
                <p className="text-xs sm:text-sm text-muted-foreground">VR Scenarios</p>
              </CardContent>
            </Card>
            <Card className="text-center sm:col-span-2 lg:col-span-1">
              <CardContent className="pt-4 sm:pt-6">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">8,750</div>
                <p className="text-xs sm:text-sm text-muted-foreground">Practice Questions</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="specialization" className="space-y-4 sm:space-y-6">
          <div className="mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">Medical Specialization Modules</h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Advanced training modules for different medical specialties with VR and AI integration.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {specializationModules.map(module => renderFeatureCard(module, 'specialization'))}
          </div>
        </TabsContent>

        <TabsContent value="career" className="space-y-4 sm:space-y-6">
          <div className="mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">Post-PLAB Career Support</h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Comprehensive tools and guidance for building your medical career in the UK NHS system.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {careerSupport.map(feature => renderFeatureCard(feature, 'career'))}
          </div>
        </TabsContent>

        <TabsContent value="ai-features" className="space-y-4 sm:space-y-6">
          <div className="mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">AI-Powered Learning Technologies</h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Cutting-edge artificial intelligence tools to enhance your medical education and communication skills.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {aiFeatures.map(feature => renderFeatureCard(feature, 'ai'))}
          </div>
        </TabsContent>

        <TabsContent value="regulatory" className="space-y-4 sm:space-y-6">
          <div className="mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">GMC Registration & Compliance</h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Complete guidance and tools for GMC registration, compliance tracking, and professional development.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {regulatoryTools.map(tool => renderFeatureCard(tool, 'regulatory'))}
          </div>
        </TabsContent>

        <TabsContent value="learning-tech" className="space-y-4 sm:space-y-6">
          <div className="mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">Enhanced Learning Technologies</h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Virtual reality, collaborative learning, and community-driven educational tools.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {learningTech.map(tech => renderFeatureCard(tech, 'learning'))}
          </div>
          <div className="mt-6 sm:mt-8">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Advanced Assessment Tools</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {assessmentTools.map(tool => renderFeatureCard(tool, 'assessment'))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="legal-support" className="space-y-4 sm:space-y-6">
          <div className="mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">Legal Documents & Support</h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Privacy policies, terms of service, and comprehensive support resources.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {legalDocuments.map((doc) => {
              const IconComponent = doc.icon;
              return (
                <Card key={doc.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <IconComponent className="h-4 w-4 sm:h-5 sm:w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-sm sm:text-base">{doc.title}</CardTitle>
                        <p className="text-xs text-muted-foreground">
                          Last updated: {doc.lastUpdated}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-xs sm:text-sm text-muted-foreground mb-3">
                      {doc.description}
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full text-xs sm:text-sm"
                    >
                      Read Document
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Contact & Support</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {supportOptions.map((option) => {
                const IconComponent = option.icon;
                return (
                  <Card key={option.title} className="cursor-pointer hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                          <IconComponent className="h-4 w-4 sm:h-5 sm:w-5" />
                        </div>
                        <div>
                          <CardTitle className="text-sm sm:text-base">{option.title}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-xs sm:text-sm text-muted-foreground mb-3">
                        {option.description}
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          if (option.action.startsWith('mailto:') || option.action.startsWith('tel:')) {
                            window.location.href = option.action;
                          }
                        }}
                        className="w-full text-xs sm:text-sm"
                      >
                        Contact Now
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <Heart className="h-5 w-5" />
                Company Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div>
                  <strong className="text-green-800">NHSprep Ltd</strong><br />
                  123 Medical Square<br />
                  London, SW1A 1AA<br />
                  United Kingdom
                </div>
                <div>
                  <strong className="text-green-800">Contact Information:</strong><br />
                  Email: hello@nhsprep.com<br />
                  Phone: +44 20 1234 5678<br />
                  Support: support@nhsprep.com
                </div>
                <div>
                  <strong className="text-green-800">Registration:</strong><br />
                  Company Number: 12345678<br />
                  ICO Registration: Z1234567<br />
                  VAT Number: GB123456789
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accessibility" className="space-y-4 sm:space-y-6">
          <div className="mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">Accessibility & Neurodiverse Support</h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Comprehensive accessibility features and specialized support for neurodiverse medical professionals.
            </p>
          </div>

          <Card className="bg-gradient-to-br from-purple-50 to-blue-100 border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-800">
                <Accessibility className="h-5 w-5" />
                Neurodiverse Learning Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-purple-800 mb-4">
                Specialized features designed for ADHD, dyslexia, autism, and other neurodivergent learning styles.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {[
                  {
                    icon: Focus,
                    title: "Focus Enhancement",
                    features: ["Distraction-free study mode", "Customizable timers", "Break reminders", "Progress tracking"]
                  },
                  {
                    icon: Type,
                    title: "Text Customization",
                    features: ["Dyslexia-friendly fonts", "Adjustable text size", "High contrast modes", "Line spacing control"]
                  },
                  {
                    icon: Volume2,
                    title: "Audio Learning",
                    features: ["Text-to-speech", "Audio descriptions", "Voice commands", "Sound alerts"]
                  }
                ].map((feature, index) => (
                  <div key={index} className="bg-white/60 p-3 sm:p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <feature.icon className="h-4 w-4 text-purple-600" />
                      <h4 className="font-semibold text-purple-900 text-sm sm:text-base">{feature.title}</h4>
                    </div>
                    <ul className="space-y-1">
                      {feature.features.map((item, idx) => (
                        <li key={idx} className="text-xs sm:text-sm text-purple-700 flex items-center gap-1">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                icon: Timer,
                title: "Extended Time Allowances",
                description: "Automatic time extensions for practice exams and assessments based on individual needs.",
                features: ["25% - 100% extra time", "Pause and resume options", "Flexible scheduling"],
                category: "time-support"
              },
              {
                icon: Palette,
                title: "Visual Accessibility",
                description: "Comprehensive visual customization options for different processing needs.",
                features: ["Color blind support", "Dark/light themes", "Reduced motion modes"],
                category: "visual-support"
              },
              {
                icon: Brain,
                title: "Cognitive Support",
                description: "Tools designed to support different cognitive processing styles and memory techniques.",
                features: ["Memory aids", "Visual mnemonics", "Structured layouts"],
                category: "cognitive-support"
              },
              {
                icon: UserCheck,
                title: "Reasonable Adjustments",
                description: "Guidance on requesting and implementing reasonable adjustments for PLAB exams.",
                features: ["PLAB adjustment forms", "Documentation support", "Expert guidance"],
                category: "adjustments"
              },
              {
                icon: MessageCircle,
                title: "Communication Support",
                description: "Alternative communication methods and social interaction tools.",
                features: ["Written instructions", "Visual communication", "Peer support groups"],
                category: "communication"
              },
              {
                icon: Settings2,
                title: "Personalized Interface",
                description: "Fully customizable study environment adapted to individual learning preferences.",
                features: ["Custom layouts", "Sensory preferences", "Workflow adaptation"],
                category: "personalization"
              }
            ].map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                      <feature.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-sm sm:text-base">{feature.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-xs sm:text-sm text-muted-foreground mb-3">
                    {feature.description}
                  </p>
                  <ul className="space-y-1">
                    {feature.features.map((item, idx) => (
                      <li key={idx} className="text-xs sm:text-sm text-gray-700 flex items-center gap-1">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-gradient-to-r from-green-50 to-teal-50 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <Lightbulb className="h-5 w-5" />
                NHS Workplace Accommodations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-800 mb-4">
                Comprehensive guidance for workplace accommodations and career support within the NHS system.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-green-900 mb-2">Pre-Employment Support</h4>
                  <ul className="space-y-1 text-sm text-green-700">
                    <li>• Disclosure guidance and timing</li>
                    <li>• Interview accommodation requests</li>
                    <li>• Documentation preparation</li>
                    <li>• Rights and legal protections</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-green-900 mb-2">Workplace Adjustments</h4>
                  <ul className="space-y-1 text-sm text-green-700">
                    <li>• Equipment and technology support</li>
                    <li>• Flexible working arrangements</li>
                    <li>• Communication preferences</li>
                    <li>• Ongoing support networks</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
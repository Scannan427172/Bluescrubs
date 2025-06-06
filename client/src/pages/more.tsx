import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Stethoscope, 
  Briefcase, 
  Brain, 
  Award,
  Accessibility,
  Timer,
  Palette,
  UserCheck,
  MessageCircle,
  Settings2,
  Heart,
  MapPin,
  FileText,
  Users,
  Video,
  BookOpen,
  Zap,
  Shield,
  Phone,
  Scale,
  Building,
  Camera,
  Headphones,
  Monitor,
  ChevronRight
} from "lucide-react";

export default function More() {
  const specializationModules = [
    {
      icon: Heart,
      title: "Cardiology",
      description: "Comprehensive cardiovascular medicine training with ECG interpretation and case studies.",
      features: ["ECG Analysis", "Heart Sounds", "Case Studies", "Procedures"]
    },
    {
      icon: Brain,
      title: "Neurology",
      description: "Advanced neurological assessment and diagnostic techniques for complex cases.",
      features: ["Neuro Exams", "Brain Imaging", "Case Analysis", "Reflexes"]
    },
    {
      icon: Users,
      title: "Pediatrics",
      description: "Specialized training for working with children and adolescents in medical settings.",
      features: ["Child Development", "Vaccines", "Growth Charts", "Pediatric Cases"]
    },
    {
      icon: FileText,
      title: "Emergency Medicine",
      description: "Critical care scenarios and emergency response protocols for urgent situations.",
      features: ["Trauma Cases", "Triage", "Life Support", "Emergency Protocols"]
    },
    {
      icon: Building,
      title: "Internal Medicine",
      description: "Comprehensive adult medicine covering multiple organ systems and conditions.",
      features: ["Differential Diagnosis", "Treatment Plans", "Chronic Conditions", "Medication Management"]
    },
    {
      icon: Stethoscope,
      title: "General Practice",
      description: "Primary care skills for community medicine and family practice settings.",
      features: ["Preventive Care", "Chronic Disease", "Family Medicine", "Community Health"]
    }
  ];

  const careerSupport = [
    {
      icon: MapPin,
      title: "Job Search Assistance",
      description: "Comprehensive support for finding medical positions across the UK NHS system.",
      features: ["Job Matching", "Application Support", "Interview Prep", "Salary Negotiation"]
    },
    {
      icon: FileText,
      title: "CV & Portfolio Building",
      description: "Professional guidance for creating compelling medical CVs and portfolios.",
      features: ["CV Templates", "Portfolio Design", "Achievement Highlighting", "Skills Assessment"]
    },
    {
      icon: Video,
      title: "Interview Coaching",
      description: "Mock interviews and coaching sessions with experienced NHS professionals.",
      features: ["Mock Interviews", "Question Banks", "Feedback Sessions", "Confidence Building"]
    },
    {
      icon: Users,
      title: "Networking Opportunities",
      description: "Connect with other international medical graduates and NHS professionals.",
      features: ["Professional Networks", "Mentorship Programs", "Career Events", "Alumni Connections"]
    },
    {
      icon: BookOpen,
      title: "Continuing Education",
      description: "Access to ongoing medical education and professional development resources.",
      features: ["CPD Credits", "Medical Journals", "Conference Access", "Skill Updates"]
    },
    {
      icon: Shield,
      title: "Registration Support",
      description: "Guidance through GMC registration and licensing processes.",
      features: ["GMC Applications", "Document Verification", "License Renewal", "Compliance Support"]
    }
  ];

  const aiFeatures = [
    {
      icon: Brain,
      title: "AI Study Companion",
      description: "Personalized AI tutor that adapts to your learning style and progress.",
      features: ["Personalized Learning", "Progress Tracking", "Smart Recommendations", "24/7 Support"]
    },
    {
      icon: Camera,
      title: "Image Recognition",
      description: "Advanced AI for analyzing medical images, X-rays, and diagnostic visuals.",
      features: ["X-ray Analysis", "CT Scan Review", "Pattern Recognition", "Diagnostic Support"]
    },
    {
      icon: FileText,
      title: "Essay Marking",
      description: "Intelligent essay evaluation with detailed feedback and improvement suggestions.",
      features: ["Automated Grading", "Detailed Feedback", "Writing Improvement", "Citation Checking"]
    },
    {
      icon: Zap,
      title: "Adaptive Learning",
      description: "Dynamic difficulty adjustment based on your performance and learning patterns.",
      features: ["Difficulty Scaling", "Learning Analytics", "Performance Insights", "Optimal Scheduling"]
    },
    {
      icon: Monitor,
      title: "Virtual Reality",
      description: "Immersive VR clinical scenarios for hands-on practice without risk.",
      features: ["VR Simulations", "Clinical Scenarios", "Safe Practice", "Immersive Learning"]
    },
    {
      icon: Phone,
      title: "Smart Scheduling",
      description: "AI-powered study schedule optimization based on your availability and goals.",
      features: ["Schedule Optimization", "Goal Setting", "Time Management", "Progress Monitoring"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-gray-900">More Features</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Comprehensive medical career platform with specialized tools and support for international medical graduates
          </p>
        </div>

        <div className="space-y-12">
          {/* Medical Specialization */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Stethoscope className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Medical Specialization</h2>
                <p className="text-gray-600">Advanced training modules for different medical specialties</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {specializationModules.map((module, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow bg-white">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <module.icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <CardTitle className="text-lg">{module.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{module.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {module.features.map((feature, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Post-PLAB Career Support */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-green-100 rounded-lg">
                <Briefcase className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Post-PLAB Career Support</h2>
                <p className="text-gray-600">Comprehensive tools and guidance for building your medical career in the UK NHS system</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {careerSupport.map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow bg-white">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-50 rounded-lg">
                        <feature.icon className="h-5 w-5 text-green-600" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{feature.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {feature.features.map((item, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* AI-Powered Learning Technologies */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Brain className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">AI-Powered Learning Technologies</h2>
                <p className="text-gray-600">Cutting-edge artificial intelligence tools to enhance your medical education</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiFeatures.map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow bg-white">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-50 rounded-lg">
                        <feature.icon className="h-5 w-5 text-purple-600" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{feature.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {feature.features.map((item, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Accessibility & Neurodiverse Support */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Accessibility className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Accessibility & Neurodiverse Support</h2>
                <p className="text-gray-600">Specialized support for ADHD, dyslexia, autism, and other neurodivergent learning styles</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Timer,
                  title: "Extended Time Allowances",
                  description: "Automatic time extensions for practice exams and assessments based on individual needs.",
                  features: ["25% - 100% extra time", "Pause and resume options", "Flexible scheduling"]
                },
                {
                  icon: Palette,
                  title: "Visual Accessibility",
                  description: "Comprehensive visual customization options for different processing needs.",
                  features: ["Color blind support", "Dark/light themes", "Reduced motion modes"]
                },
                {
                  icon: Brain,
                  title: "Cognitive Support",
                  description: "Tools designed to support different cognitive processing styles and memory techniques.",
                  features: ["Memory aids", "Visual mnemonics", "Structured layouts"]
                },
                {
                  icon: UserCheck,
                  title: "Reasonable Adjustments",
                  description: "Guidance on requesting and implementing reasonable adjustments for PLAB exams.",
                  features: ["PLAB adjustment forms", "Documentation support", "Expert guidance"]
                },
                {
                  icon: MessageCircle,
                  title: "Communication Support",
                  description: "Alternative communication methods and social interaction tools.",
                  features: ["Written instructions", "Visual communication", "Peer support groups"]
                },
                {
                  icon: Settings2,
                  title: "Personalized Interface",
                  description: "Fully customizable study environment adapted to individual learning preferences.",
                  features: ["Custom layouts", "Sensory preferences", "Workflow adaptation"]
                }
              ].map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow bg-white">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-50 rounded-lg">
                        <feature.icon className="h-5 w-5 text-purple-600" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{feature.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {feature.features.map((item, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* GMC Registration & Regulatory Support */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-red-100 rounded-lg">
                <Award className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">GMC Registration & Regulatory Support</h2>
                <p className="text-gray-600">Complete guidance through UK medical registration and compliance processes</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: FileText,
                  title: "GMC Application Support",
                  description: "Step-by-step guidance through the GMC registration process with document preparation.",
                  features: ["Application forms", "Document checklists", "Submission tracking", "Status updates"]
                },
                {
                  icon: Shield,
                  title: "Compliance Monitoring",
                  description: "Ongoing support to maintain GMC compliance and meet continuing professional development requirements.",
                  features: ["CPD tracking", "Revalidation support", "License renewal", "Compliance alerts"]
                },
                {
                  icon: Scale,
                  title: "Legal Advisory",
                  description: "Professional legal guidance for medical practice, contracts, and regulatory matters.",
                  features: ["Contract review", "Legal advice", "Dispute resolution", "Professional indemnity"]
                },
                {
                  icon: Building,
                  title: "NHS Registration",
                  description: "Specialized support for NHS employment applications and onboarding processes.",
                  features: ["NHS applications", "Onboarding support", "Department placement", "Role guidance"]
                }
              ].map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow bg-white">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-50 rounded-lg">
                        <feature.icon className="h-5 w-5 text-red-600" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{feature.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {feature.features.map((item, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Advanced Learning Technologies */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-indigo-100 rounded-lg">
                <Monitor className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Advanced Learning Technologies</h2>
                <p className="text-gray-600">Cutting-edge educational tools and immersive learning experiences</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Monitor,
                  title: "Virtual Reality Clinical Scenarios",
                  description: "Immersive VR environments for practicing clinical procedures and patient interactions.",
                  features: ["VR simulations", "Clinical procedures", "Patient interactions", "Safe practice environment"]
                },
                {
                  icon: Headphones,
                  title: "Audio Learning Modules",
                  description: "Comprehensive audio content for auditory learners and hands-free study sessions.",
                  features: ["Audio lectures", "Podcast content", "Voice-guided practice", "Multi-language support"]
                },
                {
                  icon: Video,
                  title: "Interactive Video Consultations",
                  description: "Live and recorded video sessions with medical experts and practicing physicians.",
                  features: ["Expert consultations", "Live Q&A sessions", "Recorded lectures", "Interactive workshops"]
                }
              ].map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow bg-white">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-50 rounded-lg">
                        <feature.icon className="h-5 w-5 text-indigo-600" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{feature.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {feature.features.map((item, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
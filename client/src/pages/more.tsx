import { Card, CardContent } from "@/components/ui/card";
import { 
  ChevronLeft,
  ChevronRight,
  Settings,
  Shield,
  Database,
  BookOpen,
  Award,
  Users,
  Clock,
  User,
  FileText,
  Heart,
  Activity,
  Target,
  Camera,
  BarChart3,
  Brain,
  Stethoscope,
  MapPin,
  Video,
  Phone,
  Building,
  Scale,
  Accessibility,
  Timer,
  Palette,
  UserCheck,
  MessageCircle,
  Settings2,
  Monitor,
  Headphones,
  Zap
} from "lucide-react";
import { Link } from "wouter";

export default function More() {
  const adminTools = [
    {
      icon: Database,
      title: "Storage Management",
      description: "System management and optimization tools"
    },
    {
      icon: Shield,
      title: "Security",
      description: "Security settings and access controls"
    },
    {
      icon: Settings,
      title: "Settings",
      description: "Platform configuration and preferences"
    }
  ];

  const features = [
    {
      icon: Users,
      title: "Who are NHSprep",
      description: "Meet the founders - NHS doctor Yasa and developer Keith Hunter",
      hasArrow: true,
      link: "/who-are-nhsprep"
    },
    {
      icon: BookOpen,
      title: "Study Resources",
      description: "PLAB exam guides, medical textbooks, and educational materials",
      hasArrow: true
    },
    {
      icon: Heart,
      title: "Clinical Skills",
      description: "Essential clinical examination techniques and patient care",
      hasArrow: true
    },
    {
      icon: Award,
      title: "Achievements",
      description: "Your PLAB preparation milestones and progress badges",
      hasArrow: true
    },
    {
      icon: Clock,
      title: "Study History",
      description: "Past study sessions and examination progress tracking",
      hasArrow: true
    },
    {
      icon: User,
      title: "Medical Profile",
      description: "Manage your medical student profile and preferences",
      hasArrow: true
    },
    {
      icon: Users,
      title: "Mentors Corner",
      description: "Exclusive resources and guidance from medical mentors",
      hasArrow: true
    },
    {
      icon: FileText,
      title: "GMC Guidelines",
      description: "Official GMC regulations and medical practice standards",
      hasArrow: true
    },
    {
      icon: Stethoscope,
      title: "Clinical Cases",
      description: "Interactive medical case studies and diagnostic scenarios",
      hasArrow: true
    },
    {
      icon: Shield,
      title: "Patient Safety",
      description: "Essential patient safety protocols and risk management",
      hasArrow: true
    },
    {
      icon: Brain,
      title: "Medical Knowledge",
      description: "Comprehensive medical knowledge assessment and tracking",
      hasArrow: true
    },
    {
      icon: Activity,
      title: "Performance Analytics",
      description: "Detailed analysis of your PLAB preparation performance",
      hasArrow: true
    },
    {
      icon: Camera,
      title: "OSCE Practice",
      description: "Video-based OSCE station practice and skill assessment",
      hasArrow: true
    }
  ];

  // Medical specialization features for PLAB
  const medicalFeatures = [
    {
      icon: Stethoscope,
      title: "Medical Specialization",
      description: "Advanced training modules for different medical specialties",
      hasArrow: true
    },
    {
      icon: Brain,
      title: "AI-Powered Learning",
      description: "Personalized AI tutoring and adaptive learning systems",
      hasArrow: true
    },
    {
      icon: MapPin,
      title: "Career Support",
      description: "Post-PLAB career guidance and NHS job placement",
      hasArrow: true
    },
    {
      icon: Video,
      title: "Video Consultations",
      description: "Live sessions with medical experts and mentors",
      hasArrow: true
    },
    {
      icon: Building,
      title: "GMC Registration",
      description: "Complete guidance through UK medical registration",
      hasArrow: true
    },
    {
      icon: Scale,
      title: "Legal Support",
      description: "Professional legal guidance for medical practice",
      hasArrow: true
    },
    {
      icon: Accessibility,
      title: "Neurodiverse Support",
      description: "Specialized support for ADHD, dyslexia, and autism",
      hasArrow: true
    },
    {
      icon: Monitor,
      title: "VR Clinical Scenarios",
      description: "Immersive virtual reality medical training",
      hasArrow: true
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="container max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/dashboard" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">More Options</h1>
        </div>

        {/* Admin Tools Section */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Admin Tools</h2>
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Admin Tools</h3>
              <p className="text-blue-700 text-sm">System management and optimization tools</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {adminTools.map((tool, index) => (
                <Link key={index} href="/admin-tools">
                  <Card className="bg-blue-800/20 border-blue-300 hover:bg-blue-800/30 transition-colors cursor-pointer">
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                      <tool.icon className="h-8 w-8 text-blue-600 mb-3" />
                      <h4 className="font-medium text-blue-900">{tool.title}</h4>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => {
              const CardComponent = feature.link ? Link : "div";
              const cardProps = feature.link ? { href: feature.link } : {};
              
              return (
                <CardComponent key={index} {...cardProps}>
                  <Card className="bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer border-blue-200">
                    <CardContent className="flex items-center p-6">
                      <div className="p-3 bg-blue-500/20 rounded-lg mr-4">
                        <feature.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                        <p className="text-gray-600 text-sm">{feature.description}</p>
                      </div>
                      {feature.hasArrow && (
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      )}
                    </CardContent>
                  </Card>
                </CardComponent>
              );
            })}
          </div>
        </div>

        {/* Medical Specialization Features */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Medical Education Platform</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {medicalFeatures.map((feature, index) => (
              <Card key={index} className="bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer border-blue-200">
                <CardContent className="flex items-center p-6">
                  <div className="p-3 bg-blue-500/20 rounded-lg mr-4">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                  {feature.hasArrow && (
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Neurodiverse Support */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Neurodiverse Support</h2>
          <div className="mb-6">
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Accessibility className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-purple-900">Comprehensive Neurodiverse Support</h3>
                  <p className="text-purple-700 text-sm">Specialized support for ADHD, dyslexia, autism, and other neurodivergent learning styles</p>
                </div>
              </div>
            </Card>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: Timer,
                title: "Extended Time Allowances",
                description: "25% - 100% extra time for practice exams with pause and resume options"
              },
              {
                icon: Palette,
                title: "Visual Accessibility Options",
                description: "Color blind support, dark/light themes, reduced motion modes"
              },
              {
                icon: Brain,
                title: "ADHD Learning Support",
                description: "Focus timers, distraction-free modes, and attention management tools"
              },
              {
                icon: BookOpen,
                title: "Dyslexia Reading Tools",
                description: "Dyslexia-friendly fonts, text spacing adjustments, reading assistance"
              },
              {
                icon: UserCheck,
                title: "Reasonable Adjustments",
                description: "PLAB exam adjustment forms, documentation support, expert guidance"
              },
              {
                icon: MessageCircle,
                title: "Communication Support",
                description: "Written instructions, visual communication aids, peer support groups"
              },
              {
                icon: Settings2,
                title: "Personalized Interface",
                description: "Custom layouts, sensory preferences, workflow adaptation tools"
              },
              {
                icon: Headphones,
                title: "Audio Learning Support",
                description: "Audio lectures, voice-guided practice, multi-sensory content"
              },
              {
                icon: Heart,
                title: "Autism Spectrum Support",
                description: "Structured routines, clear instructions, social communication guidance"
              },
              {
                icon: Shield,
                title: "Stress Management",
                description: "Anxiety reduction techniques, mindfulness tools, emotional regulation"
              },
              {
                icon: Users,
                title: "Peer Support Network",
                description: "Connect with other neurodiverse medical students and mentors"
              },
              {
                icon: FileText,
                title: "Documentation & Forms",
                description: "Help with disability evidence forms, DSA applications, adjustments"
              }
            ].map((feature, index) => (
              <Card key={index} className="bg-purple-50 hover:bg-purple-100 transition-colors cursor-pointer border-purple-200">
                <CardContent className="flex items-center p-4">
                  <div className="p-2 bg-purple-500/20 rounded-lg mr-3">
                    <feature.icon className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 text-sm mb-1">{feature.title}</h4>
                    <p className="text-gray-600 text-xs">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* AI & Technology Features */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">AI & Advanced Technology</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: Brain,
                title: "AI Study Companion",
                description: "Personalized AI tutor with 24/7 support"
              },
              {
                icon: BarChart3,
                title: "Analytics Engine",
                description: "Advanced performance tracking and insights"
              },
              {
                icon: Monitor,
                title: "Virtual Reality",
                description: "Immersive VR clinical scenario training"
              },
              {
                icon: Camera,
                title: "Image Recognition",
                description: "AI-powered medical image analysis"
              },
              {
                icon: Zap,
                title: "Adaptive Learning",
                description: "Dynamic difficulty adjustment system"
              },
              {
                icon: Phone,
                title: "Smart Scheduling",
                description: "AI-optimized study schedule planning"
              }
            ].map((feature, index) => (
              <Card key={index} className="bg-green-50 hover:bg-green-100 transition-colors cursor-pointer border-green-200">
                <CardContent className="flex items-center p-4">
                  <div className="p-2 bg-green-500/20 rounded-lg mr-3">
                    <feature.icon className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 text-sm mb-1">{feature.title}</h4>
                    <p className="text-gray-600 text-xs">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Legal & Compliance */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Legal & Compliance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                icon: FileText,
                title: "Privacy Policy",
                description: "Data protection and privacy information for users",
                hasArrow: true
              },
              {
                icon: Shield,
                title: "GDPR Compliance",
                description: "European data protection regulations and user rights",
                hasArrow: true
              },
              {
                icon: FileText,
                title: "Terms of Service",
                description: "Platform usage terms and conditions",
                hasArrow: true
              },
              {
                icon: Scale,
                title: "Legal Documents",
                description: "Contracts, agreements, and legal frameworks",
                hasArrow: true
              },
              {
                icon: Shield,
                title: "Data Protection",
                description: "Information security and data handling policies",
                hasArrow: true
              },
              {
                icon: FileText,
                title: "Cookie Policy",
                description: "Website cookies and tracking information",
                hasArrow: true
              }
            ].map((feature, index) => (
              <Link key={index} href="/legal-compliance">
                <Card className="bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer border-slate-200">
                  <CardContent className="flex items-center p-6">
                    <div className="p-3 bg-slate-500/20 rounded-lg mr-4">
                      <feature.icon className="h-6 w-6 text-slate-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                    {feature.hasArrow && (
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Support & Help */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Support & Help</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: MessageCircle,
                title: "Contact Support",
                description: "Get help from our support team"
              },
              {
                icon: BookOpen,
                title: "User Guide",
                description: "Comprehensive platform documentation"
              },
              {
                icon: Video,
                title: "Video Tutorials",
                description: "Step-by-step video instructions"
              },
              {
                icon: Users,
                title: "Community Forum",
                description: "Connect with other medical students"
              },
              {
                icon: FileText,
                title: "FAQ",
                description: "Frequently asked questions and answers"
              },
              {
                icon: Phone,
                title: "Live Chat",
                description: "Real-time chat support assistance"
              }
            ].map((feature, index) => (
              <Card key={index} className="bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer border-indigo-200">
                <CardContent className="flex items-center p-4">
                  <div className="p-2 bg-indigo-500/20 rounded-lg mr-3">
                    <feature.icon className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 text-sm mb-1">{feature.title}</h4>
                    <p className="text-gray-600 text-xs">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Account & Billing */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6">Account & Billing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                icon: User,
                title: "Account Settings",
                description: "Manage your profile and preferences",
                hasArrow: true
              },
              {
                icon: Heart,
                title: "Subscription Management",
                description: "View and modify your subscription plan",
                hasArrow: true
              },
              {
                icon: FileText,
                title: "Billing History",
                description: "Access invoices and payment records",
                hasArrow: true
              },
              {
                icon: Settings,
                title: "Notification Settings",
                description: "Configure email and push notifications",
                hasArrow: true
              }
            ].map((feature, index) => (
              <Card key={index} className="bg-orange-50 hover:bg-orange-100 transition-colors cursor-pointer border-orange-200">
                <CardContent className="flex items-center p-6">
                  <div className="p-3 bg-orange-500/20 rounded-lg mr-4">
                    <feature.icon className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                  {feature.hasArrow && (
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
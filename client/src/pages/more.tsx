import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import moreBgImage from '@assets/9252557F-8639-4C96-BFDA-AEACAAA7E77E_1750366172462.png';

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
      link: "/dashboard"
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
    },
    {
      icon: Users,
      title: "Community",
      description: "Connect with fellow PLAB candidates and share experiences",
      hasArrow: true,
      link: "/community"
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Advanced performance tracking and progress analytics",
      hasArrow: true,
      link: "/dashboard"
    },
    {
      icon: MapPin,
      title: "Cultural Bridge",
      description: "UK healthcare culture and communication training",
      hasArrow: true,
      link: "/dashboard"
    },
    {
      icon: Building,
      title: "NHS Preparation",
      description: "Complete NHS job application and interview preparation",
      hasArrow: true,
      link: "/dashboard"
    },
    {
      icon: UserCheck,
      title: "Expert Mentors",
      description: "1-on-1 guidance from qualified NHS doctors",
      hasArrow: true,
      link: "/community"
    },
    {
      icon: Video,
      title: "Video OSCE",
      description: "Advanced video-based OSCE practice stations",
      hasArrow: true,
      link: "/plab2-osce"
    },
    {
      icon: FileText,
      title: "Practice Tests",
      description: "Full-length PLAB 1 mock exams and timed practice tests",
      hasArrow: true,
      link: "/plab1-new"
    },
    {
      icon: Target,
      title: "Job Placement",
      description: "NHS job search, CV review, and interview preparation",
      hasArrow: true,
      link: "/premium"
    },
    {
      icon: MessageCircle,
      title: "Study Groups",
      description: "Join study groups and collaborate with other candidates",
      hasArrow: true,
      link: "/community"
    },
    {
      icon: Brain,
      title: "Ask NHS Prep AI",
      description: "Get instant answers to any medical question with UK guidelines",
      hasArrow: true,
      link: "/ask-nhs-prep"
    },
    {
      icon: Accessibility,
      title: "Accessibility",
      description: "Customizable learning experience for diverse needs",
      hasArrow: true,
      link: "/dashboard"
    },
    {
      icon: Scale,
      title: "Legal & Privacy",
      description: "Privacy policy, terms of service, and data protection",
      hasArrow: true,
      link: "/dashboard"
    },
    {
      icon: Zap,
      title: "Premium Features",
      description: "Unlock advanced AI tutoring and exclusive content",
      hasArrow: true,
      link: "/premium"
    },
    {
      icon: Brain,
      title: "Neurodiverse Support",
      description: "Specialized learning tools for different cognitive styles",
      hasArrow: true,
      link: "/dashboard"
    },
    {
      icon: Headphones,
      title: "Help Center",
      description: "Get support, tutorials, and frequently asked questions",
      hasArrow: true,
      link: "/dashboard"
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
      {/* Hero Banner */}
      <div 
        className="relative bg-gradient-to-r from-blue-600 to-purple-700 w-full h-64 md:h-80 lg:h-96 mb-8 overflow-hidden"
        style={{
          backgroundImage: `url(${moreBgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'multiply'
        }}
      >

        <div className="relative z-50 flex flex-col items-center justify-center text-center px-8 py-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-white drop-shadow-2xl" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0px 0px 8px rgba(0,0,0,0.6)'}}>
            More Resources
          </h1>
          <p className="text-xl lg:text-2xl mb-6 text-white drop-shadow-2xl" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0px 0px 8px rgba(0,0,0,0.6)'}}>
            Advanced tools and comprehensive medical education resources
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Badge className="bg-white text-black px-4 py-2">
              Premium Features
            </Badge>
            <Badge className="bg-white text-black px-4 py-2">
              Expert Support
            </Badge>
            <Badge className="bg-white text-black px-4 py-2">
              NHS Preparation
            </Badge>
          </div>
        </div>
      </div>

      <div className="container max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Navigation */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/dashboard" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <h2 className="text-2xl font-bold text-gray-900">All Features</h2>
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
                  <Card className="bg-white border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer">
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                      <tool.icon className="h-8 w-8 text-blue-600 mb-3" />
                      <h4 className="font-medium text-gray-900" style={{color: '#111827 !important'}}>{tool.title}</h4>
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
              const cardContent = (
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
              );
              
              if (feature.link) {
                return (
                  <Link key={index} href={feature.link}>
                    {cardContent}
                  </Link>
                );
              }
              
              return (
                <div key={index}>
                  {cardContent}
                </div>
              );
            })}
          </div>
        </div>










      </div>
    </div>
  );
}
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
      icon: BookOpen,
      title: "Resources",
      description: "Training guides, technique videos, and educational materials",
      hasArrow: true
    },
    {
      icon: Heart,
      title: "Nutrition",
      description: "Meal plans, nutrition advice, and recovery strategies",
      hasArrow: true
    },
    {
      icon: Award,
      title: "Achievements",
      description: "Your performance milestones and badges",
      hasArrow: true
    },
    {
      icon: Clock,
      title: "History",
      description: "Past training sessions and progress",
      hasArrow: true
    },
    {
      icon: User,
      title: "Profile",
      description: "Manage your athlete profile and settings",
      hasArrow: true
    },
    {
      icon: Users,
      title: "Coaches Corner",
      description: "Exclusive resources for coaches",
      hasArrow: true
    },
    {
      icon: FileText,
      title: "Athletics Rules",
      description: "Official rules and regulations",
      hasArrow: true
    },
    {
      icon: Target,
      title: "Injury Rehab",
      description: "Injury rehabilitation guides and programs",
      hasArrow: true
    },
    {
      icon: Shield,
      title: "Injury Prevention",
      description: "Preventative measures for common track & field injuries",
      hasArrow: true
    },
    {
      icon: Activity,
      title: "Coach Wellness",
      description: "Coach wellness monitoring dashboard",
      hasArrow: true
    },
    {
      icon: Heart,
      title: "Athlete Wellness",
      description: "Track athlete health and wellness metrics",
      hasArrow: true
    },
    {
      icon: Camera,
      title: "Technique Analysis",
      description: "Professional coaching analysis of athletic techniques",
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
          <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200 p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-red-900 mb-2">Admin Tools</h3>
              <p className="text-red-700 text-sm">System management and optimization tools</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {adminTools.map((tool, index) => (
                <Card key={index} className="bg-red-800/20 border-red-300 hover:bg-red-800/30 transition-colors cursor-pointer">
                  <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                    <tool.icon className="h-8 w-8 text-red-600 mb-3" />
                    <h4 className="font-medium text-red-900">{tool.title}</h4>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gray-800 hover:bg-gray-700 transition-colors cursor-pointer border-gray-700">
                <CardContent className="flex items-center p-6">
                  <div className="p-3 bg-orange-500/20 rounded-lg mr-4">
                    <feature.icon className="h-6 w-6 text-orange-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </div>
                  {feature.hasArrow && (
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  )}
                </CardContent>
              </Card>
            ))}
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

        {/* Accessibility Features */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Accessibility & Support</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: Timer,
                title: "Extended Time",
                description: "Automatic time extensions for exams and assessments"
              },
              {
                icon: Palette,
                title: "Visual Accessibility",
                description: "Color blind support and theme customization"
              },
              {
                icon: UserCheck,
                title: "Reasonable Adjustments",
                description: "PLAB exam adjustment guidance and forms"
              },
              {
                icon: MessageCircle,
                title: "Communication Support",
                description: "Alternative communication methods and tools"
              },
              {
                icon: Settings2,
                title: "Personalized Interface",
                description: "Customizable study environment and layouts"
              },
              {
                icon: Headphones,
                title: "Audio Learning",
                description: "Audio lectures and voice-guided practice"
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
        <div>
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
      </div>
    </div>
  );
}
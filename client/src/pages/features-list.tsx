import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronLeft,
  Brain,
  Clock,
  Users,
  Gamepad2,
  Globe,
  Smartphone,
  Zap,
  Target,
  BookOpen,
  Video,
  MessageSquare,
  Calendar,
  BarChart3,
  Shield,
  Wifi,
  Download,
  Star,
  Stethoscope,
  GraduationCap,
  Award,
  FileText,
  Heart,
  Briefcase,
  MapPin,
  Phone,
  TrendingUp,
  CheckCircle,
  Camera,
  Activity,
  UserCheck,
  Settings,
  Database,
  Lock,
  Eye,
  AlertTriangle,
  Bell,
  Palette,
  Server,
  Code,
  Accessibility,
  Headphones,
  Monitor,
  Volume2,
  Minus,
  Plus
} from "lucide-react";
import { Link } from "wouter";

export default function FeaturesList() {
  const featureCategories = [
    {
      title: "AI-Powered Learning",
      icon: Brain,
      color: "bg-blue-50 border-blue-200",
      features: [
        { name: "Adaptive Learning Engine", description: "AI adjusts difficulty based on performance", status: "active" },
        { name: "AI Study Companion", description: "24/7 intelligent tutoring assistant", status: "active" },
        { name: "Smart Question Generation", description: "Unlimited practice questions with AI", status: "active" },
        { name: "Performance Prediction", description: "AI predicts PLAB success probability", status: "beta" },
        { name: "Personalized Explanations", description: "AI-generated explanations tailored to learning style", status: "active" },
        { name: "Knowledge Gap Detection", description: "AI identifies weak areas automatically", status: "active" },
        { name: "Real-time Feedback", description: "Instant AI-powered performance feedback", status: "active" },
        { name: "Learning Path Optimization", description: "AI optimizes study sequence for maximum retention", status: "premium" }
      ]
    },
    {
      title: "Study Management",
      icon: Clock,
      color: "bg-green-50 border-green-200",
      features: [
        { name: "Smart Study Planner", description: "Optimized schedules based on exam dates", status: "active" },
        { name: "Progress Tracking", description: "Detailed analytics on study performance", status: "active" },
        { name: "Spaced Repetition", description: "Scientific approach to memory retention", status: "active" },
        { name: "Goal Setting", description: "Set and track study milestones", status: "active" },
        { name: "Study Streaks", description: "Maintain daily learning habits", status: "active" },
        { name: "Time Management", description: "Track study time and optimize efficiency", status: "active" },
        { name: "Custom Study Plans", description: "Personalized study plans by medical experts", status: "premium" },
        { name: "Study Reminders", description: "Smart notifications for optimal study times", status: "active" }
      ]
    },
    {
      title: "Interactive Learning",
      icon: Video,
      color: "bg-purple-50 border-purple-200",
      features: [
        { name: "Video OSCE Practice", description: "Realistic clinical scenarios with video", status: "active" },
        { name: "VR Clinical Scenarios", description: "Immersive virtual reality training", status: "premium" },
        { name: "Interactive Simulations", description: "Hands-on medical procedures", status: "active" },
        { name: "3D Anatomy Models", description: "Detailed anatomical visualizations", status: "active" },
        { name: "Clinical Case Studies", description: "Interactive medical case studies", status: "active" },
        { name: "Video Consultations", description: "Live video sessions with UK doctors", status: "premium" },
        { name: "Mock Interviews", description: "Video-based interview practice", status: "active" },
        { name: "Live Webinars", description: "Regular educational webinars", status: "active" }
      ]
    },
    {
      title: "Assessment & Testing",
      icon: FileText,
      color: "bg-orange-50 border-orange-200",
      features: [
        { name: "PLAB 1 Mock Exams", description: "Full-length PLAB 1 practice tests", status: "active" },
        { name: "PLAB 2 OSCE Stations", description: "Complete OSCE station practice", status: "active" },
        { name: "Adaptive Testing", description: "Tests that adapt to your knowledge level", status: "active" },
        { name: "Instant Scoring", description: "Immediate results with detailed analysis", status: "active" },
        { name: "Performance Analytics", description: "Comprehensive performance insights", status: "active" },
        { name: "Question Bank", description: "10,000+ PLAB-specific questions", status: "active" },
        { name: "Timed Practice", description: "Exam-condition timed practice sessions", status: "active" },
        { name: "AI Essay Marking", description: "Automated essay assessment with feedback", status: "premium" }
      ]
    },
    {
      title: "Social Learning",
      icon: Users,
      color: "bg-pink-50 border-pink-200",
      features: [
        { name: "Study Groups", description: "Join or create study communities", status: "active" },
        { name: "Peer Discussions", description: "Academic forums and Q&A", status: "active" },
        { name: "Mentor Matching", description: "Connect with experienced UK doctors", status: "active" },
        { name: "Global Rankings", description: "Compare progress worldwide", status: "active" },
        { name: "Live Chat Support", description: "24/7 student support chat", status: "active" },
        { name: "Expert Office Hours", description: "Weekly Q&A sessions with medical experts", status: "premium" },
        { name: "Peer Review", description: "Get feedback from other students", status: "active" },
        { name: "Alumni Network", description: "Connect with successful PLAB graduates", status: "active" }
      ]
    },
    {
      title: "Career Support",
      icon: Briefcase,
      color: "bg-indigo-50 border-indigo-200",
      features: [
        { name: "CV Optimization", description: "Professional CV writing and review", status: "active" },
        { name: "Job Placement", description: "Direct connections with NHS trusts", status: "active" },
        { name: "Interview Preparation", description: "Comprehensive interview coaching", status: "active" },
        { name: "Salary Negotiation", description: "Expert guidance on salary negotiations", status: "premium" },
        { name: "Contract Review", description: "Legal review of employment contracts", status: "premium" },
        { name: "Career Pathways", description: "Guidance on medical career progression", status: "active" },
        { name: "Networking Events", description: "Professional networking opportunities", status: "active" },
        { name: "Job Alerts", description: "Personalized job opportunity notifications", status: "active" }
      ]
    },
    {
      title: "Mobile & Accessibility",
      icon: Smartphone,
      color: "bg-teal-50 border-teal-200",
      features: [
        { name: "Mobile App", description: "Native iOS and Android apps", status: "active" },
        { name: "Offline Mode", description: "Study without internet connection", status: "active" },
        { name: "Cross-device Sync", description: "Seamless experience across devices", status: "active" },
        { name: "Push Notifications", description: "Study reminders and updates", status: "active" },
        { name: "Dark Mode", description: "Eye-friendly dark theme", status: "active" },
        { name: "Font Size Control", description: "Adjustable text size for readability", status: "active" },
        { name: "Screen Reader Support", description: "Accessibility for visually impaired", status: "active" },
        { name: "Keyboard Navigation", description: "Full keyboard accessibility", status: "active" }
      ]
    },
    {
      title: "Neurodiverse Support",
      icon: Accessibility,
      color: "bg-purple-50 border-purple-200",
      features: [
        { name: "Extended Time", description: "25% extra time for assessments", status: "active" },
        { name: "High Contrast Mode", description: "Enhanced visual contrast", status: "active" },
        { name: "Focus Mode", description: "Distraction-free interface", status: "active" },
        { name: "Reduced Motion", description: "Minimize animations and transitions", status: "active" },
        { name: "Audio Narration", description: "Text-to-speech reading", status: "active" },
        { name: "ADHD Support", description: "Specialized support for ADHD learners", status: "active" },
        { name: "Dyslexia Tools", description: "Dyslexia-friendly reading tools", status: "active" },
        { name: "Autism Accommodations", description: "Sensory-friendly learning environment", status: "active" }
      ]
    },
    {
      title: "Gamification",
      icon: Gamepad2,
      color: "bg-yellow-50 border-yellow-200",
      features: [
        { name: "Achievement System", description: "Earn badges and rewards", status: "active" },
        { name: "Study Streaks", description: "Maintain daily learning habits", status: "active" },
        { name: "Leaderboards", description: "Compete with global students", status: "active" },
        { name: "Challenges", description: "Weekly medical knowledge contests", status: "active" },
        { name: "Points System", description: "Earn points for study activities", status: "active" },
        { name: "Virtual Rewards", description: "Unlock virtual items and themes", status: "active" },
        { name: "Progress Milestones", description: "Celebrate learning achievements", status: "active" },
        { name: "Team Competitions", description: "Group challenges and tournaments", status: "active" }
      ]
    },
    {
      title: "International Support",
      icon: Globe,
      color: "bg-emerald-50 border-emerald-200",
      features: [
        { name: "Multi-language Support", description: "Platform available in 12 languages", status: "active" },
        { name: "Cultural Training", description: "UK healthcare culture orientation", status: "active" },
        { name: "Visa Guidance", description: "UK visa application support", status: "premium" },
        { name: "GMC Registration", description: "General Medical Council registration help", status: "premium" },
        { name: "IELTS Preparation", description: "English language test preparation", status: "active" },
        { name: "Currency Converter", description: "Salary and cost calculations", status: "active" },
        { name: "Time Zone Support", description: "Global scheduling and deadlines", status: "active" },
        { name: "Country-specific Guidance", description: "Tailored advice by home country", status: "active" }
      ]
    },
    {
      title: "Security & Privacy",
      icon: Shield,
      color: "bg-red-50 border-red-200",
      features: [
        { name: "Data Encryption", description: "End-to-end encryption for all data", status: "active" },
        { name: "GDPR Compliance", description: "Full European data protection compliance", status: "active" },
        { name: "Two-Factor Authentication", description: "Enhanced account security", status: "active" },
        { name: "Secure Payment", description: "PCI-compliant payment processing", status: "active" },
        { name: "Privacy Controls", description: "Granular privacy settings", status: "active" },
        { name: "Data Export", description: "Download your personal data", status: "active" },
        { name: "Account Recovery", description: "Secure account recovery process", status: "active" },
        { name: "Audit Logs", description: "Detailed security and access logs", status: "premium" }
      ]
    },
    {
      title: "Analytics & Reporting",
      icon: BarChart3,
      color: "bg-cyan-50 border-cyan-200",
      features: [
        { name: "Performance Dashboard", description: "Comprehensive study analytics", status: "active" },
        { name: "Progress Reports", description: "Detailed progress tracking", status: "active" },
        { name: "Weakness Analysis", description: "Identify knowledge gaps", status: "active" },
        { name: "Study Habits", description: "Analyze study patterns and efficiency", status: "active" },
        { name: "Peer Comparison", description: "Compare with similar students", status: "active" },
        { name: "Predictive Analytics", description: "AI-powered success predictions", status: "premium" },
        { name: "Custom Reports", description: "Generate personalized study reports", status: "premium" },
        { name: "Export Data", description: "Export analytics to external tools", status: "active" }
      ]
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'beta':
        return <Badge className="bg-yellow-100 text-yellow-800">Beta</Badge>;
      case 'premium':
        return <Badge className="bg-purple-100 text-purple-800">Premium</Badge>;
      default:
        return <Badge variant="secondary">Coming Soon</Badge>;
    }
  };

  const totalFeatures = featureCategories.reduce((sum, category) => sum + category.features.length, 0);
  const activeFeatures = featureCategories.reduce((sum, category) => 
    sum + category.features.filter(f => f.status === 'active').length, 0);
  const premiumFeatures = featureCategories.reduce((sum, category) => 
    sum + category.features.filter(f => f.status === 'premium').length, 0);
  const betaFeatures = featureCategories.reduce((sum, category) => 
    sum + category.features.filter(f => f.status === 'beta').length, 0);

  return (
    <div className="min-h-screen bg-white">
      <div className="container max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/more" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Complete Features List</h1>
            <p className="text-gray-600">Comprehensive overview of all NHSprep platform capabilities</p>
          </div>
        </div>

        {/* Feature Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{totalFeatures}</div>
              <div className="text-sm text-gray-600">Total Features</div>
            </CardContent>
          </Card>
          
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{activeFeatures}</div>
              <div className="text-sm text-gray-600">Active Features</div>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{premiumFeatures}</div>
              <div className="text-sm text-gray-600">Premium Features</div>
            </CardContent>
          </Card>

          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{betaFeatures}</div>
              <div className="text-sm text-gray-600">Beta Features</div>
            </CardContent>
          </Card>
        </div>

        {/* Feature Categories */}
        <div className="space-y-8">
          {featureCategories.map((category, index) => (
            <Card key={index} className={`${category.color} hover:shadow-lg transition-shadow`}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white rounded-lg shadow-sm">
                    <category.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{category.title}</CardTitle>
                    <p className="text-gray-600">{category.features.length} features available</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{feature.name}</div>
                        <div className="text-sm text-gray-600">{feature.description}</div>
                      </div>
                      <div className="ml-3">
                        {getStatusBadge(feature.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feature Summary */}
        <div className="mt-8">
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Platform Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600">{totalFeatures}+</div>
                  <div className="text-sm text-gray-600">Total Features</div>
                  <div className="text-xs text-gray-500 mt-1">Comprehensive platform</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600">12</div>
                  <div className="text-sm text-gray-600">Categories</div>
                  <div className="text-xs text-gray-500 mt-1">Organized learning</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600">24/7</div>
                  <div className="text-sm text-gray-600">AI Support</div>
                  <div className="text-xs text-gray-500 mt-1">Always available</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600">Global</div>
                  <div className="text-sm text-gray-600">Accessibility</div>
                  <div className="text-xs text-gray-500 mt-1">Worldwide support</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
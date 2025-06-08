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
  Star
} from "lucide-react";
import { Link } from "wouter";

export default function Features() {
  const featureCategories = [
    {
      title: "AI-Powered Learning",
      description: "Advanced artificial intelligence for personalized medical education",
      icon: Brain,
      color: "bg-blue-50 border-blue-200",
      features: [
        { name: "Adaptive Learning Engine", description: "AI adjusts difficulty based on performance", status: "active" },
        { name: "AI Study Companion", description: "24/7 intelligent tutoring assistant", status: "active" },
        { name: "Smart Question Generation", description: "Unlimited practice questions", status: "active" },
        { name: "Performance Prediction", description: "AI predicts PLAB success probability", status: "active" }
      ]
    },
    {
      title: "Study Management",
      description: "Comprehensive tools for organizing and optimizing study sessions",
      icon: Clock,
      color: "bg-green-50 border-green-200",
      features: [
        { name: "Smart Study Planner", description: "Optimized schedules based on exam dates", status: "active" },
        { name: "Progress Tracking", description: "Detailed analytics on study performance", status: "active" },
        { name: "Spaced Repetition", description: "Scientific approach to memory retention", status: "active" },
        { name: "Goal Setting", description: "Set and track study milestones", status: "active" }
      ]
    },
    {
      title: "Interactive Learning",
      description: "Engaging multimedia content and interactive experiences",
      icon: Video,
      color: "bg-purple-50 border-purple-200",
      features: [
        { name: "Video OSCE Practice", description: "Realistic clinical scenarios", status: "active" },
        { name: "VR Clinical Scenarios", description: "Immersive virtual reality training", status: "premium" },
        { name: "Interactive Simulations", description: "Hands-on medical procedures", status: "active" },
        { name: "3D Anatomy Models", description: "Detailed anatomical visualizations", status: "active" }
      ]
    },
    {
      title: "Social Learning",
      description: "Connect with peers and mentors worldwide",
      icon: Users,
      color: "bg-orange-50 border-orange-200",
      features: [
        { name: "Study Groups", description: "Join or create study communities", status: "active" },
        { name: "Peer Discussions", description: "Academic forums and Q&A", status: "active" },
        { name: "Mentor Matching", description: "Connect with experienced doctors", status: "active" },
        { name: "Global Rankings", description: "Compare progress worldwide", status: "active" }
      ]
    },
    {
      title: "Gamification",
      description: "Make learning engaging with game-like elements",
      icon: Gamepad2,
      color: "bg-pink-50 border-pink-200",
      features: [
        { name: "Achievement System", description: "Earn badges and rewards", status: "active" },
        { name: "Study Streaks", description: "Maintain daily learning habits", status: "active" },
        { name: "Leaderboards", description: "Compete with global students", status: "active" },
        { name: "Challenges", description: "Weekly medical knowledge contests", status: "active" }
      ]
    },
    {
      title: "Mobile & Offline",
      description: "Learn anywhere, anytime with mobile support",
      icon: Smartphone,
      color: "bg-indigo-50 border-indigo-200",
      features: [
        { name: "Mobile App", description: "Native iOS and Android apps", status: "active" },
        { name: "Offline Mode", description: "Study without internet connection", status: "active" },
        { name: "Sync Across Devices", description: "Seamless cross-platform experience", status: "active" },
        { name: "Push Notifications", description: "Study reminders and updates", status: "active" }
      ]
    }
  ];

  const premiumFeatures = [
    { name: "VR Clinical Training", description: "Immersive virtual reality scenarios" },
    { name: "Personal Mentor Sessions", description: "1-on-1 video calls with UK doctors" },
    { name: "Advanced Analytics", description: "Detailed performance insights" },
    { name: "Custom Study Plans", description: "Personalized by medical experts" },
    { name: "Priority Support", description: "24/7 dedicated customer service" },
    { name: "Exam Guarantee", description: "Money-back if you don't pass" }
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

  return (
    <div className="min-h-screen bg-white">
      <div className="container max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/more" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Platform Features</h1>
            <p className="text-gray-600">Comprehensive medical education tools and capabilities</p>
          </div>
        </div>

        {/* Feature Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">50+</div>
              <div className="text-sm text-gray-600">Features</div>
            </CardContent>
          </Card>
          
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">24/7</div>
              <div className="text-sm text-gray-600">AI Support</div>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">VR</div>
              <div className="text-sm text-gray-600">Training</div>
            </CardContent>
          </Card>

          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">Global</div>
              <div className="text-sm text-gray-600">Community</div>
            </CardContent>
          </Card>
        </div>

        {/* Feature Categories */}
        <div className="space-y-8 mb-8">
          {featureCategories.map((category, index) => (
            <Card key={index} className={`${category.color} hover:shadow-lg transition-shadow`}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white rounded-lg shadow-sm">
                    <category.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{category.title}</CardTitle>
                    <p className="text-gray-600">{category.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                      <div>
                        <div className="font-semibold text-gray-900">{feature.name}</div>
                        <div className="text-sm text-gray-600">{feature.description}</div>
                      </div>
                      {getStatusBadge(feature.status)}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Premium Features */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Premium Features</h2>
          <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-purple-600" />
                    Premium Subscription
                  </CardTitle>
                  <p className="text-gray-600">Advanced features for serious PLAB candidates</p>
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Upgrade to Premium
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {premiumFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg">
                    <Star className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">{feature.name}</div>
                      <div className="text-sm text-gray-600">{feature.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Access</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Brain className="h-5 w-5" />
              <span className="text-sm">AI Features</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Video className="h-5 w-5" />
              <span className="text-sm">Video OSCE</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Users className="h-5 w-5" />
              <span className="text-sm">Study Groups</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Download className="h-5 w-5" />
              <span className="text-sm">Mobile App</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
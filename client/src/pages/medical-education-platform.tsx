import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ChevronLeft,
  GraduationCap,
  Stethoscope,
  Brain,
  BookOpen,
  Video,
  FileText,
  Users,
  Award,
  Calendar,
  BarChart3,
  Globe,
  Zap,
  Target,
  Clock,
  TrendingUp
} from "lucide-react";
import { Link } from "wouter";

export default function MedicalEducationPlatform() {
  const platformStats = {
    totalStudents: 15847,
    coursesCompleted: 3264,
    successRate: 94,
    countriesServed: 67,
    mentorsActive: 234,
    hoursStudied: 89473
  };

  const educationModules = [
    {
      icon: Stethoscope,
      title: "PLAB 1 Preparation",
      description: "Comprehensive preparation for PLAB Part 1 examination",
      progress: 75,
      topics: 23,
      questions: 2847,
      status: "In Progress",
      features: ["MCQ Practice", "Mock Exams", "Detailed Explanations", "Progress Tracking"]
    },
    {
      icon: Video,
      title: "PLAB 2 OSCE Training",
      description: "Interactive OSCE scenarios and clinical skills",
      progress: 45,
      topics: 18,
      questions: 156,
      status: "Active",
      features: ["Video Scenarios", "Clinical Skills", "Communication Training", "Real-time Feedback"]
    },
    {
      icon: Brain,
      title: "Clinical Reasoning",
      description: "Advanced clinical decision-making skills",
      progress: 60,
      topics: 15,
      questions: 892,
      status: "Available",
      features: ["Case Studies", "Differential Diagnosis", "Treatment Planning", "Evidence-based Medicine"]
    },
    {
      icon: Globe,
      title: "UK Healthcare System",
      description: "Understanding NHS structure and UK medical practice",
      progress: 30,
      topics: 12,
      questions: 345,
      status: "New",
      features: ["NHS Guidelines", "UK Protocols", "Legal Framework", "Cultural Competency"]
    }
  ];

  const learningPaths = [
    {
      title: "Foundation Doctor Pathway",
      description: "Complete preparation for UK foundation training",
      duration: "12 months",
      modules: 8,
      difficulty: "Intermediate",
      enrollment: 2847
    },
    {
      title: "Specialty Training Path",
      description: "Advanced preparation for specialty applications",
      duration: "18 months",
      modules: 12,
      difficulty: "Advanced",
      enrollment: 1432
    },
    {
      title: "Quick PLAB Prep",
      description: "Intensive 3-month PLAB preparation course",
      duration: "3 months",
      modules: 6,
      difficulty: "Intensive",
      enrollment: 5628
    },
    {
      title: "Research & Academia",
      description: "Preparation for academic medicine careers",
      duration: "24 months",
      modules: 15,
      difficulty: "Expert",
      enrollment: 782
    }
  ];

  const assessmentTools = [
    {
      name: "Adaptive Testing Engine",
      description: "AI-powered questions that adapt to your knowledge level",
      usage: "89% of students",
      accuracy: "96%"
    },
    {
      name: "Performance Analytics",
      description: "Detailed insights into your learning progress",
      usage: "76% of students",
      accuracy: "98%"
    },
    {
      name: "Peer Comparison",
      description: "Compare your progress with similar students globally",
      usage: "64% of students",
      accuracy: "94%"
    },
    {
      name: "Weakness Detection",
      description: "Identify knowledge gaps and focus areas",
      usage: "92% of students",
      accuracy: "97%"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Available':
        return 'bg-gray-100 text-gray-800';
      case 'New':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Intensive':
        return 'bg-red-100 text-red-800';
      case 'Advanced':
        return 'bg-orange-100 text-orange-800';
      case 'Intermediate':
        return 'bg-blue-100 text-blue-800';
      case 'Expert':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
            <h1 className="text-2xl font-bold text-gray-900">Medical Education Platform</h1>
            <p className="text-gray-600">Comprehensive medical training and PLAB preparation ecosystem</p>
          </div>
        </div>

        {/* Platform Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{platformStats.totalStudents.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Students</div>
            </CardContent>
          </Card>
          
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{platformStats.coursesCompleted.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{platformStats.successRate}%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </CardContent>
          </Card>

          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{platformStats.countriesServed}</div>
              <div className="text-sm text-gray-600">Countries</div>
            </CardContent>
          </Card>

          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{platformStats.mentorsActive}</div>
              <div className="text-sm text-gray-600">Mentors</div>
            </CardContent>
          </Card>

          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="p-4 text-center">
              <div className="text-lg font-bold text-yellow-600">{platformStats.hoursStudied.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Study Hours</div>
            </CardContent>
          </Card>
        </div>

        {/* Education Modules */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Core Education Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {educationModules.map((module, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <module.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{module.title}</CardTitle>
                        <p className="text-sm text-gray-600">{module.description}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(module.status)}>
                      {module.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{module.progress}%</span>
                      </div>
                      <Progress value={module.progress} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-xl font-bold text-blue-600">{module.topics}</div>
                        <div className="text-xs text-gray-500">Topics</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-green-600">{module.questions}</div>
                        <div className="text-xs text-gray-500">Questions</div>
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium mb-2">Key Features:</div>
                      <div className="flex flex-wrap gap-1">
                        {module.features.map((feature, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full">
                      Continue Learning
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Learning Paths */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Structured Learning Paths</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {learningPaths.map((path, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">{path.title}</h3>
                      <p className="text-gray-600 text-sm">{path.description}</p>
                    </div>
                    <Badge className={getDifficultyColor(path.difficulty)}>
                      {path.difficulty}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-blue-600">{path.duration}</div>
                      <div className="text-xs text-gray-500">Duration</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-green-600">{path.modules}</div>
                      <div className="text-xs text-gray-500">Modules</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-purple-600">{path.enrollment}</div>
                      <div className="text-xs text-gray-500">Enrolled</div>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    Explore Path
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Assessment Tools */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Advanced Assessment Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {assessmentTools.map((tool, index) => (
              <Card key={index} className="bg-gray-50 border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <BarChart3 className="h-8 w-8 text-blue-600 mt-1" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{tool.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{tool.description}</p>
                      <div className="flex justify-between text-sm">
                        <span className="text-blue-600 font-medium">{tool.usage}</span>
                        <span className="text-green-600 font-medium">{tool.accuracy} accurate</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Platform Access</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <GraduationCap className="h-5 w-5" />
              <span className="text-sm">Start Learning</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <TrendingUp className="h-5 w-5" />
              <span className="text-sm">View Progress</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Users className="h-5 w-5" />
              <span className="text-sm">Find Study Group</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Award className="h-5 w-5" />
              <span className="text-sm">Achievements</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Flag, Users, MessageCircle, Clock, Award, 
  CheckCircle, Play, BookOpen, Stethoscope,
  Globe, Heart, AlertTriangle, Volume2
} from "lucide-react";

export default function CulturalTraining() {
  const [selectedModule, setSelectedModule] = useState<any>(null);
  const [completedModules, setCompletedModules] = useState<number[]>([1, 3]);

  const culturalModules = [
    {
      id: 1,
      title: "NHS Structure & Hierarchy",
      category: "nhs-structure",
      difficulty: "beginner",
      duration: 25,
      description: "Understanding the NHS organizational structure, roles, and referral pathways",
      content: {
        keyPoints: [
          "NHS organizational structure from trusts to departments",
          "Understanding medical hierarchy: FY1, FY2, SHO, Registrar, Consultant",
          "Referral pathways and when to escalate",
          "Multi-disciplinary team (MDT) roles and responsibilities"
        ],
        scenarios: [
          "When to call the registrar vs consultant",
          "How to make appropriate referrals",
          "Understanding discharge planning processes"
        ]
      },
      completed: true,
      score: 92
    },
    {
      id: 2,
      title: "Breaking Bad News - UK Approach",
      category: "communication",
      difficulty: "intermediate",
      duration: 35,
      description: "SPIKES protocol and UK cultural considerations for difficult conversations",
      content: {
        keyPoints: [
          "SPIKES protocol adaptation for UK context",
          "Cultural sensitivity in diverse populations",
          "Legal considerations and consent issues",
          "Supporting family members and loved ones"
        ],
        scenarios: [
          "Terminal diagnosis discussion with Muslim family",
          "Explaining treatment failure to elderly patient",
          "Discussing DNR with family members"
        ]
      },
      completed: false,
      score: null
    },
    {
      id: 3,
      title: "UK Consultation Etiquette",
      category: "communication",
      difficulty: "beginner",
      duration: 20,
      description: "Professional communication standards and patient interaction norms",
      content: {
        keyPoints: [
          "Appropriate greeting and introduction protocols",
          "Time management in 10-minute GP consultations",
          "Documentation standards and medico-legal requirements",
          "Patient autonomy and shared decision making"
        ],
        scenarios: [
          "Managing angry or frustrated patients",
          "Handling language barriers appropriately",
          "Dealing with frequent attenders"
        ]
      },
      completed: true,
      score: 88
    },
    {
      id: 4,
      title: "Accent & Pronunciation Guide",
      category: "language",
      difficulty: "intermediate",
      duration: 45,
      description: "Mastering British pronunciation and understanding regional accents",
      content: {
        keyPoints: [
          "British vs American medical terminology",
          "Common regional accents across the UK",
          "Professional pronunciation standards",
          "Managing communication barriers"
        ],
        scenarios: [
          "Understanding Scottish patient with strong accent",
          "Communicating with elderly patients with hearing difficulties",
          "Phone consultations and telemedicine communication"
        ]
      },
      completed: false,
      score: null
    },
    {
      id: 5,
      title: "UK Medical Ethics & Law",
      category: "ethics",
      difficulty: "advanced",
      duration: 40,
      description: "GMC guidance, consent laws, and ethical frameworks specific to UK practice",
      content: {
        keyPoints: [
          "GMC Good Medical Practice guidelines",
          "Mental Capacity Act and consent procedures",
          "Confidentiality rules and information sharing",
          "Safeguarding responsibilities and reporting"
        ],
        scenarios: [
          "16-year-old requesting contraception",
          "Confused elderly patient refusing treatment",
          "Suspected child abuse reporting procedures"
        ]
      },
      completed: false,
      score: null
    },
    {
      id: 6,
      title: "Cultural Sensitivity in UK",
      category: "diversity",
      difficulty: "intermediate",
      duration: 30,
      description: "Working with diverse populations and understanding cultural health beliefs",
      content: {
        keyPoints: [
          "Major ethnic communities in the UK",
          "Religious considerations in healthcare",
          "Cultural beliefs about illness and treatment",
          "Working with interpreters effectively"
        ],
        scenarios: [
          "Ramadan considerations for diabetic patients",
          "Explaining blood transfusion to Jehovah's Witness",
          "Managing traditional medicine conflicts"
        ]
      },
      completed: false,
      score: null
    }
  ];

  const categories = [
    { id: "all", name: "All Modules", count: culturalModules.length },
    { id: "nhs-structure", name: "NHS Structure", count: 1 },
    { id: "communication", name: "Communication", count: 2 },
    { id: "language", name: "Language", count: 1 },
    { id: "ethics", name: "Ethics & Law", count: 1 },
    { id: "diversity", name: "Cultural Diversity", count: 1 }
  ];

  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredModules = culturalModules.filter(module => 
    selectedCategory === "all" || module.category === selectedCategory
  );

  const completionRate = (completedModules.length / culturalModules.length) * 100;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner": return "bg-green-100 text-green-700";
      case "intermediate": return "bg-yellow-100 text-yellow-700";
      case "advanced": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const startModule = (module: any) => {
    setSelectedModule(module);
  };

  return (
    <div className="min-h-screen bg-light-bg pb-20 md:pb-0">
      {/* Header */}
      <div className="bg-white py-12 border-b" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Flag className="w-8 h-8 mr-3 text-red-600" />
              <h1 className="text-4xl font-bold" style={{ color: '#000000' }}>UK Cultural Training</h1>
            </div>
            <p className="text-xl" style={{ color: '#666666' }}>Master UK healthcare culture, communication, and professional expectations</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold mb-1" style={{ color: '#000000' }}>{completedModules.length}</div>
              <div className="text-sm" style={{ color: '#666666' }}>Modules Completed</div>
            </CardContent>
          </Card>

          <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold mb-1" style={{ color: '#000000' }}>{Math.round(completionRate)}%</div>
              <div className="text-sm" style={{ color: '#666666' }}>Progress</div>
            </CardContent>
          </Card>

          <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold mb-1" style={{ color: '#000000' }}>
                {completedModules.length > 0 ? Math.round(completedModules.reduce((acc, id) => {
                  const module = culturalModules.find(m => m.id === id);
                  return acc + (module?.score || 0);
                }, 0) / completedModules.length) : 0}%
              </div>
              <div className="text-sm" style={{ color: '#666666' }}>Average Score</div>
            </CardContent>
          </Card>

          <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="text-2xl font-bold mb-1" style={{ color: '#000000' }}>
                {culturalModules.reduce((acc, module) => acc + module.duration, 0)}
              </div>
              <div className="text-sm" style={{ color: '#666666' }}>Total Minutes</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="modules" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="modules">Training Modules</TabsTrigger>
            <TabsTrigger value="scenarios">Practice Scenarios</TabsTrigger>
            <TabsTrigger value="assessment">Cultural Assessment</TabsTrigger>
          </TabsList>

          <TabsContent value="modules" className="space-y-6">
            {/* Category Filter */}
            <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                      className={selectedCategory === category.id ? "bg-blue-600 text-white" : ""}
                    >
                      {category.name} ({category.count})
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Module Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredModules.map((module) => (
                <Card key={module.id} className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <CardTitle className="text-lg" style={{ color: '#000000' }}>{module.title}</CardTitle>
                          {module.completed && <CheckCircle className="w-5 h-5 text-green-500" />}
                        </div>
                        <div className="flex items-center space-x-2 mb-3">
                          <Badge className={getDifficultyColor(module.difficulty)}>
                            {module.difficulty}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {module.duration} min
                          </Badge>
                        </div>
                      </div>
                      {module.completed && (
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">{module.score}%</div>
                          <div className="text-xs text-gray-500">Score</div>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{module.description}</p>
                    
                    <div className="space-y-3 mb-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2" style={{ color: '#000000' }}>Key Learning Points:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {module.content.keyPoints.slice(0, 2).map((point, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <Button 
                      className={`w-full ${module.completed ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
                      onClick={() => startModule(module)}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      {module.completed ? 'Review Module' : 'Start Module'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="scenarios" className="space-y-6">
            <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
              <CardHeader>
                <CardTitle style={{ color: '#000000' }}>Interactive Cultural Scenarios</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                          <Heart className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <h4 className="font-medium" style={{ color: '#000000' }}>Emergency Communication</h4>
                          <p className="text-sm text-gray-600">Breaking bad news in A&E</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        <Play className="w-4 h-4 mr-2" />
                        Practice Scenario
                      </Button>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Users className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium" style={{ color: '#000000' }}>Family Consultation</h4>
                          <p className="text-sm text-gray-600">Managing multiple family members</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        <Play className="w-4 h-4 mr-2" />
                        Practice Scenario
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Globe className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-medium" style={{ color: '#000000' }}>Cultural Sensitivity</h4>
                          <p className="text-sm text-gray-600">Religious considerations in care</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        <Play className="w-4 h-4 mr-2" />
                        Practice Scenario
                      </Button>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                          <Volume2 className="w-5 h-5 text-yellow-600" />
                        </div>
                        <div>
                          <h4 className="font-medium" style={{ color: '#000000' }}>Pronunciation Practice</h4>
                          <p className="text-sm text-gray-600">Regional accent training</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        <Play className="w-4 h-4 mr-2" />
                        Practice Scenario
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assessment" className="space-y-6">
            <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
              <CardHeader>
                <CardTitle style={{ color: '#000000' }}>Cultural Competency Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Award className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-4" style={{ color: '#000000' }}>Ready for Assessment?</h3>
                  <p className="text-gray-600 mb-6">Complete at least 4 training modules to unlock the cultural competency assessment</p>
                  <div className="mb-6">
                    <Progress value={completionRate} className="w-64 mx-auto" />
                    <p className="text-sm text-gray-500 mt-2">{completedModules.length}/4 modules completed</p>
                  </div>
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={completedModules.length < 4}
                  >
                    {completedModules.length >= 4 ? 'Start Assessment' : 'Complete More Modules'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Flag, Globe, Users, Trophy, BookOpen, Target, Clock, CheckCircle } from "lucide-react";

export default function GlobalPractice() {
  const [selectedExam, setSelectedExam] = useState("USMLE");

  const globalExams = [
    {
      id: "USMLE",
      name: "USMLE (United States)",
      flag: "🇺🇸",
      description: "United States Medical Licensing Examination",
      steps: ["Step 1", "Step 2 CK", "Step 2 CS", "Step 3"],
      difficulty: "High",
      duration: "8-9 hours per step",
      passRate: "92%",
      questions: 1500,
      features: ["Clinical Skills", "Basic Science", "Clinical Knowledge"]
    },
    {
      id: "AMC",
      name: "AMC (Australia)",
      flag: "🇦🇺",
      description: "Australian Medical Council Examination",
      steps: ["MCQ", "Clinical Examination"],
      difficulty: "High",
      duration: "3.5 + 16 stations",
      passRate: "85%",
      questions: 850,
      features: ["Multiple Choice", "Clinical Stations", "Communication"]
    },
    {
      id: "MCCQE",
      name: "MCCQE (Canada)",
      flag: "🇨🇦",
      description: "Medical Council of Canada Qualifying Examination",
      steps: ["Part I", "Part II"],
      difficulty: "Medium",
      duration: "7 hours + OSCE",
      passRate: "88%",
      questions: 1200,
      features: ["Clinical Decision Making", "OSCE Stations", "Medical Knowledge"]
    },
    {
      id: "NZREX",
      name: "NZREX (New Zealand)",
      flag: "🇳🇿",
      description: "New Zealand Registration Examination",
      steps: ["Clinical", "Written"],
      difficulty: "Medium",
      duration: "Multiple days",
      passRate: "82%",
      questions: 600,
      features: ["Clinical Skills", "Professional Communication", "Ethics"]
    },
    {
      id: "SMLE",
      name: "SMLE (Saudi Arabia)",
      flag: "🇸🇦",
      description: "Saudi Medical Licensing Examination",
      steps: ["Part I", "Part II"],
      difficulty: "Medium",
      duration: "4 hours each",
      passRate: "75%",
      questions: 800,
      features: ["Islamic Medical Ethics", "Clinical Practice", "Public Health"]
    },
    {
      id: "DHA",
      name: "DHA (Dubai)",
      flag: "🇦🇪",
      description: "Dubai Health Authority Examination",
      steps: ["Written Exam", "Clinical Assessment"],
      difficulty: "Medium",
      duration: "3 hours + practical",
      passRate: "78%",
      questions: 500,
      features: ["UAE Health System", "Clinical Competency", "Professional Standards"]
    }
  ];

  const comparisons = [
    {
      aspect: "Question Format",
      PLAB: "Single Best Answer (SBA)",
      USMLE: "Multiple formats including SBA",
      AMC: "Multiple Choice Questions",
      MCCQE: "Clinical Decision Making"
    },
    {
      aspect: "Clinical Component",
      PLAB: "OSCE Stations (18 stations)",
      USMLE: "Clinical Skills (Step 2 CS)",
      AMC: "Clinical Examination (16 stations)",
      MCCQE: "OSCE (12 stations)"
    },
    {
      aspect: "Duration",
      PLAB: "3 hours + 3 hours OSCE",
      USMLE: "8-9 hours per step",
      AMC: "3.5 hours + 4 hours clinical",
      MCCQE: "7 hours + 4 hours OSCE"
    },
    {
      aspect: "Pass Rate",
      PLAB: "85%",
      USMLE: "92%",
      AMC: "85%",
      MCCQE: "88%"
    }
  ];

  const crossTrainingBenefits = [
    {
      icon: Globe,
      title: "Global Medical Knowledge",
      description: "Exposure to different healthcare systems and medical practices worldwide"
    },
    {
      icon: Users,
      title: "Cultural Competency",
      description: "Understanding diverse patient populations and communication styles"
    },
    {
      icon: Trophy,
      title: "Enhanced Preparation",
      description: "Multiple exam formats strengthen overall medical knowledge and skills"
    },
    {
      icon: BookOpen,
      title: "Comprehensive Learning",
      description: "Different medical guidelines and evidence-based practices"
    }
  ];

  const currentExam = globalExams.find(exam => exam.id === selectedExam);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Flag className="w-8 h-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-900">Global Medical Licensing Exams</h1>
          </div>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Practice for medical licensing exams worldwide. Compare formats, understand requirements, 
            and enhance your preparation with international medical knowledge.
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="practice">Practice Tests</TabsTrigger>
            <TabsTrigger value="comparison">Comparison</TabsTrigger>
            <TabsTrigger value="preparation">Preparation</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {globalExams.map((exam) => (
                <Card 
                  key={exam.id}
                  className={`cursor-pointer transition-all ${
                    selectedExam === exam.id ? 'ring-2 ring-green-500 bg-green-50' : 'hover:shadow-lg'
                  }`}
                  onClick={() => setSelectedExam(exam.id)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="text-3xl">{exam.flag}</div>
                      <Badge variant={exam.difficulty === 'High' ? 'destructive' : 'secondary'}>
                        {exam.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{exam.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-3">{exam.description}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Duration:</span>
                        <span>{exam.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Pass Rate:</span>
                        <span className="text-green-600 font-medium">{exam.passRate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Questions:</span>
                        <span>{exam.questions}+</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Selected Exam Details */}
            {currentExam && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <span className="text-2xl">{currentExam.flag}</span>
                    {currentExam.name} - Detailed Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Examination Steps</h4>
                      <div className="space-y-2">
                        {currentExam.steps.map((step, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Key Features</h4>
                      <div className="space-y-2">
                        {currentExam.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Target className="w-4 h-4 text-blue-600" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Practice Tests Tab */}
          <TabsContent value="practice" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {globalExams.map((exam) => (
                <Card key={exam.id}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{exam.flag}</span>
                      <div>
                        <CardTitle className="text-lg">{exam.name}</CardTitle>
                        <p className="text-sm text-gray-600">{exam.questions}+ Questions</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Completion</span>
                          <span>65%</span>
                        </div>
                        <Progress value={65} className="h-2" />
                      </div>
                      <Button className="w-full">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Continue Practice
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Comparison Tab */}
          <TabsContent value="comparison" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Exam Format Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3">Aspect</th>
                        <th className="text-left p-3">🇬🇧 PLAB</th>
                        <th className="text-left p-3">🇺🇸 USMLE</th>
                        <th className="text-left p-3">🇦🇺 AMC</th>
                        <th className="text-left p-3">🇨🇦 MCCQE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisons.map((comparison, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-3 font-medium">{comparison.aspect}</td>
                          <td className="p-3">{comparison.PLAB}</td>
                          <td className="p-3">{comparison.USMLE}</td>
                          <td className="p-3">{comparison.AMC}</td>
                          <td className="p-3">{comparison.MCCQE}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preparation Tab */}
          <TabsContent value="preparation" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {crossTrainingBenefits.map((benefit, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <benefit.icon className="w-8 h-8 text-green-600 mb-3" />
                    <h3 className="font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Cross-Training Preparation Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Phase 1: Foundation (4 weeks)</h4>
                    <p className="text-blue-700 text-sm">Master PLAB format and build strong medical knowledge base</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Phase 2: Expansion (6 weeks)</h4>
                    <p className="text-green-700 text-sm">Practice USMLE and AMC question formats to broaden perspective</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-2">Phase 3: Integration (4 weeks)</h4>
                    <p className="text-purple-700 text-sm">Combine knowledge from multiple systems for comprehensive understanding</p>
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, Target, TrendingUp, Globe, CheckCircle, 
  AlertTriangle, Users, Star, Award
} from "lucide-react";
import { GMC_QUESTION_BANK } from "@shared/gmc-question-bank";
import { 
  USMLE_QUESTION_BANK, MCCEE_QUESTION_BANK, AMC_QUESTION_BANK, 
  MRCP_QUESTION_BANK, MIDDLE_EAST_QUESTION_BANK, IELTS_MEDICAL_QUESTION_BANK 
} from "@shared/global-exam-banks";
import { QUESTION_BANK_STATS } from "@shared/expanded-question-bank";

export default function QuestionBankStatus() {
  const questionStats = {
    gmc: {
      current: QUESTION_BANK_STATS.totalQuestions, // Real question count from database
      target: 5000,
      name: "PLAB (UK)",
      categories: Object.keys(QUESTION_BANK_STATS.byCategory).length,
      averageRating: 4.9
    },
    usmle: {
      current: USMLE_QUESTION_BANK.length,
      target: 4500,
      name: "USMLE (USA)",
      categories: [...new Set(USMLE_QUESTION_BANK.map(q => q.category))].length,
      averageRating: 4.8
    },
    mccee: {
      current: MCCEE_QUESTION_BANK.length,
      target: 3000,
      name: "MCCEE (Canada)",
      categories: [...new Set(MCCEE_QUESTION_BANK.map(q => q.category))].length,
      averageRating: 4.7
    },
    amc: {
      current: AMC_QUESTION_BANK.length,
      target: 2500,
      name: "AMC (Australia)",
      categories: [...new Set(AMC_QUESTION_BANK.map(q => q.category))].length,
      averageRating: 4.8
    },
    mrcp: {
      current: MRCP_QUESTION_BANK.length,
      target: 3500,
      name: "MRCP (Ireland)",
      categories: [...new Set(MRCP_QUESTION_BANK.map(q => q.category))].length,
      averageRating: 4.9
    },
    middleEast: {
      current: MIDDLE_EAST_QUESTION_BANK.length,
      target: 2000,
      name: "Middle East Exams",
      categories: [...new Set(MIDDLE_EAST_QUESTION_BANK.map(q => q.category))].length,
      averageRating: 4.6
    },
    ielts: {
      current: IELTS_MEDICAL_QUESTION_BANK.length,
      target: 1800,
      name: "IELTS Medical",
      categories: [...new Set(IELTS_MEDICAL_QUESTION_BANK.map(q => q.category))].length,
      averageRating: 4.7
    }
  };

  const totalCurrent = Object.values(questionStats).reduce((sum, stat) => sum + stat.current, 0);
  const totalTarget = Object.values(questionStats).reduce((sum, stat) => sum + stat.target, 0);
  const overallProgress = (totalCurrent / totalTarget) * 100;

  const competitorComparison = [
    { name: "UWorld", questions: "4,000+", coverage: "PLAB, USMLE", price: "$200-400", uniqueFeatures: "High-yield questions" },
    { name: "OnExamination", questions: "2,500+", coverage: "PLAB, MRCP", price: "$30-60", uniqueFeatures: "UK focus" },
    { name: "Passmedicine", questions: "2,000+", coverage: "UK Exams", price: "$30-50", uniqueFeatures: "Basic practice" },
    { name: "Lecturio", questions: "3,000+", coverage: "USMLE, PLAB", price: "$39-79", uniqueFeatures: "Video lectures" },
    { name: "NHSprep", questions: `${totalCurrent.toLocaleString()}`, coverage: "Global (15+ countries)", price: "$29-149", uniqueFeatures: "AI coaching, Cultural bridge, Neurodiverse support" }
  ];

  const uniqueAdvantages = [
    "Emotional AI coaching",
    "Cultural medical bridge", 
    "Neurodiverse accessibility",
    "Multilingual terminology",
    "15+ country coverage",
    "Job placement integration"
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold">Question Bank Development Status</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Real-time progress toward building the world's most comprehensive medical exam preparation ecosystem.
        </p>
      </div>

      {/* Overall Progress */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Global Question Bank Progress</span>
            <Badge variant={overallProgress < 10 ? "destructive" : overallProgress < 50 ? "secondary" : "default"}>
              {overallProgress.toFixed(1)}% Complete
            </Badge>
          </CardTitle>
          <CardDescription>
            Building toward {totalTarget.toLocaleString()} professionally-written questions across all medical licensing exams
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Total Questions</span>
                <span className="text-sm text-muted-foreground">
                  {totalCurrent.toLocaleString()} / {totalTarget.toLocaleString()}
                </span>
              </div>
              <Progress value={overallProgress} className="h-3" />
            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{totalCurrent}</div>
                <div className="text-sm text-blue-700">Current Questions</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{totalTarget.toLocaleString()}</div>
                <div className="text-sm text-green-700">Target Questions</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">15+</div>
                <div className="text-sm text-purple-700">Countries Covered</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Individual Exam Progress */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {Object.entries(questionStats).map(([key, stat]) => (
          <Card key={key}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{stat.name}</span>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm">{stat.averageRating}</span>
                </div>
              </CardTitle>
              <CardDescription>
                {stat.categories} medical specialties covered
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Questions Available</span>
                    <span className="text-sm font-medium">
                      {stat.current} / {stat.target.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={(stat.current / stat.target) * 100} />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <Badge variant={
                    (stat.current / stat.target) * 100 < 1 ? "destructive" : 
                    (stat.current / stat.target) * 100 < 10 ? "secondary" : "default"
                  }>
                    {((stat.current / stat.target) * 100).toFixed(1)}%
                  </Badge>
                </div>

                {stat.current < 100 && (
                  <div className="flex items-center gap-2 text-sm text-amber-600">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Expanding question bank in development</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Competitor Comparison */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Market Position Analysis
          </CardTitle>
          <CardDescription>
            How NHSprep compares to established medical exam preparation platforms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Platform</th>
                  <th className="text-left p-3">Questions</th>
                  <th className="text-left p-3">Coverage</th>
                  <th className="text-left p-3">Price Range</th>
                  <th className="text-left p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {competitorComparison.map((competitor, index) => (
                  <tr key={index} className={`border-b ${competitor.name === 'NHSprep' ? 'bg-blue-50' : ''}`}>
                    <td className="p-3 font-medium">{competitor.name}</td>
                    <td className="p-3">{competitor.questions}</td>
                    <td className="p-3">{competitor.coverage}</td>
                    <td className="p-3">{competitor.price}</td>
                    <td className="p-3">
                      {competitor.name === 'NHSprep' ? (
                        <Badge className="bg-blue-600">Developing</Badge>
                      ) : (
                        <Badge variant="outline">Established</Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Unique Advantages */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Competitive Advantages
          </CardTitle>
          <CardDescription>
            Features that no competitor currently offers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {uniqueAdvantages.map((advantage, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-green-800 font-medium">{advantage}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Strategic Position</h4>
            <p className="text-blue-700 text-sm">
              While our question count is currently lower than established competitors, 
              our unique features (emotional AI, cultural bridge, neurodiverse support) 
              provide unprecedented value that justifies premium positioning and rapid user acquisition.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Development Roadmap */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Question Bank Expansion Roadmap
          </CardTitle>
          <CardDescription>
            Strategic plan to reach competitive question volumes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
              <div>
                <h4 className="font-medium">Quality Foundation (Current)</h4>
                <p className="text-sm text-muted-foreground">
                  Establish high-quality question templates and review processes
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
              <div>
                <h4 className="font-medium">Rapid Content Generation</h4>
                <p className="text-sm text-muted-foreground">
                  Scale question production using AI assistance and medical professional review
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
              <div>
                <h4 className="font-medium">Community Contribution</h4>
                <p className="text-sm text-muted-foreground">
                  Enable qualified medical professionals to contribute and review questions
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
              <div>
                <h4 className="font-medium">Market Leadership</h4>
                <p className="text-sm text-muted-foreground">
                  Achieve 5,000+ questions per exam with unmatched quality and unique features
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
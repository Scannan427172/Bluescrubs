import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronLeft,
  Globe,
  BookOpen,
  Clock,
  DollarSign,
  Users,
  Award,
  FileText,
  Stethoscope,
  GraduationCap,
  MapPin,
  Target,
  TrendingUp,
  Star,
  CheckCircle,
  ArrowRight,
  Building,
  Heart,
  Brain,
  Activity
} from "lucide-react";
import { Link } from "wouter";

export default function GlobalExams() {
  const examCategories = [
    {
      region: "United Kingdom",
      flag: "🇬🇧",
      color: "bg-blue-50 border-blue-200",
      exams: [
        {
          name: "PLAB",
          fullName: "Professional and Linguistic Assessments Board",
          description: "Essential licensing exam for international medical graduates",
          parts: 2,
          cost: "£1,142",
          duration: "12-18 months",
          passRate: "65%",
          candidates: "15,000/year",
          status: "active",
          features: ["AI Practice Tests", "OSCE Training", "UK Job Placement"]
        },
        {
          name: "MRCP",
          fullName: "Membership of the Royal College of Physicians",
          description: "Postgraduate medical diploma in internal medicine",
          parts: 3,
          cost: "£1,800",
          duration: "2-3 years",
          passRate: "45%",
          candidates: "8,000/year",
          status: "active",
          testLink: "/mrcp-test",
          features: ["Advanced MCQs", "Clinical Cases", "PACES Training"]
        },
        {
          name: "MRCS",
          fullName: "Membership of the Royal College of Surgeons",
          description: "Surgical qualification for aspiring surgeons",
          parts: 2,
          cost: "£1,600",
          duration: "18-24 months",
          passRate: "55%",
          candidates: "5,000/year",
          status: "active",
          testLink: "/mrcp-test",
          features: ["Surgical Scenarios", "OSCE Practice", "Anatomy 3D"]
        },
        {
          name: "IELTS Medical",
          fullName: "International English Language Testing System",
          description: "English proficiency test specialized for healthcare",
          parts: 4,
          cost: "£170",
          duration: "3-6 months",
          passRate: "78%",
          candidates: "25,000/year",
          status: "active",
          testLink: "/ielts-medical-test",
          features: ["Medical Vocabulary", "Clinical Communication", "Speaking Practice"]
        }
      ]
    },
    {
      region: "United States",
      flag: "🇺🇸",
      color: "bg-red-50 border-red-200",
      exams: [
        {
          name: "USMLE Step 1",
          fullName: "United States Medical Licensing Examination",
          description: "Basic science knowledge assessment",
          parts: 1,
          cost: "$645",
          duration: "6-12 months",
          passRate: "92%",
          candidates: "45,000/year",
          status: "available",
          testLink: "/usmle-test",
          features: ["Comprehensive QBank", "Subject Reviews", "Performance Analytics"]
        },
        {
          name: "USMLE Step 2 CK",
          fullName: "Clinical Knowledge Examination",
          description: "Clinical science knowledge and problem-solving",
          parts: 1,
          cost: "$645",
          duration: "6-9 months",
          passRate: "95%",
          candidates: "40,000/year",
          status: "available",
          testLink: "/usmle-test",
          features: ["Clinical Cases", "Differential Diagnosis", "Treatment Plans"]
        },
        {
          name: "USMLE Step 2 CS",
          fullName: "Clinical Skills Examination",
          description: "Clinical and communication skills assessment",
          parts: 1,
          cost: "$1,290",
          duration: "3-6 months",
          passRate: "85%",
          candidates: "35,000/year",
          status: "available",
          testLink: "/usmle-test",
          features: ["Patient Encounters", "Clinical Skills", "Communication Training"]
        }
      ]
    },
    {
      region: "Australia",
      flag: "🇦🇺",
      color: "bg-green-50 border-green-200",
      exams: [
        {
          name: "AMC CAT",
          fullName: "Australian Medical Council Computer Adaptive Test",
          description: "Multiple choice examination for medical knowledge",
          parts: 1,
          cost: "AUD $3,685",
          duration: "6-12 months",
          passRate: "70%",
          candidates: "8,000/year",
          status: "available",
          testLink: "/amc-test",
          features: ["Adaptive Testing", "Australian Guidelines", "Clinical Scenarios"]
        },
        {
          name: "AMC Clinical",
          fullName: "Australian Medical Council Clinical Examination",
          description: "Clinical skills and knowledge assessment",
          parts: 1,
          cost: "AUD $4,630",
          duration: "3-6 months",
          passRate: "75%",
          candidates: "6,000/year",
          status: "available",
          testLink: "/amc-test",
          features: ["Clinical Stations", "Australian Practice", "Communication Skills"]
        }
      ]
    },
    {
      region: "Canada",
      flag: "🇨🇦",
      color: "bg-purple-50 border-purple-200",
      exams: [
        {
          name: "MCCEE",
          fullName: "Medical Council of Canada Evaluating Examination",
          description: "Assessment of medical knowledge for international graduates",
          parts: 1,
          cost: "CAD $1,540",
          duration: "6-9 months",
          passRate: "68%",
          candidates: "4,500/year",
          status: "available",
          testLink: "/mccee-test",
          features: ["Canadian Guidelines", "Clinical Cases", "Medical Knowledge"]
        },
        {
          name: "MCCQE Part I",
          fullName: "Medical Council of Canada Qualifying Examination",
          description: "Multiple choice and clinical decision making",
          parts: 1,
          cost: "CAD $1,165",
          duration: "9-12 months",
          passRate: "85%",
          candidates: "12,000/year",
          status: "available",
          testLink: "/mccee-test",
          features: ["Clinical Decision Making", "Canadian Practice", "Comprehensive Review"]
        }
      ]
    },
    {
      region: "European Union",
      flag: "🇪🇺",
      color: "bg-yellow-50 border-yellow-200",
      exams: [
        {
          name: "EU Medical Recognition",
          fullName: "European Union Medical Qualification Recognition",
          description: "Medical degree recognition across EU member states",
          parts: "Variable",
          cost: "€500-2000",
          duration: "6-18 months",
          passRate: "80%",
          candidates: "15,000/year",
          status: "available",
          testLink: "/mrcp-test",
          features: ["Document Preparation", "Language Requirements", "Country-Specific Guidance"]
        }
      ]
    },
    {
      region: "Middle East",
      flag: "🌍",
      color: "bg-orange-50 border-orange-200",
      exams: [
        {
          name: "DHA",
          fullName: "Dubai Health Authority Examination",
          description: "Medical licensing for Dubai healthcare practice",
          parts: 2,
          cost: "AED 2,000",
          duration: "3-6 months",
          passRate: "75%",
          candidates: "3,000/year",
          status: "available",
          testLink: "/middle-east-test",
          features: ["UAE Guidelines", "Clinical Practice", "Professional Ethics"]
        },
        {
          name: "SCFHS",
          fullName: "Saudi Commission for Health Specialties",
          description: "Medical licensing for Saudi Arabia practice",
          parts: 2,
          cost: "SAR 3,000",
          duration: "6-9 months",
          passRate: "70%",
          candidates: "5,000/year",
          status: "available",
          testLink: "/middle-east-test",
          features: ["Saudi Guidelines", "Islamic Medical Ethics", "Arabic Medical Terms"]
        }
      ]
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'available':
        return <Badge className="bg-green-100 text-green-800">Available</Badge>;
      case 'beta':
        return <Badge className="bg-blue-100 text-blue-800">Beta</Badge>;
      case 'coming-soon':
        return <Badge className="bg-yellow-100 text-yellow-800">Coming Soon</Badge>;
      case 'planning':
        return <Badge className="bg-gray-100 text-gray-800">In Planning</Badge>;
      default:
        return <Badge variant="secondary">Available</Badge>;
    }
  };

  const totalExams = examCategories.reduce((sum, category) => sum + category.exams.length, 0);
  const availableExams = examCategories.reduce((sum, category) => 
    sum + category.exams.filter(exam => exam.status === 'available' || exam.status === 'active').length, 0);
  const betaExams = examCategories.reduce((sum, category) => 
    sum + category.exams.filter(exam => exam.status === 'beta').length, 0);

  return (
    <div className="min-h-screen bg-white">
      <div className="container max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/more" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Global Medical Exam Platform</h1>
            <p className="text-gray-600">Comprehensive preparation for medical licensing exams worldwide</p>
          </div>
        </div>

        {/* Platform Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{totalExams}</div>
              <div className="text-sm text-gray-600">Total Exams</div>
            </CardContent>
          </Card>
          
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">6</div>
              <div className="text-sm text-gray-600">Countries/Regions</div>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">150K+</div>
              <div className="text-sm text-gray-600">Annual Candidates</div>
            </CardContent>
          </Card>

          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">73%</div>
              <div className="text-sm text-gray-600">Average Pass Rate</div>
            </CardContent>
          </Card>
        </div>

        {/* Exam Categories by Region */}
        <div className="space-y-8">
          {examCategories.map((category, index) => (
            <div key={index}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{category.flag}</span>
                <h2 className="text-xl font-semibold text-gray-900">{category.region}</h2>
                <Badge variant="outline">{category.exams.length} exams</Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.exams.map((exam, idx) => (
                  <Card key={idx} className={`${category.color} hover:shadow-lg transition-shadow`}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Stethoscope className="h-5 w-5 text-blue-600" />
                            {exam.name}
                          </CardTitle>
                          <p className="text-sm text-gray-600 mt-1">{exam.fullName}</p>
                        </div>
                        {getStatusBadge(exam.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4">{exam.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center p-3 bg-white rounded-lg">
                          <div className="font-semibold text-blue-600">{exam.parts}</div>
                          <div className="text-xs text-gray-600">Parts</div>
                        </div>
                        <div className="text-center p-3 bg-white rounded-lg">
                          <div className="font-semibold text-green-600">{exam.cost}</div>
                          <div className="text-xs text-gray-600">Cost</div>
                        </div>
                        <div className="text-center p-3 bg-white rounded-lg">
                          <div className="font-semibold text-purple-600">{exam.duration}</div>
                          <div className="text-xs text-gray-600">Duration</div>
                        </div>
                        <div className="text-center p-3 bg-white rounded-lg">
                          <div className="font-semibold text-orange-600">{exam.passRate}</div>
                          <div className="text-xs text-gray-600">Pass Rate</div>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="text-sm font-medium text-gray-900">Key Features:</div>
                        {exam.features.map((feature, featureIdx) => (
                          <div key={featureIdx} className="flex items-center gap-2 text-sm text-gray-700">
                            <CheckCircle className="h-3 w-3 text-green-600" />
                            {feature}
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-600">
                          <Users className="h-4 w-4 inline mr-1" />
                          {exam.candidates}
                        </div>
                        {(exam.status === 'available' || exam.status === 'active') && exam.testLink ? (
                          <Link href={exam.testLink}>
                            <Button 
                              size="sm" 
                              variant="default"
                              className="bg-emerald-600 hover:bg-emerald-700 text-white"
                            >
                              Practice Test
                              <ArrowRight className="h-4 w-4 ml-1" />
                            </Button>
                          </Link>
                        ) : (
                          <Button 
                            size="sm" 
                            variant="outline"
                            disabled={exam.status === 'planning'}
                          >
                            {exam.status === 'beta' ? 'Join Beta' :
                             exam.status === 'coming-soon' ? 'Notify Me' : 'Coming Soon'}
                            <ArrowRight className="h-4 w-4 ml-1" />
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Platform Benefits */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Why Choose Our Global Platform?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
              <CardContent className="p-6 text-center">
                <Brain className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">AI-Powered Learning</h3>
                <p className="text-sm text-gray-600">Adaptive learning that adjusts to your progress across all exams</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
              <CardContent className="p-6 text-center">
                <Globe className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Global Community</h3>
                <p className="text-sm text-gray-600">Connect with medical graduates worldwide preparing for various exams</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
              <CardContent className="p-6 text-center">
                <Target className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Unified Progress</h3>
                <p className="text-sm text-gray-600">Track progress across multiple exam preparations simultaneously</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
              <CardContent className="p-6 text-center">
                <Award className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Expert Support</h3>
                <p className="text-sm text-gray-600">Access to medical professionals from each target country</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Roadmap */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Platform Roadmap</h2>
          <Card className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-blue-200">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Q1 2024</h3>
                  <p className="text-sm text-gray-600">PLAB Complete Platform</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Q2 2024</h3>
                  <p className="text-sm text-gray-600">MRCP & IELTS Medical</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Target className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Q3 2024</h3>
                  <p className="text-sm text-gray-600">USMLE & AMC Launch</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Star className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Q4 2024</h3>
                  <p className="text-sm text-gray-600">Global Expansion</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
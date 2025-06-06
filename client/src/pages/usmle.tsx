import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ChevronLeft,
  BookOpen,
  Clock,
  DollarSign,
  Calendar,
  CheckCircle,
  Users,
  Award,
  FileText,
  Stethoscope,
  Target,
  Star,
  TrendingUp,
  MapPin,
  Globe,
  Brain,
  Activity
} from "lucide-react";
import { Link } from "wouter";

export default function USMLE() {
  const usmleOverview = {
    fullName: "United States Medical Licensing Examination",
    purpose: "Three-step examination for medical licensure in the United States",
    steps: 3,
    validityPeriod: "7 years (Step 1 & 2), No expiration (Step 3)",
    totalCost: "$1,935",
    annualCandidates: 45000
  };

  const examSteps = [
    {
      step: "Step 1",
      name: "Basic Science Knowledge",
      format: "Computer-based testing (CBT)",
      duration: "8 hours",
      questions: "280 multiple-choice",
      cost: "$645",
      passingScore: "Pass/Fail (since 2022)",
      eligibility: "Medical students or graduates",
      content: [
        "Anatomy and Embryology",
        "Behavioral Sciences", 
        "Biochemistry and Nutrition",
        "Microbiology and Immunology",
        "Pathology",
        "Pharmacology",
        "Physiology"
      ],
      preparationTime: "6-12 months",
      passRate: "92%"
    },
    {
      step: "Step 2 CK",
      name: "Clinical Knowledge",
      format: "Computer-based testing (CBT)",
      duration: "9 hours",
      questions: "318 multiple-choice",
      cost: "$645", 
      passingScore: "3-digit score (minimum varies)",
      eligibility: "Medical students in final year or graduates",
      content: [
        "Internal Medicine",
        "Surgery",
        "Pediatrics",
        "Obstetrics and Gynecology",
        "Psychiatry",
        "Preventive Medicine",
        "Emergency Medicine"
      ],
      preparationTime: "4-8 months",
      passRate: "95%"
    },
    {
      step: "Step 2 CS",
      name: "Clinical Skills",
      format: "Standardized patient encounters",
      duration: "8 hours",
      stations: "12 patient encounters",
      cost: "$1,290",
      passingScore: "Pass/Fail",
      eligibility: "Passed Step 1",
      content: [
        "Patient Communication",
        "Physical Examination",
        "Clinical Reasoning",
        "Documentation Skills",
        "Spoken English Proficiency"
      ],
      preparationTime: "2-4 months",
      passRate: "85%",
      note: "Currently suspended due to COVID-19"
    },
    {
      step: "Step 3",
      name: "Clinical Practice",
      format: "Computer-based testing with CCS cases",
      duration: "2 days (9 + 9 hours)",
      questions: "233 MCQ + 13 CCS cases",
      cost: "$645",
      passingScore: "3-digit score (minimum varies)",
      eligibility: "Passed Steps 1 & 2, in residency or practice",
      content: [
        "Ambulatory Settings",
        "Emergency Department",
        "Inpatient Settings", 
        "Computer-based Case Simulations",
        "Patient Management",
        "Clinical Decision Making"
      ],
      preparationTime: "3-6 months",
      passRate: "93%"
    }
  ];

  const pathwayTimeline = [
    {
      phase: "Pre-Clinical Preparation",
      duration: "6-12 months",
      activities: [
        "Complete USMLE Step 1 preparation",
        "Review basic science fundamentals",
        "Practice with question banks",
        "Take Step 1 examination"
      ],
      cost: "$645 + prep materials"
    },
    {
      phase: "Clinical Knowledge Phase",
      duration: "4-8 months", 
      activities: [
        "Clinical rotations or equivalent experience",
        "Step 2 CK preparation and practice",
        "Clinical reasoning development",
        "Take Step 2 CK examination"
      ],
      cost: "$645 + prep materials"
    },
    {
      phase: "Clinical Skills (When Available)",
      duration: "2-4 months",
      activities: [
        "Patient communication practice",
        "Physical examination skills",
        "Clinical documentation training",
        "Take Step 2 CS examination"
      ],
      cost: "$1,290 + travel/accommodation"
    },
    {
      phase: "Residency Application",
      duration: "6-12 months",
      activities: [
        "ERAS application preparation",
        "Personal statement writing",
        "Interview preparation",
        "Match process participation"
      ],
      cost: "$3,000-5,000"
    },
    {
      phase: "Step 3 & Practice",
      duration: "During residency",
      activities: [
        "Complete residency training",
        "Step 3 preparation and examination",
        "State medical license application",
        "Begin independent practice"
      ],
      cost: "$645 + state licensing fees"
    }
  ];

  const preparationResources = [
    {
      category: "Official Resources",
      resources: [
        { name: "USMLE Content Outline", type: "PDF", cost: "Free", description: "Official exam specifications" },
        { name: "Practice Materials", type: "Online", cost: "Free", description: "Sample questions and tutorials" },
        { name: "NBME Self-Assessments", type: "Online", cost: "$60-85", description: "Official practice exams" }
      ]
    },
    {
      category: "Question Banks",
      resources: [
        { name: "UWorld USMLE", type: "Online", cost: "$379-799", description: "Comprehensive question bank" },
        { name: "Kaplan Qbank", type: "Online", cost: "$299-599", description: "Extensive practice questions" },
        { name: "AMBOSS", type: "Online", cost: "$89-199/month", description: "Question bank with explanations" }
      ]
    },
    {
      category: "Review Courses",
      resources: [
        { name: "Kaplan USMLE", type: "Online/Live", cost: "$2,999-4,999", description: "Comprehensive review course" },
        { name: "Becker USMLE", type: "Online", cost: "$1,999-3,499", description: "Structured review program" },
        { name: "Med School Tutors", type: "1-on-1", cost: "$100-200/hour", description: "Personalized tutoring" }
      ]
    }
  ];

  const residencyStatistics = [
    { specialty: "Internal Medicine", positions: "8,936", competition: "Low", img: "85%" },
    { specialty: "Family Medicine", positions: "4,707", competition: "Low", img: "90%" },
    { specialty: "Pediatrics", positions: "3,242", competition: "Moderate", img: "78%" },
    { specialty: "Surgery", positions: "1,248", competition: "High", img: "45%" },
    { specialty: "Radiology", positions: "1,126", competition: "High", img: "52%" },
    { specialty: "Anesthesiology", positions: "2,226", competition: "Moderate", img: "65%" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="container max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/global-exams" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-2xl">🇺🇸</span>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">USMLE Preparation</h1>
              <p className="text-gray-600">Complete guide to United States Medical Licensing Examination</p>
            </div>
          </div>
        </div>

        {/* USMLE Overview */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">USMLE Overview</h2>
          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{usmleOverview.steps}</div>
                  <div className="text-sm text-gray-600">Examination Steps</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{usmleOverview.totalCost}</div>
                  <div className="text-sm text-gray-600">Total Exam Costs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{usmleOverview.annualCandidates.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Annual Test Takers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">7 years</div>
                  <div className="text-sm text-gray-600">Score Validity</div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-white rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">About USMLE</h3>
                <p className="text-gray-700">
                  The United States Medical Licensing Examination (USMLE) is a three-step examination for medical 
                  licensure in the United States. It assesses a physician's ability to apply knowledge, concepts, 
                  and principles that are important in health and disease.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* USMLE Steps */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">USMLE Steps Breakdown</h2>
          <div className="space-y-6">
            {examSteps.map((step, index) => (
              <Card key={index} className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {step.step.slice(-1)}
                      </div>
                      {step.step}: {step.name}
                    </CardTitle>
                    <div className="flex gap-2">
                      <Badge className="bg-green-100 text-green-800">{step.passRate} Pass Rate</Badge>
                      {step.note && <Badge className="bg-yellow-100 text-yellow-800">Suspended</Badge>}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Exam Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Format:</span>
                          <span className="font-medium">{step.format}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Duration:</span>
                          <span className="font-medium">{step.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Questions:</span>
                          <span className="font-medium">{step.questions || step.stations}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Cost:</span>
                          <span className="font-medium text-red-600">{step.cost}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Prep Time:</span>
                          <span className="font-medium">{step.preparationTime}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Content Areas</h4>
                      <div className="space-y-1">
                        {step.content.map((area, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-3 w-3 text-green-600" />
                            <span className="text-gray-700">{area}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Preparation Timeline */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">USMLE to Residency Timeline</h2>
          <div className="space-y-4">
            {pathwayTimeline.map((phase, index) => (
              <Card key={index} className="bg-gray-50 border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Calendar className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900">{phase.phase}</h3>
                        <div className="text-right">
                          <Badge className="bg-blue-100 text-blue-800 mb-1">{phase.duration}</Badge>
                          <div className="text-sm text-green-600 font-medium">{phase.cost}</div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        {phase.activities.map((activity, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-green-600" />
                            <span className="text-sm text-gray-700">{activity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Residency Match Statistics */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Residency Match Statistics (2024)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {residencyStatistics.map((specialty, index) => (
              <Card key={index} className="bg-purple-50 border-purple-200">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{specialty.specialty}</h3>
                    <Badge className={
                      specialty.competition === 'Low' ? 'bg-green-100 text-green-800' :
                      specialty.competition === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }>
                      {specialty.competition}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Positions:</span>
                      <span className="font-medium">{specialty.positions}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">IMG Match Rate:</span>
                      <span className="font-medium text-purple-600">{specialty.img}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Study Resources */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recommended Study Resources</h2>
          <div className="space-y-6">
            {preparationResources.map((category, index) => (
              <Card key={index} className="bg-green-50 border-green-200">
                <CardHeader>
                  <CardTitle className="text-lg">{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.resources.map((resource, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">{resource.name}</div>
                          <div className="text-sm text-gray-600">{resource.description}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-green-600">{resource.cost}</div>
                          <div className="text-xs text-gray-500">{resource.type}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Start Your USMLE Journey</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <BookOpen className="h-5 w-5" />
              <span className="text-sm">Step 1 Prep</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Stethoscope className="h-5 w-5" />
              <span className="text-sm">Step 2 CK</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Users className="h-5 w-5" />
              <span className="text-sm">Residency Prep</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Award className="h-5 w-5" />
              <span className="text-sm">Match Success</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
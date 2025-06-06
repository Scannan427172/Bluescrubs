import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ChevronLeft,
  BookOpen,
  Clock,
  MapPin,
  DollarSign,
  Calendar,
  CheckCircle,
  AlertCircle,
  Users,
  Award,
  FileText,
  Stethoscope,
  GraduationCap,
  Globe,
  Target,
  TrendingUp,
  Heart,
  Brain,
  Activity,
  Star,
  Info,
  Download,
  ExternalLink
} from "lucide-react";
import { Link } from "wouter";

export default function PlabInfo() {
  const plabOverview = {
    fullName: "Professional and Linguistic Assessments Board",
    purpose: "Test for international medical graduates to practice medicine in the UK",
    parts: 2,
    validityPeriod: "4 years",
    passingScore: "PLAB 1: 121/200, PLAB 2: Grade C or above",
    annualCandidates: 15000
  };

  const plab1Info = {
    format: "Multiple Choice Questions (MCQs)",
    duration: "3 hours",
    questions: 180,
    passingScore: "121/200 (varies by sitting)",
    cost: "£247",
    locations: "UK and international test centers",
    bookingAdvance: "3-4 months",
    attempts: "Maximum 4 attempts",
    content: [
      "Applied Basic Sciences (25%)",
      "Clinical Sciences (75%)",
      "Medicine and Surgery",
      "Obstetrics and Gynaecology", 
      "Paediatrics and Child Health",
      "Psychiatry",
      "General Practice"
    ]
  };

  const plab2Info = {
    format: "Objective Structured Clinical Examination (OSCE)",
    duration: "3 hours 20 minutes",
    stations: 18,
    stationTime: "8 minutes each + 2 minutes reading",
    passingGrade: "Grade C or above",
    cost: "£895",
    location: "Manchester only (UK)",
    bookingAdvance: "6-8 months",
    attempts: "Maximum 4 attempts",
    skills: [
      "History Taking",
      "Clinical Examination", 
      "Communication Skills",
      "Practical Procedures",
      "Data Interpretation",
      "Patient Management",
      "Breaking Bad News",
      "Counselling"
    ]
  };

  const eligibilityRequirements = [
    {
      category: "Medical Degree",
      requirements: [
        "Primary medical qualification from medical school",
        "Degree must be acceptable to GMC",
        "Minimum 5 years duration (including foundation/internship)",
        "English language proficiency (IELTS 7.0 overall, 7.0 in speaking, 6.5 in other skills)"
      ]
    },
    {
      category: "Documentation",
      requirements: [
        "Valid passport",
        "Medical degree certificate",
        "Official transcripts",
        "IELTS/OET certificate",
        "Good standing certificate from medical council",
        "Employment verification (if applicable)"
      ]
    },
    {
      category: "English Language",
      requirements: [
        "IELTS Academic: Overall 7.0, Speaking 7.0, others 6.5",
        "OET: Grade B in all four skills",
        "Valid for 2 years from test date",
        "Must be taken within 2 years of PLAB application"
      ]
    }
  ];

  const preparationTimeline = [
    {
      phase: "Initial Assessment",
      duration: "1-2 weeks",
      activities: [
        "Evaluate current medical knowledge",
        "Take diagnostic practice tests",
        "Identify knowledge gaps",
        "Create study plan"
      ]
    },
    {
      phase: "PLAB 1 Preparation",
      duration: "6-12 months",
      activities: [
        "Study core medical subjects",
        "Complete question banks",
        "Take mock exams",
        "Review weak areas"
      ]
    },
    {
      phase: "PLAB 1 Exam",
      duration: "1 day",
      activities: [
        "3-hour MCQ examination",
        "180 questions",
        "Results in 6-8 weeks",
        "Valid for 3 years"
      ]
    },
    {
      phase: "PLAB 2 Preparation", 
      duration: "3-6 months",
      activities: [
        "Clinical skills practice",
        "OSCE station training",
        "Communication skills development",
        "Mock OSCE sessions"
      ]
    },
    {
      phase: "PLAB 2 Exam",
      duration: "1 day", 
      activities: [
        "18 OSCE stations",
        "Clinical skills assessment",
        "Results in 6-8 weeks",
        "Valid for 3 years"
      ]
    },
    {
      phase: "Post-PLAB",
      duration: "Ongoing",
      activities: [
        "GMC registration application",
        "Job searching and applications",
        "Foundation training preparation",
        "Continuing professional development"
      ]
    }
  ];

  const examCosts = [
    { item: "PLAB 1", cost: "£247", description: "Multiple choice examination" },
    { item: "PLAB 2", cost: "£895", description: "OSCE clinical examination" },
    { item: "IELTS", cost: "£170-200", description: "English language test" },
    { item: "Study Materials", cost: "£200-500", description: "Books, online courses, practice tests" },
    { item: "Travel & Accommodation", cost: "£300-800", description: "For PLAB 2 in Manchester" },
    { item: "GMC Registration", cost: "£425", description: "General Medical Council registration" },
    { item: "Total Estimated Cost", cost: "£2,237-3,167", description: "Complete PLAB journey" }
  ];

  const successStatistics = [
    { metric: "Overall Pass Rate", value: "65%", description: "Combined PLAB 1 & 2 first attempt" },
    { metric: "PLAB 1 Pass Rate", value: "75%", description: "First attempt success rate" },
    { metric: "PLAB 2 Pass Rate", value: "87%", description: "First attempt success rate" },
    { metric: "Average Study Time", value: "12 months", description: "Total preparation duration" },
    { metric: "Job Placement Rate", value: "94%", description: "Within 12 months of passing" },
    { metric: "Foundation Training", value: "89%", description: "Successfully enter FY1 programs" }
  ];

  const importantDates = [
    {
      exam: "PLAB 1",
      year: "2024",
      sittings: [
        { date: "January 2024", status: "past", locations: "UK & International" },
        { date: "March 2024", status: "past", locations: "UK & International" },
        { date: "May 2024", status: "current", locations: "UK & International" },
        { date: "July 2024", status: "upcoming", locations: "UK & International" },
        { date: "September 2024", status: "upcoming", locations: "UK & International" },
        { date: "November 2024", status: "upcoming", locations: "UK & International" }
      ]
    },
    {
      exam: "PLAB 2",
      year: "2024", 
      sittings: [
        { date: "Monthly", status: "ongoing", locations: "Manchester only" },
        { date: "Book 6-8 months in advance", status: "advice", locations: "High demand" }
      ]
    }
  ];

  const studyResources = [
    {
      category: "Official Resources",
      resources: [
        { name: "GMC PLAB Handbook", type: "PDF", cost: "Free", description: "Official examination guide" },
        { name: "PLAB Sample Questions", type: "Online", cost: "Free", description: "Official practice questions" },
        { name: "PLAB 2 Blueprint", type: "PDF", cost: "Free", description: "OSCE station specifications" }
      ]
    },
    {
      category: "Question Banks",
      resources: [
        { name: "Pastest PLAB", type: "Online", cost: "£200-400", description: "Comprehensive question bank" },
        { name: "OnExamination PLAB", type: "Online", cost: "£150-300", description: "Practice tests and explanations" },
        { name: "PLAB Recalls", type: "Book/Online", cost: "£50-100", description: "Previous exam questions" }
      ]
    },
    {
      category: "Clinical Skills",
      resources: [
        { name: "OSCE Practice Videos", type: "Online", cost: "£100-200", description: "Video-based OSCE training" },
        { name: "Clinical Skills Courses", type: "In-person", cost: "£500-1000", description: "Hands-on practice sessions" },
        { name: "Peer Practice Groups", type: "Group", cost: "Free-£50", description: "Student-led practice" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="container max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/more" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Complete PLAB Information Guide</h1>
            <p className="text-gray-600">Everything you need to know about the PLAB examination system</p>
          </div>
        </div>

        {/* PLAB Overview */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">PLAB Overview</h2>
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{plabOverview.parts}</div>
                  <div className="text-sm text-gray-600">Examination Parts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{plabOverview.validityPeriod}</div>
                  <div className="text-sm text-gray-600">Certificate Validity</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{plabOverview.annualCandidates.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Annual Candidates</div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-white rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">What is PLAB?</h3>
                <p className="text-gray-700">
                  The Professional and Linguistic Assessments Board (PLAB) test is designed to assess whether 
                  international medical graduates have the necessary knowledge and skills to practice medicine 
                  safely in the UK under supervision at Foundation Year 1 level.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* PLAB 1 Information */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">PLAB 1 - Written Examination</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-green-600" />
                  Exam Format
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Format:</span>
                    <span className="font-medium">{plab1Info.format}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{plab1Info.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Questions:</span>
                    <span className="font-medium">{plab1Info.questions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pass Score:</span>
                    <span className="font-medium">{plab1Info.passingScore}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cost:</span>
                    <span className="font-medium text-green-600">{plab1Info.cost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Max Attempts:</span>
                    <span className="font-medium">{plab1Info.attempts}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle>Content Areas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {plab1Info.content.map((area, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-gray-700">{area}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* PLAB 2 Information */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">PLAB 2 - Clinical Examination (OSCE)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-purple-50 border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Stethoscope className="h-5 w-5 text-purple-600" />
                  Exam Format
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Format:</span>
                    <span className="font-medium">{plab2Info.format}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{plab2Info.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Stations:</span>
                    <span className="font-medium">{plab2Info.stations}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Station Time:</span>
                    <span className="font-medium">{plab2Info.stationTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pass Grade:</span>
                    <span className="font-medium">{plab2Info.passingGrade}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cost:</span>
                    <span className="font-medium text-purple-600">{plab2Info.cost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium">{plab2Info.location}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-purple-50 border-purple-200">
              <CardHeader>
                <CardTitle>Clinical Skills Assessed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {plab2Info.skills.map((skill, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-600" />
                      <span className="text-gray-700">{skill}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Eligibility Requirements */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Eligibility Requirements</h2>
          <div className="space-y-6">
            {eligibilityRequirements.map((category, index) => (
              <Card key={index} className="bg-orange-50 border-orange-200">
                <CardHeader>
                  <CardTitle className="text-lg">{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {category.requirements.map((req, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{req}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Costs Breakdown */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Complete Cost Breakdown</h2>
          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-6">
              <div className="space-y-4">
                {examCosts.map((cost, index) => (
                  <div key={index} className={`flex items-center justify-between p-4 bg-white rounded-lg ${
                    cost.item.includes('Total') ? 'border-2 border-red-300' : ''
                  }`}>
                    <div>
                      <div className={`font-semibold ${cost.item.includes('Total') ? 'text-red-900 text-lg' : 'text-gray-900'}`}>
                        {cost.item}
                      </div>
                      <div className="text-sm text-gray-600">{cost.description}</div>
                    </div>
                    <div className={`font-bold ${cost.item.includes('Total') ? 'text-red-600 text-xl' : 'text-green-600'}`}>
                      {cost.cost}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Success Statistics */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Success Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {successStatistics.map((stat, index) => (
              <Card key={index} className="bg-blue-50 border-blue-200">
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
                  <div className="font-medium text-gray-900">{stat.metric}</div>
                  <div className="text-sm text-gray-600">{stat.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Preparation Timeline */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Preparation Timeline</h2>
          <div className="space-y-4">
            {preparationTimeline.map((phase, index) => (
              <Card key={index} className="bg-gray-50 border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Calendar className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900">{phase.phase}</h3>
                        <Badge className="bg-blue-100 text-blue-800">{phase.duration}</Badge>
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

        {/* Study Resources */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recommended Study Resources</h2>
          <div className="space-y-6">
            {studyResources.map((category, index) => (
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

        {/* Important Dates */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">2024 Examination Dates</h2>
          <div className="space-y-6">
            {importantDates.map((exam, index) => (
              <Card key={index} className="bg-yellow-50 border-yellow-200">
                <CardHeader>
                  <CardTitle className="text-lg">{exam.exam} - {exam.year}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {exam.sittings.map((sitting, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">{sitting.date}</div>
                          <div className="text-sm text-gray-600">{sitting.locations}</div>
                        </div>
                        <Badge className={
                          sitting.status === 'past' ? 'bg-gray-100 text-gray-800' :
                          sitting.status === 'current' ? 'bg-green-100 text-green-800' :
                          sitting.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }>
                          {sitting.status}
                        </Badge>
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
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <BookOpen className="h-5 w-5" />
              <span className="text-sm">Start PLAB 1 Prep</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Stethoscope className="h-5 w-5" />
              <span className="text-sm">PLAB 2 Practice</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Download className="h-5 w-5" />
              <span className="text-sm">Download Guide</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <ExternalLink className="h-5 w-5" />
              <span className="text-sm">GMC Website</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
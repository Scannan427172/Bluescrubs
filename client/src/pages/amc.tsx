import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  MapPin,
  Globe,
  Brain,
  Activity
} from "lucide-react";
import { Link } from "wouter";

export default function AMC() {
  const amcOverview = {
    fullName: "Australian Medical Council",
    purpose: "Assessment pathway for international medical graduates to practice in Australia",
    parts: 2,
    validityPeriod: "5 years",
    totalCost: "AUD $8,315",
    annualCandidates: 8000
  };

  const examParts = [
    {
      name: "AMC CAT",
      fullName: "Computer Adaptive Test",
      format: "Multiple Choice Questions (Computer Adaptive)",
      duration: "3.5 hours",
      questions: "150 questions",
      cost: "AUD $3,685",
      passingScore: "Variable (adaptive scoring)",
      content: [
        "Applied Basic Sciences",
        "Clinical Medicine",
        "Surgery and Anaesthetics",
        "Obstetrics and Gynaecology",
        "Paediatrics and Child Health",
        "Psychiatry",
        "General Practice and Population Health"
      ],
      preparationTime: "6-12 months",
      passRate: "70%",
      eligibility: "Medical degree from acceptable institution"
    },
    {
      name: "AMC Clinical",
      fullName: "Clinical Examination",
      format: "Objective Structured Clinical Examination (OSCE)",
      duration: "Half day",
      stations: "16 stations",
      cost: "AUD $4,630",
      passingScore: "Pass all domains",
      content: [
        "History Taking",
        "Physical Examination",
        "Clinical Reasoning",
        "Communication Skills",
        "Procedural Skills",
        "Professional Behaviour",
        "Health Advocacy"
      ],
      preparationTime: "3-6 months",
      passRate: "75%",
      eligibility: "Passed AMC CAT"
    }
  ];

  const pathwayOptions = [
    {
      pathway: "Standard Pathway",
      description: "For graduates from medical schools not accredited in Australia, NZ, UK, Ireland, USA, or Canada",
      requirements: [
        "AMC CAT examination",
        "AMC Clinical examination", 
        "12 months supervised practice",
        "Workplace-based assessment"
      ],
      timeline: "18-24 months",
      cost: "AUD $8,315 + supervision costs"
    },
    {
      pathway: "Competent Authority Pathway",
      description: "For specialists with fellowship from recognized colleges",
      requirements: [
        "Specialist qualification assessment",
        "Area of need employment",
        "Supervised practice period",
        "Assessment by relevant college"
      ],
      timeline: "12-18 months", 
      cost: "Variable by specialty"
    },
    {
      pathway: "Specialist Pathway",
      description: "For specialists seeking recognition in Australia",
      requirements: [
        "Specialist qualification verification",
        "Partially comparable/comparable assessment",
        "Supervised practice",
        "College assessment"
      ],
      timeline: "6-12 months",
      cost: "Variable + assessment fees"
    }
  ];

  const preparationTimeline = [
    {
      phase: "Initial Assessment",
      duration: "2-4 weeks",
      activities: [
        "Verify medical qualification eligibility",
        "English language test (IELTS/OET)",
        "Primary source verification",
        "AMC application submission"
      ],
      cost: "AUD $2,000-3,000"
    },
    {
      phase: "AMC CAT Preparation",
      duration: "6-12 months",
      activities: [
        "Study Australian medical guidelines",
        "Practice adaptive testing format",
        "Review clinical knowledge",
        "Take AMC CAT examination"
      ],
      cost: "AUD $3,685 + study materials"
    },
    {
      phase: "AMC Clinical Preparation",
      duration: "3-6 months",
      activities: [
        "Clinical skills practice",
        "Australian healthcare system training",
        "Communication skills development",
        "Take AMC Clinical examination"
      ],
      cost: "AUD $4,630 + preparation"
    },
    {
      phase: "Registration & Employment",
      duration: "2-6 months",
      activities: [
        "AHPRA registration application",
        "Job search and applications",
        "Supervised practice commencement",
        "Workplace-based assessments"
      ],
      cost: "AUD $1,000-2,000"
    }
  ];

  const studyResources = [
    {
      category: "Official Resources",
      resources: [
        { name: "AMC Handbook", type: "PDF", cost: "Free", description: "Official examination guide" },
        { name: "AMC CAT Blueprint", type: "Online", cost: "Free", description: "Examination specifications" },
        { name: "Clinical Guidelines", type: "Online", cost: "Free", description: "Australian therapeutic guidelines" }
      ]
    },
    {
      category: "Preparation Courses",
      resources: [
        { name: "Medical Training Institute", type: "In-person/Online", cost: "AUD $2,500-4,000", description: "Comprehensive AMC preparation" },
        { name: "AMC Course Australia", type: "Online", cost: "AUD $1,500-3,000", description: "Structured learning program" },
        { name: "Clinical Skills Workshops", type: "In-person", cost: "AUD $800-1,200", description: "Hands-on OSCE practice" }
      ]
    },
    {
      category: "Question Banks",
      resources: [
        { name: "AMC Question Bank", type: "Online", cost: "AUD $300-500", description: "Practice questions and explanations" },
        { name: "Medical Recall", type: "Online", cost: "AUD $200-400", description: "CAT-style adaptive testing" },
        { name: "Clinical Cases", type: "Online", cost: "AUD $150-300", description: "Australian clinical scenarios" }
      ]
    }
  ];

  const australianStates = [
    {
      state: "New South Wales",
      abbreviation: "NSW",
      requirement: "Area of Need or 10-year moratorium",
      opportunities: "High demand in rural areas",
      population: "8.2 million"
    },
    {
      state: "Victoria", 
      abbreviation: "VIC",
      requirement: "Area of Need or 10-year moratorium",
      opportunities: "Strong healthcare system",
      population: "6.7 million"
    },
    {
      state: "Queensland",
      abbreviation: "QLD", 
      requirement: "Area of Need or 10-year moratorium",
      opportunities: "Growing population, high demand",
      population: "5.2 million"
    },
    {
      state: "Western Australia",
      abbreviation: "WA",
      requirement: "Area of Need or 10-year moratorium", 
      opportunities: "Mining regions, rural need",
      population: "2.7 million"
    },
    {
      state: "South Australia",
      abbreviation: "SA",
      requirement: "Area of Need or 10-year moratorium",
      opportunities: "Moderate demand",
      population: "1.8 million"
    },
    {
      state: "Tasmania",
      abbreviation: "TAS",
      requirement: "Area of Need",
      opportunities: "Rural and remote positions",
      population: "0.5 million"
    }
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
            <span className="text-2xl">🇦🇺</span>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AMC Preparation</h1>
              <p className="text-gray-600">Australian Medical Council assessment pathway</p>
            </div>
          </div>
        </div>

        {/* AMC Overview */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">AMC Overview</h2>
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{amcOverview.parts}</div>
                  <div className="text-sm text-gray-600">Examination Parts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{amcOverview.totalCost}</div>
                  <div className="text-sm text-gray-600">Total Exam Costs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{amcOverview.annualCandidates.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Annual Candidates</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{amcOverview.validityPeriod}</div>
                  <div className="text-sm text-gray-600">Validity Period</div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-white rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">About AMC</h3>
                <p className="text-gray-700">
                  The Australian Medical Council (AMC) assesses international medical graduates seeking to 
                  practice medicine in Australia. The process ensures doctors meet Australian standards for 
                  safe medical practice.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Examination Parts */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">AMC Examinations</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {examParts.map((exam, index) => (
              <Card key={index} className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Stethoscope className="h-5 w-5 text-blue-600" />
                    {exam.name}
                  </CardTitle>
                  <p className="text-sm text-gray-600">{exam.fullName}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="bg-white p-3 rounded-lg">
                        <div className="text-gray-600">Format</div>
                        <div className="font-medium">{exam.format}</div>
                      </div>
                      <div className="bg-white p-3 rounded-lg">
                        <div className="text-gray-600">Duration</div>
                        <div className="font-medium">{exam.duration}</div>
                      </div>
                      <div className="bg-white p-3 rounded-lg">
                        <div className="text-gray-600">Cost</div>
                        <div className="font-medium text-green-600">{exam.cost}</div>
                      </div>
                      <div className="bg-white p-3 rounded-lg">
                        <div className="text-gray-600">Pass Rate</div>
                        <div className="font-medium text-blue-600">{exam.passRate}</div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Content Areas</h4>
                      <div className="space-y-1">
                        {exam.content.map((area, idx) => (
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

        {/* Assessment Pathways */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Assessment Pathways</h2>
          <div className="space-y-4">
            {pathwayOptions.map((pathway, index) => (
              <Card key={index} className="bg-purple-50 border-purple-200">
                <CardHeader>
                  <CardTitle className="text-lg">{pathway.pathway}</CardTitle>
                  <p className="text-gray-600">{pathway.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Requirements</h4>
                      <div className="space-y-1">
                        {pathway.requirements.map((req, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-3 w-3 text-purple-600" />
                            <span className="text-gray-700">{req}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-white p-3 rounded-lg">
                        <div className="text-gray-600 text-sm">Timeline</div>
                        <div className="font-medium">{pathway.timeline}</div>
                      </div>
                      <div className="bg-white p-3 rounded-lg">
                        <div className="text-gray-600 text-sm">Estimated Cost</div>
                        <div className="font-medium text-green-600">{pathway.cost}</div>
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
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Preparation Timeline</h2>
          <div className="space-y-4">
            {preparationTimeline.map((phase, index) => (
              <Card key={index} className="bg-gray-50 border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <Calendar className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900">{phase.phase}</h3>
                        <div className="text-right">
                          <Badge className="bg-green-100 text-green-800 mb-1">{phase.duration}</Badge>
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

        {/* Australian States Information */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Employment by Australian States</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {australianStates.map((state, index) => (
              <Card key={index} className="bg-orange-50 border-orange-200">
                <CardHeader>
                  <CardTitle className="text-lg">{state.state}</CardTitle>
                  <Badge variant="outline">{state.abbreviation}</Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-gray-600">Population</div>
                      <div className="font-medium">{state.population}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Requirement</div>
                      <div className="font-medium text-orange-600">{state.requirement}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Opportunities</div>
                      <div className="text-sm text-gray-700">{state.opportunities}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Study Resources */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Study Resources</h2>
          <div className="space-y-6">
            {studyResources.map((category, index) => (
              <Card key={index} className="bg-yellow-50 border-yellow-200">
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
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Start Your AMC Journey</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <BookOpen className="h-5 w-5" />
              <span className="text-sm">AMC CAT Prep</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Stethoscope className="h-5 w-5" />
              <span className="text-sm">Clinical Exam</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <MapPin className="h-5 w-5" />
              <span className="text-sm">State Guide</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Award className="h-5 w-5" />
              <span className="text-sm">Registration</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
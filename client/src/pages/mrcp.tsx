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
  Brain,
  Activity,
  Heart
} from "lucide-react";
import { Link } from "wouter";

export default function MRCP() {
  const mrcpOverview = {
    fullName: "Membership of the Royal College of Physicians",
    purpose: "Postgraduate medical diploma in internal medicine",
    parts: 3,
    validityPeriod: "No expiration",
    totalCost: "£1,800",
    annualCandidates: 8000
  };

  const examParts = [
    {
      part: "Part 1",
      name: "Foundation of Practice",
      format: "Multiple Choice Questions (Best of 5)",
      duration: "3 hours",
      questions: "200 questions",
      cost: "£450",
      passingScore: "Variable (standard setting)",
      content: [
        "Clinical Pharmacology",
        "Clinical Physiology",
        "Clinical Anatomy",
        "Cell and Molecular Biology",
        "Clinical Pathology",
        "Clinical Biochemistry and Metabolism",
        "Clinical Microbiology",
        "Genetics",
        "Immunology",
        "Statistics and Epidemiology"
      ],
      preparationTime: "6-12 months",
      passRate: "65%",
      frequency: "3 times per year"
    },
    {
      part: "Part 2",
      name: "Systems of the Body",
      format: "Multiple Choice Questions (Best of 5)",
      duration: "4 hours",
      questions: "270 questions",
      cost: "£450",
      passingScore: "Variable (standard setting)",
      content: [
        "Gastroenterology and Hepatology",
        "Endocrinology and Diabetes",
        "Nephrology",
        "Respiratory Medicine",
        "Cardiology",
        "Neurology",
        "Rheumatology and Immunology",
        "Infectious Diseases and HIV",
        "Haematology and Oncology",
        "Dermatology",
        "Psychiatry",
        "Ophthalmology"
      ],
      preparationTime: "8-12 months",
      passRate: "55%",
      frequency: "3 times per year"
    },
    {
      part: "PACES",
      name: "Practical Assessment of Clinical Examination Skills",
      format: "Observed Clinical Examinations",
      duration: "4 hours",
      stations: "5 stations",
      cost: "£900",
      passingScore: "Pass all 5 stations",
      content: [
        "Station 1: Respiratory and Abdominal Systems",
        "Station 2: History Taking Skills",
        "Station 3: Cardiovascular and Neurological Systems",
        "Station 4: Communication Skills and Ethics",
        "Station 5: Brief Clinical Consultations"
      ],
      preparationTime: "6-12 months",
      passRate: "75%",
      frequency: "3 times per year"
    }
  ];

  const careerBenefits = [
    {
      benefit: "Specialist Training Entry",
      description: "Required for most UK specialty training programs",
      importance: "Essential"
    },
    {
      benefit: "Consultant Applications",
      description: "Prerequisite for consultant positions in internal medicine",
      importance: "Critical"
    },
    {
      benefit: "International Recognition",
      description: "Recognized globally as mark of clinical excellence",
      importance: "High"
    },
    {
      benefit: "Academic Opportunities",
      description: "Opens doors to research and teaching positions",
      importance: "Moderate"
    },
    {
      benefit: "Private Practice",
      description: "Enhances credibility for private medical practice",
      importance: "Moderate"
    }
  ];

  const preparationTimeline = [
    {
      phase: "Foundation Phase",
      duration: "6-12 months",
      focus: "MRCP Part 1",
      activities: [
        "Complete basic science review",
        "Practice MCQ question banks",
        "Attend Part 1 revision courses",
        "Take Part 1 examination"
      ],
      cost: "£450 + £500-1000 study materials"
    },
    {
      phase: "Systems Phase",
      duration: "8-12 months",
      focus: "MRCP Part 2",
      activities: [
        "In-depth systems study",
        "Clinical case practice",
        "Revision courses and workshops",
        "Take Part 2 examination"
      ],
      cost: "£450 + £700-1200 study materials"
    },
    {
      phase: "Clinical Phase",
      duration: "6-12 months",
      focus: "MRCP PACES",
      activities: [
        "Clinical examination practice",
        "PACES courses and coaching",
        "Mock PACES sessions",
        "Take PACES examination"
      ],
      cost: "£900 + £1000-2000 courses"
    },
    {
      phase: "Specialty Application",
      duration: "6-12 months",
      focus: "Career Development",
      activities: [
        "Research and audit projects",
        "Specialty training applications",
        "Portfolio development",
        "Interview preparation"
      ],
      cost: "Variable"
    }
  ];

  const studyResources = [
    {
      category: "Official Resources",
      resources: [
        { name: "RCP MRCP Regulations", type: "PDF", cost: "Free", description: "Official examination guidelines" },
        { name: "MRCP Sample Questions", type: "Online", cost: "Free", description: "Official practice questions" },
        { name: "PACES Examination Stations", type: "PDF", cost: "Free", description: "Station specifications" }
      ]
    },
    {
      category: "Question Banks",
      resources: [
        { name: "Pastest MRCP", type: "Online", cost: "£300-600", description: "Comprehensive question bank" },
        { name: "OnExamination MRCP", type: "Online", cost: "£250-500", description: "Practice tests with explanations" },
        { name: "BMJ OnExamination", type: "Online", cost: "£200-400", description: "High-quality questions" }
      ]
    },
    {
      category: "Textbooks",
      resources: [
        { name: "Oxford Handbook of Clinical Medicine", type: "Book", cost: "£35", description: "Essential clinical reference" },
        { name: "Kumar & Clark's Clinical Medicine", type: "Book", cost: "£65", description: "Comprehensive textbook" },
        { name: "MRCP Part 1 Essential Revision Guide", type: "Book", cost: "£45", description: "Focused preparation" }
      ]
    },
    {
      category: "PACES Preparation",
      resources: [
        { name: "PACES for MRCP", type: "Book/Online", cost: "£55", description: "Station-by-station guide" },
        { name: "Clinical Skills Video Library", type: "Online", cost: "£100-200", description: "Video demonstrations" },
        { name: "PACES Courses", type: "In-person", cost: "£500-1500", description: "Intensive preparation courses" }
      ]
    }
  ];

  const pacesStations = [
    {
      station: "Station 1",
      name: "Respiratory and Abdominal Systems",
      time: "20 minutes",
      tasks: [
        "Examine respiratory system",
        "Examine abdominal system",
        "Present findings to examiner",
        "Answer examiner questions"
      ],
      commonCases: ["Chest expansion", "Heart sounds", "Abdominal masses", "Hepatomegaly"]
    },
    {
      station: "Station 2", 
      name: "History Taking Skills",
      time: "20 minutes",
      tasks: [
        "Take focused history from patient",
        "Identify key symptoms and concerns",
        "Present findings to examiner",
        "Discuss differential diagnosis"
      ],
      commonCases: ["Chest pain", "Breathlessness", "Weight loss", "Headache"]
    },
    {
      station: "Station 3",
      name: "Cardiovascular and Neurological Systems",
      time: "20 minutes", 
      tasks: [
        "Examine cardiovascular system",
        "Examine neurological system",
        "Present findings clearly",
        "Answer examiner questions"
      ],
      commonCases: ["Heart murmurs", "Neurological deficits", "Peripheral neuropathy", "Cranial nerves"]
    },
    {
      station: "Station 4",
      name: "Communication Skills and Ethics",
      time: "20 minutes",
      tasks: [
        "Communicate with patient/relative",
        "Explain diagnosis or treatment",
        "Address concerns sensitively",
        "Demonstrate ethical understanding"
      ],
      commonCases: ["Breaking bad news", "Consent discussions", "Treatment explanations", "Prognosis discussions"]
    },
    {
      station: "Station 5",
      name: "Brief Clinical Consultations",
      time: "20 minutes",
      tasks: [
        "Multiple brief consultations",
        "Rapid assessment skills",
        "Clinical decision making",
        "Time management"
      ],
      commonCases: ["Multiple mini-consultations", "Data interpretation", "Clinical reasoning", "Prioritization"]
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
            <span className="text-2xl">🇬🇧</span>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">MRCP Preparation</h1>
              <p className="text-gray-600">Membership of the Royal College of Physicians</p>
            </div>
          </div>
        </div>

        {/* MRCP Overview */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">MRCP Overview</h2>
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{mrcpOverview.parts}</div>
                  <div className="text-sm text-gray-600">Examination Parts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{mrcpOverview.totalCost}</div>
                  <div className="text-sm text-gray-600">Total Exam Costs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{mrcpOverview.annualCandidates.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Annual Candidates</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">Lifetime</div>
                  <div className="text-sm text-gray-600">Validity</div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-white rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">About MRCP</h3>
                <p className="text-gray-700 mb-4">
                  The MRCP is a postgraduate medical diploma that demonstrates knowledge and skills in internal medicine. 
                  It's essential for UK specialty training and recognized globally as a mark of clinical excellence.
                </p>
                <Link href="/mrcp-test">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    <Target className="mr-2 h-4 w-4" />
                    Take MRCP Practice Test
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Examination Parts */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">MRCP Examination Structure</h2>
          <div className="space-y-6">
            {examParts.map((part, index) => (
              <Card key={index} className="bg-purple-50 border-purple-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      {part.part}: {part.name}
                    </CardTitle>
                    <div className="flex gap-2">
                      <Badge className="bg-green-100 text-green-800">{part.passRate} Pass Rate</Badge>
                      <Badge className="bg-blue-100 text-blue-800">{part.frequency}</Badge>
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
                          <span className="font-medium">{part.format}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Duration:</span>
                          <span className="font-medium">{part.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Questions/Stations:</span>
                          <span className="font-medium">{part.questions || part.stations}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Cost:</span>
                          <span className="font-medium text-purple-600">{part.cost}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Prep Time:</span>
                          <span className="font-medium">{part.preparationTime}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Content Areas</h4>
                      <div className="space-y-1 max-h-48 overflow-y-auto">
                        {part.content.map((area, idx) => (
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

        {/* PACES Stations Detail */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">PACES Stations Breakdown</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {pacesStations.map((station, index) => (
              <Card key={index} className="bg-green-50 border-green-200">
                <CardHeader>
                  <CardTitle className="text-lg">{station.station}: {station.name}</CardTitle>
                  <Badge variant="outline">{station.time}</Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Tasks</h4>
                      <div className="space-y-1">
                        {station.tasks.map((task, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-3 w-3 text-green-600" />
                            <span className="text-gray-700">{task}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Common Cases</h4>
                      <div className="flex flex-wrap gap-1">
                        {station.commonCases.map((case_, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {case_}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Career Benefits */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Career Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {careerBenefits.map((benefit, index) => (
              <Card key={index} className="bg-orange-50 border-orange-200">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{benefit.benefit}</h3>
                    <Badge className={
                      benefit.importance === 'Essential' ? 'bg-red-100 text-red-800' :
                      benefit.importance === 'Critical' ? 'bg-orange-100 text-orange-800' :
                      benefit.importance === 'High' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }>
                      {benefit.importance}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-700">{benefit.description}</p>
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
                        <div>
                          <h3 className="font-semibold text-gray-900">{phase.phase}</h3>
                          <p className="text-sm text-gray-600">Focus: {phase.focus}</p>
                        </div>
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
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Start Your MRCP Journey</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <BookOpen className="h-5 w-5" />
              <span className="text-sm">Part 1 Prep</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Brain className="h-5 w-5" />
              <span className="text-sm">Part 2 Study</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Stethoscope className="h-5 w-5" />
              <span className="text-sm">PACES Practice</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Award className="h-5 w-5" />
              <span className="text-sm">Career Guide</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
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
  Mic,
  Volume2,
  PenTool,
  Eye,
  Target,
  Star,
  Globe,
  Brain,
  Activity,
  Headphones
} from "lucide-react";
import { Link } from "wouter";

export default function IELTSMedical() {
  const ieltsOverview = {
    fullName: "International English Language Testing System",
    purpose: "English proficiency assessment for healthcare professionals",
    modules: 4,
    validityPeriod: "2 years",
    totalCost: "£170-200",
    annualCandidates: 25000
  };

  const examModules = [
    {
      module: "Listening",
      duration: "30 minutes + 10 minutes transfer",
      sections: 4,
      questions: "40 questions",
      format: "Audio recordings with various accents",
      medicalFocus: [
        "Medical consultations",
        "Healthcare team discussions",
        "Patient instructions",
        "Medical lectures and presentations",
        "Ward rounds and handovers",
        "Emergency situations"
      ],
      skills: [
        "Understanding patient complaints",
        "Following medical instructions", 
        "Comprehending clinical discussions",
        "Identifying key medical information"
      ],
      targetBand: "7.0"
    },
    {
      module: "Reading",
      duration: "60 minutes",
      sections: 3,
      questions: "40 questions",
      format: "Academic texts with medical content",
      medicalFocus: [
        "Medical journal articles",
        "Patient information leaflets",
        "Clinical guidelines and protocols",
        "Medical research papers",
        "Healthcare policy documents",
        "Treatment procedures"
      ],
      skills: [
        "Medical terminology comprehension",
        "Clinical data interpretation",
        "Understanding treatment protocols",
        "Evidence-based medicine reading"
      ],
      targetBand: "6.5"
    },
    {
      module: "Writing",
      duration: "60 minutes",
      tasks: 2,
      wordCount: "Task 1: 150 words, Task 2: 250 words",
      format: "Academic writing with medical scenarios",
      medicalFocus: [
        "Patient case reports",
        "Medical chart descriptions",
        "Treatment recommendations",
        "Healthcare policy analysis",
        "Clinical research summaries",
        "Medical ethics discussions"
      ],
      skills: [
        "Medical report writing",
        "Clinical documentation",
        "Evidence-based arguments",
        "Professional medical communication"
      ],
      targetBand: "6.5"
    },
    {
      module: "Speaking",
      duration: "11-14 minutes",
      parts: 3,
      format: "Face-to-face interview",
      interaction: "One-on-one with examiner",
      medicalFocus: [
        "Patient consultations",
        "Medical history taking",
        "Explaining procedures",
        "Breaking bad news",
        "Interdisciplinary communication",
        "Medical ethics discussions"
      ],
      skills: [
        "Clear pronunciation for patient safety",
        "Empathetic communication",
        "Technical explanation abilities",
        "Professional medical discourse"
      ],
      targetBand: "7.0"
    }
  ];

  const bandRequirements = [
    {
      purpose: "GMC Registration (UK)",
      overall: "7.0",
      speaking: "7.0",
      other: "6.5",
      validity: "2 years from test date"
    },
    {
      purpose: "AHPRA Registration (Australia)",
      overall: "7.0",
      speaking: "7.0", 
      other: "7.0",
      validity: "2 years from test date"
    },
    {
      purpose: "USMLE Eligibility",
      overall: "Not required",
      speaking: "Varies by state",
      other: "Varies",
      validity: "State-dependent"
    },
    {
      purpose: "Canadian Medical Registration",
      overall: "7.0",
      speaking: "7.0",
      other: "6.0",
      validity: "2 years from test date"
    }
  ];

  const preparationTimeline = [
    {
      phase: "Assessment Phase",
      duration: "1-2 weeks",
      activities: [
        "Take diagnostic IELTS practice test",
        "Identify current band levels",
        "Assess strengths and weaknesses",
        "Set target band scores"
      ],
      cost: "Free - £50"
    },
    {
      phase: "Foundation Building",
      duration: "4-8 weeks",
      activities: [
        "Build medical vocabulary",
        "Improve general English skills",
        "Practice basic medical conversations",
        "Develop academic writing skills"
      ],
      cost: "£100-300"
    },
    {
      phase: "Skill Development",
      duration: "8-12 weeks",
      activities: [
        "Module-specific practice",
        "Medical scenario training",
        "Mock speaking tests",
        "Timed practice sessions"
      ],
      cost: "£200-500"
    },
    {
      phase: "Exam Preparation",
      duration: "2-4 weeks",
      activities: [
        "Full practice tests",
        "Final review sessions",
        "Exam booking and logistics",
        "Confidence building exercises"
      ],
      cost: "£170-200 (exam fee)"
    }
  ];

  const studyResources = [
    {
      category: "Official Resources",
      resources: [
        { name: "IELTS.org Practice Tests", type: "Online", cost: "Free", description: "Official practice materials" },
        { name: "Cambridge IELTS Books", type: "Book", cost: "£15-25", description: "Past papers with audio" },
        { name: "IELTS Preparation Mobile App", type: "App", cost: "Free", description: "Official IELTS app" }
      ]
    },
    {
      category: "Medical English Courses",
      resources: [
        { name: "Medical English Course", type: "Online", cost: "£299-599", description: "Healthcare-focused IELTS prep" },
        { name: "Cambridge English for Healthcare", type: "Book+Audio", cost: "£35-45", description: "Medical vocabulary and scenarios" },
        { name: "Medical IELTS Masterclass", type: "Live Online", cost: "£500-800", description: "Expert-led medical English course" }
      ]
    },
    {
      category: "Speaking Practice",
      resources: [
        { name: "iTalki Medical English Tutors", type: "1-on-1", cost: "£15-30/hour", description: "Personalized speaking practice" },
        { name: "Medical English Speaking Club", type: "Group", cost: "£20-40/session", description: "Group practice sessions" },
        { name: "AI Speaking Practice", type: "App", cost: "£10-20/month", description: "AI-powered speaking practice" }
      ]
    }
  ];

  const medicalVocabulary = [
    {
      category: "Symptoms & Conditions",
      terms: [
        "Chest pain, dyspnea, palpitations",
        "Nausea, vomiting, diarrhea",
        "Hypertension, diabetes, asthma",
        "Acute, chronic, severe, mild"
      ]
    },
    {
      category: "Procedures & Treatments",
      terms: [
        "Blood pressure measurement",
        "Chest X-ray, CT scan, MRI",
        "Medication administration",
        "Surgical intervention"
      ]
    },
    {
      category: "Communication Phrases",
      terms: [
        "How are you feeling today?",
        "Can you describe the pain?",
        "I need to examine you",
        "Your test results show..."
      ]
    },
    {
      category: "Medical Ethics",
      terms: [
        "Informed consent",
        "Patient confidentiality",
        "Professional boundaries",
        "Best interests of patient"
      ]
    }
  ];

  const speakingTopics = [
    {
      scenario: "Taking Medical History",
      questions: [
        "How long have you been experiencing these symptoms?",
        "Can you rate your pain on a scale of 1-10?",
        "Are you taking any medications currently?",
        "Do you have any family history of this condition?"
      ]
    },
    {
      scenario: "Explaining Procedures",
      questions: [
        "I need to explain what will happen during your surgery",
        "Let me describe the side effects of this medication",
        "Here's what to expect during your recovery",
        "I'll explain the test results to you"
      ]
    },
    {
      scenario: "Professional Discussion",
      questions: [
        "What challenges do healthcare systems face?",
        "How has medical technology improved patient care?",
        "Discuss the importance of patient communication",
        "What are the ethical considerations in medical practice?"
      ]
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
            <span className="text-2xl">🌍</span>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">IELTS for Medical Professionals</h1>
              <p className="text-gray-600">English proficiency test specialized for healthcare</p>
            </div>
          </div>
        </div>

        {/* IELTS Overview */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">IELTS Medical Overview</h2>
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{ieltsOverview.modules}</div>
                  <div className="text-sm text-gray-600">Test Modules</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{ieltsOverview.totalCost}</div>
                  <div className="text-sm text-gray-600">Exam Cost</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{ieltsOverview.validityPeriod}</div>
                  <div className="text-sm text-gray-600">Validity Period</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{ieltsOverview.annualCandidates.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Medical Candidates/Year</div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-white rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">IELTS for Healthcare</h3>
                <p className="text-gray-700 mb-4">
                  Specialized IELTS preparation for medical professionals focusing on healthcare communication, 
                  medical terminology, and clinical scenarios essential for safe patient care.
                </p>
                <Link href="/ielts-medical-test">
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    <Target className="mr-2 h-4 w-4" />
                    Take IELTS Medical Test
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Exam Modules */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">IELTS Modules for Medical Professionals</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {examModules.map((module, index) => (
              <Card key={index} className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {module.module === 'Listening' && <Headphones className="h-5 w-5 text-blue-600" />}
                      {module.module === 'Reading' && <BookOpen className="h-5 w-5 text-blue-600" />}
                      {module.module === 'Writing' && <PenTool className="h-5 w-5 text-blue-600" />}
                      {module.module === 'Speaking' && <Mic className="h-5 w-5 text-blue-600" />}
                      {module.module}
                    </CardTitle>
                    <Badge className="bg-green-100 text-green-800">Band {module.targetBand}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="bg-white p-3 rounded-lg">
                        <div className="text-gray-600">Duration</div>
                        <div className="font-medium">{module.duration}</div>
                      </div>
                      <div className="bg-white p-3 rounded-lg">
                        <div className="text-gray-600">Format</div>
                        <div className="font-medium">{module.sections ? `${module.sections} sections` : module.format}</div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Medical Focus Areas</h4>
                      <div className="space-y-1">
                        {module.medicalFocus.slice(0, 4).map((focus, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-3 w-3 text-green-600" />
                            <span className="text-gray-700">{focus}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Key Skills</h4>
                      <div className="flex flex-wrap gap-1">
                        {module.skills.map((skill, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {skill}
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

        {/* Band Requirements */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Band Requirements by Country</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bandRequirements.map((req, index) => (
              <Card key={index} className="bg-purple-50 border-purple-200">
                <CardHeader>
                  <CardTitle className="text-lg">{req.purpose}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white p-3 rounded-lg text-center">
                        <div className="text-2xl font-bold text-purple-600">{req.overall}</div>
                        <div className="text-xs text-gray-600">Overall Band</div>
                      </div>
                      <div className="bg-white p-3 rounded-lg text-center">
                        <div className="text-2xl font-bold text-purple-600">{req.speaking}</div>
                        <div className="text-xs text-gray-600">Speaking Band</div>
                      </div>
                    </div>
                    <div className="text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Other Skills:</span>
                        <span className="font-medium">{req.other}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Validity:</span>
                        <span className="font-medium">{req.validity}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Medical Vocabulary */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Essential Medical Vocabulary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {medicalVocabulary.map((vocab, index) => (
              <Card key={index} className="bg-orange-50 border-orange-200">
                <CardHeader>
                  <CardTitle className="text-lg">{vocab.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {vocab.terms.map((term, idx) => (
                      <div key={idx} className="p-2 bg-white rounded text-sm text-gray-700">
                        {term}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Speaking Practice Topics */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Medical Speaking Practice</h2>
          <div className="space-y-6">
            {speakingTopics.map((topic, index) => (
              <Card key={index} className="bg-red-50 border-red-200">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Mic className="h-5 w-5 text-red-600" />
                    {topic.scenario}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {topic.questions.map((question, idx) => (
                      <div key={idx} className="p-3 bg-white rounded-lg border-l-4 border-red-300">
                        <span className="text-gray-700">"{question}"</span>
                      </div>
                    ))}
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
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Start Your IELTS Medical Prep</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Headphones className="h-5 w-5" />
              <span className="text-sm">Listening Practice</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Mic className="h-5 w-5" />
              <span className="text-sm">Speaking Practice</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <BookOpen className="h-5 w-5" />
              <span className="text-sm">Medical Reading</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <PenTool className="h-5 w-5" />
              <span className="text-sm">Clinical Writing</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
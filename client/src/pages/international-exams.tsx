import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Globe, 
  BookOpen, 
  Clock, 
  Users, 
  Award, 
  Target, 
  CheckCircle,
  ArrowRight,
  Flag,
  TrendingUp,
  Calendar,
  DollarSign
} from 'lucide-react';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';

interface InternationalExam {
  id: string;
  country: string;
  examName: string;
  flag: string;
  stages: number;
  difficulty: 'moderate' | 'challenging' | 'very-challenging';
  duration: string;
  costUSD: number;
  passRate: number;
  questionCount: number;
  description: string;
  keyFeatures: string[];
  availableContent: {
    questions: number;
    osceStations: number;
    mockExams: number;
    studyGuides: number;
  };
}

export default function InternationalExams() {
  const [selectedExam, setSelectedExam] = useState('uk_plab');
  const [selectedRegion, setSelectedRegion] = useState('all');

  const internationalExams: InternationalExam[] = [
    {
      id: 'uk_plab',
      country: 'United Kingdom',
      examName: 'PLAB',
      flag: '🇬🇧',
      stages: 2,
      difficulty: 'challenging',
      duration: '6 hours total',
      costUSD: 900,
      passRate: 85,
      questionCount: 180,
      description: 'Professional and Linguistic Assessments Board test for GMC registration',
      keyFeatures: ['NICE Guidelines Integration', 'UK Clinical Context', 'OSCE Skills Assessment'],
      availableContent: {
        questions: 800,
        osceStations: 18,
        mockExams: 6,
        studyGuides: 12
      }
    },
    {
      id: 'usa_usmle',
      country: 'United States',
      examName: 'USMLE',
      flag: '🇺🇸',
      stages: 4,
      difficulty: 'very-challenging',
      duration: '32+ hours total',
      costUSD: 2400,
      passRate: 92,
      questionCount: 1143,
      description: 'United States Medical Licensing Examination for medical practice',
      keyFeatures: ['Multi-Step Process', 'Basic Science Focus', 'Clinical Decision Making'],
      availableContent: {
        questions: 6500,
        osceStations: 80,
        mockExams: 32,
        studyGuides: 60
      }
    },
    {
      id: 'australia_amc',
      country: 'Australia',
      examName: 'AMC',
      flag: '🇦🇺',
      stages: 2,
      difficulty: 'challenging',
      duration: '7.5 hours total',
      costUSD: 3200,
      passRate: 85,
      questionCount: 150,
      description: 'Australian Medical Council examination for medical registration',
      keyFeatures: ['Australian Guidelines', 'Rural Health Focus', 'Cultural Competency'],
      availableContent: {
        questions: 3100,
        osceStations: 96,
        mockExams: 18,
        studyGuides: 38
      }
    },
    {
      id: 'canada_mccqe',
      country: 'Canada',
      examName: 'MCCQE',
      flag: '🇨🇦',
      stages: 2,
      difficulty: 'challenging',
      duration: '11 hours total',
      costUSD: 1200,
      passRate: 88,
      questionCount: 210,
      description: 'Medical Council of Canada Qualifying Examination',
      keyFeatures: ['Bilingual Support', 'Canadian Guidelines', 'Clinical Decision Trees'],
      availableContent: {
        questions: 2200,
        osceStations: 72,
        mockExams: 15,
        studyGuides: 32
      }
    },
    {
      id: 'newzealand_nzrex',
      country: 'New Zealand',
      examName: 'NZREX',
      flag: '🇳🇿',
      stages: 1,
      difficulty: 'challenging',
      duration: '8 hours',
      costUSD: 2800,
      passRate: 82,
      questionCount: 16,
      description: 'New Zealand Registration Examination for overseas doctors',
      keyFeatures: ['Clinical Skills Focus', 'Maori Health', 'Communication Excellence'],
      availableContent: {
        questions: 600,
        osceStations: 64,
        mockExams: 12,
        studyGuides: 25
      }
    },
    {
      id: 'ireland_mcr',
      country: 'Ireland',
      examName: 'Medical Council Registration',
      flag: '🇮🇪',
      stages: 2,
      difficulty: 'challenging',
      duration: '7 hours total',
      costUSD: 1500,
      passRate: 78,
      questionCount: 200,
      description: 'Medical Council of Ireland registration examination',
      keyFeatures: ['EU Medicine Focus', 'Irish Healthcare System', 'Clinical Reasoning'],
      availableContent: {
        questions: 1800,
        osceStations: 48,
        mockExams: 10,
        studyGuides: 22
      }
    },
    {
      id: 'germany_fsp',
      country: 'Germany',
      examName: 'FSP + Kenntnisprüfung',
      flag: '🇩🇪',
      stages: 2,
      difficulty: 'challenging',
      duration: '2 hours oral',
      costUSD: 800,
      passRate: 70,
      questionCount: 0,
      description: 'German medical language and knowledge examination',
      keyFeatures: ['Medical German', 'German Guidelines', 'Oral Assessment'],
      availableContent: {
        questions: 1200,
        osceStations: 24,
        mockExams: 8,
        studyGuides: 18
      }
    },
    {
      id: 'uae_dha',
      country: 'UAE',
      examName: 'DHA Assessment',
      flag: '🇦🇪',
      stages: 2,
      difficulty: 'moderate',
      duration: '5 hours total',
      costUSD: 600,
      passRate: 75,
      questionCount: 150,
      description: 'Dubai Health Authority medical assessment',
      keyFeatures: ['Middle East Context', 'Multi-cultural Care', 'Regional Guidelines'],
      availableContent: {
        questions: 900,
        osceStations: 32,
        mockExams: 6,
        studyGuides: 15
      }
    }
  ];

  const regions = [
    { id: 'all', name: 'All Regions', count: internationalExams.length },
    { id: 'english-speaking', name: 'English Speaking', count: 5 },
    { id: 'europe', name: 'Europe', count: 2 },
    { id: 'middle-east', name: 'Middle East', count: 1 }
  ];

  const filteredExams = selectedRegion === 'all' ? internationalExams : 
    selectedRegion === 'english-speaking' ? internationalExams.filter(e => ['uk_plab', 'usa_usmle', 'australia_amc', 'canada_mccqe', 'newzealand_nzrex'].includes(e.id)) :
    selectedRegion === 'europe' ? internationalExams.filter(e => ['ireland_mcr', 'germany_fsp'].includes(e.id)) :
    internationalExams.filter(e => ['uae_dha'].includes(e.id));

  const currentExam = internationalExams.find(exam => exam.id === selectedExam) || internationalExams[0];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'moderate': return 'bg-green-100 text-green-800';
      case 'challenging': return 'bg-yellow-100 text-yellow-800';
      case 'very-challenging': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">
            International Medical Licensing Exams
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive preparation for medical licensing exams worldwide with authentic practice materials
          </p>
        </div>

        {/* Statistics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Countries Covered</p>
                  <p className="text-3xl font-bold">8</p>
                </div>
                <Globe className="h-12 w-12 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Total Questions</p>
                  <p className="text-3xl font-bold">2.5K+</p>
                </div>
                <BookOpen className="h-12 w-12 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">OSCE Stations</p>
                  <p className="text-3xl font-bold">120+</p>
                </div>
                <Users className="h-12 w-12 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Mock Exams</p>
                  <p className="text-3xl font-bold">24+</p>
                </div>
                <Award className="h-12 w-12 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Region Filter */}
        <div className="flex flex-wrap gap-3">
          {regions.map(region => (
            <Button
              key={region.id}
              variant={selectedRegion === region.id ? 'default' : 'outline'}
              onClick={() => setSelectedRegion(region.id)}
              className="flex items-center gap-2"
            >
              <Flag className="h-4 w-4" />
              {region.name} ({region.count})
            </Button>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* Exam Selection */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Select Examination</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-2">
                  {filteredExams.map(exam => (
                    <button
                      key={exam.id}
                      onClick={() => setSelectedExam(exam.id)}
                      className={`w-full p-4 text-left border-l-4 transition-all hover:bg-gray-50 ${
                        selectedExam === exam.id 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-transparent'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-lg">{exam.flag}</span>
                            <span className="font-semibold">{exam.examName}</span>
                          </div>
                          <p className="text-sm text-gray-600">{exam.country}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge className={getDifficultyColor(exam.difficulty)}>
                              {exam.difficulty}
                            </Badge>
                            <Badge variant="outline">
                              {exam.stages} {exam.stages === 1 ? 'stage' : 'stages'}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">{exam.passRate}% pass rate</p>
                          <p className="text-sm font-medium">${exam.costUSD}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Exam Details */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Selected Exam Overview */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{currentExam.flag}</span>
                  <div>
                    <CardTitle className="text-2xl">{currentExam.examName}</CardTitle>
                    <p className="text-gray-600">{currentExam.country}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-6">{currentExam.description}</p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-gray-500" />
                      <span>Duration: {currentExam.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-gray-500" />
                      <span>Questions: {currentExam.questionCount}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-gray-500" />
                      <span>Pass Rate: {currentExam.passRate}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-gray-500" />
                      <span>Cost: ${currentExam.costUSD}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Key Features</h4>
                    <ul className="space-y-2">
                      {currentExam.keyFeatures.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Available Content */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Available Study Materials</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">500+</p>
                      <p className="text-sm text-gray-600">Practice Questions</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">{currentExam.availableContent.osceStations}</p>
                      <p className="text-sm text-gray-600">OSCE Stations</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">{currentExam.availableContent.mockExams}</p>
                      <p className="text-sm text-gray-600">Mock Exams</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-orange-600">{currentExam.availableContent.studyGuides}</p>
                      <p className="text-sm text-gray-600">Study Guides</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <Link href={`/exam-prep/${currentExam.id}`}>
                    <Button size="lg" className="w-full sm:w-auto">
                      Start Preparation
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href={`/mock-exam/${currentExam.id}`}>
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                      Take Mock Exam
                    </Button>
                  </Link>
                  <Link href={`/study-guide/${currentExam.id}`}>
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                      View Study Guide
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Comparison Alert */}
            <Alert>
              <Globe className="h-4 w-4" />
              <AlertDescription>
                <strong>Cross-Training Benefit:</strong> Studying multiple international exams strengthens overall medical knowledge 
                and improves performance across all assessments. Consider our Multi-Country preparation packages.
              </AlertDescription>
            </Alert>
          </div>
        </div>

        {/* Success Stories */}
        <Card>
          <CardHeader>
            <CardTitle>Global Success Stories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl mb-2">🇮🇳➜🇬🇧</div>
                <h4 className="font-semibold">Dr. Priya Sharma</h4>
                <p className="text-sm text-gray-600">PLAB 1: 164/180, PLAB 2: Pass</p>
                <p className="text-sm mt-2">"The UK-specific clinical scenarios were invaluable"</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl mb-2">🇳🇬➜🇺🇸</div>
                <h4 className="font-semibold">Dr. Emmanuel Okafor</h4>
                <p className="text-sm text-gray-600">USMLE Step 1: Pass, Step 2: 245</p>
                <p className="text-sm mt-2">"Comprehensive basic science review was key"</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-3xl mb-2">🇵🇰➜🇦🇺</div>
                <h4 className="font-semibold">Dr. Sarah Khan</h4>
                <p className="text-sm text-gray-600">AMC MCQ: Pass, Clinical: Pass</p>
                <p className="text-sm mt-2">"Australian clinical context made the difference"</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
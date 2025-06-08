import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Brain, CheckCircle, AlertCircle, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GeneratedQuestion {
  stem: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  learningObjectives: string[];
  references: string[];
  tags: string[];
  difficulty_justification: string;
  clinical_relevance: string;
  regulatory_alignment: string;
}

interface GenerationResponse {
  questions: GeneratedQuestion[];
  metadata: {
    generatedAt: string;
    examType: string;
    specialty: string;
    quality_score: number;
    medical_accuracy_validated: boolean;
  };
}

export default function AIGenerationDemo() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState<GeneratedQuestion[]>([]);
  const [selectedExam, setSelectedExam] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [questionCount, setQuestionCount] = useState("3");
  const [difficulty, setDifficulty] = useState("intermediate");
  const [metadata, setMetadata] = useState<any>(null);
  const { toast } = useToast();

  const examTypes = [
    { value: "PLAB", label: "PLAB (UK)" },
    { value: "USMLE", label: "USMLE (USA)" },
    { value: "MCCEE", label: "MCCEE (Canada)" },
    { value: "AMC", label: "AMC (Australia)" },
    { value: "MRCP", label: "MRCP (Ireland)" },
    { value: "DHA", label: "DHA (UAE)" }
  ];

  const specialties = [
    "cardiovascular", "respiratory", "gastroenterology", "neurology",
    "endocrinology", "nephrology", "psychiatry", "obstetrics-gynaecology",
    "paediatrics", "emergency-medicine", "infectious-diseases", "rheumatology"
  ];

  const generateQuestions = async () => {
    if (!selectedExam || !selectedSpecialty) {
      toast({
        title: "Missing Selection",
        description: "Please select both exam type and specialty",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    setGeneratedQuestions([]);
    setMetadata(null);

    try {
      const response = await fetch('/api/generate-questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          examType: selectedExam,
          specialty: selectedSpecialty,
          count: parseInt(questionCount),
          difficulty
        }),
      });

      if (!response.ok) {
        throw new Error(`Generation failed: ${response.statusText}`);
      }

      const data: GenerationResponse = await response.json();
      setGeneratedQuestions(data.questions);
      setMetadata(data.metadata);

      toast({
        title: "Questions Generated",
        description: `Successfully generated ${data.questions.length} high-quality questions`,
      });
    } catch (error) {
      console.error('Generation error:', error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate questions. Please check API connection.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold">AI Question Generation Demo</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Live demonstration of AI-powered medical question generation using OpenAI GPT-4o
        </p>
      </div>

      {/* Generation Controls */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Generate Medical Questions
          </CardTitle>
          <CardDescription>
            Configure parameters and generate high-quality medical exam questions in real-time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div>
              <Label htmlFor="exam-select">Exam Type</Label>
              <Select value={selectedExam} onValueChange={setSelectedExam}>
                <SelectTrigger>
                  <SelectValue placeholder="Select exam" />
                </SelectTrigger>
                <SelectContent>
                  {examTypes.map((exam) => (
                    <SelectItem key={exam.value} value={exam.value}>
                      {exam.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="specialty-select">Medical Specialty</Label>
              <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                <SelectTrigger>
                  <SelectValue placeholder="Select specialty" />
                </SelectTrigger>
                <SelectContent>
                  {specialties.map((specialty) => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty.charAt(0).toUpperCase() + specialty.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="count">Question Count</Label>
              <Input
                id="count"
                type="number"
                min="1"
                max="10"
                value={questionCount}
                onChange={(e) => setQuestionCount(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="difficulty">Difficulty Level</Label>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="foundation">Foundation</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={generateQuestions}
            disabled={isGenerating || !selectedExam || !selectedSpecialty}
            className="w-full md:w-auto"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating Questions...
              </>
            ) : (
              <>
                <Brain className="w-4 h-4 mr-2" />
                Generate Questions
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Generation Metadata */}
      {metadata && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Generation Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{generatedQuestions.length}</div>
                <div className="text-sm text-blue-700">Questions Generated</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{metadata.quality_score?.toFixed(1)}%</div>
                <div className="text-sm text-green-700">Quality Score</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{metadata.examType}</div>
                <div className="text-sm text-purple-700">Exam Standard</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="flex items-center justify-center gap-1">
                  {metadata.medical_accuracy_validated ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium text-green-700">Validated</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-5 h-5 text-orange-600" />
                      <span className="text-sm font-medium text-orange-700">Pending</span>
                    </>
                  )}
                </div>
                <div className="text-sm text-gray-600">Medical Accuracy</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Generated Questions */}
      {generatedQuestions.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Generated Questions</h2>
          {generatedQuestions.map((question, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Question {index + 1}</span>
                  <div className="flex gap-2">
                    {question.tags?.slice(0, 3).map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Clinical Scenario:</h4>
                  <p className="text-gray-700 leading-relaxed">{question.stem}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Options:</h4>
                  <div className="space-y-1">
                    {question.options?.map((option, optIndex) => (
                      <div 
                        key={optIndex} 
                        className={`p-2 rounded ${
                          optIndex === question.correctAnswer 
                            ? 'bg-green-50 border border-green-200' 
                            : 'bg-gray-50'
                        }`}
                      >
                        <span className="font-medium mr-2">{String.fromCharCode(65 + optIndex)}.</span>
                        {option}
                        {optIndex === question.correctAnswer && (
                          <Badge className="ml-2 bg-green-600">Correct</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Explanation:</h4>
                  <p className="text-gray-700 leading-relaxed">{question.explanation}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Learning Objectives:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {question.learningObjectives?.map((objective, objIndex) => (
                      <li key={objIndex} className="text-gray-700">{objective}</li>
                    ))}
                  </ul>
                </div>

                {question.references?.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">References:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {question.references.map((reference, refIndex) => (
                        <li key={refIndex} className="text-gray-600 text-sm">{reference}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* API Status Indicator */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            API Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">OpenAI GPT-4o API</p>
              <p className="font-medium text-green-600">Connected and Ready</p>
            </div>
            <Badge className="bg-green-600">Live</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
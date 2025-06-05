import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Globe, BookOpen, Brain, Users, Clock, Target, ArrowRight, CheckCircle } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  rtl: boolean;
  medicalTerminologySupport: boolean;
  plabContentAvailable: boolean;
  nhsContextualisation: boolean;
}

interface ProgressiveLearningPath {
  phase1: { ratio: number; description: string };
  phase2: { ratio: number; description: string };
  phase3: { ratio: number; description: string };
  phase4: { ratio: number; description: string };
  estimatedTimeline: string;
  milestones: string[];
}

export default function International() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [currentLevel, setCurrentLevel] = useState<string>("");
  const [userRegion, setUserRegion] = useState<string>("");
  const [medicalTerms, setMedicalTerms] = useState<string>("");
  const [sampleQuestion, setSampleQuestion] = useState<string>("");

  // Fetch supported languages
  const { data: languagesData, isLoading: languagesLoading } = useQuery({
    queryKey: ["/api/internationalization/languages"],
  });

  // Medical terminology translation
  const terminologyMutation = useMutation({
    mutationFn: async (data: { targetLanguage: string; medicalTerms: string[] }) => {
      return await apiRequest("/api/internationalization/medical-terminology", "POST", data);
    },
  });

  // Question translation
  const questionMutation = useMutation({
    mutationFn: async (data: { question: any; targetLanguage: string }) => {
      return await apiRequest("/api/internationalization/translate-question", "POST", data);
    },
  });

  // Learning path generation
  const learningPathMutation = useMutation({
    mutationFn: async (data: { nativeLanguage: string; currentLevel: string }) => {
      return await apiRequest("/api/internationalization/learning-path", "POST", data);
    },
  });

  // NHS context fetching
  const { data: nhsContext } = useQuery({
    queryKey: ["/api/internationalization/nhs-context", selectedLanguage],
    enabled: !!selectedLanguage,
  });

  // Cultural adaptation
  const culturalAdaptationMutation = useMutation({
    mutationFn: async (data: { userRegion: string; targetLanguage: string }) => {
      return await apiRequest("/api/internationalization/cultural-adaptation", "POST", data);
    },
  });

  const handleTerminologyTranslation = () => {
    if (!selectedLanguage || !medicalTerms) return;
    
    const terms = medicalTerms.split(',').map(term => term.trim()).filter(Boolean);
    terminologyMutation.mutate({
      targetLanguage: selectedLanguage,
      medicalTerms: terms
    });
  };

  const handleQuestionTranslation = () => {
    if (!selectedLanguage || !sampleQuestion) return;
    
    const question = {
      content: sampleQuestion,
      type: "mcq",
      category: "general-medicine"
    };
    
    questionMutation.mutate({
      question,
      targetLanguage: selectedLanguage
    });
  };

  const handleLearningPathGeneration = () => {
    if (!selectedLanguage || !currentLevel) return;
    
    learningPathMutation.mutate({
      nativeLanguage: selectedLanguage,
      currentLevel
    });
  };

  const handleCulturalAdaptation = () => {
    if (!userRegion || !selectedLanguage) return;
    
    culturalAdaptationMutation.mutate({
      userRegion,
      targetLanguage: selectedLanguage
    });
  };

  if (languagesLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Globe className="w-12 h-12 mx-auto mb-4 animate-spin text-blue-600" />
            <p className="text-lg text-muted-foreground">Loading international support...</p>
          </div>
        </div>
      </div>
    );
  }

  const languages = languagesData?.languages || [];
  const featuredLanguages = languagesData?.featuredLanguages || [];

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Globe className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold">International PLAB Preparation</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Start your PLAB preparation in your native language before arriving in the UK. 
          Our comprehensive multi-language support helps international medical graduates build confidence 
          and familiarity with PLAB content and NHS context.
        </p>
      </div>

      {/* Language Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Choose Your Language
          </CardTitle>
          <CardDescription>
            Select your native language to begin personalised preparation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="language">Primary Language</Label>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your native language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang: Language) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      <div className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                        <span className="text-muted-foreground">({lang.nativeName})</span>
                        {lang.medicalTerminologySupport && (
                          <Badge variant="secondary" className="text-xs">Medical</Badge>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {featuredLanguages.length > 0 && (
              <div>
                <Label className="text-sm text-muted-foreground">Featured Languages</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {featuredLanguages.map((lang: Language) => (
                    <Button
                      key={lang.code}
                      variant={selectedLanguage === lang.code ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedLanguage(lang.code)}
                      className="flex items-center gap-2"
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {selectedLanguage && (
        <Tabs defaultValue="terminology" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="terminology">Medical Terms</TabsTrigger>
            <TabsTrigger value="questions">Question Translation</TabsTrigger>
            <TabsTrigger value="learning-path">Learning Path</TabsTrigger>
            <TabsTrigger value="nhs-context">NHS Context</TabsTrigger>
            <TabsTrigger value="cultural">Cultural Adaptation</TabsTrigger>
          </TabsList>

          {/* Medical Terminology */}
          <TabsContent value="terminology">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Medical Terminology Translation
                </CardTitle>
                <CardDescription>
                  Translate medical terms to build vocabulary in your native language
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="medical-terms">Medical Terms (comma-separated)</Label>
                    <Textarea
                      id="medical-terms"
                      placeholder="Enter medical terms, e.g., hypertension, diabetes, pneumonia"
                      value={medicalTerms}
                      onChange={(e) => setMedicalTerms(e.target.value)}
                      rows={3}
                    />
                  </div>
                  <Button onClick={handleTerminologyTranslation} disabled={terminologyMutation.isPending}>
                    {terminologyMutation.isPending ? "Translating..." : "Translate Terms"}
                  </Button>

                  {terminologyMutation.data && (
                    <div className="mt-6">
                      <h3 className="font-semibold mb-3">Translated Medical Terminology</h3>
                      <div className="grid gap-3 md:grid-cols-2">
                        {Object.entries(terminologyMutation.data.terminology).map(([english, translated]: [string, any]) => (
                          <div key={english} className="p-3 border rounded-lg">
                            <div className="font-medium text-sm text-muted-foreground">English</div>
                            <div className="font-semibold">{english}</div>
                            <div className="font-medium text-sm text-muted-foreground mt-2">
                              {languages.find((l: Language) => l.code === selectedLanguage)?.nativeName}
                            </div>
                            <div className="font-semibold text-blue-600">{translated}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Question Translation */}
          <TabsContent value="questions">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  PLAB Question Translation
                </CardTitle>
                <CardDescription>
                  Translate PLAB questions to understand concepts in your native language
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="sample-question">Sample PLAB Question</Label>
                    <Textarea
                      id="sample-question"
                      placeholder="Enter a PLAB question to translate"
                      value={sampleQuestion}
                      onChange={(e) => setSampleQuestion(e.target.value)}
                      rows={4}
                    />
                  </div>
                  <Button onClick={handleQuestionTranslation} disabled={questionMutation.isPending}>
                    {questionMutation.isPending ? "Translating..." : "Translate Question"}
                  </Button>

                  {questionMutation.data && (
                    <div className="mt-6 space-y-4">
                      <div>
                        <h3 className="font-semibold mb-2">Original Question (English)</h3>
                        <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                          {questionMutation.data.originalQuestion.content}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">
                          Translated Question ({languages.find((l: Language) => l.code === selectedLanguage)?.nativeName})
                        </h3>
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          {questionMutation.data.translatedQuestion.content}
                        </div>
                      </div>
                      {questionMutation.data.translatedQuestion.explanation && (
                        <div>
                          <h3 className="font-semibold mb-2">Explanation</h3>
                          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            {questionMutation.data.translatedQuestion.explanation}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Learning Path */}
          <TabsContent value="learning-path">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Progressive Learning Path
                </CardTitle>
                <CardDescription>
                  Get a personalised learning path that gradually transitions to English
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="current-level">Current English Level</Label>
                    <Select value={currentLevel} onValueChange={setCurrentLevel}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your current English level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner - Limited English medical knowledge</SelectItem>
                        <SelectItem value="intermediate">Intermediate - Some English medical vocabulary</SelectItem>
                        <SelectItem value="advanced">Advanced - Strong English medical background</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleLearningPathGeneration} disabled={learningPathMutation.isPending}>
                    {learningPathMutation.isPending ? "Generating..." : "Generate Learning Path"}
                  </Button>

                  {learningPathMutation.data && (
                    <div className="mt-6 space-y-6">
                      <div className="text-center">
                        <h3 className="text-xl font-semibold mb-2">Your Progressive Learning Journey</h3>
                        <p className="text-muted-foreground">
                          Estimated Timeline: {learningPathMutation.data.progressivePath.estimatedTimeline}
                        </p>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        {Object.entries(learningPathMutation.data.progressivePath)
                          .filter(([key]) => key.startsWith('phase'))
                          .map(([phase, data]: [string, any], index) => (
                          <div key={phase} className="p-4 border rounded-lg">
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                                {index + 1}
                              </div>
                              <h4 className="font-semibold">Phase {index + 1}</h4>
                            </div>
                            <Progress value={data.ratio} className="mb-3" />
                            <p className="text-sm text-muted-foreground">{data.description}</p>
                          </div>
                        ))}
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Learning Milestones</h4>
                        <div className="space-y-2">
                          {learningPathMutation.data.progressivePath.milestones.map((milestone: string, index: number) => (
                            <div key={index} className="flex items-center gap-3">
                              <CheckCircle className="w-5 h-5 text-green-600" />
                              <span>{milestone}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* NHS Context */}
          <TabsContent value="nhs-context">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  NHS Contextualisation
                </CardTitle>
                <CardDescription>
                  Learn NHS procedures and hierarchy in your native language
                </CardDescription>
              </CardHeader>
              <CardContent>
                {nhsContext && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-3">NHS Hierarchy</h3>
                      <div className="grid gap-3 md:grid-cols-2">
                        {Object.entries(nhsContext.nhsContext.hierarchy).map(([english, translated]: [string, any]) => (
                          <div key={english} className="p-3 border rounded-lg">
                            <div className="font-medium text-sm text-muted-foreground">English</div>
                            <div className="font-semibold">{english.replace('_', ' ')}</div>
                            <div className="font-medium text-sm text-muted-foreground mt-1">
                              {languages.find((l: Language) => l.code === selectedLanguage)?.nativeName}
                            </div>
                            <div className="font-semibold text-blue-600">{translated}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">Key Procedures</h3>
                      <div className="grid gap-3 md:grid-cols-2">
                        {Object.entries(nhsContext.nhsContext.procedures).map(([english, translated]: [string, any]) => (
                          <div key={english} className="p-3 border rounded-lg">
                            <div className="font-medium text-sm text-muted-foreground">English</div>
                            <div className="font-semibold">{english.replace('_', ' ')}</div>
                            <div className="font-medium text-sm text-muted-foreground mt-1">
                              {languages.find((l: Language) => l.code === selectedLanguage)?.nativeName}
                            </div>
                            <div className="font-semibold text-blue-600">{translated}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">Cultural Norms</h3>
                      <div className="space-y-2">
                        {nhsContext.nhsContext.culturalNorms.map((norm: string, index: number) => (
                          <div key={index} className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            {norm}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">Communication Tips</h3>
                      <div className="space-y-2">
                        {nhsContext.nhsContext.communicationTips.map((tip: string, index: number) => (
                          <div key={index} className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            {tip}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Cultural Adaptation */}
          <TabsContent value="cultural">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Cultural Adaptation Notes
                </CardTitle>
                <CardDescription>
                  Get region-specific guidance for adapting to UK medical practice
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="user-region">Your Current Region</Label>
                    <Select value={userRegion} onValueChange={setUserRegion}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your current region" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="middle-east">Middle East</SelectItem>
                        <SelectItem value="south-asia">South Asia</SelectItem>
                        <SelectItem value="europe">Europe</SelectItem>
                        <SelectItem value="africa">Africa</SelectItem>
                        <SelectItem value="americas">Americas</SelectItem>
                        <SelectItem value="east-asia">East Asia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleCulturalAdaptation} disabled={culturalAdaptationMutation.isPending}>
                    {culturalAdaptationMutation.isPending ? "Generating..." : "Get Cultural Guidance"}
                  </Button>

                  {culturalAdaptationMutation.data && (
                    <div className="mt-6 space-y-6">
                      <div>
                        <h3 className="font-semibold mb-3">Medical Practice Comparisons</h3>
                        <div className="space-y-2">
                          {culturalAdaptationMutation.data.adaptationNotes.medicalPracticeComparisons.map((comparison: string, index: number) => (
                            <div key={index} className="p-3 border rounded-lg">
                              {comparison}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-3">Communication Style Differences</h3>
                        <div className="space-y-2">
                          {culturalAdaptationMutation.data.adaptationNotes.communicationStyleDifferences.map((difference: string, index: number) => (
                            <div key={index} className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                              {difference}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-3">Hierarchy Adjustments</h3>
                        <div className="space-y-2">
                          {culturalAdaptationMutation.data.adaptationNotes.hierarchyAdjustments.map((adjustment: string, index: number) => (
                            <div key={index} className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                              {adjustment}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      {/* Benefits Section */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200">
        <CardHeader>
          <CardTitle className="text-center">Why Start Preparation Abroad?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <Clock className="w-12 h-12 mx-auto mb-3 text-blue-600" />
              <h3 className="font-semibold mb-2">Early Familiarisation</h3>
              <p className="text-sm text-muted-foreground">
                Start learning PLAB content and NHS context before arriving in the UK
              </p>
            </div>
            <div className="text-center">
              <Brain className="w-12 h-12 mx-auto mb-3 text-green-600" />
              <h3 className="font-semibold mb-2">Confidence Building</h3>
              <p className="text-sm text-muted-foreground">
                Build understanding in your native language before transitioning to English
              </p>
            </div>
            <div className="text-center">
              <Target className="w-12 h-12 mx-auto mb-3 text-purple-600" />
              <h3 className="font-semibold mb-2">Competitive Advantage</h3>
              <p className="text-sm text-muted-foreground">
                Arrive in the UK with advanced preparation and cultural understanding
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
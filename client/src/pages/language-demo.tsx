import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TranslatableText, MedicalTermTooltip } from "@/components/MedicalTermTooltip";
import { ExamModeToggle } from "@/components/LanguageToggle";
import { useI18n } from "@/hooks/useI18n";
import { Brain, Globe, BookOpen, Target, CheckCircle, ArrowRight } from "lucide-react";

export default function LanguageDemo() {
  const { t, currentLanguage, nativeLanguage } = useI18n();

  const sampleQuestions = [
    {
      id: 1,
      question: "A 45-year-old patient presents with chest pain and shortness of breath. Initial investigations show elevated troponin levels and ST-elevation on ECG. What is the most likely diagnosis?",
      options: [
        "Angina pectoris",
        "Myocardial infarction", 
        "Pulmonary embolism",
        "Pneumonia"
      ],
      correct: 1,
      explanation: "Elevated troponin levels combined with ST-elevation on ECG are classic indicators of myocardial infarction (heart attack). The patient's symptoms of chest pain and dyspnea support this diagnosis."
    },
    {
      id: 2,
      question: "An elderly patient with diabetes presents with polyuria, polydipsia, and confusion. Blood glucose is 28 mmol/L. Which condition should be considered?",
      options: [
        "Diabetic ketoacidosis",
        "Hypoglycemia",
        "Hyperglycemic hyperosmolar state",
        "Diabetic nephropathy"
      ],
      correct: 2,
      explanation: "The combination of very high blood glucose (28 mmol/L), polyuria, polydipsia, and altered mental status in an elderly diabetic patient suggests hyperglycemic hyperosmolar state (HHS)."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Globe className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold">Multilingual Medical Learning</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Experience how NHSprep supports international medical graduates with seamless language translation while maintaining official exam standards.
        </p>
      </div>

      {/* Language Toggle Demo */}
      <ExamModeToggle className="mb-8" />

      {/* Key Features */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-blue-600" />
              Smart Translation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Hover over medical terms to see translations in your native language. Click to toggle between languages instantly.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-green-600" />
              Exam Mode
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Practice in English (official exam language) while having translation support when needed for understanding.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-600" />
              Progressive Learning
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Build medical vocabulary gradually from familiar concepts in your language to English terminology.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Sample Questions with Translation */}
      <div className="space-y-8">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle className="w-6 h-6 text-green-600" />
          <h2 className="text-2xl font-bold">Interactive Medical Questions</h2>
          <Badge variant="secondary">Try hovering over medical terms</Badge>
        </div>

        {sampleQuestions.map((question, index) => (
          <Card key={question.id} className="border-l-4 border-l-blue-500">
            <CardHeader>
              <CardTitle className="text-lg">
                Question {index + 1}
              </CardTitle>
              <CardDescription className="text-base leading-relaxed">
                <TranslatableText 
                  text={question.question}
                  medicalTerms={['troponin', 'ECG', 'myocardial infarction', 'diabetes', 'polyuria', 'polydipsia']}
                />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-6">
                {question.options.map((option, optionIndex) => (
                  <div 
                    key={optionIndex}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      optionIndex === question.correct 
                        ? 'bg-green-50 border-green-200 text-green-800' 
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <span className="font-medium mr-2">{String.fromCharCode(65 + optionIndex)}.</span>
                    <MedicalTermTooltip term={option.toLowerCase().replace(/\s+/g, ' ')}>
                      {option}
                    </MedicalTermTooltip>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Explanation
                </h4>
                <p className="text-blue-700 text-sm">
                  <TranslatableText 
                    text={question.explanation}
                    medicalTerms={['troponin', 'ECG', 'myocardial infarction', 'dyspnea', 'hyperglycemic hyperosmolar state']}
                  />
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Medical Terminology Reference */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-600" />
            Medical Terminology Reference
          </CardTitle>
          <CardDescription>
            Common medical terms with translations (hover to see your language)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              'hypertension', 'diabetes', 'pneumonia', 'myocardial infarction',
              'stroke', 'asthma', 'arthritis', 'anemia', 'hepatitis', 'nephritis'
            ].map((term) => (
              <div key={term} className="p-3 bg-gray-50 rounded-lg">
                <MedicalTermTooltip term={term}>
                  <span className="font-medium capitalize cursor-help underline decoration-dotted">
                    {term}
                  </span>
                </MedicalTermTooltip>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <div className="mt-12 text-center">
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your Medical Journey?</h3>
            <p className="text-lg text-muted-foreground mb-6">
              Join thousands of international medical graduates who are successfully preparing for their UK medical career with multilingual support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Begin PLAB Preparation
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" size="lg">
                Explore All Features
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
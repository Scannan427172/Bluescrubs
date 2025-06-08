import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, BookOpen, Users, Shield, Award, Target, Brain, Globe, ArrowRight, FileText, Stethoscope, GraduationCap } from "lucide-react";
import { QUESTION_BANK_STATS } from "@shared/expanded-question-bank";

export default function ContentStrategy() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <FileText className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold">GMC-Aligned Content Strategy</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Our comprehensive approach to creating authentic PLAB preparation content that follows official GMC guidelines and maintains the highest medical education standards.
        </p>
      </div>

      {/* Official GMC Framework */}
      <Card className="mb-8 border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            Official GMC PLAB 1 Framework
          </CardTitle>
          <CardDescription>
            All content aligned with General Medical Council specifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">Applied Basic Sciences (15%)</h4>
              <ul className="text-sm space-y-1 text-blue-700">
                <li>• Anatomy and physiology</li>
                <li>• Pathology and pathophysiology</li>
                <li>• Clinical biochemistry</li>
                <li>• Clinical microbiology</li>
                <li>• Clinical pharmacology</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">Clinical Knowledge (70%)</h4>
              <ul className="text-sm space-y-1 text-blue-700">
                <li>• History taking and examination</li>
                <li>• Investigation and diagnosis</li>
                <li>• Treatment and management</li>
                <li>• Prognosis and follow-up</li>
                <li>• Prevention and health promotion</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">Professional Attributes (15%)</h4>
              <ul className="text-sm space-y-1 text-blue-700">
                <li>• Patient safety and governance</li>
                <li>• Communication skills</li>
                <li>• Professional development</li>
                <li>• Medical ethics and law</li>
                <li>• Public health promotion</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Development Strategy */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-green-600" />
              Medical Expert Review
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Qualified Medical Professionals</h4>
                <p className="text-sm text-muted-foreground">All content created and reviewed by GMC-registered doctors with PLAB experience</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Clinical Accuracy Validation</h4>
                <p className="text-sm text-muted-foreground">Multi-stage review process ensuring medical accuracy and current best practices</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Regular Content Updates</h4>
                <p className="text-sm text-muted-foreground">Quarterly reviews to align with latest medical guidelines and GMC updates</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-purple-600" />
              Educational Partnerships
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Medical School Collaboration</h4>
                <p className="text-sm text-muted-foreground">Partnerships with UK medical schools for authentic clinical scenarios</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-medium">NHS Trust Involvement</h4>
                <p className="text-sm text-muted-foreground">Real-world case studies from NHS clinical settings with anonymized patient data</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Royal College Alignment</h4>
                <p className="text-sm text-muted-foreground">Content aligned with Royal College guidelines and specialty curricula</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Question Development Process */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-blue-600" />
            Authentic Question Development Process
          </CardTitle>
          <CardDescription>
            How we create GMC-standard questions without compromising exam integrity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <h4 className="font-semibold mb-2">Clinical Scenario Creation</h4>
              <p className="text-sm text-muted-foreground">Medical experts develop realistic patient presentations based on common clinical conditions</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-green-600 font-bold">2</span>
              </div>
              <h4 className="font-semibold mb-2">GMC Blueprint Mapping</h4>
              <p className="text-sm text-muted-foreground">Each question mapped to specific GMC learning outcomes and PLAB specifications</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-purple-600 font-bold">3</span>
              </div>
              <h4 className="font-semibold mb-2">Multi-Stage Review</h4>
              <p className="text-sm text-muted-foreground">Content reviewed by clinical experts, educationalists, and PLAB veterans</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-orange-600 font-bold">4</span>
              </div>
              <h4 className="font-semibold mb-2">Quality Assurance</h4>
              <p className="text-sm text-muted-foreground">Statistical analysis and user feedback ensure appropriate difficulty and discrimination</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Categories */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Comprehensive Content Coverage</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: "Cardiovascular Medicine", questions: QUESTION_BANK_STATS.byCategory.cardiovascular || 0, specialty: "Cardiology" },
            { name: "Respiratory Medicine", questions: QUESTION_BANK_STATS.byCategory.respiratory || 0, specialty: "Pulmonology" },
            { name: "Gastroenterology", questions: QUESTION_BANK_STATS.byCategory.gastroenterology || 0, specialty: "GI Medicine" },
            { name: "Neurology", questions: QUESTION_BANK_STATS.byCategory.neurology || 0, specialty: "Neurosciences" },
            { name: "Endocrinology", questions: QUESTION_BANK_STATS.byCategory.endocrinology || 0, specialty: "Diabetes & Endocrine" },
            { name: "Nephrology", questions: QUESTION_BANK_STATS.byCategory.nephrology || 0, specialty: "Renal Medicine" },
            { name: "Psychiatry", questions: QUESTION_BANK_STATS.byCategory.psychiatry || 0, specialty: "Mental Health" },
            { name: "Obstetrics & Gynecology", questions: QUESTION_BANK_STATS.byCategory['obstetrics-gynaecology'] || 0, specialty: "Women's Health" },
            { name: "Pediatrics", questions: QUESTION_BANK_STATS.byCategory.paediatrics || 0, specialty: "Child Health" },
            { name: "Surgery", questions: QUESTION_BANK_STATS.byCategory.surgery || 0, specialty: "Surgical Sciences" },
            { name: "Emergency Medicine", questions: QUESTION_BANK_STATS.byCategory['emergency-medicine'] || 0, specialty: "Acute Care" },
            { name: "Ethics & Law", questions: QUESTION_BANK_STATS.byCategory['ethics-law'] || 0, specialty: "Professional Practice" }
          ].map((category) => (
            <Card key={category.name} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-sm">{category.name}</h4>
                  <Badge variant="secondary" className="text-xs">{category.questions.toLocaleString()}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{category.specialty}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quality Assurance */}
      <Card className="mb-8 border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-green-600" />
            Quality Assurance & Standards
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-green-800 mb-3">Medical Accuracy Standards</h4>
              <ul className="space-y-2 text-sm text-green-700">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Evidence-based medical content
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Current clinical guidelines (NICE, BMJ, etc.)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Peer-reviewed by multiple clinicians
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Regular content audits and updates
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-800 mb-3">Educational Standards</h4>
              <ul className="space-y-2 text-sm text-green-700">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Bloom's taxonomy alignment
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Appropriate cognitive load
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Clear learning objectives
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Constructive feedback provision
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <div className="text-center">
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4">Experience Authentic PLAB Preparation</h3>
            <p className="text-lg text-muted-foreground mb-6">
              Practice with GMC-aligned questions created by qualified medical professionals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Start Practice Questions
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" size="lg">
                View Sample Questions
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
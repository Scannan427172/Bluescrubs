import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Heart, Users, BookOpen, AlertCircle } from "lucide-react";

export default function NhsCodeOfConduct() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">NHS Code of Conduct</h1>
          <p className="text-lg text-gray-600">
            Our commitment to NHS values and professional standards in medical education
          </p>
        </div>

        {/* NHS Values */}
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-blue-600" />
              <span>NHS Constitution Values</span>
            </CardTitle>
            <CardDescription>
              We embed NHS core values throughout our educational platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Badge variant="outline" className="bg-blue-100 text-blue-700">Working together for patients</Badge>
                </div>
                <div className="flex items-start space-x-3">
                  <Badge variant="outline" className="bg-blue-100 text-blue-700">Respect and dignity</Badge>
                </div>
                <div className="flex items-start space-x-3">
                  <Badge variant="outline" className="bg-blue-100 text-blue-700">Commitment to quality of care</Badge>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Badge variant="outline" className="bg-blue-100 text-blue-700">Compassion</Badge>
                </div>
                <div className="flex items-start space-x-3">
                  <Badge variant="outline" className="bg-blue-100 text-blue-700">Improving lives</Badge>
                </div>
                <div className="flex items-start space-x-3">
                  <Badge variant="outline" className="bg-blue-100 text-blue-700">Everyone counts</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Professional Standards */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-600" />
              <span>Professional Standards</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">1. Patient-Centered Care</h3>
              <div className="text-gray-700 space-y-2">
                <p>• All educational content prioritizes patient safety and wellbeing</p>
                <p>• Cultural sensitivity training integrated throughout the platform</p>
                <p>• Emphasis on person-centered care approaches</p>
                <p>• Respect for patient autonomy and dignity in all scenarios</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">2. Professional Integrity</h3>
              <div className="text-gray-700 space-y-2">
                <p>• Honest and transparent communication in all interactions</p>
                <p>• Commitment to evidence-based medical practice</p>
                <p>• Maintaining professional boundaries in mentoring relationships</p>
                <p>• Continuous professional development and lifelong learning</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">3. Equality and Inclusion</h3>
              <div className="text-gray-700 space-y-2">
                <p>• Equal access to educational resources for all users</p>
                <p>• Zero tolerance for discrimination or harassment</p>
                <p>• Celebration of diversity in healthcare teams</p>
                <p>• Accommodation for different learning needs and styles</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">4. Collaborative Working</h3>
              <div className="text-gray-700 space-y-2">
                <p>• Emphasis on multidisciplinary team working</p>
                <p>• Effective communication skills development</p>
                <p>• Peer support and mentoring opportunities</p>
                <p>• Sharing knowledge and best practices</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Educational Commitment */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-purple-600" />
              <span>Educational Commitment</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Quality Standards</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Evidence-based curriculum development</li>
                  <li>• Regular content review and updates</li>
                  <li>• Alignment with GMC standards</li>
                  <li>• Continuous quality improvement</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Learning Environment</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Safe and supportive learning spaces</li>
                  <li>• Constructive feedback mechanisms</li>
                  <li>• Respect for diverse backgrounds</li>
                  <li>• Confidential support services</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Community Standards */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-orange-600" />
              <span>Community Standards</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Expected Behavior</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-green-700">✓ Encouraged</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Respectful communication</li>
                    <li>• Constructive feedback</li>
                    <li>• Collaborative learning</li>
                    <li>• Cultural sensitivity</li>
                    <li>• Professional development</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-red-700">✗ Prohibited</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Discriminatory language</li>
                    <li>• Harassment or bullying</li>
                    <li>• Unprofessional conduct</li>
                    <li>• Sharing confidential information</li>
                    <li>• Academic dishonesty</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reporting and Support */}
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              <span>Reporting and Support</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              If you experience or witness behavior that violates our code of conduct, please report it immediately through our confidential reporting system.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">Reporting Channels</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>• Email: conduct@plabmaster.co.uk</p>
                  <p>• Phone: +44 (0) 20 7946 0959</p>
                  <p>• Online form: Available 24/7</p>
                  <p>• Anonymous reporting option</p>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">Support Services</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>• Confidential counseling support</p>
                  <p>• Academic guidance services</p>
                  <p>• Career development advice</p>
                  <p>• Wellbeing resources</p>
                </div>
              </div>
            </div>
            <Button className="w-full md:w-auto mt-4">
              Report a Concern
            </Button>
          </CardContent>
        </Card>

        {/* Acknowledgment */}
        <Card className="border-gray-200">
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 text-center">
              By using this platform, you acknowledge that you have read, understood, and agree to abide by this NHS Code of Conduct. 
              This code is reviewed annually and updated to reflect current NHS standards and best practices.
            </p>
            <p className="text-xs text-gray-500 text-center mt-4">
              Last updated: December 2024 | Version 2.1
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
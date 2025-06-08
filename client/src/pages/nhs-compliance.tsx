import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, FileText, ExternalLink } from "lucide-react";

export default function NhsCompliance() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">NHS Compliance & Standards</h1>
          <p className="text-lg text-gray-600">
            Educational content designed to help prepare for NHS working environment
          </p>
        </div>

        {/* NHS Standards Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>NHS Standards Compliance</span>
            </CardTitle>
            <CardDescription>
              Educational content focused on NHS working environment preparation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  NHS Context Training
                </Badge>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  Study Materials Available
                </Badge>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  Educational Resources
                </Badge>
              </div>
              <div className="space-y-2">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  Practice Content
                </Badge>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  Learning Support
                </Badge>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  Preparation Tools
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* NHS Documents */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Information Governance */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Data Protection</CardTitle>
              <CardDescription>
                Standard data protection and privacy measures for educational platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-gray-600 space-y-2">
                <p>• GDPR compliant data handling</p>
                <p>• Secure user authentication</p>
                <p>• Encrypted data transmission</p>
                <p>• Regular security updates</p>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                <FileText className="w-4 h-4 mr-2" />
                View Full Policy
              </Button>
            </CardContent>
          </Card>

          {/* Clinical Standards */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Educational Content</CardTitle>
              <CardDescription>
                Study materials and practice resources for medical exam preparation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-gray-600 space-y-2">
                <p>• Practice questions and mock tests</p>
                <p>• Study guides and reference materials</p>
                <p>• Video tutorials and explanations</p>
                <p>• Progress tracking and analytics</p>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                <FileText className="w-4 h-4 mr-2" />
                View Standards Document
              </Button>
            </CardContent>
          </Card>

          {/* Equality & Diversity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Accessibility & Inclusion</CardTitle>
              <CardDescription>
                Platform accessibility and inclusive learning environment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-gray-600 space-y-2">
                <p>• Multi-language content support</p>
                <p>• Screen reader compatibility</p>
                <p>• Adjustable text size and contrast</p>
                <p>• Neurodiversity learning adaptations</p>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                <FileText className="w-4 h-4 mr-2" />
                View Policy
              </Button>
            </CardContent>
          </Card>

          {/* Patient Safety */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Patient Safety Standards</CardTitle>
              <CardDescription>
                Educational content aligned with NHS patient safety frameworks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-gray-600 space-y-2">
                <p>• NHS Patient Safety Strategy alignment</p>
                <p>• National Patient Safety Alerts integration</p>
                <p>• Clinical risk management principles</p>
                <p>• Safety culture promotion in education</p>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                <FileText className="w-4 h-4 mr-2" />
                View Framework
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Regulatory Bodies */}
        <Card>
          <CardHeader>
            <CardTitle>Regulatory Body Compliance</CardTitle>
            <CardDescription>
              Our platform maintains compliance with all relevant UK healthcare regulatory bodies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <h4 className="font-semibold text-gray-900">General Medical Council (GMC)</h4>
                <p className="text-sm text-gray-600 mt-2">
                  Standards for medical education and professional development
                </p>
                <Button variant="link" size="sm" className="mt-2">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  GMC Standards
                </Button>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <h4 className="font-semibold text-gray-900">Care Quality Commission (CQC)</h4>
                <p className="text-sm text-gray-600 mt-2">
                  Quality and safety standards for healthcare services
                </p>
                <Button variant="link" size="sm" className="mt-2">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  CQC Guidelines
                </Button>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <h4 className="font-semibold text-gray-900">NHS Education England</h4>
                <p className="text-sm text-gray-600 mt-2">
                  Medical education and training standards
                </p>
                <Button variant="link" size="sm" className="mt-2">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  HEE Standards
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-blue-600" />
              <span>Compliance Queries</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              For any questions about our NHS compliance or to report compliance concerns, please contact our dedicated compliance team.
            </p>
            <div className="space-y-2 text-sm">
              <p><strong>Email:</strong> compliance@plabmaster.co.uk</p>
              <p><strong>Phone:</strong> +44 (0) 20 7946 0958</p>
              <p><strong>Address:</strong> PLAB Master, Medical Education House, London, UK</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
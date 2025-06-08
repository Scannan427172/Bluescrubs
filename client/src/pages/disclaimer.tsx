import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, FileText, Shield, Info } from "lucide-react";
import { Link } from "wouter";

export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <AlertTriangle className="w-8 h-8 text-amber-600" />
            <h1 className="text-3xl font-bold text-gray-900">Important Disclaimer</h1>
          </div>
          <p className="text-lg text-gray-600">
            Please read this disclaimer carefully before using our platform
          </p>
        </div>

        {/* Main Disclaimer */}
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <span>Educational Platform Disclaimer</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-gray-700 space-y-3">
              <p className="font-semibold">
                NHSprep is an independent educational platform and is NOT affiliated with, endorsed by, or officially connected to:
              </p>
              <ul className="space-y-2 ml-4">
                <li>• The National Health Service (NHS)</li>
                <li>• NHS England, NHS Scotland, NHS Wales, or NHS Northern Ireland</li>
                <li>• General Medical Council (GMC)</li>
                <li>• Professional and Linguistic Assessments Board (PLAB)</li>
                <li>• Any official UK medical regulatory body</li>
                <li>• Any government health department or agency</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Service Limitations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Info className="w-5 h-5 text-blue-600" />
              <span>Service Limitations</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-gray-700 space-y-3">
              <p><strong>Study Materials Only:</strong> Our platform provides study materials, practice questions, and educational content for medical exam preparation. We do not:</p>
              <ul className="space-y-2 ml-4">
                <li>• Guarantee exam results or pass rates</li>
                <li>• Provide official medical certification</li>
                <li>• Offer job placement or employment services</li>
                <li>• Have direct connections with NHS trusts or hospitals</li>
                <li>• Provide medical advice or clinical guidance</li>
                <li>• Replace official exam preparation requirements</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Accuracy Disclaimer */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-600" />
              <span>Content Accuracy</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-gray-700 space-y-3">
              <p>
                While we strive to provide accurate and up-to-date educational content, users should:
              </p>
              <ul className="space-y-2 ml-4">
                <li>• Always verify information with official sources</li>
                <li>• Check current exam requirements with relevant authorities</li>
                <li>• Consult official websites for the latest guidelines</li>
                <li>• Seek professional advice for career planning</li>
                <li>• Use our materials as supplementary study aids only</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Official Resources */}
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <span>Official Resources</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-gray-700 space-y-3">
              <p>For official information, always consult:</p>
              <ul className="space-y-2 ml-4">
                <li>• <strong>PLAB:</strong> GMC website (gmc-uk.org)</li>
                <li>• <strong>NHS Careers:</strong> NHS website (nhs.uk)</li>
                <li>• <strong>Medical Registration:</strong> GMC registration portal</li>
                <li>• <strong>Visa Requirements:</strong> UK Government immigration website</li>
                <li>• <strong>NHS Jobs:</strong> NHS Jobs website (jobs.nhs.uk)</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* User Responsibility */}
        <Card>
          <CardHeader>
            <CardTitle>User Responsibility</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-gray-700 space-y-3">
              <p>
                By using this platform, you acknowledge that you are responsible for:
              </p>
              <ul className="space-y-2 ml-4">
                <li>• Verifying all exam requirements independently</li>
                <li>• Following official registration procedures</li>
                <li>• Meeting all legal and professional requirements</li>
                <li>• Making informed decisions about your medical career</li>
                <li>• Understanding that success depends on individual effort and preparation</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Contact and Updates */}
        <Card>
          <CardHeader>
            <CardTitle>Updates and Contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-gray-700 space-y-3">
              <p>
                This disclaimer may be updated periodically. Users are responsible for reviewing current terms.
                If you have questions about our educational services, please contact our support team.
              </p>
              <p className="text-xs text-gray-500">
                Last updated: {new Date().toLocaleDateString('en-GB')}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center pt-6">
          <Link href="/">
            <Button variant="outline">
              Return to Home
            </Button>
          </Link>
          <Link href="/legal-compliance">
            <Button>
              View Legal Information
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
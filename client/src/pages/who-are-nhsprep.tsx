import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronLeft, 
  Users, 
  Stethoscope, 
  Code, 
  Heart, 
  Target,
  ExternalLink,
  Award,
  Globe,
  BookOpen,
  Lightbulb,
  Handshake
} from "lucide-react";
import { Link } from "wouter";

export default function WhoAreNHSprep() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/more">
            <Button variant="outline" size="sm">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to More
            </Button>
          </Link>
        </div>

        <div className="text-center space-y-4 mb-8">
          <div className="flex items-center justify-center gap-3">
            <Users className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Who are NHSprep</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            The story behind NHSprep - how two professionals came together to revolutionize medical exam preparation
          </p>
        </div>

        {/* Founding Story */}
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lightbulb className="w-5 h-5 text-blue-600" />
              <span>The Beginning</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              NHSprep was born from a chance meeting between two professionals who shared a vision of making medical exam preparation more accessible and effective for international medical graduates.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <Handshake className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-blue-700">A Partnership Built on Shared Purpose</span>
            </div>
          </CardContent>
        </Card>

        {/* Founder Profiles */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Yasa Profile */}
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Stethoscope className="w-5 h-5 text-green-600" />
                <span>Yasa - The Medical Visionary</span>
              </CardTitle>
              <div className="flex gap-2">
                <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                  NHS Doctor
                </Badge>
                <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                  PLAB Graduate
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 text-gray-700">
                <p>
                  <strong>The Originator:</strong> Yasa conceived the initial idea for NHSprep, drawing from his personal experience as an international medical graduate who successfully navigated the PLAB examination process.
                </p>
                <p>
                  <strong>NHS Experience:</strong> As a well-respected NHS doctor, Yasa understands the real-world challenges that international medical graduates face when transitioning into the UK healthcare system.
                </p>
                <p>
                  <strong>Medical Insight:</strong> His firsthand experience with PLAB, combined with his ongoing work within the NHS, provides invaluable insight into what medical graduates truly need to succeed.
                </p>
              </div>
              
              <div className="flex items-center gap-2 p-3 bg-green-100 rounded-lg">
                <Heart className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-green-700">
                  Passionate about helping fellow international medical graduates
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Keith Profile */}
          <Card className="border-purple-200 bg-purple-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Code className="w-5 h-5 text-purple-600" />
                <span>Keith Hunter - The Technical Innovator</span>
              </CardTitle>
              <div className="flex gap-2">
                <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-200">
                  App Developer
                </Badge>
                <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-200">
                  Technology Expert
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 text-gray-700">
                <p>
                  <strong>The Builder:</strong> Keith brings years of professional app development experience, specializing in creating innovative digital solutions that solve real-world problems.
                </p>
                <p>
                  <strong>Creative Talent:</strong> His technical expertise and creative approach to problem-solving made him the perfect partner to transform Yasa's vision into a functional, user-friendly platform.
                </p>
                <p>
                  <strong>Professional Portfolio:</strong> Keith's extensive experience in app development provides the technical foundation that makes NHSprep's advanced features possible.
                </p>
              </div>
              
              <div className="flex items-center gap-2 p-3 bg-purple-100 rounded-lg">
                <Target className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium text-purple-700">
                  Dedicated to building technology that makes a difference
                </span>
              </div>

              <div className="pt-2">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a href="https://keithhunter.co.uk" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Visit Keith's Portfolio
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Partnership Story */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Handshake className="w-5 h-5 text-blue-600" />
              <span>The Partnership</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-gray-700 space-y-4">
              <p>
                When Yasa and Keith met, they discovered a perfect complementary partnership. Yasa's deep understanding of the medical profession and the challenges faced by international graduates combined seamlessly with Keith's technical expertise and app development skills.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 my-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-green-700 flex items-center gap-2">
                    <Stethoscope className="w-4 h-4" />
                    Yasa's Contribution
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Medical expertise and NHS experience</li>
                    <li>• Understanding of PLAB examination process</li>
                    <li>• Insight into international graduate challenges</li>
                    <li>• Clinical knowledge and healthcare context</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-purple-700 flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    Keith's Contribution
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Technical development and app creation</li>
                    <li>• User experience design and interface</li>
                    <li>• Creative problem-solving approaches</li>
                    <li>• Platform architecture and functionality</li>
                  </ul>
                </div>
              </div>

              <p>
                This unique combination of medical expertise and technological innovation resulted in NHSprep - a platform that truly understands both the educational needs of medical professionals and the technical requirements of modern learning platforms.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Mission Statement */}
        <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="w-5 h-5 text-blue-600" />
              <span>Our Mission</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed text-lg">
              Together, Yasa and Keith created NHSprep with the mission to provide international medical graduates with the tools, knowledge, and support they need to successfully prepare for medical examinations and build rewarding careers in healthcare.
            </p>
            
            <div className="flex items-center gap-2 pt-4">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-blue-700">
                Bridging the gap between aspiration and achievement in medical careers
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <Card>
          <CardHeader>
            <CardTitle>Connect with the Team</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              Have questions about our story or want to learn more about the platform? 
              We're always happy to hear from fellow medical professionals and aspiring healthcare workers.
            </p>
            
            <div className="flex gap-4 justify-center pt-4">
              <Link href="/contact">
                <Button>
                  Get in Touch
                </Button>
              </Link>
              <Button variant="outline" asChild>
                <a href="https://keithhunter.co.uk" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Keith's Work
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
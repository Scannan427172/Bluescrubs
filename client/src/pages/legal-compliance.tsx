import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronLeft,
  FileText,
  Shield,
  Scale,
  Eye,
  Download,
  Calendar,
  CheckCircle,
  AlertCircle,
  ExternalLink
} from "lucide-react";
import { Link } from "wouter";

export default function LegalCompliance() {
  const documents = [
    {
      icon: FileText,
      title: "Privacy Policy",
      description: "Our commitment to protecting your personal data and privacy rights",
      lastUpdated: "March 15, 2024",
      version: "v2.1",
      status: "current",
      size: "8 pages",
      type: "policy"
    },
    {
      icon: Shield,
      title: "GDPR Compliance",
      description: "European data protection regulations and your rights under GDPR",
      lastUpdated: "January 10, 2024",
      version: "v1.3",
      status: "current",
      size: "12 pages",
      type: "regulation"
    },
    {
      icon: FileText,
      title: "Terms of Service",
      description: "Legal terms and conditions for using our platform and services",
      lastUpdated: "February 28, 2024",
      version: "v3.0",
      status: "current",
      size: "15 pages",
      type: "terms"
    },
    {
      icon: Scale,
      title: "Data Processing Agreement",
      description: "Details on how we collect, process, and store your data",
      lastUpdated: "December 5, 2023",
      version: "v1.2",
      status: "current",
      size: "6 pages",
      type: "agreement"
    },
    {
      icon: Shield,
      title: "Cookie Policy",
      description: "Information about cookies and tracking technologies we use",
      lastUpdated: "April 2, 2024",
      version: "v1.4",
      status: "current",
      size: "4 pages",
      type: "policy"
    },
    {
      icon: FileText,
      title: "Acceptable Use Policy",
      description: "Guidelines for appropriate use of our platform and services",
      lastUpdated: "November 18, 2023",
      version: "v2.0",
      status: "current",
      size: "7 pages",
      type: "policy"
    }
  ];

  const complianceStats = {
    totalDocuments: documents.length,
    lastReview: "March 2024",
    nextReview: "June 2024",
    complianceScore: 98
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'policy':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'regulation':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'terms':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'agreement':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/more" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Legal & Compliance</h1>
            <p className="text-gray-600">Legal documents, policies, and compliance information</p>
          </div>
        </div>

        {/* Compliance Overview */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Compliance Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-slate-50 border-slate-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-slate-600">{complianceStats.totalDocuments}</div>
                <div className="text-sm text-gray-600">Legal Documents</div>
              </CardContent>
            </Card>
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{complianceStats.complianceScore}%</div>
                <div className="text-sm text-gray-600">Compliance Score</div>
              </CardContent>
            </Card>
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{complianceStats.lastReview}</div>
                <div className="text-sm text-gray-600">Last Review</div>
              </CardContent>
            </Card>
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{complianceStats.nextReview}</div>
                <div className="text-sm text-gray-600">Next Review</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Legal Documents */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Legal Documents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {documents.map((document, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-slate-200">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-slate-100 rounded-lg">
                        <document.icon className="h-6 w-6 text-slate-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{document.title}</CardTitle>
                        <p className="text-sm text-gray-600 mt-1">{document.description}</p>
                      </div>
                    </div>
                    <Badge className={getTypeColor(document.type)}>
                      {document.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Last Updated:</span>
                      <span className="font-medium">{document.lastUpdated}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Version:</span>
                      <span className="font-medium">{document.version}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Document Size:</span>
                      <span className="font-medium">{document.size}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Status:</span>
                      <div className="flex items-center gap-1">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="font-medium text-green-600 capitalize">{document.status}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* GDPR Rights */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Your GDPR Rights</h2>
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="text-center">
                  <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-medium text-gray-900">Right to Access</h3>
                  <p className="text-sm text-gray-600">Request access to your personal data</p>
                </div>
                <div className="text-center">
                  <FileText className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-medium text-gray-900">Right to Rectification</h3>
                  <p className="text-sm text-gray-600">Correct inaccurate personal data</p>
                </div>
                <div className="text-center">
                  <Scale className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-medium text-gray-900">Right to Erasure</h3>
                  <p className="text-sm text-gray-600">Request deletion of your data</p>
                </div>
              </div>
              <div className="text-center mt-6">
                <Button>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Exercise Your Rights
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Compliance Updates */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Updates</h2>
          <div className="space-y-4">
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="font-medium text-green-800">Privacy Policy Updated</div>
                    <div className="text-sm text-green-700">Updated data retention policies and user consent mechanisms - March 15, 2024</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium text-blue-800">Upcoming Review</div>
                    <div className="text-sm text-blue-700">Scheduled compliance review for all legal documents - June 2024</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
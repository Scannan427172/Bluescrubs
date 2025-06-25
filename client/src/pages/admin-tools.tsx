import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronLeft,
  Database,
  Shield,
  Settings,
  BarChart3,
  Users,
  FileText,
  Activity,
  AlertTriangle,
  Lock,
  Server,
  Monitor
} from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

export default function AdminTools() {
  const [accessDenied, setAccessDenied] = useState(false);

  const handleAdminAccess = () => {
    setAccessDenied(true);
  };

  const adminSections = [
    {
      icon: Database,
      title: "Database Management",
      description: "Question bank administration, content moderation, and data integrity",
      status: "Active",
      color: "blue"
    },
    {
      icon: Users,
      title: "User Management", 
      description: "User accounts, permissions, and access control administration",
      status: "Active",
      color: "green"
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "System performance metrics, usage statistics, and reporting",
      status: "Active", 
      color: "purple"
    },
    {
      icon: Shield,
      title: "Security Center",
      description: "Security monitoring, threat detection, and access logs",
      status: "Monitoring",
      color: "red"
    },
    {
      icon: Settings,
      title: "System Configuration",
      description: "Platform settings, feature flags, and environment configuration",
      status: "Stable",
      color: "gray"
    },
    {
      icon: FileText,
      title: "Content Management",
      description: "Medical content review, question approval, and quality assurance",
      status: "Active",
      color: "yellow"
    }
  ];

  const systemStatus = [
    { name: "Database", status: "Healthy", uptime: "99.9%" },
    { name: "API Services", status: "Healthy", uptime: "99.8%" },
    { name: "Authentication", status: "Healthy", uptime: "100%" },
    { name: "File Storage", status: "Healthy", uptime: "99.7%" },
    { name: "Background Jobs", status: "Healthy", uptime: "99.5%" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Navigation */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/more" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <h2 className="text-2xl font-bold text-gray-900">Admin Tools</h2>
          <Badge variant="secondary" className="bg-red-100 text-red-800">
            <Lock className="w-3 h-3 mr-1" />
            Restricted Access
          </Badge>
        </div>

        {!accessDenied ? (
          <>
            {/* Access Warning */}
            <Card className="mb-8 border-amber-200 bg-amber-50">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-amber-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-amber-900 mb-2">Administrator Access Required</h3>
                    <p className="text-amber-800 mb-4">
                      These tools require administrator privileges. Please verify your credentials to continue.
                    </p>
                    <Button 
                      onClick={handleAdminAccess}
                      variant="outline" 
                      className="border-amber-300 text-amber-700 hover:bg-amber-100"
                    >
                      Request Access
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* System Status Overview */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-green-600" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {systemStatus.map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{service.name}</p>
                        <p className="text-sm text-gray-600">Uptime: {service.uptime}</p>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {service.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Admin Sections */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {adminSections.map((section, index) => (
                <Card key={index} className={`border-${section.color}-200 hover:shadow-md transition-shadow cursor-not-allowed opacity-75`}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 bg-${section.color}-100 rounded-lg`}>
                        <section.icon className={`w-6 h-6 text-${section.color}-600`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{section.title}</CardTitle>
                        <Badge variant="outline" className={`border-${section.color}-300 text-${section.color}-700`}>
                          {section.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">{section.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-8 text-center">
              <Shield className="w-16 h-16 text-red-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-red-900 mb-4">Access Denied</h3>
              <p className="text-red-800 mb-6">
                You do not have sufficient privileges to access administrative tools. 
                Please contact your system administrator for access.
              </p>
              <div className="space-y-2">
                <p className="text-sm text-red-700">
                  <strong>Contact:</strong> admin@bluescrubsprep.com
                </p>
                <p className="text-sm text-red-700">
                  <strong>Error Code:</strong> 403_INSUFFICIENT_PRIVILEGES
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
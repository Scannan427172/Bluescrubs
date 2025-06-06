import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronLeft,
  Database,
  Shield,
  Settings,
  Users,
  Activity,
  FileText,
  BarChart3,
  Server,
  Lock,
  Monitor,
  AlertTriangle
} from "lucide-react";
import { Link } from "wouter";

export default function AdminTools() {
  const systemStats = {
    totalUsers: 12847,
    activeUsers: 8921,
    systemUptime: "99.9%",
    dataBackups: "Daily",
    securityScore: 95,
    lastUpdate: "2 hours ago"
  };

  const adminSections = [
    {
      icon: Database,
      title: "Storage Management",
      description: "Manage database, file storage, and backup systems",
      stats: "2.4TB used of 5TB",
      status: "healthy",
      features: ["Database optimization", "File cleanup", "Backup management", "Storage monitoring"]
    },
    {
      icon: Shield,
      title: "Security Center",
      description: "Monitor security threats, user access, and system vulnerabilities",
      stats: "95% security score",
      status: "secure",
      features: ["User permissions", "Security logs", "Threat detection", "Access control"]
    },
    {
      icon: Settings,
      title: "System Settings",
      description: "Configure platform settings, integrations, and system preferences",
      stats: "All systems operational",
      status: "active",
      features: ["Platform config", "API settings", "Email templates", "Feature flags"]
    },
    {
      icon: Users,
      title: "User Management",
      description: "Manage user accounts, roles, permissions, and authentication",
      stats: `${systemStats.totalUsers} total users`,
      status: "active",
      features: ["User roles", "Account management", "Authentication", "Bulk operations"]
    },
    {
      icon: Activity,
      title: "System Monitoring",
      description: "Real-time monitoring of system performance and health metrics",
      stats: `${systemStats.systemUptime} uptime`,
      status: "excellent",
      features: ["Performance metrics", "Error tracking", "Resource usage", "Alerts"]
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Platform usage statistics, user behavior, and performance insights",
      stats: `${systemStats.activeUsers} active users`,
      status: "tracking",
      features: ["Usage analytics", "User insights", "Performance reports", "Custom metrics"]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'secure':
      case 'excellent':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'active':
      case 'tracking':
        return 'bg-blue-100 text-blue-800 border-blue-200';
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
            <h1 className="text-2xl font-bold text-gray-900">Admin Tools</h1>
            <p className="text-gray-600">System management and optimization tools</p>
          </div>
        </div>

        {/* System Overview */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">System Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{systemStats.totalUsers.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Total Users</div>
              </CardContent>
            </Card>
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{systemStats.activeUsers.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Active Users</div>
              </CardContent>
            </Card>
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{systemStats.systemUptime}</div>
                <div className="text-sm text-gray-600">Uptime</div>
              </CardContent>
            </Card>
            <Card className="bg-orange-50 border-orange-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">{systemStats.dataBackups}</div>
                <div className="text-sm text-gray-600">Backups</div>
              </CardContent>
            </Card>
            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600">{systemStats.securityScore}%</div>
                <div className="text-sm text-gray-600">Security</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-50 border-gray-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-gray-600">{systemStats.lastUpdate}</div>
                <div className="text-sm text-gray-600">Last Update</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Admin Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {adminSections.map((section, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <section.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{section.title}</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{section.description}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(section.status)}>
                    {section.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-700 mb-2">Current Status:</div>
                  <div className="text-lg font-semibold text-blue-600">{section.stats}</div>
                </div>
                
                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-700 mb-2">Features:</div>
                  <div className="flex flex-wrap gap-2">
                    {section.features.map((feature, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Link 
                  href={
                    section.title === "Storage Management" ? "/storage-management" :
                    section.title === "Security Center" ? "/security-center" :
                    section.title === "System Settings" ? "/system-settings" :
                    "#"
                  }
                  className="w-full"
                >
                  <Button className="w-full" variant="outline">
                    Access {section.title}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Server className="h-5 w-5" />
              <span className="text-sm">System Restart</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Database className="h-5 w-5" />
              <span className="text-sm">Database Backup</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Lock className="h-5 w-5" />
              <span className="text-sm">Security Scan</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Monitor className="h-5 w-5" />
              <span className="text-sm">System Health</span>
            </Button>
          </div>
        </div>

        {/* System Alerts */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">System Alerts</h2>
          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <div>
                  <div className="font-medium text-yellow-800">Scheduled Maintenance</div>
                  <div className="text-sm text-yellow-700">System maintenance scheduled for Sunday 2:00 AM - 4:00 AM GMT</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
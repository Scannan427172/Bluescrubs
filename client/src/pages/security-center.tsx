import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronLeft,
  Shield,
  Lock,
  Eye,
  AlertTriangle,
  CheckCircle,
  Users,
  Key,
  Wifi,
  FileCheck,
  Activity,
  Bell
} from "lucide-react";
import { Link } from "wouter";

export default function SecurityCenter() {
  const securityStats = {
    overallScore: 95,
    activeThreats: 0,
    blockedAttempts: 247,
    lastScan: "15 minutes ago",
    vulnerabilities: 2,
    patchesApplied: 18
  };

  const securityModules = [
    {
      icon: Users,
      title: "User Access Control",
      description: "Manage user permissions and authentication",
      status: "secure",
      lastUpdate: "2 hours ago",
      metrics: { users: 12847, admins: 8, roles: 15 }
    },
    {
      icon: Eye,
      title: "Security Monitoring",
      description: "Real-time threat detection and monitoring",
      status: "active",
      lastUpdate: "Live",
      metrics: { alerts: 3, blocked: 247, scanned: 15893 }
    },
    {
      icon: Lock,
      title: "Data Encryption",
      description: "End-to-end encryption for sensitive data",
      status: "protected",
      lastUpdate: "1 day ago",
      metrics: { encrypted: "100%", keys: 45, protocols: 3 }
    },
    {
      icon: Wifi,
      title: "Network Security",
      description: "Firewall and network intrusion prevention",
      status: "protected",
      lastUpdate: "30 minutes ago",
      metrics: { connections: 1247, blocked: 89, rules: 156 }
    }
  ];

  const recentAlerts = [
    {
      type: "warning",
      title: "Unusual Login Pattern",
      description: "Multiple failed login attempts from IP 192.168.1.45",
      time: "5 minutes ago",
      action: "IP temporarily blocked"
    },
    {
      type: "info",
      title: "Security Patch Applied",
      description: "Updated authentication system to version 2.1.4",
      time: "2 hours ago",
      action: "System restarted"
    },
    {
      type: "success",
      title: "Vulnerability Scan Complete",
      description: "Weekly security scan completed - no critical issues found",
      time: "1 day ago",
      action: "Report generated"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'secure':
      case 'protected':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'active':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      default:
        return <Bell className="h-5 w-5 text-blue-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/admin-tools" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Security Center</h1>
            <p className="text-gray-600">Monitor security threats, user access, and system vulnerabilities</p>
          </div>
        </div>

        {/* Security Overview */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{securityStats.overallScore}%</div>
              <div className="text-sm text-gray-600">Security Score</div>
            </CardContent>
          </Card>
          
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{securityStats.activeThreats}</div>
              <div className="text-sm text-gray-600">Active Threats</div>
            </CardContent>
          </Card>

          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{securityStats.blockedAttempts}</div>
              <div className="text-sm text-gray-600">Blocked Today</div>
            </CardContent>
          </Card>

          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{securityStats.vulnerabilities}</div>
              <div className="text-sm text-gray-600">Vulnerabilities</div>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{securityStats.patchesApplied}</div>
              <div className="text-sm text-gray-600">Patches Applied</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-50 border-gray-200">
            <CardContent className="p-4 text-center">
              <div className="text-xs font-bold text-gray-600">{securityStats.lastScan}</div>
              <div className="text-sm text-gray-600">Last Scan</div>
            </CardContent>
          </Card>
        </div>

        {/* Security Modules */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Security Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {securityModules.map((module, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <module.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{module.title}</CardTitle>
                        <p className="text-sm text-gray-600">{module.description}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(module.status)}>
                      {module.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="text-sm text-gray-600">Last Update: {module.lastUpdate}</div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      {Object.entries(module.metrics).map(([key, value]) => (
                        <div key={key}>
                          <div className="font-semibold text-blue-600">{value}</div>
                          <div className="text-xs text-gray-500 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Configure {module.title}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Security Alerts */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Security Alerts</h2>
          <div className="space-y-4">
            {recentAlerts.map((alert, index) => (
              <Card key={index} className={`border-l-4 ${
                alert.type === 'warning' ? 'border-l-yellow-500 bg-yellow-50' :
                alert.type === 'success' ? 'border-l-green-500 bg-green-50' :
                'border-l-blue-500 bg-blue-50'
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900">{alert.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                          <p className="text-xs text-gray-500 mt-2">Action taken: {alert.action}</p>
                        </div>
                        <div className="text-xs text-gray-500">{alert.time}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Security Actions */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Security Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Shield className="h-5 w-5" />
              <span className="text-sm">Run Security Scan</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Key className="h-5 w-5" />
              <span className="text-sm">Rotate API Keys</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <FileCheck className="h-5 w-5" />
              <span className="text-sm">Generate Report</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Activity className="h-5 w-5" />
              <span className="text-sm">View Audit Log</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
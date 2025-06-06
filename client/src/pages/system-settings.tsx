import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { 
  ChevronLeft,
  Settings,
  Bell,
  Mail,
  Globe,
  Database,
  Zap,
  Shield,
  Clock,
  Palette,
  Server,
  Code
} from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

export default function SystemSettings() {
  const [settings, setSettings] = useState({
    maintenanceMode: false,
    debugMode: false,
    emailNotifications: true,
    backupSchedule: true,
    apiRateLimit: 1000,
    sessionTimeout: 30,
    maxFileSize: 100
  });

  const settingsCategories = [
    {
      icon: Server,
      title: "Platform Configuration",
      description: "Core platform settings and configurations",
      settings: [
        { 
          key: "maintenanceMode", 
          label: "Maintenance Mode", 
          description: "Enable maintenance mode for system updates",
          type: "toggle" 
        },
        { 
          key: "debugMode", 
          label: "Debug Mode", 
          description: "Enable debug logging for troubleshooting",
          type: "toggle" 
        }
      ]
    },
    {
      icon: Bell,
      title: "Notification Settings",
      description: "Configure system notifications and alerts",
      settings: [
        { 
          key: "emailNotifications", 
          label: "Email Notifications", 
          description: "Send email notifications for system events",
          type: "toggle" 
        },
        { 
          key: "alertThreshold", 
          label: "Alert Threshold", 
          description: "CPU usage threshold for alerts (%)",
          type: "input",
          value: "80"
        }
      ]
    },
    {
      icon: Database,
      title: "Data Management",
      description: "Database and backup configurations",
      settings: [
        { 
          key: "backupSchedule", 
          label: "Automatic Backups", 
          description: "Enable scheduled database backups",
          type: "toggle" 
        },
        { 
          key: "retentionPeriod", 
          label: "Data Retention (days)", 
          description: "How long to keep backup data",
          type: "input",
          value: "90"
        }
      ]
    },
    {
      icon: Zap,
      title: "Performance Settings",
      description: "System performance and optimization",
      settings: [
        { 
          key: "apiRateLimit", 
          label: "API Rate Limit", 
          description: "Requests per minute per user",
          type: "input",
          value: settings.apiRateLimit.toString()
        },
        { 
          key: "sessionTimeout", 
          label: "Session Timeout (minutes)", 
          description: "User session timeout duration",
          type: "input",
          value: settings.sessionTimeout.toString()
        }
      ]
    },
    {
      icon: Shield,
      title: "Security Settings",
      description: "Security policies and restrictions",
      settings: [
        { 
          key: "passwordPolicy", 
          label: "Strong Password Policy", 
          description: "Enforce strong password requirements",
          type: "toggle"
        },
        { 
          key: "twoFactorAuth", 
          label: "Two-Factor Authentication", 
          description: "Require 2FA for admin accounts",
          type: "toggle"
        }
      ]
    },
    {
      icon: Globe,
      title: "Integration Settings",
      description: "Third-party integrations and API configurations",
      settings: [
        { 
          key: "apiEndpoint", 
          label: "External API Endpoint", 
          description: "URL for external service integration",
          type: "input",
          value: "https://api.example.com"
        },
        { 
          key: "webhookUrl", 
          label: "Webhook URL", 
          description: "URL for webhook notifications",
          type: "input",
          value: ""
        }
      ]
    }
  ];

  const systemInfo = {
    version: "2.1.4",
    uptime: "15 days, 4 hours",
    environment: "Production",
    nodeVersion: "18.17.0",
    lastRestart: "March 15, 2024",
    configVersion: "1.2.3"
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
            <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
            <p className="text-gray-600">Configure platform settings, integrations, and system preferences</p>
          </div>
        </div>

        {/* System Information */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">System Information</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4 text-center">
                <div className="text-lg font-bold text-blue-600">{systemInfo.version}</div>
                <div className="text-sm text-gray-600">Version</div>
              </CardContent>
            </Card>
            
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4 text-center">
                <div className="text-sm font-bold text-green-600">{systemInfo.uptime}</div>
                <div className="text-sm text-gray-600">Uptime</div>
              </CardContent>
            </Card>

            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-4 text-center">
                <div className="text-lg font-bold text-purple-600">{systemInfo.environment}</div>
                <div className="text-sm text-gray-600">Environment</div>
              </CardContent>
            </Card>

            <Card className="bg-orange-50 border-orange-200">
              <CardContent className="p-4 text-center">
                <div className="text-lg font-bold text-orange-600">{systemInfo.nodeVersion}</div>
                <div className="text-sm text-gray-600">Node.js</div>
              </CardContent>
            </Card>

            <Card className="bg-gray-50 border-gray-200">
              <CardContent className="p-4 text-center">
                <div className="text-xs font-bold text-gray-600">{systemInfo.lastRestart}</div>
                <div className="text-sm text-gray-600">Last Restart</div>
              </CardContent>
            </Card>

            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="p-4 text-center">
                <div className="text-lg font-bold text-yellow-600">{systemInfo.configVersion}</div>
                <div className="text-sm text-gray-600">Config</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Settings Categories */}
        <div className="space-y-8">
          {settingsCategories.map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <category.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                    <p className="text-sm text-gray-600">{category.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {category.settings.map((setting, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{setting.label}</div>
                        <div className="text-sm text-gray-600">{setting.description}</div>
                      </div>
                      <div className="ml-4">
                        {setting.type === 'toggle' ? (
                          <Switch 
                            checked={Boolean(settings[setting.key as keyof typeof settings])}
                            onCheckedChange={(checked) => 
                              setSettings({...settings, [setting.key]: checked})
                            }
                          />
                        ) : (
                          <Input 
                            className="w-32"
                            defaultValue={setting.value || ''}
                            placeholder={setting.label}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-between">
          <div className="space-x-4">
            <Button variant="outline">
              <Code className="h-4 w-4 mr-2" />
              Export Configuration
            </Button>
            <Button variant="outline">
              <Database className="h-4 w-4 mr-2" />
              Import Configuration
            </Button>
          </div>
          <div className="space-x-4">
            <Button variant="outline">
              Reset to Defaults
            </Button>
            <Button>
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
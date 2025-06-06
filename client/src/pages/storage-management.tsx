import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ChevronLeft,
  Database,
  HardDrive,
  Archive,
  Trash2,
  Download,
  Upload,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react";
import { Link } from "wouter";

export default function StorageManagement() {
  const storageStats = {
    totalCapacity: "5TB",
    usedSpace: "2.4TB",
    availableSpace: "2.6TB",
    usagePercentage: 48,
    databases: 12,
    files: 847293,
    lastBackup: "2 hours ago",
    backupSize: "1.8TB"
  };

  const databases = [
    { name: "user_data", size: "450GB", status: "healthy", lastBackup: "1 hour ago" },
    { name: "medical_content", size: "1.2TB", status: "healthy", lastBackup: "30 mins ago" },
    { name: "analytics", size: "280GB", status: "optimizing", lastBackup: "2 hours ago" },
    { name: "session_store", size: "15GB", status: "healthy", lastBackup: "45 mins ago" }
  ];

  const storageBreakdown = [
    { category: "Database Files", size: "1.8TB", percentage: 75, color: "bg-blue-500" },
    { category: "Media Files", size: "400GB", percentage: 17, color: "bg-green-500" },
    { category: "System Files", size: "150GB", percentage: 6, color: "bg-yellow-500" },
    { category: "Temp Files", size: "50GB", percentage: 2, color: "bg-red-500" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="container max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/admin-tools" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Storage Management</h1>
            <p className="text-gray-600">Database, file storage, and backup systems</p>
          </div>
        </div>

        {/* Storage Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <HardDrive className="h-8 w-8 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold text-blue-600">{storageStats.totalCapacity}</div>
                  <div className="text-sm text-gray-600">Total Capacity</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Database className="h-8 w-8 text-orange-600" />
                <div>
                  <div className="text-2xl font-bold text-orange-600">{storageStats.usedSpace}</div>
                  <div className="text-sm text-gray-600">Used Space</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div>
                  <div className="text-2xl font-bold text-green-600">{storageStats.availableSpace}</div>
                  <div className="text-sm text-gray-600">Available</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Archive className="h-8 w-8 text-purple-600" />
                <div>
                  <div className="text-2xl font-bold text-purple-600">{storageStats.databases}</div>
                  <div className="text-sm text-gray-600">Databases</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Storage Usage */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Storage Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Overall Usage</span>
                  <span>{storageStats.usagePercentage}%</span>
                </div>
                <Progress value={storageStats.usagePercentage} className="h-3" />
              </div>
              
              <div className="space-y-4">
                {storageBreakdown.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded ${item.color}`}></div>
                      <span className="font-medium">{item.category}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{item.size}</div>
                      <div className="text-sm text-gray-500">{item.percentage}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Database Management */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Database Management</h2>
            <Button>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Status
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {databases.map((db, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{db.name}</h3>
                      <p className="text-gray-600">Size: {db.size}</p>
                    </div>
                    <Badge 
                      variant={db.status === 'healthy' ? 'default' : 'secondary'}
                      className={db.status === 'healthy' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                    >
                      {db.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Last Backup:</span>
                      <span className="font-medium">{db.lastBackup}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="h-4 w-4 mr-1" />
                      Backup
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Optimize
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Backup Management */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Backup Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Archive className="h-5 w-5" />
                  Automatic Backups
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Frequency:</span>
                    <span className="font-medium">Every 6 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Backup:</span>
                    <span className="font-medium">{storageStats.lastBackup}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Backup Size:</span>
                    <span className="font-medium">{storageStats.backupSize}</span>
                  </div>
                  <Button className="w-full mt-4">
                    <Download className="h-4 w-4 mr-2" />
                    Create Manual Backup
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trash2 className="h-5 w-5" />
                  Storage Cleanup
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Temp Files:</span>
                    <span className="font-medium">50GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Log Files:</span>
                    <span className="font-medium">25GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cache Files:</span>
                    <span className="font-medium">15GB</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Total Recoverable:</span>
                    <span>90GB</span>
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clean Up Storage
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Upload className="h-5 w-5" />
              <span className="text-sm">Restore Backup</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Database className="h-5 w-5" />
              <span className="text-sm">Database Health Check</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <RefreshCw className="h-5 w-5" />
              <span className="text-sm">Optimize All</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <AlertCircle className="h-5 w-5" />
              <span className="text-sm">Storage Alerts</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
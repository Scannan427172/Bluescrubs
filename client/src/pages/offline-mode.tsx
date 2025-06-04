import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { 
  Wifi, WifiOff, Download, CheckCircle, Clock, 
  AlertCircle, Smartphone, Database, RefreshCw, Settings
} from "lucide-react";

export default function OfflineMode() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [autoSync, setAutoSync] = useState(true);
  const [liteMode, setLiteMode] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const offlineData = {
    downloadedContent: {
      questions: {
        total: 1247,
        downloaded: 890,
        size: "45.2 MB",
        lastSync: "2025-06-04 14:30"
      },
      videos: {
        total: 24,
        downloaded: 8,
        size: "2.1 GB",
        lastSync: "2025-06-03 09:15"
      },
      culturalModules: {
        total: 12,
        downloaded: 12,
        size: "125 MB",
        lastSync: "2025-06-04 10:20"
      },
      flashcards: {
        total: 450,
        downloaded: 450,
        size: "12.8 MB",
        lastSync: "2025-06-04 16:45"
      }
    },
    offlineCapabilities: [
      {
        feature: "MCQ Practice",
        available: true,
        description: "Full question bank with explanations",
        size: "45.2 MB"
      },
      {
        feature: "Cultural Training",
        available: true,
        description: "All UK cultural modules",
        size: "125 MB"
      },
      {
        feature: "Flashcards",
        available: true,
        description: "Interactive flashcard deck",
        size: "12.8 MB"
      },
      {
        feature: "Study Planner",
        available: true,
        description: "Offline planning and tracking",
        size: "2.1 MB"
      },
      {
        feature: "Video OSCE",
        available: false,
        description: "Limited offline videos available",
        size: "2.1 GB"
      },
      {
        feature: "Community",
        available: false,
        description: "Requires internet connection",
        size: "N/A"
      }
    ],
    syncStatus: {
      lastFullSync: "2025-06-04 16:45",
      pendingUploads: 5,
      pendingDownloads: 2,
      conflictsFound: 0,
      nextAutoSync: "2025-06-05 08:00"
    }
  };

  const downloadContent = (contentType: string) => {
    // Simulate download process
    console.log(`Starting download for ${contentType}`);
  };

  const syncNow = () => {
    // Simulate sync process
    console.log("Starting manual sync");
  };

  const clearOfflineData = () => {
    // Simulate clearing offline data
    if (confirm("Are you sure you want to clear all offline data? This will free up storage but you'll need to re-download content.")) {
      console.log("Clearing offline data");
    }
  };

  return (
    <div className="min-h-screen bg-light-bg pb-20 md:pb-0">
      {/* Header */}
      <div className="bg-white py-12 border-b" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              {isOnline ? (
                <Wifi className="w-8 h-8 mr-3 text-green-600" />
              ) : (
                <WifiOff className="w-8 h-8 mr-3 text-red-600" />
              )}
              <h1 className="text-4xl font-bold" style={{ color: '#000000' }}>Offline Mode</h1>
            </div>
            <p className="text-xl" style={{ color: '#666666' }}>Study anywhere, anytime - even without internet connection</p>
            <div className="mt-4">
              <Badge className={`${isOnline ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} text-sm`}>
                {isOnline ? 'Online' : 'Offline'} - {isOnline ? 'All features available' : 'Limited features available'}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isOnline && (
          <div className="mb-8">
            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <AlertCircle className="w-6 h-6 text-yellow-600" />
                  <div>
                    <h3 className="font-medium text-yellow-800">You're currently offline</h3>
                    <p className="text-yellow-700">Don't worry! You can still access downloaded content and continue studying.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Storage Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Database className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold mb-1" style={{ color: '#000000' }}>2.3 GB</div>
              <div className="text-sm" style={{ color: '#666666' }}>Downloaded</div>
            </CardContent>
          </Card>

          <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold mb-1" style={{ color: '#000000' }}>890</div>
              <div className="text-sm" style={{ color: '#666666' }}>Questions Ready</div>
            </CardContent>
          </Card>

          <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold mb-1" style={{ color: '#000000' }}>{offlineData.syncStatus.pendingUploads}</div>
              <div className="text-sm" style={{ color: '#666666' }}>Pending Sync</div>
            </CardContent>
          </Card>

          <Card className="bg-white border" style={{ backgroundColor: '#ffffff' }}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="text-2xl font-bold mb-1" style={{ color: '#000000' }}>1h ago</div>
              <div className="text-sm" style={{ color: '#666666' }}>Last Sync</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="content" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="content">Offline Content</TabsTrigger>
            <TabsTrigger value="download">Download Manager</TabsTrigger>
            <TabsTrigger value="sync">Sync Status</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-6">
            <div className="space-y-4">
              {offlineData.offlineCapabilities.map((capability, index) => (
                <Card key={index} className="bg-white border">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          capability.available ? 'bg-green-100' : 'bg-gray-100'
                        }`}>
                          {capability.available ? (
                            <CheckCircle className="w-6 h-6 text-green-600" />
                          ) : (
                            <AlertCircle className="w-6 h-6 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold" style={{ color: '#000000' }}>{capability.feature}</h3>
                          <p className="text-gray-600">{capability.description}</p>
                          <div className="text-sm text-gray-500 mt-1">Storage: {capability.size}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={`${
                          capability.available ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {capability.available ? 'Available' : 'Limited'}
                        </Badge>
                        {!capability.available && capability.feature === "Video OSCE" && (
                          <Button size="sm" variant="outline" onClick={() => downloadContent(capability.feature)}>
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="download" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(offlineData.downloadedContent).map(([key, content]) => (
                <Card key={key} className="bg-white border">
                  <CardHeader>
                    <CardTitle className="capitalize" style={{ color: '#000000' }}>{key.replace(/([A-Z])/g, ' $1')}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span style={{ color: '#000000' }}>Progress</span>
                      <span style={{ color: '#666666' }}>{content.downloaded}/{content.total}</span>
                    </div>
                    <Progress value={(content.downloaded / content.total) * 100} className="w-full" />
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Size:</span>
                        <div className="font-medium" style={{ color: '#000000' }}>{content.size}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Last Sync:</span>
                        <div className="font-medium" style={{ color: '#000000' }}>{content.lastSync}</div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => downloadContent(key)}
                        disabled={content.downloaded === content.total}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        {content.downloaded === content.total ? 'Complete' : 'Download More'}
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => syncNow()}>
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sync" className="space-y-6">
            <Card className="bg-white border">
              <CardHeader>
                <CardTitle style={{ color: '#000000' }}>Synchronization Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span style={{ color: '#000000' }}>Last Full Sync</span>
                        <span style={{ color: '#666666' }}>{offlineData.syncStatus.lastFullSync}</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span style={{ color: '#000000' }}>Pending Uploads</span>
                        <Badge className="bg-blue-100 text-blue-700">
                          {offlineData.syncStatus.pendingUploads} items
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span style={{ color: '#000000' }}>Pending Downloads</span>
                        <Badge className="bg-purple-100 text-purple-700">
                          {offlineData.syncStatus.pendingDownloads} items
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span style={{ color: '#000000' }}>Conflicts Found</span>
                        <Badge className={`${
                          offlineData.syncStatus.conflictsFound > 0 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                        }`}>
                          {offlineData.syncStatus.conflictsFound} conflicts
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center space-y-4">
                    <Button onClick={syncNow} className="bg-blue-600 hover:bg-blue-700 text-white" disabled={!isOnline}>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      {isOnline ? 'Sync Now' : 'Connect to Sync'}
                    </Button>
                    
                    {isOnline && (
                      <div className="text-center text-sm text-gray-600">
                        Next auto-sync: {offlineData.syncStatus.nextAutoSync}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-white border">
              <CardHeader>
                <CardTitle style={{ color: '#000000' }}>Offline Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium" style={{ color: '#000000' }}>Auto-Sync</div>
                      <div className="text-sm text-gray-600">Automatically sync when connected</div>
                    </div>
                    <Switch checked={autoSync} onCheckedChange={setAutoSync} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium" style={{ color: '#000000' }}>Lite Mode</div>
                      <div className="text-sm text-gray-600">Reduced data usage and storage</div>
                    </div>
                    <Switch checked={liteMode} onCheckedChange={setLiteMode} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium" style={{ color: '#000000' }}>WiFi Only Downloads</div>
                      <div className="text-sm text-gray-600">Only download content on WiFi</div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium" style={{ color: '#000000' }}>Background Sync</div>
                      <div className="text-sm text-gray-600">Sync in the background when app is closed</div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium" style={{ color: '#000000' }}>Storage Used</div>
                        <div className="text-sm text-gray-600">2.3 GB of device storage</div>
                      </div>
                    </div>

                    <Button variant="outline" onClick={clearOfflineData} className="w-full">
                      <Database className="w-4 h-4 mr-2" />
                      Clear Offline Data
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
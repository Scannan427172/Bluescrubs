import { useRef, useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function VideoTest() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoStatus, setVideoStatus] = useState('Loading...');
  const [canPlay, setCanPlay] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadStart = () => {
      console.log('Video load started');
      setVideoStatus('Load started');
    };

    const handleLoadedMetadata = () => {
      console.log('Video metadata loaded');
      setVideoStatus('Metadata loaded');
    };

    const handleCanPlay = () => {
      console.log('Video can play');
      setVideoStatus('Can play - Duration: ' + video.duration + 's');
      setCanPlay(true);
    };

    const handleError = (e: any) => {
      console.error('Video error:', e);
      console.error('Video error code:', video.error?.code);
      setVideoStatus('Error: ' + (video.error?.message || 'Unknown error'));
    };

    const handleLoadedData = () => {
      console.log('Video data loaded');
      setVideoStatus('Data loaded');
    };

    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
    };
  }, []);

  const playVideo = () => {
    const video = videoRef.current;
    if (video) {
      video.play().then(() => {
        setVideoStatus('Playing');
      }).catch((error) => {
        setVideoStatus('Play failed: ' + error.message);
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Video Test Page</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p><strong>Status:</strong> {videoStatus}</p>
              <p><strong>User Agent:</strong> {navigator.userAgent}</p>
              
              <div className="relative w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  muted
                  playsInline
                  preload="metadata"
                  controls
                >
                  <source src="/demo-video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              
              <div className="flex gap-2">
                <Button onClick={playVideo} disabled={!canPlay}>
                  Play Video
                </Button>
                <Button onClick={() => window.open('/demo-video.mp4', '_blank')}>
                  Open Video Direct
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
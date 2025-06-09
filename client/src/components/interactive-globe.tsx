import { useRef, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

interface UserLocation {
  id: number;
  username: string;
  country: string;
  city: string;
  flagEmoji: string;
  latitude: number;
  longitude: number;
  totalScore: number;
  accuracyRate: number;
}

// Major city coordinates for user locations
const CITY_COORDINATES: Record<string, { lat: number; lng: number }> = {
  "London": { lat: 51.5074, lng: -0.1278 },
  "Manchester": { lat: 53.4808, lng: -2.2426 },
  "Edinburgh": { lat: 55.9533, lng: -3.1883 },
  "Mumbai": { lat: 19.0760, lng: 72.8777 },
  "New Delhi": { lat: 28.6139, lng: 77.2090 },
  "Bangalore": { lat: 12.9716, lng: 77.5946 },
  "Chennai": { lat: 13.0827, lng: 80.2707 },
  "Karachi": { lat: 24.8607, lng: 67.0011 },
  "Lahore": { lat: 31.5804, lng: 74.3587 },
  "Islamabad": { lat: 33.7294, lng: 73.0931 },
  "Dhaka": { lat: 23.8103, lng: 90.4125 },
  "Chittagong": { lat: 22.3569, lng: 91.7832 },
  "Lagos": { lat: 6.5244, lng: 3.3792 },
  "Abuja": { lat: 9.0765, lng: 7.3986 },
  "Ibadan": { lat: 7.3775, lng: 3.9470 },
  "Cairo": { lat: 30.0444, lng: 31.2357 },
  "Alexandria": { lat: 31.2001, lng: 29.9187 },
  "Cape Town": { lat: -33.9249, lng: 18.4241 },
  "Johannesburg": { lat: -26.2041, lng: 28.0473 },
  "Nairobi": { lat: -1.2921, lng: 36.8219 },
  "Mombasa": { lat: -4.0435, lng: 39.6682 },
  "Manila": { lat: 14.5995, lng: 120.9842 },
  "Cebu": { lat: 10.3157, lng: 123.8854 },
  "Kuala Lumpur": { lat: 3.1390, lng: 101.6869 },
  "Johor Bahru": { lat: 1.4927, lng: 103.7414 },
  "Singapore": { lat: 1.3521, lng: 103.8198 },
  "Sydney": { lat: -33.8688, lng: 151.2093 },
  "Melbourne": { lat: -37.8136, lng: 144.9631 },
  "Toronto": { lat: 43.6532, lng: -79.3832 },
  "Vancouver": { lat: 49.2827, lng: -123.1207 },
  "New York": { lat: 40.7128, lng: -74.0060 },
  "Los Angeles": { lat: 34.0522, lng: -118.2437 },
  "Berlin": { lat: 52.5200, lng: 13.4050 },
  "Munich": { lat: 48.1351, lng: 11.5820 },
  "Paris": { lat: 48.8566, lng: 2.3522 },
  "Lyon": { lat: 45.7640, lng: 4.8357 },
  "São Paulo": { lat: -23.5505, lng: -46.6333 },
  "Rio de Janeiro": { lat: -22.9068, lng: -43.1729 },
  "Riyadh": { lat: 24.7136, lng: 46.6753 },
  "Jeddah": { lat: 21.4858, lng: 39.1925 },
  "Dubai": { lat: 25.2048, lng: 55.2708 },
  "Abu Dhabi": { lat: 24.4539, lng: 54.3773 }
};

export function InteractiveGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 });
  const [selectedUser, setSelectedUser] = useState<UserLocation | null>(null);

  const { data: globalUsers } = useQuery({
    queryKey: ["/api/scoreboard/global"],
    queryFn: async () => {
      const response = await fetch("/api/scoreboard/global?limit=100");
      if (!response.ok) throw new Error("Failed to fetch users");
      const users = await response.json();
      
      // Add coordinates to users based on their city
      return users.map((user: any) => ({
        ...user,
        latitude: CITY_COORDINATES[user.city]?.lat || 0,
        longitude: CITY_COORDINATES[user.city]?.lng || 0
      })).filter((user: any) => user.latitude !== 0); // Only include users with valid coordinates
    }
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const radius = Math.min(width, height) / 2 - 20;
    const centerX = width / 2;
    const centerY = height / 2;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw Earth
    const gradient = ctx.createRadialGradient(centerX - radius/3, centerY - radius/3, 0, centerX, centerY, radius);
    gradient.addColorStop(0, "#4FC3F7");
    gradient.addColorStop(0.7, "#2196F3");
    gradient.addColorStop(1, "#1565C0");
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fill();

    // Draw continents (simplified shapes)
    ctx.fillStyle = "#4CAF50";
    drawContinents(ctx, centerX, centerY, radius, rotation);

    // Draw user locations
    if (globalUsers) {
      globalUsers.forEach((user: UserLocation) => {
        const point = project3DTo2D(user.latitude, user.longitude, rotation, centerX, centerY, radius);
        if (point.visible) {
          // User dot
          ctx.fillStyle = "#FF5722";
          ctx.beginPath();
          ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI);
          ctx.fill();
          
          // Pulse effect for top users
          if (user.totalScore > 2000) {
            ctx.strokeStyle = "#FF5722";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(point.x, point.y, 8, 0, 2 * Math.PI);
            ctx.stroke();
          }
        }
      });
    }

    // Draw grid lines
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    ctx.lineWidth = 1;
    drawGlobeGrid(ctx, centerX, centerY, radius, rotation);

  }, [rotation, globalUsers]);

  const project3DTo2D = (lat: number, lng: number, rot: {x: number, y: number}, centerX: number, centerY: number, radius: number) => {
    const latRad = (lat * Math.PI) / 180;
    const lngRad = ((lng + rot.y) * Math.PI) / 180;
    
    const x3d = Math.cos(latRad) * Math.cos(lngRad);
    const y3d = Math.cos(latRad) * Math.sin(lngRad);
    const z3d = Math.sin(latRad);
    
    // Simple rotation around X axis
    const rotXRad = (rot.x * Math.PI) / 180;
    const y3dRot = y3d * Math.cos(rotXRad) - z3d * Math.sin(rotXRad);
    const z3dRot = y3d * Math.sin(rotXRad) + z3d * Math.cos(rotXRad);
    
    const visible = x3d > 0; // Only show front hemisphere
    
    return {
      x: centerX + y3dRot * radius,
      y: centerY - z3dRot * radius,
      visible
    };
  };

  const drawContinents = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, radius: number, rot: {x: number, y: number}) => {
    // Simplified continent shapes
    const continents = [
      // Africa
      { lat: 0, lng: 20, size: 30 },
      // Europe
      { lat: 50, lng: 10, size: 20 },
      // Asia
      { lat: 30, lng: 100, size: 40 },
      // North America
      { lat: 45, lng: -100, size: 35 },
      // South America
      { lat: -15, lng: -60, size: 25 },
      // Australia
      { lat: -25, lng: 135, size: 15 }
    ];

    continents.forEach(continent => {
      const point = project3DTo2D(continent.lat, continent.lng, rot, centerX, centerY, radius);
      if (point.visible) {
        ctx.beginPath();
        ctx.arc(point.x, point.y, continent.size, 0, 2 * Math.PI);
        ctx.fill();
      }
    });
  };

  const drawGlobeGrid = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, radius: number, rot: {x: number, y: number}) => {
    // Latitude lines
    for (let lat = -60; lat <= 60; lat += 30) {
      ctx.beginPath();
      for (let lng = -180; lng <= 180; lng += 5) {
        const point = project3DTo2D(lat, lng, rot, centerX, centerY, radius);
        if (point.visible) {
          if (lng === -180) ctx.moveTo(point.x, point.y);
          else ctx.lineTo(point.x, point.y);
        }
      }
      ctx.stroke();
    }
    
    // Longitude lines
    for (let lng = -150; lng <= 150; lng += 30) {
      ctx.beginPath();
      for (let lat = -90; lat <= 90; lat += 5) {
        const point = project3DTo2D(lat, lng, rot, centerX, centerY, radius);
        if (point.visible) {
          if (lat === -90) ctx.moveTo(point.x, point.y);
          else ctx.lineTo(point.x, point.y);
        }
      }
      ctx.stroke();
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastMouse({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - lastMouse.x;
    const deltaY = e.clientY - lastMouse.y;
    
    setRotation(prev => ({
      x: prev.x + deltaY * 0.5,
      y: prev.y + deltaX * 0.5
    }));
    
    setLastMouse({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!globalUsers) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(canvas.width, canvas.height) / 2 - 20;
    
    // Find closest user to click
    let closestUser: UserLocation | null = null;
    let closestDistance = Infinity;
    
    globalUsers.forEach((user: UserLocation) => {
      const point = project3DTo2D(user.latitude, user.longitude, rotation, centerX, centerY, radius);
      if (point.visible) {
        const distance = Math.sqrt(Math.pow(clickX - point.x, 2) + Math.pow(clickY - point.y, 2));
        if (distance < 15 && distance < closestDistance) {
          closestDistance = distance;
          closestUser = user;
        }
      }
    });
    
    setSelectedUser(closestUser);
  };

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={600}
        height={600}
        className="border rounded-lg cursor-grab active:cursor-grabbing bg-gradient-to-br from-slate-900 to-blue-900"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={handleClick}
      />
      
      {selectedUser && (
        <div className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-lg max-w-xs">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{selectedUser.flagEmoji}</span>
            <div>
              <h3 className="font-bold text-gray-900">{selectedUser.username}</h3>
              <p className="text-sm text-gray-600">{selectedUser.city}, {selectedUser.country}</p>
            </div>
          </div>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Score:</span>
              <span className="font-medium text-blue-600">{selectedUser.totalScore.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Accuracy:</span>
              <span className="font-medium text-green-600">{selectedUser.accuracyRate}%</span>
            </div>
          </div>
          <button 
            onClick={() => setSelectedUser(null)}
            className="mt-2 text-xs text-gray-500 hover:text-gray-700"
          >
            Close
          </button>
        </div>
      )}
      
      <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white p-2 rounded">
        <p className="text-sm">🌍 Drag to rotate • Click users for details</p>
        <p className="text-xs text-gray-300">{globalUsers?.length || 0} users worldwide</p>
      </div>
    </div>
  );
}
import { useState, useEffect, ReactNode } from "react";
import { Badge } from "@/components/ui/badge";

interface HeroBannerProps {
  backgroundImage: string;
  title: string;
  subtitle: string;
  badge?: string;
  children?: ReactNode;
  className?: string;
}

export function HeroBanner({ 
  backgroundImage, 
  title, 
  subtitle, 
  badge, 
  children, 
  className = "" 
}: HeroBannerProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageLoaded(true); // Show placeholder if image fails
    img.src = backgroundImage;
  }, [backgroundImage]);

  return (
    <div className={`hero-banner relative h-80 mb-8 overflow-hidden ${className}`}>
      {/* Loading placeholder */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse">
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>
      )}
      
      {/* Background image */}
      <div 
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 
          className="text-5xl font-bold mb-4" 
          style={{ 
            color: 'white', 
            WebkitTextFillColor: 'white', 
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)' 
          }}
        >
          {title}
        </h1>
        <p 
          className="text-xl mb-2" 
          style={{ 
            color: 'white', 
            WebkitTextFillColor: 'white', 
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)' 
          }}
        >
          {subtitle}
        </p>
        {badge && (
          <Badge 
            variant="outline" 
            className="bg-blue-600 text-white border-blue-400" 
            style={{ 
              color: 'white', 
              WebkitTextFillColor: 'white', 
              textShadow: 'none',
              backgroundColor: '#2563eb',
              borderColor: '#60a5fa'
            }}
          >
            {badge}
          </Badge>
        )}
        {children}
      </div>
    </div>
  );
}
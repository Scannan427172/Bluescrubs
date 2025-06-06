import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Logo({ className = '', size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-5xl lg:text-7xl'
  };

  const plusSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-3xl lg:text-5xl'
  };

  return (
    <div className={`flex items-center ${className}`}>
      <span className={`font-bold ${size === 'xl' ? 'bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse' : 'text-blue-600'} ${sizeClasses[size]}`}>
        NHSprep
      </span>
    </div>
  );
}

export default Logo;
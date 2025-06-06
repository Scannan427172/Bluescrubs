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
    xl: 'text-3xl'
  };

  const plusSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  return (
    <div className={`flex items-center ${className}`}>
      <span className={`font-bold text-blue-600 ${sizeClasses[size]}`}>
        NHS
        <span className="relative">
          prep
          <span 
            className={`absolute text-red-500 font-bold ${plusSizes[size]}`}
            style={{ 
              top: '-0.2em', 
              right: '-0.8em',
              lineHeight: '1'
            }}
          >
            +
          </span>
        </span>
      </span>
    </div>
  );
}

export default Logo;
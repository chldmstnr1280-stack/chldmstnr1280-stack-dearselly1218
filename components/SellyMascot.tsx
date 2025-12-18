import React from 'react';

interface SellyMascotProps {
  emotion?: 'happy' | 'sad' | 'angry' | 'calm' | 'excited';
  size?: number;
  className?: string;
}

export const SellyMascot: React.FC<SellyMascotProps> = ({ emotion = 'happy', size = 150, className = '' }) => {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full animate-float"
        style={{ filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.1))' }}
      >
        {/* Body Shadow */}
        <ellipse cx="100" cy="170" rx="50" ry="10" fill="#000" fillOpacity="0.1" />

        {/* Main Body - Light Green Bean Shape */}
        <path
          d="M100 160C135 160 160 135 160 100C160 65 135 45 100 45C65 45 40 65 40 100C40 135 65 160 100 160Z"
          fill="#bef264" // Lime-300
          stroke="#65a30d" // Lime-600
          strokeWidth="3"
        />

        {/* Cheeks */}
        <circle cx="65" cy="105" r="8" fill="#fca5a5" fillOpacity="0.6" />
        <circle cx="135" cy="105" r="8" fill="#fca5a5" fillOpacity="0.6" />

        {/* Face Expressions */}
        {emotion === 'happy' && (
          <g transform="translate(0, 5)">
            {/* Happy Eyes */}
            <path d="M60 90 Q70 80 80 90" stroke="#3f6212" strokeWidth="4" strokeLinecap="round" />
            <path d="M120 90 Q130 80 140 90" stroke="#3f6212" strokeWidth="4" strokeLinecap="round" />
            {/* Happy Mouth */}
            <path d="M90 105 Q100 115 110 105" stroke="#3f6212" strokeWidth="3" strokeLinecap="round" fill="none" />
          </g>
        )}

        {emotion === 'excited' && (
          <g transform="translate(0, 5)">
             {/* Excited Eyes (> <) */}
             <path d="M60 85 L70 90 L60 95" stroke="#3f6212" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
             <path d="M140 85 L130 90 L140 95" stroke="#3f6212" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
             {/* Open Mouth */}
             <path d="M90 105 Q100 118 110 105 Z" fill="#ec4899" stroke="#3f6212" strokeWidth="2" />
          </g>
        )}

        {emotion === 'sad' && (
          <g>
            {/* Sad Eyes (Tears optionally) */}
            <circle cx="70" cy="95" r="4" fill="#3f6212" />
            <circle cx="130" cy="95" r="4" fill="#3f6212" />
             {/* Sad Mouth */}
            <path d="M90 115 Q100 105 110 115" stroke="#3f6212" strokeWidth="3" strokeLinecap="round" fill="none" />
          </g>
        )}

        {emotion === 'calm' && (
          <g>
            {/* Closed Eyes */}
            <path d="M60 95 Q70 95 80 95" stroke="#3f6212" strokeWidth="4" strokeLinecap="round" />
            <path d="M120 95 Q130 95 140 95" stroke="#3f6212" strokeWidth="4" strokeLinecap="round" />
            {/* Calm Mouth */}
            <path d="M95 110 Q100 110 105 110" stroke="#3f6212" strokeWidth="3" strokeLinecap="round" fill="none" />
          </g>
        )}

        {/* Arms */}
        <path d="M42 110 Q30 120 45 130" stroke="#65a30d" strokeWidth="3" fill="#bef264" />
        <path d="M158 110 Q170 120 155 130" stroke="#65a30d" strokeWidth="3" fill="#bef264" />

        {/* Head Sprout */}
        <g transform="translate(100, 45)">
           {/* Stem */}
           <path d="M0 0 Q-2 -10 0 -15" stroke="#65a30d" strokeWidth="3" />
           {/* Left Leaf */}
           <path d="M0 -15 Q-15 -25 -20 -10 Q-10 0 0 -10" fill="#84cc16" stroke="#4d7c0f" strokeWidth="2" />
           {/* Right Leaf */}
           <path d="M0 -15 Q15 -25 20 -10 Q10 0 0 -10" fill="#84cc16" stroke="#4d7c0f" strokeWidth="2" />
        </g>
        
        {/* Shine effect */}
        <ellipse cx="70" cy="70" rx="10" ry="5" fill="#fff" fillOpacity="0.4" transform="rotate(-45 70 70)" />

      </svg>
    </div>
  );
};
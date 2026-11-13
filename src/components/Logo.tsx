import React from 'react';

export const Logo: React.FC<{ className?: string; size?: 'sm' | 'md' | 'lg' }> = ({ className = '', size = 'md' }) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Red & Green Cross Emblem */}
      <div className={`${iconSizes[size]} flex-shrink-0 flex items-center justify-center`}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xs">
          <defs>
            <linearGradient id="vbRed" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#DC2626" />
              <stop offset="100%" stopColor="#B91C1C" />
            </linearGradient>
            <linearGradient id="vbGreen" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#15803D" />
              <stop offset="100%" stopColor="#166534" />
            </linearGradient>
          </defs>
          {/* Base rounded container */}
          <rect width="100" height="100" rx="22" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="4" />
          
          {/* Red Pharmacy Cross */}
          <rect x="41" y="16" width="18" height="68" rx="6" fill="url(#vbRed)" />
          <rect x="16" y="41" width="68" height="18" rx="6" fill="url(#vbRed)" />
          
          {/* Green Health Leaf */}
          <path d="M50 32 C66 32 78 44 78 60 C78 72 68 80 54 80 C46 80 42 74 42 66 C42 52 48 40 50 32 Z" fill="url(#vbGreen)" opacity="0.95" />
          <path d="M50 44 Q 66 54 60 70" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.85" />
          
          {/* Central Heart Dot */}
          <circle cx="50" cy="50" r="5" fill="#FFFFFF" />
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col leading-none">
        <div className="flex items-center font-black tracking-tight">
          <span className={`text-red-600 ${textSizes[size]}`}>Viva</span>
          <span className={`text-emerald-700 ${textSizes[size]}`}>Bem</span>
        </div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-[9px] tracking-wider uppercase font-extrabold text-slate-500">Farmácia</span>
          <span className="w-1 h-1 rounded-full bg-slate-300"></span>
          <span className="text-[9px] font-bold text-emerald-700 uppercase tracking-wider">
            Espírito Santo
          </span>
        </div>
      </div>
    </div>
  );
};

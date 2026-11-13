import React from 'react';

export const Logo: React.FC<{ className?: string; size?: 'sm' | 'md' | 'lg' }> = ({ className = '', size = 'md' }) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-14 h-14'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Red & Green Emblem */}
      <div className={`relative ${iconSizes[size]} flex-shrink-0 flex items-center justify-center`}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
          <defs>
            <linearGradient id="logoRed" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="100%" stopColor="#DC2626" />
            </linearGradient>
            <linearGradient id="logoGreen" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
          {/* Base Shield */}
          <rect width="100" height="100" rx="26" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="3" />
          
          {/* Pharmacy Cross - Red */}
          <rect x="42" y="18" width="16" height="64" rx="8" fill="url(#logoRed)" />
          <rect x="18" y="42" width="64" height="16" rx="8" fill="url(#logoRed)" />
          
          {/* Overlapping Health Leaf - Green */}
          <path d="M50 34 C66 34 78 46 78 62 C78 72 68 80 56 80 C48 80 44 74 44 68 C44 54 48 42 50 34 Z" fill="url(#logoGreen)" opacity="0.95" />
          <path d="M52 46 Q 66 56 62 70" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.85" />
          
          {/* Heart Core */}
          <circle cx="50" cy="50" r="5" fill="#FFFFFF" />
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col leading-none">
        <div className="flex items-center font-extrabold tracking-tight">
          <span className={`text-red-600 ${textSizes[size]}`}>Viva</span>
          <span className={`text-emerald-700 ${textSizes[size]}`}>Bem</span>
        </div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-[10px] tracking-widest uppercase font-bold text-slate-500">Farmácia</span>
          <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
          <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
            Espírito Santo
          </span>
        </div>
      </div>
    </div>
  );
};


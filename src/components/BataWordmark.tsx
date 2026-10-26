import React from 'react';

interface BataWordmarkProps {
  variant?: 'light' | 'dark'; // 'light' is for light backgrounds (mahogany text), 'dark' is for dark backgrounds (parchment text)
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showSubtitle?: boolean;
}

export const BataWordmark: React.FC<BataWordmarkProps> = ({
  variant = 'light',
  size = 'md',
  className = '',
  showSubtitle = true,
}) => {
  const isDark = variant === 'dark';
  const textColor = isDark ? '#E8DCC8' : '#2B1518';
  const goldColor = '#B08D57';

  // Sizing definitions
  const heights = {
    sm: 30,
    md: 38,
    lg: 48,
  };

  const emblemSizes = {
    sm: 26,
    md: 32,
    lg: 40,
  };

  const currentHeight = heights[size];
  const emblemSize = emblemSizes[size];

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Bespoke Shoemaker Hallmark / Crest Emblem */}
      <svg
        width={emblemSize}
        height={emblemSize}
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-xs"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="emblemGold" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
            <stop stopColor="#D4BC90" />
            <stop offset="0.5" stopColor="#B08D57" />
            <stop offset="1" stopColor="#8A6732" />
          </linearGradient>
          <linearGradient id="emblemBase" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
            <stop stopColor={isDark ? '#3D2024' : '#2B1518'} />
            <stop offset="1" stopColor={isDark ? '#231012' : '#170A0B'} />
          </linearGradient>
        </defs>

        {/* Outer Circular Seal with Double Rings */}
        <circle cx="22" cy="22" r="20" stroke="url(#emblemGold)" strokeWidth="1.2" />
        <circle cx="22" cy="22" r="18" stroke="url(#emblemGold)" strokeWidth="0.6" strokeDasharray="2 1.5" opacity="0.75" />
        
        {/* Background pill / inner disc */}
        <circle cx="22" cy="22" r="16.5" fill="url(#emblemBase)" />

        {/* Stylized Arching Shoemaker's Welt & Leather Curve Motif */}
        <path
          d="M13 25C13 19 17 15 22 15C27 15 31 19 31 25"
          stroke="url(#emblemGold)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Center Interlocking Cordwainer 'B' Insignia */}
        <path
          d="M19 17H23C24.5 17 25.5 17.8 25.5 19.2C25.5 20.3 24.8 21.1 23.8 21.4C25 21.7 26 22.7 26 24.1C26 25.8 24.5 26.8 22.7 26.8H19V17Z"
          fill="none"
          stroke="#E8DCC8"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line x1="19" y1="21.6" x2="23.5" y2="21.6" stroke="#E8DCC8" strokeWidth="1.2" />

        {/* Stitched Bottom Sole Arc */}
        <path
          d="M14 27.5C16.5 30 19 30.5 22 30.5C25 30.5 27.5 30 30 27.5"
          stroke="url(#emblemGold)"
          strokeWidth="1.2"
          strokeDasharray="2 1.5"
        />

        {/* Dual Accent Studs */}
        <circle cx="15" cy="22" r="1" fill="url(#emblemGold)" />
        <circle cx="29" cy="22" r="1" fill="url(#emblemGold)" />
      </svg>

      {/* Typography: Stately Classic Serif BÀTÀ + Refined LAGOS Subtitle */}
      <div className="flex flex-col justify-center leading-none">
        <div className="flex items-center">
          <span
            className="font-serif tracking-[0.16em] uppercase font-normal transition-colors"
            style={{
              color: textColor,
              fontSize: size === 'sm' ? '1.25rem' : size === 'lg' ? '1.85rem' : '1.5rem',
              letterSpacing: '0.18em',
              textShadow: isDark ? '0 1px 2px rgba(0,0,0,0.4)' : 'none',
            }}
          >
            BÀTÀ
          </span>
          <span
            className="w-1.5 h-1.5 rounded-full ml-1.5 mb-1 shrink-0"
            style={{ backgroundColor: goldColor }}
          />
        </div>

        {showSubtitle && (
          <div className="flex items-center gap-1.5 mt-0.5 opacity-90">
            <span
              className="h-[0.5px] w-3"
              style={{ backgroundColor: goldColor }}
            />
            <span
              className="text-[8px] sm:text-[9px] font-sans font-medium tracking-[0.32em] uppercase"
              style={{ color: goldColor }}
            >
              LAGOS
            </span>
            <span
              className="h-[0.5px] w-3"
              style={{ backgroundColor: goldColor }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

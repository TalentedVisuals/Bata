import React from 'react';

interface BataLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  inverted?: boolean;
}

/**
 * Classic and Premium Footwear Logo for Bàtà
 * Featuring a heritage shoemaker's seal:
 * - A classic Goodyear-welted Oxford shoe silhouette
 * - Crossed cobbler awl / craft needle
 * - Refined Prata serif typography with luxury tracking
 */
export const BataLogo: React.FC<BataLogoProps> = ({
  className = '',
  size = 'md',
  inverted = false,
}) => {
  const iconDimensions = {
    sm: { w: 32, h: 32 },
    md: { w: 40, h: 40 },
    lg: { w: 48, h: 48 },
  }[size];

  const brandTextSize = {
    sm: 'text-xl tracking-tight',
    md: 'text-2xl sm:text-[26px] tracking-tight',
    lg: 'text-3xl tracking-tight',
  }[size];

  const primaryColor = inverted ? '#E8DCC8' : '#2B1518';
  const accentColor = '#B08D57';
  const innerBg = inverted ? '#3E1F24' : '#F7F3EB';

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Heritage Shoemaker Crest / Seal */}
      <svg
        width={iconDimensions.w}
        height={iconDimensions.h}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-xs transition-transform duration-200 group-hover:scale-105"
      >
        <defs>
          <linearGradient id={`goldRing-${inverted}`} x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
            <stop stopColor="#D8C096" />
            <stop offset="0.5" stopColor="#B08D57" />
            <stop offset="1" stopColor="#7E6032" />
          </linearGradient>
          <linearGradient id={`sealBg-${inverted}`} x1="16" y1="14" x2="48" y2="50" gradientUnits="userSpaceOnUse">
            <stop stopColor={inverted ? "#3A1B1F" : "#FFFFFF"} />
            <stop offset="1" stopColor={inverted ? "#200D10" : "#F5EFE6"} />
          </linearGradient>
        </defs>

        {/* Outer Circular Medallion */}
        <circle
          cx="32"
          cy="32"
          r="30"
          fill={`url(#sealBg-${inverted})`}
          stroke={`url(#goldRing-${inverted})`}
          strokeWidth="2"
        />

        {/* Inner Welt Stitch Dotted Perimeter */}
        <circle
          cx="32"
          cy="32"
          r="26.5"
          stroke={accentColor}
          strokeWidth="1"
          strokeDasharray="2.5 2"
          opacity="0.8"
        />

        {/* Heraldic Crown / Arch Motif at Top */}
        <path
          d="M26 18C28 16.5 30 16 32 16C34 16 36 16.5 38 18"
          stroke={accentColor}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="32" cy="13.5" r="1.5" fill={accentColor} />

        {/* Classic Oxford Shoe Last Silhouette */}
        <path
          d="M17 38.5C18 36.5 21 34 25 33.5C29 33 33 35.5 38 35.5C43 35.5 46.5 34 49 37.5C49.5 38.2 49 39.5 48 39.5C41 39.5 24 39.5 17.5 39.5C16.8 39.5 16.5 39.2 17 38.5Z"
          fill={primaryColor}
        />
        
        {/* Layered Heel Block */}
        <path
          d="M18 39.5H24V43.5C24 44 23.5 44.5 23 44.5H18.5C17.7 44.5 17.5 44 17.5 43.5L18 39.5Z"
          fill={accentColor}
        />

        {/* Shoe Sole Welt Line in Gold Accent */}
        <path
          d="M17 40H49"
          stroke={accentColor}
          strokeWidth="1.2"
        />

        {/* Crossed Craftsman Cobbler Awl & Needle */}
        <line
          x1="22"
          y1="23"
          x2="42"
          y2="43"
          stroke={accentColor}
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.4"
        />
        <line
          x1="42"
          y1="23"
          x2="22"
          y2="43"
          stroke={accentColor}
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.4"
        />

        {/* Center Wingtip Brogue Stitch Detail */}
        <path
          d="M40 36C42 37 44 38 46 38.5"
          stroke={accentColor}
          strokeWidth="1"
          strokeLinecap="round"
        />

        {/* Artisan Leather Dot */}
        <circle cx="32" cy="48" r="1.5" fill={accentColor} />
      </svg>

      {/* Brand Wordmark & Tagline Lockup */}
      <div className="flex flex-col justify-center leading-none">
        <div className="flex items-baseline gap-1">
          <span
            className={`font-serif font-bold ${brandTextSize}`}
            style={{ color: primaryColor }}
          >
            Bàtà
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#B08D57] shrink-0 self-center mb-0.5" />
        </div>
        <span
          className="text-[9px] font-sans font-semibold tracking-[0.22em] uppercase mt-0.5"
          style={{ color: accentColor }}
        >
          Footwear Maker
        </span>
      </div>
    </div>
  );
};

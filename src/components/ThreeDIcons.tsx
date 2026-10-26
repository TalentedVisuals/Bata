import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

/**
 * 3D Isometric Leather Craftsman Icon
 * Represents handmade shoe craftsmanship in Nigeria with #2B1518, #B08D57, and #E8DCC8
 */
export const Icon3DLeatherCraft: React.FC<IconProps> = ({ className = '', size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`drop-shadow-md ${className}`}
  >
    <defs>
      <linearGradient id="leatherGrad" x1="12" y1="14" x2="52" y2="50" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4A2328" />
        <stop offset="0.5" stopColor="#2B1518" />
        <stop offset="1" stopColor="#1C0D0F" />
      </linearGradient>
      <linearGradient id="hammerHead" x1="24" y1="12" x2="48" y2="28" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F5EFE6" />
        <stop offset="0.5" stopColor="#D8C7AC" />
        <stop offset="1" stopColor="#8A6E3F" />
      </linearGradient>
      <linearGradient id="hammerWood" x1="32" y1="24" x2="48" y2="52" gradientUnits="userSpaceOnUse">
        <stop stopColor="#B08D57" />
        <stop offset="1" stopColor="#6C4D20" />
      </linearGradient>
      <filter id="shadow3d" x="0" y="4" width="64" height="60" filterUnits="userSpaceOnUse">
        <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#2B1518" floodOpacity="0.3" />
      </filter>
    </defs>

    {/* Leather Hide Base in 3D Isometric */}
    <path
      d="M16 20C16 16 22 14 32 14C42 14 48 16 48 20C52 24 54 34 50 42C46 50 40 52 32 52C24 52 18 50 14 42C10 34 12 24 16 20Z"
      fill="url(#leatherGrad)"
      filter="url(#shadow3d)"
    />
    {/* Stitched Edge Detail */}
    <path
      d="M19 22C19 19 24 17 32 17C40 17 45 19 45 22C48 26 50 34 47 40C44 46 39 48 32 48C25 48 20 46 17 40C14 34 16 26 19 22Z"
      stroke="#B08D57"
      strokeWidth="1.5"
      strokeDasharray="3 3"
    />
    
    {/* 3D Craftsman Hammer */}
    <path
      d="M34 26L46 46C47 47.5 49 47 50 45.5C51 44 50.5 42 49 40.5L37 22L34 26Z"
      fill="url(#hammerWood)"
    />
    {/* Hammer Metal Head */}
    <rect
      x="23"
      y="15"
      width="18"
      height="8"
      rx="2"
      transform="rotate(-30 23 15)"
      fill="url(#hammerHead)"
    />
    <rect
      x="22"
      y="14"
      width="4"
      height="10"
      rx="1"
      transform="rotate(-30 22 14)"
      fill="#E8DCC8"
    />
  </svg>
);

/**
 * 3D Isometric Fast Nationwide Delivery Box
 */
export const Icon3DBoxDelivery: React.FC<IconProps> = ({ className = '', size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`drop-shadow-md ${className}`}
  >
    <defs>
      <linearGradient id="boxTop" x1="16" y1="18" x2="48" y2="28" gradientUnits="userSpaceOnUse">
        <stop stopColor="#E8DCC8" />
        <stop offset="1" stopColor="#D4C0A2" />
      </linearGradient>
      <linearGradient id="boxLeft" x1="12" y1="28" x2="32" y2="52" gradientUnits="userSpaceOnUse">
        <stop stopColor="#B08D57" />
        <stop offset="1" stopColor="#8A6836" />
      </linearGradient>
      <linearGradient id="boxRight" x1="32" y1="28" x2="52" y2="52" gradientUnits="userSpaceOnUse">
        <stop stopColor="#C4A26E" />
        <stop offset="1" stopColor="#967440" />
      </linearGradient>
      <linearGradient id="tapeGrad" x1="28" y1="18" x2="36" y2="52" gradientUnits="userSpaceOnUse">
        <stop stopColor="#2B1518" />
        <stop offset="1" stopColor="#1C0D0F" />
      </linearGradient>
    </defs>

    {/* Drop Shadow */}
    <ellipse cx="32" cy="56" rx="22" ry="5" fill="#2B1518" fillOpacity="0.18" />

    {/* 3D Box Top Plane */}
    <path d="M32 14L52 24L32 34L12 24L32 14Z" fill="url(#boxTop)" />
    
    {/* 3D Box Left Plane */}
    <path d="M12 24L32 34V52L12 42V24Z" fill="url(#boxLeft)" />
    
    {/* 3D Box Right Plane */}
    <path d="M32 34L52 24V42L32 52V34Z" fill="url(#boxRight)" />

    {/* Sealing Tape (Top) in #2B1518 */}
    <path d="M28 16L36 20L36 32L28 28Z" fill="url(#tapeGrad)" opacity="0.9" />
    {/* Sealing Tape (Front) */}
    <path d="M30 33H34V46H30V33Z" fill="url(#tapeGrad)" opacity="0.9" />

    {/* Small Speed Trails */}
    <path d="M6 32H10" stroke="#B08D57" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M4 38H9" stroke="#B08D57" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

/**
 * 3D WhatsApp Glossy Chat Button Icon
 */
export const Icon3DWhatsApp: React.FC<IconProps> = ({ className = '', size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`drop-shadow-md ${className}`}
  >
    <defs>
      <linearGradient id="waGrad" x1="10" y1="10" x2="54" y2="54" gradientUnits="userSpaceOnUse">
        <stop stopColor="#25D366" />
        <stop offset="0.5" stopColor="#128C7E" />
        <stop offset="1" stopColor="#075E54" />
      </linearGradient>
    </defs>

    {/* Soft Shadow */}
    <ellipse cx="32" cy="56" rx="20" ry="4" fill="#2B1518" fillOpacity="0.2" />

    {/* 3D Glossy WhatsApp Bubble */}
    <path
      d="M32 10C19.85 10 10 19.85 10 32C10 36.3 11.23 40.32 13.37 43.74L11 52L19.58 49.77C22.84 51.78 26.68 52.95 30.8 52.95C42.95 52.95 52.8 43.1 52.8 30.95C52.8 19.85 43.5 10 32 10Z"
      fill="url(#waGrad)"
    />

    {/* Highlight Arch for 3D depth */}
    <path
      d="M18 18C22 14 28 12 34 12C41 12 46 15 48 19"
      stroke="#E8DCC8"
      strokeWidth="2.5"
      strokeLinecap="round"
      opacity="0.6"
    />

    {/* Inner Phone Handset */}
    <path
      d="M25 22C24.4 22 23.5 22.3 22.8 23.1C22 24 20 26 20 29.5C20 33 22.5 36.3 22.9 36.8C23.3 37.3 27.6 44.4 34.6 47.1C40.4 49.3 41.6 47.3 42.8 47.2C44 47.1 46.5 45.7 47 44.3C47.5 42.9 47.5 41.7 47.3 41.4C47.1 41.1 46.7 40.9 46.1 40.6C45.5 40.3 42.5 38.8 41.9 38.6C41.4 38.4 41 38.3 40.6 38.9C40.1 39.7 39.1 41 38.7 41.4C38.3 41.8 37.9 41.9 37.3 41.6C36.7 41.3 34.8 40.6 32.5 38.5C30.7 36.9 29.5 34.9 29.2 34.3C28.8 33.7 29.1 33.4 29.4 33.1C29.7 32.8 30.1 32.4 30.4 32C30.7 31.6 30.8 31.3 31.1 30.8C31.3 30.3 31.2 29.9 31 29.6C30.8 29.3 29.6 26.2 29 24.8C28.4 23.4 27.8 23.6 27.4 23.6C27 23.6 26.5 23.6 26 23.6L25 22Z"
      fill="#FFFFFF"
    />
  </svg>
);

/**
 * 3D Quality Shield Icon (100% Genuine Leather Guarantee) in #2B1518 base and #B08D57 accent
 */
export const Icon3DShield: React.FC<IconProps> = ({ className = '', size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`drop-shadow-md ${className}`}
  >
    <defs>
      <linearGradient id="shieldLeft" x1="14" y1="12" x2="32" y2="52" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3E1F24" />
        <stop offset="1" stopColor="#2B1518" />
      </linearGradient>
      <linearGradient id="shieldRight" x1="32" y1="12" x2="50" y2="52" gradientUnits="userSpaceOnUse">
        <stop stopColor="#2B1518" />
        <stop offset="1" stopColor="#1C0D0F" />
      </linearGradient>
      <linearGradient id="goldBorder" x1="16" y1="10" x2="48" y2="54" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F5EFE6" />
        <stop offset="0.4" stopColor="#B08D57" />
        <stop offset="1" stopColor="#82622F" />
      </linearGradient>
    </defs>

    {/* Shield Base Left */}
    <path
      d="M32 10L14 17V32C14 44 22 51 32 55V10Z"
      fill="url(#shieldLeft)"
    />
    {/* Shield Base Right */}
    <path
      d="M32 10L50 17V32C50 44 42 51 32 55V10Z"
      fill="url(#shieldRight)"
    />

    {/* Gold Embossed Rim */}
    <path
      d="M32 11L16 17.5V31.5C16 42.5 23 49 32 53C41 49 48 42.5 48 31.5V17.5L32 11Z"
      stroke="url(#goldBorder)"
      strokeWidth="2.5"
    />

    {/* 3D Checkmark */}
    <path
      d="M23 32L29 38L41 24"
      stroke="#E8DCC8"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * 3D Shoe Craft / Custom Made Icon
 */
export const Icon3DCustomShoe: React.FC<IconProps> = ({ className = '', size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`drop-shadow-md ${className}`}
  >
    <defs>
      <linearGradient id="sole3D" x1="10" y1="42" x2="54" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="#B08D57" />
        <stop offset="0.5" stopColor="#8A6732" />
        <stop offset="1" stopColor="#5E4319" />
      </linearGradient>
      <linearGradient id="upper3D" x1="18" y1="22" x2="52" y2="42" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4A2227" />
        <stop offset="0.7" stopColor="#2B1518" />
        <stop offset="1" stopColor="#1B0C0E" />
      </linearGradient>
    </defs>

    {/* Shadow */}
    <ellipse cx="32" cy="54" rx="22" ry="4" fill="#2B1518" fillOpacity="0.2" />

    {/* Shoe Upper Leather */}
    <path
      d="M14 42C14 38 18 34 22 30C26 26 34 24 40 25C46 26 49 31 52 38C53 40 52 42 50 42H14Z"
      fill="url(#upper3D)"
    />

    {/* Shoe Collar / Opening */}
    <ellipse cx="32" cy="27" rx="8" ry="4" fill="#E8DCC8" opacity="0.9" />

    {/* Stacked Leather Heel & Sole */}
    <path
      d="M12 42H52C54 42 55 44 54 46C52 49 48 50 42 50H16C13 50 11 48 11 46C11 44 11 42 12 42Z"
      fill="url(#sole3D)"
    />
    <path
      d="M12 44H52"
      stroke="#E8DCC8"
      strokeWidth="1"
      strokeDasharray="2 2"
    />

    {/* Tailor Needle / Craft Pin in #B08D57 */}
    <line x1="44" y1="14" x2="28" y2="34" stroke="#B08D57" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="45" cy="13" r="2.5" fill="#E8DCC8" />
  </svg>
);

/**
 * 3D Cash / Payment on Delivery Wallet
 */
export const Icon3DWallet: React.FC<IconProps> = ({ className = '', size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`drop-shadow-md ${className}`}
  >
    <defs>
      <linearGradient id="walletBack" x1="12" y1="20" x2="52" y2="50" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3E1F24" />
        <stop offset="1" stopColor="#2B1518" />
      </linearGradient>
      <linearGradient id="cashGrad" x1="20" y1="12" x2="44" y2="28" gradientUnits="userSpaceOnUse">
        <stop stopColor="#E8DCC8" />
        <stop offset="1" stopColor="#B08D57" />
      </linearGradient>
    </defs>

    {/* Cash poking out */}
    <rect x="20" y="14" width="24" height="18" rx="2" fill="url(#cashGrad)" />
    <circle cx="32" cy="22" r="3" fill="#2B1518" opacity="0.6" />

    {/* Wallet Body */}
    <rect x="12" y="24" width="40" height="26" rx="5" fill="url(#walletBack)" />
    
    {/* Clasp in #B08D57 */}
    <path d="M40 33H52V41H40C38 41 36 39 36 37C36 35 38 33 40 33Z" fill="#B08D57" />
    <circle cx="42" cy="37" r="2" fill="#E8DCC8" />
    
    {/* Stitches */}
    <rect x="14" y="26" width="36" height="22" rx="3" stroke="#B08D57" strokeWidth="1" strokeDasharray="3 2" />
  </svg>
);

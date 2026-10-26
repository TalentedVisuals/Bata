import React, { useState } from 'react';
import { Tote } from '@phosphor-icons/react';

interface ShoeArtworkProps {
  type?: string;
  imageUrl?: string;
  alt?: string;
  colorHex?: string;
  className?: string;
  hoverZoom?: boolean;
}

// Fallback mapping in case imageUrl is omitted
const TYPE_TO_IMAGE: Record<string, string> = {
  slides: '/shoes/slides_akobi.jpg',
  handmade_slides: '/shoes/slides_akobi.jpg',
  loafers: '/shoes/loafers_eko.jpg',
  handmade_loafers: '/shoes/loafers_eko.jpg',
  sandals: '/shoes/sandals_lekki.jpg',
  handmade_sandals: '/shoes/sandals_lekki.jpg',
  mules: '/shoes/mules_obalende.jpg',
  half_shoes: '/shoes/mules_obalende.jpg',
  sneakers: '/shoes/sneakers_milan.jpg',
  imported_sneakers: '/shoes/sneakers_milan.jpg',
  oxford: '/shoes/oxford_jagaban.jpg',
};

export const ShoeArtwork: React.FC<ShoeArtworkProps> = ({
  type = 'slides',
  imageUrl,
  alt = 'Bàtà Handcrafted Footwear',
  className = '',
  hoverZoom = true,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Resolved real image path
  const resolvedSrc = imageUrl || TYPE_TO_IMAGE[type] || '/shoes/slides_akobi.jpg';

  return (
    <div
      className={`relative w-full h-full overflow-hidden bg-[#FAF7F2] ${className}`}
    >
      {/* Background warm shimmer skeleton before load */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#E8DCC8]/30 via-[#E8DCC8]/60 to-[#E8DCC8]/30 animate-pulse" />
      )}

      {/* Real product photograph */}
      {!hasError ? (
        <img
          src={resolvedSrc}
          alt={alt}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover object-center transition-all duration-500 ${
            hoverZoom ? 'group-hover:scale-105' : ''
          } ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
      ) : (
        /* Graceful fallback if image fails to load */
        <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-[#E8DCC8]/30 text-[#2B1518]/70">
          <Tote size={32} weight="light" className="text-[#B08D57] mb-1.5" />
          <span className="text-xs font-semibold">{alt}</span>
        </div>
      )}

      {/* Subtle brand vignette at bottom for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none opacity-40 group-hover:opacity-20 transition-opacity" />
    </div>
  );
};

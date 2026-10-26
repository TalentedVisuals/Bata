import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Eye } from '@phosphor-icons/react';

export interface CarouselShoeItem {
  id: string;
  name: string;
  category: string;
  price: string;
  imageUrl: string;
}

export const CAROUSEL_SHOES: CarouselShoeItem[] = [
  {
    id: 'bata-jagaban-oxford',
    name: 'Jagaban Cap-Toe Oxford',
    category: 'Handmade by Bàtà',
    price: '₦42,000',
    imageUrl: '/shoes/oxford_jagaban.jpg',
  },
  {
    id: 'bata-eko-loafers',
    name: 'Eko Handcrafted Loafers',
    category: 'Handmade by Bàtà',
    price: '₦34,000',
    imageUrl: '/shoes/loafers_eko.jpg',
  },
  {
    id: 'bata-akobi-slides',
    name: 'Akobi Leather Slides',
    category: 'Handmade by Bàtà',
    price: '₦18,500',
    imageUrl: '/shoes/slides_akobi.jpg',
  },
  {
    id: 'bata-obalende-mules',
    name: 'Obalende Horsebit Mules',
    category: 'Handmade by Bàtà',
    price: '₦27,500',
    imageUrl: '/shoes/mules_obalende.jpg',
  },
  {
    id: 'artisan-abeokuta-woven',
    name: 'Abeokuta Woven Mule',
    category: 'Artisan Handmade',
    price: '₦19,500',
    imageUrl: '/shoes/woven_abeokuta.jpg',
  },
  {
    id: 'artisan-kaduna-tassel',
    name: 'Kaduna Tassel Loafers',
    category: 'Artisan Handmade',
    price: '₦32,000',
    imageUrl: '/shoes/loafers_kaduna.jpg',
  },
  {
    id: 'imported-venezia-suede',
    name: 'Venezia Suede Loafer',
    category: 'Quality Suede',
    price: '₦36,000',
    imageUrl: '/shoes/loafers_venezia.jpg',
  },
  {
    id: 'bata-lekki-sandals',
    name: 'Lekki Dual-Strap Sandals',
    category: 'Handmade by Bàtà',
    price: '₦22,000',
    imageUrl: '/shoes/sandals_lekki.jpg',
  },
  {
    id: 'imported-milan-sneakers',
    name: 'Milan Clean Sneaker',
    category: 'Nappa Leather',
    price: '₦28,000',
    imageUrl: '/shoes/sneakers_milan.jpg',
  },
  {
    id: 'imported-derby-executive',
    name: 'Executive Derby Shoes',
    category: 'Quality Imported',
    price: '₦38,000',
    imageUrl: '/shoes/derby_executive.jpg',
  },
];

interface CurvedVideoCarouselProps {
  onSelectProduct?: (productId: string) => void;
  className?: string;
  onMakeReel?: () => void;
}

interface CardGeometry {
  index: number;
  x: number;
  width: number;
  x_left: number;
  x_right: number;
  h_left: number;
  h_right: number;
  cardHeight: number;
  y_center: number;
  y_min: number;
  path: string;
  visible: boolean;
  shoe: CarouselShoeItem;
}

// Global constants from spec
const PITCH = 196;
const NUM_CARDS = 10;
const LOOP_WIDTH = NUM_CARDS * PITCH; // 1960u
const CENTER_X = 720;
const NORM_DIVISOR = 706;
const AUTO_SPEED = 50; // 50u per second right -> left
const CORNER_RADIUS = 15;
const Y_OFFSET = 470; // Centers cards cleanly in 410u height without empty void
const VIRTUAL_HEIGHT = 410;

// Helper to construct rounded quad path with corner radius r (15u corners)
function generateCardPath(w: number, y_TL: number, y_TR: number, y_BR: number, y_BL: number, r: number = CORNER_RADIUS): string {
  const dx_t = w;
  const dy_t = y_TR - y_TL;
  const len_t = Math.hypot(dx_t, dy_t) || 1;
  const ux_t = dx_t / len_t;
  const uy_t = dy_t / len_t;

  const dx_b = -w;
  const dy_b = y_BL - y_BR;
  const len_b = Math.hypot(dx_b, dy_b) || 1;
  const ux_b = dx_b / len_b;
  const uy_b = dy_b / len_b;

  const p1x = r * ux_t;
  const p1y = y_TL + r * uy_t;

  const p2x = w - r * ux_t;
  const p2y = y_TR - r * uy_t;

  const p3x = w;
  const p3y = y_TR + r;

  const p4x = w;
  const p4y = y_BR - r;

  const p5x = w + r * ux_b;
  const p5y = y_BR + r * uy_b;

  const p6x = -r * ux_b;
  const p6y = y_BL - r * uy_b;

  const p7x = 0;
  const p7y = y_BL - r;

  const p8x = 0;
  const p8y = y_TL + r;

  return `M ${p1x.toFixed(1)} ${p1y.toFixed(1)} ` +
         `L ${p2x.toFixed(1)} ${p2y.toFixed(1)} ` +
         `Q ${w.toFixed(1)} ${y_TR.toFixed(1)} ${p3x.toFixed(1)} ${p3y.toFixed(1)} ` +
         `L ${p4x.toFixed(1)} ${p4y.toFixed(1)} ` +
         `Q ${w.toFixed(1)} ${y_BR.toFixed(1)} ${p5x.toFixed(1)} ${p5y.toFixed(1)} ` +
         `L ${p6x.toFixed(1)} ${p6y.toFixed(1)} ` +
         `Q 0 ${y_BL.toFixed(1)} ${p7x.toFixed(1)} ${p7y.toFixed(1)} ` +
         `L ${p8x.toFixed(1)} ${p8y.toFixed(1)} ` +
         `Q 0 ${y_TL.toFixed(1)} ${p1x.toFixed(1)} ${p1y.toFixed(1)} Z`;
}

export const CurvedVideoCarousel: React.FC<CurvedVideoCarouselProps> = ({
  onSelectProduct,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [cards, setCards] = useState<CardGeometry[]>([]);
  const [hasEntered, setHasEntered] = useState(false);
  const [isGrabbed, setIsGrabbed] = useState(false);

  // Physics & Animation refs
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);
  const isDraggingRef = useRef(false);
  const hasMovedRef = useRef(false);
  const isHoveredRef = useRef(false);
  const lastTimeRef = useRef(performance.now());
  const dragPointerIdRef = useRef<number | null>(null);
  const lastPointerXRef = useRef(0);
  const pointerStartPosRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const pointerDownCardIdRef = useRef<string | null>(null);
  const velocityHistoryRef = useRef<{ x: number; time: number }[]>([]);

  // Check reduced motion preference
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  // Entrance animation trigger
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasEntered(true);
    }, 80);
    return () => clearTimeout(timer);
  }, []);

  // Responsive scale computation
  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const s = width < 640 ? Math.max(width / 1440, 0.45) : width / 1440;
      setScale(s);
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  // Compute card positions and geometry from offset
  const computeGeometry = useCallback((currentOffset: number): CardGeometry[] => {
    const result: CardGeometry[] = [];

    for (let i = 0; i < NUM_CARDS; i++) {
      // Cards sit on even 196u pitch
      const rawPos = ((currentOffset + i * PITCH) % LOOP_WIDTH + LOOP_WIDTH) % LOOP_WIDTH;
      let t = rawPos - CENTER_X;
      // Wrap t into [-LOOP_WIDTH/2, LOOP_WIDTH/2]
      if (t > LOOP_WIDTH / 2) t -= LOOP_WIDTH;
      if (t < -LOOP_WIDTH / 2) t += LOOP_WIDTH;

      // Spec curve formula:
      // x = 720 + t * (1 + 0.083 * (t / 706)^2)
      const tNorm = t / NORM_DIVISOR;
      const x = CENTER_X + t * (1 + 0.083 * tNorm * tNorm);

      // Normalised distance d = |x - 720| / 706
      const d = Math.abs(x - CENTER_X) / NORM_DIVISOR;
      // Width = (170 + 48 * d^2)u
      const width = 170 + 48 * d * d;

      const x_left = x - width / 2;
      const x_right = x + width / 2;

      // Edge normalized distances
      const q_left = Math.abs(x_left - CENTER_X) / NORM_DIVISOR;
      const q_right = Math.abs(x_right - CENTER_X) / NORM_DIVISOR;

      // Heights of vertical edges: (280 + 92 * q^2.6)u
      const h_left = 280 + 92 * Math.pow(q_left, 2.6);
      const h_right = 280 + 92 * Math.pow(q_right, 2.6);

      // Vertical centre sits at (687 - 12 * d^2)u
      const y_center = (687 - 12 * d * d) - Y_OFFSET;
      const cardHeight = Math.max(h_left, h_right);
      const y_min = y_center - cardHeight / 2;

      // Check visibility in frame
      const visible = x_right >= -80 && x_left <= 1520;

      // Local quad coordinates for rounded clip-path
      const y_TL = (y_center - h_left / 2) - y_min;
      const y_TR = (y_center - h_right / 2) - y_min;
      const y_BR = (y_center + h_right / 2) - y_min;
      const y_BL = (y_center + h_left / 2) - y_min;

      const path = generateCardPath(width, y_TL, y_TR, y_BR, y_BL);

      result.push({
        index: i,
        x,
        width,
        x_left,
        x_right,
        h_left,
        h_right,
        cardHeight,
        y_center,
        y_min,
        path,
        visible,
        shoe: CAROUSEL_SHOES[i % CAROUSEL_SHOES.length],
      });
    }

    return result;
  }, []);

  // Main animation / physics loop: 50u/s right -> left, momentum coasting, hover pause
  useEffect(() => {
    let animId: number;

    const tick = () => {
      const now = performance.now();
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = now;

      if (isDraggingRef.current) {
        // Dragging is driven directly by pointer events
      } else if (Math.abs(velocityRef.current) > 1.5) {
        // Coasting with momentum: velocity decays about 95% per second
        offsetRef.current += velocityRef.current * dt;
        velocityRef.current *= Math.pow(0.05, dt);
      } else {
        velocityRef.current = 0;
        // Continuous auto-scroll right -> left (about 50u per second)
        // Can be stopped on hover or reduced motion
        if (!isHoveredRef.current && !reducedMotion) {
          offsetRef.current -= AUTO_SPEED * dt;
        }
      }

      // Loop wrapping seamlessly
      offsetRef.current = ((offsetRef.current % LOOP_WIDTH) + LOOP_WIDTH) % LOOP_WIDTH;

      const updatedCards = computeGeometry(offsetRef.current);
      setCards(updatedCards);

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [computeGeometry, reducedMotion]);

  // Pointer drag event handlers with clean separation between drag and click
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragPointerIdRef.current = e.pointerId;
    pointerStartPosRef.current = { x: e.clientX, y: e.clientY, time: performance.now() };
    hasMovedRef.current = false;
    isDraggingRef.current = false;
    velocityRef.current = 0;
    lastPointerXRef.current = e.clientX;
    velocityHistoryRef.current = [{ x: e.clientX, time: performance.now() }];
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!pointerStartPosRef.current || dragPointerIdRef.current !== e.pointerId) return;

    const deltaX = e.clientX - pointerStartPosRef.current.x;
    const deltaY = e.clientY - pointerStartPosRef.current.y;
    const dist = Math.hypot(deltaX, deltaY);

    // Only engage drag if moved more than 6 pixels
    if (dist > 6) {
      if (!isDraggingRef.current) {
        isDraggingRef.current = true;
        hasMovedRef.current = true;
        setIsGrabbed(true);
        if (e.currentTarget) {
          try {
            e.currentTarget.setPointerCapture(e.pointerId);
          } catch {
            // Ignore if pointer capture unsupported
          }
        }
      }

      const stepDelta = e.clientX - lastPointerXRef.current;
      lastPointerXRef.current = e.clientX;

      // Scale delta into 1440 virtual space (1:1 with pointer)
      const effectiveScale = scale || 1;
      offsetRef.current += stepDelta / effectiveScale;

      // Record velocity history for release momentum
      const now = performance.now();
      velocityHistoryRef.current.push({ x: e.clientX, time: now });
      if (velocityHistoryRef.current.length > 8) {
        velocityHistoryRef.current.shift();
      }
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const wasDragging = isDraggingRef.current;
    const didMove = hasMovedRef.current;
    const clickedCardId = pointerDownCardIdRef.current;

    isDraggingRef.current = false;
    setIsGrabbed(false);

    if (dragPointerIdRef.current !== null && e.currentTarget) {
      try {
        if (e.currentTarget.hasPointerCapture(dragPointerIdRef.current)) {
          e.currentTarget.releasePointerCapture(dragPointerIdRef.current);
        }
      } catch {
        // Ignore
      }
    }
    dragPointerIdRef.current = null;

    if (wasDragging) {
      // Calculate release velocity in units/second
      const history = velocityHistoryRef.current;
      if (history.length >= 2) {
        const oldest = history[0];
        const newest = history[history.length - 1];
        const dt = (newest.time - oldest.time) / 1000;
        if (dt > 0.01) {
          const effectiveScale = scale || 1;
          const velocityU = (newest.x - oldest.x) / effectiveScale / dt;
          velocityRef.current = Math.max(-1200, Math.min(1200, velocityU));
        }
      }
    } else if (!didMove && clickedCardId && onSelectProduct) {
      // Clean tap or click without dragging — show product details!
      onSelectProduct(clickedCardId);
    }

    pointerDownCardIdRef.current = null;
    pointerStartPosRef.current = null;
    velocityHistoryRef.current = [];
  };

  const triggerSelect = (productId: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    if (!hasMovedRef.current && onSelectProduct) {
      onSelectProduct(productId);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-[1440px] mx-auto overflow-hidden select-none transition-opacity duration-700 ${
        hasEntered ? 'opacity-100' : 'opacity-0'
      } ${className}`}
      style={{ height: `${VIRTUAL_HEIGHT * scale}px` }}
      aria-label="Curved shoe image carousel"
    >
      {/* Dynamic SVG Clip-path defs for all 10 cards */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          {cards.map((card) => (
            <clipPath key={`clip-${card.index}`} id={`carousel-card-clip-${card.index}`}>
              <path d={card.path} />
            </clipPath>
          ))}
        </defs>
      </svg>

      {/* 1440x410 Virtual Viewport Container scaled to responsive width */}
      <div
        className="absolute left-1/2 -translate-x-1/2 origin-top overflow-hidden"
        style={{
          width: '1440px',
          height: `${VIRTUAL_HEIGHT}px`,
          transform: `scale(${scale})`,
          cursor: isGrabbed ? 'grabbing' : 'grab',
          touchAction: 'none',
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onMouseEnter={() => {
          isHoveredRef.current = true;
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false;
        }}
      >
        {/* Render the 10 cylindrical curved shoe cards */}
        {cards.map((card) => {
          if (!card.visible) return null;

          return (
            <div
              key={card.index}
              onPointerDown={() => {
                pointerDownCardIdRef.current = card.shoe.id;
              }}
              onClick={(e) => triggerSelect(card.shoe.id, e)}
              className="group absolute select-none pointer-events-auto cursor-pointer"
              style={{
                left: `${card.x_left}px`,
                top: `${card.y_min}px`,
                width: `${card.width}px`,
                height: `${card.cardHeight}px`,
                willChange: 'transform, left, top',
              }}
              title={`Click to view details for ${card.shoe.name}`}
            >
              {/* Clipped Card Body */}
              <div
                className="relative w-full h-full overflow-hidden bg-[#241719] shadow-md select-none border border-black/10 transition-transform duration-300 group-hover:-translate-y-1"
                style={{
                  clipPath: `url(#carousel-card-clip-${card.index})`,
                  WebkitClipPath: `url(#carousel-card-clip-${card.index})`,
                }}
              >
                {/* Real Shoe Image */}
                <img
                  src={card.shoe.imageUrl}
                  alt={card.shoe.name}
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-500 ease-out group-hover:scale-108"
                  style={{
                    objectPosition: 'center center',
                  }}
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes('oxford_1.jpg')) {
                      target.src = '/shoes/oxford_1.jpg';
                    }
                  }}
                />

                {/* Hover overlay hint: View Details pill */}
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E8DCC8] text-[#2B1518] text-[11px] font-sans font-semibold shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <Eye size={14} weight="regular" className="text-[#B08D57]" />
                    <span>View Details</span>
                  </span>
                </div>

                {/* Subtle Luxury Gradient Overlay at the Bottom of Card */}
                <div className="absolute inset-x-0 bottom-0 pt-10 pb-3 px-3 bg-gradient-to-t from-[#1A0E10]/95 via-[#1A0E10]/40 to-transparent pointer-events-none flex flex-col justify-end">
                  <span className="text-[10px] uppercase font-sans font-medium text-[#D4AF37] tracking-wider truncate">
                    {card.shoe.category}
                  </span>
                  <h3 className="text-xs sm:text-[13px] font-sans font-medium text-white tracking-tight truncate leading-tight mt-0.5">
                    {card.shoe.name}
                  </h3>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[11px] font-sans font-semibold text-[#E8DCC8]">
                      {card.shoe.price}
                    </span>
                    <span className="text-[9px] font-sans font-medium bg-white/15 text-white/90 px-1.5 py-0.5 rounded backdrop-blur-xs">
                      Details →
                    </span>
                  </div>
                </div>

                {/* Soft top-vignette for depth */}
                <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-black/25 to-transparent pointer-events-none" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

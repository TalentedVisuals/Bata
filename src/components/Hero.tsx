import React, { useState, useEffect } from 'react';
import { HERO_SLIDES, PRODUCTS } from '../data/products';
import { Product } from '../types/footwear';
import { ShoeArtwork } from './ShoeArtwork';
import { Icon3DLeatherCraft, Icon3DWhatsApp, Icon3DBoxDelivery, Icon3DShield, Icon3DCustomShoe } from './ThreeDIcons';
import { formatNaira, generateSingleProductWhatsAppUrl, BATA_WHATSAPP_NUMBER } from '../utils/whatsapp';
import { WhatsappLogo, CaretLeft, CaretRight, ArrowUpRight, Eye, Tote, Check, Ruler } from '@phosphor-icons/react';
import { CurvedVideoCarousel } from './CurvedVideoCarousel';

interface HeroProps {
  onSelectProduct: (product: Product) => void;
  onOpenQuickOrder: (product: Product) => void;
  onOpenCustomModal: () => void;
  onOpenSizeGuide: () => void;
  onFilterCategory: (category: string) => void;
  onAddToCart?: (product: Product, size: number, color: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onSelectProduct,
  onOpenQuickOrder,
  onOpenCustomModal,
  onOpenSizeGuide,
  onFilterCategory,
  onAddToCart,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchDeltaX, setTouchDeltaX] = useState(0);
  const [addedHeroProductId, setAddedHeroProductId] = useState<string | null>(null);

  const handleQuickAddHero = (product: Product) => {
    if (onAddToCart) {
      const defaultSize = product.sizes[0] || 42;
      const defaultColor = product.colors[0]?.name || 'Natural Solid Leather';
      onAddToCart(product, defaultSize, defaultColor);
    }
    setAddedHeroProductId(product.id);
    setTimeout(() => {
      setAddedHeroProductId((curr) => (curr === product.id ? null : curr));
    }, 1800);
  };

  const slideDuration = 6000; // 6 seconds per slide
  const [progress, setProgress] = useState(0);

  const currentSlide = HERO_SLIDES[currentSlideIndex];

  // Auto-advance timer
  useEffect(() => {
    if (isPaused) return;

    const interval = 50;
    const step = (interval / slideDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlideIndex((old) => (old + 1) % HERO_SLIDES.length);
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [currentSlideIndex, isPaused]);

  // Reset progress when user clicks or switches
  const handleSelectSlide = (index: number) => {
    setCurrentSlideIndex(index);
    setProgress(0);
  };

  const handleNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    setProgress(0);
  };

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
    setProgress(0);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const currentX = e.touches[0].clientX;
    setTouchDeltaX(currentX - touchStartX);
  };

  const handleTouchEnd = () => {
    if (touchStartX !== null) {
      if (touchDeltaX < -45) {
        handleNextSlide();
      } else if (touchDeltaX > 45) {
        handlePrevSlide();
      }
    }
    setTouchStartX(null);
    setTouchDeltaX(0);
    setIsPaused(false);
  };

  // Get active slide products for the showcase
  const showcaseProducts = currentSlide.cardProductIds
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is Product => p !== undefined);

  return (
    <section
      className="relative overflow-hidden pt-6 pb-16 md:pt-10 md:pb-24 bg-[#F7F3EB] border-b border-[#2B1518]/10"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background ambient decorative arch with #E8DCC8 warm tone */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[550px] bg-gradient-to-b from-[#E8DCC8]/50 via-[#E8DCC8]/20 to-transparent rounded-b-[400px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Swipeable Changing Headline Container */}
        <div
          className="text-center max-w-4xl mx-auto select-none cursor-pointer group px-2"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={handleNextSlide}
          title="Click or swipe to switch headline"
        >
          {/* Main Display Headline in Instrument Serif */}
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-[#2B1518] font-normal leading-[1.12] sm:leading-[1.08] tracking-tight transition-all duration-300 min-h-[64px] sm:min-h-[85px] md:min-h-[110px] flex items-center justify-center">
            {currentSlide.headline}
          </h1>

          {/* Subline in clean simple English */}
          <p className="mt-3 sm:mt-4 text-sm sm:text-lg md:text-xl text-[#2B1518]/75 max-w-2xl mx-auto font-sans font-normal leading-relaxed transition-opacity duration-300">
            {currentSlide.subline}
          </p>
        </div>

        {/* Dynamic Sliding Pill Indicator - Pure Floating Shapes with Animations */}
        <div 
          className="mt-5 sm:mt-7 flex items-center justify-center gap-2 sm:gap-2.5"
          role="tablist"
          aria-label="Slide indicators"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {HERO_SLIDES.map((slide, index) => {
            const isActive = index === currentSlideIndex;
            return (
              <button
                key={slide.id}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectSlide(index);
                }}
                role="tab"
                aria-selected={isActive}
                aria-label={`Slide ${index + 1}`}
                className={`relative overflow-hidden rounded-full transition-all duration-300 ease-out cursor-pointer ${
                  isActive
                    ? 'w-10 sm:w-14 h-2 sm:h-2.5 bg-[#2B1518] shadow-sm'
                    : 'w-2 h-2 sm:w-2.5 sm:h-2.5 bg-[#2B1518]/25 hover:bg-[#2B1518]/50 hover:scale-125'
                }`}
              >
                {isActive && (
                  <div
                    className="h-full bg-gradient-to-r from-[#B08D57] via-[#D4AF37] to-[#B08D57] rounded-full transition-all duration-75 ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Curved Shoe Carousel Row */}
        <div className="mt-5 sm:mt-7 w-full overflow-hidden">
          <CurvedVideoCarousel
            onSelectProduct={(productId) => {
              const matched =
                PRODUCTS.find((p) => p.id === productId) ||
                PRODUCTS.find((p) => productId.includes(p.style)) ||
                PRODUCTS[0];
              if (matched) {
                onSelectProduct(matched);
              }
            }}
          />
        </div>

        {/* Primary Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2.5 sm:gap-4 px-2">
          <a
            href={`https://wa.me/${BATA_WHATSAPP_NUMBER}?text=${encodeURIComponent(
              'Hello Bàtà! 👞 I am browsing your website and I want to order some quality shoes.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#25D366] text-white text-sm sm:text-base font-sans font-semibold hover:bg-[#20BA5A] border border-[#20BA5A] shadow-lg shadow-[#25D366]/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <WhatsappLogo size={20} weight="regular" className="text-white shrink-0" />
            <span>Order Straight on WhatsApp</span>
          </a>

          <button
            onClick={onOpenCustomModal}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#E8DCC8] text-[#2B1518] text-sm sm:text-base font-sans font-semibold border border-[#B08D57]/50 hover:bg-[#DACBB1] transition-all shadow-sm cursor-pointer"
          >
            <Icon3DCustomShoe size={22} className="inline shrink-0" />
            <span>Make A Style For Me</span>
          </button>

          <button
            onClick={onOpenSizeGuide}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-sans font-medium text-[#2B1518]/80 hover:text-[#B08D57] hover:bg-white/60 transition-colors cursor-pointer"
          >
            <Ruler size={16} weight="regular" className="text-[#B08D57] shrink-0" />
            <span>Shoe Size Guide</span>
            <ArrowUpRight size={14} weight="regular" className="text-[#B08D57] shrink-0" />
          </button>
        </div>

        {/* Featured Showcase Row of Shoes */}
        <div className="mt-12 sm:mt-16">
          <div className="flex items-center justify-between mb-4 px-1 sm:px-2">
            <div>
              <p className="text-[11px] sm:text-xs uppercase tracking-wider text-[#B08D57] font-sans font-medium flex items-center gap-1.5">
                <span>Featured From This Collection</span>
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#2B1518] font-normal mt-0.5">
                {currentSlide.tabLabel}
              </h2>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <button
                onClick={handlePrevSlide}
                className="p-2 rounded-lg bg-white border border-[#2B1518]/15 text-[#2B1518] hover:bg-[#E8DCC8]/50 transition-colors cursor-pointer"
                aria-label="Previous footwear"
              >
                <CaretLeft size={16} weight="regular" />
              </button>
              <button
                onClick={handleNextSlide}
                className="p-2 rounded-lg bg-white border border-[#2B1518]/15 text-[#2B1518] hover:bg-[#E8DCC8]/50 transition-colors cursor-pointer"
                aria-label="Next footwear"
              >
                <CaretRight size={16} weight="regular" />
              </button>
            </div>
          </div>

          {/* Cards Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
            {showcaseProducts.map((product) => (
              <div
                key={product.id}
                className="aura text-[#B08D57] bg-[#E8DCC8] group transition-all duration-300"
              >
                <div className="card lg:card-side bg-base-100 shadow-sm border border-[#2B1518]/10 overflow-hidden">
                  {/* Artwork Area in <figure> */}
                  <figure
                    onClick={() => onSelectProduct(product)}
                    className="cursor-pointer relative overflow-hidden bg-[#FAF7F2] aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:w-5/12 shrink-0 flex items-center justify-center p-2"
                  >
                    <ShoeArtwork
                      type={product.illustrationKey}
                      imageUrl={product.imageUrl}
                      alt={product.name}
                      colorHex={product.colors[0]?.hex}
                    />

                    {/* Clean unboxed category label */}
                    <div className="absolute top-3 left-3 bg-[#E8DCC8]/95 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-sans font-medium text-[#2B1518] border border-[#B08D57]/30">
                      {product.categoryLabel}
                    </div>

                    {product.originalPrice && (
                      <div className="absolute top-3 right-3 bg-[#2B1518] text-[#E8DCC8] border border-[#B08D57]/40 px-2 py-0.5 rounded text-[10px] font-sans font-medium tracking-wide">
                        Save {formatNaira(product.originalPrice - product.price)}
                      </div>
                    )}
                  </figure>

                  <div className="card-body p-4 sm:p-5 flex flex-col justify-between lg:w-7/12">
                    {/* Details */}
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h2
                          onClick={() => onSelectProduct(product)}
                          className="card-title font-sans font-medium text-base sm:text-lg text-[#2B1518] tracking-tight group-hover:text-[#B08D57] transition-colors cursor-pointer line-clamp-1"
                        >
                          {product.name}
                        </h2>
                      </div>

                      <p className="text-xs font-sans text-[#2B1518]/70 line-clamp-2 mt-1 mb-3 leading-relaxed">
                        {product.description}
                      </p>

                      <div className="flex items-baseline justify-between pt-2 border-t border-[#2B1518]/10">
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg sm:text-xl font-sans font-semibold text-[#2B1518] tracking-tight">
                            {formatNaira(product.price)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs font-sans text-[#2B1518]/40 line-through">
                              {formatNaira(product.originalPrice)}
                            </span>
                          )}
                        </div>

                        <span className="text-[11px] font-sans text-[#2B1518]/60 truncate">
                          Sizes {product.sizes[0]}–{product.sizes[product.sizes.length - 1]}
                        </span>
                      </div>
                    </div>

                    {/* Card Action Buttons inside card-actions */}
                    <div className="card-actions justify-end mt-4 grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onSelectProduct(product)}
                        className="px-2.5 sm:px-3 py-2 rounded-xl bg-[#F7F3EB] hover:bg-[#E8DCC8] text-xs font-sans font-semibold text-[#2B1518] border border-[#2B1518]/20 hover:border-[#B08D57] transition-all flex items-center justify-center gap-1.5 hover:scale-[1.02] active:scale-[0.98] cursor-pointer min-w-0"
                      >
                        <Eye size={15} weight="regular" className="text-[#B08D57] shrink-0" />
                        <span className="truncate">View Details</span>
                      </button>

                      <button
                        onClick={() => handleQuickAddHero(product)}
                        className={`px-2.5 sm:px-3 py-2 rounded-xl text-xs font-sans font-semibold border transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs min-w-0 ${
                          addedHeroProductId === product.id
                            ? 'bg-[#E8DCC8] text-[#2B1518] border-[#B08D57]'
                            : 'bg-[#2B1518] hover:bg-[#402024] text-[#E8DCC8] border-[#2B1518] hover:scale-[1.02] active:scale-[0.98]'
                        }`}
                      >
                        {addedHeroProductId === product.id ? (
                          <>
                            <Check size={15} weight="bold" className="text-[#B08D57] shrink-0" />
                            <span className="truncate">Added!</span>
                          </>
                        ) : (
                          <>
                            <Tote size={15} weight="regular" className="text-[#B08D57] shrink-0" />
                            <span className="truncate">Add to Cart</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3D Value Pillars - Layman Nigerian English */}
        <div className="mt-14 pt-10 border-t border-[#2B1518]/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="aura text-[#B08D57] bg-[#E8DCC8]/70">
            <div className="card bg-base-100 text-base-content border border-[#B08D57]/20 shadow-xs">
              <div className="card-body p-4 flex flex-row items-start gap-3.5">
                <Icon3DLeatherCraft size={44} className="shrink-0" />
                <div>
                  <h4 className="text-sm font-sans font-semibold text-[#2B1518]">100% Solid Leather</h4>
                  <p className="text-xs font-sans text-[#2B1518]/70 mt-1 leading-relaxed">
                    We make our shoes with real cowhide. No synthetic leather that tears or peels.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="aura text-[#B08D57] bg-[#E8DCC8]/70">
            <div className="card bg-base-100 text-base-content border border-[#B08D57]/20 shadow-xs">
              <div className="card-body p-4 flex flex-row items-start gap-3.5">
                <Icon3DBoxDelivery size={44} className="shrink-0" />
                <div>
                  <h4 className="text-sm font-sans font-semibold text-[#2B1518]">Fast Nationwide Delivery</h4>
                  <p className="text-xs font-sans text-[#2B1518]/70 mt-1 leading-relaxed">
                    24–48 hours delivery within Lagos. We also dispatch to all 36 states safely.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="aura text-[#B08D57] bg-[#E8DCC8]/70">
            <div className="card bg-base-100 text-base-content border border-[#B08D57]/20 shadow-xs">
              <div className="card-body p-4 flex flex-row items-start gap-3.5">
                <Icon3DWhatsApp size={44} className="shrink-0" />
                <div>
                  <h4 className="text-sm font-sans font-semibold text-[#2B1518]">Easy WhatsApp Ordering</h4>
                  <p className="text-xs font-sans text-[#2B1518]/70 mt-1 leading-relaxed">
                    No long forms. Pick your size, click WhatsApp, and chat directly with our team.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="aura text-[#B08D57] bg-[#E8DCC8]/70">
            <div className="card bg-base-100 text-base-content border border-[#B08D57]/20 shadow-xs">
              <div className="card-body p-4 flex flex-row items-start gap-3.5">
                <Icon3DShield size={44} className="shrink-0" />
                <div>
                  <h4 className="text-sm font-sans font-semibold text-[#2B1518]">Money-Back Guarantee</h4>
                  <p className="text-xs font-sans text-[#2B1518]/70 mt-1 leading-relaxed">
                    If the size does not fit or you notice any fault, we exchange it promptly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

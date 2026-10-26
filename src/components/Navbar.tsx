import React, { useState } from 'react';
import {
  Tote,
  List,
  X,
  WhatsappLogo,
  MagnifyingGlass,
  Heart,
  Ruler,
  ShieldCheck,
  MapPin,
} from '@phosphor-icons/react';
import { BATA_DISPLAY_PHONE, BATA_WHATSAPP_NUMBER } from '../utils/whatsapp';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenCustomModal: () => void;
  onOpenSizeGuide: () => void;
  onSelectCategory: (category: string) => void;
  onScrollToCatalog: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenCustomModal,
  onOpenSizeGuide,
  onSelectCategory,
  onScrollToCatalog,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [wishlistActive, setWishlistActive] = useState(false);

  const handleNavClick = (cat: string) => {
    onSelectCategory(cat);
    onScrollToCatalog();
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F7F3EB]/95 backdrop-blur-md border-b border-[#2B1518]/12">
      {/* Announcement Bar - Optimized for Mobile, Tablet & Desktop */}
      <div className="bg-[#2B1518] text-[#E8DCC8] border-b border-[#B08D57]/20 text-[11px] sm:text-xs font-medium py-1.5 sm:py-2 px-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between sm:justify-center gap-2 sm:gap-4 flex-nowrap">
          {/* Main message with Shield icon */}
          <div className="flex items-center gap-1.5 min-w-0 shrink">
            <ShieldCheck size={14} weight="regular" className="text-[#B08D57] shrink-0" />
            <span className="truncate sm:overflow-visible">
              <span className="inline sm:hidden">Handmade Leather & Imported Footwear</span>
              <span className="hidden sm:inline">Quality Handmade Leather & Imported Footwear in Nigeria</span>
            </span>
          </div>

          {/* Delivery tag on tablet and up */}
          <span className="hidden md:inline-flex items-center gap-1.5 text-[#E8DCC8]/90 shrink-0">
            <span className="text-[#B08D57]/60" aria-hidden="true">·</span>
            <MapPin size={12} weight="regular" className="text-[#B08D57] shrink-0" />
            <span>Direct Delivery in All 36 States</span>
          </span>

          {/* Direct WhatsApp Call/Chat Hotline - Clickable on all devices */}
          <div className="flex items-center gap-1.5 shrink-0 pl-1 sm:pl-0 border-l border-[#B08D57]/30 sm:border-0">
            <span className="hidden lg:inline text-[#B08D57]/60" aria-hidden="true">·</span>
            <a
              href={`https://wa.me/${BATA_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                'Hello Bàtà! 👞 I would like to inquire about ordering footwear.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#B08D57] hover:text-[#E8DCC8] transition-colors font-medium whitespace-nowrap cursor-pointer"
              title="Chat directly on WhatsApp"
            >
              <WhatsappLogo size={13} weight="fill" className="text-[#25D366] shrink-0" />
              <span className="hidden xs:inline">WhatsApp:</span>
              <span className="font-semibold text-[#E8DCC8] hover:text-white transition-colors">{BATA_DISPLAY_PHONE}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Top Bar 3-Zone Contract */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 sm:gap-6 h-16 sm:h-18">
          {/* Zone 1: Single Brand Wordmark in Instrument Serif with #2B1518 base and #B08D57 accent dot */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal tracking-wide text-[#2B1518] hover:text-[#3F2024] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 sm:gap-1.5"
          >
            <span>Bàtà</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#B08D57] mb-1 sm:mb-1.5" />
          </a>

          {/* Zone 2: 4-5 Concise Single-Line Navigation Links in Albert Sans */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium tracking-wide text-[#2B1518]/85 font-sans">
            <button
              onClick={() => handleNavClick('handmade_bata')}
              className="hover:text-[#B08D57] transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 border-b-2 border-transparent hover:border-[#B08D57]"
            >
              Handmade by Bàtà
            </button>
            <button
              onClick={() => handleNavClick('artisan')}
              className="hover:text-[#B08D57] transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 border-b-2 border-transparent hover:border-[#B08D57]"
            >
              Artisan Crafts
            </button>
            <button
              onClick={() => handleNavClick('imported')}
              className="hover:text-[#B08D57] transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 border-b-2 border-transparent hover:border-[#B08D57]"
            >
              Imported Shoes
            </button>
            <button
              onClick={() => {
                onOpenCustomModal();
                setMobileMenuOpen(false);
              }}
              className="hover:text-[#B08D57] transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 border-b-2 border-transparent hover:border-[#B08D57]"
            >
              Custom Order
            </button>
            <button
              onClick={() => {
                onOpenSizeGuide();
                setMobileMenuOpen(false);
              }}
              className="hover:text-[#B08D57] transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 border-b-2 border-transparent hover:border-[#B08D57]"
            >
              Size Guide
            </button>
          </nav>

          {/* Zone 3: Utility & Primary Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Quick Search Shortcut */}
            <button
              onClick={onScrollToCatalog}
              className="p-2 rounded-xl text-[#2B1518]/75 hover:text-[#2B1518] hover:bg-[#E8DCC8]/50 transition-all cursor-pointer"
              title="Search shoes"
              aria-label="Search shoes"
            >
              <MagnifyingGlass size={20} weight="light" />
            </button>

            {/* Wishlist Heart Icon */}
            <button
              onClick={() => setWishlistActive(!wishlistActive)}
              className="p-2 rounded-xl text-[#2B1518]/75 hover:text-[#B08D57] hover:bg-[#E8DCC8]/50 transition-all cursor-pointer"
              title={wishlistActive ? 'Wishlist saved' : 'Save favorites'}
              aria-label="Wishlist"
            >
              <Heart
                size={20}
                weight={wishlistActive ? 'fill' : 'light'}
                className={wishlistActive ? 'text-[#B08D57]' : 'text-[#2B1518]/75'}
              />
            </button>

            {/* Cart Button with Phosphor Tote Icon */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-[#2B1518] text-white hover:bg-[#3F2024] border border-[#B08D57]/30 transition-all font-sans font-medium text-xs sm:text-sm shadow-sm cursor-pointer"
              aria-label="View cart"
            >
              <Tote size={18} weight="regular" className="text-[#B08D57]" />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 ? (
                <span className="w-5 h-5 rounded-full bg-[#B08D57] text-[#2B1518] text-[11px] font-sans font-semibold flex items-center justify-center">
                  {cartCount}
                </span>
              ) : (
                <span className="w-2 h-2 rounded-full bg-[#B08D57]" />
              )}
            </button>

            {/* Mobile Menu Button with Phosphor List/X */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-[#2B1518] hover:bg-[#2B1518]/5 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X size={22} weight="regular" />
              ) : (
                <List size={22} weight="regular" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F7F3EB] border-b border-[#2B1518]/15 px-4 pt-3 pb-6 space-y-3">
          <button
            onClick={() => handleNavClick('all')}
            className="block w-full text-left py-2 text-sm font-semibold text-[#2B1518] border-b border-[#2B1518]/10"
          >
            All Footwear
          </button>
          <button
            onClick={() => handleNavClick('handmade_bata')}
            className="block w-full text-left py-2 text-sm font-medium text-[#2B1518]/80 border-b border-[#2B1518]/10"
          >
            Handmade by Bàtà (Workshop)
          </button>
          <button
            onClick={() => handleNavClick('artisan')}
            className="block w-full text-left py-2 text-sm font-medium text-[#2B1518]/80 border-b border-[#2B1518]/10"
          >
            Artisan Collection
          </button>
          <button
            onClick={() => handleNavClick('imported')}
            className="block w-full text-left py-2 text-sm font-medium text-[#2B1518]/80 border-b border-[#2B1518]/10"
          >
            Imported Footwear & Sneakers
          </button>
          <button
            onClick={() => {
              onOpenCustomModal();
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm text-[#B08D57] font-semibold border-b border-[#2B1518]/10"
          >
            Make A Custom Style For Me
          </button>
          <button
            onClick={() => {
              onOpenSizeGuide();
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm font-medium text-[#2B1518]/80 flex items-center justify-between"
          >
            <span>Shoe Size Guide (EU / UK)</span>
            <Ruler size={15} weight="regular" className="text-[#B08D57]" />
          </button>

          <div className="pt-2">
            <a
              href={`https://wa.me/${BATA_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                'Hello Bàtà! 👞 I want to chat about ordering shoes.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-semibold shadow-md shadow-[#25D366]/20 transition-colors"
            >
              <WhatsappLogo size={18} weight="regular" className="text-white" />
              <span>Chat with us on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};


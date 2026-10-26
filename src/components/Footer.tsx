import React from 'react';
import { BATA_DISPLAY_PHONE, BATA_WHATSAPP_NUMBER } from '../utils/whatsapp';
import {
  WhatsappLogo,
  InstagramLogo,
  TiktokLogo,
  XLogo,
  YoutubeLogo,
  FacebookLogo,
  MapPin,
} from '@phosphor-icons/react';

interface FooterProps {
  onSelectCategory: (category: string) => void;
  onOpenCustomModal: () => void;
  onOpenSizeGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenCustomModal,
  onOpenSizeGuide,
}) => {
  return (
    <div className="w-full bg-base-200 text-base-content border-t border-base-300">
      <div className="max-w-7xl mx-auto">
        {/* Top Tier: Multi-column DaisyUI footer */}
        <footer className="footer sm:footer-horizontal bg-base-200 text-base-content px-4 sm:px-8 lg:px-10 py-8 sm:py-10">
          {/* Brand & Workshop Details */}
          <aside className="max-w-xs space-y-3">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="font-serif text-3xl font-normal tracking-wide text-[#E8DCC8] flex items-center gap-1.5"
            >
              <span>Bàtà</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#B08D57] mb-1.5" />
            </a>
            <p className="text-xs font-sans text-[#E8DCC8]/80 leading-relaxed">
              Authentic handmade leather footwears crafted in Lagos and premium imported shoes. Built for durability, all-day foot comfort, and honest Nigerian pricing.
            </p>
            <div className="pt-1">
              <a
                href={`https://wa.me/${BATA_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  'Hello Bàtà! 👞 I would like to make an inquiry.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-sans font-semibold transition-all shadow-sm"
              >
                <WhatsappLogo size={16} weight="regular" className="text-white shrink-0" />
                <span className="truncate">WhatsApp: {BATA_DISPLAY_PHONE}</span>
              </a>
            </div>
            <p className="text-[11px] font-sans text-[#E8DCC8]/60 pt-1 flex items-center gap-1.5">
              <MapPin size={13} weight="regular" className="text-[#B08D57] shrink-0" />
              <span>Lagos Workshop: Shop 14, Commercial Ave, Yaba</span>
            </p>
          </aside>

          {/* Categories Nav */}
          <nav>
            <h6 className="footer-title font-sans font-medium text-[#B08D57] uppercase tracking-wider text-xs">Categories</h6>
            <button
              onClick={() => onSelectCategory('all')}
              className="link link-hover text-left"
            >
              All Footwear
            </button>
            <button
              onClick={() => onSelectCategory('handmade_bata')}
              className="link link-hover text-left"
            >
              Handmade by Bàtà
            </button>
            <button
              onClick={() => onSelectCategory('artisan')}
              className="link link-hover text-left"
            >
              Artisan Handcrafted
            </button>
            <button
              onClick={() => onSelectCategory('imported')}
              className="link link-hover text-left"
            >
              Quality Imported Shoes
            </button>
            <button
              onClick={() => onSelectCategory('slides')}
              className="link link-hover text-left"
            >
              Everyday Leather Slides
            </button>
          </nav>

          {/* Customer Service / Care */}
          <nav>
            <h6 className="footer-title font-sans font-medium text-[#B08D57] uppercase tracking-wider text-xs">Customer Care</h6>
            <button
              onClick={onOpenCustomModal}
              className="link link-hover text-left"
            >
              Make A Custom Style For Me
            </button>
            <button
              onClick={onOpenSizeGuide}
              className="link link-hover text-left"
            >
              Shoe Size Guide (EU / UK)
            </button>
            <a
              href={`https://wa.me/${BATA_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                'Hello Bàtà! 👞 What is your delivery policy?'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="link link-hover text-left"
            >
              Delivery & Shipping Info
            </a>
            <a
              href={`https://wa.me/${BATA_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                'Hello Bàtà! 👞 How do size exchanges work?'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="link link-hover text-left"
            >
              Exchange & Return Guarantee
            </a>
            <a
              href={`https://wa.me/${BATA_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                'Hello Bàtà! 👞 I want to inquire about bulk/wholesale orders.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="link link-hover text-left"
            >
              Bulk & Wholesale Orders
            </a>
          </nav>

          {/* Company */}
          <nav>
            <h6 className="footer-title font-sans font-medium text-[#B08D57] uppercase tracking-wider text-xs">Company</h6>
            <a href="#craft" className="link link-hover">
              About our Lagos Workshop
            </a>
            <a
              href={`https://wa.me/${BATA_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                'Hello Bàtà! 👞 I would like to speak with your cobbler team.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="link link-hover"
            >
              Contact Master Cobbler
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link link-hover flex items-center gap-1.5"
            >
              <InstagramLogo size={16} weight="regular" className="text-[#B08D57]" />
              <span>@batashoes.ng</span>
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link link-hover flex items-center gap-1.5"
            >
              <TiktokLogo size={16} weight="regular" className="text-[#B08D57]" />
              <span>@batashoes_ng</span>
            </a>
            <span className="text-xs text-[#E8DCC8]/70 pt-1">
              Direct Delivery in All 36 States
            </span>
          </nav>

          {/* Legal & Trust */}
          <nav>
            <h6 className="footer-title font-sans font-medium text-[#B08D57] uppercase tracking-wider text-xs">Legal & Trust</h6>
            <a className="link link-hover">100% Solid Cowhide Leather</a>
            <a className="link link-hover">Pay on Delivery in Lagos</a>
            <a className="link link-hover">24-48 hrs Fast Dispatch</a>
            <a className="link link-hover">Privacy & Order Terms</a>
            <a className="link link-hover">Fair Pricing Guarantee</a>
          </nav>
        </footer>

        {/* Bottom Tier: Copyright, Brand Emblem & Social Icons */}
        <footer className="footer bg-base-200 text-base-content border-base-300 border-t px-4 sm:px-8 lg:px-10 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <aside className="flex items-center gap-3 text-center sm:text-left">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fillRule="evenodd"
              clipRule="evenodd"
              className="fill-current text-[#B08D57] shrink-0"
            >
              <path
                d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"
              />
            </svg>
            <p className="text-xs font-sans text-[#E8DCC8]/80">
              <span className="font-semibold text-[#E8DCC8]">Bàtà Footwear Lagos Ltd.</span>
              <br />
              Authentic Nigerian leather craft & quality imported shoes since 2018 · © {new Date().getFullYear()}
            </p>
          </aside>

          <nav className="md:place-self-center md:justify-self-end">
            <div className="flex items-center gap-4">
              {/* Twitter / X */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (formerly Twitter)"
                className="text-[#E8DCC8]/80 hover:text-white transition-colors p-1"
              >
                <XLogo size={18} weight="regular" />
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-[#E8DCC8]/80 hover:text-white transition-colors p-1"
              >
                <YoutubeLogo size={18} weight="regular" />
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-[#E8DCC8]/80 hover:text-white transition-colors p-1"
              >
                <FacebookLogo size={18} weight="regular" />
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-[#E8DCC8]/80 hover:text-[#B08D57] transition-colors p-1"
              >
                <InstagramLogo size={18} weight="regular" />
              </a>

              {/* WhatsApp direct chat icon */}
              <a
                href={`https://wa.me/${BATA_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  'Hello Bàtà! 👞 I am contacting you from your website.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="text-[#E8DCC8]/80 hover:text-[#25D366] transition-colors p-1"
              >
                <WhatsappLogo size={19} weight="regular" />
              </a>
            </div>
          </nav>
        </footer>
      </div>
    </div>
  );
};

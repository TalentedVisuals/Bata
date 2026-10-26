import React from 'react';
import { BATA_DISPLAY_PHONE, BATA_WHATSAPP_NUMBER } from '../utils/whatsapp';
import {
  CheckCircle,
  WhatsappLogo,
  PhoneCall,
  MapPin,
  InstagramLogo,
  TiktokLogo,
  XLogo,
  FacebookLogo,
  Clock,
} from '@phosphor-icons/react';

export const SocialAndReviews: React.FC = () => {
  const reviews = [
    {
      id: 'rev-1',
      name: 'Chinedu Okeke',
      location: 'Victoria Island, Lagos',
      shoeBought: 'Akobi Classic Leather Slides (Size 43)',
      comment:
        'I bought the brown slides 8 months ago. I wear it almost every day, even when it rains in Lagos. The leather did not peel at all. Truly solid Nigerian work.',
      verified: 'Verified Order via WhatsApp',
    },
    {
      id: 'rev-2',
      name: 'Ibrahim Danladi',
      location: 'Gwarinpa, Abuja',
      shoeBought: 'Eko Handcrafted Penny Loafers (Size 44)',
      comment:
        'Delivered to Abuja in 3 days. The polish and weight of the shoe is top tier. Wore it to my brother’s wedding and got compliments throughout.',
      verified: 'Verified Order via WhatsApp',
    },
    {
      id: 'rev-3',
      name: 'Folashade Adeyemi',
      location: 'Ikeja, Lagos',
      shoeBought: 'Milan Street Clean White Sneakers (Size 40)',
      comment:
        'The imported sneakers are so soft! Walking in them is very light. The seller was very patient on WhatsApp helping me confirm my size.',
      verified: 'Verified Order via WhatsApp',
    },
    {
      id: 'rev-4',
      name: 'Emeka Nwachukwu',
      location: 'GRA, Port Harcourt',
      shoeBought: 'Obalende Horsebit Half-Shoe (Size 42)',
      comment:
        'Sent them a photo of a slide I saw online. They made it for me within 3 days and sent via waybill to PH. Perfect fit!',
      verified: 'Custom Made Order',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#F7F3EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Customer Reviews Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-sans font-medium text-[#B08D57] uppercase tracking-wider mb-2">
            <span>Customer Feedback</span>
            <span aria-hidden="true">·</span>
            <span>Real Words from Real Buyers</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#2B1518] font-normal tracking-tight">
            What Customers <span className="italic text-[#B08D57]">Are Saying</span>
          </h2>
          <p className="mt-2 text-sm font-sans font-normal text-[#2B1518]/70">
            Over 2,400 pairs delivered across Lagos, Abuja, Port Harcourt, and all states in Nigeria.
          </p>
        </div>

        {/* Reviews Grid (NO star icons per prompt instruction!) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-14 sm:mb-16">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="aura text-[#B08D57] bg-[#E8DCC8]/70 group transition-all duration-300"
            >
              <div className="card bg-base-100 text-base-content border border-[#2B1518]/12 shadow-xs">
                <div className="card-body p-4 sm:p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-sans font-medium text-[#B08D57] flex items-center gap-1.5">
                        <CheckCircle size={15} weight="fill" className="text-[#B08D57] shrink-0" />
                        <span>{rev.verified}</span>
                      </span>
                      <span className="text-[10px] text-slate-400 font-sans font-medium">Nigeria</span>
                    </div>

                    <p className="text-xs font-sans text-[#2B1518]/80 leading-relaxed italic mb-4">
                      &ldquo;{rev.comment}&rdquo;
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <p className="text-xs font-sans font-semibold text-[#2B1518]">{rev.name}</p>
                    <p className="text-[11px] font-sans text-[#2B1518]/60">{rev.location}</p>
                    <p className="text-[10px] font-sans text-[#B08D57] font-medium mt-1 truncate">
                      {rev.shoeBought}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Social Media & Direct Channels Box */}
        <div className="rounded-3xl bg-white border border-[#2B1518]/15 p-5 sm:p-8 md:p-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-sans font-medium text-[#B08D57] uppercase tracking-wider mb-2">
                <span>Connect With Bàtà</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-4xl text-[#2B1518] font-normal mb-3">
                Follow Us & Order Directly On Social Media
              </h3>
              <p className="text-xs sm:text-sm font-sans text-[#2B1518]/75 leading-relaxed mb-6">
                We regularly post new leather slide designs, workshop behind-the-scenes videos, and imported drops on our pages. You can DM us anywhere or chat directly on WhatsApp.
              </p>

              {/* Social Channels List */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${BATA_WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2.5 sm:p-3 rounded-xl bg-[#FAF7F2] hover:bg-[#E8DCC8]/60 border border-[#2B1518]/15 hover:border-[#25D366]/50 transition-all text-xs font-semibold text-[#2B1518] min-w-0"
                >
                  <WhatsappLogo size={18} weight="regular" className="text-[#25D366] shrink-0" />
                  <span className="truncate">WhatsApp</span>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2.5 sm:p-3 rounded-xl bg-[#FAF7F2] hover:bg-[#E8DCC8]/60 border border-[#2B1518]/15 transition-all text-xs font-semibold text-[#2B1518] min-w-0"
                >
                  <InstagramLogo size={18} weight="regular" className="text-[#B08D57] shrink-0" />
                  <span className="truncate">@batashoes.ng</span>
                </a>

                {/* TikTok */}
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2.5 sm:p-3 rounded-xl bg-[#FAF7F2] hover:bg-[#E8DCC8]/60 border border-[#2B1518]/15 transition-all text-xs font-semibold text-[#2B1518] min-w-0"
                >
                  <TiktokLogo size={18} weight="regular" className="text-[#2B1518] shrink-0" />
                  <span className="truncate">TikTok</span>
                </a>

                {/* Twitter / X */}
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2.5 sm:p-3 rounded-xl bg-[#FAF7F2] hover:bg-[#E8DCC8]/60 border border-[#2B1518]/15 transition-all text-xs font-semibold text-[#2B1518] min-w-0"
                >
                  <XLogo size={18} weight="regular" className="text-[#2B1518] shrink-0" />
                  <span className="truncate">@batashoes_ng</span>
                </a>

                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2.5 sm:p-3 rounded-xl bg-[#FAF7F2] hover:bg-[#E8DCC8]/60 border border-[#2B1518]/15 transition-all text-xs font-semibold text-[#2B1518] min-w-0"
                >
                  <FacebookLogo size={18} weight="regular" className="text-[#1877F2] shrink-0" />
                  <span className="truncate">Facebook</span>
                </a>

                {/* Direct Phone */}
                <a
                  href="tel:+2348123456789"
                  className="flex items-center gap-2 p-2.5 sm:p-3 rounded-xl bg-[#FAF7F2] hover:bg-[#E8DCC8]/60 border border-[#2B1518]/15 transition-all text-xs font-semibold text-[#2B1518] min-w-0"
                >
                  <PhoneCall size={18} weight="regular" className="text-[#B08D57] shrink-0" />
                  <span className="truncate">Call Us</span>
                </a>
              </div>
            </div>

            {/* Workshop Address & Pick-up card in #2B1518 */}
            <div className="p-6 rounded-2xl bg-[#2B1518] text-[#E8DCC8] border border-[#B08D57]/30 flex flex-col justify-between shadow-lg">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#B08D57]">
                  Workshop & Store Pickup
                </span>
                <h4 className="font-serif text-xl sm:text-2xl text-white font-normal mt-1 mb-3">
                  Visit Our Lagos Workshop
                </h4>
                <p className="text-xs text-[#E8DCC8]/80 leading-relaxed mb-4">
                  Prefer to try on your size physically? You can visit our workshop in Yaba, Lagos. We will measure your foot and let you select your leather color on the spot.
                </p>

                <div className="space-y-2 text-xs text-[#E8DCC8]">
                  <p className="flex items-start gap-2">
                    <MapPin size={16} weight="regular" className="text-[#B08D57] shrink-0 mt-0.5" />
                    <span>Shop 14, Commercial Avenue, Yaba, Lagos, Nigeria</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock size={16} weight="regular" className="text-[#B08D57] shrink-0" />
                    <span>{BATA_DISPLAY_PHONE} (Mon – Sat, 8:00 AM – 7:00 PM)</span>
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-[#B08D57]/20">
                <a
                  href={`https://wa.me/${BATA_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    'Hello Bàtà! 👞 I want to visit your workshop in Yaba or make an inquiry.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-bold transition-all shadow-md shadow-[#25D366]/20"
                >
                  <WhatsappLogo size={18} weight="regular" className="text-white" />
                  <span>Chat With Us on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { Icon3DLeatherCraft, Icon3DCustomShoe, Icon3DBoxDelivery } from './ThreeDIcons';
import { CheckCircle, WhatsappLogo } from '@phosphor-icons/react';

interface CraftStoryProps {
  onOpenCustomModal: () => void;
}

export const CraftStory: React.FC<CraftStoryProps> = ({ onOpenCustomModal }) => {
  return (
    <section className="py-16 sm:py-24 bg-white border-y border-[#2B1518]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-sans font-medium text-[#B08D57] uppercase tracking-wider mb-2">
            <span>Our Workshop Story</span>
            <span aria-hidden="true">·</span>
            <span>Why Bàtà Footwear Is Different</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#2B1518] font-normal tracking-tight">
            How We Build Shoes That <span className="italic text-[#B08D57]">Last For Years</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base font-sans font-normal text-[#2B1518]/70 leading-relaxed max-w-2xl mx-auto">
            Most shoes sold in Nigerian markets peel after three months because they use fake leather paper. At Bàtà, we make our shoes by hand using thick animal leather, and we also bring in quality foreign sneakers.
          </p>
        </div>

        {/* 3 Core Collections Explained */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Card 1: Handmade by Bàtà */}
          <div className="aura text-[#B08D57] bg-[#E8DCC8]/70">
            <div className="card bg-base-100 text-base-content border border-[#2B1518]/15 shadow-xs">
              <div className="card-body p-6 sm:p-7 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-4 shadow-xs border border-[#B08D57]/20">
                    <Icon3DLeatherCraft size={36} />
                  </div>
                  <span className="text-[11px] font-sans font-medium text-[#B08D57] uppercase tracking-wider">
                    01. Workshop Production
                  </span>
                  <h3 className="font-serif text-2xl text-[#2B1518] font-normal mt-1 mb-2">
                    Handmade by Bàtà
                  </h3>
                  <p className="text-xs font-sans text-[#2B1518]/75 leading-relaxed">
                    Made directly by our master shoemakers in Lagos. We select the cowhide, cut the shapes, and stitch every line. Because we control the process, you can request custom colors and exact foot sizes.
                  </p>
                </div>

                <ul className="mt-5 pt-4 border-t border-[#2B1518]/10 space-y-2 text-xs font-sans text-[#2B1518]/80">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={15} weight="regular" className="text-[#B08D57] shrink-0" />
                    <span>100% thick cowhide that never peels</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={15} weight="regular" className="text-[#B08D57] shrink-0" />
                    <span>Reinforced double stitching</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={15} weight="regular" className="text-[#B08D57] shrink-0" />
                    <span>Custom styles made upon request</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Card 2: Artisan Made from Others */}
          <div className="aura text-[#B08D57] bg-[#E8DCC8]/70">
            <div className="card bg-base-100 text-base-content border border-[#2B1518]/15 shadow-xs">
              <div className="card-body p-6 sm:p-7 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-4 shadow-xs border border-[#B08D57]/20">
                    <Icon3DCustomShoe size={36} />
                  </div>
                  <span className="text-[11px] font-sans font-medium text-[#B08D57] uppercase tracking-wider">
                    02. Nigerian Craft Network
                  </span>
                  <h3 className="font-serif text-2xl text-[#2B1518] font-normal mt-1 mb-2">
                    Artisan Craftsmen Network
                  </h3>
                  <p className="text-xs font-sans text-[#2B1518]/75 leading-relaxed">
                    We also curate handmade leather slides and woven slippers from skilled artisans in Abeokuta, Kaduna, and Ibadan. We test each batch for strength so you get authentic Nigerian art you can wear with pride.
                  </p>
                </div>

                <ul className="mt-5 pt-4 border-t border-[#2B1518]/10 space-y-2 text-xs font-sans text-[#2B1518]/80">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={15} weight="regular" className="text-[#B08D57] shrink-0" />
                    <span>Traditional hand-braided patterns</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={15} weight="regular" className="text-[#B08D57] shrink-0" />
                    <span>Empowering local Nigerian cobblers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={15} weight="regular" className="text-[#B08D57] shrink-0" />
                    <span>Rigorous durability check before listing</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Card 3: Quality Imported */}
          <div className="aura text-[#B08D57] bg-[#E8DCC8]/70">
            <div className="card bg-base-100 text-base-content border border-[#2B1518]/15 shadow-xs">
              <div className="card-body p-6 sm:p-7 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-4 shadow-xs border border-[#B08D57]/20">
                    <Icon3DBoxDelivery size={36} />
                  </div>
                  <span className="text-[11px] font-sans font-medium text-[#B08D57] uppercase tracking-wider">
                    03. Overseas Selection
                  </span>
                  <h3 className="font-serif text-2xl text-[#2B1518] font-normal mt-1 mb-2">
                    Tested Imported Footwear
                  </h3>
                  <p className="text-xs font-sans text-[#2B1518]/75 leading-relaxed">
                    For customers who want clean white sneakers, walking kicks, and luxury suede driving shoes, we import verified stock. No inferior plastics &mdash; only solid footwear that stands the test of time.
                  </p>
                </div>

                <ul className="mt-5 pt-4 border-t border-[#2B1518]/10 space-y-2 text-xs font-sans text-[#2B1518]/80">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={15} weight="regular" className="text-[#B08D57] shrink-0" />
                    <span>Lightweight cushioned midsoles</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={15} weight="regular" className="text-[#B08D57] shrink-0" />
                    <span>Modern streetwear & business looks</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={15} weight="regular" className="text-[#B08D57] shrink-0" />
                    <span>Fair prices without showroom markup</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Real Workshop Photo Spotlight */}
        <div className="relative mb-16 rounded-3xl overflow-hidden border border-[#2B1518]/15 shadow-xl group min-h-[300px] sm:min-h-[340px] md:min-h-[380px] flex flex-col justify-end">
          <img
            src="/shoes/nigerian_artisan_shoemaker.jpg"
            alt="Authentic Nigerian master artisan handcrafting leather footwear in Lagos workshop"
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 filter brightness-85"
            loading="lazy"
          />
          <div className="relative z-10 bg-gradient-to-t from-[#2B1518] via-[#2B1518]/70 to-transparent flex flex-col justify-end p-5 sm:p-8 md:p-10 text-white pt-14">
            <div className="max-w-2xl">
              <span className="inline-block px-3 py-1 rounded bg-[#B08D57] text-[#2B1518] text-[11px] sm:text-xs font-sans font-medium uppercase tracking-wider mb-2">
                Authentic Nigerian Handcrafting
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-normal leading-tight">
                Every Stitch Cut, Shaped, and Finished by Master Hands
              </h3>
              <p className="mt-2 text-xs sm:text-sm font-sans text-[#E8DCC8] leading-relaxed max-w-xl">
                We do not cut corners. From carving ergonomic lasts to hand-pulling real cowhide leather and stitching non-slip soles, our shoes are engineered for real durability.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Step Handcrafting Process in #2B1518 base */}
        <div className="p-6 sm:p-8 md:p-10 rounded-3xl bg-[#2B1518] text-[#E8DCC8] border border-[#B08D57]/30 shadow-xl">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <span className="text-xs font-sans font-medium text-[#B08D57] uppercase tracking-wider">
              Step-by-Step in Our Workshop
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl text-white font-normal mt-1">
              From Raw Hide to Your Feet
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-3xl font-serif text-[#B08D57]">01</span>
              <h4 className="text-sm font-sans font-semibold text-white mt-2 mb-1">
                Selecting Strong Leather
              </h4>
              <p className="text-xs font-sans text-[#E8DCC8]/80 leading-relaxed">
                We touch and inspect every leather hide to confirm the grain is thick, supple, and pure cowhide.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-3xl font-serif text-[#B08D57]">02</span>
              <h4 className="text-sm font-sans font-semibold text-white mt-2 mb-1">
                Precision Hand-Cutting
              </h4>
              <p className="text-xs font-sans text-[#E8DCC8]/80 leading-relaxed">
                Straps and uppers are shaped by hand onto wooden lasts tailored to Nigerian foot ergonomics.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-3xl font-serif text-[#B08D57]">03</span>
              <h4 className="text-sm font-sans font-semibold text-white mt-2 mb-1">
                Heavy Welt Stitching
              </h4>
              <p className="text-xs font-sans text-[#E8DCC8]/80 leading-relaxed">
                We stitch through the sole with tough nylon thread. Even in heavy rain, your sole won&apos;t separate.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-3xl font-serif text-[#B08D57]">04</span>
              <h4 className="text-sm font-sans font-semibold text-white mt-2 mb-1">
                Soft Insole Cushioning
              </h4>
              <p className="text-xs font-sans text-[#E8DCC8]/80 leading-relaxed">
                We line the footbed with comfortable memory foam so you can walk all day without heel pain.
              </p>
            </div>
          </div>

          <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <p className="text-sm font-sans font-semibold text-white">
                Have a unique shoe style you want us to produce?
              </p>
              <p className="text-xs font-sans text-[#E8DCC8]/80 mt-0.5">
                Send sample picture on WhatsApp, we will give you a quote in minutes!
              </p>
            </div>

            <button
              onClick={onOpenCustomModal}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#B08D57] hover:bg-[#C8AC7C] text-[#2B1518] text-xs sm:text-sm font-sans font-semibold transition-all shadow-md shrink-0 cursor-pointer"
            >
              <WhatsappLogo size={18} weight="regular" />
              <span>Send Sample Picture on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

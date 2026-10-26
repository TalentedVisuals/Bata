import React, { useState } from 'react';
import { CustomShoeRequest } from '../types/footwear';
import { generateCustomShoeWhatsAppUrl } from '../utils/whatsapp';
import { Icon3DCustomShoe } from './ThreeDIcons';
import { X, WhatsappLogo, Camera } from '@phosphor-icons/react';

interface CustomShoeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CustomShoeModal: React.FC<CustomShoeModalProps> = ({ isOpen, onClose }) => {
  const [shoeType, setShoeType] = useState('Handmade Leather Slides');
  const [leatherColor, setLeatherColor] = useState('Rich Tan Brown');
  const [footSize, setFootSize] = useState<number>(42);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('Lagos');
  const [specialInstructions, setSpecialInstructions] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const request: CustomShoeRequest = {
      shoeType,
      leatherColor,
      footSize,
      customerName: customerName.trim() || 'Valued Customer',
      customerPhone: customerPhone.trim() || 'N/A',
      deliveryLocation,
      specialInstructions,
    };

    const url = generateCustomShoeWhatsAppUrl(request);
    window.open(url, '_blank');
    onClose();
  };

  const shoeTypes = [
    'Handmade Leather Slides',
    'Gentlemen Leather Loafers',
    'Dual-Strap Leather Sandals',
    'Half-Shoe Mules with Buckle',
    'Cap-Toe Oxford Formal Shoes',
    'Traditional Woven Slippers',
  ];

  const colors = [
    'Rich Tan Brown',
    'Midnight Black',
    'Dark Chocolate',
    'Deep Oxblood Wine',
    'Caramel Cognac',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-[#2B1518]/20 my-auto p-5 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
          aria-label="Close custom order modal"
        >
          <X size={20} weight="regular" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-[#E8DCC8] flex items-center justify-center shrink-0 border border-[#B08D57]/30">
            <Icon3DCustomShoe size={36} />
          </div>
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#2B1518] font-normal">
              Make A Shoe Style For Me
            </h2>
            <p className="text-xs font-sans font-medium text-[#B08D57]">
              Send us any photo or style idea · Handmade by Bàtà workshop
            </p>
          </div>
        </div>

        <p className="text-xs font-sans font-normal text-[#2B1518]/80 leading-relaxed mb-5 bg-[#FAF7F2] p-3 rounded-xl border border-[#B08D57]/20">
          Saw a nice shoe on Instagram, Pinterest, or your friend? Fill in your size and leather preference below, then tap WhatsApp. You can send the photo directly in the chat and we will give you a fair price and delivery date!
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-sans font-medium text-[#2B1518] uppercase tracking-wider mb-1.5">
              What kind of footwear do you want us to make?
            </label>
            <div className="grid grid-cols-2 gap-2">
              {shoeTypes.map((type) => (
                <button
                  type="button"
                  key={type}
                  onClick={() => setShoeType(type)}
                  className={`p-2 rounded-lg text-left text-xs font-sans font-medium border transition-all cursor-pointer ${
                    shoeType === type
                      ? 'border-[#B08D57] bg-[#E8DCC8]/40 text-[#2B1518] font-semibold ring-1 ring-[#B08D57]'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-sans font-medium text-[#2B1518] uppercase tracking-wider mb-1">
                Preferred Leather Color
              </label>
              <select
                value={leatherColor}
                onChange={(e) => setLeatherColor(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 font-sans text-xs text-[#2B1518] focus:outline-none focus:border-[#B08D57] bg-white"
              >
                {colors.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-sans font-medium text-[#2B1518] uppercase tracking-wider mb-1">
                Your Shoe Size (EU)
              </label>
              <select
                value={footSize}
                onChange={(e) => setFootSize(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 font-sans text-xs text-[#2B1518] focus:outline-none focus:border-[#B08D57] bg-white"
              >
                {[38, 39, 40, 41, 42, 43, 44, 45, 46].map((sz) => (
                  <option key={sz} value={sz}>
                    Size {sz} (UK {sz - 33})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-sans font-medium text-[#2B1518] uppercase tracking-wider mb-1">
                Your Name
              </label>
              <input
                type="text"
                placeholder="e.g. Segun"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 font-sans text-xs focus:outline-none focus:border-[#B08D57]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2B1518] uppercase tracking-wider mb-1">
                Your City / Location
              </label>
              <input
                type="text"
                placeholder="e.g. Ikeja, Lagos"
                value={deliveryLocation}
                onChange={(e) => setDeliveryLocation(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-[#B08D57]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#2B1518] uppercase tracking-wider mb-1">
              Description or Special Request (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="e.g. I have a broad foot, I want double stitching with extra arch cushion"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-[#B08D57]"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-white border border-[#20BA5A] text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/25 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
            >
              <WhatsappLogo size={18} weight="regular" className="text-white" />
              <span>Send Request to Workshop on WhatsApp</span>
            </button>
            <p className="text-[11px] text-center text-slate-500 mt-2 flex items-center justify-center gap-1.5">
              <Camera size={15} weight="regular" className="text-[#B08D57]" />
              <span>You can attach sample photos immediately in WhatsApp</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

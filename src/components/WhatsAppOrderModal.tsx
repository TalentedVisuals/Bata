import React, { useState } from 'react';
import { Product } from '../types/footwear';
import { ShoeArtwork } from './ShoeArtwork';
import { formatNaira, generateSingleProductWhatsAppUrl } from '../utils/whatsapp';
import { X, WhatsappLogo, Ruler, ArrowRight, Minus, Plus } from '@phosphor-icons/react';

interface WhatsAppOrderModalProps {
  product: Product | null;
  onClose: () => void;
  onOpenSizeGuide: () => void;
}

export const WhatsAppOrderModal: React.FC<WhatsAppOrderModalProps> = ({
  product,
  onClose,
  onOpenSizeGuide,
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<number>(product.sizes[1] || product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0].name);
  const [quantity, setQuantity] = useState<number>(1);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('Lagos');

  const activeColorHex =
    product.colors.find((c) => c.name === selectedColor)?.hex || product.colors[0].hex;

  const handleSendToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const url = generateSingleProductWhatsAppUrl(
      product,
      selectedSize,
      selectedColor,
      quantity,
      customerName.trim() || undefined,
      customerPhone.trim() || undefined,
      deliveryLocation.trim() || undefined
    );
    window.open(url, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-[#2B1518]/20 my-auto p-5 sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X size={20} weight="regular" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-5 pr-8">
          <div className="w-14 h-14 rounded-2xl bg-[#FAF7F2] overflow-hidden border border-[#B08D57]/30 shrink-0">
            <ShoeArtwork
              type={product.illustrationKey}
              imageUrl={product.imageUrl}
              alt={product.name}
              colorHex={activeColorHex}
              hoverZoom={false}
            />
          </div>
          <div className="min-w-0">
            <span className="text-[11px] font-sans font-medium text-[#B08D57] uppercase tracking-wider">
              Quick WhatsApp Order
            </span>
            <h3 className="font-serif text-xl sm:text-2xl text-[#2B1518] font-normal truncate">
              {product.name}
            </h3>
            <p className="text-sm font-sans font-semibold text-[#2B1518]">
              {formatNaira(product.price)} each
            </p>
          </div>
        </div>

        <form onSubmit={handleSendToWhatsApp} className="space-y-4">
          {/* Color Selection */}
          <div>
            <label className="block text-xs font-sans font-medium text-[#2B1518] uppercase tracking-wider mb-1.5">
              Choose Color: <span className="text-[#B08D57] font-semibold">{selectedColor}</span>
            </label>
            <div className="flex items-center gap-2 flex-wrap">
              {product.colors.map((color) => (
                <button
                  type="button"
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-sans font-medium transition-all cursor-pointer ${
                    selectedColor === color.name
                      ? 'border-[#B08D57] bg-[#E8DCC8]/40 ring-1 ring-[#B08D57]'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full border border-black/10 shrink-0"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span>{color.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <div className="flex items-center justify-between mb-1.5 gap-2 flex-wrap">
              <label className="text-xs font-sans font-medium text-[#2B1518] uppercase tracking-wider">
                Select Your Size (EU / UK)
              </label>
              <button
                type="button"
                onClick={onOpenSizeGuide}
                className="text-[11px] font-sans text-[#B08D57] font-semibold hover:underline flex items-center gap-1 cursor-pointer shrink-0"
              >
                <Ruler size={13} weight="regular" />
                <span>Size Guide</span>
              </button>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {product.sizes.map((size) => (
                <button
                  type="button"
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2 rounded-lg text-xs font-sans font-medium transition-all cursor-pointer ${
                    selectedSize === size
                      ? 'bg-[#2B1518] text-[#E8DCC8] shadow-xs font-semibold'
                      : 'bg-[#FAF7F2] text-[#2B1518] hover:bg-[#E8DCC8]/50 border border-[#2B1518]/15'
                  }`}
                >
                  EU {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Stepper */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs font-sans font-medium text-[#2B1518] uppercase tracking-wider">
              Quantity:
            </span>
            <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-white">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-1.5 text-xs font-sans font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus size={11} weight="bold" />
              </button>
              <span className="px-3 text-xs font-sans font-medium">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="p-1.5 text-xs font-sans font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus size={11} weight="bold" />
              </button>
            </div>
          </div>

          {/* Customer details for quick WhatsApp formatting */}
          <div className="pt-2 border-t border-slate-100 space-y-3">
            <p className="text-[11px] text-slate-500">
              Optional: Enter your name and town so the message has your delivery info ready.
            </p>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-[#B08D57]"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Your City/State"
                  value={deliveryLocation}
                  onChange={(e) => setDeliveryLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-[#B08D57]"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-3">
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-white border border-[#20BA5A] text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/25 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
            >
              <WhatsappLogo size={18} weight="regular" className="text-white" />
              <span>Send to WhatsApp ({formatNaira(product.price * quantity)})</span>
              <ArrowRight size={16} weight="regular" />
            </button>
            <p className="text-[11px] text-center text-slate-500 mt-2">
              Opens WhatsApp with your shoe model and size ready to send.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

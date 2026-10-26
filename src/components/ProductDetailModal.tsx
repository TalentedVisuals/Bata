import React, { useState } from 'react';
import { Product } from '../types/footwear';
import { ShoeArtwork } from './ShoeArtwork';
import { formatNaira, generateSingleProductWhatsAppUrl } from '../utils/whatsapp';
import {
  X,
  WhatsappLogo,
  Tote,
  Check,
  ShieldCheck,
  Truck,
  Ruler,
  CheckCircle,
  Minus,
  Plus,
} from '@phosphor-icons/react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: number, color: string, quantity: number) => void;
  onOpenSizeGuide: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onOpenSizeGuide,
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<number>(product.sizes[1] || product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0].name);
  const [quantity, setQuantity] = useState<number>(1);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [justAdded, setJustAdded] = useState(false);

  const activeColorHex =
    product.colors.find((c) => c.name === selectedColor)?.hex || product.colors[0].hex;

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const whatsAppUrl = generateSingleProductWhatsAppUrl(
    product,
    selectedSize,
    selectedColor,
    quantity,
    customerName,
    customerPhone,
    deliveryLocation
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-[#2B1518]/20 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 rounded-full bg-white/95 hover:bg-white text-[#2B1518] shadow-md border border-slate-200 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X size={20} weight="regular" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Visual Showcase */}
          <div className="relative bg-[#FAF7F2] p-5 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#2B1518]/10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#2B1518] uppercase tracking-wider bg-[#E8DCC8] px-2.5 py-1 rounded-md border border-[#B08D57]/30">
                {product.categoryLabel}
              </span>
              <span className="text-xs text-[#2B1518]/70 font-medium">
                {product.leadTime}
              </span>
            </div>

            <div className="my-5 aspect-[4/3] flex items-center justify-center">
              <ShoeArtwork
                type={product.illustrationKey}
                imageUrl={product.imageUrl}
                alt={product.name}
                colorHex={activeColorHex}
                className="rounded-2xl"
              />
            </div>

            {/* Quick Guarantees */}
            <div className="space-y-2 pt-4 border-t border-[#2B1518]/10 text-xs text-[#2B1518]/80 font-sans">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} weight="regular" className="text-[#B08D57] shrink-0" />
                <span>100% Genuine Leather Guarantee · Won&apos;t peel or tear</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck size={16} weight="regular" className="text-[#B08D57] shrink-0" />
                <span>Lagos Delivery in 24–48 hrs · Nationwide Shipping</span>
              </div>
            </div>
          </div>

          {/* Right Column: Options & Ordering */}
          <div className="p-5 sm:p-8 flex flex-col justify-between">
            <div>
              <h2 className="font-serif text-2xl sm:text-4xl text-[#2B1518] font-normal tracking-tight">
                {product.name}
              </h2>

              <div className="flex items-baseline gap-3 mt-2 mb-4 flex-wrap">
                <span className="text-2xl sm:text-3xl font-sans font-semibold text-[#2B1518] tracking-tight">
                  {formatNaira(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm font-sans text-[#2B1518]/40 line-through">
                    {formatNaira(product.originalPrice)}
                  </span>
                )}
                <span className="text-xs font-sans text-[#2B1518] font-medium bg-[#E8DCC8] px-2.5 py-0.5 rounded border border-[#B08D57]/30">
                  In Stock
                </span>
              </div>

              <p className="text-xs sm:text-sm font-sans text-[#2B1518]/75 leading-relaxed mb-5">
                {product.description}
              </p>

              {/* Color Selection */}
              <div className="mb-5">
                <label className="block text-xs font-sans font-medium text-[#2B1518] uppercase tracking-wider mb-2">
                  Select Leather Color: <span className="text-[#B08D57] font-semibold">{selectedColor}</span>
                </label>
                <div className="flex items-center gap-2 flex-wrap">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-sans font-medium transition-all cursor-pointer ${
                        selectedColor === color.name
                          ? 'border-[#B08D57] bg-[#E8DCC8]/40 ring-1 ring-[#B08D57]'
                          : 'border-slate-200 hover:border-slate-400 bg-white'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2 gap-2 flex-wrap">
                  <label className="text-xs font-sans font-medium text-[#2B1518] uppercase tracking-wider">
                    Select Size (EU / UK)
                  </label>
                  <button
                    onClick={onOpenSizeGuide}
                    className="text-xs font-sans text-[#B08D57] font-semibold hover:underline flex items-center gap-1 cursor-pointer shrink-0"
                  >
                    <Ruler size={14} weight="regular" />
                    <span>How to know your size</span>
                  </button>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 rounded-xl text-xs font-sans font-medium transition-all cursor-pointer ${
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

              {/* Key Features Bullets in Simple English */}
              <div className="mb-6 p-3.5 rounded-xl bg-[#FAF7F2] border border-[#B08D57]/20">
                <h4 className="text-xs font-sans font-medium text-[#B08D57] uppercase tracking-wider mb-2">
                  Why you will love this pair:
                </h4>
                <ul className="space-y-1.5">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="text-xs font-sans text-[#2B1518]/80 flex items-start gap-2">
                      <CheckCircle size={15} weight="regular" className="text-[#B08D57] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quantity Stepper */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-sans font-medium text-[#2B1518] uppercase tracking-wider">
                  Quantity:
                </span>
                <div className="flex items-center border border-[#2B1518]/20 rounded-lg overflow-hidden bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-slate-700 hover:bg-[#FAF7F2] cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={12} weight="bold" />
                  </button>
                  <span className="px-3 py-1 text-xs font-sans font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-slate-700 hover:bg-[#FAF7F2] cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus size={12} weight="bold" />
                  </button>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2.5 pt-4 border-t border-[#2B1518]/10">
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-white border border-[#20BA5A] text-sm font-sans font-semibold flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/25 transition-all hover:scale-[1.01]"
              >
                <WhatsappLogo size={18} weight="regular" className="text-white" />
                <span>Order on WhatsApp Now ({formatNaira(product.price * quantity)})</span>
              </a>

              <button
                onClick={handleAddToCart}
                className="w-full py-3 rounded-xl bg-white hover:bg-[#FAF7F2] text-[#2B1518] border border-[#B08D57]/40 text-xs sm:text-sm font-sans font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                {justAdded ? (
                  <>
                    <Check size={16} weight="bold" className="text-[#B08D57]" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <Tote size={16} weight="regular" className="text-[#B08D57]" />
                    <span>Add to Cart & Continue Shopping</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { CartItem, OrderFormState } from '../types/footwear';
import { ShoeArtwork } from './ShoeArtwork';
import { formatNaira, DELIVERY_FEES, generateCartWhatsAppUrl } from '../utils/whatsapp';
import {
  X,
  Trash,
  WhatsappLogo,
  ArrowRight,
  Tote,
  Minus,
  Plus,
  Truck,
  Lightning,
  MapPin,
  ShieldCheck,
} from '@phosphor-icons/react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryState, setDeliveryState] = useState('Lagos Mainland');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryOption, setDeliveryOption] = useState<'standard' | 'express'>('standard');
  const [orderNotes, setOrderNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const itemsSubtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const deliveryFeeConfig = DELIVERY_FEES[deliveryState] || DELIVERY_FEES['Lagos Mainland'];
  const deliveryFee = items.length === 0 ? 0 : deliveryFeeConfig[deliveryOption];
  const grandTotal = itemsSubtotal + deliveryFee;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      setErrorMsg('Your cart is empty. Please add a pair of shoes first.');
      return;
    }

    if (!customerName.trim()) {
      setErrorMsg('Please enter your full name so we know who is ordering.');
      return;
    }

    if (!customerPhone.trim()) {
      setErrorMsg('Please enter your phone number so delivery dispatch can reach you.');
      return;
    }

    if (!deliveryAddress.trim()) {
      setErrorMsg('Please enter your street address / location in Nigeria.');
      return;
    }

    setErrorMsg('');

    const formState: OrderFormState = {
      customerName,
      customerPhone,
      deliveryState,
      deliveryAddress,
      deliveryOption,
      orderNotes,
    };

    const url = generateCartWhatsAppUrl(items, formState, deliveryFee, grandTotal);
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div
        className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#2B1518]/12 flex items-center justify-between bg-[#FAF7F2]">
          <div>
            <h2 className="font-serif text-2xl text-[#2B1518] font-normal">
              Your Cart
            </h2>
            <p className="text-xs font-sans font-medium text-[#B08D57] mt-0.5">
              Direct checkout via WhatsApp · Fast delivery across Nigeria
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-black/5 text-[#2B1518] cursor-pointer"
            aria-label="Close cart"
          >
            <X size={20} weight="regular" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Cart Items List */}
          {items.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-[#E8DCC8] flex items-center justify-center text-[#2B1518]">
                <Tote size={32} weight="light" className="text-[#2B1518]" />
              </div>
              <p className="font-serif text-lg text-[#2B1518]">Your cart is empty</p>
              <p className="text-xs font-sans text-[#2B1518]/60 mt-1 mb-5">
                Take a look at our handmade leather slides or imported kicks.
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-[#2B1518] text-[#E8DCC8] border border-[#B08D57]/40 text-xs font-sans font-semibold cursor-pointer"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-sans text-[#2B1518]/70 pb-2 border-b border-slate-100">
                <span>Items ({items.length})</span>
                <button
                  onClick={onClearCart}
                  className="text-red-700 hover:underline text-[11px] font-sans font-medium cursor-pointer"
                >
                  Clear all
                </button>
              </div>

              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3.5 p-3 rounded-xl bg-[#FAF7F2] border border-[#2B1518]/10"
                >
                  {/* Miniature Image */}
                  <div className="w-16 h-16 rounded-lg bg-white overflow-hidden shrink-0 border border-[#2B1518]/10">
                    <ShoeArtwork
                      type={item.product.illustrationKey}
                      imageUrl={item.product.imageUrl}
                      alt={item.product.name}
                      colorHex={
                        item.product.colors.find((c) => c.name === item.selectedColor)?.hex ||
                        '#2B1518'
                      }
                      hoverZoom={false}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-sans font-medium text-[#2B1518] truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-[11px] font-sans text-[#2B1518]/70">
                      Size: EU {item.selectedSize} · {item.selectedColor}
                    </p>
                    <p className="text-xs font-sans font-semibold text-[#2B1518] mt-1">
                      {formatNaira(item.product.price * item.quantity)}
                    </p>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-slate-300 rounded-md bg-white">
                    <button
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="p-1.5 text-xs font-sans font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={11} weight="bold" />
                    </button>
                    <span className="px-2 text-xs font-sans font-medium">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="p-1.5 text-xs font-sans font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus size={11} weight="bold" />
                    </button>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                    title="Remove item"
                    aria-label="Remove item"
                  >
                    <Trash size={15} weight="regular" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Delivery & Customer Details Form */}
          {items.length > 0 && (
            <form onSubmit={handleCheckout} className="space-y-4 pt-4 border-t border-slate-200">
              <h3 className="text-xs font-sans font-medium text-[#B08D57] uppercase tracking-wider">
                Delivery Details
              </h3>

              {errorMsg && (
                <div className="p-3 rounded-lg bg-red-50 text-red-700 text-xs font-sans font-medium border border-red-200">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-sans font-medium text-[#2B1518] mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Babatunde Adeleke"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 font-sans text-xs focus:outline-none focus:border-[#B08D57]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-sans font-medium text-[#2B1518] mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 08012345678"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 font-sans text-xs focus:outline-none focus:border-[#B08D57]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-sans font-medium text-[#2B1518] mb-1">
                  Delivery City / State *
                </label>
                <select
                  value={deliveryState}
                  onChange={(e) => setDeliveryState(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 font-sans text-xs focus:outline-none focus:border-[#B08D57] bg-white text-[#2B1518]"
                >
                  {Object.keys(DELIVERY_FEES).map((state) => (
                    <option key={state} value={state}>
                      {state} ({formatNaira(DELIVERY_FEES[state].standard)} delivery)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-sans font-medium text-[#2B1518] mb-1">
                  Delivery Address / Landmark *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Street name, house number, estate name, nearest bus-stop"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 font-sans text-xs focus:outline-none focus:border-[#B08D57]"
                />
              </div>

              {/* Delivery Speed Selector */}
              <div>
                <label className="block text-[11px] font-sans font-medium text-[#2B1518] mb-1.5">
                  Delivery Speed:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDeliveryOption('standard')}
                    className={`p-2.5 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                      deliveryOption === 'standard'
                        ? 'border-[#B08D57] bg-[#E8DCC8]/30 ring-1 ring-[#B08D57]'
                        : 'border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <Truck size={15} weight="regular" className="text-[#B08D57]" />
                      <p className="font-sans font-semibold text-[#2B1518]">Standard Delivery</p>
                    </div>
                    <p className="text-[11px] font-sans text-[#2B1518]/70 mt-0.5">
                      {formatNaira(deliveryFeeConfig.standard)} · 24-48 hrs in Lagos
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryOption('express')}
                    className={`p-2.5 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                      deliveryOption === 'express'
                        ? 'border-[#B08D57] bg-[#E8DCC8]/30 ring-1 ring-[#B08D57]'
                        : 'border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <Lightning size={15} weight="regular" className="text-[#B08D57]" />
                      <p className="font-sans font-semibold text-[#2B1518]">Express Same-Day</p>
                    </div>
                    <p className="text-[11px] font-sans text-[#2B1518]/70 mt-0.5">
                      {formatNaira(deliveryFeeConfig.express)} · Priority Rider
                    </p>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-sans font-medium text-[#2B1518] mb-1">
                  Any Special Note for Us? (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Call before coming, my foot is slightly wide"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 font-sans text-xs focus:outline-none focus:border-[#B08D57]"
                />
              </div>
            </form>
          )}
        </div>

        {/* Footer with Price breakdown & WhatsApp CTA */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#2B1518]/12 bg-[#FAF7F2] space-y-3">
            <div className="space-y-1.5 text-xs font-sans text-[#2B1518]/80">
              <div className="flex justify-between">
                <span>Items Subtotal:</span>
                <span className="font-sans font-semibold">{formatNaira(itemsSubtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery ({deliveryState}):</span>
                <span className="font-sans font-semibold">{formatNaira(deliveryFee)}</span>
              </div>
              <div className="flex justify-between text-sm font-sans font-semibold text-[#2B1518] pt-1.5 border-t border-[#2B1518]/10">
                <span>Total Payable:</span>
                <span className="font-sans font-bold">{formatNaira(grandTotal)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-white border border-[#20BA5A] text-sm font-sans font-semibold flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/25 transition-all hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
            >
              <WhatsappLogo size={18} weight="regular" className="text-white" />
              <span>Send Order to WhatsApp</span>
              <ArrowRight size={16} weight="regular" />
            </button>

            <p className="text-[11px] font-sans text-center text-[#2B1518]/60 flex items-center justify-center gap-1.5">
              <ShieldCheck size={14} weight="regular" className="text-[#B08D57]" />
              <span>Opens WhatsApp with pre-filled items & address. We reply promptly!</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

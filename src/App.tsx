/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Product, CartItem } from './types/footwear';
import { PRODUCTS } from './data/products';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { CraftStory } from './components/CraftStory';
import { SocialAndReviews } from './components/SocialAndReviews';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { WhatsAppOrderModal } from './components/WhatsAppOrderModal';
import { CartDrawer } from './components/CartDrawer';
import { CustomShoeModal } from './components/CustomShoeModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { BATA_WHATSAPP_NUMBER } from './utils/whatsapp';
import { WhatsappLogo } from '@phosphor-icons/react';

export default function App() {
  // Cart state persisted to localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('bata_cart_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('bata_cart_items', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  // Selected filters and modals state
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);
  const [quickOrderProduct, setQuickOrderProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Cart operations
  const handleAddToCart = (
    product: Product,
    size: number,
    color: string,
    quantity: number = 1
  ) => {
    const itemId = `${product.id}-${size}-${color}`;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prev,
          {
            id: itemId,
            product,
            selectedSize: size,
            selectedColor: color,
            quantity,
          },
        ];
      }
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#F7F3EB] text-[#2B1518] font-sans overflow-x-hidden relative">
      {/* Top Navigation Bar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenCustomModal={() => setIsCustomModalOpen(true)}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        onScrollToCatalog={scrollToCatalog}
      />

      {/* Main Content */}
      <main className="flex-1 w-full overflow-x-hidden">
        {/* Hero Section */}
        <Hero
          onSelectProduct={(product) => setDetailProduct(product)}
          onOpenQuickOrder={(product) => setQuickOrderProduct(product)}
          onOpenCustomModal={() => setIsCustomModalOpen(true)}
          onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
          onFilterCategory={(cat) => {
            setSelectedCategory(cat);
            scrollToCatalog();
          }}
          onAddToCart={(product, size, color) => handleAddToCart(product, size, color, 1)}
        />

        {/* Product Catalog */}
        <ProductCatalog
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
          onSelectProduct={(product) => setDetailProduct(product)}
          onOpenQuickOrder={(product) => setQuickOrderProduct(product)}
          onAddToCart={(product, size, color) => handleAddToCart(product, size, color, 1)}
        />

        {/* Craftsmanship & Workshop Story */}
        <CraftStory onOpenCustomModal={() => setIsCustomModalOpen(true)} />

        {/* Reviews & Social Media Links */}
        <SocialAndReviews />
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          scrollToCatalog();
        }}
        onOpenCustomModal={() => setIsCustomModalOpen(true)}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
      />

      {/* Floating WhatsApp Quick Action Button */}
      <a
        href={`https://wa.me/${BATA_WHATSAPP_NUMBER}?text=${encodeURIComponent(
          'Hello Bàtà! 👞 I have a question about your footwear.'
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5 px-4.5 py-3 rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/30 hover:bg-[#20BA5A] hover:scale-105 active:scale-95 transition-all text-xs font-sans font-semibold border-2 border-white/80"
        aria-label="Chat directly on WhatsApp"
      >
        <WhatsappLogo size={20} weight="regular" className="text-white" />
        <span className="hidden sm:inline tracking-wide font-sans font-semibold">Chat on WhatsApp</span>
      </a>

      {/* Modals & Slide-over Drawers */}
      <ProductDetailModal
        product={detailProduct}
        onClose={() => setDetailProduct(null)}
        onAddToCart={(product, size, color, qty) => {
          handleAddToCart(product, size, color, qty);
          setDetailProduct(null);
          setIsCartOpen(true);
        }}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
      />

      <WhatsAppOrderModal
        product={quickOrderProduct}
        onClose={() => setQuickOrderProduct(null)}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      <CustomShoeModal
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
      />

      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />
    </div>
  );
}

import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types/footwear';
import { ShoeArtwork } from './ShoeArtwork';
import { formatNaira } from '../utils/whatsapp';
import { Eye, Tote, MagnifyingGlass, Check, SlidersHorizontal } from '@phosphor-icons/react';

interface ProductCatalogProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onSelectProduct: (product: Product) => void;
  onOpenQuickOrder: (product: Product) => void;
  onAddToCart: (product: Product, size: number, color: string) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  selectedCategory,
  onSelectCategory,
  onSelectProduct,
  onOpenQuickOrder,
  onAddToCart,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSizeFilter, setSelectedSizeFilter] = useState<number | null>(null);
  const [activeColorPerProduct, setActiveColorPerProduct] = useState<Record<string, string>>({});
  const [addedProductNotification, setAddedProductNotification] = useState<string | null>(null);

  const availableSizes = [39, 40, 41, 42, 43, 44, 45, 46];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'slides' && (product.style === 'slides' || product.style === 'sandals')) {
          // match style
        } else if (selectedCategory === 'loafers' && (product.style === 'loafers' || product.style === 'oxford' || product.style === 'mules')) {
          // match style
        } else if (product.category !== selectedCategory) {
          return false;
        }
      }

      if (selectedSizeFilter && !product.sizes.includes(selectedSizeFilter)) {
        return false;
      }

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesMaterial = product.material.toLowerCase().includes(query);
        const matchesCat = product.categoryLabel.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesMaterial && !matchesCat) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategory, selectedSizeFilter, searchQuery]);

  const handleColorChange = (productId: string, colorHex: string) => {
    setActiveColorPerProduct((prev) => ({
      ...prev,
      [productId]: colorHex,
    }));
  };

  const handleQuickAdd = (product: Product) => {
    const defaultSize = product.sizes[2] || product.sizes[0];
    const defaultColor = activeColorPerProduct[product.id]
      ? product.colors.find((c) => c.hex === activeColorPerProduct[product.id])?.name || product.colors[0].name
      : product.colors[0].name;

    onAddToCart(product, defaultSize, defaultColor);

    setAddedProductNotification(product.id);
    setTimeout(() => {
      setAddedProductNotification(null);
    }, 2000);
  };

  return (
    <section id="catalog" className="py-14 sm:py-20 bg-[#F7F3EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#2B1518]/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-sans font-medium text-[#B08D57] uppercase tracking-wider mb-1.5">
              <span>Full Footwear Collection</span>
              <span aria-hidden="true">·</span>
              <span>Direct From Workshop & Verified Imports</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#2B1518] font-normal tracking-tight">
              Find Your <span className="italic text-[#B08D57]">Perfect Pair</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base font-sans font-normal text-[#2B1518]/70 max-w-xl leading-relaxed">
              From pure leather slides made right here in Lagos to imported sneakers for everyday comfort.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <MagnifyingGlass size={17} weight="light" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#2B1518]/50" />
            <input
              type="text"
              placeholder="Search slides, loafers, sneakers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#2B1518]/20 font-sans text-xs sm:text-sm text-[#2B1518] focus:outline-none focus:border-[#B08D57] focus:ring-1 focus:ring-[#B08D57] placeholder:text-[#2B1518]/40"
            />
          </div>
        </div>

        {/* Filter Bar */}
        <div className="py-5 sm:py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-2 sm:pb-0 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
            <button
              onClick={() => onSelectCategory('all')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                selectedCategory === 'all'
                  ? 'bg-[#2B1518] text-[#E8DCC8] border border-[#B08D57]/40 shadow-xs'
                  : 'bg-white text-[#2B1518]/80 hover:bg-[#E8DCC8]/50 border border-[#2B1518]/15'
              }`}
            >
              All Shoes ({PRODUCTS.length})
            </button>
            <button
              onClick={() => onSelectCategory('handmade_bata')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                selectedCategory === 'handmade_bata'
                  ? 'bg-[#2B1518] text-[#E8DCC8] border border-[#B08D57]/40 shadow-xs'
                  : 'bg-white text-[#2B1518]/80 hover:bg-[#E8DCC8]/50 border border-[#2B1518]/15'
              }`}
            >
              Handmade by Bàtà
            </button>
            <button
              onClick={() => onSelectCategory('artisan')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                selectedCategory === 'artisan'
                  ? 'bg-[#2B1518] text-[#E8DCC8] border border-[#B08D57]/40 shadow-xs'
                  : 'bg-white text-[#2B1518]/80 hover:bg-[#E8DCC8]/50 border border-[#2B1518]/15'
              }`}
            >
              Artisan Crafts
            </button>
            <button
              onClick={() => onSelectCategory('imported')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                selectedCategory === 'imported'
                  ? 'bg-[#2B1518] text-[#E8DCC8] border border-[#B08D57]/40 shadow-xs'
                  : 'bg-white text-[#2B1518]/80 hover:bg-[#E8DCC8]/50 border border-[#2B1518]/15'
              }`}
            >
              Imported Footwear
            </button>
            <button
              onClick={() => onSelectCategory('slides')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                selectedCategory === 'slides'
                  ? 'bg-[#2B1518] text-[#E8DCC8] border border-[#B08D57]/40 shadow-xs'
                  : 'bg-white text-[#2B1518]/80 hover:bg-[#E8DCC8]/50 border border-[#2B1518]/15'
              }`}
            >
              Slides & Sandals
            </button>
            <button
              onClick={() => onSelectCategory('loafers')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                selectedCategory === 'loafers'
                  ? 'bg-[#2B1518] text-[#E8DCC8] border border-[#B08D57]/40 shadow-xs'
                  : 'bg-white text-[#2B1518]/80 hover:bg-[#E8DCC8]/50 border border-[#2B1518]/15'
              }`}
            >
              Loafers & Corporate
            </button>
          </div>

          {/* Size Quick Filter */}
          <div className="flex items-center gap-1.5 shrink-0 max-w-full overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
            <span className="text-xs font-sans font-medium text-[#2B1518]/70 flex items-center gap-1 shrink-0">
              <SlidersHorizontal size={13} weight="regular" className="text-[#B08D57]" />
              <span>Size:</span>
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setSelectedSizeFilter(null)}
                className={`px-2 py-1 rounded text-[11px] font-sans font-medium transition-colors cursor-pointer shrink-0 ${
                  selectedSizeFilter === null
                    ? 'bg-[#2B1518] text-[#E8DCC8]'
                    : 'bg-white text-[#2B1518]/70 hover:bg-[#E8DCC8]/50 border border-[#2B1518]/15'
                }`}
              >
                All
              </button>
              {availableSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSizeFilter(selectedSizeFilter === size ? null : size)}
                  className={`w-7 h-7 rounded text-[11px] font-sans transition-colors cursor-pointer shrink-0 flex items-center justify-center ${
                    selectedSizeFilter === size
                      ? 'bg-[#B08D57] text-[#2B1518] font-semibold shadow-xs'
                      : 'bg-white text-[#2B1518]/70 hover:bg-[#E8DCC8]/50 border border-[#2B1518]/15 font-medium'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#2B1518]/10 p-8">
            <p className="font-serif text-xl text-[#2B1518]">No shoes match your search</p>
            <p className="text-xs text-[#2B1518]/60 mt-1 mb-4">
              Try clearing the size filter or search query.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedSizeFilter(null);
                onSelectCategory('all');
              }}
              className="px-4 py-2 rounded-xl bg-[#2B1518] text-[#E8DCC8] border border-[#B08D57]/40 text-xs font-semibold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-7">
            {filteredProducts.map((product) => {
              const activeColorHex =
                activeColorPerProduct[product.id] || product.colors[0]?.hex || '#2B1518';
              const isAdded = addedProductNotification === product.id;

              return (
                <div
                  key={product.id}
                  className="aura text-[#B08D57] bg-[#E8DCC8] group transition-all duration-300"
                >
                  <div className="card lg:card-side bg-base-100 shadow-sm border border-[#2B1518]/10 overflow-hidden">
                    <figure
                      onClick={() => onSelectProduct(product)}
                      className="cursor-pointer relative overflow-hidden bg-[#FAF7F2] aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:w-5/12 shrink-0 flex items-center justify-center p-2"
                    >
                      <ShoeArtwork
                        type={product.illustrationKey}
                        imageUrl={product.imageUrl}
                        alt={product.name}
                        colorHex={activeColorHex}
                      />

                      {/* Quiet unboxed category kicker */}
                      <div className="absolute top-3 left-3 bg-[#E8DCC8]/95 backdrop-blur-xs px-2.5 py-1 rounded text-[11px] font-sans font-medium text-[#2B1518] border border-[#B08D57]/30">
                        {product.categoryLabel}
                      </div>

                      {product.originalPrice && (
                        <div className="absolute top-3 right-3 bg-[#2B1518] text-[#E8DCC8] border border-[#B08D57]/40 px-2 py-0.5 rounded text-[10px] font-sans font-medium tracking-wide">
                          Save {formatNaira(product.originalPrice - product.price)}
                        </div>
                      )}
                    </figure>

                    <div className="card-body p-4 sm:p-5 flex flex-col justify-between lg:w-7/12">
                      <div>
                        {/* Color Swatches and Lead Time */}
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[11px] font-sans text-[#2B1518]/50 mr-1">Colors:</span>
                            {product.colors.map((color) => (
                              <button
                                key={color.name}
                                onClick={() => handleColorChange(product.id, color.hex)}
                                title={color.name}
                                className={`w-4 h-4 rounded-full border transition-all cursor-pointer ${
                                  activeColorHex === color.hex
                                    ? 'ring-2 ring-[#B08D57] ring-offset-1 scale-110'
                                    : 'opacity-70 hover:opacity-100'
                                }`}
                                style={{ backgroundColor: color.hex }}
                              />
                            ))}
                          </div>

                          <span className="text-[11px] font-sans text-[#2B1518]/60 shrink-0">
                            {product.leadTime.split('·')[0]}
                          </span>
                        </div>

                        {/* Title as card-title */}
                        <h2
                          onClick={() => onSelectProduct(product)}
                          className="card-title font-sans font-medium text-base sm:text-lg text-[#2B1518] tracking-tight group-hover:text-[#B08D57] transition-colors cursor-pointer line-clamp-1"
                        >
                          {product.name}
                        </h2>

                        {/* Short Description */}
                        <p className="text-xs font-sans text-[#2B1518]/70 line-clamp-2 mt-1 mb-2.5 leading-relaxed">
                          {product.description}
                        </p>

                        {/* Material & Sole Spec */}
                        <div className="flex items-center gap-2 text-[11px] font-sans text-[#2B1518]/60 mb-2 truncate">
                          <span>{product.material}</span>
                          <span aria-hidden="true">·</span>
                          <span>{product.soleType}</span>
                        </div>
                      </div>

                      {/* Card Bottom Area */}
                      <div>
                        {/* Price and Sizes */}
                        <div className="flex items-baseline justify-between pt-2.5 border-t border-[#2B1518]/10 mb-3 gap-2">
                          <div className="flex items-baseline gap-2 shrink-0">
                            <span className="text-lg sm:text-xl font-sans font-semibold text-[#2B1518] tracking-tight">
                              {formatNaira(product.price)}
                            </span>
                            {product.originalPrice && (
                              <span className="text-xs font-sans text-[#2B1518]/40 line-through">
                                {formatNaira(product.originalPrice)}
                              </span>
                            )}
                          </div>

                          <div className="text-[11px] font-sans text-[#2B1518]/60 text-right truncate">
                            <span>Sizes {product.sizes[0]}–{product.sizes[product.sizes.length - 1]}</span>
                          </div>
                        </div>

                        {/* Action Buttons inside card-actions */}
                        <div className="card-actions justify-end grid grid-cols-2 gap-2">
                          <button
                            onClick={() => onSelectProduct(product)}
                            className="px-2.5 sm:px-3 py-2.5 rounded-xl bg-[#F7F3EB] hover:bg-[#E8DCC8] text-[#2B1518] border border-[#2B1518]/20 hover:border-[#B08D57] text-xs font-sans font-semibold transition-all flex items-center justify-center gap-1.5 hover:scale-[1.02] active:scale-[0.98] cursor-pointer min-w-0"
                          >
                            <Eye size={15} weight="regular" className="text-[#B08D57] shrink-0" />
                            <span className="truncate">View Details</span>
                          </button>

                          <button
                            onClick={() => handleQuickAdd(product)}
                            className={`px-2.5 sm:px-3 py-2.5 rounded-xl text-xs font-sans font-semibold border transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs min-w-0 ${
                              isAdded
                                ? 'bg-[#E8DCC8] text-[#2B1518] border-[#B08D57]'
                                : 'bg-[#2B1518] hover:bg-[#402024] text-[#E8DCC8] border-[#2B1518] hover:scale-[1.02] active:scale-[0.98]'
                            }`}
                          >
                            {isAdded ? (
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
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

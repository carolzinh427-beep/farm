import React, { useRef, useState, useEffect } from 'react';
import { Product, CartItem } from '../types';
import { ProductCard } from './ProductCard';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

interface ProductCarouselProps {
  title: string;
  subtitle?: string;
  badge?: string;
  products: Product[];
  onAddToCart: (product: Product) => void;
  cartItems: CartItem[];
  onViewAll?: () => void;
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({
  title,
  subtitle,
  badge,
  products,
  onAddToCart,
  cartItems,
  onViewAll
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check scroll position to update arrow states
  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll, { passive: true });
      window.addEventListener('resize', checkScroll);
    }
    return () => {
      if (el) el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [products]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    // Scroll by ~80% of visible container width for natural pagination
    const scrollAmount = container.clientWidth * 0.85;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <section className="w-full py-2 sm:py-3">
      {/* Header with Title on Left and Navigation Arrows on Right */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          {badge && (
            <span className="hidden sm:inline-flex items-center gap-1 bg-red-100 text-red-700 text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-wider">
              {badge}
            </span>
          )}
          <div>
            <h2 className="text-base sm:text-lg md:text-xl font-black text-slate-900 tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Navigation Arrows: circular buttons ← and → side by side (exact Drogasil style) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {onViewAll && (
            <button
              onClick={onViewAll}
              className="text-xs font-bold text-red-600 hover:text-red-700 mr-2 hidden md:block"
            >
              Ver todos
            </button>
          )}

          {/* Previous Arrow Button */}
          <button
            onClick={() => handleScroll('left')}
            disabled={!canScrollLeft}
            aria-label="Fileira anterior"
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center transition-all bg-white shadow-xs ${
              canScrollLeft
                ? 'border-slate-300 hover:border-slate-800 text-slate-700 hover:text-slate-950 active:scale-95 cursor-pointer'
                : 'border-slate-200 text-slate-300 cursor-not-allowed opacity-40'
            }`}
          >
            <ArrowLeft className="w-4 h-4 stroke-[2]" />
          </button>

          {/* Next Arrow Button */}
          <button
            onClick={() => handleScroll('right')}
            disabled={!canScrollRight}
            aria-label="Próxima fileira"
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center transition-all bg-white shadow-xs ${
              canScrollRight
                ? 'border-slate-300 hover:border-slate-800 text-slate-700 hover:text-slate-950 active:scale-95 cursor-pointer'
                : 'border-slate-200 text-slate-300 cursor-not-allowed opacity-40'
            }`}
          >
            <ArrowRight className="w-4 h-4 stroke-[2]" />
          </button>
        </div>
      </div>

      {/* Horizontal Carousel Container: 6 cards on desktop, 3 cards on mobile */}
      <div
        ref={scrollRef}
        className="flex gap-2 sm:gap-3 overflow-x-auto scroll-smooth scrollbar-none snap-x snap-mandatory pb-2 -mx-1 px-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="snap-start shrink-0 w-[calc((100%-16px)/3)] sm:w-[calc((100%-36px)/4)] md:w-[calc((100%-48px)/5)] lg:w-[calc((100%-60px)/6)]"
          >
            <ProductCard
              product={product}
              onAddToCart={onAddToCart}
              isInCart={cartItems.some((i) => i.id === product.id)}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface CareCategory {
  id: string;
  title: string;
  image: string;
  category: string;
}

const CARE_CATEGORIES: CareCategory[] = [
  {
    id: 'asiaticos',
    title: 'Produtos Asiáticos',
    image: '/categories/asiaticos.jpg',
    category: 'dermocosmeticos'
  },
  {
    id: 'pele',
    title: 'Cuidados com a Pele',
    image: '/categories/pele.jpg',
    category: 'dermocosmeticos'
  },
  {
    id: 'inverno',
    title: 'Cuidados no Inverno',
    image: '/categories/inverno.jpg',
    category: 'cuidados'
  },
  {
    id: 'perfumes',
    title: 'Perfumes & Fragrâncias',
    image: '/categories/perfumes.jpg',
    category: 'cuidados'
  },
  {
    id: 'solar',
    title: 'Proteção Solar',
    image: '/categories/solar.jpg',
    category: 'dermocosmeticos'
  },
  {
    id: 'bebe',
    title: 'Mamãe e Bebê',
    image: '/categories/bebe.jpg',
    category: 'mamae-bebe'
  }
];

interface CareBannerCarouselProps {
  onSelectCategory: (category: string) => void;
}

export const CareBannerCarousel: React.FC<CareBannerCarouselProps> = ({ onSelectCategory }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    let ticking = false;
    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            const newCanLeft = scrollLeft > 15;
            const newCanRight = scrollLeft < scrollWidth - clientWidth - 15;
            setCanScrollLeft((prev) => (prev !== newCanLeft ? newCanLeft : prev));
            setCanScrollRight((prev) => (prev !== newCanRight ? newCanRight : prev));
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    onScroll();
    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const handleScroll = useCallback((direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollAmount = container.clientWidth * 0.75;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  }, []);

  return (
    <section className="w-full py-2 sm:py-3 contain-layout">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-2 sm:mb-2.5 px-1">
        <h2 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 tracking-tight">
          Cuidados que você merece
        </h2>

        {/* Circular Arrows */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => handleScroll('left')}
            disabled={!canScrollLeft}
            aria-label="Anterior"
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center transition-all bg-white shadow-xs ${
              canScrollLeft
                ? 'border-slate-300 hover:border-slate-800 text-slate-700 hover:text-slate-950 active:scale-95 cursor-pointer'
                : 'border-slate-200 text-slate-300 cursor-not-allowed opacity-40'
            }`}
          >
            <ArrowLeft className="w-4 h-4 stroke-[2]" />
          </button>

          <button
            onClick={() => handleScroll('right')}
            disabled={!canScrollRight}
            aria-label="Próximo"
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

      {/* Carousel of Cards */}
      <div
        ref={scrollRef}
        className="flex gap-2.5 sm:gap-4 overflow-x-auto scroll-smooth scrollbar-none snap-x snap-mandatory pb-2 w-full touch-pan-y"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {CARE_CATEGORIES.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectCategory(item.category)}
            className="snap-start shrink-0 w-[calc((100%-16px)/2.2)] sm:w-[calc((100%-36px)/3.5)] md:w-[calc((100%-48px)/4.5)] lg:w-[calc((100%-60px)/5)] bg-white rounded-2xl overflow-hidden border border-slate-200/80 hover:border-slate-300 hover:shadow-lg transition-all duration-200 cursor-pointer group flex flex-col justify-between"
          >
            {/* Upper Lifestyle Image */}
            <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Bottom Pill Label */}
            <div className="bg-[#F4F4F6] group-hover:bg-[#EBEBEF] transition-colors px-3 py-2 sm:py-2.5 flex items-center justify-between gap-2 border-t border-slate-100">
              <span className="text-[11px] sm:text-xs font-black text-slate-900 truncate tracking-tight">
                {item.title}
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-800 shrink-0 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Truck, FileText } from 'lucide-react';

interface HeroSliderProps {
  onOpenPrescription: () => void;
  onSelectCategory: (cat: string) => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ onOpenPrescription, onSelectCategory }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      isBlackFriday: true,
      title: 'BLACK FRIDAY',
      highlight: '60% OFF',
      subtitle: 'A maior queima de preços de saúde no ES com entrega expressa em 1h.',
      actionText: 'Ver Ofertas',
      actionCategory: 'ofertas',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&h=420&fit=crop&crop=center&q=80',
      statText: 'Black Friday 60% OFF',
      statSub: 'Grande Vitória e Interior'
    },
    {
      id: 2,
      isBlackFriday: false,
      title: 'Dermocosméticos de Verão',
      highlight: '',
      subtitle: 'Proteção solar e hidratação com as melhores marcas dermatológicas.',
      actionText: 'Dermocosméticos',
      actionCategory: 'dermocosmeticos',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&h=420&fit=crop&crop=center&q=80',
      statText: 'Leve 2 Pague 1',
      statSub: 'Protetores selecionados'
    },
    {
      id: 3,
      isBlackFriday: false,
      title: 'Farmácia Popular no ES',
      highlight: '',
      subtitle: 'Medicamentos gratuitos para hipertensão e diabetes pelo SUS na VivaBem.',
      actionText: 'Enviar Receita',
      actionCategory: 'prescription',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=420&fit=crop&crop=center&q=80',
      statText: '100% Gratuito',
      statSub: 'Atendimento WhatsApp'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[currentSlide];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 pt-2 sm:pt-3 w-full">
      {/* Compact Main Banner Slider (Optimized Height for Mobile & Desktop) */}
      <div 
        className={`relative overflow-hidden rounded-xl sm:rounded-2xl shadow-sm transition-all duration-700 ${
          slide.isBlackFriday 
            ? 'bg-black text-white border border-red-600/40' 
            : 'bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 text-white'
        }`}
      >
        {/* Ambient Red & Green Accents for Black Friday */}
        {slide.isBlackFriday && (
          <>
            <div className="absolute -left-10 -top-10 w-40 h-40 bg-red-600/20 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-emerald-600/20 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-zinc-950/90 to-black/80 pointer-events-none" />
          </>
        )}

        {/* Compact Grid: items-center with reduced vertical height */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 items-center p-3.5 sm:p-5 lg:p-6 min-h-[170px] sm:min-h-[200px] md:min-h-[230px] gap-3 sm:gap-4">
          {/* Left Text Column */}
          <div className="md:col-span-7 space-y-1.5 sm:space-y-2">
            {slide.isBlackFriday && (
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="bg-red-600 text-white font-black text-[9px] sm:text-[10px] px-2 py-0.5 rounded tracking-widest uppercase">
                  Black Friday
                </span>
                <span className="text-emerald-400 font-black text-[10px] sm:text-xs tracking-wider uppercase">
                  60% OFF
                </span>
              </div>
            )}

            <h1 className="text-lg sm:text-2xl lg:text-3xl font-black tracking-tight leading-snug">
              {slide.isBlackFriday ? (
                <>
                  <span className="text-white">BLACK FRIDAY: </span>
                  <span className="text-red-500">60% </span>
                  <span className="text-emerald-400">OFF</span>
                </>
              ) : (
                slide.title
              )}
            </h1>

            <p className="text-slate-200 text-xs sm:text-sm font-normal line-clamp-2 leading-relaxed max-w-lg">
              {slide.subtitle}
            </p>

            <div className="pt-1 flex items-center gap-2">
              <button
                onClick={() => {
                  if (slide.actionCategory === 'prescription') {
                    onOpenPrescription();
                  } else {
                    onSelectCategory(slide.actionCategory);
                  }
                }}
                className={`font-black text-[11px] sm:text-xs px-3.5 py-1.5 sm:py-2 rounded-lg shadow-sm transition-all flex items-center gap-1.5 cursor-pointer ${
                  slide.isBlackFriday
                    ? 'bg-red-600 hover:bg-red-700 text-white active:scale-95'
                    : 'bg-white hover:bg-slate-100 text-red-700 active:scale-95'
                }`}
              >
                <span>{slide.actionText}</span>
              </button>

              <button
                onClick={onOpenPrescription}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-[11px] sm:text-xs px-3 py-1.5 sm:py-2 rounded-lg border border-emerald-500/30 transition-all flex items-center gap-1 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Receita</span>
              </button>
            </div>
          </div>

          {/* Right Visual Box Column (Compact on Desktop, Hidden or Slim on Mobile) */}
          <div className="hidden md:flex md:col-span-5 items-center justify-center relative">
            <div className={`relative w-full max-w-[320px] h-[150px] lg:h-[170px] rounded-xl overflow-hidden shadow-md border group flex-shrink-0 ${
              slide.isBlackFriday ? 'border-red-600/50' : 'border-white/20'
            }`}>
              <img 
                src={slide.image} 
                alt={slide.title}
                className="w-full h-full object-cover object-center block group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2 left-2 right-2 z-10">
                <div className={`rounded-lg p-1.5 sm:p-2 w-full shadow-xs flex items-center justify-between border ${
                  slide.isBlackFriday 
                    ? 'bg-zinc-950/95 text-white border-red-600/40' 
                    : 'bg-white text-slate-900 border-slate-100'
                }`}>
                  <div>
                    <div className="text-[10px] font-black text-red-500 uppercase tracking-wider leading-none">{slide.statText}</div>
                    <div className="text-[10px] font-semibold text-emerald-400 leading-tight mt-0.5">{slide.statSub}</div>
                  </div>
                  <div className="w-6 h-6 rounded bg-emerald-600/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                    <Truck className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
          className="absolute left-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-colors z-20 border border-white/10 cursor-pointer"
          aria-label="Slide anterior"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-colors z-20 border border-white/10 cursor-pointer"
          aria-label="Próximo slide"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1 rounded-full transition-all cursor-pointer ${
                currentSlide === idx ? 'w-5 bg-red-600' : 'w-1.5 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Ir para slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

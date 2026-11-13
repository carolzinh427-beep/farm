import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Truck, ShieldCheck, HeartPulse, FileText, Clock, Tag } from 'lucide-react';

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
      subtitle: 'A maior queima de preços de saúde no Espírito Santo: medicamentos, dermocosméticos e vitaminas com entrega expressa em 1h.',
      actionText: 'Aproveitar Black Friday',
      actionCategory: 'ofertas',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&h=540&fit=crop&crop=center&q=80',
      statText: 'Black Friday 60% OFF',
      statSub: 'Vitória • Vila Velha • Serra'
    },
    {
      id: 2,
      isBlackFriday: false,
      title: 'Dermocosméticos e Cuidados de Verão',
      highlight: '',
      subtitle: 'Proteção solar e hidratação para curtir o litoral capixaba com as melhores marcas dermatológicas.',
      actionText: 'Conferir Dermocosméticos',
      actionCategory: 'dermocosmeticos',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&h=540&fit=crop&crop=center&q=80',
      statText: 'Leve 2 Pague 1',
      statSub: 'Em protetores selecionados'
    },
    {
      id: 3,
      isBlackFriday: false,
      title: 'Medicamentos pelo Farmácia Popular',
      highlight: '',
      subtitle: 'Tratamentos para hipertensão, diabetes e asma com gratuidade pelo SUS direto na VivaBem Farmácia.',
      actionText: 'Enviar Receita Médica',
      actionCategory: 'prescription',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=540&fit=crop&crop=center&q=80',
      statText: '100% Gratuito',
      statSub: 'Consulte pelo WhatsApp'
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
    <div className="max-w-7xl mx-auto px-4 pt-3 sm:pt-4">
      {/* Dynamic Main Slide */}
      <div 
        className={`relative overflow-hidden rounded-2xl shadow-md transition-all duration-700 ${
          slide.isBlackFriday 
            ? 'bg-black text-white border-2 border-red-600/40' 
            : 'bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 text-white'
        }`}
      >
        {/* Ambient Red & Green Accents for Black Friday */}
        {slide.isBlackFriday && (
          <>
            <div className="absolute -left-20 -top-20 w-80 h-80 bg-red-600/25 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-emerald-600/25 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-zinc-950/90 to-black/80 pointer-events-none" />
          </>
        )}

        <div className="relative z-10 grid md:grid-cols-12 items-center p-6 sm:p-8 lg:p-10 min-h-[340px] md:min-h-[380px] gap-6">
          {/* Left Text Column */}
          <div className="md:col-span-7 space-y-3">
            {slide.isBlackFriday && (
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-red-600 text-white font-black text-[11px] sm:text-xs px-2.5 py-0.5 rounded tracking-widest uppercase">
                  Black Friday
                </span>
                <span className="text-emerald-400 font-black text-xs sm:text-sm tracking-wider uppercase">
                  60% de Desconto
                </span>
              </div>
            )}

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
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

            <p className="text-slate-100 text-sm sm:text-base max-w-xl font-normal leading-relaxed">
              {slide.subtitle}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  if (slide.actionCategory === 'prescription') {
                    onOpenPrescription();
                  } else {
                    onSelectCategory(slide.actionCategory);
                  }
                }}
                className={`font-black text-xs sm:text-sm px-5 py-2.5 sm:py-3 rounded-lg shadow-sm transition-all flex items-center gap-2 ${
                  slide.isBlackFriday
                    ? 'bg-red-600 hover:bg-red-700 text-white active:scale-95'
                    : 'bg-white hover:bg-slate-100 text-red-700 active:scale-95'
                }`}
              >
                <span>{slide.actionText}</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenPrescription}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm px-4 py-2.5 sm:py-3 rounded-lg border border-emerald-500/30 transition-all flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>Envie sua Receita</span>
              </button>
            </div>
          </div>

          {/* Right Visual Box Column (Exact Fixed Dimensions Across All Slides) */}
          <div className="md:col-span-5 flex flex-col items-center justify-center relative">
            <div className={`relative w-full max-w-[380px] h-[240px] sm:h-[260px] rounded-xl overflow-hidden shadow-xl border group flex-shrink-0 ${
              slide.isBlackFriday ? 'border-red-600/50' : 'border-white/20'
            }`}>
              <img 
                src={slide.image} 
                alt={slide.title}
                className="w-full h-full object-cover object-center block group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 z-10">
                <div className={`rounded-lg p-2.5 w-full shadow-sm flex items-center justify-between border ${
                  slide.isBlackFriday 
                    ? 'bg-zinc-950/95 text-white border-red-600/40' 
                    : 'bg-white text-slate-900 border-slate-100'
                }`}>
                  <div>
                    <div className="text-[11px] font-black text-red-500 uppercase tracking-wider">{slide.statText}</div>
                    <div className="text-[11px] font-semibold text-emerald-400">{slide.statSub}</div>
                  </div>
                  <div className="w-7 h-7 rounded-md bg-emerald-600/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                    <Truck className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
          className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors z-20 border border-white/10"
          aria-label="Slide anterior"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors z-20 border border-white/10"
          aria-label="Próximo slide"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all ${
                currentSlide === idx ? 'w-6 bg-red-600' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Ir para slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

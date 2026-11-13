import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Truck, ShieldCheck, HeartPulse, FileText, Clock } from 'lucide-react';

interface HeroSliderProps {
  onOpenPrescription: () => void;
  onSelectCategory: (cat: string) => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ onOpenPrescription, onSelectCategory }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: 'Até 50% OFF em Vitaminas e Genéricos',
      subtitle: 'Compre com desconto exclusivo e receba em até 1 hora em toda a Grande Vitória e interior do Espírito Santo.',
      bgGradient: 'from-red-700 via-rose-800 to-emerald-950',
      actionText: 'Ver Ofertas do Dia',
      actionCategory: 'ofertas',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&h=540&fit=crop&crop=center&q=80',
      statText: 'Entrega Expressa em 1h',
      statSub: 'Vitória • Vila Velha • Serra'
    },
    {
      id: 2,
      title: 'Dermocosméticos e Cuidados de Verão',
      subtitle: 'Proteção solar e hidratação para curtir o litoral capixaba com as melhores marcas dermatológicas.',
      bgGradient: 'from-emerald-800 via-teal-900 to-slate-900',
      actionText: 'Conferir Dermocosméticos',
      actionCategory: 'dermocosmeticos',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&h=540&fit=crop&crop=center&q=80',
      statText: 'Leve 2 Pague 1',
      statSub: 'Em protetores selecionados'
    },
    {
      id: 3,
      title: 'Medicamentos pelo Farmácia Popular',
      subtitle: 'Tratamentos para hipertensão, diabetes e asma com gratuidade pelo SUS direto na VivaBem Farmácia.',
      bgGradient: 'from-red-800 via-red-900 to-emerald-900',
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
      {/* Dynamic Main Slide (Drogasil Clean Style - No Emojis, No Floating Tags) */}
      <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${slide.bgGradient} text-white shadow-md transition-all duration-700`}>
        <div className="relative z-10 grid md:grid-cols-12 items-center p-6 sm:p-8 lg:p-10 min-h-[340px] md:min-h-[380px] gap-6">
          {/* Left Text Column */}
          <div className="md:col-span-7 space-y-3">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              {slide.title}
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
                className="bg-white hover:bg-slate-100 active:scale-95 text-red-700 font-bold text-xs sm:text-sm px-5 py-2.5 sm:py-3 rounded-lg shadow-sm transition-all flex items-center gap-2"
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
            <div className="relative w-full max-w-[380px] h-[240px] sm:h-[260px] rounded-xl overflow-hidden shadow-xl border border-white/20 group flex-shrink-0">
              <img 
                src={slide.image} 
                alt={slide.title}
                className="w-full h-full object-cover object-center block group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 z-10">
                <div className="bg-white text-slate-900 rounded-lg p-2.5 w-full shadow-sm flex items-center justify-between border border-slate-100">
                  <div>
                    <div className="text-[11px] font-black text-red-600 uppercase tracking-wider">{slide.statText}</div>
                    <div className="text-[11px] font-semibold text-slate-600">{slide.statSub}</div>
                  </div>
                  <div className="w-7 h-7 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
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
          className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors z-20"
          aria-label="Slide anterior"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors z-20"
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
                currentSlide === idx ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Ir para slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Drogasil Signature Quick-Access Strip (No Emojis) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 mt-3">
        <div 
          onClick={onOpenPrescription}
          className="bg-white p-3 rounded-xl border border-slate-200 hover:border-slate-300 transition-all cursor-pointer flex items-center gap-2.5 group"
        >
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0">
            <FileText className="w-4 h-4" />
          </div>
          <div className="leading-tight">
            <div className="text-xs font-bold text-slate-800">Envie sua Receita</div>
            <div className="text-[10px] text-slate-500">Orçamento no WhatsApp</div>
          </div>
        </div>

        <div 
          onClick={() => onSelectCategory('medicamentos')}
          className="bg-white p-3 rounded-xl border border-slate-200 hover:border-slate-300 transition-all cursor-pointer flex items-center gap-2.5 group"
        >
          <div className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="leading-tight">
            <div className="text-xs font-bold text-slate-800">Genéricos com Desconto</div>
            <div className="text-[10px] text-slate-500">EMS, Medley e Eurofarma</div>
          </div>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200 hover:border-slate-300 transition-all flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0">
            <Truck className="w-4 h-4" />
          </div>
          <div className="leading-tight">
            <div className="text-xs font-bold text-slate-800">Frete Grátis no ES</div>
            <div className="text-[10px] text-slate-500">A partir de R$ 79 na Grande Vitória</div>
          </div>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200 hover:border-slate-300 transition-all flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0">
            <HeartPulse className="w-4 h-4" />
          </div>
          <div className="leading-tight">
            <div className="text-xs font-bold text-slate-800">Atenção Farmacêutica</div>
            <div className="text-[10px] text-slate-500">Farmacêutico CRF-ES de plantão</div>
          </div>
        </div>
      </div>
    </div>
  );
};

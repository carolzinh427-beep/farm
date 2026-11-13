import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Truck, ShieldCheck, HeartPulse, FileText, Sparkles, Clock } from 'lucide-react';

interface HeroSliderProps {
  onOpenPrescription: () => void;
  onSelectCategory: (cat: string) => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ onOpenPrescription, onSelectCategory }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      badge: '🔥 FESTIVAL DA SAÚDE CAPIXABA',
      title: 'Até 50% OFF em Vitaminas e Genéricos',
      subtitle: 'Compre com desconto exclusivo e receba em até 1 hora em toda a Grande Vitória e interior do Espírito Santo.',
      bgGradient: 'from-red-600 via-rose-700 to-emerald-900',
      actionText: 'Ver Ofertas do Dia',
      actionCategory: 'ofertas',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80',
      statText: '1h Entrega Expressa',
      statSub: 'Vitória • Vila Velha • Serra'
    },
    {
      id: 2,
      badge: '☀️ VERÃO ESPÍRITO SANTO',
      title: 'Dermocosméticos & Linha Solar Premium',
      subtitle: 'Proteja sua pele para curtir Camburi, Praia da Costa e Guarapari com as melhores marcas dermatológicas.',
      bgGradient: 'from-emerald-700 via-teal-800 to-slate-900',
      actionText: 'Conferir Dermocosméticos',
      actionCategory: 'dermocosmeticos',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80',
      statText: 'Leve 2 Pague 1',
      statSub: 'Em protetores selecionados'
    },
    {
      id: 3,
      badge: '📋 PROGRAMA FARMÁCIA POPULAR',
      title: 'Medicamentos Gratuitos com sua Receita',
      subtitle: 'Tratamentos para hipertensão, diabetes e asma sem custo pelo SUS aqui na VivaBem Farmácia.',
      bgGradient: 'from-red-700 via-red-800 to-emerald-800',
      actionText: 'Enviar Receita Médica',
      actionCategory: 'prescription',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop&q=80',
      statText: '100% Gratuito',
      statSub: 'Direto pelo WhatsApp'
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
    <div className="max-w-7xl mx-auto px-4 pt-4 sm:pt-6 pb-2">
      {/* Dynamic Main Slide */}
      <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-r ${slide.bgGradient} text-white shadow-xl transition-all duration-700`}>
        <div className="absolute inset-0 bg-black/20 mix-blend-overlay pointer-events-none" />
        
        {/* Subtle decorative circles */}
        <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-emerald-500/20 blur-2xl pointer-events-none" />

        <div className="relative z-10 grid md:grid-cols-12 items-center p-6 sm:p-10 lg:p-14 min-h-[360px] md:min-h-[420px] gap-8">
          {/* Left Text Column */}
          <div className="md:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold text-amber-300 border border-white/20">
              <Sparkles className="w-3.5 h-3.5" />
              {slide.badge}
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              {slide.title}
            </h1>

            <p className="text-slate-100 text-sm sm:text-base max-w-xl font-medium leading-relaxed">
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
                className="bg-white hover:bg-slate-100 active:scale-95 text-red-700 font-extrabold text-sm px-6 py-3.5 rounded-full shadow-lg transition-all flex items-center gap-2"
              >
                <span>{slide.actionText}</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenPrescription}
                className="bg-emerald-600/80 hover:bg-emerald-600 backdrop-blur-sm text-white font-bold text-sm px-5 py-3.5 rounded-full border border-emerald-400/30 transition-all flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>Envie sua Receita</span>
              </button>
            </div>
          </div>

          {/* Right Visual / Stat Box Column */}
          <div className="md:col-span-5 flex flex-col items-center justify-center relative">
            <div className="relative w-full max-w-sm aspect-4/3 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 group">
              <img 
                src={slide.image} 
                alt={slide.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                <div className="bg-white/95 backdrop-blur-md text-slate-900 rounded-xl p-3 w-full shadow-md flex items-center justify-between">
                  <div>
                    <div className="text-xs font-extrabold text-red-600 uppercase tracking-wider">{slide.statText}</div>
                    <div className="text-[11px] font-semibold text-slate-600">{slide.statSub}</div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Truck className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center backdrop-blur-sm transition-colors z-20"
          aria-label="Slide anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center backdrop-blur-sm transition-colors z-20"
          aria-label="Próximo slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all ${
                currentSlide === idx ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Ir para slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Drogasil Signature Quick-Access Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-4">
        <div 
          onClick={onOpenPrescription}
          className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-slate-800">Envie sua Receita</div>
            <div className="text-[11px] text-slate-500">Orçamento no WhatsApp em 5min</div>
          </div>
        </div>

        <div 
          onClick={() => onSelectCategory('medicamentos')}
          className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 hover:border-red-500 hover:shadow-md transition-all cursor-pointer flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-slate-800">Genéricos com até 70%</div>
            <div className="text-[11px] text-slate-500">EMS, Medley e Eurofarma</div>
          </div>
        </div>

        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 hover:border-emerald-500 hover:shadow-md transition-all flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-slate-800">Frete Grátis no ES</div>
            <div className="text-[11px] text-slate-500">Acima de R$ 79 em Vitória e Vila Velha</div>
          </div>
        </div>

        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 hover:border-red-500 hover:shadow-md transition-all flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <HeartPulse className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-slate-800">Atenção Farmacêutica</div>
            <div className="text-[11px] text-slate-500">Farmacêutico CRF-ES de plantão</div>
          </div>
        </div>
      </div>
    </div>
  );
};


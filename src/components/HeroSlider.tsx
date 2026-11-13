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
      badge: 'Black Friday',
      badgeClass: 'bg-red-600 text-white',
      highlight: '60% OFF',
      title: 'BLACK FRIDAY: 60% OFF',
      subtitle: 'A maior queima de estoque em medicamentos e dermocosméticos do ES.',
      actionText: 'Ver Ofertas',
      actionCategory: 'ofertas',
      image: '/hero/slide1_blackfriday.jpg',
      statText: 'Black Friday 60% OFF',
      statSub: 'Vitória • Vila Velha • Serra'
    },
    {
      id: 2,
      isBlackFriday: false,
      badge: 'Dermocosméticos',
      badgeClass: 'bg-emerald-700 text-white',
      highlight: 'Verão Capixaba',
      title: 'Proteção Solar e Cuidados de Verão',
      subtitle: 'As melhores marcas dermatológicas: La Roche-Posay, CeraVe e Vichy.',
      actionText: 'Dermocosméticos',
      actionCategory: 'dermocosmeticos',
      image: '/hero/slide2_dermo.jpg',
      statText: 'Leve 2 Pague 1',
      statSub: 'Protetores selecionados'
    },
    {
      id: 3,
      isBlackFriday: false,
      badge: 'Farmácia Popular',
      badgeClass: 'bg-red-600 text-white',
      highlight: '100% Gratuito',
      title: 'Medicamentos pelo SUS Grátis',
      subtitle: 'Tratamentos para pressão alta, diabetes e asma sem custos na VivaBem.',
      actionText: 'Enviar Receita',
      actionCategory: 'prescription',
      image: '/hero/slide3_popular.jpg',
      statText: 'SUS Gratuito',
      statSub: 'Atendimento no WhatsApp'
    },
    {
      id: 4,
      isBlackFriday: false,
      badge: 'Vitaminas & Imunidade',
      badgeClass: 'bg-amber-600 text-white',
      highlight: 'Até 40% OFF',
      title: 'Energia e Imunidade Reforçada',
      subtitle: 'Vitamina C, Zinco, Ômega 3 e multivitamínicos para toda a sua família.',
      actionText: 'Ver Vitaminas',
      actionCategory: 'vitaminas',
      image: '/hero/slide4_vitaminas.jpg',
      statText: 'Imunidade Forte',
      statSub: 'Redoxon, Centrum e mais'
    },
    {
      id: 5,
      isBlackFriday: false,
      badge: 'Mamãe & Bebê',
      badgeClass: 'bg-sky-600 text-white',
      highlight: 'Super Combos',
      title: 'Cuidado Especial para o seu Bebê',
      subtitle: 'Fraldas Pampers, fórmulas Nan Supreme, lenços e pomadas com desconto.',
      actionText: 'Linha Infantil',
      actionCategory: 'mamae-bebe',
      image: '/hero/slide5_bebe.jpg',
      statText: 'Combos Econômicos',
      statSub: 'Fraldas e Fórmulas'
    },
    {
      id: 6,
      isBlackFriday: false,
      badge: 'Genéricos de Confiança',
      badgeClass: 'bg-amber-500 text-slate-900',
      highlight: 'Economize até 70%',
      title: 'Genéricos com Procedência Garantida',
      subtitle: 'A mesma eficácia pelo menor preço: Medley, EMS, Eurofarma e Sanofi.',
      actionText: 'Ver Genéricos',
      actionCategory: 'medicamentos',
      image: '/hero/slide6_genericos.jpg',
      statText: 'Economize até 70%',
      statSub: 'Mesmo princípio ativo'
    },
    {
      id: 7,
      isBlackFriday: false,
      badge: 'Manipulação VivaBem',
      badgeClass: 'bg-teal-600 text-white',
      highlight: 'Fórmulas Sob Medida',
      title: 'Manipulação com Orçamento Online',
      subtitle: 'Envie a foto da sua receita médica e receba orçamento rápido no WhatsApp.',
      actionText: 'Cotar Fórmula',
      actionCategory: 'prescription',
      image: '/hero/slide7_manipulacao.jpg',
      statText: 'Orçamento Rápido',
      statSub: 'Laboratório Certificado'
    },
    {
      id: 8,
      isBlackFriday: false,
      badge: 'Espaço Mais Saúde',
      badgeClass: 'bg-red-700 text-white',
      highlight: 'Atendimento Farmacêutico',
      title: 'Testes Rápidos, Vacinas e Cuidados',
      subtitle: 'Aferição de pressão arterial, glicemia, bioimpedância e curativos.',
      actionText: 'Conhecer Serviços',
      actionCategory: 'cuidados',
      image: '/hero/slide8_servicos.jpg',
      statText: 'Farmacêutico Presente',
      statSub: 'Lojas na Grande Vitória'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[currentSlide];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 pt-2 sm:pt-3 w-full">
      {/* 8-Part Hero Slider: Background Image + High-Contrast Gradient Overlay (Identical Dimensions) */}
      <div 
        className={`relative overflow-hidden rounded-xl sm:rounded-2xl shadow-sm transition-all duration-700 border border-slate-200/20 ${
          slide.isBlackFriday 
            ? 'bg-black text-white' 
            : 'bg-[#032314] text-white'
        }`}
      >
        {/* Full Slide Background Image (Removed from the right side, now full background of the session) */}
        <img
          key={slide.id}
          src={slide.image}
          alt={slide.title}
          className="absolute inset-0 w-full h-full object-cover object-right md:object-center select-none pointer-events-none transition-opacity duration-700 animate-in fade-in"
          loading="eager"
          decoding="async"
        />

        {/* Gradient Overlay for 100% Typography Readability */}
        <div
          className={`absolute inset-0 pointer-events-none transition-all duration-700 ${
            slide.isBlackFriday
              ? 'bg-gradient-to-r from-black via-zinc-950/90 md:via-zinc-950/80 to-black/35'
              : 'bg-gradient-to-r from-[#032314] via-[#053820]/90 md:via-[#053820]/80 to-[#032314]/30'
          }`}
        />

        {/* Ambient Glow for Black Friday */}
        {slide.isBlackFriday && (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(220,38,38,0.25)_0%,transparent_60%)] pointer-events-none" />
        )}

        {/* Slide Content Area (Left aligned, roomy, consistent height) */}
        <div className="relative z-10 flex flex-col justify-center p-4 sm:p-6 lg:p-8 min-h-[170px] sm:min-h-[195px] md:min-h-[225px] max-w-xl md:max-w-2xl">
          <div className="flex items-center gap-1.5 mb-1 sm:mb-1.5 flex-wrap">
            <span className={`font-black text-[9px] sm:text-[10px] px-2 py-0.5 rounded tracking-widest uppercase ${slide.badgeClass}`}>
              {slide.badge}
            </span>
            <span className="text-emerald-300 font-black text-[10px] sm:text-xs tracking-wider uppercase drop-shadow-xs">
              {slide.highlight}
            </span>
          </div>

          <h1 className="text-lg sm:text-2xl lg:text-3xl font-black tracking-tight leading-snug drop-shadow-xs">
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

          <p className="text-slate-100 text-xs sm:text-sm font-normal line-clamp-2 leading-relaxed max-w-lg mt-1 drop-shadow-xs">
            {slide.subtitle}
          </p>

          <div className="pt-2 sm:pt-2.5 flex items-center gap-2 flex-wrap">
            <button
              onClick={() => {
                if (slide.actionCategory === 'prescription') {
                  onOpenPrescription();
                } else {
                  onSelectCategory(slide.actionCategory);
                }
              }}
              className={`font-black text-[11px] sm:text-xs px-3.5 py-1.5 sm:py-2 rounded-lg shadow-md transition-all flex items-center gap-1.5 cursor-pointer ${
                slide.isBlackFriday
                  ? 'bg-red-600 hover:bg-red-700 text-white active:scale-95'
                  : 'bg-white hover:bg-slate-100 text-red-700 active:scale-95'
              }`}
            >
              <span>{slide.actionText}</span>
            </button>

            <button
              onClick={onOpenPrescription}
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-[11px] sm:text-xs px-3 py-1.5 sm:py-2 rounded-lg border border-emerald-500/40 transition-all flex items-center gap-1 cursor-pointer shadow-xs"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Receita</span>
            </button>

            {/* Quick Stat Badge */}
            <div className="hidden sm:inline-flex items-center gap-1.5 bg-black/40 backdrop-blur-xs text-white/90 text-[10px] px-2.5 py-1 rounded-full border border-white/15">
              <Truck className="w-3 h-3 text-emerald-400" />
              <span className="font-semibold text-emerald-300">{slide.statText}</span>
              <span className="text-white/60">• {slide.statSub}</span>
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

        {/* 8 Dots Navigation Indicator */}
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

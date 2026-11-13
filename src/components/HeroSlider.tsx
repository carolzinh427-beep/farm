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
      {/* 8-Part Hero Slider (Compact & Fixed Dimensions for ALL Slides) */}
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

        {/* Compact Grid: items-center with strictly uniform vertical height */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 items-center p-3.5 sm:p-5 lg:p-6 min-h-[170px] sm:min-h-[190px] md:min-h-[220px] gap-3 sm:gap-4">
          {/* Left Text Column */}
          <div className="md:col-span-7 space-y-1.5 sm:space-y-2">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className={`font-black text-[9px] sm:text-[10px] px-2 py-0.5 rounded tracking-widest uppercase ${slide.badgeClass}`}>
                {slide.badge}
              </span>
              <span className="text-emerald-400 font-black text-[10px] sm:text-xs tracking-wider uppercase">
                {slide.highlight}
              </span>
            </div>

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

          {/* Right Visual Box Column (EXACT STRICT IDENTICAL SIZE ACROSS ALL 8 SLIDES) */}
          <div className="hidden md:flex md:col-span-5 items-center justify-center flex-shrink-0">
            <div className="relative w-[320px] lg:w-[350px] h-[160px] lg:h-[175px] rounded-xl overflow-hidden shadow-md border border-white/20 flex-shrink-0 bg-slate-900">
              <img 
                src={slide.image} 
                alt={slide.title}
                className="w-full h-full object-cover object-center block"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2 left-2 right-2 z-10">
                <div className="rounded-lg p-1.5 sm:p-2 w-full shadow-xs flex items-center justify-between border bg-zinc-950/90 text-white border-white/10">
                  <div>
                    <div className="text-[10px] font-black text-red-400 uppercase tracking-wider leading-none">{slide.statText}</div>
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

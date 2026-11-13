import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface HealthService {
  id: string;
  title: string;
  description: string;
  buttonText: string;
  image: string;
}

const HEALTH_SERVICES: HealthService[] = [
  {
    id: 'covid',
    title: 'Testes de COVID-19',
    description: 'Realize seu teste com segurança e rapidez em nossas farmácias.',
    buttonText: 'Agende seu teste',
    image: '/services/covid.jpg'
  },
  {
    id: 'exames',
    title: 'Exames clínicos',
    description: 'Exame de dengue, gravidez, glicemia, colesterol, tireóide e mais.',
    buttonText: 'Conferir exames',
    image: '/services/exames.jpg'
  },
  {
    id: 'servicos',
    title: 'Serviços farma',
    description: 'Bioimpedância, pressão arterial, curativos, aplicação de injetáveis.',
    buttonText: 'Conferir serviços',
    image: '/services/servicos.jpg'
  },
  {
    id: 'telessaude',
    title: 'Telessaúde',
    description: 'Consultas virtuais, diagnósticos à distância e acompanhamento médico.',
    buttonText: 'Agendar consulta',
    image: '/services/telessaude.jpg'
  },
  {
    id: 'vacinas',
    title: 'Vacinas',
    description: 'Vacinas da gripe, pneumonia, HPV, meningite, entre outras.',
    buttonText: 'Conferir vacinas',
    image: '/services/vacinas.jpg'
  }
];

interface HealthServicesCarouselProps {
  onScheduleService?: (serviceName: string) => void;
}

export const HealthServicesCarousel: React.FC<HealthServicesCarouselProps> = ({ onScheduleService }) => {
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

  const handleAction = (service: HealthService) => {
    if (onScheduleService) {
      onScheduleService(service.title);
    } else {
      const msg = encodeURIComponent(`Olá! Gostaria de agendar o serviço de ${service.title} na Farmácia VivaBem.`);
      window.open(`https://wa.me/5527999990000?text=${msg}`, '_blank');
    }
  };

  return (
    <section className="w-full py-2 sm:py-3 contain-layout">
      {/* Header */}
      <div className="flex items-center justify-between mb-2 sm:mb-2.5 px-1">
        <h2 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 tracking-tight">
          Espaço Mais Saúde
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

      {/* Horizontal Carousel */}
      <div
        ref={scrollRef}
        className="flex gap-2.5 sm:gap-4 overflow-x-auto scroll-smooth scrollbar-none snap-x snap-mandatory pb-2 w-full touch-pan-y"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {HEALTH_SERVICES.map((item) => (
          <div
            key={item.id}
            className="snap-start shrink-0 w-[calc((100%-16px)/2.2)] sm:w-[calc((100%-36px)/3.2)] md:w-[calc((100%-48px)/4.2)] lg:w-[calc((100%-60px)/5)] bg-white rounded-2xl overflow-hidden border border-slate-200/90 hover:border-slate-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
          >
            {/* Upper Photo */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Bottom Content Area */}
            <div className="p-3 sm:p-3.5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xs sm:text-sm font-black text-slate-900 group-hover:text-red-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-[10px] sm:text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Button */}
              <div className="mt-2.5">
                <button
                  onClick={() => handleAction(item)}
                  className="w-full py-1.5 px-3 border border-slate-300 hover:border-slate-900 hover:bg-slate-900 hover:text-white text-slate-800 font-bold text-[10px] sm:text-xs rounded-full transition-all duration-150 text-center cursor-pointer shadow-2xs"
                >
                  {item.buttonText}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

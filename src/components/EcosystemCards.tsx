import React from 'react';
import Carousel, { CarouselItem } from './Carousel';

interface EcosystemItem {
  id: string;
  title: string;
  description: string;
  image: string;
  buttonText: string;
  actionType: 'prescription' | 'blog' | 'specialties' | 'dose_certa';
}

const ECOSYSTEM_ITEMS: EcosystemItem[] = [
  {
    id: 'manipulacao',
    title: 'Manipulação',
    description: 'Farmácia de manipulação fácil e prática, envie a receita, confira o orçamento, compre online e receba onde quiser.',
    image: '/ecosystem/manipulacao.jpg',
    buttonText: 'Conhecer',
    actionType: 'prescription'
  },
  {
    id: 'blog',
    title: 'Blog VivaBem',
    description: 'Conteúdos, dicas e informações sobre saúde, maternidade, alimentação saudável e beleza para o seu bem-estar.',
    image: '/ecosystem/blog.jpg',
    buttonText: 'Conhecer',
    actionType: 'blog'
  },
  {
    id: 'especialidades',
    title: 'VivaBem Especialidades',
    description: 'Atua com credibilidade e experiência na comercialização e suporte a medicamentos especiais e de alta complexidade.',
    image: '/ecosystem/especialidades.jpg',
    buttonText: 'Conhecer',
    actionType: 'specialties'
  },
  {
    id: 'dose_certa',
    title: 'Dose Certa',
    description: 'Compre e receba seus medicamentos organizados em sachês individuais separados por dia e horário.',
    image: '/ecosystem/dose_certa.jpg',
    buttonText: 'Conhecer',
    actionType: 'dose_certa'
  }
];

interface EcosystemCardsProps {
  onOpenPrescription: () => void;
  onSelectCategory: (category: string) => void;
}

export const EcosystemCards: React.FC<EcosystemCardsProps> = ({
  onOpenPrescription,
  onSelectCategory
}) => {
  const handleClick = (item: EcosystemItem) => {
    if (item.actionType === 'prescription' || item.actionType === 'dose_certa') {
      onOpenPrescription();
    } else {
      const msg = encodeURIComponent(`Olá! Gostaria de saber mais sobre o serviço de ${item.title} da Farmácia VivaBem.`);
      window.open(`https://wa.me/5527999990000?text=${msg}`, '_blank');
    }
  };

  const mobileCarouselItems: CarouselItem[] = ECOSYSTEM_ITEMS.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    image: item.image,
    buttonText: item.buttonText,
    onAction: () => handleClick(item)
  }));

  return (
    <section className="w-full py-2 sm:py-5 flex flex-col items-center justify-center">
      {/* MOBILE VIEW: React Bits <Carousel /> Centralizado, com imagens escurecidas e texto de alto contraste */}
      <div className="md:hidden w-full flex flex-col items-center justify-center py-2 text-center">
        <div className="w-full max-w-sm px-2 flex justify-center">
          <Carousel
            items={mobileCarouselItems}
            baseWidth={320}
            aspectRatio={1.25}
            effect="tilt"
            indicator="dots"
            frame={true}
            arrows={false}
            loop={false}
            autoplay={false}
            autoplayDelay={3000}
            pauseOnHover={false}
            theme="dark"
            onCardClick={(idx) => handleClick(ECOSYSTEM_ITEMS[idx])}
          />
        </div>
      </div>

      {/* DESKTOP VIEW: Clean 4-Column Grid Centralizado */}
      <div className="hidden md:grid md:grid-cols-4 gap-4 w-full">
        {ECOSYSTEM_ITEMS.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between items-center text-center group"
          >
            {/* Top Photo */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Bottom Content Area */}
            <div className="p-4 lg:p-5 flex-1 flex flex-col justify-between items-center text-center w-full">
              <div className="flex flex-col items-center text-center">
                <h3 className="text-sm lg:text-base font-black text-slate-900 group-hover:text-red-600 transition-colors text-center">
                  {item.title}
                </h3>
                <p className="text-[11px] lg:text-xs text-slate-500 mt-1.5 line-clamp-3 leading-relaxed text-center">
                  {item.description}
                </p>
              </div>

              {/* Pill Button 'Conhecer' */}
              <div className="mt-4 w-full flex justify-center">
                <button
                  onClick={() => handleClick(item)}
                  className="w-full max-w-[180px] py-2 px-4 border border-slate-300 hover:border-slate-900 hover:bg-slate-900 hover:text-white text-slate-800 font-bold text-xs rounded-full transition-all duration-200 text-center cursor-pointer shadow-2xs"
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

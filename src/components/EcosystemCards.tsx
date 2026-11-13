import React from 'react';
import { ArrowRight } from 'lucide-react';

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

  return (
    <section className="w-full py-2 sm:py-5">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        {ECOSYSTEM_ITEMS.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
          >
            {/* Top Photo */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Bottom Content Area (Exact Drogasil Style) */}
            <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-sm sm:text-base font-black text-slate-900 group-hover:text-red-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-1.5 line-clamp-3 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Pill Button 'Conhecer' */}
              <div className="mt-4">
                <button
                  onClick={() => handleClick(item)}
                  className="w-full py-2 px-4 border border-slate-300 hover:border-slate-900 hover:bg-slate-900 hover:text-white text-slate-800 font-bold text-xs rounded-full transition-all duration-200 text-center cursor-pointer shadow-2xs"
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

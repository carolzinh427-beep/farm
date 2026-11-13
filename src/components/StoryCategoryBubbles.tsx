import React from 'react';

interface StoryBubble {
  id: string;
  label: string;
  highlight?: string;
  image: string;
  category: string;
}

const BUBBLES: StoryBubble[] = [
  {
    id: 'esquenta',
    label: 'Em Alta no',
    highlight: 'esquenta black 🔥',
    image: '/products/cerave.webp',
    category: 'ofertas'
  },
  {
    id: 'novidades',
    label: 'Novidades do',
    highlight: 'momento ✨',
    image: '/products/redoxon.webp',
    category: 'vitaminas'
  },
  {
    id: 'beleza',
    label: 'Beleza em',
    highlight: 'Destaque',
    image: '/products/anthelios.webp',
    category: 'dermocosmeticos'
  },
  {
    id: 'higiene',
    label: 'Higiene Pessoal',
    highlight: 'em oferta',
    image: '/products/listerine.webp',
    category: 'cuidados'
  },
  {
    id: 'medicamentos',
    label: 'Medicamentos',
    highlight: 'e Genéricos',
    image: '/products/dorflex.webp',
    category: 'medicamentos'
  },
  {
    id: 'bebe',
    label: 'Mamãe e',
    highlight: 'Bebê',
    image: '/products/pampers.webp',
    category: 'mamae-bebe'
  }
];

interface StoryCategoryBubblesProps {
  onSelectCategory: (category: string) => void;
}

export const StoryCategoryBubbles: React.FC<StoryCategoryBubblesProps> = ({ onSelectCategory }) => {
  return (
    <div className="w-full pt-3 pb-2 px-2 overflow-x-auto scrollbar-none touch-pan-x" style={{ overscrollBehaviorX: 'contain' }}>
      <div className="flex items-start justify-between sm:justify-center gap-3 sm:gap-6 min-w-max px-2">
        {BUBBLES.map((bubble) => (
          <button
            key={bubble.id}
            onClick={() => onSelectCategory(bubble.category)}
            className="flex flex-col items-center group cursor-pointer focus:outline-none flex-shrink-0"
          >
            {/* Story Circle with border (Exact Rosário Aesthetic) */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-slate-800 p-0.5 bg-white shadow-xs group-hover:scale-105 group-active:scale-95 transition-all duration-200 overflow-hidden flex items-center justify-center">
              <div className="w-full h-full rounded-full overflow-hidden bg-slate-50 flex items-center justify-center p-1.5">
                <img
                  src={bubble.image}
                  alt={bubble.label}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Label below circle */}
            <div className="text-[10px] sm:text-[11px] text-center text-slate-800 font-semibold max-w-[76px] leading-tight mt-1.5">
              <span className="block">{bubble.label}</span>
              <span className="block font-black text-slate-900">{bubble.highlight}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

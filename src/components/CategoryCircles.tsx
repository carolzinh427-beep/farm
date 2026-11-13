import React from 'react';
import { Pill, Sparkles, Smile, Baby, Heart, Tag, ShieldCheck, FileCheck } from 'lucide-react';

interface CategoryCirclesProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onOpenPrescription: () => void;
}

export const CategoryCircles: React.FC<CategoryCirclesProps> = ({
  selectedCategory,
  onSelectCategory,
  onOpenPrescription
}) => {
  const categories = [
    { id: 'medicamentos', name: 'Medicamentos', icon: Pill, color: 'text-red-600 bg-red-50 hover:border-red-500' },
    { id: 'dermocosmeticos', name: 'Dermocosméticos', icon: Sparkles, color: 'text-emerald-700 bg-emerald-50 hover:border-emerald-600' },
    { id: 'cuidados', name: 'Cuidados Diários', icon: Smile, color: 'text-sky-700 bg-sky-50 hover:border-sky-500' },
    { id: 'mamae-bebe', name: 'Mamãe e Bebê', icon: Baby, color: 'text-amber-700 bg-amber-50 hover:border-amber-500' },
    { id: 'vitaminas', name: 'Vitaminas', icon: Heart, color: 'text-rose-700 bg-rose-50 hover:border-rose-500' },
    { id: 'ofertas', name: 'Ofertas do Dia', icon: Tag, color: 'text-red-700 bg-red-50 hover:border-red-600' },
    { id: 'prescription', name: 'Enviar Receita', icon: FileCheck, color: 'text-emerald-800 bg-emerald-100 hover:border-emerald-700' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">
          Compre por Categoria
        </h3>
        <button
          onClick={() => onSelectCategory('todos')}
          className="text-xs text-red-600 hover:text-red-700 font-bold hover:underline"
        >
          Ver todos os departamentos
        </button>
      </div>

      <div className="flex items-center gap-3 sm:gap-6 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => {
                if (cat.id === 'prescription') {
                  onOpenPrescription();
                } else {
                  onSelectCategory(cat.id);
                }
              }}
              className="flex flex-col items-center gap-2 group flex-shrink-0 focus:outline-none"
            >
              <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${
                isSelected 
                  ? 'border-red-600 ring-2 ring-red-100 shadow-sm' 
                  : 'border-slate-200 group-hover:shadow-md'
              } ${cat.color}`}>
                <Icon className="w-6 h-6 sm:w-7 sm:h-7 transition-transform group-hover:scale-110" />
              </div>
              <span className={`text-[11px] sm:text-xs font-semibold text-center whitespace-nowrap max-w-[80px] leading-tight ${
                isSelected ? 'text-red-600 font-bold' : 'text-slate-700 group-hover:text-red-600'
              }`}>
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

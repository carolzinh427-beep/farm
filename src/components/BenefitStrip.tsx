import React from 'react';
import { Clock, Award, Building2, Percent, Activity } from 'lucide-react';

interface BenefitStripProps {
  onOpenLocation: () => void;
  onOpenPrescription: () => void;
  onSelectCategory: (cat: string) => void;
}

export const BenefitStrip: React.FC<BenefitStripProps> = ({
  onOpenLocation,
  onOpenPrescription,
  onSelectCategory
}) => {
  const benefits = [
    {
      id: 1,
      icon: Clock,
      text: (
        <>
          Receba em até 1 hora com a <span className="text-amber-500 font-bold">entrega rápida!</span>
        </>
      ),
      action: onOpenLocation
    },
    {
      id: 2,
      icon: Award,
      text: (
        <>
          Ganhe pontos VivaBem em suas compras.
        </>
      ),
      action: () => onSelectCategory('ofertas')
    },
    {
      id: 3,
      icon: Building2,
      text: (
        <>
          Retire na farmácia em até 30min, <span className="text-emerald-400 font-bold">grátis!</span>
        </>
      ),
      action: onOpenLocation
    },
    {
      id: 4,
      icon: Percent,
      text: (
        <>
          Descontos e benefícios em medicamentos.
        </>
      ),
      action: () => onSelectCategory('medicamentos')
    },
    {
      id: 5,
      icon: Activity,
      text: (
        <>
          Exames, testes, vacinas e muito mais.
        </>
      ),
      action: onOpenPrescription
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 pt-3 sm:pt-4">
      <div className="flex sm:grid sm:grid-cols-3 lg:grid-cols-5 gap-2.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
        {benefits.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={item.action}
              className="bg-[#2D2D2D] hover:bg-[#383838] active:scale-98 text-white p-3.5 rounded-2xl flex items-center gap-3 transition-all cursor-pointer flex-shrink-0 w-[240px] sm:w-auto shadow-xs border border-white/5 group"
            >
              {/* Circular icon container */}
              <div className="w-10 h-10 rounded-full bg-white/10 group-hover:bg-white/15 flex items-center justify-center flex-shrink-0 transition-colors">
                <Icon className="w-5 h-5 text-slate-200" />
              </div>

              {/* Text */}
              <div className="text-[12px] font-medium leading-snug text-slate-200">
                {item.text}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


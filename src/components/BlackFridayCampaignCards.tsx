import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface CampaignCard {
  id: string;
  tag: string;
  discount: string;
  subDiscount?: string;
  badgeType?: 'percent' | 'combo';
  comboRule?: string;
  products: string[];
  category: string;
}

const CAMPAIGNS: CampaignCard[] = [
  {
    id: 'fraldas',
    tag: 'Fraldas & Bebê',
    discount: '25%',
    subDiscount: 'com até',
    products: ['/products/pampers.webp'],
    category: 'mamae-bebe'
  },
  {
    id: 'nutricao',
    tag: 'Mais nutrição, mais economia',
    discount: '40%',
    subDiscount: 'com até',
    products: ['/products/nan.webp', '/products/omega3.webp'],
    category: 'vitaminas'
  },
  {
    id: 'dermo',
    tag: 'Dermocosméticos',
    discount: '25%',
    badgeType: 'combo',
    comboRule: 'compre 2+ e ganhe',
    products: ['/products/cerave.webp', '/products/effaclar.webp'],
    category: 'dermocosmeticos'
  },
  {
    id: 'cuidados',
    tag: 'Seu ritual de cuidados',
    discount: '35%',
    subDiscount: 'com até',
    products: ['/products/anthelios.webp', '/products/listerine.webp'],
    category: 'cuidados'
  }
];

interface BlackFridayCampaignCardsProps {
  onSelectCategory: (category: string) => void;
}

export const BlackFridayCampaignCards: React.FC<BlackFridayCampaignCardsProps> = ({ onSelectCategory }) => {
  return (
    <section className="w-full py-2 sm:py-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        {CAMPAIGNS.map((c) => (
          <div
            key={c.id}
            onClick={() => onSelectCategory(c.category)}
            className="relative bg-gradient-to-br from-[#E5222A] via-[#D11820] to-[#B31018] text-white rounded-2xl sm:rounded-3xl p-3 sm:p-5 flex flex-col justify-between overflow-hidden cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group border border-red-700/50 aspect-square"
          >
            {/* Top Dark Pill / Label */}
            <div className="relative z-10">
              <div className="bg-[#1C1C1C]/90 text-white text-[11px] sm:text-xs md:text-sm font-black italic px-3 py-1.5 rounded-full inline-block tracking-tight shadow-sm border border-black/40">
                {c.tag}
              </div>
            </div>

            {/* Center: Product Image(s) + Starburst + Discount Text */}
            <div className="relative z-10 flex items-center justify-between my-auto py-2">
              {/* Product Pack preview on left */}
              <div className="relative w-20 sm:w-28 h-20 sm:h-28 flex items-center justify-center">
                {c.products.length === 1 ? (
                  <img
                    src={c.products[0]}
                    alt={c.tag}
                    className="w-full h-full object-contain drop-shadow-xl group-hover:scale-108 transition-transform duration-300"
                    loading="lazy"
                  />
                ) : (
                  <div className="relative w-full h-full">
                    <img
                      src={c.products[0]}
                      alt={c.tag}
                      className="absolute left-0 bottom-0 w-16 sm:w-20 h-16 sm:h-20 object-contain drop-shadow-md z-10 group-hover:scale-108 transition-transform duration-200"
                      loading="lazy"
                      decoding="async"
                    />
                    <img
                      src={c.products[1]}
                      alt={c.tag}
                      className="absolute right-0 top-0 w-14 sm:w-16 h-14 sm:h-16 object-contain drop-shadow-sm opacity-90 group-hover:scale-105 transition-transform duration-200"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                )}
              </div>

              {/* Black Starburst Stamp + Discount Numbers on right */}
              <div className="flex flex-col items-end text-right pl-2">
                {/* Black Starburst Badge */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black text-white rounded-full flex flex-col items-center justify-center p-1 font-black text-[7px] sm:text-[8px] uppercase tracking-tighter leading-tight shadow-lg border-2 border-white/20 -rotate-12 mb-1">
                  <span>ES</span>
                  <span className="text-red-400">QUEN</span>
                  <span>TA</span>
                </div>

                {/* Discount text */}
                {c.badgeType === 'combo' ? (
                  <div>
                    <span className="text-[9px] sm:text-[10px] font-bold block text-white/90 leading-tight">
                      {c.comboRule}
                    </span>
                    <div className="text-2xl sm:text-4xl font-black tracking-tighter leading-none text-white drop-shadow-sm">
                      {c.discount}
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-bold block text-white/90 leading-tight">
                      de desconto
                    </span>
                  </div>
                ) : (
                  <div>
                    <span className="text-[9px] sm:text-[10px] font-bold block text-white/90 leading-tight">
                      {c.subDiscount}
                    </span>
                    <div className="text-2xl sm:text-4xl font-black tracking-tighter leading-none text-white drop-shadow-sm">
                      {c.discount}
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-bold block text-white/90 leading-tight">
                      de desconto
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Bar: Promotion disclaimer & BLACK VIVABEM Logo */}
            <div className="relative z-10 flex items-end justify-between pt-1 border-t border-red-500/30">
              <span className="text-[7px] sm:text-[8px] text-white/75 leading-tight max-w-[55%]">
                Promoção válida enquanto durarem os estoques.
              </span>

              {/* BLACK VIVABEM */}
              <div className="text-right leading-none">
                <span className="block text-[8px] sm:text-[9px] font-black tracking-wider text-black">
                  BLACK
                </span>
                <span className="block text-xs sm:text-base font-black tracking-tight text-white drop-shadow-sm">
                  VIVABEM
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

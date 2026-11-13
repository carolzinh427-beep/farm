import React from 'react';
import { Product } from '../types';
import { FileText, ArrowDown, Plus, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  isInCart?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, isInCart = false }) => {
  return (
    <div className="bg-white rounded-lg sm:rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group h-full relative">
      {/* Top badges & Image */}
      <div className="p-1.5 sm:p-2.5 pb-0 relative">
        {/* Top Badges Row */}
        <div className="flex items-center justify-between gap-1 min-h-[20px] mb-1">
          <div className="flex items-center gap-1 overflow-hidden">
            {product.exclusiveBrand ? (
              <span className="border border-red-700/50 text-red-700 text-[8px] sm:text-[9px] font-bold px-1.5 py-0.5 rounded-full truncate leading-none">
                Marca exclusiva
              </span>
            ) : product.optionsCount ? (
              <span className="bg-slate-100 text-slate-600 text-[8px] sm:text-[9px] font-semibold px-1.5 py-0.5 rounded-full truncate leading-none">
                {product.optionsCount} opções
              </span>
            ) : product.isGeneric ? (
              <span className="bg-amber-400 text-slate-900 font-extrabold text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider leading-none">
                Genérico
              </span>
            ) : product.tag ? (
              <span className="bg-black text-white text-[8px] sm:text-[9px] font-bold px-1.5 py-0.5 rounded-full truncate leading-none">
                {product.tag}
              </span>
            ) : (
              <span />
            )}
          </div>

          {/* Discount badge */}
          {product.discountPercentage ? (
            <span className="bg-emerald-700 text-white font-extrabold text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded-md flex items-center gap-0.5 shadow-xs shrink-0 leading-none">
              <ArrowDown className="w-2.5 h-2.5 stroke-[3]" />
              <span>{product.discountPercentage}%</span>
            </span>
          ) : null}
        </div>

        {/* Real Product Image Container */}
        <div className="relative aspect-square w-full mt-0.5 bg-white flex items-center justify-center p-1 sm:p-2">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
            loading="lazy"
            decoding="async"
          />

          {/* Optional Vertical Badge on the Right (e.g. SHAMPOO / HIGIENE / DERMO) */}
          {product.verticalBadge && (
            <span className="absolute top-1 right-0 bg-[#0F5132] text-white text-[7px] sm:text-[8px] font-black uppercase tracking-widest px-0.5 sm:px-1 py-1 rounded-l [writing-mode:vertical-rl] rotate-180 shadow-xs pointer-events-none">
              {product.verticalBadge}
            </span>
          )}

          {/* Floating Round Red '+' Button (Exact Drogasil Style) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            title={isInCart ? 'Adicionar mais um' : 'Adicionar à cesta'}
            aria-label={`Adicionar ${product.name} à cesta`}
            className={`absolute bottom-0 right-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-md active:scale-90 transition-all z-10 cursor-pointer ${
              isInCart
                ? 'bg-emerald-700 hover:bg-emerald-800 text-white'
                : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
          >
            {isInCart ? (
              <Check className="w-4 h-4 stroke-[3]" />
            ) : (
              <Plus className="w-4 h-4 stroke-[3]" />
            )}
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-1.5 sm:p-2.5 pt-1.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Product Name */}
          <h3 className="text-[11px] sm:text-xs font-semibold text-slate-900 line-clamp-2 leading-snug group-hover:text-red-600 transition-colors">
            {product.name}
          </h3>

          {/* Dosage / Packaging */}
          {product.dosage && (
            <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 truncate">
              {product.dosage}
            </p>
          )}

          {product.requiresPrescription && (
            <div className="mt-1 inline-flex items-center gap-0.5 text-[8px] sm:text-[9px] text-amber-800 bg-amber-50 border border-amber-200 px-1 py-0.5 rounded font-medium">
              <FileText className="w-2.5 h-2.5 text-amber-600 flex-shrink-0" />
              <span>Receita</span>
            </div>
          )}
        </div>

        {/* Price Section */}
        <div className="mt-2 pt-1.5 border-t border-slate-100">
          {product.originalPrice ? (
            <span className="text-[9px] sm:text-[10px] text-slate-400 line-through block leading-none mb-0.5">
              De R$ {product.originalPrice.toFixed(2).replace('.', ',')}
            </span>
          ) : (
            <span className="text-[9px] sm:text-[10px] text-transparent block leading-none mb-0.5">
              -
            </span>
          )}

          <div className="flex items-baseline gap-1 leading-none">
            <span className="text-xs sm:text-sm md:text-base font-black text-slate-900">
              R$ {product.price.toFixed(2).replace('.', ',')}
            </span>
          </div>

          {/* Tiered pricing note (e.g. 'a partir de 3 itens') */}
          {product.tieredPricing && (
            <span className="text-[8px] sm:text-[9px] text-slate-400 block mt-0.5 truncate">
              {product.tieredPricing}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

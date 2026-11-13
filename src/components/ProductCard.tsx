import React from 'react';
import { Product } from '../types';
import { Star, FileText, ArrowDown, Plus, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  isInCart?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, isInCart = false }) => {
  return (
    <div className="bg-white rounded-lg sm:rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group h-full">
      {/* Top badges & Image */}
      <div className="p-1.5 sm:p-2.5 pb-0 relative">
        {/* Discount & Generic Badges */}
        <div className="flex items-center justify-between gap-1 h-5">
          {product.isGeneric ? (
            <span className="bg-amber-400 text-slate-900 font-extrabold text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider">
              Genérico
            </span>
          ) : (
            <span />
          )}

          {product.discountPercentage ? (
            <span className="bg-emerald-700 text-white font-extrabold text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-md flex items-center gap-0.5 shadow-xs ml-auto">
              <ArrowDown className="w-2.5 h-2.5 stroke-[3]" />
              <span>{product.discountPercentage}%</span>
            </span>
          ) : null}
        </div>

        {/* Real Product Image Container with Floating Red '+' Button */}
        <div className="relative aspect-square w-full mt-1 bg-white flex items-center justify-center p-1 sm:p-2">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
            loading="lazy"
          />

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
          {/* Black Badge: Oferta do Dia */}
          <div className="mb-1">
            <span className="bg-black text-white text-[8px] sm:text-[9px] font-bold px-1.5 py-0.5 rounded-full inline-block">
              {product.tag || 'Oferta do Dia'}
            </span>
          </div>

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

          {/* Star Rating and Count */}
          <div className="flex items-center gap-1 mt-1 text-[9px] sm:text-[10px]">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-2.5 h-2.5 ${
                    i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-amber-600 font-bold">({product.reviewsCount})</span>
          </div>

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
            <span className="text-[9px] sm:text-[10px] font-bold text-slate-500">Por</span>
            <span className="text-xs sm:text-sm md:text-base font-black text-slate-900">
              R$ {product.price.toFixed(2).replace('.', ',')}
            </span>
          </div>

          {/* Quick Buy Button on bottom */}
          <button
            onClick={() => onAddToCart(product)}
            className={`w-full mt-2 py-1 sm:py-1.5 px-2 rounded-md font-bold text-[10px] sm:text-[11px] flex items-center justify-center gap-1 transition-all ${
              isInCart
                ? 'bg-emerald-700 hover:bg-emerald-800 text-white'
                : 'bg-red-600 hover:bg-red-700 text-white active:scale-98 shadow-xs'
            }`}
          >
            {isInCart ? 'Adicionado' : 'Comprar'}
          </button>
        </div>
      </div>
    </div>
  );
};

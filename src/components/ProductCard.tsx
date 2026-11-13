import React from 'react';
import { Product } from '../types';
import { ShoppingCart, Star, FileText, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  isInCart?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, isInCart = false }) => {
  return (
    <div className="bg-white rounded-lg sm:rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group">
      {/* Top badges & Image */}
      <div className="p-1.5 sm:p-3 pb-0 relative">
        <div className="flex items-center justify-between gap-1 h-4 sm:h-5">
          {product.discountPercentage ? (
            <span className="bg-red-600 text-white font-extrabold text-[8px] sm:text-[10px] px-1 sm:px-1.5 py-0.5 rounded tracking-tight">
              -{product.discountPercentage}%
            </span>
          ) : <span />}

          {product.isGeneric && (
            <span className="bg-amber-400 text-slate-900 font-extrabold text-[8px] sm:text-[9px] px-1 sm:px-1.5 py-0.5 rounded uppercase tracking-wider">
              Genérico
            </span>
          )}
        </div>

        {/* Real Product Image Container */}
        <div className="relative aspect-square w-full mt-1 overflow-hidden bg-white flex items-center justify-center p-1 sm:p-2">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
            loading="lazy"
          />
        </div>
      </div>

      {/* Product Information */}
      <div className="p-1.5 sm:p-3 pt-1 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Rating */}
          <div className="flex items-center justify-between text-[8px] sm:text-[10px] text-slate-400 mb-0.5">
            <span className="font-bold uppercase tracking-wider truncate max-w-[70%]">
              {product.brand}
            </span>
            <div className="flex items-center gap-0.5 text-amber-500 font-bold">
              <Star className="w-2 h-2 sm:w-2.5 sm:h-2.5 fill-amber-400" />
              <span>{product.rating}</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="text-[11px] sm:text-xs md:text-sm font-semibold text-slate-800 line-clamp-2 leading-tight group-hover:text-red-600 transition-colors">
            {product.name}
          </h3>

          {product.dosage && (
            <p className="hidden sm:block text-[10px] sm:text-[11px] text-slate-500 mt-0.5 truncate">{product.dosage}</p>
          )}

          {product.requiresPrescription && (
            <div className="mt-1 inline-flex items-center gap-0.5 text-[8px] sm:text-[10px] text-amber-800 bg-amber-50 border border-amber-200 px-1 py-0.5 rounded font-medium">
              <FileText className="w-2.5 h-2.5 text-amber-600 flex-shrink-0" />
              <span className="truncate">Receita</span>
            </div>
          )}
        </div>

        {/* Price & Action Button */}
        <div className="mt-2 sm:mt-3 pt-1.5 sm:pt-2 border-t border-slate-100">
          <div className="mb-1 sm:mb-2">
            {product.originalPrice ? (
              <span className="text-[9px] sm:text-[11px] text-slate-400 line-through block leading-none mb-0.5">
                De R$ {product.originalPrice.toFixed(2).replace('.', ',')}
              </span>
            ) : (
              <span className="text-[9px] sm:text-[11px] text-transparent block leading-none mb-0.5">
                -
              </span>
            )}
            <div className="flex items-baseline gap-0.5 sm:gap-1 leading-none">
              <span className="text-[10px] sm:text-xs font-bold text-slate-600">Por</span>
              <span className="text-xs sm:text-base md:text-lg font-black text-red-600 tracking-tight">
                R$ {product.price.toFixed(2).replace('.', ',')}
              </span>
            </div>
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className={`w-full py-1.5 sm:py-2 px-1 sm:px-2 rounded-md sm:rounded-lg font-bold text-[10px] sm:text-xs flex items-center justify-center gap-1 transition-all ${
              isInCart
                ? 'bg-emerald-700 hover:bg-emerald-800 text-white'
                : 'bg-red-600 hover:bg-red-700 active:scale-98 text-white shadow-xs'
            }`}
          >
            {isInCart ? (
              <>
                <Check className="w-3 h-3" />
                <span className="hidden sm:inline">Na Cesta</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-3 h-3" />
                <span>Comprar</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

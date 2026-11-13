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
    <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-red-400 hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group">
      {/* Top badges */}
      <div className="relative p-3 pb-0">
        <div className="flex items-center justify-between gap-1">
          {product.discountPercentage ? (
            <span className="bg-red-600 text-white font-extrabold text-[11px] px-2 py-0.5 rounded-md tracking-wider">
              -{product.discountPercentage}%
            </span>
          ) : <span />}

          {product.isGeneric && (
            <span className="bg-amber-400 text-slate-900 font-extrabold text-[10px] px-2 py-0.5 rounded-md uppercase tracking-wider">
              Genérico
            </span>
          )}

          {product.tag && !product.isGeneric && (
            <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-[10px] px-2 py-0.5 rounded-md">
              {product.tag}
            </span>
          )}
        </div>

        {/* Product Image */}
        <div className="relative aspect-square w-full mt-2 overflow-hidden rounded-xl bg-slate-50 flex items-center justify-center p-2">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Rating */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">
              {product.brand}
            </span>
            <div className="flex items-center gap-0.5 text-amber-500 font-bold text-[11px]">
              <Star className="w-3 h-3 fill-amber-400" />
              <span>{product.rating}</span>
              <span className="text-slate-400 text-[10px]">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="text-sm font-bold text-slate-800 line-clamp-2 leading-snug group-hover:text-red-600 transition-colors">
            {product.name}
          </h3>

          {product.dosage && (
            <p className="text-xs text-slate-500 mt-1">{product.dosage}</p>
          )}

          {product.requiresPrescription && (
            <div className="mt-2 inline-flex items-center gap-1 text-[11px] text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded font-medium">
              <FileText className="w-3 h-3" />
              Exige receita médica
            </div>
          )}
        </div>

        {/* Price & Action */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <div className="mb-2">
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through block">
                R$ {product.originalPrice.toFixed(2).replace('.', ',')}
              </span>
            )}
            <div className="flex items-baseline gap-1">
              <span className="text-xs font-bold text-slate-600">R$</span>
              <span className="text-xl font-extrabold text-red-600 tracking-tight">
                {product.price.toFixed(2).replace('.', ',')}
              </span>
            </div>
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
              isInCart
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-red-600 hover:bg-red-700 active:scale-95 text-white shadow-sm hover:shadow-red-500/20'
            }`}
          >
            {isInCart ? (
              <>
                <Check className="w-4 h-4" />
                <span>Adicionado à Cesta</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                <span>Comprar</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};


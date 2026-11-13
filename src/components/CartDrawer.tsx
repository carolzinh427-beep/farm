import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Plus, Minus, Trash2, ShoppingBag, Truck, MessageCircle } from 'lucide-react';
import { ES_CITIES } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  selectedCity: string;
  onOpenPrescription: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  selectedCity,
  onOpenPrescription
}) => {
  if (!isOpen) return null;

  const currentCityData = ES_CITIES.find(c => c.city.toLowerCase() === selectedCity.toLowerCase()) || ES_CITIES[0];
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = subtotal >= 79 ? 0 : currentCityData.fee;
  const total = subtotal + (items.length > 0 ? shippingFee : 0);
  const totalItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const handleCheckoutWhatsapp = () => {
    const itemsList = items
      .map(item => `• ${item.quantity}x ${item.name} (R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')})`)
      .join('%0A');
    
    const message = `*Olá, Farmácia VivaBem ES!*%0A%0AGostaria de fazer o seguinte pedido para entrega em *${selectedCity} - ES*:%0A%0A${itemsList}%0A%0A*Subtotal:* R$ ${subtotal.toFixed(2).replace('.', ',')}%0A*Frete:* ${shippingFee === 0 ? 'Grátis' : `R$ ${shippingFee.toFixed(2).replace('.', ',')}`}%0A*Total:* R$ ${total.toFixed(2).replace('.', ',')}%0A%0APor favor, confirmem o prazo de entrega expressa!`;
    
    window.open(`https://api.whatsapp.com/send?phone=5527999990000&text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden flex justify-end">
      {/* Dark Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200" 
      />

      {/* Drawer Container: Full width on mobile, max-w-md on desktop */}
      <div className="relative w-full sm:max-w-md bg-white shadow-2xl flex flex-col h-full z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-3.5 sm:p-4 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-black text-slate-900 text-sm sm:text-base leading-none">
                Cesta de Compras
              </h2>
              <span className="text-[11px] text-slate-500 font-medium">
                {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'itens'} adicionados
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar cesta"
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Free Shipping Alert Banner */}
        <div className="bg-emerald-50 px-4 py-2 border-b border-emerald-100 flex items-center justify-between text-xs shrink-0">
          <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
            <Truck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>
              {subtotal >= 79 
                ? 'Parabéns! Você ganhou Frete Grátis no ES' 
                : `Faltam R$ ${(79 - subtotal).toFixed(2).replace('.', ',')} para Frete Grátis`}
            </span>
          </div>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
            {selectedCity}
          </span>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 divide-y divide-slate-100">
          {items.length === 0 ? (
            <div className="py-20 text-center space-y-3 px-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-300 mx-auto flex items-center justify-center">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div className="font-black text-slate-800 text-base">Sua cesta está vazia</div>
              <p className="text-slate-500 text-xs max-w-xs mx-auto">
                Adicione produtos em promoção para aproveitar entrega em até 1 hora no Espírito Santo.
              </p>
              <button
                onClick={onClose}
                className="mt-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-6 py-2.5 rounded-full shadow-sm cursor-pointer"
              >
                Explorar Ofertas
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="py-3 flex gap-3 items-center">
                <div className="w-16 h-16 rounded-lg bg-white border border-slate-100 p-1 flex items-center justify-center shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug">
                    {item.name}
                  </h4>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    {item.dosage || item.brand}
                  </span>
                  <div className="text-xs sm:text-sm font-black text-red-600 mt-1">
                    R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-1 border border-slate-200 rounded-lg p-0.5 bg-slate-50 shrink-0">
                  <button
                    onClick={() => onUpdateQuantity(item.id, -1)}
                    aria-label="Diminuir quantidade"
                    className="w-6 h-6 flex items-center justify-center text-slate-600 hover:text-red-600 rounded cursor-pointer"
                  >
                    {item.quantity === 1 ? <Trash2 className="w-3.5 h-3.5" /> : <Minus className="w-3.5 h-3.5" />}
                  </button>
                  <span className="text-xs font-bold w-5 text-center text-slate-800">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, 1)}
                    aria-label="Aumentar quantidade"
                    className="w-6 h-6 flex items-center justify-center text-slate-600 hover:text-emerald-700 rounded cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout Area (Optimized for Mobile Screens) */}
        {items.length > 0 && (
          <div className="p-3.5 sm:p-4 border-t border-slate-200 bg-slate-50 space-y-2.5 shrink-0 pb-6 sm:pb-4">
            {/* Price Breakdown */}
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-800">
                  R$ {subtotal.toFixed(2).replace('.', ',')}
                </span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Frete ({selectedCity})</span>
                <span className="font-semibold text-emerald-700">
                  {shippingFee === 0 ? 'GRÁTIS' : `R$ ${shippingFee.toFixed(2).replace('.', ',')}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-black text-slate-900 pt-1.5 border-t border-slate-200">
                <span>Total</span>
                <span className="text-red-600 text-lg">
                  R$ {total.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>

            {/* WhatsApp Checkout Button */}
            <button
              onClick={handleCheckoutWhatsapp}
              className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-black py-3 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer text-sm"
            >
              <MessageCircle className="w-4 h-4 fill-white shrink-0" />
              <span>Finalizar no WhatsApp</span>
            </button>

            <button
              onClick={onOpenPrescription}
              className="w-full text-center text-[11px] font-bold text-slate-500 hover:text-slate-800 cursor-pointer py-0.5"
            >
              Precisa adicionar receita médica ao pedido? Clique aqui
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

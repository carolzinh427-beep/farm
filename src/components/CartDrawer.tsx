import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Plus, Minus, Trash2, ShoppingBag, Truck, MessageCircle, ArrowRight } from 'lucide-react';
import { ES_CITIES } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  selectedCity: string;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  selectedCity
}) => {
  const [cep, setCep] = useState('29010-000');
  const [shippingCalculated, setShippingCalculated] = useState(true);

  if (!isOpen) return null;

  const currentCityData = ES_CITIES.find(c => c.city.toLowerCase() === selectedCity.toLowerCase()) || ES_CITIES[0];
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = subtotal >= 79 ? 0 : currentCityData.fee;
  const total = subtotal + (cartItems.length > 0 ? shippingFee : 0);

  const handleCheckoutWhatsapp = () => {
    const itemsList = cartItems
      .map(item => `• ${item.quantity}x ${item.name} (R$ ${(item.price * item.quantity).toFixed(2)})`)
      .join('%0A');
    
    const message = `*Olá, Farmácia VivaBem ES!*%0A%0AGostaria de fazer o seguinte pedido para entrega em *${selectedCity} - ES*:%0A%0A${itemsList}%0A%0A*Subtotal:* R$ ${subtotal.toFixed(2)}%0A*Frete:* ${shippingFee === 0 ? 'Grátis' : `R$ ${shippingFee.toFixed(2)}`}%0A*Total:* R$ ${total.toFixed(2)}%0A%0APor favor, confirmem a disponibilidade e o prazo de entrega expressa!`;
    
    window.open(`https://api.whatsapp.com/send?phone=5527998765432&text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity" 
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-red-600" />
              <h2 className="font-extrabold text-slate-800 text-base">Cesta de Compras</h2>
              <span className="bg-red-100 text-red-700 font-bold text-xs px-2 py-0.5 rounded-full">
                {cartItems.reduce((acc, i) => acc + i.quantity, 0)} itens
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-slate-100">
            {cartItems.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-300 mx-auto flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="font-bold text-slate-700 text-lg">Sua cesta está vazia</div>
                <p className="text-slate-500 text-xs max-w-xs mx-auto">
                  Aproveite as ofertas com frete grátis e entrega expressa no Espírito Santo!
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-5 py-2.5 rounded-full shadow-sm"
                >
                  Continuar Comprando
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="py-3 flex gap-3 items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-contain rounded-lg bg-slate-50 p-1 border border-slate-100 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-800 truncate">{item.name}</h4>
                    <span className="text-[11px] text-slate-400">{item.brand}</span>
                    <div className="text-sm font-extrabold text-red-600 mt-1">
                      R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                    </div>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-1.5 border border-slate-200 rounded-lg p-1 bg-slate-50">
                    <button
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="w-6 h-6 flex items-center justify-center text-slate-600 hover:text-red-600 rounded"
                    >
                      {item.quantity === 1 ? <Trash2 className="w-3.5 h-3.5" /> : <Minus className="w-3.5 h-3.5" />}
                    </button>
                    <span className="text-xs font-bold w-5 text-center">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="w-6 h-6 flex items-center justify-center text-slate-600 hover:text-emerald-600 rounded"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {cartItems.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 space-y-3">
              {/* Delivery notice */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-start gap-2.5">
                <Truck className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                <div className="text-xs">
                  <div className="font-bold text-emerald-900">
                    Entrega em {selectedCity} - ES: {currentCityData.deliveryTime}
                  </div>
                  <div className="text-emerald-700 text-[11px]">
                    {subtotal >= 79 
                      ? 'Parabéns! Você ganhou Frete Grátis.' 
                      : `Faltam R$ ${(79 - subtotal).toFixed(2).replace('.', ',')} para Frete Grátis.`}
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-800">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Frete para {selectedCity}</span>
                  <span className="font-semibold text-emerald-700">
                    {shippingFee === 0 ? 'GRÁTIS' : `R$ ${shippingFee.toFixed(2).replace('.', ',')}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total</span>
                  <span className="text-red-600">R$ {total.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>

              {/* Checkout WhatsApp Button */}
              <button
                onClick={handleCheckoutWhatsapp}
                className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-extrabold py-3.5 rounded-xl shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Finalizar Pedido via WhatsApp</span>
              </button>

              <p className="text-[10px] text-center text-slate-400">
                Atendimento farmacêutico rápido • Pagamento na entrega ou Pix
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


import React, { useState } from 'react';
import { X, Package, Search, Truck, CheckCircle2 } from 'lucide-react';

interface OrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrdersModal: React.FC<OrdersModalProps> = ({ isOpen, onClose }) => {
  const [cpfOrCode, setCpfOrCode] = useState('');
  const [searched, setSearched] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
      />

      <div className="relative bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl z-10 overflow-hidden">
        <button
          onClick={onClose}
          className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 leading-tight">
              Acompanhar seus Pedidos
            </h3>
            <p className="text-xs text-slate-500">
              Digite seu CPF ou o código do pedido para rastrear a entrega no ES
            </p>
          </div>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); setSearched(true); }} className="space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              placeholder="Digite seu CPF ou Código do Pedido..."
              value={cpfOrCode}
              onChange={(e) => { setCpfOrCode(e.target.value); setSearched(false); }}
              className="w-full pl-9 pr-24 py-2.5 text-xs border border-slate-300 rounded-lg focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-3 py-1.5 rounded-md"
            >
              Rastrear
            </button>
          </div>
        </form>

        {searched && (
          <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2 text-xs">
            <div className="flex items-center gap-2 text-emerald-800 font-bold">
              <Truck className="w-4 h-4 text-emerald-600" />
              <span>Pedido #VB-2026-ES a caminho!</span>
            </div>
            <p className="text-slate-600 text-[11px]">
              Seu pedido saiu para entrega expressa em <strong>Vitória - ES</strong>. Previsão de chegada: <strong>em 25 minutos</strong>.
            </p>
            <div className="pt-1 flex items-center gap-1.5 text-emerald-700 font-medium text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Separado e conferido pelo farmacêutico</span>
            </div>
          </div>
        )}

        <div className="mt-4 text-center">
          <a
            href="https://api.whatsapp.com/send?phone=5527998765432&text=Ola,%20gostaria%20de%20rastrear%20meu%20pedido%20na%20VivaBem"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-slate-500 hover:text-emerald-700 font-medium hover:underline inline-flex items-center gap-1"
          >
            Dúvidas? Fale com a equipe de entregas no WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

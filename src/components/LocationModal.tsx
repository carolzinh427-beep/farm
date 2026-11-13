import React from 'react';
import { X, MapPin, Check, Clock, Truck } from 'lucide-react';
import { ES_CITIES } from '../data/products';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCity: string;
  onSelectCity: (city: string) => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  selectedCity,
  onSelectCity
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
      />

      <div className="relative bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl z-10 overflow-hidden">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-900 leading-tight">
              Onde deseja receber no Espírito Santo?
            </h3>
            <p className="text-xs text-slate-500">
              Selecione sua cidade para ver prazos de entrega e estoque local
            </p>
          </div>
        </div>

        <div className="space-y-2 mt-4">
          {ES_CITIES.map((c) => {
            const isSelected = c.city.toLowerCase() === selectedCity.toLowerCase();
            return (
              <div
                key={c.city}
                onClick={() => {
                  onSelectCity(c.city);
                  onClose();
                }}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected 
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-sm' 
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-800 text-sm">{c.city}</span>
                    <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-bold">ES</span>
                    {isSelected && (
                      <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
                        <Check className="w-3 h-3" /> Selecionado
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                      <Clock className="w-3 h-3" /> {c.deliveryTime}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Truck className="w-3 h-3 text-slate-400" />
                      {c.fee === 0 ? 'Frete Grátis' : `Frete R$ ${c.fee.toFixed(2).replace('.', ',')}`}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    Bairros: {c.neighborhoods.slice(0, 3).join(', ')}...
                  </div>
                </div>

                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  isSelected ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300'
                }`}>
                  {isSelected && <Check className="w-3 h-3" />}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-5 p-3 bg-slate-50 rounded-xl text-center text-xs text-slate-500">
          Mora em outra cidade do Espírito Santo? Entregamos via Sedex Express em até 24h.
        </div>
      </div>
    </div>
  );
};


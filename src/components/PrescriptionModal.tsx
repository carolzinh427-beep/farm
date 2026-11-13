import React, { useState } from 'react';
import { X, UploadCloud, FileText, CheckCircle2, Phone, User, MapPin } from 'lucide-react';
import { ES_CITIES } from '../data/products';

interface PrescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCity: string;
}

export const PrescriptionModal: React.FC<PrescriptionModalProps> = ({
  isOpen,
  onClose,
  selectedCity
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [fileName, setFileName] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    
    // Formats WhatsApp message for pharmacist
    const msg = `*Nova Receita Médica - Farmácia VivaBem ES*%0A%0A*Paciente:* ${name}%0A*Telefone:* ${phone}%0A*Cidade:* ${selectedCity} - ES%0A*Arquivo:* ${fileName || 'Foto da receita anexa'}%0A*Observações:* ${notes || 'Nenhuma'}%0A%0A_Aguardando orçamento e prazo de entrega expressa!_`;
    
    setTimeout(() => {
      window.open(`https://api.whatsapp.com/send?phone=5527998765432&text=${msg}`, '_blank');
      onClose();
      setIsSuccess(false);
      setName('');
      setPhone('');
      setNotes('');
      setFileName('');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
      />

      <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl z-10 overflow-hidden">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-800">Receita Enviada com Sucesso!</h3>
            <p className="text-slate-600 text-sm">
              Conectando você ao farmacêutico de plantão no WhatsApp para orçar e despachar seu pedido...
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 leading-tight">
                  Envie sua Receita Médica
                </h3>
                <p className="text-xs text-slate-500">
                  Orçamento em menos de 10 minutos por farmacêuticos habilitados pelo CRF-ES
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* File Upload Box */}
              <div className="border-2 border-dashed border-slate-200 hover:border-emerald-500 rounded-2xl p-4 text-center bg-slate-50 transition-colors cursor-pointer relative">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setFileName(e.target.files[0].name);
                    }
                  }}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <UploadCloud className="w-8 h-8 text-emerald-600 mx-auto mb-1" />
                <div className="text-xs font-bold text-slate-700">
                  {fileName ? `Arquivo: ${fileName}` : 'Clique para enviar foto ou PDF da receita'}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  Formatos aceitos: JPG, PNG ou PDF (até 15MB)
                </div>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Seu Nome</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="Ex: Maria Santos"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">WhatsApp / Telefone</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="(27) 99999-9999"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Location indication */}
              <div className="bg-slate-100 p-2.5 rounded-xl flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  Entrega para: <strong>{selectedCity} - ES</strong>
                </span>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Entrega Expressa
                </span>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                  Observações (Opcional)
                </label>
                <textarea
                  placeholder="Prefere medicamento genérico? Tem preferência por alguma marca?"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-extrabold py-3.5 rounded-xl shadow-lg shadow-emerald-600/20 text-sm transition-all"
              >
                Enviar Receita para o Farmacêutico
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};


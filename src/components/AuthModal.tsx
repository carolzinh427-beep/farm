import React, { useState } from 'react';
import { X, User, Lock, Mail, CheckCircle2 } from 'lucide-react';
import { Logo } from './Logo';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [cpfOrEmail, setCpfOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLogged, setIsLogged] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLogged(true);
    setTimeout(() => {
      setIsLogged(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
      />

      <div className="relative bg-white rounded-2xl max-w-sm w-full p-6 sm:p-7 shadow-2xl z-10 overflow-hidden">
        <button
          onClick={onClose}
          className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isLogged ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-black text-slate-800">
              {isRegister ? 'Conta criada com sucesso!' : 'Login realizado com sucesso!'}
            </h3>
            <p className="text-xs text-slate-500">
              Bem-vindo(a) à Farmácia VivaBem!
            </p>
          </div>
        ) : (
          <div>
            <div className="text-center mb-5">
              <div className="inline-block mb-2">
                <Logo size="sm" />
              </div>
              <h3 className="text-base font-black text-slate-900">
                {isRegister ? 'Crie sua conta VivaBem' : 'Acesse sua conta'}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {isRegister
                  ? 'Aproveite descontos exclusivos e acompanhe seus pedidos'
                  : 'Informe seus dados para continuar comprando'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              {isRegister && (
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Nome Completo</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="Seu nome"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">E-mail ou CPF</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="exemplo@email.com ou 000.000.000-00"
                    value={cpfOrEmail}
                    onChange={(e) => setCpfOrEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Senha</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="Sua senha secreta"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-red-600 hover:bg-red-700 active:scale-98 text-white font-extrabold py-2.5 rounded-lg shadow-sm text-xs transition-colors"
              >
                {isRegister ? 'Cadastrar e Continuar' : 'Entrar na Conta'}
              </button>
            </form>

            <div className="mt-4 pt-3 border-t border-slate-100 text-center">
              <button
                type="button"
                onClick={() => setIsRegister(!isRegister)}
                className="text-xs text-red-600 hover:text-red-700 font-bold hover:underline"
              >
                {isRegister ? 'Já tenho conta? Entrar agora' : 'Não tem cadastro? Crie sua conta grátis'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

import React from 'react';
import { Logo } from './Logo';
import { Phone, Mail, MapPin, ShieldCheck, Heart, Award, Clock, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Badges (Trust & Quality) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-10 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Produtos 100% Originais</div>
              <div className="text-[11px] text-slate-400">Garantia direta dos laboratórios</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Entrega em até 1 Hora</div>
              <div className="text-[11px] text-slate-400">Em toda a Grande Vitória - ES</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center flex-shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Farmácia Autorizada ANVISA</div>
              <div className="text-[11px] text-slate-400">Registro AFE 1.23456.7</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Farmacêutico 24 Horas</div>
              <div className="text-[11px] text-slate-400">Plantão pelo WhatsApp e Balcão</div>
            </div>
          </div>
        </div>

        {/* Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-10 border-b border-slate-800">
          {/* Col 1: About & Logo */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white/95 p-2 rounded-2xl inline-block shadow-sm">
              <Logo size="md" />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              A <strong>Farmácia VivaBem</strong> nasceu com a missão de levar saúde, cuidado e economia a todos os lares do Espírito Santo. Atendimento humanizado, medicamentos de confiança e entrega ultrarrápida.
            </p>
            <div className="text-xs text-slate-300 space-y-1">
              <div><strong>Televendas ES:</strong> (27) 3322-9000</div>
              <div><strong>WhatsApp Plantão:</strong> (27) 99876-5432</div>
              <div><strong>E-mail:</strong> atendimento@farmaciavivabem.com.br</div>
            </div>
          </div>

          {/* Col 2: Nossas Lojas no ES */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">Lojas no Espírito Santo</h4>
            <ul className="text-xs space-y-2.5 text-slate-400">
              <li>
                <strong className="text-white block">Vitória (Matriz)</strong>
                Av. Dante Michelini, 1200 - Camburi
              </li>
              <li>
                <strong className="text-white block">Vitória (Praia do Canto)</strong>
                Rua Aleixo Netto, 850
              </li>
              <li>
                <strong className="text-white block">Vila Velha</strong>
                Av. Hugo Musso, 1420 - Praia da Costa
              </li>
              <li>
                <strong className="text-white block">Serra</strong>
                Av. Central, 600 - Laranjeiras
              </li>
            </ul>
          </div>

          {/* Col 3: Categorias */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">Departamentos</h4>
            <ul className="text-xs space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Medicamentos de A a Z</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Genéricos com Desconto</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Dermocosméticos & Skincare</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Mamãe e Bebê & Fraldas</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Vitaminas & Imunidade</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Programa Farmácia Popular</a></li>
            </ul>
          </div>

          {/* Col 4: Institucional & Ajuda */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">Atendimento & Ajuda</h4>
            <ul className="text-xs space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Como Comprar</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Prazos e Frete no ES</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Política de Devolução</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Trabalhe Conosco no ES</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacidade e Termos</a></li>
            </ul>
          </div>
        </div>

        {/* Legal & ANVISA Regulatory Info (Drogasil standard compliance) */}
        <div className="pt-8 space-y-4 text-[11px] text-slate-400 leading-relaxed">
          <p>
            <strong>FARMÁCIA VIVABEM LTDA.</strong> | CNPJ: 18.924.512/0001-44 | Inscrição Estadual: 082.914.55-0<br />
            Av. Dante Michelini, 1200, Loja 04 - Praia de Camburi, Vitória - ES, CEP: 29060-235.<br />
            <strong>Farmacêutico Responsável Técnico:</strong> Dr. Roberto Alencar da Silva — CRF/ES nº 4812.<br />
            <strong>Licença Sanitária Municipal:</strong> VISA Vitória nº 2026/04192 | <strong>Autorização de Funcionamento ANVISA:</strong> AFE 1.23456.7 | <strong>AE:</strong> 1.10982.3.
          </p>
          <p>
            As informações contidas neste site têm caráter meramente informativo e não substituem o diagnóstico ou recomendação médica. Medicamentos sob prescrição só serão dispensados mediante apresentação de receita válida. Se persistirem os sintomas, o médico deverá ser consultado.
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800 text-slate-400 text-xs">
            <div>
              © 2026 Farmácia VivaBem Espírito Santo. Todos os direitos reservados.
            </div>
            <div className="flex items-center gap-3">
              <span className="text-emerald-400 font-semibold">Cuidando com carinho das famílias capixabas 💚❤️</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};


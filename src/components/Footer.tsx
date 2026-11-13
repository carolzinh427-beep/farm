import React from 'react';
import { Logo } from './Logo';
import { ShieldCheck, Award, Clock, Heart } from 'lucide-react';

interface FooterProps {
  onOpenPrescription?: () => void;
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="bg-[#062c19] text-emerald-100/85 pt-5 pb-4 sm:pt-6 sm:pb-5 border-t border-[#0d4529] w-full">
      <div className="max-w-7xl mx-auto px-4">
        {/* 1. Top Badges Strip (Trust & Quality - Compact) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pb-4 border-b border-[#0f4d2f]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 text-emerald-300 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-white leading-tight">Produtos 100% Originais</div>
              <div className="text-[10px] text-emerald-200/70">Garantia dos laboratórios</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 text-emerald-300 flex items-center justify-center flex-shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-white leading-tight">Entrega em até 1 Hora</div>
              <div className="text-[10px] text-emerald-200/70">Grande Vitória e interior - ES</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 text-emerald-300 flex items-center justify-center flex-shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-white leading-tight">Autorizada ANVISA</div>
              <div className="text-[10px] text-emerald-200/70">Registro AFE 1.23456.7</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 text-emerald-300 flex items-center justify-center flex-shrink-0">
              <Heart className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-white leading-tight">Farmacêutico 24h</div>
              <div className="text-[10px] text-emerald-200/70">Plantão WhatsApp e Balcão</div>
            </div>
          </div>
        </div>

        {/* 2. Main Columns (Compact Height) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 py-4 border-b border-[#0f4d2f] text-xs">
          {/* Col 1: Logo & About */}
          <div className="lg:col-span-2 space-y-2">
            <div className="bg-white p-1.5 rounded-xl inline-block shadow-xs">
              <Logo size="sm" />
            </div>
            <p className="text-[11px] text-emerald-200/75 leading-relaxed max-w-sm">
              Farmácia VivaBem no Espírito Santo: saúde, economia e entrega rápida na porta da sua casa.
            </p>
            <div className="text-[11px] text-emerald-100/90 space-y-0.5">
              <div><strong>Televendas ES:</strong> (27) 3322-9000 • <strong>WhatsApp:</strong> (27) 99876-5432</div>
              <div><strong>E-mail:</strong> atendimento@farmaciavivabem.com.br</div>
            </div>
          </div>

          {/* Col 2: Lojas no ES */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">Lojas no ES</h4>
            <ul className="text-[11px] space-y-1 text-emerald-200/75">
              <li>Vitória: Camburi & Praia do Canto</li>
              <li>Vila Velha: Praia da Costa</li>
              <li>Serra: Laranjeiras</li>
              <li>Cariacica & Guarapari</li>
            </ul>
          </div>

          {/* Col 3: Departamentos */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">Departamentos</h4>
            <ul className="text-[11px] space-y-1 text-emerald-200/75">
              <li>Medicamentos de A a Z</li>
              <li>Genéricos com até 70%</li>
              <li>Dermocosméticos & Solar</li>
              <li>Mamãe, Bebê & Fraldas</li>
              <li>Farmácia Popular SUS</li>
            </ul>
          </div>

          {/* Col 4: Atendimento */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">Atendimento</h4>
            <ul className="text-[11px] space-y-1 text-emerald-200/75">
              <li>Prazos e Frete Grátis</li>
              <li>Como Enviar Receita</li>
              <li>Política de Devolução</li>
              <li>Trabalhe Conosco no ES</li>
              <li>Privacidade e Termos</li>
            </ul>
          </div>
        </div>

        {/* 3. Regulatory & Legal Info (Compact One-Block) */}
        <div className="pt-3 text-[10px] text-emerald-300/70 leading-normal space-y-1">
          <p>
            <strong>FARMÁCIA VIVABEM LTDA.</strong> | CNPJ: 18.924.512/0001-44 | Av. Dante Michelini, 1200, Camburi, Vitória - ES. Farmacêutico RT: Dr. Roberto Alencar da Silva — CRF/ES nº 4812 | AFE: 1.23456.7.
          </p>
          <p className="text-[9px] text-emerald-400/60">
            Medicamentos sob prescrição só serão dispensados mediante apresentação de receita médica válida. Se persistirem os sintomas, o médico deverá ser consultado.
          </p>
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#0f4d2f] text-[10px] text-emerald-300/80">
            <span>© 2026 Farmácia VivaBem Espírito Santo. Todos os direitos reservados.</span>
            <span className="font-semibold text-emerald-300">Cuidando da saúde das famílias capixabas</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

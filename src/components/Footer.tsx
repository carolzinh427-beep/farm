import React, { useState } from 'react';
import { Logo } from './Logo';
import { ShieldCheck, Award, Clock, Heart, ChevronDown } from 'lucide-react';

interface FooterProps {
  onOpenPrescription?: () => void;
}

export const Footer: React.FC<FooterProps> = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (sec: string) => {
    setOpenSection((prev) => (prev === sec ? null : sec));
  };

  return (
    <footer className="bg-[#062c19] text-emerald-100/85 pt-3 pb-6 md:pt-5 md:pb-4 border-t border-[#0d4529] w-full text-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        {/* ======================================================== */}
        {/* 1. MOBILE COMPACT FOOTER (ULTRA LEAN & FAST TO BROWSE)    */}
        {/* ======================================================== */}
        <div className="md:hidden space-y-3">
          {/* Logo & Quick Contact */}
          <div className="flex items-center justify-between gap-3 pb-2 border-b border-[#0f4d2f]">
            <div className="bg-white p-1 rounded-lg inline-block">
              <Logo size="sm" />
            </div>
            <div className="text-right text-[10px] text-emerald-200/90 leading-tight">
              <div><strong>Tel:</strong> (27) 3322-9000</div>
              <div><strong>WhatsApp:</strong> (27) 99876-5432</div>
            </div>
          </div>

          {/* 2-Column Compact Links */}
          <div className="grid grid-cols-2 gap-2 text-[10px] py-1 border-b border-[#0f4d2f]">
            <div className="space-y-1">
              <span className="font-black text-white uppercase text-[9px] block text-emerald-300">Lojas no ES</span>
              <p className="text-emerald-200/70 leading-snug">Vitória • Vila Velha • Serra • Cariacica</p>
            </div>
            <div className="space-y-1 text-right">
              <span className="font-black text-white uppercase text-[9px] block text-emerald-300">Plantão 24h</span>
              <p className="text-emerald-200/70 leading-snug">Farmacêutico online & entrega em 1h</p>
            </div>
          </div>

          {/* Regulatory Brief Note */}
          <div className="text-[9px] text-emerald-300/60 leading-tight pt-1">
            <p>
              Farmácia VivaBem LTDA. • CNPJ: 18.924.512/0001-44 • Vitória - ES • CRF/ES 4812 • AFE: 1.23456.7
            </p>
            <div className="mt-1 flex items-center justify-between text-[9px] text-emerald-400/80">
              <span>© 2026 VivaBem ES</span>
              <span>Saúde e Economia no ES</span>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 2. DESKTOP / TABLET FOOTER (FULL STRUCTURED LAYOUT)       */}
        {/* ======================================================== */}
        <div className="hidden md:block">
          {/* Top Badges Strip */}
          <div className="grid grid-cols-4 gap-3 pb-3 border-b border-[#0f4d2f]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-white/10 text-emerald-300 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-[11px] font-bold text-white leading-tight">Produtos 100% Originais</div>
                <div className="text-[10px] text-emerald-200/70">Garantia direta dos laboratórios</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-white/10 text-emerald-300 flex items-center justify-center flex-shrink-0">
                <Clock className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-[11px] font-bold text-white leading-tight">Entrega em até 1 Hora</div>
                <div className="text-[10px] text-emerald-200/70">Grande Vitória e interior do ES</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-white/10 text-emerald-300 flex items-center justify-center flex-shrink-0">
                <Award className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-[11px] font-bold text-white leading-tight">Autorizada ANVISA</div>
                <div className="text-[10px] text-emerald-200/70">Registro AFE 1.23456.7</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-white/10 text-emerald-300 flex items-center justify-center flex-shrink-0">
                <Heart className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] font-bold text-white leading-tight">Farmacêutico 24 Horas</div>
                <div className="text-[10px] text-emerald-200/70">Plantão pelo WhatsApp e Balcão</div>
              </div>
            </div>
          </div>

          {/* Main Desktop Columns */}
          <div className="grid grid-cols-5 gap-4 py-3.5 border-b border-[#0f4d2f] text-xs">
            {/* Col 1: Logo & About */}
            <div className="col-span-2 space-y-1.5">
              <div className="bg-white p-1 rounded-xl inline-block shadow-xs">
                <Logo size="sm" />
              </div>
              <p className="text-[11px] text-emerald-200/75 leading-relaxed max-w-sm">
                Farmácia VivaBem no Espírito Santo: saúde, economia e entrega rápida na porta da sua casa.
              </p>
              <div className="text-[11px] text-emerald-100/90 space-y-0.5">
                <div><strong>Televendas:</strong> (27) 3322-9000 • <strong>WhatsApp:</strong> (27) 99876-5432</div>
                <div><strong>E-mail:</strong> atendimento@farmaciavivabem.com.br</div>
              </div>
            </div>

            {/* Col 2: Lojas */}
            <div className="space-y-1">
              <h4 className="text-xs font-black text-white uppercase tracking-wider">Lojas no ES</h4>
              <ul className="text-[11px] space-y-0.5 text-emerald-200/75">
                <li>Vitória: Camburi & Praia do Canto</li>
                <li>Vila Velha: Praia da Costa</li>
                <li>Serra: Laranjeiras</li>
                <li>Cariacica & Guarapari</li>
              </ul>
            </div>

            {/* Col 3: Departamentos */}
            <div className="space-y-1">
              <h4 className="text-xs font-black text-white uppercase tracking-wider">Departamentos</h4>
              <ul className="text-[11px] space-y-0.5 text-emerald-200/75">
                <li>Medicamentos de A a Z</li>
                <li>Genéricos com até 70%</li>
                <li>Dermocosméticos & Solar</li>
                <li>Mamãe, Bebê & Fraldas</li>
                <li>Farmácia Popular SUS</li>
              </ul>
            </div>

            {/* Col 4: Atendimento */}
            <div className="space-y-1">
              <h4 className="text-xs font-black text-white uppercase tracking-wider">Atendimento</h4>
              <ul className="text-[11px] space-y-0.5 text-emerald-200/75">
                <li>Prazos e Frete Grátis</li>
                <li>Como Enviar Receita</li>
                <li>Política de Devolução</li>
                <li>Trabalhe Conosco no ES</li>
                <li>Privacidade e Termos</li>
              </ul>
            </div>
          </div>

          {/* Legal / Regulatory Block */}
          <div className="pt-2.5 text-[10px] text-emerald-300/70 leading-tight space-y-1">
            <p>
              <strong>FARMÁCIA VIVABEM LTDA.</strong> | CNPJ: 18.924.512/0001-44 | Av. Dante Michelini, 1200, Vitória - ES. Farmacêutico RT: Dr. Roberto Alencar da Silva — CRF/ES nº 4812 | AFE: 1.23456.7.
            </p>
            <p className="text-[9px] text-emerald-400/60">
              Medicamentos sob prescrição só serão dispensados mediante apresentação de receita médica válida.
            </p>
            <div className="flex items-center justify-between pt-1.5 border-t border-[#0f4d2f] text-[10px] text-emerald-300/80">
              <span>© 2026 Farmácia VivaBem Espírito Santo. Todos os direitos reservados.</span>
              <span className="font-semibold text-emerald-300">Cuidando da saúde das famílias capixabas</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

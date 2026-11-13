import React from 'react';
import { Logo } from './Logo';
import { ShieldCheck, Award, Clock, Heart } from 'lucide-react';

interface FooterProps {
  onOpenPrescription?: () => void;
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="bg-[#042414] text-emerald-100/90 border-t border-[#0d4529] w-full text-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        {/* ======================================================== */}
        {/* 1. MOBILE FOOTER (ULTRA ENXUTO: LOGO, CONTATO, EMAIL, LOC, CNPJ) */}
        {/* ======================================================== */}
        <div className="md:hidden py-3 text-center space-y-2 text-[10.5px] text-emerald-200/90">
          {/* Logo Centralizada e sem fundo branco */}
          <div className="flex justify-center pb-0.5">
            <Logo size="sm" variant="white" />
          </div>

          {/* Apenas as 4 informações essenciais solicitadas */}
          <div className="space-y-1 leading-snug">
            <div>
              <span className="font-bold text-white">Contato:</span> (27) 3322-9000 • <span className="font-bold text-white">WhatsApp:</span> (27) 99876-5432
            </div>
            <div>
              <span className="font-bold text-white">E-mail:</span> atendimento@farmaciavivabem.com.br
            </div>
            <div>
              <span className="font-bold text-white">Loc:</span> Av. Dante Michelini, 1200 - Vitória, ES
            </div>
            <div className="text-[9.5px] text-emerald-300/75 pt-0.5 font-medium">
              FARMÁCIA VIVABEM LTDA. | CNPJ: 18.924.512/0001-44
            </div>
          </div>

          {/* Copyright compacto */}
          <div className="pt-1.5 border-t border-[#0f4d2f] text-[9px] text-emerald-300/60 flex items-center justify-between">
            <span>© 2026 VivaBem ES</span>
            <span>Todos os direitos reservados</span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 2. DESKTOP / TABLET FOOTER (STRUCTURED 4-COL LAYOUT)     */}
        {/* ======================================================== */}
        <div className="hidden md:block py-6">
          {/* Top 4 Trust Badges Strip */}
          <div className="grid grid-cols-4 gap-4 pb-4 border-b border-[#0f4d2f]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-900/60 text-emerald-300 flex items-center justify-center flex-shrink-0 border border-emerald-700/30">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white leading-tight">Produtos 100% Originais</div>
                <div className="text-[11px] text-emerald-200/70">Garantia direta dos laboratórios</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-900/60 text-emerald-300 flex items-center justify-center flex-shrink-0 border border-emerald-700/30">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white leading-tight">Entrega em até 1 Hora</div>
                <div className="text-[11px] text-emerald-200/70">Grande Vitória e interior do ES</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-900/60 text-emerald-300 flex items-center justify-center flex-shrink-0 border border-emerald-700/30">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white leading-tight">Autorizada ANVISA</div>
                <div className="text-[11px] text-emerald-200/70">Registro e AFE 1.23456.7</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-900/60 text-emerald-300 flex items-center justify-center flex-shrink-0 border border-emerald-700/30">
                <Heart className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white leading-tight">Farmacêutico 24 Horas</div>
                <div className="text-[11px] text-emerald-200/70">Plantão pelo WhatsApp e Balcão</div>
              </div>
            </div>
          </div>

          {/* Main 4-Column Balanced Grid */}
          <div className="grid grid-cols-4 gap-6 py-5 border-b border-[#0f4d2f]">
            {/* Col 1: Institutional & Contacts */}
            <div className="space-y-2.5">
              <Logo size="md" variant="white" />
              <p className="text-[11px] text-emerald-200/80 leading-relaxed">
                A Farmácia VivaBem nasceu com a missão de levar saúde, cuidado e economia a todos os lares do Espírito Santo.
              </p>
              <div className="text-[11px] text-emerald-100/90 space-y-0.5 pt-0.5">
                <div><strong>Televendas ES:</strong> (27) 3322-9000</div>
                <div><strong>WhatsApp Plantão:</strong> (27) 99876-5432</div>
                <div><strong>E-mail:</strong> atendimento@farmaciavivabem.com.br</div>
              </div>
            </div>

            {/* Col 2: Lojas no ES */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-black text-white uppercase tracking-wider text-emerald-300">
                Lojas no Espírito Santo
              </h4>
              <ul className="text-[11px] space-y-1 text-emerald-200/75">
                <li><strong className="text-white">Vitória (Matriz):</strong> Av. Dante Michelini, 1200</li>
                <li><strong className="text-white">Vitória (Praia do Canto):</strong> Rua Aleixo Netto, 850</li>
                <li><strong className="text-white">Vila Velha:</strong> Av. Hugo Musso, 1420</li>
                <li><strong className="text-white">Serra:</strong> Av. Central, 600 - Laranjeiras</li>
                <li><strong className="text-white">Cariacica:</strong> Av. Expedito Garcia, 420</li>
              </ul>
            </div>

            {/* Col 3: Departamentos */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-black text-white uppercase tracking-wider text-emerald-300">
                Departamentos
              </h4>
              <ul className="text-[11px] space-y-1 text-emerald-200/75">
                <li>Medicamentos de A a Z</li>
                <li>Genéricos com Desconto</li>
                <li>Dermocosméticos & Skincare</li>
                <li>Mamãe e Bebê & Fraldas</li>
                <li>Vitaminas & Imunidade</li>
                <li>Programa Farmácia Popular</li>
              </ul>
            </div>

            {/* Col 4: Atendimento & Ajuda */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-black text-white uppercase tracking-wider text-emerald-300">
                Atendimento & Ajuda
              </h4>
              <ul className="text-[11px] space-y-1 text-emerald-200/75">
                <li>Como Comprar Online</li>
                <li>Prazos e Frete no ES</li>
                <li>Política de Devolução</li>
                <li>Trabalhe Conosco no ES</li>
                <li>Privacidade e Termos de Uso</li>
              </ul>
            </div>
          </div>

          {/* Legal / Regulatory Bottom Row */}
          <div className="pt-3.5 text-[10px] text-emerald-300/70 leading-relaxed space-y-1">
            <p>
              <strong>FARMÁCIA VIVABEM LTDA.</strong> | CNPJ: 18.924.512/0001-44 | Inscrição Estadual: 082.914.55-0 | Av. Dante Michelini, 1200, Loja 04 - Praia de Camburi, Vitória - ES, CEP: 29060-235. Farmacêutico Responsável Técnico: Dr. Roberto Alencar da Silva — CRF/ES nº 4812. Licença Sanitária Municipal: VISA Vitória nº 2026/04192 | Autorização de Funcionamento ANVISA: AFE 1.23456.7 | AE: 1.10982.3.
            </p>
            <p className="text-[9px] text-emerald-400/60">
              As informações contidas neste site têm caráter meramente informativo e não substituem o diagnóstico ou recomendação médica. Medicamentos sob prescrição só serão dispensados mediante apresentação de receita válida. Se persistirem os sintomas, o médico deverá ser consultado.
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-[#0f4d2f] text-[10px] text-emerald-300/80">
              <span>© 2026 Farmácia VivaBem Espírito Santo. Todos os direitos reservados.</span>
              <span className="font-semibold text-emerald-300">Cuidando com carinho da saúde das famílias capixabas</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

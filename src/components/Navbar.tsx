import React, { useState } from 'react';
import { Logo } from './Logo';
import { 
  Search, 
  MapPin, 
  FileText, 
  User, 
  Package, 
  ShoppingBasket,
  ChevronDown, 
  Menu, 
  X,
  Truck,
  Clock,
  Building2,
  PhoneCall,
  Pill,
  Sparkles,
  Smile,
  Baby,
  Heart,
  Tag
} from 'lucide-react';
import { CartItem } from '../types';

interface NavbarProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  onOpenPrescription: () => void;
  onOpenLocation: () => void;
  onOpenAuth: () => void;
  onOpenOrders: () => void;
  selectedCity: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItems,
  onOpenCart,
  onOpenPrescription,
  onOpenLocation,
  onOpenAuth,
  onOpenOrders,
  selectedCity,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const categories = [
    { id: 'todos', label: 'Todos os Departamentos', icon: Pill },
    { id: 'medicamentos', label: 'Medicamentos e Genéricos', icon: Pill },
    { id: 'dermocosmeticos', label: 'Dermocosméticos', icon: Sparkles },
    { id: 'cuidados', label: 'Cuidados Diários e Higiene', icon: Smile },
    { id: 'mamae-bebe', label: 'Mamãe e Bebê', icon: Baby },
    { id: 'vitaminas', label: 'Vitaminas e Suplementos', icon: Heart },
    { id: 'ofertas', label: 'Ofertas da Semana', icon: Tag }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      {/* ======================================================== */}
      {/* 1. MOBILE HEADER (DROGARIA ROSÁRIO AESTHETIC ADAPTED TO VIVABEM) */}
      {/* ======================================================== */}
      <div className="lg:hidden w-full">
        {/* Top Promotional Bar with Red Pill Button */}
        <div className="bg-gradient-to-r from-[#032314] via-[#053820] to-[#084D2C] text-white px-3 py-1.5 flex items-center justify-between text-[11px]">
          <span className="font-semibold text-emerald-100 truncate pr-2">
            Ofertas especiais no WhatsApp e Web
          </span>
          <button
            onClick={() => onSelectCategory('ofertas')}
            className="bg-red-600 hover:bg-red-700 active:scale-95 text-white font-black text-[10px] px-2.5 py-0.5 rounded-full shrink-0 shadow-xs cursor-pointer"
          >
            Confira agora!
          </button>
        </div>

        {/* Sub-bar: 'Ver cupons' and 'Acompanhar pedido' */}
        <div className="bg-[#053F24] text-emerald-100 px-4 py-1.5 flex items-center justify-around border-t border-emerald-700/30 text-[11px] font-semibold">
          <button
            onClick={() => onSelectCategory('ofertas')}
            className="flex items-center gap-1.5 hover:text-white cursor-pointer"
          >
            <Tag className="w-3.5 h-3.5 text-emerald-300" />
            <span>Ver cupons</span>
          </button>
          <span className="text-emerald-600/60">|</span>
          <button
            onClick={onOpenOrders}
            className="flex items-center gap-1.5 hover:text-white cursor-pointer"
          >
            <Package className="w-3.5 h-3.5 text-emerald-300" />
            <span>Acompanhar pedido</span>
          </button>
        </div>

        {/* Main Brand Green Header Bar (Menu, White Logo, User, Basket) */}
        <div className="bg-[#064E3B] px-3.5 pt-2.5 pb-3 text-white space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            {/* Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1 text-white hover:text-emerald-200 cursor-pointer"
              aria-label="Abrir Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 stroke-[2.2]" />}
            </button>

            {/* Farmácia VivaBem Logo (White Variant) */}
            <a href="#" className="flex-shrink-0">
              <Logo size="md" variant="white" />
            </a>

            {/* Right Icons: User Profile & Cart Basket */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={onOpenAuth}
                className="p-1 text-white hover:text-emerald-200 cursor-pointer"
                aria-label="Entrar ou cadastrar"
              >
                <User className="w-6 h-6 stroke-[2]" />
              </button>

              <button
                onClick={onOpenCart}
                className="p-1 text-white hover:text-emerald-200 relative cursor-pointer"
                aria-label="Abrir Cesta"
              >
                <ShoppingBasket className="w-6 h-6 stroke-[2]" />
                {totalItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {totalItemsCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* White Capsule Search Bar: 'Busque por produto ou marca' */}
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Busque por produto ou marca"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-white text-slate-800 placeholder:text-slate-400 pl-4 pr-10 py-2.5 rounded-full shadow-xs text-xs border border-transparent focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            <button
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800"
              aria-label="Buscar"
            >
              <Search className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Mobile Location Strip */}
        <div className="bg-[#053820] text-emerald-100 px-4 py-1.5 flex items-center justify-between text-[11px] border-t border-emerald-700/40">
          <button
            onClick={onOpenLocation}
            className="flex items-center gap-1.5 text-white font-medium cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5 text-emerald-300" />
            <span>Entregar em: <strong>{selectedCity}, ES</strong></span>
            <ChevronDown className="w-3 h-3 text-emerald-300" />
          </button>
          <span className="text-[10px] text-emerald-300 font-bold bg-white/10 px-2 py-0.5 rounded">
            Entrega em 1h
          </span>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. DESKTOP HEADER (FULL DROGASIL / VIVABEM CAPACITIES) */}
      {/* ======================================================== */}
      <div className="hidden lg:block">
        {/* Top Strip */}
        <div className="bg-slate-100 text-slate-700 text-xs py-1.5 px-4 border-b border-slate-200">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 font-semibold text-emerald-800">
                <Truck className="w-3.5 h-3.5 text-emerald-700" />
                Entrega em até 1h na Grande Vitória • ES
              </span>
              <span className="text-slate-300">|</span>
              <span className="flex items-center gap-1 text-slate-600">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                Plantão Farmacêutico 24 Horas
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <button 
                onClick={onOpenLocation}
                className="hover:text-red-700 flex items-center gap-1 text-slate-600 font-medium transition-colors cursor-pointer"
              >
                <Building2 className="w-3.5 h-3.5 text-slate-500" />
                <span>Nossas Lojas no ES</span>
              </button>
              <span className="text-slate-300">|</span>
              <a 
                href="tel:2733229000" 
                className="hover:text-red-700 flex items-center gap-1 text-slate-700 font-semibold transition-colors"
              >
                <PhoneCall className="w-3 h-3 text-red-600" />
                <span>Televendas: (27) 3322-9000</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Desktop Header */}
        <div className="max-w-7xl mx-auto px-4 py-3 sm:py-3.5">
          <div className="flex items-center justify-between gap-6">
            <a href="#" className="flex-shrink-0">
              <Logo size="md" />
            </a>

            {/* Search Bar */}
            <div className="flex-1 max-w-xl mx-2 relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar na VivaBem..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full bg-[#EFEFEF] hover:bg-[#E8E8E8] focus:bg-white text-slate-900 placeholder:text-slate-500 pl-4 pr-10 py-2.5 rounded-full border border-transparent focus:border-slate-300 text-sm transition-all outline-none"
                />
                <button 
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-600 hover:text-red-600"
                  aria-label="Buscar"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* 4 Action Items */}
            <div className="flex items-center gap-5 xl:gap-7 flex-shrink-0">
              {/* Compra rápida */}
              <button
                onClick={onOpenPrescription}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity text-left group cursor-pointer"
              >
                <div className="text-red-700 group-hover:scale-105 transition-transform">
                  <FileText className="w-6 h-6 stroke-[1.8]" />
                </div>
                <div className="leading-tight">
                  <span className="text-[11px] text-slate-500 block">Compra rápida</span>
                  <span className="text-xs font-bold text-slate-900 block whitespace-nowrap">com receita</span>
                </div>
              </button>

              {/* Boas-vindas! Entrar ou cadastrar */}
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity text-left group cursor-pointer"
              >
                <div className="text-red-700 group-hover:scale-105 transition-transform">
                  <User className="w-6 h-6 stroke-[1.8]" />
                </div>
                <div className="leading-tight">
                  <span className="text-[11px] text-slate-500 block">Boas-vindas!</span>
                  <span className="text-xs font-bold text-slate-900 block whitespace-nowrap">Entrar ou cadastrar</span>
                </div>
              </button>

              {/* Acompanhar pedidos */}
              <button
                onClick={onOpenOrders}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity text-left group cursor-pointer"
              >
                <div className="text-red-700 group-hover:scale-105 transition-transform">
                  <Package className="w-6 h-6 stroke-[1.8]" />
                </div>
                <div className="leading-tight">
                  <span className="text-[11px] text-slate-500 block">Acompanhar</span>
                  <span className="text-xs font-bold text-slate-900 block whitespace-nowrap">pedidos</span>
                </div>
              </button>

              {/* Cesta */}
              <button
                onClick={onOpenCart}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity text-left group relative cursor-pointer"
              >
                <div className="text-red-700 group-hover:scale-105 transition-transform relative">
                  <ShoppingBasket className="w-6 h-6 stroke-[1.8]" />
                  {totalItemsCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-red-600 text-white font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                      {totalItemsCount}
                    </span>
                  )}
                </div>
                <div className="leading-tight">
                  <span className="text-[11px] text-slate-500 block">Cesta</span>
                  <span className="text-xs font-bold text-slate-900 block whitespace-nowrap">
                    {totalPrice > 0 ? `R$ ${totalPrice.toFixed(2).replace('.', ',')}` : 'R$ 0,00'}
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Category Horizontal Ribbon on Desktop */}
        <nav className="border-t border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-none text-xs font-semibold text-slate-600">
              {categories.map((cat) => {
                const active = selectedCategory === cat.id;
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => onSelectCategory(cat.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                      active 
                        ? 'bg-red-600 text-white font-bold' 
                        : 'hover:bg-slate-100 text-slate-700 hover:text-red-700'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer Menu (When hamburger clicked) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3 shadow-xl">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
            <button
              onClick={() => { onOpenAuth(); setMobileMenuOpen(false); }}
              className="flex items-center justify-center gap-1.5 py-2 px-3 bg-red-50 text-red-700 rounded-lg font-bold text-xs"
            >
              <User className="w-4 h-4" />
              <span>Entrar / Cadastrar</span>
            </button>
            <button
              onClick={() => { onOpenOrders(); setMobileMenuOpen(false); }}
              className="flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-100 text-slate-700 rounded-lg font-bold text-xs"
            >
              <Package className="w-4 h-4" />
              <span>Meus Pedidos</span>
            </button>
          </div>

          <button
            onClick={() => { onOpenPrescription(); setMobileMenuOpen(false); }}
            className="w-full flex items-center justify-center gap-2 bg-emerald-700 text-white py-2.5 rounded-lg font-bold text-xs"
          >
            <FileText className="w-4 h-4" />
            Compra rápida com receita
          </button>

          <div className="pt-2">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Departamentos</div>
            <div className="grid grid-cols-1 gap-1">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => { onSelectCategory(cat.id); setMobileMenuOpen(false); }}
                    className={`flex items-center gap-2.5 p-2 rounded-lg text-xs font-semibold text-left transition-colors ${
                      selectedCategory === cat.id ? 'bg-red-50 text-red-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-slate-500" />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

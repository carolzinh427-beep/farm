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
      {/* 1. Top Informational Strip */}
      <div className="bg-slate-100 text-slate-700 text-xs py-1.5 px-4 border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-semibold text-emerald-800">
              <Truck className="w-3.5 h-3.5 text-emerald-700" />
              Entrega em até 1h na Grande Vitória • ES
            </span>
            <span className="hidden md:inline text-slate-300">|</span>
            <span className="hidden md:flex items-center gap-1 text-slate-600">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              Plantão Farmacêutico 24 Horas
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button 
              onClick={onOpenLocation}
              className="hover:text-red-700 flex items-center gap-1 text-slate-600 font-medium transition-colors"
            >
              <Building2 className="w-3.5 h-3.5 text-slate-500" />
              <span>Nossas Lojas no ES</span>
            </button>
            <span className="hidden sm:inline text-slate-300">|</span>
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

      {/* 2. Main Drogasil-Style Header Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-3.5">
        <div className="flex items-center justify-between gap-3 lg:gap-6">
          {/* Mobile hamburger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="lg:hidden p-1.5 text-slate-700 hover:text-red-600 focus:outline-none"
            aria-label="Abrir Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Brand Logo */}
          <a href="#" className="flex-shrink-0">
            <Logo size="md" />
          </a>

          {/* Search Bar (Rounded Pill with Magnifying Glass on the right) */}
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

          {/* 4 Signature Drogasil Action Items */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-7 flex-shrink-0">
            {/* 1: Compra rápida com receita */}
            <button
              onClick={onOpenPrescription}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity text-left group"
            >
              <div className="text-red-700 group-hover:scale-105 transition-transform">
                <FileText className="w-6 h-6 stroke-[1.8]" />
              </div>
              <div className="leading-tight">
                <span className="text-[11px] text-slate-500 block">Compra rápida</span>
                <span className="text-xs font-bold text-slate-900 block whitespace-nowrap">com receita</span>
              </div>
            </button>

            {/* 2: Boas-vindas! Entrar ou cadastrar */}
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity text-left group"
            >
              <div className="text-red-700 group-hover:scale-105 transition-transform">
                <User className="w-6 h-6 stroke-[1.8]" />
              </div>
              <div className="leading-tight">
                <span className="text-[11px] text-slate-500 block">Boas-vindas!</span>
                <span className="text-xs font-bold text-slate-900 block whitespace-nowrap">Entrar ou cadastrar</span>
              </div>
            </button>

            {/* 3: Acompanhar pedidos */}
            <button
              onClick={onOpenOrders}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity text-left group"
            >
              <div className="text-red-700 group-hover:scale-105 transition-transform">
                <Package className="w-6 h-6 stroke-[1.8]" />
              </div>
              <div className="leading-tight">
                <span className="text-[11px] text-slate-500 block">Acompanhar</span>
                <span className="text-xs font-bold text-slate-900 block whitespace-nowrap">pedidos</span>
              </div>
            </button>

            {/* 4: Cesta */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity text-left group relative"
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

          {/* Mobile Right: Cart Icon */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenCart}
              className="p-2 text-red-700 hover:text-red-800 relative"
              aria-label="Abrir Cesta"
            >
              <ShoppingBasket className="w-6 h-6 stroke-[2]" />
              {totalItemsCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Delivery location bar */}
        <div className="lg:hidden mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
          <button
            onClick={onOpenLocation}
            className="flex items-center gap-1.5 text-slate-700 font-semibold"
          >
            <MapPin className="w-3.5 h-3.5 text-red-600" />
            <span>Entregar em: <strong>{selectedCity}, ES</strong></span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>
          <span className="text-[11px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded">
            Entrega em 1h
          </span>
        </div>
      </div>

      {/* 3. Category Horizontal Ribbon */}
      <nav className="hidden md:block border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-none text-xs font-semibold text-slate-600">
            {categories.map((cat) => {
              const active = selectedCategory === cat.id;
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md whitespace-nowrap transition-colors ${
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

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3 shadow-lg">
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

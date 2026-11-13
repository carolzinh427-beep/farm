import React, { useState } from 'react';
import { Logo } from './Logo';
import { 
  Search, 
  ShoppingCart, 
  MapPin, 
  FileText, 
  PhoneCall, 
  Clock, 
  ChevronDown, 
  User, 
  Menu, 
  X,
  Truck,
  Pill,
  Sparkles,
  Heart,
  Baby,
  Smile,
  Tag,
  Building2
} from 'lucide-react';
import { CartItem } from '../types';

interface NavbarProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  onOpenPrescription: () => void;
  onOpenLocation: () => void;
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
      {/* 1. Top Informational Strip (Drogasil Style) */}
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

      {/* 2. Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-3.5">
        <div className="flex items-center justify-between gap-3 md:gap-6">
          {/* Mobile hamburger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden p-1.5 text-slate-700 hover:text-red-600 focus:outline-none"
            aria-label="Abrir Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Brand Logo */}
          <a href="#" className="flex-shrink-0">
            <Logo size="md" />
          </a>

          {/* Search Bar (Clean Drogasil Aesthetic) */}
          <div className="flex-1 max-w-2xl relative">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="O que você procura hoje? (Remédios, genéricos, marcas...)"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-slate-50 hover:bg-white focus:bg-white text-slate-900 placeholder:text-slate-400 pl-11 pr-20 py-2.5 rounded-lg border border-slate-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 text-sm transition-all outline-none"
              />
              {searchQuery ? (
                <button 
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-800 px-2 py-0.5 rounded"
                >
                  Limpar
                </button>
              ) : (
                <button 
                  className="hidden sm:block absolute right-2.5 top-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-md transition-colors"
                >
                  Buscar
                </button>
              )}
            </div>
          </div>

          {/* Location Delivery Selector (Drogasil Style) */}
          <button
            onClick={onOpenLocation}
            className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all text-left"
          >
            <MapPin className="w-4 h-4 text-red-600 flex-shrink-0" />
            <div className="leading-tight">
              <span className="text-[10px] text-slate-500 block uppercase tracking-wider font-semibold">Entregar em</span>
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                {selectedCity}, ES
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </span>
            </div>
          </button>

          {/* User & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Send Prescription Button (Clean Medical Pill Style) */}
            <button
              onClick={onOpenPrescription}
              className="hidden sm:flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-3.5 py-2.5 rounded-lg transition-all shadow-xs"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Enviar Receita</span>
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2.5 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold text-xs px-3.5 py-2.5 rounded-lg transition-all shadow-xs"
            >
              <div className="relative">
                <ShoppingCart className="w-4 h-4" />
                {totalItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white text-red-600 font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow">
                    {totalItemsCount}
                  </span>
                )}
              </div>
              <span className="hidden md:inline font-bold">
                {totalPrice > 0 ? `R$ ${totalPrice.toFixed(2).replace('.', ',')}` : 'Cesta'}
              </span>
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

      {/* 3. Category Horizontal Ribbon (Drogasil Desktop Style) */}
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
          <button
            onClick={() => { onOpenPrescription(); setMobileMenuOpen(false); }}
            className="w-full flex items-center justify-center gap-2 bg-emerald-700 text-white py-2.5 rounded-lg font-bold text-xs"
          >
            <FileText className="w-4 h-4" />
            Enviar Receita Médica no WhatsApp
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

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
  Heart, 
  User, 
  Menu, 
  X,
  Truck,
  Sparkles
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
    { id: 'todos', label: 'Todos os Produtos', icon: '🏪' },
    { id: 'medicamentos', label: 'Medicamentos & Genéricos', icon: '💊' },
    { id: 'dermocosmeticos', label: 'Dermocosméticos', icon: '✨' },
    { id: 'cuidados', label: 'Cuidados Diários', icon: '🧴' },
    { id: 'mamae-bebe', label: 'Mamãe & Bebê', icon: '👶' },
    { id: 'vitaminas', label: 'Vitaminas & Suplementos', icon: '🌿' },
    { id: 'ofertas', label: 'Ofertas Relâmpago ⚡', icon: '🔥' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-slate-100">
      {/* 1. Super Top Banner (Drogasil Style) */}
      <div className="bg-slate-900 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium text-emerald-400">
              <Truck className="w-3.5 h-3.5" />
              Entrega Rápida em até 1h na Grande Vitória • ES
            </span>
            <span className="hidden md:inline-block text-slate-500">|</span>
            <span className="hidden md:flex items-center gap-1 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              Farmácia de Plantão 24 Horas
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <a 
              href="tel:2733229000" 
              className="hover:text-white flex items-center gap-1 transition-colors"
            >
              <PhoneCall className="w-3 h-3 text-red-400" />
              <span>Televendas: <strong>(27) 3322-9000</strong></span>
            </a>
            <span className="hidden sm:inline-block text-slate-600">•</span>
            <span className="hidden sm:inline-block font-semibold text-emerald-400">
              Farmácia Popular Ativa
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-3 md:gap-8">
          {/* Mobile hamburger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden p-2 text-slate-700 hover:text-red-600 focus:outline-none"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Brand Logo */}
          <a href="#" className="flex-shrink-0">
            <Logo size="md" />
          </a>

          {/* Search Bar (Drogasil style with red accent) */}
          <div className="flex-1 max-w-2xl relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Busque por medicamento, genérico, marca ou sintoma..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-slate-100 hover:bg-slate-50 focus:bg-white text-slate-900 placeholder:text-slate-400 pl-11 pr-24 py-2.5 sm:py-3 rounded-full border border-slate-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 text-sm transition-all outline-none"
              />
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              {searchQuery && (
                <button 
                  onClick={() => onSearchChange('')}
                  className="absolute right-20 top-1/2 -translate-y-1/2 text-xs bg-slate-200 hover:bg-slate-300 text-slate-600 px-2 py-1 rounded-full"
                >
                  Limpar
                </button>
              )}
              <button 
                className="hidden sm:flex absolute right-1.5 top-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs px-4 py-2 rounded-full items-center gap-1 transition-colors shadow-sm"
              >
                Buscar
              </button>
            </div>
          </div>

          {/* Delivery Location in Espírito Santo */}
          <button
            onClick={onOpenLocation}
            className="hidden lg:flex items-center gap-2 p-2 hover:bg-slate-50 rounded-xl border border-transparent hover:border-slate-200 transition-all text-left"
          >
            <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="leading-tight">
              <span className="text-[11px] text-slate-500 block">Entregar em</span>
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                {selectedCity}, ES
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </span>
            </div>
          </button>

          {/* Actions: Send Prescription & Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Send Prescription Button (Crucial Drogasil Feature) */}
            <button
              onClick={onOpenPrescription}
              className="hidden sm:flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-xs px-3.5 py-2.5 rounded-full transition-all shadow-sm group"
            >
              <FileText className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
              <span>Enviar Receita</span>
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-semibold text-xs px-3 sm:px-4 py-2.5 rounded-full transition-all shadow-md shadow-red-600/20"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5" />
                {totalItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white text-red-600 font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow">
                    {totalItemsCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">
                {totalPrice > 0 ? `R$ ${totalPrice.toFixed(2).replace('.', ',')}` : 'Cesta'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Category Bar (Drogasil Inspired Dropdown Ribbon) */}
      <nav className="border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-none text-xs font-semibold text-slate-600">
            {categories.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full whitespace-nowrap transition-all ${
                    active 
                      ? 'bg-red-600 text-white shadow-sm font-bold' 
                      : 'hover:bg-slate-100 text-slate-700 hover:text-red-600'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <button
              onClick={() => { onOpenLocation(); setMobileMenuOpen(false); }}
              className="flex items-center gap-2 text-sm text-slate-700 font-semibold"
            >
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>Entregar em: {selectedCity}, ES</span>
            </button>
          </div>

          <button
            onClick={() => { onOpenPrescription(); setMobileMenuOpen(false); }}
            className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white py-2.5 rounded-xl font-bold text-sm"
          >
            <FileText className="w-4 h-4" />
            Enviar Receita Médica
          </button>

          <div className="pt-2">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Categorias</div>
            <div className="grid grid-cols-2 gap-2">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => { onSelectCategory(cat.id); setMobileMenuOpen(false); }}
                  className={`text-left p-2 rounded-lg text-xs font-medium ${
                    selectedCategory === cat.id ? 'bg-red-50 text-red-700 font-bold' : 'text-slate-700 bg-slate-50'
                  }`}
                >
                  {cat.icon} {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};


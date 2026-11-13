import React, { useState, useMemo } from 'react';
import { PRODUCTS, ES_CITIES } from './data/products';
import { Product, CartItem } from './types';
import { Navbar } from './components/Navbar';
import { HeroSlider } from './components/HeroSlider';
import { CategoryCircles } from './components/CategoryCircles';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { PrescriptionModal } from './components/PrescriptionModal';
import { LocationModal } from './components/LocationModal';
import { Footer } from './components/Footer';
import { 
  Clock, 
  ChevronRight, 
  ShieldCheck, 
  CheckCircle,
  FileText,
  Home,
  Grid,
  ShoppingCart,
  PhoneCall,
  Search
} from 'lucide-react';

export const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPrescriptionOpen, setIsPrescriptionOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Vitória');
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Cart operations
  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    setToastMessage(`Item adicionado à cesta!`);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Filtered products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.dosage && product.dosage.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === 'todos' ||
        (selectedCategory === 'ofertas' ? Boolean(product.discountPercentage && product.discountPercentage >= 20) : product.category === selectedCategory);

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const lightningDeals = useMemo(() => {
    return PRODUCTS.filter((p) => p.discountPercentage && p.discountPercentage >= 25).slice(0, 4);
  }, []);

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const brands = [
    'EMS',
    'Medley',
    'Eurofarma',
    'La Roche-Posay',
    'CeraVe',
    'Pampers',
    'Sanofi',
    'Redoxon'
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 pb-16 md:pb-0">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-6 right-6 z-50 bg-slate-900 text-white font-bold text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 border border-slate-700">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navbar with full Drogasil features */}
      <Navbar
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenPrescription={() => setIsPrescriptionOpen(true)}
        onOpenLocation={() => setIsLocationOpen(true)}
        selectedCity={selectedCity}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Hero Banner Slider (Clean, No Emojis, No Floating Tags) */}
      {selectedCategory === 'todos' && !searchQuery && (
        <HeroSlider
          onOpenPrescription={() => setIsPrescriptionOpen(true)}
          onSelectCategory={setSelectedCategory}
        />
      )}

      {/* Drogasil Visual Navigation: Compre por Categoria (Circles) */}
      {!searchQuery && (
        <CategoryCircles
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onOpenPrescription={() => setIsPrescriptionOpen(true)}
        />
      )}

      {/* Featured Deals Carousel/Section */}
      {selectedCategory === 'todos' && !searchQuery && (
        <section className="max-w-7xl mx-auto px-4 py-2 sm:py-4 w-full">
          <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-xs mb-6">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                  Ofertas em Destaque
                </h2>
                <p className="text-xs text-slate-500">
                  Descontos especiais com entrega rápida em {selectedCity}
                </p>
              </div>

              {/* Countdown badge (Drogasil Clean Style) */}
              <div className="flex items-center gap-2 bg-red-50 text-red-700 px-3 py-1 rounded-md border border-red-200 text-xs font-bold">
                <Clock className="w-3.5 h-3.5" />
                <span>Ofertas válidas por tempo limitado</span>
              </div>
            </div>

            {/* Product Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {lightningDeals.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  isInCart={cartItems.some((i) => i.id === product.id)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Catalog View */}
      <main className="max-w-7xl mx-auto px-4 py-2 flex-1 w-full">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              {searchQuery
                ? `Resultados para "${searchQuery}"`
                : selectedCategory === 'todos'
                ? 'Mais Vendidos da Farmácia'
                : `Departamento: ${selectedCategory.toUpperCase()}`}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {filteredProducts.length} produtos disponíveis para entrega em <strong>{selectedCity} - ES</strong>
            </p>
          </div>

          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1 rounded"
            >
              Limpar busca
            </button>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 space-y-3 my-6">
            <h3 className="font-bold text-slate-800 text-base">Nenhum produto encontrado</h3>
            <p className="text-slate-500 text-xs max-w-sm mx-auto">
              Não encontramos o item buscado no catálogo online. Você pode enviar sua receita diretamente para nosso WhatsApp!
            </p>
            <button
              onClick={() => setIsPrescriptionOpen(true)}
              className="mt-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow-xs"
            >
              Consultar Farmacêutico no WhatsApp
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                isInCart={cartItems.some((i) => i.id === product.id)}
              />
            ))}
          </div>
        )}

        {/* Brands Carousel (Clean Text Badges) */}
        {selectedCategory === 'todos' && !searchQuery && (
          <div className="mt-10 pt-6 border-t border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Marcas e Laboratórios Oficiais
              </span>
              <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Procedência Garantida
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
              {brands.map((b) => (
                <div
                  key={b}
                  className="bg-white border border-slate-200 rounded-lg p-2.5 text-center hover:border-slate-300 transition-colors cursor-pointer"
                  onClick={() => setSearchQuery(b)}
                >
                  <div className="text-xs font-bold text-slate-800 truncate">{b}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Institutional Banner: Farmácia Popular (Clean Drogasil Corporate Design) */}
        <div className="mt-8 bg-emerald-900 rounded-2xl p-5 sm:p-7 text-white shadow-xs">
          <div className="max-w-2xl space-y-2">
            <h3 className="text-xl sm:text-2xl font-black leading-tight">
              Programa Farmácia Popular no Espírito Santo
            </h3>
            <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
              Retire medicamentos para Hipertensão, Diabetes, Asma, Osteoporose e Anticoncepcionais com gratuidade pelo SUS em nossas lojas de Vitória, Vila Velha e Serra.
            </p>
            <div className="pt-2 flex flex-wrap gap-2.5">
              <button
                onClick={() => setIsPrescriptionOpen(true)}
                className="bg-white hover:bg-slate-100 text-emerald-900 font-bold text-xs px-4 py-2.5 rounded-lg transition-colors"
              >
                Enviar Receita pelo WhatsApp
              </button>
              <button
                onClick={() => setIsLocationOpen(true)}
                className="bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-lg border border-emerald-600/40 transition-colors"
              >
                Nossas Lojas no ES
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        selectedCity={selectedCity}
      />

      {/* Prescription Modal */}
      <PrescriptionModal
        isOpen={isPrescriptionOpen}
        onClose={() => setIsPrescriptionOpen(false)}
        selectedCity={selectedCity}
      />

      {/* Location Modal */}
      <LocationModal
        isOpen={isLocationOpen}
        onClose={() => setIsLocationOpen(false)}
        selectedCity={selectedCity}
        onSelectCity={setSelectedCity}
      />

      {/* Footer */}
      <Footer />

      {/* Mobile App-Style Bottom Navigation Bar (Drogasil Signature Mobile Feature) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 px-3 py-2 flex items-center justify-around shadow-lg">
        <button
          onClick={() => { setSelectedCategory('todos'); setSearchQuery(''); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex flex-col items-center gap-0.5 text-slate-600 hover:text-red-600 focus:text-red-600"
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Início</span>
        </button>

        <button
          onClick={() => {
            const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
            if (searchInput) searchInput.focus();
          }}
          className="flex flex-col items-center gap-0.5 text-slate-600 hover:text-red-600"
        >
          <Search className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Buscar</span>
        </button>

        <button
          onClick={() => setIsPrescriptionOpen(true)}
          className="flex flex-col items-center gap-0.5 text-emerald-800 hover:text-emerald-900"
        >
          <FileText className="w-5 h-5 text-emerald-700" />
          <span className="text-[10px] font-bold">Receita</span>
        </button>

        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center gap-0.5 text-slate-600 hover:text-red-600 relative"
        >
          <div className="relative">
            <ShoppingCart className="w-5 h-5" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-red-600 text-white font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                {totalItemsCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-semibold">Cesta</span>
        </button>
      </div>
    </div>
  );
};
export default App;

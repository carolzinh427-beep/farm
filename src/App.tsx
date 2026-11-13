import React, { useState, useMemo } from 'react';
import { PRODUCTS, ES_CITIES } from './data/products';
import { Product, CartItem } from './types';
import { Navbar } from './components/Navbar';
import { HeroSlider } from './components/HeroSlider';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { PrescriptionModal } from './components/PrescriptionModal';
import { LocationModal } from './components/LocationModal';
import { Footer } from './components/Footer';
import { 
  Sparkles, 
  Flame, 
  Clock, 
  ChevronRight, 
  ShieldCheck, 
  HeartHandshake, 
  FileCheck,
  CheckCircle,
  Truck
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

    setToastMessage(`"${product.name.slice(0, 28)}..." adicionado à cesta!`);
    setTimeout(() => setToastMessage(null), 3000);
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

  // Filtered products based on search & category
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
    return PRODUCTS.filter((p) => p.discountPercentage && p.discountPercentage >= 25);
  }, []);

  const generics = useMemo(() => {
    return PRODUCTS.filter((p) => p.isGeneric);
  }, []);

  const brands = [
    { name: 'EMS Genéricos', logo: '💊 EMS' },
    { name: 'Medley', logo: '⚕️ Medley' },
    { name: 'Eurofarma', logo: '💉 Eurofarma' },
    { name: 'La Roche-Posay', logo: '✨ La Roche' },
    { name: 'CeraVe', logo: '🧴 CeraVe' },
    { name: 'Pampers', logo: '👶 Pampers' },
    { name: 'Sanofi', logo: '❤️ Sanofi' },
    { name: 'Redoxon', logo: '🍊 Redoxon' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-700 text-white font-bold text-xs px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 border border-emerald-500 animate-bounce">
          <CheckCircle className="w-4 h-4 text-emerald-200" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navbar with full features */}
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

      {/* Hero Banner Slider */}
      {selectedCategory === 'todos' && !searchQuery && (
        <HeroSlider
          onOpenPrescription={() => setIsPrescriptionOpen(true)}
          onSelectCategory={setSelectedCategory}
        />
      )}

      {/* Brands Trust Carousel */}
      {selectedCategory === 'todos' && !searchQuery && (
        <div className="max-w-7xl mx-auto px-4 py-6 w-full">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Laboratórios & Marcas Oficiais no ES
            </span>
            <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Originais
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
            {brands.map((b) => (
              <div
                key={b.name}
                className="bg-white border border-slate-200/80 rounded-xl p-2.5 text-center hover:border-red-400 hover:shadow-xs transition-all cursor-pointer"
                onClick={() => setSearchQuery(b.name.split(' ')[0])}
              >
                <div className="text-xs font-bold text-slate-700 truncate">{b.logo}</div>
                <div className="text-[10px] text-slate-400 truncate">{b.name}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lightning Deals Section (Drogasil Style) */}
      {selectedCategory === 'todos' && !searchQuery && (
        <section className="max-w-7xl mx-auto px-4 py-6 w-full">
          <div className="bg-gradient-to-r from-red-600 to-rose-700 rounded-3xl p-5 sm:p-7 text-white shadow-lg mb-6">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-amber-300">
                  <Flame className="w-5 h-5 fill-amber-300" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                    Ofertas Relâmpago do Dia
                  </h2>
                  <p className="text-xs text-red-100">
                    Descontos imperdíveis com entrega expressa em {selectedCity}
                  </p>
                </div>
              </div>

              {/* Countdown badge */}
              <div className="flex items-center gap-2 bg-black/30 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-bold text-amber-300">
                <Clock className="w-3.5 h-3.5" />
                <span>Termina em: <strong>04h : 28m : 12s</strong></span>
              </div>
            </div>

            {/* Lightning Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
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
      <main className="max-w-7xl mx-auto px-4 py-4 flex-1 w-full">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {searchQuery
                ? `Resultados para "${searchQuery}"`
                : selectedCategory === 'todos'
                ? 'Todos os Produtos em Destaque'
                : `Categoria: ${selectedCategory.toUpperCase()}`}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Exibindo <strong>{filteredProducts.length}</strong> produtos disponíveis para entrega em <strong>{selectedCity} - ES</strong>
            </p>
          </div>

          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-full"
            >
              Limpar busca
            </button>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3 my-8">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-2xl">
              🔍
            </div>
            <h3 className="font-extrabold text-slate-800 text-lg">Nenhum produto encontrado</h3>
            <p className="text-slate-500 text-xs max-w-sm mx-auto">
              Não encontramos o item buscado no catálogo online. Você pode enviar sua receita diretamente para nosso WhatsApp!
            </p>
            <button
              onClick={() => setIsPrescriptionOpen(true)}
              className="mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-full shadow"
            >
              Consultar Farmacêutico no WhatsApp
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
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

        {/* Special Banner: Farmácia Popular & Receitas */}
        <div className="mt-12 bg-emerald-800 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl space-y-3">
            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-extrabold text-amber-300 inline-flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5" />
              CONVÊNIO MINISTÉRIO DA SAÚDE
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight">
              Programa Farmácia Popular no Espírito Santo
            </h3>
            <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
              Pegue medicamentos para Hipertensão, Diabetes, Asma, Osteoporose e Anticoncepcionais com até 100% de gratuidade em nossas lojas de Vitória, Vila Velha e Serra.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => setIsPrescriptionOpen(true)}
                className="bg-white hover:bg-slate-100 text-emerald-900 font-extrabold text-xs px-5 py-3 rounded-full shadow transition-all"
              >
                Enviar Receita pelo WhatsApp
              </button>
              <button
                onClick={() => setIsLocationOpen(true)}
                className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs px-5 py-3 rounded-full border border-emerald-500/40 transition-all"
              >
                Encontrar Loja VivaBem no ES
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

      {/* Regulatory Footer */}
      <Footer />
    </div>
  );
};
export default App;


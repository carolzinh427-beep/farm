import React, { useState, useMemo } from 'react';
import { PRODUCTS, ES_CITIES } from './data/products';
import { Product, CartItem } from './types';
import { Navbar } from './components/Navbar';
import { HeroSlider } from './components/HeroSlider';
import { BenefitStrip } from './components/BenefitStrip';
import { ProductCard } from './components/ProductCard';
import { ProductCarousel } from './components/ProductCarousel';
import { CareBannerCarousel } from './components/CareBannerCarousel';
import { HealthServicesCarousel } from './components/HealthServicesCarousel';
import { BlackFridayCampaignCards } from './components/BlackFridayCampaignCards';
import { EcosystemCards } from './components/EcosystemCards';
import { CartDrawer } from './components/CartDrawer';
import { PrescriptionModal } from './components/PrescriptionModal';
import { LocationModal } from './components/LocationModal';
import { AuthModal } from './components/AuthModal';
import { OrdersModal } from './components/OrdersModal';
import { Footer } from './components/Footer';
import { 
  ShieldCheck, 
  CheckCircle,
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
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
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

  // Filtered products for search or category selection
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

  // Carousels data
  const blackFridayDeals = useMemo(() => {
    // Sort by discount percentage descending
    return [...PRODUCTS].sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0));
  }, []);

  const bestSellers = useMemo(() => {
    return [...PRODUCTS].sort((a, b) => b.reviewsCount - a.reviewsCount);
  }, []);

  // Most purchased items with social proof & high daily demand
  const mostPurchased = useMemo(() => {
    const priorityOrder = ['1', '2', '5', '4', '7', '9', '6', '3', '10', '11', '12', '8'];
    return priorityOrder
      .map((id) => PRODUCTS.find((p) => p.id === id))
      .filter((p): p is Product => Boolean(p));
  }, []);

  const dermocareProducts = useMemo(() => {
    return PRODUCTS.filter((p) => p.category === 'dermocosmeticos' || p.category === 'cuidados');
  }, []);

  // Personalized suggestions for user
  const suggestedProducts = useMemo(() => {
    const recOrder = ['6', '5', '3', '4', '1', '7', '10', '11', '9', '2', '12', '8'];
    return recOrder
      .map((id) => PRODUCTS.find((p) => p.id === id))
      .filter((p): p is Product => Boolean(p));
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
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 pb-20 md:pb-0 overflow-x-hidden w-full max-w-full relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-6 right-6 z-50 bg-slate-900 text-white font-bold text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-2">
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
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenOrders={() => setIsOrdersOpen(true)}
        selectedCity={selectedCity}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Hero Banner Slider & Quick Access */}
      {selectedCategory === 'todos' && !searchQuery && (
        <>
          <HeroSlider
            onOpenPrescription={() => setIsPrescriptionOpen(true)}
            onSelectCategory={setSelectedCategory}
          />
          <BenefitStrip
            onOpenLocation={() => setIsLocationOpen(true)}
            onOpenPrescription={() => setIsPrescriptionOpen(true)}
            onSelectCategory={setSelectedCategory}
          />
        </>
      )}

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-4 flex-1 w-full max-w-full space-y-4 sm:space-y-6 overflow-hidden sm:overflow-visible">
        {/* If user is browsing home (todos and no search) show Carousels with Drogasil Arrows */}
        {selectedCategory === 'todos' && !searchQuery ? (
          <>
            {/* CAROUSEL 1: Esquenta Black Friday com até 70% (with ← and → arrows) */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-slate-200 shadow-xs">
              <ProductCarousel
                title="Esquenta Black Friday com até 70%"
                subtitle={`Descontos imperdíveis com entrega rápida em ${selectedCity} e Grande Vitória`}
                badge="Black Friday"
                products={blackFridayDeals}
                onAddToCart={handleAddToCart}
                cartItems={cartItems}
                onViewAll={() => setSelectedCategory('ofertas')}
              />
            </div>

            {/* CAROUSEL 2: Mais Comprados no Espírito Santo (with ← and → arrows) */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-slate-200 shadow-xs">
              <ProductCarousel
                title="Mais Comprados da Farmácia"
                subtitle={`Os itens mais vendidos e procurados pelas famílias de ${selectedCity} e todo o ES`}
                badge="Mais Pedidos"
                products={mostPurchased}
                onAddToCart={handleAddToCart}
                cartItems={cartItems}
              />
            </div>

            {/* EDITORIAL CAROUSEL: Cuidados que você merece (Exact Drogasil Lifestyle Banners) */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-slate-200 shadow-xs">
              <CareBannerCarousel onSelectCategory={setSelectedCategory} />
            </div>

            {/* SERVICES CAROUSEL: Espaço Mais Saúde (Exact Drogasil Health Space) */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-slate-200 shadow-xs">
              <HealthServicesCarousel
                onScheduleService={(service) => {
                  const msg = encodeURIComponent(`Olá! Gostaria de agendar o atendimento de ${service} na Farmácia VivaBem.`);
                  window.open(`https://wa.me/5527999990000?text=${msg}`, '_blank');
                }}
              />
            </div>

            {/* CAROUSEL 3: Sugestões para você (Personalized recommendations with ← and → arrows) */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-slate-200 shadow-xs">
              <ProductCarousel
                title="Sugestões para você"
                subtitle={`Recomendações personalizadas com base nos produtos mais procurados em ${selectedCity}`}
                badge="Para Você"
                products={suggestedProducts}
                onAddToCart={handleAddToCart}
                cartItems={cartItems}
              />
            </div>

            {/* CAROUSEL 4: Dermocosméticos e Cuidados Diários (with ← and → arrows) */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-slate-200 shadow-xs">
              <ProductCarousel
                title="Dermocosméticos e Cuidados Pessoais"
                subtitle="Proteção solar, hidratação profunda e higiene completa"
                products={dermocareProducts}
                onAddToCart={handleAddToCart}
                cartItems={cartItems}
                onViewAll={() => setSelectedCategory('dermocosmeticos')}
              />
            </div>

            {/* Official Brand Logos / Badges */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-3 px-1">
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
                  >
                    <span className="text-xs font-bold text-slate-700">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* BLACK VIVABEM CAMPAIGN CARDS (Promoção de Ofertas) */}
            <div className="pt-2">
              <BlackFridayCampaignCards onSelectCategory={setSelectedCategory} />
            </div>

            {/* ECOSYSTEM CARDS: Manipulação, Blog, VivaBem Especialidades, Dose Certa */}
            <div className="pt-2">
              <EcosystemCards
                onOpenPrescription={() => setIsPrescriptionOpen(true)}
                onSelectCategory={setSelectedCategory}
              />
            </div>
          </>
        ) : (
          /* Filtered Search or Category View */
          <div>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                  {searchQuery
                    ? `Resultados para "${searchQuery}"`
                    : `Departamento: ${selectedCategory.toUpperCase()}`}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {filteredProducts.length} produtos disponíveis para entrega em <strong>{selectedCity} - ES</strong>
                </p>
              </div>

              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('todos');
                }}
                className="text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1 rounded"
              >
                Ver todos os departamentos
              </button>
            </div>

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
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3">
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
          </div>
        )}
      </main>

      {/* Modals and Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        selectedCity={selectedCity}
        onOpenPrescription={() => {
          setIsCartOpen(false);
          setIsPrescriptionOpen(true);
        }}
      />

      <PrescriptionModal
        isOpen={isPrescriptionOpen}
        onClose={() => setIsPrescriptionOpen(false)}
      />

      <LocationModal
        isOpen={isLocationOpen}
        onClose={() => setIsLocationOpen(false)}
        selectedCity={selectedCity}
        onSelectCity={setSelectedCity}
        cities={ES_CITIES}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      <OrdersModal
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
      />

      {/* Footer */}
      <Footer onOpenPrescription={() => setIsPrescriptionOpen(true)} />

      {/* Mobile Sticky Bottom Nav Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-2 z-40 flex items-center justify-around shadow-lg">
        <button
          onClick={() => {
            setSelectedCategory('todos');
            setSearchQuery('');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex flex-col items-center text-red-600 font-bold text-[10px]"
        >
          <Home className="w-5 h-5" />
          <span>Início</span>
        </button>

        <button
          onClick={() => setSelectedCategory('ofertas')}
          className="flex flex-col items-center text-slate-600 hover:text-red-600 font-bold text-[10px]"
        >
          <Grid className="w-5 h-5" />
          <span>Ofertas</span>
        </button>

        <button
          onClick={() => setIsPrescriptionOpen(true)}
          className="flex flex-col items-center text-emerald-700 font-bold text-[10px]"
        >
          <PhoneCall className="w-5 h-5" />
          <span>WhatsApp</span>
        </button>

        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center text-slate-700 relative font-bold text-[10px]"
        >
          <ShoppingCart className="w-5 h-5" />
          {totalItemsCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-600 text-white rounded-full text-[9px] w-4 h-4 flex items-center justify-center font-bold">
              {totalItemsCount}
            </span>
          )}
          <span>Cesta</span>
        </button>
      </div>
    </div>
  );
};

export default App;


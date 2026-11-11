import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StorySection } from './components/StorySection';
import { MenuCatalog } from './components/MenuCatalog';
import { QuantityCalculator } from './components/QuantityCalculator';
import { GallerySection } from './components/GallerySection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { OrderDrawer } from './components/OrderDrawer';
import { CartItem, ProductItem } from './types/bakery';
import { ShoppingBag, Check } from 'lucide-react';

export default function App() {
  const [currency, setCurrency] = useState<'KM' | 'EUR'>('KM');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Cart with localStorage persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('jasminka_be_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('jasminka_be_cart', JSON.stringify(cart));
    } catch {
      // localStorage may fail in private mode
    }
  }, [cart]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddToCart = (product: ProductItem, quantity: number = 1, customNote?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: Math.round((next[existingIndex].quantity + quantity) * 10) / 10,
          customNote: customNote || next[existingIndex].customNote,
        };
        return next;
      }
      return [...prev, { product, quantity, customNote }];
    });
    showToast(`Dodano: ${quantity} ${product.unit} ${product.name}`);
  };

  const handleAddMultiple = (items: { product: ProductItem; quantity: number }[]) => {
    setCart((prev) => {
      let next = [...prev];
      for (const item of items) {
        const existingIndex = next.findIndex((p) => p.product.id === item.product.id);
        if (existingIndex > -1) {
          next[existingIndex] = {
            ...next[existingIndex],
            quantity: Math.round((next[existingIndex].quantity + item.quantity) * 10) / 10,
          };
        } else {
          next.push({ product: item.product, quantity: item.quantity });
        }
      }
      return next;
    });
    showToast(`Preporučeni asortiman je dodan u korpu!`);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: Math.round(quantity * 10) / 10 } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleToggleCurrency = () => {
    setCurrency((prev) => (prev === 'KM' ? 'EUR' : 'KM'));
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cart.reduce((sum, item) => sum + (item.product.unit === 'kg' ? Math.ceil(item.quantity) : item.quantity), 0);

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#FAF7F2] text-[#2D2424] flex flex-col selection:bg-[#E8C5B0] selection:text-[#2D2424]">
      
      {/* Top Navbar */}
      <Navbar
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        currency={currency}
        onToggleCurrency={handleToggleCurrency}
      />

      {/* Main Content Sections */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        <Hero
          onExploreMenu={() => scrollToSection('cjenovnik')}
          onOpenStory={() => scrollToSection('o-meni')}
        />
        <StorySection />
        <MenuCatalog
          onAddToCart={handleAddToCart}
          onSelectProduct={(product) => setSelectedProduct(product)}
          currency={currency}
        />
        <QuantityCalculator
          onAddRecommendation={handleAddMultiple}
          currency={currency}
        />
        <GallerySection />
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        currency={currency}
      />

      {/* Order & Checkout Drawer */}
      <OrderDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        currency={currency}
      />

      {/* Floating Cart Pill for Quick Mobile Checkout */}
      {totalCartCount > 0 && !isCartOpen && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-40 max-w-[calc(100vw-2rem)]">
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2.5 px-4 sm:px-5 py-3 sm:py-3.5 bg-[#8C4830] hover:bg-[#733621] text-white font-bold text-xs sm:text-sm rounded-full shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full" />
            </div>
            <span>Otvori korpu ({totalCartCount})</span>
          </button>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#301F1B] text-white px-4 py-2.5 rounded-xl shadow-lg border border-[#523A36] text-xs sm:text-sm font-medium flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}

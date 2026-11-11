import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Sparkles } from 'lucide-react';
import { CartItem } from '../types/bakery';

interface NavbarProps {
  cart: CartItem[];
  onOpenCart: () => void;
  currency: 'KM' | 'EUR';
  onToggleCurrency: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cart,
  onOpenCart,
  currency,
  onToggleCurrency,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalItemsCount = cart.reduce((sum, item) => sum + (item.product.unit === 'kg' ? Math.ceil(item.quantity) : item.quantity), 0);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DEC8] transition-colors w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Strict 3-Zone Top Bar Contract */}
        <div className="flex items-center justify-between gap-2 sm:gap-6 lg:gap-8 h-20">
          
          {/* Zone 1: Brand Wordmark (Single Text Element) */}
          <a href="#" className="flex items-center gap-2 group whitespace-nowrap shrink-0 min-w-0">
            <span className="font-display text-xl sm:text-3xl font-bold tracking-tight text-[#3B2621] group-hover:text-[#8C4830] transition-colors">
              Jasminka Be
            </span>
            <span className="text-xs font-serif italic text-[#8C4830] tracking-wide hidden sm:inline-block">
              · Slatko od srca
            </span>
          </a>

          {/* Zone 2: 4-5 concise single-line nav links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#5C4A42]">
            <a
              href="#cjenovnik"
              className="hover:text-[#8C4830] transition-colors whitespace-nowrap shrink-0"
            >
              Cjenovnik & Proizvodi
            </a>
            <a
              href="#o-meni"
              className="hover:text-[#8C4830] transition-colors whitespace-nowrap shrink-0"
            >
              Moja Priča
            </a>
            <a
              href="#kalkulator"
              className="hover:text-[#8C4830] transition-colors whitespace-nowrap shrink-0"
            >
              Kalkulator Količine
            </a>
            <a
              href="#galerija"
              className="hover:text-[#8C4830] transition-colors whitespace-nowrap shrink-0"
            >
              Galerija
            </a>
            <a
              href="#kontakt"
              className="hover:text-[#8C4830] transition-colors whitespace-nowrap shrink-0"
            >
              Kontakt & Narudžba
            </a>
          </nav>

          {/* Zone 3: Primary Action & Currency selector */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Currency switcher */}
            <button
              onClick={onToggleCurrency}
              className="px-2 py-1 text-[11px] sm:text-xs font-semibold rounded-md border border-[#D5C2B2] text-[#5C4A42] hover:bg-[#EFE8DD] transition-colors whitespace-nowrap shrink-0"
              title="Promijeni prikaz valute (KM / EUR)"
              aria-label="Promjena valute"
            >
              {currency === 'KM' ? 'KM' : 'EUR'}
            </button>

            {/* Shopping cart / order trigger */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-1.5 px-2.5 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white bg-[#8C4830] hover:bg-[#733621] active:scale-95 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0"
              aria-label="Otvori korpu"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Moja Narudžba</span>
              {totalItemsCount > 0 && (
                <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold bg-[#FAF7F2] text-[#8C4830] rounded-full">
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-[#5C4A42] hover:text-[#8C4830] focus:outline-none"
              aria-label="Meni"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E8DEC8] bg-[#FAF7F2] px-4 pt-3 pb-5 space-y-3">
          <a
            href="#cjenovnik"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-[#5C4A42] hover:text-[#8C4830]"
          >
            Cjenovnik & Proizvodi
          </a>
          <a
            href="#o-meni"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-[#5C4A42] hover:text-[#8C4830]"
          >
            Moja Priča
          </a>
          <a
            href="#kalkulator"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-[#5C4A42] hover:text-[#8C4830]"
          >
            Kalkulator Količine za Goste
          </a>
          <a
            href="#galerija"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-[#5C4A42] hover:text-[#8C4830]"
          >
            Galerija & Fotografije
          </a>
          <a
            href="#kontakt"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-[#5C4A42] hover:text-[#8C4830]"
          >
            Kontakt & Narudžbe
          </a>
        </div>
      )}
    </header>
  );
};

import React, { useState } from 'react';
import { X, Clock, AlertTriangle, ShieldCheck, Plus, Minus, Check } from 'lucide-react';
import { ProductItem } from '../types/bakery';

interface ProductModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onAddToCart: (product: ProductItem, quantity: number, customNote?: string) => void;
  currency: 'KM' | 'EUR';
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  currency,
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState<number>(product.unit === 'kg' ? 1 : 1);
  const [customNote, setCustomNote] = useState<string>('');
  const [added, setAdded] = useState<boolean>(false);

  const formatPrice = (priceKM: number) => {
    if (currency === 'EUR') {
      return `${(priceKM / 1.95583).toFixed(2)} €`;
    }
    return `${priceKM.toFixed(2)} KM`;
  };

  const handleIncrement = () => {
    if (product.unit === 'kg') {
      setQuantity((prev) => Math.round((prev + 0.5) * 10) / 10);
    } else {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (product.unit === 'kg') {
      setQuantity((prev) => Math.max(0.5, Math.round((prev - 0.5) * 10) / 10));
    } else {
      setQuantity((prev) => Math.max(1, prev - 1));
    }
  };

  const handleAdd = () => {
    onAddToCart(product, quantity, customNote);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1000);
  };

  const totalPriceKM = product.priceKM * quantity;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 overflow-y-auto">
      <div className="relative max-w-2xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#E8DEC8] my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-xs transition-colors"
          aria-label="Zatvori"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Media */}
        <div className="relative h-64 sm:h-72 w-full bg-[#F5ECE1]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
            <div>
              <span className="text-xs uppercase tracking-wider text-amber-200 font-semibold block">
                {product.unit === 'kg' ? 'Kolači na kilogram' : product.unit === 'tortu' ? 'Svečana torta' : 'Delicije'}
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                {product.name}
              </h3>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          
          {/* Price & Lead time row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#F0E6D8]">
            <div>
              <span className="text-xs text-[#7B665C] block">Cijena:</span>
              <div className="text-2xl font-bold text-[#301F1B] font-mono tabular-nums">
                {formatPrice(product.priceKM)}{' '}
                <span className="text-sm font-sans font-normal text-[#7B665C]">
                  / {product.unit}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-[#6E5A52]">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#8C4830]" />
                <span>Najava: <strong>{product.leadTimeDays} dana ranije</strong></span>
              </div>
              <div>
                <span>Min: <strong>{product.minOrder}</strong></span>
              </div>
            </div>
          </div>

          {/* Description & Story Note */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#7B665C]">
              Opis poslastice
            </h4>
            <p className="text-sm text-[#4E3D36] leading-relaxed">
              {product.description}
            </p>
            {product.storyNote && (
              <p className="text-xs text-[#8C4830] bg-[#FAF3EC] p-3 rounded-xl border border-[#EADFCF] italic">
                „{product.storyNote}“
              </p>
            )}
          </div>

          {/* Ingredients list (clean unboxed text with commas) */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#7B665C]">
              Sastojci
            </h4>
            <p className="text-xs text-[#55433C]">
              {product.ingredients.join(' · ')}
            </p>
          </div>

          {/* Allergens warning */}
          {product.allergens.length > 0 && (
            <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>
                <strong>Alergeni:</strong> Sadrži {product.allergens.join(', ')}. 
                Moguća priprema bez određenih alergena uz prethodni dogovor.
              </span>
            </div>
          )}

          {/* Special request note */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#7B665C] block">
              Posebna napomena za ovu stavku (opciono):
            </label>
            <input
              type="text"
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              placeholder="npr. posna varijanta, natpis 'Sretan rođendan', itd."
              className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#FAF7F2] border border-[#E0D2C2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8C4830]/30 text-[#301F1B]"
            />
          </div>

        </div>

        {/* Footer with quantity steppers and buy button */}
        <div className="p-4 sm:p-6 bg-[#FAF7F2] border-t border-[#E8DEC8] flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Stepper */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-[#7B665C]">Količina:</span>
            <div className="flex items-center bg-white border border-[#D5C2B2] rounded-lg">
              <button
                type="button"
                onClick={handleDecrement}
                className="p-2 text-[#5C4A42] hover:bg-[#EFE8DD] transition-colors rounded-l-lg"
                aria-label="Smanji količinu"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono px-4 text-sm font-bold text-[#301F1B] tabular-nums">
                {quantity} {product.unit}
              </span>
              <button
                type="button"
                onClick={handleIncrement}
                className="p-2 text-[#5C4A42] hover:bg-[#EFE8DD] transition-colors rounded-r-lg"
                aria-label="Povećaj količinu"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Add to order action */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="text-right hidden sm:block">
              <span className="text-[11px] text-[#7B665C] block">Ukupno:</span>
              <span className="font-mono font-bold text-lg text-[#301F1B] tabular-nums">
                {formatPrice(totalPriceKM)}
              </span>
            </div>

            <button
              onClick={handleAdd}
              className={`flex-1 sm:flex-none px-6 py-3 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95 shadow-xs ${
                added
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#8C4830] hover:bg-[#733621] text-white'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Dodano u korpu!</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Dodaj u narudžbu ({formatPrice(totalPriceKM)})</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

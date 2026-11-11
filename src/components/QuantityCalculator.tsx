import React, { useState } from 'react';
import { Calculator, Users, Sparkles, Check, ArrowRight } from 'lucide-react';
import { BAKERY_PRODUCTS } from '../data/products';
import { ProductItem } from '../types/bakery';

interface QuantityCalculatorProps {
  onAddRecommendation: (items: { product: ProductItem; quantity: number }[]) => void;
  currency: 'KM' | 'EUR';
}

export const QuantityCalculator: React.FC<QuantityCalculatorProps> = ({
  onAddRecommendation,
  currency,
}) => {
  const [guestsCount, setGuestsCount] = useState<number>(30);
  const [eventType, setEventType] = useState<'slava' | 'svadba' | 'rodjendan' | 'praznik'>('slava');
  const [isPosno, setIsPosno] = useState<boolean>(false);
  const [addedNotice, setAddedNotice] = useState<boolean>(false);

  const gramsPerGuest = 150;
  const totalKg = Math.max(1, Math.round((guestsCount * gramsPerGuest) / 500) * 0.5);
  const totalPiecesEst = Math.round(totalKg * 42);

  const priceMixKM = 28;
  const estimatedCostKM = totalKg * priceMixKM;

  const formatPrice = (km: number) => {
    if (currency === 'EUR') {
      return `${(km / 1.95583).toFixed(2)} €`;
    }
    return `${km.toFixed(2)} KM`;
  };

  const handleApply = () => {
    const mixProduct = BAKERY_PRODUCTS.find((p) => p.id === 'mix-sitnih-kolaca') || BAKERY_PRODUCTS[0];
    const itemsToAdd = [{ product: mixProduct, quantity: totalKg }];

    onAddRecommendation(itemsToAdd);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  return (
    <section id="kalkulator" className="py-16 md:py-24 bg-[#FAF7F2] border-b border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="max-w-3xl mx-auto text-center mb-12 space-y-3">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#8C4830]">
            Praktičan Vodič za Naručivanje
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#301F1B]">
            Koliko kolača vam je potrebno?
          </h2>
          <p className="text-sm sm:text-base text-[#6E5A52]">
            Niste sigurni koliko kilograma naručiti za slavu, rođendan ili vjenčanje? 
            Podesite broj gostiju i saznajte tačnu preporučenu mjeru po standardima poslastičarstva.
          </p>
        </div>

        {/* Interactive Box */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-[#E8DEC8] shadow-md overflow-hidden grid grid-cols-1 md:grid-cols-12">
          
          {/* Controls Column (7 cols) */}
          <div className="md:col-span-7 p-6 sm:p-8 space-y-6">
            
            {/* Number of guests slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-[#301F1B] flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#8C4830]" />
                  <span>Broj gostiju / zvanica:</span>
                </label>
                <span className="font-mono text-xl font-bold text-[#8C4830] tabular-nums">
                  {guestsCount} osoba
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="150"
                step="5"
                value={guestsCount}
                onChange={(e) => setGuestsCount(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-[#EFE6DB] rounded-lg appearance-none cursor-pointer accent-[#8C4830]"
              />
              <div className="flex justify-between text-[11px] text-[#8C7A72]">
                <span>5 (porodično)</span>
                <span>30 (manja slava)</span>
                <span>75 (veće slavlje)</span>
                <span>150+ (vjenčanje)</span>
              </div>
            </div>

            {/* Event Type selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#7B665C]">
                Vrsta proslave
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: 'slava', label: 'Slava / Bajram' },
                  { id: 'svadba', label: 'Svadba / Vjenčanje' },
                  { id: 'rodjendan', label: 'Rođendan / Krštenje' },
                  { id: 'praznik', label: 'Godišnjica / Druženje' },
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setEventType(type.id as any)}
                    className={`p-2.5 rounded-xl border text-left font-medium transition-all ${
                      eventType === type.id
                        ? 'border-[#8C4830] bg-[#FAF3EC] text-[#301F1B]'
                        : 'border-[#E8DEC8] hover:bg-[#FAF7F2] text-[#6E5A52]'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Checkbox: Posno */}
            <div className="space-y-3 pt-2">
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl border border-[#E8DEC8] hover:bg-[#FAF7F2] transition-colors">
                <input
                  type="checkbox"
                  checked={isPosno}
                  onChange={(e) => setIsPosno(e.target.checked)}
                  className="w-4 h-4 text-[#8C4830] rounded-sm focus:ring-[#8C4830] accent-[#8C4830]"
                />
                <div className="text-xs">
                  <span className="font-bold text-[#301F1B] block">
                    Potreban posni program kolača
                  </span>
                  <span className="text-[#7B665C] block">
                    (Posne vanilice, posna bajadera, baklava na biljnom maslacu)
                  </span>
                </div>
              </label>
            </div>

          </div>

          {/* Results Column (5 cols) */}
          <div className="md:col-span-5 bg-[#F5ECE1] p-6 sm:p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-[#E8DEC8]">
            <div className="space-y-6">
              
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8C4830]">
                <Sparkles className="w-4 h-4" />
                <span>Preporučena Količina</span>
              </div>

              {/* Main KPI display */}
              <div className="bg-white p-5 rounded-2xl border border-[#E0D2C2] text-center space-y-1">
                <span className="text-xs text-[#7B665C]">Ukupno sitnih kolača:</span>
                <div className="font-mono text-4xl sm:text-5xl font-bold text-[#301F1B] tabular-nums">
                  {totalKg} <span className="text-2xl font-sans font-normal text-[#8C4830]">kg</span>
                </div>
                <span className="text-xs font-medium text-[#7B665C] block pt-1">
                  Približno <strong className="text-[#301F1B]">{totalPiecesEst} finih komada</strong>
                </span>
              </div>

              {/* Breakdown details */}
              <div className="space-y-2 text-xs text-[#55433C]">
                <div className="flex justify-between py-1 border-b border-[#E8DEC8]">
                  <span>Normativ po gostu:</span>
                  <strong className="text-[#301F1B]">{gramsPerGuest}g (~{Math.round(gramsPerGuest / 23)} kolačića)</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-[#E8DEC8]">
                  <span>Predloženi asortiman:</span>
                  <strong className="text-[#301F1B]">6 do 8 različitih vrsta</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-[#E8DEC8]">
                  <span>Okvirna cijena:</span>
                  <strong className="font-mono font-bold text-[#8C4830] tabular-nums text-sm">
                    {formatPrice(estimatedCostKM)}
                  </strong>
                </div>
              </div>

            </div>

            {/* Action button */}
            <div className="pt-6">
              <button
                onClick={handleApply}
                className="w-full py-3.5 px-4 text-xs sm:text-sm font-bold text-white bg-[#8C4830] hover:bg-[#733621] rounded-xl shadow-xs active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                {addedNotice ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Preporuka dodana u korpu!</span>
                  </>
                ) : (
                  <>
                    <span>Dodaj ovu preporuku u korpu</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
              <span className="text-[11px] text-[#8C7A72] text-center block mt-2">
                Možete prilagoditi količinu ili izmijeniti artikle u korpi
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

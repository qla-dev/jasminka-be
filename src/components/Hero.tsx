import React from 'react';
import { ArrowDown, Heart, ShieldCheck, Sparkles, ChefHat } from 'lucide-react';

interface HeroProps {
  onExploreMenu: () => void;
  onOpenStory: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onOpenStory }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-12 md:pb-24 border-b border-[#E8DEC8]">
      {/* Background gentle warm glow */}
      <div className="absolute top-0 right-1/4 -z-10 w-96 h-96 bg-[#F3E7DC] rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 left-10 -z-10 w-80 h-80 bg-[#EFE0D3] rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Story-Driven Editorial Typography */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Subtle Editorial Kicker (No Pill) */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold uppercase tracking-wider text-[#8C4830] max-w-full">
              <span>Registrovana Djelatnost</span>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <span>100% Domaća Ručna Izrada</span>
            </div>

            {/* Display Headline with balanced wrapping */}
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#301F1B] leading-[1.18] max-w-full break-words" style={{ textWrap: 'balance' }}>
              Domaći kolači pripremljeni pažljivo, kvalitetno i <span className="italic font-normal text-[#8C4830]">s puno ljubavi.</span>
            </h1>

            {/* Subtitle with authentic brand message */}
            <p className="text-base sm:text-lg text-[#55433C] leading-relaxed max-w-2xl">
              Dobro došli u slatki svijet <strong className="text-[#301F1B] font-semibold">Jasminka Be – Slatko od srca</strong>. 
              Ono što sam godinama iz ljubavi pripremala za porodicu i prijatelje, sada s ponosom nudim i vama za rođendane, slave, svadbe i sve vaše posebne trenutke.
            </p>

            {/* Action buttons - Side by side on same row with no horizontal overflow */}
            <div className="grid grid-cols-2 sm:flex sm:flex-row items-center gap-2.5 sm:gap-4 pt-2 w-full max-w-md">
              <button
                onClick={onExploreMenu}
                className="w-full sm:w-auto px-3 sm:px-6 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold text-white bg-[#8C4830] hover:bg-[#733621] rounded-lg shadow-sm active:scale-95 transition-all flex items-center justify-center gap-1.5 sm:gap-2 whitespace-nowrap min-w-0"
              >
                <span>Cjenovnik</span>
                <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              </button>

              <button
                onClick={onOpenStory}
                className="w-full sm:w-auto px-3 sm:px-6 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold text-[#55433C] hover:text-[#301F1B] bg-[#EFE6DB] hover:bg-[#E5D9CB] rounded-lg transition-colors flex items-center justify-center gap-1.5 sm:gap-2 whitespace-nowrap min-w-0"
              >
                <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8C4830] shrink-0" />
                <span>Priča o nama</span>
              </button>
            </div>

            {/* Trust Markers - Clean unboxed metadata */}
            <div className="pt-6 border-t border-[#E8DEC8] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#5C4A42]">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#8C4830] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-[#301F1B]">Higijenski standardi</span>
                  <span className="text-[#6E5A52]">Službeno registrovano uz izdavanje računa</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <ChefHat className="w-4 h-4 text-[#8C4830] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-[#301F1B]">Pravi sastojci</span>
                  <span className="text-[#6E5A52]">Domaći puter, orasi i domaći džemovi</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#8C4830] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-[#301F1B]">Svježe po narudžbi</span>
                  <span className="text-[#6E5A52]">Priprema se neposredno pred vaše slavlje</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: High-Fidelity Visual Anchor */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Primary Image Card */}
              <div className="relative overflow-hidden rounded-2xl shadow-xl border border-[#E0D2C2] bg-white group">
                <img
                  src="/jasminka-be/assets/images/og-hero.jpg"
                  alt="Domaći kolači Jasminka Be – Slatko od srca"
                  className="w-full h-[360px] sm:h-[440px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                
                {/* Gradient Scrim for readable title */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-xs font-semibold tracking-wider uppercase text-amber-200">
                    Artisan Asortiman
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-bold mt-1 text-white">
                    Sitni kolači, baklave i torte
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-200 mt-1">
                    Preko 10 tradicionalnih i modernih poslastica po vašoj želji
                  </p>
                </div>
              </div>

              {/* Secondary Floating Proof Card with real user photo moved up to top-right */}
              <div className="absolute top-3 right-3 sm:-top-5 sm:-right-5 bg-white/95 backdrop-blur-sm p-3 sm:p-3.5 rounded-xl border border-[#E0D2C2] shadow-lg max-w-[230px] sm:max-w-[260px] z-10 transition-transform hover:scale-105">
                <div className="flex items-center gap-3">
                  <img
                    src="/jasminka-be/assets/aistudio/IMG_8402_c6de73a2.png"
                    alt="Punjeni vanil-kolačići s džemom"
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-cover border border-[#EADFCF] shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <span className="text-xs font-bold text-[#301F1B] block">
                      Domaće Vanilice
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-[#7C665C] block">
                      Punjene domaćim pekmezom
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-semibold text-[#8C4830] block mt-0.5">
                      Ručno pripremljeno
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

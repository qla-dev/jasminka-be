import React from 'react';
import { Heart, Instagram, Phone, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { CONTACT_INFO } from '../data/products';

export const Footer: React.FC = () => {
  return (
    <footer id="kontakt" className="bg-[#2D1F1D] text-[#E8DFD8] pt-16 pb-12 border-t border-[#44312E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main 4-column footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="space-y-1">
              <span className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white block">
                Jasminka Be
              </span>
              <span className="font-serif italic text-sm text-[#E0A899] block">
                Slatko od srca · Domaći Kolači
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#BFABA2] leading-relaxed max-w-sm">
              Priprema domaćih kolača za sve vaše posebne trenutke. Registrovana djelatnost sa sanitarnim atestima i izdavanjem računa.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={CONTACT_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 bg-[#3F2B28] hover:bg-[#523A36] text-white rounded-lg text-xs font-semibold transition-colors border border-[#523A36]"
              >
                <Instagram className="w-4 h-4 text-[#E0A899]" />
                <span>@{CONTACT_INFO.instagram}</span>
              </a>
              <a
                href={`tel:${CONTACT_INFO.phoneRaw}`}
                className="flex items-center gap-2 px-3 py-1.5 bg-[#3F2B28] hover:bg-[#523A36] text-white rounded-lg text-xs font-semibold transition-colors border border-[#523A36]"
              >
                <Phone className="w-4 h-4 text-[#E0A899]" />
                <span>{CONTACT_INFO.phone}</span>
              </a>
            </div>
          </div>

          {/* Quick links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigacija
            </h4>
            <ul className="space-y-2 text-xs text-[#BFABA2]">
              <li>
                <a href="#cjenovnik" className="hover:text-white transition-colors">
                  Cjenovnik & Proizvodi
                </a>
              </li>
              <li>
                <a href="#o-meni" className="hover:text-white transition-colors">
                  Moja Priča & Djelatnost
                </a>
              </li>
              <li>
                <a href="#kalkulator" className="hover:text-white transition-colors">
                  Kalkulator Količine za Goste
                </a>
              </li>
              <li>
                <a href="#galerija" className="hover:text-white transition-colors">
                  Galerija Fotografija
                </a>
              </li>
            </ul>
          </div>

          {/* Business & Hours info (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Radno Vrijeme & Preuzimanje
            </h4>
            <div className="space-y-2.5 text-xs text-[#BFABA2]">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#E0A899] shrink-0 mt-0.5" />
                <span>{CONTACT_INFO.workingHours}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#E0A899] shrink-0 mt-0.5" />
                <span>Lično preuzimanje po dogovoru ili dostava za veće narudžbe.</span>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#E0A899] shrink-0 mt-0.5" />
                <span>Zvanično izdavanje računa uz svaki paket kolača.</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-[#44312E] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9E8B82]">
          <p>© {new Date().getFullYear()} Jasminka Be – Slatko od srca. Sva prava zadržana.</p>
          <p className="flex items-center gap-1">
            Napravljeno s pažnjom i <Heart className="w-3.5 h-3.5 text-[#E0A899] fill-current" /> za slatke trenutke.
          </p>
        </div>

      </div>
    </footer>
  );
};

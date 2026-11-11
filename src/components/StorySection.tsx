import React from 'react';
import { Heart, FileText, Award, Instagram, CheckCircle2 } from 'lucide-react';
import { CONTACT_INFO } from '../data/products';

export const StorySection: React.FC = () => {
  return (
    <section id="o-meni" className="py-16 md:py-24 bg-[#F5ECE1] border-b border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14 space-y-3">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#8C4830]">
            O nama & Naša Priča
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#301F1B]">
            Jedna nova priča počinje, a njen glavni sastojak ostaje isti – <span className="italic font-normal text-[#8C4830]">ljubav.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#614D45]">
            Od toplih porodičnih recepata do zvanično registrovane radionice domaćih kolača.
          </p>
        </div>

        {/* 2-Column Split: Story letter + Official Credentials & Flyer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Sincere Editorial Story */}
          <div className="lg:col-span-7 bg-[#FAF7F2] p-8 sm:p-10 rounded-2xl border border-[#E3D6C5] shadow-sm space-y-6">
            
            <div className="flex items-center gap-3 pb-4 border-b border-[#EADFCF]">
              <div className="w-12 h-12 rounded-full bg-[#EADFCF] flex items-center justify-center text-[#8C4830]">
                <Heart className="w-6 h-6 fill-current" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-[#301F1B]">
                  Pismo od Jasminke
                </h3>
                <span className="text-xs text-[#7B665C]">
                  Osnivač & Majstor Domaćih Kolača
                </span>
              </div>
            </div>

            {/* Letter prose matching the user's authentic Instagram story */}
            <div className="space-y-4 text-sm sm:text-base text-[#4E3D36] leading-relaxed font-normal">
              <p>
                „Ljubav prema kolačima dio je mog života već dugi niz godina. Godinama sam ih s posebnom pažnjom i ljubavlju pripremala za porodicu, rodbinu i prijatelje.
              </p>
              <p>
                Vremenom su počeli stizati upiti: <em>„Može li se naručiti? Da li primaš narudžbe?“</em> Moj odgovor je uglavnom bio da nemam vremena, jer su to do tada bili samo moji mali slatki trenuci i zadovoljstvo koje sam dijelila s dragim ljudima.
              </p>
              <p className="font-medium text-[#301F1B] bg-[#F7F1E8] p-4 rounded-xl border border-[#EADFCF]">
                Sada, kada imam više vremena, odlučila sam da toj ljubavi posvetim još više pažnje i napravim jedan novi korak. S radošću vam predstavljam: <strong>Jasminka Be – Slatko od srca</strong>.
              </p>
              <p>
                Svoju djelatnost sam registrovala i uredila u skladu sa svim propisanim uslovima – od higijenskih standarda i potrebne dokumentacije do poslovnog pečata i izdavanja računa.
              </p>
              <p>
                Želim da ono što sam godinama radila iz ljubavi sada ponudim i svima vama koji želite da vaše posebne trenutke uljepšaju domaći kolači, pripremljeni pažljivo, kvalitetno i s puno ljubavi. Hvala svima na podršci!“
              </p>
            </div>

            {/* Signature & Social */}
            <div className="pt-4 border-t border-[#EADFCF] flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="font-display text-2xl font-bold text-[#301F1B] italic block">
                  Jasminka Be
                </span>
                <span className="text-xs text-[#8C4830]">Slatko od srca</span>
              </div>

              <a
                href={CONTACT_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#5A453C] hover:text-[#8C4830] bg-[#EFE6DB] hover:bg-[#E5D9CB] rounded-lg transition-colors"
              >
                <Instagram className="w-4 h-4 text-[#8C4830]" />
                <span>@{CONTACT_INFO.instagram}</span>
              </a>
            </div>

          </div>

          {/* Right Column: Visual Announcement flyer + Business Pillars */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* 3 Pillars of Trust */}
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3.5 bg-white rounded-xl border border-[#E3D6C5]">
                <CheckCircle2 className="w-5 h-5 text-[#8C4830] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <h4 className="font-bold text-[#301F1B]">Zvanično registrovana djelatnost</h4>
                  <p className="text-[#6E5A52]">
                    Legalno poslovanje, poslovni pečat i izdavanje računa za privatne osobe i firme.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-white rounded-xl border border-[#E3D6C5]">
                <Award className="w-5 h-5 text-[#8C4830] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <h4 className="font-bold text-[#301F1B]">Najviši higijenski standardi</h4>
                  <p className="text-[#6E5A52]">
                    Priprema u kontrolisanim, sanitarno atestiranim uslovima po propisima struke.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-white rounded-xl border border-[#E3D6C5]">
                <FileText className="w-5 h-5 text-[#8C4830] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <h4 className="font-bold text-[#301F1B]">Pogodno za sve vrste proslava</h4>
                  <p className="text-[#6E5A52]">
                    Ketering za svadbe, krštenja, rođendane, vjerske praznike (slave, bajrami) i poslovne domjenke.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
};

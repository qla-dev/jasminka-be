import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: 'Koliko ranije je potrebno rezervisati narudžbu?',
      answer:
        'Za sitne kolače (1–3 kg) preporučujemo najavu 2 do 3 dana ranije kako bismo sve ispekli svježe. Za veće količine (slavski i svadbeni stolovi preko 5 kg) preporučujemo najavu 5 do 7 dana unaprijed.',
    },
    {
      question: 'Da li je djelatnost registrovana i da li izdajete račun?',
      answer:
        'Da, djelatnost Jasminka Be – Slatko od srca je zvanično registrovana u skladu sa svim zakonskim i sanitarno-higijenskim propisima. Izdajemo račun za svaku kupovinu, kako za fizička lica, tako i za firme i udruženja kojima je potreban račun za ketering.',
    },
    {
      question: 'Mogu li naručiti posne kolače za slavu ili post?',
      answer:
        'Apsolutno! Imamo provjeren i omiljen posni asortiman koji uključuje posne vanilice s domaćim džemom, bogatu posnu bajaderu, tradicionalnu baklavu pripremljenu bez mliječnih masti, smokvice i čokoladne kuglice. Prilikom narudžbe samo označite opciju „Posni program“.',
    },
    {
      question: 'U kakvom pakovanju dolaze kolači?',
      answer:
        'Svi kolači se pakuju u namjenske, čvrste higijenske slastičarske kutije sa prozorom ili elegantnim poklopcem, pažljivo složeni sa pregradnim masnim papirom kako se ne bi oštetili u transportu i kako bi bili spremni odmah za serviranje.',
    },
    {
      question: 'Kako se vrši preuzimanje i plaćanje?',
      answer:
        'Preuzimanje se vrši lično u dogovorenom terminu, a za veće narudžbe moguć je dogovor oko dostave na vašu adresu. Plaćanje se vrši gotovinski prilikom preuzimanja ili uplatom na račun.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#F5ECE1] border-b border-[#E8DEC8]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center mb-12 space-y-3">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#8C4830]">
            Sve što trebate znati
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#301F1B]">
            Često Postavljana Pitanja
          </h2>
          <p className="text-sm text-[#6E5A52]">
            Odgovori na najčešće upite o rokovima, sastojcima, pakovanju i dostavi.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-[#E3D6C5] overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-[#FAF7F2] transition-colors"
                >
                  <span className="font-display font-bold text-base sm:text-lg text-[#301F1B]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#8C4830] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-[#55433C] leading-relaxed border-t border-[#F0E6D8]">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

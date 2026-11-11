import React, { useState } from 'react';
import { Instagram, ZoomIn, X, Heart } from 'lucide-react';
import { CONTACT_INFO } from '../data/products';

interface GalleryItem {
  id: string;
  image: string;
  title: string;
  caption: string;
  isRealCraft?: boolean;
}

export const GallerySection: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 'g1',
      image: '/jasminka-be/assets/aistudio/IMG_8402_c6de73a2.png',
      title: 'Domaći Lokumići s Džemom',
      caption: 'Svježe pečeni i posuti najfinijim prah šećerom — mekani zalogaji punjeni domaćim džemom.',
      isRealCraft: true,
    },
    {
      id: 'g2',
      image: '/jasminka-be/assets/images/baklava.jpg',
      title: 'Tradicionalna Baklava s Orasima',
      caption: 'Hrskavi listovi jufke, bogat fil od biranih domaćih oraha i blagi limunski šerbet.',
    },
    {
      id: 'g3',
      image: '/jasminka-be/assets/images/pastries-box.jpg',
      title: 'Svečana Poklon Kutija Sitnih Kolača',
      caption: 'Savršen poklon za posjete, domaćine slava ili korporativne partnere.',
    },
    {
      id: 'g4',
      image: '/jasminka-be/assets/images/cake-berries.jpg',
      title: 'Svečana Poklon Kolekcija',
      caption: 'Bogat asortiman domaćih kolača za rođendane i vjenčanja.',
    },
    {
      id: 'g5',
      image: '/jasminka-be/assets/images/cookies-spread.jpg',
      title: 'Kolekcija Domaćih Kolačića',
      caption: 'Linzeri sa pekmezom, čoko raspucanci i orah rolnice pripremljeni za slavlje.',
    },
    {
      id: 'g6',
      image: '/jasminka-be/assets/aistudio/IMG_8401_0a0e46ad.png',
      title: 'Zvanični Početak Rada – Slatko od srca',
      caption: 'Registrovana radinost sa ponosom i ljubavlju otvara svoja vrata svim sladokuscima.',
      isRealCraft: true,
    },
  ];

  return (
    <section id="galerija" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="text-xs font-semibold tracking-widest uppercase text-[#8C4830]">
            Pogled u našu radionicu
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#301F1B] mt-1">
            Galerija Slatkih Trenutaka
          </h2>
          <p className="text-sm sm:text-base text-[#6E5A52] mt-2 max-w-xl">
            Svaki kolač ima svoju priču i priprema se ručno s posebnom pažnjom na detalje, svježinu i dekoraciju.
          </p>
        </div>

        {/* Instagram direct CTA */}
        <a
          href={CONTACT_INFO.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#8C4830] bg-[#FAF3EC] hover:bg-[#F3E7DC] rounded-xl border border-[#E8DEC8] transition-colors whitespace-nowrap self-start md:self-auto"
        >
          <Instagram className="w-4 h-4" />
          <span>Pratite svakodnevne priče @{CONTACT_INFO.instagram}</span>
        </a>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="group relative h-72 sm:h-80 rounded-2xl overflow-hidden cursor-pointer bg-[#F5ECE1] border border-[#E8DEC8] shadow-xs hover:shadow-md transition-all duration-300"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              referrerPolicy="no-referrer"
            />
            
            {/* Scrim overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

            {/* Hover zoom indicator */}
            <div className="absolute top-3 right-3 p-2 bg-white/90 text-[#301F1B] rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomIn className="w-4 h-4" />
            </div>

            {/* Authentic tag */}
            {item.isRealCraft && (
              <div className="absolute top-3 left-3 bg-[#FAF7F2]/90 backdrop-blur-xs text-[#8C4830] text-[10px] font-bold px-2 py-0.5 rounded-md border border-[#E8DEC8]">
                Autentična fotografija
              </div>
            )}

            {/* Title & Caption */}
            <div className="absolute bottom-0 inset-x-0 p-5 text-white">
              <h3 className="font-display text-lg font-bold">
                {item.title}
              </h3>
              <p className="text-xs text-stone-200 mt-1 line-clamp-2">
                {item.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4">
          <div className="relative max-w-3xl w-full bg-[#FAF7F2] rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            
            <div className="p-4 border-b border-[#E8DEC8] flex items-center justify-between">
              <div>
                <h4 className="font-display font-bold text-lg text-[#301F1B]">
                  {selectedItem.title}
                </h4>
                <span className="text-xs text-[#8C4830]">
                  Jasminka Be – Slatko od srca
                </span>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-1.5 text-stone-600 hover:text-black rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-black/5 overflow-y-auto flex items-center justify-center max-h-[60vh]">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="max-h-[55vh] w-auto object-contain rounded-xl shadow-md"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-5 space-y-2 bg-white border-t border-[#E8DEC8]">
              <p className="text-sm text-[#4E3D36]">
                {selectedItem.caption}
              </p>
              <div className="pt-2 flex items-center justify-between text-xs text-[#7B665C]">
                <span className="flex items-center gap-1.5 text-[#8C4830] font-medium">
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  Ručno rađeno s ljubavlju
                </span>
                <span>Za narudžbe i upite posjetite cjenovnik ili nas kontaktirajte</span>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};

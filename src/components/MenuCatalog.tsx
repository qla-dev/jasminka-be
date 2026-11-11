import React, { useState, useMemo } from 'react';
import { Search, Plus, Check, Eye, LayoutGrid, List, Info, Clock, AlertCircle } from 'lucide-react';
import { ProductItem, ProductCategory } from '../types/bakery';
import { BAKERY_PRODUCTS, CATEGORIES } from '../data/products';

interface MenuCatalogProps {
  onAddToCart: (product: ProductItem, quantity?: number) => void;
  onSelectProduct: (product: ProductItem) => void;
  currency: 'KM' | 'EUR';
}

export const MenuCatalog: React.FC<MenuCatalogProps> = ({
  onAddToCart,
  onSelectProduct,
  currency,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  // Conversion rate: 1 EUR = ~1.95583 KM
  const formatPrice = (priceKM: number) => {
    if (currency === 'EUR') {
      const eur = priceKM / 1.95583;
      return `${eur.toFixed(2)} €`;
    }
    return `${priceKM.toFixed(2)} KM`;
  };

  const filteredProducts = useMemo(() => {
    return BAKERY_PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q) ||
        product.ingredients.some((ing) => ing.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleAdd = (product: ProductItem, e?: React.MouseEvent) => {
    e?.stopPropagation();
    onAddToCart(product, 1);
    setRecentlyAddedId(product.id);
    setTimeout(() => {
      setRecentlyAddedId(null);
    }, 1500);
  };

  return (
    <section id="cjenovnik" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Title & Introduction */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E8DEC8]">
        <div>
          <span className="text-xs font-semibold tracking-widest uppercase text-[#8C4830]">
            Katalog & Cjenovnik
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#301F1B] mt-1">
            Domaći Cjenovnik
          </h2>
          <p className="text-sm sm:text-base text-[#6E5A52] mt-2 max-w-xl">
            Svi kolači se pripremaju isključivo po narudžbi od svježih i visokokvalitetnih sastojaka. 
            Cijene su izražene po kilogramu ili po komadu/torti.
          </p>
        </div>

        {/* View mode toggle & Currency indicator */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-[#EFE6DB] p-1 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-all ${
                viewMode === 'grid'
                  ? 'bg-white text-[#301F1B] shadow-xs'
                  : 'text-[#6E5A52] hover:text-[#301F1B]'
              }`}
              title="Prikaz u karticama"
              aria-label="Prikaz u karticama"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-md transition-all ${
                viewMode === 'table'
                  ? 'bg-white text-[#301F1B] shadow-xs'
                  : 'text-[#6E5A52] hover:text-[#301F1B]'
              }`}
              title="Prikaz u tabeli cjenovnika"
              aria-label="Prikaz u tabeli cjenovnika"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="py-6 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        
        {/* Category Segmented Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as ProductCategory)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg whitespace-nowrap shrink-0 transition-all ${
                  isActive
                    ? 'bg-[#301F1B] text-white shadow-xs'
                    : 'bg-[#FAF7F2] text-[#6E5A52] hover:text-[#301F1B] border border-[#E0D2C2] hover:bg-[#F3EBE0]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search input */}
        <div className="relative min-w-[240px] max-w-sm">
          <Search className="w-4 h-4 text-[#8C4830] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pretraži kolače (npr. vanilice, orah)..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-[#FAF7F2] border border-[#E0D2C2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8C4830]/30 focus:border-[#8C4830] text-[#301F1B] placeholder-[#9E8B82]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C4830] hover:underline"
            >
              Poništi
            </button>
          )}
        </div>

      </div>

      {/* Zero Results State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-16 bg-[#FAF7F2] rounded-2xl border border-dashed border-[#D8C9B8] space-y-3">
          <AlertCircle className="w-8 h-8 text-[#8C4830] mx-auto opacity-60" />
          <h3 className="font-display text-lg font-bold text-[#301F1B]">
            Nema rezultata za vašu pretragu
          </h3>
          <p className="text-xs text-[#7B665C]">
            Pokušajte s drugim pojmom ili odaberite drugu kategoriju.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#8C4830] rounded-lg hover:bg-[#733621]"
          >
            Prikaži sve proizvode
          </button>
        </div>
      )}

      {/* Mode A: Visual Product Cards Grid */}
      {viewMode === 'grid' && filteredProducts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredProducts.map((product) => {
            const isAdded = recentlyAddedId === product.id;
            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="group bg-white rounded-2xl border border-[#E8DEC8] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer"
              >
                {/* Product Image Container */}
                <div className="relative h-56 w-full overflow-hidden bg-[#FAF7F2]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Subtle Text Badge (Single unboxed text tag) */}
                  {product.badge && (
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[#8C4830] font-medium text-[11px] px-2.5 py-1 rounded-md shadow-xs border border-[#E8DEC8]">
                      {product.badge}
                    </div>
                  )}

                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="p-2 bg-white/95 backdrop-blur-xs text-[#301F1B] rounded-full shadow-xs flex items-center justify-center">
                      <Eye className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    {/* Clean unboxed category & lead time metadata */}
                    <div className="flex items-center gap-2 text-[11px] text-[#7B665C]">
                      <span className="uppercase tracking-wider font-semibold">
                        {product.unit === 'kg' ? 'Kolači po kg' : 'Ketering'}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#8C4830]" />
                        {product.leadTimeDays} dana ranije
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-bold text-[#301F1B] group-hover:text-[#8C4830] transition-colors line-clamp-1">
                      {product.name}
                    </h3>

                    <p className="text-xs text-[#5C4A42] line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Price & Action Row */}
                  <div className="pt-3 border-t border-[#F0E6D8] flex items-center justify-between">
                    <div>
                      <div className="text-xl font-bold text-[#301F1B] font-mono tabular-nums">
                        {formatPrice(product.priceKM)}
                      </div>
                      <span className="text-[11px] text-[#7B665C] block">
                        po {product.unit} (min. {product.minOrder})
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => handleAdd(product, e)}
                      className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 active:scale-95 ${
                        isAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#8C4830] hover:bg-[#733621] text-white shadow-xs'
                      }`}
                      aria-label={`Dodaj ${product.name} u narudžbu`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Dodano!</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Dodaj</span>
                        </>
                      )}
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Mode B: Detailed Cjenovnik Table */}
      {viewMode === 'table' && filteredProducts.length > 0 && (
        <div className="overflow-x-auto bg-white rounded-2xl border border-[#E8DEC8] shadow-xs">
          <table className="w-full text-left text-sm text-[#4E3D36]">
            <thead className="bg-[#FAF7F2] text-xs uppercase text-[#7B665C] border-b border-[#E8DEC8]">
              <tr>
                <th scope="col" className="px-6 py-4 font-semibold">Proizvod</th>
                <th scope="col" className="px-6 py-4 font-semibold">Kategorija</th>
                <th scope="col" className="px-6 py-4 font-semibold">Cijena</th>
                <th scope="col" className="px-6 py-4 font-semibold">Min. narudžba</th>
                <th scope="col" className="px-6 py-4 font-semibold">Rok najave</th>
                <th scope="col" className="px-6 py-4 text-right font-semibold">Akcija</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0E6D8]">
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  onClick={() => onSelectProduct(product)}
                  className="hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4 font-medium text-[#301F1B]">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 rounded-lg object-cover border border-[#EADFCF]"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="font-bold text-[#301F1B] hover:text-[#8C4830]">
                          {product.name}
                        </div>
                        <div className="text-xs text-[#7B665C] line-clamp-1 max-w-xs">
                          {product.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs">
                    {CATEGORIES.find((c) => c.id === product.category)?.label || product.category}
                  </td>
                  <td className="px-6 py-4 font-mono font-bold text-[#301F1B] tabular-nums">
                    {formatPrice(product.priceKM)} / {product.unit}
                  </td>
                  <td className="px-6 py-4 text-xs text-[#6E5A52]">
                    {product.minOrder}
                  </td>
                  <td className="px-6 py-4 text-xs text-[#6E5A52]">
                    {product.leadTimeDays} dana ranije
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={(e) => handleAdd(product, e)}
                      className="px-3 py-1.5 text-xs font-semibold text-white bg-[#8C4830] hover:bg-[#733621] rounded-lg transition-colors inline-flex items-center gap-1 active:scale-95"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Naruči</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Note about special requests and invoicing */}
      <div className="mt-8 p-4 bg-[#F5ECE1] rounded-xl border border-[#E3D6C5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#55433C]">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-[#8C4830] shrink-0" />
          <span>
            <strong>Prilagođavanje:</strong> Imate posebne želje za proslavu ili posni program? Svaki recept možemo prilagoditi vašim potrebama.
          </span>
        </div>
        <span className="font-semibold text-[#8C4830] whitespace-nowrap">
          Izdavanje računa za svaku narudžbu
        </span>
      </div>

    </section>
  );
};

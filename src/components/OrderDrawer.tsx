import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  Send, 
  MessageCircle, 
  Calendar, 
  MapPin, 
  Phone, 
  User, 
  FileText, 
  CheckCircle2, 
  Sparkles,
  Copy,
  Check
} from 'lucide-react';
import { CartItem, OrderDetails } from '../types/bakery';
import { CONTACT_INFO } from '../data/products';

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  currency: 'KM' | 'EUR';
}

export const OrderDrawer: React.FC<OrderDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  currency,
}) => {
  if (!isOpen) return null;

  // Tomorrow's date + 2 days as default minimum lead time
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 2);
  const minDateStr = minDate.toISOString().split('T')[0];

  const [details, setDetails] = useState<OrderDetails>({
    customerName: '',
    phone: '',
    cityAddress: '',
    eventDate: minDateStr,
    deliveryMethod: 'pickup',
    notes: '',
    isPosnoRequired: false,
  });

  const [copied, setCopied] = useState<boolean>(false);
  const [orderConfirmedPreview, setOrderConfirmedPreview] = useState<boolean>(false);

  const totalKM = cart.reduce((sum, item) => sum + item.product.priceKM * item.quantity, 0);

  const formatPrice = (priceKM: number) => {
    if (currency === 'EUR') {
      return `${(priceKM / 1.95583).toFixed(2)} €`;
    }
    return `${priceKM.toFixed(2)} KM`;
  };

  const totalWeightKg = cart.reduce((sum, item) => {
    if (item.product.unit === 'kg') return sum + item.quantity;
    if (item.product.id === 'slavski-paket-deluxe') return sum + item.quantity * 3;
    return sum;
  }, 0);

  // Compile formatted order message for WhatsApp / Viber / SMS
  const generateOrderMessage = () => {
    const lines = [
      `🍰 *NARUDŽBA KOLAČA – Jasminka Be (Slatko od srca)*`,
      `━━━━━━━━━━━━━━━━━━━━━━━━`,
      `👤 *Kupac:* ${details.customerName || 'Nije upisano'}`,
      `📞 *Telefon:* ${details.phone || 'Nije upisano'}`,
      `📅 *Datum preuzimanja:* ${details.eventDate}`,
      `📍 *Način:* ${details.deliveryMethod === 'pickup' ? 'Lično preuzimanje' : 'Dostava na adresu'}`,
      details.deliveryMethod === 'delivery' && details.cityAddress ? `🏠 *Adresa:* ${details.cityAddress}` : '',
      details.isPosnoRequired ? `✨ *Napomena:* Potreban POSNI program` : '',
      details.notes ? `📝 *Dodatno:* ${details.notes}` : '',
      `━━━━━━━━━━━━━━━━━━━━━━━━`,
      `🛒 *STAVKE NARUDŽBE:*`,
      ...cart.map(
        (item) =>
          `• ${item.quantity} ${item.product.unit} – *${item.product.name}* (${formatPrice(item.product.priceKM * item.quantity)})${
            item.customNote ? ` [Napomena: ${item.customNote}]` : ''
          }`
      ),
      `━━━━━━━━━━━━━━━━━━━━━━━━`,
      `💰 *UKUPAN IZNOS:* ${formatPrice(totalKM)}`,
      totalWeightKg > 0 ? `⚖️ *Ukupna težina:* cca ${totalWeightKg.toFixed(1)} kg` : '',
      `━━━━━━━━━━━━━━━━━━━━━━━━`,
      `Hvala vam na ukazanom povjerenju!`,
    ];
    return lines.filter(Boolean).join('\n');
  };

  const handleCopyMessage = () => {
    const text = generateOrderMessage();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendWhatsApp = () => {
    const text = encodeURIComponent(generateOrderMessage());
    window.open(`https://wa.me/${CONTACT_INFO.phoneRaw}?text=${text}`, '_blank');
  };

  const handleSendViber = () => {
    const text = encodeURIComponent(generateOrderMessage());
    window.open(`viber://forward?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs transition-opacity">
      <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col border-l border-[#E8DEC8] animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#E8DEC8] flex items-center justify-between bg-[#FAF7F2]">
          <div className="flex items-center gap-2">
            <h3 className="font-display text-xl font-bold text-[#301F1B]">
              Vaša Slatka Narudžba
            </h3>
            <span className="text-xs font-semibold text-[#8C4830] bg-[#FAF3EC] px-2 py-0.5 rounded-md border border-[#EADFCF]">
              {cart.length} {cart.length === 1 ? 'stavka' : 'stavke'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#6E5A52] hover:text-[#301F1B] rounded-lg transition-colors"
            aria-label="Zatvori korpu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          
          {/* Empty State */}
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#FAF3EC] flex items-center justify-center text-[#8C4830]">
                <Sparkles className="w-8 h-8" />
              </div>
              <h4 className="font-display text-lg font-bold text-[#301F1B]">
                Vaša korpa je prazna
              </h4>
              <p className="text-xs text-[#7B665C] max-w-xs mx-auto">
                Pregledajte naš cjenovnik domaćih kolača i sastavite idealnu narudžbu za vaše slavlje.
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-[#8C4830] rounded-xl hover:bg-[#733621] transition-colors"
              >
                Pregledaj Ponudu Kolača
              </button>
            </div>
          ) : (
            <>
              {/* Itemized List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#7B665C]">
                  <span>Odabrani kolači</span>
                  <button
                    onClick={onClearCart}
                    className="text-[#8C4830] hover:underline normal-case font-normal"
                  >
                    Isprazni sve
                  </button>
                </div>

                <div className="space-y-2.5">
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="p-3.5 bg-[#FAF7F2] rounded-xl border border-[#E8DEC8] flex items-center gap-3"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-14 h-14 rounded-lg object-cover border border-[#E2D4C3] shrink-0"
                        referrerPolicy="no-referrer"
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-xs sm:text-sm text-[#301F1B] truncate">
                          {item.product.name}
                        </h4>
                        <div className="text-[11px] text-[#7B665C]">
                          {formatPrice(item.product.priceKM)} / {item.product.unit}
                        </div>
                        {item.customNote && (
                          <div className="text-[11px] text-[#8C4830] italic truncate">
                            Napomena: {item.customNote}
                          </div>
                        )}
                      </div>

                      {/* Stepper */}
                      <div className="flex items-center bg-white border border-[#D5C2B2] rounded-lg">
                        <button
                          type="button"
                          onClick={() => {
                            const step = item.product.unit === 'kg' ? 0.5 : 1;
                            const next = Math.max(0, item.quantity - step);
                            if (next === 0) onRemoveItem(item.product.id);
                            else onUpdateQuantity(item.product.id, next);
                          }}
                          className="p-1.5 text-[#5C4A42] hover:bg-[#EFE8DD] transition-colors rounded-l-lg"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono px-2 text-xs font-bold text-[#301F1B] tabular-nums">
                          {item.quantity} {item.product.unit}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            const step = item.product.unit === 'kg' ? 0.5 : 1;
                            onUpdateQuantity(item.product.id, item.quantity + step);
                          }}
                          className="p-1.5 text-[#5C4A42] hover:bg-[#EFE8DD] transition-colors rounded-r-lg"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="p-1.5 text-[#9E8B82] hover:text-red-600 transition-colors"
                        title="Ukloni stavku"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Form: Delivery & Customer Info */}
              <div className="pt-4 border-t border-[#E8DEC8] space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#7B665C]">
                  Podaci za narudžbu i preuzimanje
                </h4>

                {/* Name */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#4E3D36] flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#8C4830]" />
                    <span>Vaše ime i prezime:</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={details.customerName}
                    onChange={(e) => setDetails({ ...details, customerName: e.target.value })}
                    placeholder="npr. Amina Hadžić"
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E0D2C2] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#8C4830] text-[#301F1B]"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#4E3D36] flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#8C4830]" />
                    <span>Kontakt telefon / Viber / WhatsApp:</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={details.phone}
                    onChange={(e) => setDetails({ ...details, phone: e.target.value })}
                    placeholder="npr. 061 123 456"
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E0D2C2] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#8C4830] text-[#301F1B]"
                  />
                </div>

                {/* Date Picker */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#4E3D36] flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#8C4830]" />
                    <span>Željeni datum preuzimanja ili dostave:</span>
                  </label>
                  <input
                    type="date"
                    min={minDateStr}
                    value={details.eventDate}
                    onChange={(e) => setDetails({ ...details, eventDate: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E0D2C2] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#8C4830] text-[#301F1B]"
                  />
                  <span className="text-[10px] text-[#7B665C] block">
                    Preporučujemo najavu minimalno 2-3 dana ranije za sitne kolače, a 5-7 dana za veće količine.
                  </span>
                </div>

                {/* Delivery Method */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-[#4E3D36] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#8C4830]" />
                    <span>Način preuzimanja:</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setDetails({ ...details, deliveryMethod: 'pickup' })}
                      className={`p-2 rounded-lg border text-center font-medium transition-all ${
                        details.deliveryMethod === 'pickup'
                          ? 'border-[#8C4830] bg-[#FAF3EC] text-[#301F1B]'
                          : 'border-[#E0D2C2] bg-[#FAF7F2] text-[#6E5A52]'
                      }`}
                    >
                      Lično preuzimanje
                    </button>
                    <button
                      type="button"
                      onClick={() => setDetails({ ...details, deliveryMethod: 'delivery' })}
                      className={`p-2 rounded-lg border text-center font-medium transition-all ${
                        details.deliveryMethod === 'delivery'
                          ? 'border-[#8C4830] bg-[#FAF3EC] text-[#301F1B]'
                          : 'border-[#E0D2C2] bg-[#FAF7F2] text-[#6E5A52]'
                      }`}
                    >
                      Dostava na adresu
                    </button>
                  </div>
                </div>

                {details.deliveryMethod === 'delivery' && (
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-[#4E3D36]">
                      Grad i adresa za dostavu:
                    </label>
                    <input
                      type="text"
                      value={details.cityAddress}
                      onChange={(e) => setDetails({ ...details, cityAddress: e.target.value })}
                      placeholder="Ulica, broj i grad"
                      className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E0D2C2] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#8C4830] text-[#301F1B]"
                    />
                  </div>
                )}

                {/* Notes and Posno */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer text-xs">
                    <input
                      type="checkbox"
                      checked={details.isPosnoRequired}
                      onChange={(e) => setDetails({ ...details, isPosnoRequired: e.target.checked })}
                      className="w-3.5 h-3.5 text-[#8C4830] accent-[#8C4830]"
                    />
                    <span className="font-semibold text-[#301F1B]">
                      Cijela narudžba mora biti POSNA
                    </span>
                  </label>

                  <textarea
                    rows={2}
                    value={details.notes}
                    onChange={(e) => setDetails({ ...details, notes: e.target.value })}
                    placeholder="Dodatne napomene (npr. pakovanje u više kutija, natpisi, alergije...)"
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E0D2C2] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#8C4830] text-[#301F1B]"
                  />
                </div>

              </div>

              {/* Order Confirmation Preview Card */}
              {orderConfirmedPreview && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2 text-xs text-emerald-950">
                  <div className="flex items-center gap-2 font-bold text-emerald-800">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Pregled narudžbenice je spreman!</span>
                  </div>
                  <p>
                    Možete jednim klikom proslijediti gotovu poruku Jasminki na WhatsApp, Viber ili Instagram, ili kopirati tekst.
                  </p>
                </div>
              )}
            </>
          )}

        </div>

        {/* Drawer Footer with Subtotal & Instant Send Options */}
        {cart.length > 0 && (
          <div className="p-5 bg-[#FAF7F2] border-t border-[#E8DEC8] space-y-4">
            
            {/* Totals */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs text-[#7B665C]">
                <span>Ukupna procijenjena težina:</span>
                <span className="font-medium text-[#301F1B]">
                  {totalWeightKg > 0 ? `cca ${totalWeightKg.toFixed(1)} kg` : 'Po narudžbi'}
                </span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-semibold text-[#301F1B]">Ukupan iznos:</span>
                <span className="font-mono text-2xl font-bold text-[#8C4830] tabular-nums">
                  {formatPrice(totalKM)}
                </span>
              </div>
              <span className="text-[10px] text-[#8C7A72] block">
                Zvanično izdavanje računa registrovane radinosti pri preuzimanju.
              </span>
            </div>

            {/* Direct Send Buttons */}
            <div className="space-y-2">
              <button
                onClick={handleSendWhatsApp}
                className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20BE5B] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-xs transition-colors active:scale-98"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Pošalji narudžbu preko WhatsApp-a</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleSendViber}
                  className="py-2.5 px-3 bg-[#7360F2] hover:bg-[#624FE0] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Preko Vibera</span>
                </button>

                <button
                  onClick={handleCopyMessage}
                  className="py-2.5 px-3 bg-white hover:bg-[#EFE8DD] text-[#301F1B] border border-[#D5C2B2] rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Kopirano!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#8C4830]" />
                      <span>Kopiraj poruku</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

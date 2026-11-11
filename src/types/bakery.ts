export type ProductCategory = 
  | 'all'
  | 'sitni-kolaci'
  | 'tradicionalni'
  | 'kremasti'
  | 'paketi';

export interface ProductItem {
  id: string;
  name: string;
  category: ProductCategory;
  priceKM: number;
  unit: 'kg' | 'kom' | 'kutija';
  description: string;
  storyNote?: string;
  ingredients: string[];
  allergens: string[];
  minOrder: string;
  image: string;
  isSpecialty?: boolean;
  badge?: string;
  leadTimeDays: number;
  estimatedPiecesPerKg?: number;
}

export interface CartItem {
  product: ProductItem;
  quantity: number; // in kg or pieces
  customNote?: string;
}

export interface OrderDetails {
  customerName: string;
  phone: string;
  email?: string;
  cityAddress: string;
  eventDate: string;
  deliveryMethod: 'pickup' | 'delivery';
  notes: string;
  isPosnoRequired?: boolean;
}

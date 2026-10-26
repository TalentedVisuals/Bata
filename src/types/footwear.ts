export type ShoeCategory = 'handmade_bata' | 'artisan' | 'imported';

export type ShoeStyle = 'slides' | 'loafers' | 'sandals' | 'mules' | 'sneakers' | 'oxford';

export interface Product {
  id: string;
  name: string;
  category: ShoeCategory;
  categoryLabel: string;
  style: ShoeStyle;
  price: number;
  originalPrice?: number;
  description: string;
  material: string;
  soleType: string;
  features: string[];
  sizes: number[];
  colors: {
    name: string;
    hex: string;
  }[];
  isPopular?: boolean;
  leadTime: string; // e.g. "Ready to dispatch in 24 hrs" or "Crafted in 3-4 days"
  illustrationKey?: string;
  imageUrl: string;
}

export interface CartItem {
  id: string; // unique item id in cart (productId-size-color)
  product: Product;
  selectedSize: number;
  selectedColor: string;
  quantity: number;
}

export interface OrderFormState {
  customerName: string;
  customerPhone: string;
  deliveryState: string;
  deliveryAddress: string;
  deliveryOption: 'standard' | 'express' | 'pickup';
  orderNotes?: string;
}

export interface CustomShoeRequest {
  shoeType: string;
  leatherColor: string;
  footSize: number;
  specialInstructions: string;
  customerName: string;
  customerPhone: string;
  deliveryLocation: string;
}

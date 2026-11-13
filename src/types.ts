export interface Product {
  id: string;
  name: string;
  category: 'medicamentos' | 'dermocosmeticos' | 'cuidados' | 'mamae-bebe' | 'vitaminas' | 'ofertas';
  brand: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  dosage?: string;
  rating: number;
  reviewsCount: number;
  image: string;
  isGeneric?: boolean;
  requiresPrescription?: boolean;
  stockCount: number;
  tag?: string;
  exclusiveBrand?: boolean;
  optionsCount?: number;
  socialProof?: string;
  verticalBadge?: string;
  tieredPricing?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Option {
  value: string;
  label: string;
}

export const validDealers = [
  "Test Dealer (Mumbai MH)", 
  "Test Dealer (Pune MH)", 
  "Test Dealer (Delhi DL)",
  "Test Dealer (Bangalore KA)", 
  "Test Dealer (Chennai TN)"
]

export interface Product {
  id: string;
  name: string;
  subName: string;
  imageSrc?: string;
  size: Option;
  standard: Option;
  prePost: Option;
  quality: string;
  quantity: number;
  price: number;
  rate: number;
}

export interface OrderFormData {
  dealer: Option & {
    value: typeof validDealers[number];
    label: typeof validDealers[number];
  };
  products: Product[];
  remarks?: string;
  termsAndConditions?: string;
  shippingMethod: Option;
  poNumber?: string;
  deliveryDate: Date;
  paymentStatus: 'pending' | 'paid' | 'partial' | 'cancelled';
}

export const sizeOptions = [
  { value: "3040x1250x18", label: "3040 x 1250 x 18" },
  { value: "3040x1100x18", label: "3040 x 1100 x 18" },
  { value: "3040x1350x20", label: "3040 x 1350 x 20" },
] as const;

export const standardOptions = [
  { value: "standard0", label: "Standard@0" },
  { value: "standard1", label: "Standard@1" },
  { value: "standard3", label: "Standard@3" },
] as const;

export const prePostOptions = [
  { value: "pre", label: "Pre" },
  { value: "post", label: "Post" },
  { value: "other", label: "someting.." },
] as const;

export const shippingOptions = [
  { value: 'standard', label: 'Standard Shipping' },
  { value: 'express', label: 'Express Shipping' },
  { value: 'pickup', label: 'Local Pickup' },
] as const;

export const paymentStatusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'paid', label: 'Paid' },
  { value: 'partial', label: 'Partial Payment' },
  { value: 'cancelled', label: 'Cancelled' },
] as const;
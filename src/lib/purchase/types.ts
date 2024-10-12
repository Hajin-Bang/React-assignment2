export interface CartItemDTO {
  productId: string;
  quantity: number;
  price: number;
}

export interface PurchaseDTO {
  totalAmount: number;
  paymentMethod: string;
  shippingAddress: string;
}

export interface CartStore {
  cart: CartItem[];
  totalCount: number;
  totalPrice: number;
  initCart: (userId: string) => void;
  resetCart: (userId: string) => void;
  addCartItem: (item: CartItem, userId: string, count: number) => void;
  removeCartItem: (itemId: string, userId: string) => void;
  changeCartItemCount: (params: {
    itemId: string;
    count: number;
    userId: string;
  }) => void;
}

export interface CartItem {
  id: string;
  image: string;
  title: string;
  price: number;
  count: number;
}

export interface Total {
  totalCount: number;
  totalPrice: number;
}

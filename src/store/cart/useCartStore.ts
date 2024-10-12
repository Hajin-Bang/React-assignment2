import { create } from 'zustand';
import {
  calculateTotal,
  getCartFromLocalStorage,
  resetCartAtLocalStorage,
  setCartToLocalStorage,
} from './cartUtils';
import { CartItem, CartStore } from './types';

export const useCartStore = create<CartStore>((set) => ({
  cart: [] as CartItem[],
  totalCount: 0,
  totalPrice: 0,

  initCart: (userId: string) => {
    if (!userId) return;

    const prevCartItems = getCartFromLocalStorage(userId);
    const total = calculateTotal(prevCartItems);

    set({
      cart: prevCartItems,
      totalCount: total.totalCount,
      totalPrice: total.totalPrice,
    });
  },

  resetCart: (userId: string) => {
    resetCartAtLocalStorage(userId);

    set({
      cart: [],
      totalCount: 0,
      totalPrice: 0,
    });
  },

  addCartItem: (item: CartItem, userId: string, count: number) => {
    set((state) => {
      const existingItemIndex = state.cart.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      let updatedCart: CartItem[];

      if (existingItemIndex !== -1) {
        updatedCart = state.cart.map((cartItem, index) =>
          index === existingItemIndex
            ? { ...cartItem, count: cartItem.count + count }
            : cartItem
        );
      } else {
        updatedCart = [...state.cart, { ...item, count }];
      }

      const total = calculateTotal(updatedCart);

      setCartToLocalStorage(updatedCart, userId);

      return {
        cart: updatedCart,
        totalCount: total.totalCount,
        totalPrice: total.totalPrice,
      };
    });
  },

  removeCartItem: (itemId: string, userId: string) => {
    set((state) => {
      const updatedCart = state.cart.filter(
        (cartItem) => cartItem.id !== itemId
      );

      const total = calculateTotal(updatedCart);

      setCartToLocalStorage(updatedCart, userId);

      return {
        cart: updatedCart,
        totalCount: total.totalCount,
        totalPrice: total.totalPrice,
      };
    });
  },

  changeCartItemCount: ({
    itemId,
    count,
    userId,
  }: {
    itemId: string;
    count: number;
    userId: string;
  }) => {
    set((state) => {
      const updatedCart = state.cart.map((cartItem) =>
        cartItem.id === itemId ? { ...cartItem, count } : cartItem
      );

      const total = calculateTotal(updatedCart);

      setCartToLocalStorage(updatedCart, userId);

      return {
        cart: updatedCart,
        totalCount: total.totalCount,
        totalPrice: total.totalPrice,
      };
    });
  },
}));

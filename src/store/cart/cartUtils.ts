import { getItem, setItem } from '@/helpers/localStorage';
import { parseJSON } from '@/utils/common';
import { CartItem, Total } from './types';

const CART_LOCAL_STORAGE_KEY = 'CART_LOCAL_STORAGE_KEY';

export const getCartFromLocalStorage = (userId: string): CartItem[] => {
  const cartData = getItem(CART_LOCAL_STORAGE_KEY);
  if (!cartData) {
    return [];
  }

  const cartItems = parseJSON(cartData) as Record<string, CartItem[]> | null;
  return cartItems?.[userId] ?? [];
};

export const resetCartAtLocalStorage = (userId: string): void => {
  const cartData = getItem(CART_LOCAL_STORAGE_KEY);
  const cartItems = cartData
    ? (parseJSON(cartData) as Record<string, CartItem[]>)
    : {};

  setItem(CART_LOCAL_STORAGE_KEY, {
    ...cartItems,
    [userId]: [],
  });
};

export const setCartToLocalStorage = (
  cart: CartItem[],
  userId: string
): void => {
  const cartData = getItem(CART_LOCAL_STORAGE_KEY);
  const cartItems = cartData
    ? (parseJSON(cartData) as Record<string, CartItem[]>)
    : {};

  setItem(CART_LOCAL_STORAGE_KEY, {
    ...cartItems,
    [userId]: cart,
  });
};

export const calculateTotal = (cart: CartItem[]): Total => {
  return cart.reduce(
    (acc: Total, item: CartItem) => ({
      totalCount: acc.totalCount + item.count,
      totalPrice: acc.totalPrice + item.price * item.count,
    }),
    { totalCount: 0, totalPrice: 0 }
  );
};

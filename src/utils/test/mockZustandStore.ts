import { AuthStore } from '@/store/auth/types';
import { useAuthStore } from '@/store/auth/useAuthStore';
import { CartStore } from '@/store/cart/types';
import { useCartStore } from '@/store/cart/useCartStore';
import { FilterStore } from '@/store/filter/types';
import { useFilterStore } from '@/store/filter/useFilterStore';
import { ToastStore } from '@/store/toast/types';
import { useToastStore } from '@/store/toast/useToastStore';
import { StoreApi, UseBoundStore } from 'zustand';

const mockStore = <T>(
  hook: UseBoundStore<StoreApi<T>>,
  state: Partial<T>
): void => {
  const initialState = hook.getState();
  hook.setState({ ...initialState, ...state }, true);
};

export const mockUseAuthStore = (state: Partial<AuthStore>): void => {
  mockStore(useAuthStore, state);
};

export const mockUseCartStore = (state: Partial<CartStore>): void => {
  mockStore(useCartStore, state);
};

export const mockUseFilterStore = (state: Partial<FilterStore>): void => {
  mockStore(useFilterStore, state);
};

export const mockUseToastStore = (state: Partial<ToastStore>): void => {
  mockStore(useToastStore, state);
};

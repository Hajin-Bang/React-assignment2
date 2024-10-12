import { ALL_CATEGORY_ID } from '@/constants';
import { create } from 'zustand';
import { FilterStore } from './types';

export const useFilterStore = create<FilterStore>((set) => ({
  minPrice: 0,
  maxPrice: 0,
  title: '',
  categoryId: ALL_CATEGORY_ID,

  setMinPrice: (price: number) =>
    set((state) => ({ ...state, minPrice: price })),
  setMaxPrice: (price: number) =>
    set((state) => ({ ...state, maxPrice: price })),
  setTitle: (title: string) => set((state) => ({ ...state, title })),
  setCategoryId: (categoryId: string) =>
    set((state) => ({ ...state, categoryId })),

  resetFilter: () =>
    set(() => ({
      minPrice: 0,
      maxPrice: 0,
      title: '',
      categoryId: ALL_CATEGORY_ID,
    })),
}));

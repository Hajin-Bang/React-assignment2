import { create } from 'zustand';
import { ProductStore } from './types';

export const useProductStore = create<ProductStore>((set, get) => ({
  items: [],
  hasNextPage: true,
  isLoading: false,
  error: null,
  totalCount: 0,
}));

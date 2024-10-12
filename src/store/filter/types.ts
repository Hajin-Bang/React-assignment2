export interface FilterStore {
  minPrice: number;
  maxPrice: number;
  title: string;
  categoryId: string;
  setMinPrice: (price: number) => void;
  setMaxPrice: (price: number) => void;
  setTitle: (title: string) => void;
  setCategoryId: (categoryId: string) => void;
  resetFilter: () => void;
}

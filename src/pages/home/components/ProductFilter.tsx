import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { Suspense, useCallback, useEffect, useMemo, useState } from 'react';

import { useFilterStore } from '@/store/filter/useFilterStore';

import { debounce } from '@/utils/common';

import { ApiErrorBoundary } from '@/pages/common/components/ApiErrorBoundary';
import { CategoryRadioGroup } from './CategoryRadioGroup';
import { PriceRange } from './PriceRange';
import { SearchBar } from './SearchBar';

interface ProductFilterBoxProps {
  children: React.ReactNode;
}

const ProductFilterBox: React.FC<ProductFilterBoxProps> = ({ children }) => (
  <Card className="my-4">
    <CardContent>{children}</CardContent>
  </Card>
);

export const ProductFilter = () => {
  const minPrice = useFilterStore((state) => state.minPrice);
  const maxPrice = useFilterStore((state) => state.maxPrice);
  const title = useFilterStore((state) => state.title);
  const categoryId = useFilterStore((state) => state.categoryId);
  const setTitle = useFilterStore((state) => state.setTitle);
  const setMinPrice = useFilterStore((state) => state.setMinPrice);
  const setMaxPrice = useFilterStore((state) => state.setMaxPrice);
  const setCategoryId = useFilterStore((state) => state.setCategoryId);

  const [searchValue, setSearchValue] = useState(title);

  const debouncedSetTitle = useMemo(
    () => debounce((value: string) => setTitle(value), 300),
    [setTitle]
  );

  useEffect(() => {
    debouncedSetTitle(searchValue);
  }, [searchValue, debouncedSetTitle]);

  const handleChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
    },
    []
  );

  const handlePriceChange = useCallback(
    (actionCreator: (value: number) => void) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === '') {
          actionCreator(-1);
        } else {
          const numericValue = Math.max(0, parseInt(value, 10));
          if (!isNaN(numericValue)) {
            actionCreator(numericValue);
          }
        }
      },
    []
  );

  const handleMinPrice = handlePriceChange(setMinPrice);
  const handleMaxPrice = handlePriceChange(setMaxPrice);

  const handleChangeCategory = useCallback(
    (value: string) => {
      if (value !== undefined) {
        setCategoryId(value);
      } else {
        console.error('카테고리가 설정되지 않았습니다.');
      }
    },
    [setCategoryId]
  );

  return (
    <div className="space-y-4">
      <ProductFilterBox>
        <SearchBar onChangeInput={handleChangeInput} value={searchValue} />
      </ProductFilterBox>
      <ProductFilterBox>
        <ApiErrorBoundary>
          <Suspense fallback={<Loader2 className="h-24 w-24 animate-spin" />}>
            <CategoryRadioGroup
              categoryId={categoryId}
              onChangeCategory={handleChangeCategory}
            />
          </Suspense>
        </ApiErrorBoundary>
      </ProductFilterBox>
      <ProductFilterBox>
        <PriceRange
          onChangeMinPrice={handleMinPrice}
          onChangeMaxPrice={handleMaxPrice}
          minPrice={minPrice}
          maxPrice={maxPrice}
        />
      </ProductFilterBox>
    </div>
  );
};

import { PriceSummary } from '@/pages/cart/components/PriceSummary';
import { ProductInfoTable } from '@/pages/cart/components/ProductInfoTable';

export const CartTable = () => {
  return (
    <>
      <ProductInfoTable />
      <PriceSummary />
    </>
  );
};

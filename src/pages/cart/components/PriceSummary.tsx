import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

import { useCartStore } from '@/store/cart/useCartStore';
import { formatNumber, formatPrice } from '@/utils/formatter';

import { pageRoutes } from '@/apiRoutes';

export const PriceSummary = () => {
  const navigate = useNavigate();
  const totalCount = useCartStore((state) => state.totalCount);
  const totalPrice = useCartStore((state) => state.totalPrice);

  const handleClickPurchase = () => {
    navigate(pageRoutes.purchase);
  };

  return (
    <div className="pt-4 flex flex-col items-end">
      <p>
        총 {formatNumber(totalCount)}개, {formatPrice(totalPrice)}
      </p>
      <Button onClick={handleClickPurchase} className="mt-2">
        구매하기
      </Button>
    </div>
  );
};

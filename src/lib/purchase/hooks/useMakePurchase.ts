import { pageRoutes } from '@/apiRoutes';
import { CartItem } from '@/store/cart/types';
import { useCartStore } from '@/store/cart/useCartStore';
import { useToastStore } from '@/store/toast/useToastStore';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { PurchaseDTO, makePurchaseAPI } from '..';

interface MakePurchaseVariables {
  purchaseData: PurchaseDTO;
  userId: string;
  cartData: CartItem[];
}

export const useMakePurchase = () => {
  const navigate = useNavigate();
  const { resetCart } = useCartStore();
  const { addToast } = useToastStore();

  return useMutation<void, Error, MakePurchaseVariables>({
    mutationFn: ({ purchaseData, userId, cartData }) =>
      makePurchaseAPI(purchaseData, userId, cartData),
    onSuccess: (_, variables, context) => {
      resetCart(variables.userId);
      addToast('구매 성공!', 'success');
      navigate(pageRoutes.main);
    },
    onError: (error: Error) => {
      addToast('구매 중 오류가 발생했습니다.', 'error');
      console.error('구매 중 오류가 발생했습니다.', error.message);
    },
  });
};

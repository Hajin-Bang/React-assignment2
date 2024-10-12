import {
  IProduct,
  NewProductDTO,
  PRODUCT_KEY,
  addProductAPI,
} from '@/lib/product';
import { useToastStore } from '@/store/toast/useToastStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAddProduct = () => {
  const queryClient = useQueryClient();

  const { addToast } = useToastStore();

  return useMutation<IProduct, Error, NewProductDTO>({
    mutationFn: addProductAPI,
    onSuccess: () => {
      addToast('등록 성공!', 'success');
      queryClient.invalidateQueries({ queryKey: [PRODUCT_KEY] });
    },
    onError: (error: Error) => {
      addToast('물픔 등록에 실패하였습니다.', 'error');
      console.error(error);
    },
  });
};

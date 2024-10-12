import { Button } from '@/components/ui/button';
import { FirebaseIndexErrorModal } from '@/pages/error/components/FirebaseIndexErrorModal';
import { ChevronDown, Plus } from 'lucide-react';
import { Suspense, lazy, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthStore } from '@/store/auth/useAuthStore';
import { useCartStore } from '@/store/cart/useCartStore';

import { pageRoutes } from '@/apiRoutes';
import { PRODUCT_PAGE_SIZE } from '@/constants';
import { extractIndexLink, isFirebaseIndexError } from '@/helpers/error';
import { useModal } from '@/hooks/useModal';
import { IProduct, useFetchProducts } from '@/lib/product';
import { CartItem } from '@/store/cart/types';

import { useToastStore } from '@/store/toast/useToastStore';
import { ProductCardSkeleton } from '../skeletons/ProductCardSkeleton';
import { EmptyProduct } from './EmptyProduct';
import { ProductCard } from './ProductCard';

const ProductRegistrationModal = lazy(() =>
  import('./ProductRegistrationModal').then((module) => ({
    default: module.ProductRegistrationModal,
  }))
);

interface ProductListProps {
  pageSize?: number;
}

export const ProductList: React.FC<ProductListProps> = ({
  pageSize = PRODUCT_PAGE_SIZE,
}) => {
  const navigate = useNavigate();
  const { isOpen, openModal, closeModal } = useModal();
  const [isIndexErrorModalOpen, setIsIndexErrorModalOpen] =
    useState<boolean>(false);
  const [indexLink, setIndexLink] = useState<string | null>(null);

  const user = useAuthStore((state) => state.user);
  const isLogin = useAuthStore((state) => state.isLogin);
  const addToast = useToastStore((state) => state.addToast);
  const addCartItem = useCartStore((state) => state.addCartItem);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useFetchProducts({ pageSize });

  useEffect(() => {
    if (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);

      if (isFirebaseIndexError(errorMessage)) {
        const link = extractIndexLink(errorMessage);
        setIndexLink(link);
        setIsIndexErrorModalOpen(true);
      }
    }
  }, [error]);

  const handleCartAction = useCallback(
    (product: IProduct): void => {
      if (isLogin && user) {
        const cartItem: CartItem = { ...product, count: 1 };
        addCartItem(cartItem, user.uid, 1);
        addToast(`${product.title} 상품이 장바구니에 담겼습니다.`, 'success');
      } else {
        navigate(pageRoutes.login);
      }
    },
    [isLogin, user, addCartItem, addToast, navigate]
  );

  const handlePurchaseAction = useCallback(
    (product: IProduct): void => {
      if (isLogin && user) {
        const cartItem: CartItem = { ...product, count: 1 };
        addCartItem(cartItem, user.uid, 1);
        navigate(pageRoutes.cart);
      } else {
        navigate(pageRoutes.login);
      }
    },
    [isLogin, user, addCartItem, navigate]
  );

  const firstProductImage = data?.pages[0]?.products[0]?.image;
  useEffect(() => {
    if (firstProductImage) {
      const img = new Image();
      img.src = firstProductImage;
    }
  }, [firstProductImage]);

  const products = data ? data.pages.flatMap((page) => page.products) : [];

  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-end mt-4">
          {isLogin && (
            <Button onClick={openModal}>
              <Plus className="mr-2 h-4 w-4" /> 상품 등록
            </Button>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: pageSize }, (_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <EmptyProduct onAddProduct={openModal} />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product, index) => (
                <ProductCard
                  key={`${product.id}_${index}`}
                  product={product}
                  onClickAddCartButton={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    handleCartAction(product);
                  }}
                  onClickPurchaseButton={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    handlePurchaseAction(product);
                  }}
                />
              ))}
            </div>

            {hasNextPage && (
              <div className="flex justify-center mt-4">
                <Button
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                >
                  {isFetchingNextPage ? '로딩 중...' : '더 보기'}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        )}

        <Suspense fallback={<div>Loading...</div>}>
          {isOpen && (
            <ProductRegistrationModal isOpen={isOpen} onClose={closeModal} />
          )}
        </Suspense>

        <FirebaseIndexErrorModal
          isOpen={isIndexErrorModalOpen}
          onClose={() => setIsIndexErrorModalOpen(false)}
          indexLink={indexLink}
        />
      </div>
    </>
  );
};

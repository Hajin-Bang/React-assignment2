import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import React, { useCallback, useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { useMakePurchase } from '@/lib/purchase/hooks/useMakePurchase';

import { useAuthStore } from '@/store/auth/useAuthStore';
import { calculateTotal } from '@/store/cart/cartUtils';
import { useCartStore } from '@/store/cart/useCartStore';

import { Layout, authStatusType } from '@/pages/common/components/Layout';
import { ItemList } from '@/pages/purchase/components/ItemList';
import { Payment } from '@/pages/purchase/components/Payment';
import { ShippingInformationForm } from '@/pages/purchase/components/ShippingInformationForm';

export interface FormData {
  name: string;
  address: string;
  phone: string;
  requests: string;
  payment: string;
  form?: string;
}

export interface FormErrors {
  phone?: string;
  form?: string;
}

export const Purchase: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const cart = useCartStore((state) => state.cart);
  const initCart = useCartStore((state) => state.initCart);

  const methods = useForm<FormData>({
    defaultValues: {
      name: user?.displayName ?? '',
      address: '',
      phone: '',
      requests: '',
      payment: 'accountTransfer',
    },
  });

  const { handleSubmit } = methods;

  useEffect(() => {
    if (user?.uid) {
      initCart(user.uid);
    }
  }, [user, initCart]);

  const { mutate: makePurchaseMutation, isPending: isLoading } =
    useMakePurchase();

  const onSubmit: SubmitHandler<FormData> = useCallback(
    (data) => {
      if (!user) return;

      const cartItems = Object.values(cart);
      const total = calculateTotal(cart);
      const totalAmount = total.totalPrice;

      const purchaseData = {
        ...data,
        totalAmount,
        paymentMethod: data.payment,
        shippingAddress: data.address,
        items: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.count,
          price: item.price,
        })),
      };

      makePurchaseMutation({
        purchaseData,
        userId: user.uid,
        cartData: cartItems,
      });
    },
    [cart, makePurchaseMutation, user]
  );

  return (
    <FormProvider {...methods}>
      <Layout
        containerClassName="pt-[30px]"
        authStatus={authStatusType.NEED_LOGIN}
      >
        <Card className="w-full max-w-4xl mx-auto">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <ShippingInformationForm />
              <ItemList />
              <Payment />
              <div className="flex justify-end mt-6">
                <Button type="submit" size="lg" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      처리 중...
                    </>
                  ) : (
                    '구매하기'
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </Layout>
    </FormProvider>
  );
};

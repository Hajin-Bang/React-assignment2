import { CartTable } from '@/pages/cart/components/CartTable';
import { EmptyNotice } from '@/pages/cart/components/EmptyNotice';
import { Layout, authStatusType } from '@/pages/common/components/Layout';

import { useCartStore } from '@/store/cart/useCartStore';

export const Cart = () => {
  const cart = useCartStore((state) => state.cart);

  const isExist = cart.length > 0;

  return (
    <Layout
      containerClassName="p-2.5 flex flex-col"
      authStatus={authStatusType.NEED_LOGIN}
    >
      {isExist ? <CartTable /> : <EmptyNotice />}
    </Layout>
  );
};

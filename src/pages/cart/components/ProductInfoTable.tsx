import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { useAuthStore } from '@/store/auth/useAuthStore';
import { useCartStore } from '@/store/cart/useCartStore';

import { ProductInfoTableRow } from '@/pages/cart/components/ProductInfoTableRow';

export const ProductInfoTable = () => {
  const user = useAuthStore((state) => state.user);
  const cart = useCartStore((state) => state.cart);
  const removeCartItem = useCartStore((state) => state.removeCartItem);
  const changeCartItemCount = useCartStore(
    (state) => state.changeCartItemCount
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">이미지</TableHead>
          <TableHead>상품명</TableHead>
          <TableHead>갯수</TableHead>
          <TableHead>가격</TableHead>
          <TableHead>삭제하기</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cart.length > 0 ? (
          cart.map((item) => (
            <ProductInfoTableRow
              key={item.id}
              item={item}
              user={user}
              removeCartItem={removeCartItem}
              changeCartItemCount={changeCartItemCount}
            />
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              장바구니가 비어 있습니다.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

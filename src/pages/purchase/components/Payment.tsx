import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { CreditCard } from 'lucide-react';
import { useMemo } from 'react';

import { useCartStore } from '@/store/cart/useCartStore';

import { formatPrice } from '@/utils/formatter';

import { PaymentMethodTableRow } from './PaymentMethodTableRow';

export const Payment = () => {
  const totalPrice = useCartStore((state) => state.totalPrice);
  const shippingCost = 3000;

  const getTotalPrice = useMemo(() => {
    return formatPrice(totalPrice + shippingCost);
  }, [totalPrice, shippingCost]);

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <CreditCard className="mr-2 h-6 w-6" />
          결제정보
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-bold w-[120px]">총상품가격</TableCell>
              <TableCell>{formatPrice(totalPrice)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold w-[120px]">배송비</TableCell>
              <TableCell>{formatPrice(shippingCost)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold w-[120px]">
                <Label>총결제금액</Label>
              </TableCell>
              <TableCell>{getTotalPrice}</TableCell>
            </TableRow>
            <PaymentMethodTableRow />
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

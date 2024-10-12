import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { pageRoutes } from '@/apiRoutes';
import { CartItem } from '@/store/cart/types';

export const CartButton = ({ cart }: { cart: CartItem[] }) => {
  const navigate = useNavigate();
  const cartItemCount = cart.length;

  const handleClickCart = () => {
    navigate(pageRoutes.cart);
  };

  return (
    <Button variant="ghost" onClick={handleClickCart} className="relative">
      <ShoppingCart className="h-5 w-5" />
      {cartItemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {cartItemCount}
        </span>
      )}
    </Button>
  );
};

import { db } from '@/firebase';
import { CartItem } from '@/store/cart/types';
import {
  collection,
  doc,
  runTransaction,
  serverTimestamp,
} from 'firebase/firestore';
import { CartItemDTO, PurchaseDTO } from '.';

export const makePurchaseAPI = async (
  purchaseData: PurchaseDTO,
  userId: string,
  cartData: CartItem[]
): Promise<void> => {
  try {
    await runTransaction(db, async (transaction) => {
      if (!cartData || cartData.length === 0) {
        throw new Error('장바구니가 비어 있습니다.');
      }

      const purchasesRef = collection(db, 'purchases');
      const newPurchaseRef = doc(purchasesRef);

      const cartItemDTOs: CartItemDTO[] = cartData.map((item) => ({
        productId: item.id,
        quantity: item.count,
        price: item.price,
      }));

      const newPurchaseData = {
        ...purchaseData,
        userId,
        createdAt: serverTimestamp(),
        status: 'pending',
        items: cartItemDTOs,
      };

      transaction.set(newPurchaseRef, newPurchaseData);
    });
  } catch (error) {
    console.error('Error making purchase: ', error);
    throw error;
  }
};

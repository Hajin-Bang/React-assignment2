import { categories } from '@/constants';
import { NewProductDTO } from '@/lib/product';

export const createNewProduct = (product: NewProductDTO, imageUrl: string) => {
  const categoryObj = categories.find((cat) => cat.id === product.category.id);
  return {
    ...product,
    price: Number(product.price),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    category: categoryObj
      ? { id: categoryObj.id, name: categoryObj.name }
      : { id: '0', name: 'Unknown' },
    image: imageUrl,
  };
};

export const initialProductState: NewProductDTO = {
  title: '',
  price: 0,
  description: '',
  category: { id: '', name: '' },
  image: null,
};

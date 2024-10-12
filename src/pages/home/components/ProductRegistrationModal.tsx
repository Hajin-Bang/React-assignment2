import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { NewProductDTO } from '@/lib/product';
import { useAddProduct } from '@/lib/product/hooks/useAddProduct';

import { useToastStore } from '@/store/toast/useToastStore';

import { ALL_CATEGORY_ID, categories } from '@/constants';
import { createNewProduct } from '@/helpers/product';
import { uploadImage } from '@/utils/imageUpload';

interface ProductRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ProductFormInputs {
  title: string;
  price: number;
  description: string;
  categoryId: string;
  image: FileList;
}

export const ProductRegistrationModal: React.FC<
  ProductRegistrationModalProps
> = ({ isOpen, onClose }) => {
  const { mutateAsync, isPending: isLoading } = useAddProduct();
  const addToast = useToastStore((state) => state.addToast);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<ProductFormInputs>();
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const onSubmit = async (data: ProductFormInputs) => {
    setSubmissionError(null);
    try {
      if (!data.image || data.image.length === 0) {
        throw new Error('이미지를 선택해야 합니다.');
      }
      const imageFile = data.image[0];

      const imageUrl = await uploadImage(imageFile);
      if (!imageUrl) {
        throw new Error('이미지 업로드에 실패했습니다.');
      }

      const selectedCategory = categories.find(
        (category) => category.id === data.categoryId
      );

      if (!selectedCategory) {
        throw new Error('유효한 카테고리를 선택해주세요.');
      }

      const newProductData: NewProductDTO = {
        title: data.title,
        price: Number(data.price),
        description: data.description,
        category: { id: selectedCategory.id, name: selectedCategory.name },
        image: imageFile,
      };

      const newProduct = createNewProduct(newProductData, imageUrl);

      await mutateAsync(newProduct);

      addToast('물품 등록 성공!', 'success');
      reset();
      onClose();
    } catch (error: any) {
      addToast('물픔 등록에 실패했습니다.', 'error');
      console.error('물품 등록에 실패했습니다.', error);
      setSubmissionError(error.message || '물품 등록에 실패했습니다.');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>상품 등록</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <Input
              {...register('title', { required: '상품명을 입력해주세요.' })}
              placeholder="상품명"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
            <Input
              type="number"
              {...register('price', { required: '가격을 입력해주세요.' })}
              placeholder="가격"
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price.message}</p>
            )}
            <Textarea
              {...register('description', {
                required: '상품 설명을 입력해주세요.',
              })}
              className="resize-none"
              placeholder="상품 설명"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
            <Controller
              name="categoryId"
              control={control}
              defaultValue=""
              rules={{ required: '카테고리를 선택해주세요.' }}
              render={({ field }) => (
                <>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="카테고리 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories
                        .filter((category) => category.id !== ALL_CATEGORY_ID)
                        .map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  {errors.categoryId && (
                    <p className="text-red-500 text-sm">
                      {errors.categoryId.message}
                    </p>
                  )}
                </>
              )}
            />
            <Input
              className="cursor-pointer"
              type="file"
              accept="image/*"
              {...register('image', { required: '이미지를 선택해주세요.' })}
            />
            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image.message}</p>
            )}
          </div>
          {submissionError && (
            <p className="text-red-500 text-sm">{submissionError}</p>
          )}
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? '등록 중...' : '등록'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

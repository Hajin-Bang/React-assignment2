export const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const PHONE_PATTERN = /^[0-9]{3}[-]+[0-9]{4}[-]+[0-9]{4}$/i;

export const MAX_CART_VALUE = 999;

export const ALL_CATEGORY_ID = '-1';

export const PRODUCT_PAGE_SIZE = 3;

export const categories: { id: string; name: string }[] = [
  { id: ALL_CATEGORY_ID, name: '전체' },
  { id: '1', name: '옷' },
  { id: '2', name: '신발' },
  { id: '3', name: '가전제품' },
  { id: '4', name: '가구' },
  { id: '5', name: '기타' },
];

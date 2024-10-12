const KRW = Intl.NumberFormat('ko-KR', {
  style: 'currency',
  currency: 'KRW',
});

export const formatPrice = (value: number): string => KRW.format(value);

const NumberFormat = Intl.NumberFormat('ko-KR');

export const formatNumber = (value: number): string =>
  NumberFormat.format(value);

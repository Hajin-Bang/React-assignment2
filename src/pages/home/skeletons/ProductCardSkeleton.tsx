import { Card, CardContent, CardFooter } from '@/components/ui/card';

export const ProductCardSkeleton = () => (
  <Card className="animate-pulse">
    <div className="w-full h-40 bg-gray-200" />
    <CardContent className="p-4">
      <div className="h-6 w-20 bg-gray-200 rounded mb-2" />
      <div className="h-4 w-full bg-gray-200 rounded mb-2" />
      <div className="h-4 w-3/4 bg-gray-200 rounded" />
    </CardContent>
    <CardFooter className="p-4">
      <div className="h-8 w-24 bg-gray-200 rounded mr-2" />
      <div className="h-8 w-24 bg-gray-200 rounded" />
    </CardFooter>
  </Card>
);

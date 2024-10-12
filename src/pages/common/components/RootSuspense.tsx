import { ReactNode, Suspense } from 'react';

import { LoadingPage } from '@/pages/loading/components/LoadingPage';

interface RootSuspenseProps {
  children: ReactNode;
}

export const RootSuspense: React.FC<RootSuspenseProps> = ({ children }) => {
  return <Suspense fallback={<LoadingPage />}>{children}</Suspense>;
};

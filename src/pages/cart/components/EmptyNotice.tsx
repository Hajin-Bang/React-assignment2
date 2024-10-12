import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

import { pageRoutes } from '@/apiRoutes';

export const EmptyNotice = () => {
  const navigate = useNavigate();

  const handleClickBack = () => {
    navigate(pageRoutes.main);
  };

  return (
    <div className="flex justify-center items-center h-[400px] flex-col">
      <p className="text-5xl font-light">텅~</p>
      <Button variant="link" onClick={handleClickBack} className="mt-2">
        홈으로 가기
      </Button>
    </div>
  );
};

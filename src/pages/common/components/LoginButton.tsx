import { Button } from '@/components/ui/button';
import { useLocation, useNavigate } from 'react-router-dom';

import { pageRoutes } from '@/apiRoutes';

export const LoginButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClickLogin = () => {
    navigate(pageRoutes.login, { state: { prevPath: location.pathname } });
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-primary hover:text-primary-dark"
      onClick={handleClickLogin}
    >
      로그인
    </Button>
  );
};

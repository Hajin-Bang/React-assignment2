import { pageRoutes } from '@/apiRoutes';
import { useAuthStore } from '@/store/auth/useAuthStore';
import { useToastStore } from '@/store/toast/useToastStore';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { LoginRequestDto, LoginResponseDto, loginAPI } from '..';

export const useLogin = () => {
  const navigate = useNavigate();

  const { addToast } = useToastStore();
  const { setIsLogin, setUser } = useAuthStore();

  return useMutation<LoginResponseDto, Error, LoginRequestDto>({
    mutationFn: loginAPI,
    onSuccess: (userData) => {
      addToast('로그인 성공!', 'success');
      setIsLogin(true);
      setUser({
        uid: userData.uid,
        email: userData.email,
        displayName: userData.displayName ?? '',
      });
      navigate(pageRoutes.main);
    },
    onError: (error: any) => {
      addToast(
        '로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.',
        'error'
      );
      console.error(
        '로그인 중 오류가 발생했습니다. 다시 시도해 주세요.',
        error
      );
    },
  });
};

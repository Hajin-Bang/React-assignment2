import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { pageRoutes } from '@/apiRoutes';
import { useToastStore } from '@/store/toast/useToastStore';
import { IUser, RegisterUserReqDTO, registerUserAPI } from '..';

export const useRegisterUser = () => {
  const { addToast } = useToastStore();
  const navigate = useNavigate();

  return useMutation<IUser, Error, RegisterUserReqDTO>({
    mutationFn: registerUserAPI,
    onSuccess: () => {
      addToast('회원가입 성공!', 'success');
      navigate(pageRoutes.login);
    },
    onError: (error: Error) => {
      addToast('회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.', 'error');
      console.error('회원가입 중 오류가 발생했습니다.', error.message);
    },
  });
};

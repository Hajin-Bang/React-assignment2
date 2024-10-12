import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, Mail, User } from 'lucide-react';
import React, { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { EMAIL_PATTERN } from '@/constants';
import { useRegisterUser } from '@/lib/auth';
import { Layout, authStatusType } from '@/pages/common/components/Layout';

interface FormInputs {
  name: string;
  email: string;
  password: string;
}

export const RegisterPage: React.FC = () => {
  const { mutate: registerUser, isPending: isLoading } = useRegisterUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = useCallback(
    (data) => {
      registerUser({
        email: data.email,
        password: data.password,
        name: data.name,
      });
    },
    [registerUser]
  );

  return (
    <Layout authStatus={authStatusType.NEED_NOT_LOGIN}>
      <div className="w-full h-screen max-w-md mx-auto space-y-8 flex flex-col justify-center">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">이름</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                id="name"
                type="text"
                className="pl-10"
                placeholder="이름을 입력하세요"
                {...register('name', { required: '이름을 입력하세요' })}
              />
            </div>
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                id="email"
                type="email"
                className="pl-10"
                placeholder="이메일을 입력하세요"
                {...register('email', {
                  required: '이메일을 입력하세요',
                  pattern: {
                    value: EMAIL_PATTERN,
                    message: '이메일 양식이 올바르지 않습니다',
                  },
                })}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">비밀번호</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                id="password"
                type="password"
                className="pl-10"
                placeholder="비밀번호를 입력하세요"
                {...register('password', { required: '비밀번호를 입력하세요' })}
              />
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? '가입 중...' : '회원가입'}
          </Button>
        </form>
      </div>
    </Layout>
  );
};

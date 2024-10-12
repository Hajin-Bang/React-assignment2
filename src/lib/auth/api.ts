import { auth, db } from '@/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import Cookies from 'js-cookie';
import {
  IUser,
  LoginRequestDto,
  LoginResponseDto,
  RegisterUserReqDTO,
} from './types';

export const registerUserAPI = async ({
  email,
  password,
  name,
}: RegisterUserReqDTO): Promise<IUser> => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;

  await updateProfile(user, { displayName: name });

  await setDoc(doc(db, 'users', user.uid), {
    name,
    email,
  });

  return {
    uid: user.uid,
    email: user.email!,
    displayName: name,
  };
};

export const loginAPI = async (
  loginData: LoginRequestDto
): Promise<LoginResponseDto> => {
  try {
    const { email, password } = loginData;
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const token = await user.getIdToken();

    Cookies.set('accessToken', token, { expires: 7 });

    return {
      uid: user.uid,
      email: user.email ?? '',
      displayName: user.displayName ?? '',
      accessToken: token,
    };
  } catch (error) {
    throw new Error('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
  }
};

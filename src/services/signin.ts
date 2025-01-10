import type { SignInData } from '@/validators/signin';
import { type SignedUser, api } from '.';

export async function signIn(payload: SignInData): Promise<SignedUser> {
  const { data } = await api.post<SignedUser>('/auth', payload);

  return data;
}

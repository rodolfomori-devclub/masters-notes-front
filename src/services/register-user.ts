import type { RegisterUserData } from '@/validators/register-user';
import { api } from '.';

export async function registerUser(payload: RegisterUserData): Promise<void> {
  await api.post('/users', payload);
}

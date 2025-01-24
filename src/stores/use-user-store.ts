import type { SignedUser } from '@/services';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserStore = {
  user: SignedUser;
  setUser: (user: SignedUser) => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: {} as SignedUser,
      setUser: (user: SignedUser) => set((old) => ({ ...old, user })),
    }),
    { name: '@mastersnotes:user' },
  ),
);

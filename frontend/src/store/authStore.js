import { create } from 'zustand';
import { getMe } from '../api/user';

export const useAuthStore = create((set) => ({
  user: null,
  accessToken: null,

  setAuth: ({ user, token }) => set({ user, accessToken: token }),
  setToken: (token) => set({ accessToken: token }),

  logout: () => {
    sessionStorage.removeItem('accessToken');
    set({ user: null, accessToken: null });
  },
  refreshUser: async () => {
    const token = sessionStorage.getItem('accessToken');
    const res = await getMe(token);
    set({ user: res.data });
  }
}));
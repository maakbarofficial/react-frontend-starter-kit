import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';

const useAuthStore = create(
  devtools(
    persist(
      (set) => ({
        token: null,
        setToken: (tokenData) => set({ token: tokenData }, false, 'setToken'),
      }),
      {
        name: 'auth',
        storage: createJSONStorage(() => localStorage),
      },
    ),
    { name: 'authStore' },
  ),
);

export default useAuthStore;

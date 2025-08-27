import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';

const useUserStore = create(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (userData) => set({ user: userData }, false, 'setUser'),
      }),
      {
        name: 'user',
        storage: createJSONStorage(() => localStorage),
      },
    ),
    { name: 'userStore' },
  ),
);

export default useUserStore;

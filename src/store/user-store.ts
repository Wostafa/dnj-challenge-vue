import { defineStore } from 'pinia';
import { currentUser } from '@/data';
import { ref } from 'vue';
import type { IUser } from '@/types';

export const useUserStore = defineStore('user', () => {
  const user = ref<IUser>(currentUser);

  return {
    user,
  };
});

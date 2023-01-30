<script setup lang="ts">
import type { IUser } from '@/types';
import ProfilePhoto from '../ProfilePhoto.vue';
import { useUserStore } from '@/store/user-store';

const props = defineProps<{
  placeholder: string;
}>();

const userStore = useUserStore();
</script>

<template>
  <div class="wrapper">
    <ProfilePhoto :user="userStore.user" class="profile-photo" />
    <textarea :placeholder="placeholder" />
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables';

.wrapper {
  display: flex;
  gap: 16px;

  textarea {
    border-radius: 6px;
    padding: 10px 8px;
    border: 2px solid #ebf0f3;
    outline: 0;
    width: 100%;
    resize: vertical;
    min-height: 45px;
    height: 45px;

    &:focus {
      border-color: $c-gray-300;
    }

    &::placeholder {
      color: $c-gray-400;
    }
  }
}
</style>

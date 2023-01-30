<script setup lang="ts">
import { computed, withDefaults } from 'vue';
import type { IUser } from '@/types';

const props = defineProps<{
  user: IUser;
}>();

const userNickname = computed(() => {
  const name = props.user.name.split(' ');
  if (name.length >= 2) {
    return name[0][0] + name[1][0];
  } else {
    return name[0][0];
  }
});
</script>

<template>
  <div class="wrapper">
    <img v-if="user.avatar" :src="user.avatar" alt="profile photo" />
    <div v-else class="nickname">{{ userNickname }}</div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables';

.wrapper {
  width: $profile-picture-size;
  height: $profile-picture-size;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $c-sky-100;
  border-radius: 50%;
  overflow: hidden;

  .nickname {
    text-transform: uppercase;
    font-weight: 600;
    color: $c-blue-500;
  }

  img {
    height: auto;
    width: 100%;
    object-fit: cover;
    display: block;
  }
}
</style>

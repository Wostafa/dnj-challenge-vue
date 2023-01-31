<script setup lang="ts">
import type { IComment, IDiscussion } from '@/types';
import ProfilePhoto from '../ProfilePhoto.vue';
import { useUserStore } from '@/store/user-store';
import { useCommentStore } from '@/store/comment-store';
import { ref } from 'vue';
import Send from '@/assets/icons/Send.vue';

const props = defineProps<{
  placeholder: string;
  targetId: number | undefined;
}>();

const textarea = ref<string>('');
const userStore = useUserStore();
const commentStore = useCommentStore();

const onAddComment = () => {
  if (!textarea.value || !textarea.value.trim()) {
    return;
  }
  const comment: IDiscussion | IComment = {
    id: Date.now(),
    date: Date.now(),
    iLikedIt: false,
    likes: 0,
    text: textarea.value,
    user: userStore.user,
  };
  // comment is not a reply
  if (!props.targetId) {
    (comment as IDiscussion).replies = [];
  }

  commentStore.addComment(props.targetId, comment);
  textarea.value = '';
};
</script>

<template>
  <div class="wrapper">
    <ProfilePhoto :user="userStore.user" class="profile-photo" />
    <textarea :placeholder="placeholder" v-model="textarea" />
    <button title="send" @click="onAddComment">
      <Send />
    </button>
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
    color: $c-text;

    &:focus {
      border-color: $c-gray-300;
    }

    &::placeholder {
      color: $c-gray-400;
    }
  }
  button {
    display: flex;
    align-items: center;
    border-radius: 6px;
    padding-left: 10px;
    padding-right: 10px;
    fill: $c-slate-400;
    height: 45px;
    background-color: $c-gray-100;
    margin-left: -8px;

    &:hover {
      opacity: 0.8;
    }
  }
}
</style>

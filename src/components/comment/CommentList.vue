<script setup lang="ts">
import CommentItem from './CommentItem.vue';
import { useCommentStore } from '@/store/comment-store';

const commentStore = useCommentStore();
</script>

<template>
  <ul>
    <li class="item" v-for="comment in commentStore.comments" :key="comment.id">
      <CommentItem
        :class="['comment', comment.replies.length > 0 ? 'has-reply' : '']"
        :comment="comment"
      >
        <CommentItem
          class="reply"
          v-for="reply in comment.replies"
          :key="reply.id"
          :comment="reply"
        />
      </CommentItem>
    </li>
  </ul>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables';

.item {
  padding: 24px;

  &:not(:last-of-type) {
    border-bottom: 2px solid $c-gray-200;
  }
}

.comment {
  display: flex;
  flex-direction: column;
  position: relative;

  &.has-reply::before {
    content: '';
    height: calc(100% - $profile-picture-size - 10px);
    width: 2px;
    background-color: $c-gray-200;
    position: absolute;
    left: calc($profile-picture-size / 2);
    bottom: 0;
  }
}

.reply {
  margin-left: 64px;
  margin-top: 16px;
}
</style>

<script setup lang="ts">
import type { IDiscussion, IUser } from '@/types';
import AddComment from '../comment/AddComment.vue';
import CommentList from '../comment/CommentList.vue';
</script>

<template>
  <div class="wrapper">
    <AddComment placeholder="Start a discussion" class="add-comment" />
    <CommentList class="comment-list" />
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables';

@mixin box {
  border-radius: 8px;
  padding: 24px;
}
.wrapper {
  width: 600px;

  .add-comment {
    @include box;
    background-color: #fafbfc;
  }

  .comment-list {
    @include box;
    margin-top: 4px;
    background-color: white;
  }
}
</style>

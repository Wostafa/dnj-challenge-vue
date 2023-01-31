<script setup lang="ts">
import AddComment from './comment/AddComment.vue';
import CommentList from './comment/CommentList.vue';
</script>

<template>
  <div class="wrapper">
    <AddComment
      placeholder="Start a discussion"
      class="add-comment"
      :target-id="undefined"
    />
    <CommentList class="comment-list" />
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables';

@mixin box {
  border-radius: 8px;
}
.wrapper {
  width: 600px;

  .add-comment {
    @include box;
    padding: 24px;
    background-color: #fafbfc;
  }

  .comment-list {
    @include box;
    margin-top: 4px;
    background-color: white;
  }
}
</style>

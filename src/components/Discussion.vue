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
.wrapper {
  width: 600px;

  .add-comment {
    border-radius: 8px;
    padding: 24px;
    background-color: #fafbfc;
  }

  .comment-list {
    border-radius: 8px;
    margin-top: 4px;
    background-color: white;
  }
}
</style>

<script setup lang="ts">
import type { IComment } from '@/types';
import ProfilePhoto from '../ProfilePhoto.vue';
import ThumbUp from '@/assets/icons/ThumbUp.vue';
import moment from 'moment';
import { computed } from 'vue';
import { useCommentStore } from '@/store/comment-store';

const props = defineProps<{
  comment: IComment;
}>();

const commentStore = useCommentStore();

const dateFromNow = computed(() =>
  moment(new Date(props.comment.date)).fromNow()
);

const exactDate = computed(() =>
  moment(new Date(props.comment.date)).format('MMMM Do YYYY, h:mm:ss a')
);

const onLikeOrUnlike = () => {
  commentStore.likeOrUnlike(props.comment.id);
};
</script>

<template>
  <div>
    <div class="item">
      <ProfilePhoto :user="comment.user" />
      <div class="content">
        <div class="name-date">
          <h3>{{ comment.user.name }}</h3>
          <time :title="exactDate">{{ dateFromNow }}</time>
        </div>
        <p>{{ comment.text }}</p>
        <div class="buttons">
          <button
            :class="['like', comment.iLikedIt ? 'liked' : '']"
            @click="onLikeOrUnlike"
          >
            <ThumbUp />
            <strong>{{ comment.likes }}</strong>
          </button>
          <button class="reply">Reply</button>
        </div>
      </div>
    </div>
    <slot />
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables';
.item {
  display: flex;
  gap: 16px;

  .content {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .name-date {
    display: flex;
    gap: 8px;
    align-items: baseline;

    h3 {
      font-weight: 600;
    }

    time {
      color: $c-gray-400;
    }
  }

  .buttons {
    display: flex;
    gap: 12px;
    $background: $c-gray-100;
    $color-blue: $c-blue-500;

    .like {
      background-color: $background;
      fill: #909ab4;
      color: $color-text;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 6px;

      &.liked {
        background-color: $color-blue;
        color: white;
        fill: white;
      }

      &:hover {
        opacity: 0.8;
      }
    }

    .reply {
      color: $color-blue;
      font-weight: 700;
      background: none;

      &:hover {
        background-color: $background;
      }
    }

    button {
      width: fit-content;
      border-radius: 12px;
      padding: 4px 10px;
    }
  }
}
</style>

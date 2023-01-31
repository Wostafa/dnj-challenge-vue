<script setup lang="ts">
import type { IComment, IDiscussion } from '@/types';
import ProfilePhoto from '../ProfilePhoto.vue';
import ThumbUp from '@/assets/icons/ThumbUp.vue';
import moment from 'moment';
import { computed, ref } from 'vue';
import { useCommentStore } from '@/store/comment-store';

import AddComment from './AddComment.vue';

const props = defineProps<{
  comment: IDiscussion | IComment;
}>();

const showReply = ref(false);
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

const onReply = () => {
  showReply.value = !showReply.value;
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
          <button v-if="'replies' in comment" class="reply" @click="onReply">
            Reply
          </button>
        </div>
      </div>
    </div>
    <slot />
    <AddComment
      v-if="showReply"
      placeholder="Reply"
      class="add-comment"
      :target-id="comment.id"
    />
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
      fill: $c-slate-400;
      color: $c-text;
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

  .add-comment {
    margin-left: 64px;
    margin-top: 16px;
  }
}
</style>

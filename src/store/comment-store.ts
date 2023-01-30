import { defineStore } from 'pinia';
import { discussions } from '@/data';
import { ref } from 'vue';
import type { IDiscussion, IComment } from '@/types';

export const useCommentStore = defineStore('comment', () => {
  const comments = ref<IDiscussion[]>(discussions);

  const likeOrUnlike = (id: number) => {
    let comment: IDiscussion | IComment | undefined;

    comments.value.some((c) => {
      // comment
      if (c.id === id) {
        comment = c;
        return true;
      }
      // reply
      else {
        return c?.replies.some((r) => {
          if (r.id === id) {
            comment = r;
            return true;
          }
        });
      }
    });

    if (comment) {
      if (comment.iLikedIt) {
        comment.likes--;
        comment.iLikedIt = false;
      } else {
        comment.likes++;
        comment.iLikedIt = true;
      }
    }
  };

  return {
    comments,
    likeOrUnlike,
  };
});

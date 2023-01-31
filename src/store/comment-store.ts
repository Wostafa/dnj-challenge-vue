import { defineStore } from 'pinia';
import { discussions } from '@/data';
import { ref } from 'vue';
import type { IDiscussion, IComment } from '@/types';

export const useCommentStore = defineStore('comment', () => {
  const comments = ref<IDiscussion[]>(discussions);

  function getComment(id: number) {
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
          return false;
        });
      }
    });
    return comment;
  }

  const likeOrUnlike = (id: number) => {
    const comment = getComment(id);
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

  const addComment = (
    targetId: number | undefined,
    comment: IComment | IDiscussion
  ) => {
    // comment is a reply to another comment
    if (targetId) {
      const targetComment = getComment(targetId);
      if (targetComment) {
        if ('replies' in targetComment) {
          targetComment.replies.push(comment);
        }
      }
    }
    // comment is a stand-alone comment
    else if ('replies' in comment) {
      comments.value.push(comment);
    }
  };

  return {
    comments,
    likeOrUnlike,
    addComment,
  };
});

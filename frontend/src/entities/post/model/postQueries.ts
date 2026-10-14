import { queryOptions } from '@tanstack/react-query'

import { postApi } from '../api/post'

export const postQueries = {
  getPosts: () =>
    queryOptions({
      queryKey: ['posts'] as const,
      queryFn: () => postApi.getPosts(),
    }),

  getComments: (postId: number) =>
    queryOptions({
      queryKey: ['comments', postId] as const,
      queryFn: () => postApi.getCommentsByPostId(postId),
    }),
}

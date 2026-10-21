import { queryOptions } from '@tanstack/react-query'

import { postApi } from '../api/post'

export const postQueries = {
  allPosts: () => ['posts'] as const,

  getPostsByProfileId: (profileId: string) =>
    queryOptions({
      queryKey: [...postQueries.allPosts(), profileId] as const,
      queryFn: () => (
        profileId === 'me'
          ? postApi.getMyPosts()
          : postApi.getPostsByUserId(Number(profileId))
      ),
    }),

  getComments: (postId: number) =>
    queryOptions({
      queryKey: ['comments', postId] as const,
      queryFn: () => postApi.getCommentsByPostId(postId),
    }),
}

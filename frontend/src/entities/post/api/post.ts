import { api } from '@/shared/api'

import type { CommentCreateDTObject, Post, PostComment, PostCreateDTObject } from '../model/types'

export const postApi = {
  async createPost(payload: PostCreateDTObject): Promise<Post> {
    const { data } = await api.post<Post>('/post/', payload)

    return data
  },

  async createComment(payload: CommentCreateDTObject): Promise<PostComment> {
    const { data } = await api.post<PostComment>('/comment/', payload)

    return data
  },

  async getPosts(): Promise<Post[]> {
    const { data } = await api.get<Post[]>('/post/')

    return data
  },

  async getCommentsByPostId(postId: number): Promise<PostComment[]> {
    const { data } = await api.get<Post>(`/post/${postId}`)

    return data.comments
  },
}

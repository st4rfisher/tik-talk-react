import { api } from '@/shared/api'

import type {
  CommentCreateDTObject,
  CommentData,
  PostCreateDTObject,
  PostData,
} from '../model/types'

export const postApi = {
  async createPost(payload: PostCreateDTObject): Promise<PostData> {
    const { data } = await api.post<PostData>('/post/', payload)

    return data
  },

  async createComment(payload: CommentCreateDTObject): Promise<CommentData> {
    const { data } = await api.post<CommentData>('/comment/', payload)

    return data
  },

  async getPosts(): Promise<PostData[]> {
    const { data } = await api.get<PostData[]>('/post/')
    console.log(data)
    
    return data
  },

  async getCommentsByPostId(postId: number): Promise<CommentData[]> {
    const { data } = await api.get<PostData>(`/post/${postId}`)

    return data.comments
  },
}

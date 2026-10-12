export type PostAuthor = {
  id: number
  username: string
  firstName: string
  lastName: string
  avatarUrl: string | null
  subscribersAmount: number
}

export type PostCreateDTObject = {
  title: string
  content: string
  authorId: number
}

export type PostData = {
  id: number
  title: string
  content: string
  author: PostAuthor
  images: string[]
  createdAt: string
  updatedAt: string
  comments: CommentData[]
}

export type CommentCreateDTObject = {
  text: string
  authorId: number
  postId: number
  // commentId: number //to do
}

export type CommentData = {
  id: number
  text: string
  author: PostAuthor
  postId: number
  commentId: number
  createdAt: string
  updatedAt: string
}

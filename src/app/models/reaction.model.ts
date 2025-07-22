export interface Reaction {
  id?: string
  postId: string
  userId: string
  type: "like" | "love" | "laugh" | "angry" | "sad"
  createdAt?: Date
}

export interface Comment {
  id?: string
  postId: string
  userId: string
  userEmail: string
  content: string
  createdAt?: Date
  reactions?: Reaction[]
}

import { Component, Input, OnInit } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { ReactionService } from "../../services/reaction.service"
import { AuthService } from "../../authentication/auth.service"
import { NotificationService } from "../../services/notification.service"
import { Reaction, Comment } from "../../models/reaction.model"

@Component({
  selector: "app-post-reactions",
  templateUrl: "./post-reactions.component.html",
  styleUrls: ["./post-reactions.component.css"],
})
export class PostReactionsComponent implements OnInit {
  @Input() postId!: string

  reactions: Reaction[] = []
  comments: Comment[] = []
  userReaction: string | null = null
  showComments = false
  commentForm: FormGroup

  reactionTypes = [
    { type: "like", emoji: "👍", label: "Like" },
    { type: "love", emoji: "❤️", label: "Love" },
    { type: "laugh", emoji: "😂", label: "Laugh" },
    { type: "angry", emoji: "😠", label: "Angry" },
    { type: "sad", emoji: "😢", label: "Sad" },
  ]

  constructor(
    private fb: FormBuilder,
    private reactionService: ReactionService,
    private authService: AuthService,
    private notificationService: NotificationService,
  ) {
    this.commentForm = this.fb.group({
      content: ["", [Validators.required, Validators.minLength(1)]],
    })
  }

  ngOnInit(): void {
    this.loadReactions()
    this.loadComments()
  }

  loadReactions(): void {
    this.reactions = []
  }

  loadComments(): void {
    this.comments = []
  }

  toggleReaction(type: string): void {
    if (this.userReaction === type) {
      this.userReaction = null
      this.notificationService.addNotification("Reaction removed", "info")
    } else {
      this.userReaction = type
      this.notificationService.addNotification(`Reacted with ${type}`, "success")
    }
  }

  getReactionCount(type: string): number {
    return this.reactions.filter((r) => r.type === type).length
  }

  toggleComments(): void {
    this.showComments = !this.showComments
  }

  addComment(): void {
    if (this.commentForm.invalid) return

    const newComment: Comment = {
      id: Date.now().toString(),
      postId: this.postId,
      userId: "current-user",
      userEmail: "user@example.com",
      content: this.commentForm.value.content,
      createdAt: new Date(),
    }

    this.comments.unshift(newComment)
    this.commentForm.reset()
    this.notificationService.addNotification("Comment added successfully!", "success")
  }

  deleteComment(commentId: string): void {
    this.comments = this.comments.filter((c) => c.id !== commentId)
    this.notificationService.addNotification("Comment deleted", "info")
  }

  canDeleteComment(comment: Comment): boolean {
    return comment.userId === "current-user"
  }
}

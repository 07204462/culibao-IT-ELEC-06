import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { type Observable, BehaviorSubject } from "rxjs"
import { Reaction, Comment } from "../models/reaction.model"

@Injectable({
  providedIn: "root",
})
export class ReactionService {
  private API_URL = "http://localhost:3000/api"
  private reactions = new BehaviorSubject<Reaction[]>([])
  private comments = new BehaviorSubject<Comment[]>([])

  constructor(private http: HttpClient) {}

  // Reactions
  addReaction(postId: string, type: Reaction["type"]): Observable<any> {
    return this.http.post(`${this.API_URL}/reactions`, { postId, type })
  }

  getReactions(postId: string): Observable<Reaction[]> {
    return this.http.get<Reaction[]>(`${this.API_URL}/reactions/${postId}`)
  }

  removeReaction(postId: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/reactions/${postId}`)
  }

  // Comments
  addComment(postId: string, content: string): Observable<Comment> {
    return this.http.post<Comment>(`${this.API_URL}/comments`, { postId, content })
  }

  getComments(postId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.API_URL}/comments/${postId}`)
  }

  deleteComment(commentId: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/comments/${commentId}`)
  }
}

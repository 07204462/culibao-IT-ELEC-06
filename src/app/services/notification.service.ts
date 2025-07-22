import { Injectable } from "@angular/core"
import { BehaviorSubject, type Observable } from "rxjs"

export interface Notification {
  id: string
  message: string
  type: "success" | "error" | "info" | "warning"
  timestamp: Date
  read: boolean
}

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  private notifications = new BehaviorSubject<Notification[]>([])
  public notifications$ = this.notifications.asObservable()

  constructor() {
    // Load notifications from localStorage
    const saved = localStorage.getItem("notifications")
    if (saved) {
      this.notifications.next(JSON.parse(saved))
    }
  }

  addNotification(message: string, type: Notification["type"] = "info"): void {
    const notification: Notification = {
      id: Date.now().toString(),
      message,
      type,
      timestamp: new Date(),
      read: false,
    }

    const current = this.notifications.value
    const updated = [notification, ...current].slice(0, 50) // Keep only last 50
    this.notifications.next(updated)
    this.saveToStorage(updated)
  }

  markAsRead(id: string): void {
    const current = this.notifications.value
    const updated = current.map((n) => (n.id === id ? { ...n, read: true } : n))
    this.notifications.next(updated)
    this.saveToStorage(updated)
  }

  markAllAsRead(): void {
    const current = this.notifications.value
    const updated = current.map((n) => ({ ...n, read: true }))
    this.notifications.next(updated)
    this.saveToStorage(updated)
  }

  deleteNotification(id: string): void {
    const current = this.notifications.value
    const updated = current.filter((n) => n.id !== id)
    this.notifications.next(updated)
    this.saveToStorage(updated)
  }

  getUnreadCount(): Observable<number> {
    return new BehaviorSubject(this.notifications.value.filter((n) => !n.read).length).asObservable()
  }

  private saveToStorage(notifications: Notification[]): void {
    localStorage.setItem("notifications", JSON.stringify(notifications))
  }
}

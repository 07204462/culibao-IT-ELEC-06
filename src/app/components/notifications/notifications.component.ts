import { Component, type OnInit } from "@angular/core"
import type { Observable } from "rxjs"
import { map } from "rxjs/operators"
import { NotificationService, Notification } from "../../services/notification.service"

@Component({
  selector: "app-notifications",
  templateUrl: "./notifications.component.html",
  styleUrls: ["./notifications.component.css"],
})
export class NotificationsComponent implements OnInit {
  notifications$: Observable<Notification[]>
  unreadCount$: Observable<number>

  constructor(private notificationService: NotificationService) {
    this.notifications$ = this.notificationService.notifications$
    this.unreadCount$ = this.notifications$.pipe(map((notifications) => notifications.filter((n) => !n.read).length))
  }

  ngOnInit(): void {}

  markAsRead(id: string): void {
    this.notificationService.markAsRead(id)
  }

  markAllAsRead(): void {
    this.notificationService.markAllAsRead()
  }

  deleteNotification(id: string): void {
    this.notificationService.deleteNotification(id)
  }

  getNotificationIcon(type: string): string {
    switch (type) {
      case "success":
        return "check_circle"
      case "error":
        return "error"
      case "warning":
        return "warning"
      case "info":
        return "info"
      default:
        return "notifications"
    }
  }
}

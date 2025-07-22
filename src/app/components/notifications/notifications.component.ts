<button mat-icon-button [matMenuTriggerFor]="notificationMenu" class="notification-button">
  <mat-icon [matBadge]="unreadCount$ | async" [matBadgeHidden]="(unreadCount$ | async) === 0" matBadgeColor="warn">
    notifications
  </mat-icon>
</button>

<mat-menu #notificationMenu="matMenu" class="notification-menu">
  <div class="notification-header">
    <h3>Notifications</h3>
    <button mat-button (click)="markAllAsRead()" *ngIf="(unreadCount$ | async)! > 0">
      Mark all read
    </button>
  </div>
  
  <div class="notification-list" *ngIf="(notifications$ | async)?.length! > 0; else noNotifications">
    <div 
      *ngFor="let notification of notifications$ | async" 
      class="notification-item"
      [class.unread]="!notification.read"
      (click)="markAsRead(notification.id)">
      <div class="notification-content">
        <mat-icon [class]="'notification-icon ' + notification.type">
          {{ getNotificationIcon(notification.type) }}
        </mat-icon>
        <div class="notification-text">
          <p>{{ notification.message }}</p>
          <small>{{ notification.timestamp | date:'short' }}</small>
        </div>
      </div>
      <button mat-icon-button (click)="deleteNotification(notification.id); $event.stopPropagation()">
        <mat-icon>close</mat-icon>
      </button>
    </div>
  </div>
  
  <ng-template #noNotifications>
    <div class="no-notifications">
      <mat-icon>notifications_none</mat-icon>
      <p>No notifications</p>
    </div>
  </ng-template>
</mat-menu>

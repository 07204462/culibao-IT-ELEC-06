import { Component, type OnInit } from "@angular/core"
import { type FormBuilder, type FormGroup, Validators, type AbstractControl } from "@angular/forms"
import type { Observable } from "rxjs"
import type { ThemeService } from "../../services/theme.service"
import type { NotificationService } from "../../services/notification.service"
import type { AuthService } from "../../authentication/auth.service"

@Component({
  selector: "app-profile-settings",
  templateUrl: "./profile-settings.component.html",
  styleUrls: ["./profile-settings.component.css"],
})
export class ProfileSettingsComponent implements OnInit {
  profileForm: FormGroup
  passwordForm: FormGroup
  isDarkMode$: Observable<boolean>
  isLoading = false
  emailNotifications = true
  pushNotifications = false

  constructor(
    private fb: FormBuilder,
    private themeService: ThemeService,
    private notificationService: NotificationService,
    private authService: AuthService,
  ) {
    this.isDarkMode$ = this.themeService.isDarkMode$

    this.profileForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      displayName: [""],
      bio: [""],
    })

    this.passwordForm = this.fb.group(
      {
        currentPassword: ["", Validators.required],
        newPassword: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", Validators.required],
      },
      { validators: this.passwordMatchValidator },
    )
  }

  ngOnInit(): void {
    // Load user preferences from localStorage
    this.emailNotifications = localStorage.getItem("emailNotifications") !== "false"
    this.pushNotifications = localStorage.getItem("pushNotifications") === "true"
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const newPassword = control.get("newPassword")
    const confirmPassword = control.get("confirmPassword")

    if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
      return { passwordMismatch: true }
    }
    return null
  }

  updateProfile(): void {
    if (this.profileForm.invalid) return

    this.isLoading = true
    // Simulate API call
    setTimeout(() => {
      this.isLoading = false
      this.notificationService.addNotification("Profile updated successfully!", "success")
    }, 1000)
  }

  changePassword(): void {
    if (this.passwordForm.invalid) return

    this.isLoading = true
    // Simulate API call
    setTimeout(() => {
      this.isLoading = false
      this.passwordForm.reset()
      this.notificationService.addNotification("Password changed successfully!", "success")
    }, 1000)
  }

  toggleTheme(): void {
    this.themeService.toggleTheme()
  }

  toggleEmailNotifications(event: any): void {
    this.emailNotifications = event.checked
    localStorage.setItem("emailNotifications", this.emailNotifications.toString())
    this.notificationService.addNotification(
      `Email notifications ${this.emailNotifications ? "enabled" : "disabled"}`,
      "info",
    )
  }

  togglePushNotifications(event: any): void {
    this.pushNotifications = event.checked
    localStorage.setItem("pushNotifications", this.pushNotifications.toString())
    this.notificationService.addNotification(
      `Push notifications ${this.pushNotifications ? "enabled" : "disabled"}`,
      "info",
    )
  }
}

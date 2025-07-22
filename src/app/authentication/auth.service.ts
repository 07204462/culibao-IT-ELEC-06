import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Router } from "@angular/router"
import { type Observable, Subject } from "rxjs"
import { tap } from "rxjs/operators"

@Injectable({ providedIn: "root" })
export class AuthService {
  private API_URL = "http://localhost:3000/api/user"
  private token = ""
  private tokenTimer: any
  private isAuthenticated = false
  private authStatusListener = new Subject<boolean>()

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  // Sign up
  createUser(email: string, password: string): Observable<any> {
    return this.http.post(`${this.API_URL}/signup`, { email, password })
  }

  // Log in
  loginUser(email: string, password: string): Observable<{ token: string; expiresIn: number }> {
    return this.http.post<{ token: string; expiresIn: number }>(`${this.API_URL}/login`, { email, password }).pipe(
      tap((res) => {
        this.token = res.token
        if (this.token) {
          localStorage.setItem("token", this.token)
          const expirationDate = new Date(new Date().getTime() + res.expiresIn * 1000)
          localStorage.setItem("expiration", expirationDate.toISOString())
          this.isAuthenticated = true
          this.authStatusListener.next(true)
          this.setAuthTimer(res.expiresIn)
          this.router.navigate(["/"])
        }
      }),
    )
  }

  // Auto‑login on refresh
  autoAuthUser(): void {
    const token = localStorage.getItem("token")
    if (!token) return

    this.token = token
    this.isAuthenticated = true
    this.authStatusListener.next(true)

    // Set a reasonable expiration time if not stored
    this.setAuthTimer(3600) // 1 hour default
  }

  logout(): void {
    this.token = ""
    this.isAuthenticated = false
    localStorage.removeItem("token")
    clearTimeout(this.tokenTimer)
    this.authStatusListener.next(false)
    this.router.navigate(["/login"])
  }

  getToken(): string {
    return this.token
  }

  getIsAuth(): boolean {
    return this.isAuthenticated
  }

  getAuthStatusListener(): Observable<boolean> {
    return this.authStatusListener.asObservable()
  }

  private setAuthTimer(durationSec: number): void {
    this.tokenTimer = setTimeout(() => this.logout(), durationSec * 1000)
  }
}

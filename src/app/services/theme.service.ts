import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs"

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  private isDarkMode = new BehaviorSubject<boolean>(false)
  public isDarkMode$ = this.isDarkMode.asObservable()

  constructor() {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme) {
      this.setDarkMode(savedTheme === "dark")
    } else if (prefersDark) {
      this.setDarkMode(true)
    }
  }

  setDarkMode(isDark: boolean): void {
    this.isDarkMode.next(isDark)
    localStorage.setItem("theme", isDark ? "dark" : "light")

    if (isDark) {
      document.body.classList.add("dark-theme")
    } else {
      document.body.classList.remove("dark-theme")
    }
  }

  toggleTheme(): void {
    this.setDarkMode(!this.isDarkMode.value)
  }

  getCurrentTheme(): boolean {
    return this.isDarkMode.value
  }
}

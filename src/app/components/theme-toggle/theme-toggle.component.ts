import { Component } from "@angular/core"
import type { ThemeService } from "../../services/theme.service"
import type { Observable } from "rxjs"

@Component({
  selector: "app-theme-toggle",
  templateUrl: "./theme-toggle.component.html",
})
export class ThemeToggleComponent {
  isDarkMode$: Observable<boolean>

  constructor(private themeService: ThemeService) {
    this.isDarkMode$ = this.themeService.isDarkMode$
  }

  toggleTheme(): void {
    this.themeService.toggleTheme()
  }
}

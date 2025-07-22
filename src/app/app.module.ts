import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http"

import { PostCreateComponent } from "./posts/post-create/post-create.component"
import { PostListComponent } from "./posts/post-list/post-list.component"
import { HeaderComponent } from "./header/header.component"

import { MatInputModule } from "@angular/material/input"
import { MatButtonModule } from "@angular/material/button"
import { MatExpansionModule } from "@angular/material/expansion"
import { MatToolbarModule } from "@angular/material/toolbar"
import { MatIconModule } from "@angular/material/icon"
import { MatCardModule } from "@angular/material/card"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { MatPaginatorModule } from "@angular/material/paginator"
import { MatMenuModule } from "@angular/material/menu"
import { MatBadgeModule } from "@angular/material/badge"
import { MatTabsModule } from "@angular/material/tabs"
import { MatSlideToggleModule } from "@angular/material/slide-toggle"
import { MatTooltipModule } from "@angular/material/tooltip"

import { LoginComponent } from "./authentication/login/login.component"
import { SignupComponent } from "./authentication/signup/signup.component"
import { AuthInterceptor } from "./authentication/auth-interceptor"

// Components
import { NotificationsComponent } from "./components/notifications/notifications.component"
import { ProfileSettingsComponent } from "./components/profile-settings/profile-settings.component"
import { PostReactionsComponent } from "./components/post-reactions/post-reactions.component"

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    PostListComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    NotificationsComponent,
    ProfileSettingsComponent,
    PostReactionsComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,

    MatExpansionModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatMenuModule,
    MatBadgeModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatTooltipModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

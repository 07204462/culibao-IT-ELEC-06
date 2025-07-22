import { NgModule } from "@angular/core"
import { RouterModule, type Routes } from "@angular/router"
import { PostCreateComponent } from "./posts/post-create/post-create.component"
import { PostListComponent } from "./posts/post-list/post-list.component"
import { LoginComponent } from "./authentication/login/login.component"
import { SignupComponent } from "./authentication/signup/signup.component"
import { AuthGuard } from "./authentication/auth.guard"
import { ProfileSettingsComponent } from "./components/profile-settings/profile-settings.component"

const routes: Routes = [
  { path: "", component: PostListComponent },
  { path: "create", component: PostCreateComponent, canActivate: [AuthGuard] },
  { path: "edit/:postId", component: PostCreateComponent, canActivate: [AuthGuard] },
  { path: "profile", component: ProfileSettingsComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}

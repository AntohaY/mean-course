import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PostCreateComponent } from './ui/posts/post-create/post-create.compontent';
import { HeaderComponent } from './ui/header/header.component';
import { PostListComponent } from './ui/posts/post-list/post-list.component';
import { LoginComponent } from './ui/auth/login/login.component';
import { SignupComponent } from './ui/auth/signup/signup.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styles: [
    `
      main {
        width: 80%;
        margin: 1rem auto;
      }
    `,
  ],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
}
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
        children: [
          {
            path: '',
            component: PostListComponent
          },
          {
            path: 'create',
            component: PostCreateComponent,
          },
          {
            path: 'edit/:postId',
            component: PostCreateComponent,
          },
        ]
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'signup',
        component: SignupComponent
      }
    ]),
    PostCreateComponent,
    HeaderComponent,
    PostListComponent
  ],
  declarations: [HomeComponent],
})
export class HomeComponentModule {}

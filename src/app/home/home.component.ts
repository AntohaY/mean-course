import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PostCreateComponent } from './ui/posts/post-create/post-create.compontent';
import { HeaderComponent } from './ui/header/header.component';
import { PostListComponent } from './ui/posts/post-list/post-list.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styles: [
    `
      main {
        width: 80%;
        margin: auto;
        margin-top: 1rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  constructor() {}
  
}
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
      },
    ]),
    PostCreateComponent,
    HeaderComponent,
    PostListComponent
  ],
  declarations: [HomeComponent],
})
export class HomeComponentModule {}
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PostCreateComponent } from './ui/post-create/post-create.compontent';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styles: [
    `
      ion-infinite-scroll-content {
        margin-top: 20px;
      }
      ion-buttons {
        margin: auto 0;
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
    PostCreateComponent
  ],
  declarations: [HomeComponent],
})
export class HomeComponentModule {}

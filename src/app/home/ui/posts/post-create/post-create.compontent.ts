import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { AsyncPipe, NgIf } from '@angular/common';
import { PostsService } from 'src/app/shared/data-access/posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from 'src/app/shared/interfaces/post';

@Component({
    selector: 'app-post-create',
    templateUrl: 'post-create.component.html',
    styleUrls: ['post-create.component.scss'],
    standalone: true,
    imports: [NgIf, FormsModule, MatButtonModule, MatCardModule, MatInputModule, MatFormFieldModule, MatProgressSpinnerModule, AsyncPipe]
})

export class PostCreateComponent implements OnInit {
    enteredTitle = '';
    enteredContent = ''
    post$!: Post;
    isLoading: boolean = false;
    private mode = 'create';

    constructor(private postsService: PostsService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('postId')) {
                this.mode = 'edit';
                this.isLoading = true;
                this.post$ = this.postsService.getPost(paramMap.get('postId')!) as Post;
                this.isLoading = false;
            } else {
                this.mode = 'create';
                this.post$ = {_id: '', title: '', content: ''};
            }
        });
     }

    onSavePost(form: NgForm) {
        if (form.invalid) {
            return;
        }

        if(this.mode === 'create') {
            this.postsService.addPost(form.value.title, form.value.content);
            form.resetForm();
        } else {
            this.postsService.updatePost(this.post$._id, form.value.title, form.value.content)
        }
        
    }
}
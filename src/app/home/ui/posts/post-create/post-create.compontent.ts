import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { PostsService } from 'src/app/shared/data-access/posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from 'src/app/shared/interfaces/post';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-post-create',
    templateUrl: 'post-create.component.html',
    styleUrls: ['post-create.component.scss'],
    standalone: true,
    imports: [NgIf, FormsModule, MatButtonModule, MatCardModule, MatInputModule, MatFormFieldModule]
})

export class PostCreateComponent implements OnInit {
    enteredTitle = '';
    enteredContent = ''
    post$!: Post;
    private mode = 'create';
    private postId!: string | null;

    constructor(private postsService: PostsService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('postId')) {
                this.mode = 'edit';
                this.postId = paramMap.get('postId');
                this.post$ = this.postsService.getPost(this.postId!) as Post;
            } else {
                this.mode = 'create';
                this.postId = null;
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
            this.postsService.updatePost(this.postId!, form.value.title, form.value.content)
        }
        
    }
}
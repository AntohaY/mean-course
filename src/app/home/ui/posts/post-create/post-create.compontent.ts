import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { PostsService } from 'src/app/shared/data-access/posts.service';

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

    constructor(private postsService: PostsService) { }

    ngOnInit() { }

    onAddPost(form: NgForm) {
        if (form.invalid) {
            return;
        }
        this.postsService.addPost(form.value.title, form.value.content);
        form.resetForm();
    }
}
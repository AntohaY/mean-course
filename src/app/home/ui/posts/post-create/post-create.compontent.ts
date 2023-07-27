import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Post } from 'src/app/shared/interfaces/post';

@Component({
    selector: 'app-post-create',
    templateUrl: 'post-create.component.html',
    styleUrls: ['post-create.component.scss'],
    standalone: true,
    imports: [FormsModule, MatButtonModule, MatCardModule, MatInputModule, MatFormFieldModule]
})

export class PostCreateComponent implements OnInit {
    enteredTitle = '';
    enteredContent = ''
    @Output() postCreated = new EventEmitter<Post>();
    constructor() { }

    ngOnInit() { }

    onAddPost() {
        const post = {
            title: this.enteredTitle,
            content: this.enteredContent
        }
        this.postCreated.emit(post);
    }
}
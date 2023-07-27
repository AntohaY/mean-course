import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-post-create',
    templateUrl: 'post-create.component.html',
    styleUrls: ['post-create.component.scss'],
    standalone: true,
    imports: [FormsModule, MatButtonModule, MatCardModule, MatInputModule, MatFormFieldModule]
})

export class PostCreateComponent implements OnInit {
    enteredValue = '';
    newPost = '';

    constructor() { }

    ngOnInit() { }

    onAddPost() {
        this.newPost = this.enteredValue;
    }
}
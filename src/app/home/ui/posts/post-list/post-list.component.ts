import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { Post } from 'src/app/shared/interfaces/post';

@Component({
    selector: 'app-post-list',
    templateUrl: 'post-list.component.html',
    styleUrls: ['post-list.component.scss'],
    standalone: true,
    imports: [MatExpansionModule, CommonModule]
})

export class PostListComponent implements OnInit {

    @Input() posts: Post[] = [];
    constructor() { }

    ngOnInit() { }
}
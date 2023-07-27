import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { PostsService } from 'src/app/home/data-access/posts.service';
import { MatButtonModule } from '@angular/material/button';
@Component({
    selector: 'app-post-list',
    templateUrl: 'post-list.component.html',
    styleUrls: ['post-list.component.scss'],
    standalone: true,
    imports: [MatExpansionModule, CommonModule, MatButtonModule]
})

export class PostListComponent implements OnInit {

    constructor(private postsService: PostsService) { }

    posts$ = this.postsService.getPostUpdateListener();

    ngOnInit() {}
}
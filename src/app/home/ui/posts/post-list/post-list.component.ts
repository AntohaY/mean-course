import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { PostsService } from 'src/app/shared/data-access/posts.service';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { RouterModule } from '@angular/router';
@Component({
    selector: 'app-post-list',
    templateUrl: 'post-list.component.html',
    styleUrls: ['post-list.component.scss'],
    standalone: true,
    imports: [MatExpansionModule, CommonModule, MatButtonModule, RouterModule, MatProgressSpinnerModule]
})

export class PostListComponent implements OnInit {

    constructor(private postsService: PostsService) { }

    posts$ = this.postsService.getPosts();

    ngOnInit() {}

    onDelete(postId: string) {
        this.postsService.deletePost(postId);
    }
}
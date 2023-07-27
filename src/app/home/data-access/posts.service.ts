import { Injectable } from '@angular/core';
import { Post } from 'src/app/shared/interfaces/post';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PostsService {
    private postsUpdated$ = new BehaviorSubject<Post[]>([]);

    getPosts() {
        return [...this.postsUpdated$.value];
    }

    getPostUpdateListener() {
        return this.postsUpdated$.asObservable();
    }
    
    addPost(title: string, content: string) {
        const post: Post = { title, content };
        this.postsUpdated$.next([...this.postsUpdated$.value, post]);
    }
}
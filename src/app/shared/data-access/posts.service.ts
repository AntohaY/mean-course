import { Injectable } from '@angular/core';
import { Post } from 'src/app/shared/interfaces/post';
import { BehaviorSubject, EMPTY, Observable, catchError, shareReplay, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class PostsService {
    constructor(private http: HttpClient) {}
    private posts$ = new BehaviorSubject<Post[]>([]);

    fetchPostsFromServer() {
        this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts')
            .subscribe((postData) => this.posts$.next([...this.posts$.value, ...postData.posts]));
    }
    
    addPost(title: string, content: string) {
        const newPost: Post = { 
            id: Date.now().toString(),
            title, 
            content
        };
        this.posts$.next([...this.posts$.value, newPost]);
        this.http.post<{message: string}>('http://localhost:3000/api/posts', newPost)
            .subscribe((responseData) => {
                console.log(responseData)
            })
    }

    private sharedPosts$: Observable<Post[]> = this.posts$.pipe(
        // Trigger a save whenever this stream emits new data
        tap((posts) => {
            console.log(posts)
        }),
        // Share this stream with multiple subscribers, instead of creating a new one for each
        shareReplay(1)
    );

    getPosts() {
        return this.sharedPosts$;
    } 
}
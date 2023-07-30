import { Injectable } from '@angular/core';
import { Post } from 'src/app/shared/interfaces/post';
import { BehaviorSubject, EMPTY, Observable, catchError, map, shareReplay, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class PostsService {
    constructor(private http: HttpClient) {}
    private posts$ = new BehaviorSubject<Post[]>([]);

    fetchPostsFromServer() {
        this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts')
            .pipe(map((postData) => {
                return postData.posts.map(post => {
                    return {
                        title: post.title,
                        content: post.content,
                        _id: post._id
                    }
                })
            }))
            .subscribe((postData) => this.posts$.next([...this.posts$.value, ...postData]));
    }
    
    addPost(title: string, content: string) {
        const newPost: Post = { 
            _id: Date.now().toString(),
            title, 
            content
        };    
        this.http.post<{message: string, postId: string}>('http://localhost:3000/api/posts', newPost)
            .subscribe((responseData) => {
                const postId = responseData.postId;
                newPost._id = postId;
                this.posts$.next([...this.posts$.value, newPost]);
            })
    }

    deletePost(postId: string) {
        this.http.delete('http://localhost:3000/api/posts/' + postId)
            .subscribe(() => {
                const modifiedPosts = this.posts$.value.filter(
                    (post) => post._id !== postId
                );
                this.posts$.next(modifiedPosts);
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
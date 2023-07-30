import { Injectable } from '@angular/core';
import { Post } from 'src/app/shared/interfaces/post';
import { BehaviorSubject, EMPTY, Observable, catchError, map, shareReplay, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class PostsService {
    constructor(private http: HttpClient, private router: Router) {}
    private posts$ = new BehaviorSubject<Post[]>([]);

    fetchPostsFromServer() {
        this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts')
            .pipe(map((postData) => {
                return postData.posts.map(post => {
                    return {
                        _id: post._id,
                        title: post.title,
                        content: post.content,
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
                this.router.navigate(['/']);
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

    updatePost(_id: string, title: string, content: string) {
        const updatedPost: Post = {
            _id,
            title,
            content
        }
        this.http
            .put('http://localhost:3000/api/posts/' + _id, updatedPost)
            .subscribe(response => {
                const modifiedPosts = this.posts$.value.map((post) =>
                post._id === _id
                    ? { ...post, title: title, content: content }
                    : post
                );
                this.posts$.next(modifiedPosts)
                this.router.navigate(['/']);
            })
    }

    getPost(id: string) {
        return {...this.posts$.value.find(p => p._id === id)};
        // return this.http.get<Post>('http://localhost:3000/api/posts/' + id);
    }

    private sharedPosts$: Observable<Post[]> = this.posts$.pipe(
        // Share this stream with multiple subscribers, instead of creating a new one for each
        shareReplay(1)
    );

    getPosts() {
        return this.sharedPosts$;
    } 
}
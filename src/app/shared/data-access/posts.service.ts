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
                        imagePath: post.imagePath,
                    }
                })
            }))
            .subscribe((postData) => this.posts$.next([...this.posts$.value, ...postData]));
    }
    
    addPost(title: string, content: string, image: File) {  
        const postData = new FormData();
        postData.append('title', title);
        postData.append('content', content);
        postData.append('image', image, title);
        this.http.post<{message: string, post: Post}>('http://localhost:3000/api/posts', postData)
            .subscribe((responseData) => {
                const newPost: Post = { 
                    _id: responseData.post._id,
                    title, 
                    content,
                    imagePath: responseData.post.imagePath
                };  
                this.posts$.next([...this.posts$.value, newPost]);
            })
        this.router.navigate(['/']);

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

    updatePost(_id: string, title: string, content: string, image: File | string) {
        let postData: Post | FormData;
        if (typeof(image) === 'object') {
            postData = new FormData();
            postData.append('id', _id)
            postData.append('title', title);
            postData.append('content', content);
            postData.append('image', image, title);
        } else {
            postData = {_id, title, content, imagePath: image.toString()}
        }
        this.http
            .put('http://localhost:3000/api/posts/' + _id, postData)
            .subscribe((response: any) => {
                const modifiedPosts = this.posts$.value.map((post) =>
                post._id === _id
                    ? { ...post, title: title, content: content, imagePath: response.imagePath }
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
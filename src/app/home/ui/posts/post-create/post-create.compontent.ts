import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { AsyncPipe, NgIf } from '@angular/common';
import { PostsService } from 'src/app/shared/data-access/posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from 'src/app/shared/interfaces/post';
import { mimeType } from './mime-type.validator';

@Component({
    selector: 'app-post-create',
    templateUrl: 'post-create.component.html',
    styleUrls: ['post-create.component.scss'],
    standalone: true,
    imports: [NgIf, ReactiveFormsModule, MatButtonModule, MatCardModule, MatInputModule, MatFormFieldModule, MatProgressSpinnerModule, AsyncPipe]
})

export class PostCreateComponent implements OnInit {
	enteredTitle = "";
	enteredContent = "";
	post!: Post;
	isLoading = false;
	form!: FormGroup;
	imagePreview!: string | ArrayBuffer | null;
	private mode = "create";
	private postId!: string;
  
	constructor(
	  public postsService: PostsService,
	  public route: ActivatedRoute
	) {}
  
	ngOnInit() {
	  this.form = new FormGroup({
		title: new FormControl(null, {
		  validators: [Validators.required, Validators.minLength(3)]
		}),
		content: new FormControl(null, { validators: [Validators.required] }),
		image: new FormControl(null, {
		  validators: [Validators.required],
		  asyncValidators: [mimeType]
		})
	  });
	  this.route.paramMap.subscribe((paramMap: ParamMap) => {
		if (paramMap.has("postId")) {
		  this.mode = "edit";
		  this.postId = paramMap.get("postId")!;
		  this.isLoading = true;
		  this.postsService.getPost(this.postId).subscribe(postData => {
			this.isLoading = false;
			this.post = {
			  _id: postData._id,
			  title: postData.title,
			  content: postData.content,
			  imagePath: postData.imagePath
			};
			this.form.setValue({
			  title: this.post.title,
			  content: this.post.content,
			  image: this.post.imagePath
			});
		  });
		} else {
		  this.mode = "create";
		  this.postId = null!;
		}
	  });
	}
  
	onFileSelected(event: Event): void {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files.length) {
		  const file = input.files[0];
		  this.previewImage(file);
			this.form.patchValue({image: file});
		}
	  }
	
	  previewImage(file: File): void {
		const reader = new FileReader();
		reader.onload = (event: ProgressEvent) => {
		  this.imagePreview = (event.target as FileReader).result;
		};
		reader.readAsDataURL(file);
	  }
  
	onSavePost() {
	  if (this.form.invalid) {
		return;
	  }
	  this.isLoading = true;
	  if (this.mode === "create") {
		this.postsService.addPost(
		  this.form.value.title,
		  this.form.value.content,
		  this.form.value.image
		);
	  } else {
		this.postsService.updatePost(
		  this.postId,
		  this.form.value.title,
		  this.form.value.content,
		  this.form.value.image
		);
	  }
	  this.form.reset();
	}
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostsService } from '../posts.service';
import { Post } from '../post.model';
import { Router } from '@angular/router';
import { mimetype } from './mime-type.validator';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  post: Post = { id: null, title: '', content: '', imagePath: '' };
  Loading = false;
  private postId: string | null = null;
  mode: 'create' | 'edit' = 'create';
  imagePreview: string | null = null;
  form: FormGroup;

  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute,
    private router: Router
  ) {
    this.form = new FormGroup({
      title: new FormControl('', { validators: [Validators.required, Validators.minLength(3)] }),
      content: new FormControl('', { validators: [Validators.required] }),
      image: new FormControl('', { validators: [Validators.required] })
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId')!;
        this.Loading = true;
        this.postsService.getPost(this.postId).subscribe(postData => {
          this.Loading = false;
          this.post = {
            id: postData.id,
            title: postData.title,
            content: postData.content,
            imagePath: postData.imagePath 
          };
          this.form.setValue({
            title: this.post.title,
            content: this.post.content,
            image: this.post.imagePath
          });
          this.imagePreview = this.post.imagePath;
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    this.form.patchValue({ image: file });
    this.form.get('image')?.updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSavePost() {
    if (this.form.invalid) return;

    this.Loading = true;
    if (this.mode === 'create') {
      this.postsService.addPost(
        this.form.value.title,
        this.form.value.content,
        this.form.value.image
      );
    } else {
      this.postsService.updatePost(
        this.postId!,
        this.form.value.title,
        this.form.value.content,
        typeof this.form.value.image === 'string' ? this.form.value.image : this.form.value.image
      );
    }
    this.form.reset();
  }
}
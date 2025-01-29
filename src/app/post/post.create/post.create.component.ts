import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatInput, MatInputModule } from '@angular/material/input';

@Component({
  standalone: true,
  imports: [FormsModule, MatInputModule, MatButtonModule], 
  selector: 'post-create',
  templateUrl: './post.create.component.html',
  styleUrls: ['./post.create.component.css']
})
export class PostCreateComponent {
  enteredValue = 'Test'
  newPost = ''
    onAddPost(){
      this.newPost = this.enteredValue

  }
}

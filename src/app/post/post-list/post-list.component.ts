import { Component } from "@angular/core";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent{

    posts = [
      {title: '1st Title', content: '1st Content'},
      {title: '2nd Title', content: '2nd Content'},
      {title: '3rd Title', content: '3rd Content'}
    ]
}
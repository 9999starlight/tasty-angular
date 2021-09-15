import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss']
})
export class PostCommentComponent implements OnInit {
  @Input() recipeId: string = '';
  commentText: string = '';
  postCommentMessage: string = '';
  messageStatus: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  updateMessage(message: string) {
    this.postCommentMessage = message
  }

  postUserComment() {
    
  }

  commentAdded() {

  }

}

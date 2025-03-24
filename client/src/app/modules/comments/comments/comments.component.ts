import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Comment } from 'src/app/types/Comment';
import { PostCommentComponent } from '../post-comment/post-comment.component';
import { CommentComponent } from '../comment/comment.component';
import { NgIf, NgFor } from '@angular/common';
@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.scss'],
    standalone: true,
    imports: [
        NgIf,
        NgFor,
        CommentComponent,
        PostCommentComponent,
    ],
})
export class CommentsComponent implements OnInit {
  @Input() comments: Comment[] | [] = [];
  @Input() recipeId: string = '';
  @Output() updateRec = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}

  updateComments() {
    this.updateRec.emit(this.recipeId);
  }
}

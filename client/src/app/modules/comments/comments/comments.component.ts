import { Component, OnInit, Input, output } from '@angular/core';
import { Comment } from 'src/app/types/Comment';
import { PostCommentComponent } from '../post-comment/post-comment.component';
import { CommentComponent } from '../comment/comment.component';

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.scss'],
    standalone: true,
    imports: [
    CommentComponent,
    PostCommentComponent
],
})
export class CommentsComponent implements OnInit {
  @Input() comments: Comment[] | [] = [];
  @Input() recipeId: string = '';
  readonly updateRec = output<string>();
  constructor() {}

  ngOnInit(): void {}

  updateComments() {
    this.updateRec.emit(this.recipeId);
  }
}

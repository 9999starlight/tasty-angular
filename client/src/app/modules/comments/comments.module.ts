import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from './comments/comments.component';
import { CommentComponent } from './comment/comment.component';
import { PostCommentComponent } from './post-comment/post-comment.component';



@NgModule({
  declarations: [
    CommentsComponent,
    CommentComponent,
    PostCommentComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CommentsModule { }

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from './comments/comments.component';
import { CommentComponent } from './comment/comment.component';
import { PostCommentComponent } from './post-comment/post-comment.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    CommentsComponent,
    CommentComponent,
    PostCommentComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ]
})
export class CommentsModule { }

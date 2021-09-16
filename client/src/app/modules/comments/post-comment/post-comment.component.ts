import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { CommentService } from '../comment.service';
import { BehaviorSubject } from 'rxjs';
import { CurrentUser, UpdatedUser } from 'src/app/types/userTypes';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss']
})
export class PostCommentComponent implements OnInit {
  @Input() recipeId: string = '';
  @Output() commentAdded = new EventEmitter()
  commentBody: string = '';
  postCommentMessage: string = '';
  messageStatus: boolean = false;
  userId: string | undefined
  /* authService.isLogged: BehaviorSubject<boolean | null>;
  currentUser$: BehaviorSubject<CurrentUser | UpdatedUser | null>; */

  constructor(private authService: AuthService, private commentService: CommentService) {
    /* this.authService.isLogged = this.authService.authService.isLogged.getValue();
    this.currentUser$ = this.authService.currentUser$; */
    this.userId = this.authService.user?.userId
  }

  ngOnInit(): void {
  }

  updateMessage(message: string) {
    this.postCommentMessage = message
  }

  updateMessageStatus(status: boolean) {
    this.messageStatus = status;
  }

  postUserComment(postCommentForm: NgForm) {
    if (!this.authService.isLogged) {
      this.messageStatus = false
      this.updateMessage('Login or Sign Up to post your comment!')
      return;
    }
    this.commentService.postComment(postCommentForm.value).subscribe((res) => {
      if (res) {
        console.log(res)
        this.updateMessageStatus(true);
        this.updateMessage(res);
        this.commentAdded.emit()
        this.commentBody = '';
      }
    }, (error: any) => {
      this.updateMessageStatus(false);
      this.updateMessage(`Error: ${error.statusText}`);
      console.log(error.statusText);
    });

  }

}

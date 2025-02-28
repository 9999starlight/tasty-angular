import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { CurrentUser, UpdatedUser } from 'src/app/types/userTypes';
import { CommentService } from '../comment.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss'],
})
export class PostCommentComponent implements OnInit, OnDestroy {
  @Input() recipeId: string = '';
  @Output() commentAdded = new EventEmitter();
  commentBody: string = '';
  postCommentMessage: string = '';
  messageStatus: boolean = false;
  //userId: string | undefined;
  postSubscription?: Subscription;
  currentUser$: BehaviorSubject<CurrentUser | UpdatedUser | null>;
  isLogged$: BehaviorSubject<boolean>;

  constructor(
    private authService: AuthService,
    private commentService: CommentService
  ) {
    this.currentUser$ = this.authService.currentUser$;
    this.isLogged$ = this.authService.isLogged$;
  }

  ngOnInit(): void {}

  updateMessage(message: string) {
    this.postCommentMessage = message;
  }

  updateMessageStatus(status: boolean) {
    this.messageStatus = status;
  }

  postUserComment(postCommentForm: NgForm) {
    if (!this.authService.isLogged) {
      this.messageStatus = false;
      this.updateMessage('Login or Sign Up to post your comment!');
      return;
    }
    this.postSubscription = this.commentService.postComment(postCommentForm.value).subscribe(
      (res) => {
        if (res) {
          console.log(res);
          this.updateMessageStatus(true);
          this.updateMessage(res);
          this.commentAdded.emit();
          this.commentBody = '';
        }
      },
      (err: any) => {
        this.updateMessageStatus(false);
        this.updateMessage(`Error: ${err.error.error}`);
        console.log(err.statusText);
      }
    );
  }

  ngOnDestroy() {
    this.postSubscription?.unsubscribe();
  }
}

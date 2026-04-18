import { Component, inject, Input, OnInit } from '@angular/core';
import { Icons } from '../../../../shared/ui/icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CurrentUser, UpdatedUser } from '../../../user/models/userTypes';
import { InfoMessageComponent } from '../../../../shared/components/info-message/info-message.component';
import { AsyncPipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommentForm } from '../../models/comment.model';
import { RecipesFacade } from '../../facade/recipes.facade';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, Observable } from 'rxjs';
import { emptyInfoMessage, InfoMessage, mapTextToInfoMessage, mergeInfoMessages } from '../../../../shared/utils/info-message.utils';

@Component({
  selector: 'app-post-comment',
  imports: [FontAwesomeModule, InfoMessageComponent, AsyncPipe, ReactiveFormsModule,],
  templateUrl: './post-comment.component.html',
  styleUrl: './post-comment.component.scss',
})
export class PostCommentComponent implements OnInit {
  private recipesFacade = inject(RecipesFacade);
  @Input({ required: true }) recipeId!: string;
  @Input({ required: true }) user!: CurrentUser | UpdatedUser;
  private localInfoMessage$ = new BehaviorSubject<InfoMessage>(emptyInfoMessage);
  infoMessage$: Observable<InfoMessage>;
  readonly isLoading = toSignal(this.recipesFacade.loading$, { initialValue: false });
  icons = Icons;
  postCommentForm = new FormGroup<CommentForm>({
    commentedRecipeId: new FormControl<string>('', {
      nonNullable: true,
      validators: [ Validators.required ],
    }),
    author: new FormControl<string>('', {
      nonNullable: true,
      validators: [ Validators.required ],
    }),
    commentBody: new FormControl<string>('', {
      nonNullable: true,
      validators: [ Validators.required, Validators.minLength(4), Validators.maxLength(300) ],
    }),
  });

  constructor() {
    this.infoMessage$ = this.buildInfoMessageStream();
  }

  ngOnInit(): void {
    this.postCommentForm.patchValue(
      { commentedRecipeId: this.recipeId, author: this.user.userId },
      { emitEvent: false }
    );
  }

  private buildInfoMessageStream(): Observable<InfoMessage> {
      const recipeError$ = mapTextToInfoMessage(this.recipesFacade.error$, false);
      const recipeSuccess$ = mapTextToInfoMessage(this.recipesFacade.successMessage$, true);
      return mergeInfoMessages(
        this.localInfoMessage$,
        recipeError$,
        recipeSuccess$
      );
    }

  setInfoMessage(payload: { message: string, status: boolean }) {
    this.localInfoMessage$.next(payload);
  }

  onClear() {
    this.setInfoMessage({ message: '', status: false });
    this.recipesFacade.clearError$();
    this.recipesFacade.clearSuccessMessage$();
  }

  postUserComment() {
    if (this.postCommentForm.invalid || this.isLoading()) {
      return;
    }
    const postCommentData = this.postCommentForm.getRawValue();
    this.recipesFacade.postComment$(postCommentData);
  }
}

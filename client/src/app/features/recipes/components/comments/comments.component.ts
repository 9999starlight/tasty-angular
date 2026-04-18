import { Component, Input } from '@angular/core';
import { CommentComponent } from '../comment/comment.component';
import { PostCommentComponent } from '../post-comment/post-comment.component';
import { RecipeComment } from '../../models/comment.model';
import { CurrentUser, UpdatedUser } from '../../../user/models/userTypes';

@Component({
  selector: 'app-comments',
  imports: [CommentComponent, PostCommentComponent],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
})
export class CommentsComponent {
  @Input() comments!: RecipeComment[];
  @Input() recipeId: string = '';
  @Input() user: CurrentUser | UpdatedUser | null = null;
}

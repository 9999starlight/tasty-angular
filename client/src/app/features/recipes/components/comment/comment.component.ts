import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RecipeComment } from '../../models/comment.model';

@Component({
  selector: 'app-comment',
  imports: [DatePipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  @Input({ required: true }) singleComment!: RecipeComment;
}

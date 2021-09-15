import { Component, OnInit, Input } from '@angular/core';
import { Comment } from 'src/app/types/Comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @Input() comments: Comment[] | [] = [];
  @Input() recipeId: string = '';
  constructor() { }

  ngOnInit(): void {
  }

  updateComments(){}

}

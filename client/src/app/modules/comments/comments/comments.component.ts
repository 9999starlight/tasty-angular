import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Comment } from 'src/app/types/Comment';
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @Input() comments: Comment[] | [] = [];
  @Input() recipeId: string = '';
  @Output() updateRec = new EventEmitter<string>()
  constructor() { }

  ngOnInit(): void {
  }

  updateComments() {
    this.updateRec.emit(this.recipeId);
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { Comment } from 'src/app/types/Comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() singleComment: Comment | any;
  constructor() { }

  ngOnInit(): void {
  }

}

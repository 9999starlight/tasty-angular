import { Component, OnInit, Input } from '@angular/core';
import { Comment } from 'src/app/types/Comment';
import { NgIf, DatePipe } from '@angular/common';

@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.scss'],
    standalone: true,
    imports: [NgIf, DatePipe]
})
export class CommentComponent implements OnInit {
  @Input() singleComment: Comment | any;
  constructor() { }

  ngOnInit(): void {
  }

}

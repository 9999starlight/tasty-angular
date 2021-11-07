import { Component, OnDestroy, OnInit } from '@angular/core';
import { Comment } from 'src/app/types/Comment';
import { SortingService } from '../../shared/sharedServices/sorting.service';
import { AdminService } from '../admin.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit, OnDestroy {
  comments: Comment[] = [];
  commentsOptions = ['Author', 'Comment ID', 'Recipe ID'];
  selectedOption = 'author';
  searchValue = '';
  filteredComments: Comment[] = [];
  fetchSubscription?: Subscription;
  deleteSubscription?: Subscription;

  constructor(
    public sortingService: SortingService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.fetchComments();
  }

  fetchComments() {
    this.fetchSubscription = this.adminService.getComments().subscribe(
      (res) => {
        if (res) {
          this.comments = [...res];
          this.filteredComments = [...this.comments];
        }
      },
      (error) => {
        console.log(error.statusText);
      }
    );
  }

  sortByAuthorAscending() {
    this.filteredComments = this.comments.sort((a: Comment, b: Comment) =>
      a.author.username
        .toLowerCase()
        .localeCompare(b.author.username.toLowerCase())
    );
  }

  sortByAuthorDescending() {
    this.filteredComments = this.comments.sort((a, b) =>
      b.author.username
        .toLowerCase()
        .localeCompare(a.author.username.toLowerCase())
    );
  }

  deleteComment(id: string) {
    if (window.confirm('Remove this comment?')) {
      this.deleteSubscription = this.adminService.deleteComment(id).subscribe(
        (res) => {
          if (res) {
            console.log(res);
            this.comments = [];
            this.fetchComments();
          }
        },
        (error) => console.log(error.statusText)
      );
    }
  }

  onChangeSelect(e: any) {
    this.selectedOption = e.target.value;
  }

  filterComments() {
    if (!this.searchValue) {
      this.filteredComments = [...this.filteredComments];
    }
    // console.log(this.selectedOption, this.searchValue);
    this.filteredComments = this.comments.filter((comment) => {
      if (this.selectedOption === 'comment id') {
        return comment._id
          .toLowerCase()
          .includes(this.searchValue.toLowerCase());
      } else if (this.selectedOption === 'recipe id') {
        return comment.commentedRecipeId
          .toLowerCase()
          .includes(this.searchValue.toLowerCase());
      } else {
        return comment.author.username
          .toLowerCase()
          .includes(this.searchValue.toLowerCase());
      }
    });
  }

  ngOnDestroy() {
    this.fetchSubscription?.unsubscribe();
    this.deleteSubscription?.unsubscribe();
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Comment } from 'src/app/types/Comment';
import { SortingService } from '../../shared/sharedServices/sorting.service';
import { AdminService } from '../admin.service';
import { PaginationService } from '../../shared/sharedServices/pagination.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, OnDestroy {
  comments: Comment[] = [];
  commentsOptions = ['Author', 'Comment ID', 'Recipe ID'];
  selectedOption = 'author';
  searchValue = '';
  filteredCom: any = [];
  fetchSubscription: Subscription | undefined;
  deleteSubscription: Subscription | undefined;

  constructor(public sortingService: SortingService, private adminService: AdminService, public pgOptions: PaginationService) { }

  ngOnInit(): void {
    this.fetchComments();
  }

  fetchComments() {
    this.fetchSubscription = this.adminService.getComments().subscribe((res) => {
      if (res) {
        this.comments = [...res];
        this.filteredCom = [...this.comments]
        //this.setFilteredArray();
      }
    }, error => {
      console.log(error.statusText)
    })
  }

  sortByAuthorAscending() {
    this.filteredCom = this.comments.sort((a: Comment, b: Comment) =>
      a.author.username
        .toLowerCase()
        .localeCompare(b.author.username.toLowerCase())
    )
  }

  sortByAuthorDescending() {
    this.filteredCom = this.comments.sort((a, b) =>
      b.author.username
        .toLowerCase()
        .localeCompare(a.author.username.toLowerCase())
    )
  }

  deleteComment(id: string) {
    if (window.confirm('Remove this comment?')) {
      this.deleteSubscription = this.adminService.deleteComment(id).subscribe(res => {
        if (res) {
          console.log(res)
          this.comments = [];
          this.fetchComments();
        }
      }, error => console.log(error.statusText)
      )
    }
  }

  // pagination - page settings
  /* resultsPerPage() {
     if (this.comments.length < 10) {
       return this.comments.length
     } else {
       return 4
     }
   } */


  filteredComments(value: any) {

    if (!value.target.value) {
      /* return this.comments.slice(
        this.firstResultIndex,
        this.lastResultIndex
      ) */
      this.filteredCom = [...this.comments]
    }
    this.filteredCom = this.comments.filter((comment) => {
      if (this.selectedOption === 'comment id') {
        return comment._id
          .toLowerCase()
          .includes(value.target.value.toLowerCase())
      } else if (this.selectedOption === 'recipe id') {
        return comment.commentedRecipeId
          .toLowerCase()
          .includes(value.target.value.toLowerCase())
      } else {
        return comment.author.username
          .toLowerCase()
          .includes(value.target.value.toLowerCase())
      }
    })
  }

  /* setFilteredArray() {
    const resPerPage = this.resultsPerPage()
    this.filteredCom = this.comments.slice(
      this.pgOptions.firstResultIndex(resPerPage),
      this.pgOptions.lastResultIndex(resPerPage)
    )
    console.log(this.filteredCom, this.pgOptions.firstResultIndex(resPerPage),
    this.pgOptions.lastResultIndex(resPerPage))
  } */

  /* filteredComments() {
    if (!this.searchValue) {
      this.setFilteredArray()
      this.filteredCom = this.comments.slice(
        this.pgOptions.firstResultIndex(this.resultsPerPage()),
        this.pgOptions.lastResultIndex(this.resultsPerPage())
      )
      console.log(this.filteredCom)
    } else {
      this.filteredCom = this.comments.filter((comment) => {
        if (this.selectedOption === 'Comment ID') {
          return comment._id
            .toLowerCase()
            .includes(this.searchValue.toLowerCase())
        } else if (this.selectedOption === 'Recipe ID') {
          return comment.commentedRecipeId
            .toLowerCase()
            .includes(this.searchValue.toLowerCase())
        } else {
          return comment.author.username
            .toLowerCase()
            .includes(this.searchValue.toLowerCase())
        }
      })
    }
    
  } */

  ngOnDestroy() {
    this.fetchSubscription?.unsubscribe();
    this.deleteSubscription?.unsubscribe();
  }

}

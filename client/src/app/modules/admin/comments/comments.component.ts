import { Component, OnInit } from '@angular/core';
import { Comment } from 'src/app/types/Comment';
import { SortingService } from '../../shared/sharedServices/sorting.service';
import { AdminService } from '../admin.service';
import { PaginationService } from '../../shared/sharedServices/pagination.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  comments: Comment[] = [];
  commentsOptions = ['Author', 'Comment ID', 'Recipe ID'];
  selectedOption = 'author';
  searchValue = '';
  filteredCom: any = []

  constructor(public sortingService: SortingService, private adminService: AdminService, public pgOptions: PaginationService) { }

  ngOnInit(): void {
    this.fetchComments();
  }

  fetchComments() {
    this.adminService.getComments().subscribe((res) => {
      if (res) {
        this.comments = [...res];
        this.setFilteredArray();
      }
    }, error => {
      console.log(error.statusText)
    })
  }

  sortByAuthorAscending() {
    const sortByUser = this.comments.sort((a: Comment, b: Comment) =>
      a.author.username
        .toLowerCase()
        .localeCompare(b.author.username.toLowerCase())
    )
    return sortByUser
  }

  sortByAuthorDescending() {
    const sortByUser = this.comments.sort((a, b) =>
      b.author.username
        .toLowerCase()
        .localeCompare(a.author.username.toLowerCase())
    )
    return sortByUser
  }

  deleteComment(id: string) {
    if (window.confirm('Remove this comment?')) {
      this.adminService.deleteComment(id).subscribe(res => {
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
 resultsPerPage() {
    if (this.comments.length < 10) {
      return this.comments.length
    } else {
      return 4
    }
  }

  /* filteredComments() {
    if (!this.searchValue) {
      return this.comments.slice(
        this.firstResultIndex,
        this.lastResultIndex
      )
    }
    return this.comments.filter((comment) => {
      if (this.selectedOption === 'comment id') {
        return comment._id
          .toLowerCase()
          .includes(this.searchValue.toLowerCase())
      } else if (this.selectedOption === 'recipe id') {
        return comment.commentedRecipeId
          .toLowerCase()
          .includes(this.searchValue.toLowerCase())
      } else {
        return comment.author.username
          .toLowerCase()
          .includes(this.searchValue.toLowerCase())
      }
    })
  } */

  setFilteredArray() {
    const resPerPage = this.resultsPerPage()
    this.filteredCom = this.comments.slice(
      this.pgOptions.firstResultIndex(resPerPage),
      this.pgOptions.lastResultIndex(resPerPage)
    )
    console.log(this.filteredCom, this.pgOptions.firstResultIndex(resPerPage),
    this.pgOptions.lastResultIndex(resPerPage))
  }

  filteredComments() {
    if (!this.searchValue) {
      this.setFilteredArray()
      /* this.filteredCom = this.comments.slice(
        this.pgOptions.firstResultIndex(this.resultsPerPage()),
        this.pgOptions.lastResultIndex(this.resultsPerPage())
      )
      console.log(this.filteredCom) */
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
    
  }

}

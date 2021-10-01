import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  constructor() { }

  currentPage: number = 1;

  changePage(num: number) {
    this.currentPage = num
  }

  nextPage(pageNumbers: any) {
    if (this.currentPage < pageNumbers[pageNumbers.length - 1])
      this.currentPage++
  }
  prevPage() {
    if (this.currentPage > 1) this.currentPage--
  }

  firstPage() {
    this.currentPage = 1
  }

  lastPage(pageNumbers: any) {
    this.currentPage = pageNumbers[pageNumbers.length - 1]
  }

  lastResultIndex(resPerPage: number) {
    console.log('lastIndex: ',this.currentPage * resPerPage)
    return this.currentPage * resPerPage
  }

  firstResultIndex(resPerPage: number) {
    console.log('firstIndex:', this.lastResultIndex(resPerPage) - resPerPage)
    return this.lastResultIndex(resPerPage) - resPerPage
  }
}


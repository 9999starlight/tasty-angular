import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() resultsPerPage: number = 1;
  @Input() totalResults: number = 1;
  @Input() currentPage: number = 1;
  pgNum: any = [];
  @Output() prevPage = new EventEmitter();
  @Output() firstPage = new EventEmitter();
  @Output() paginate = new EventEmitter();
  @Output() lastPage = new EventEmitter();
  @Output() nextPage = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.pageNumbers()
    console.log('from pagination: ', 'total results: ' + this.totalResults, 'resultsPerPage: ' + this.resultsPerPage, 'page numbers: ' + this.pgNum, 'pagesForShow: ' + this.pagesForShow())
  }

  prev() {
    this.prevPage.emit();
  }

  first() {
    this.firstPage.emit();
  }

  pagina(num: number) {
    this.paginate.emit(num)
  }

  last(pgNums: any) {
    this.lastPage.emit(pgNums)
  }

  next(pgNums: any) {
    this.nextPage.emit(pgNums)
  }

  pageNumbers() {
    let arr = []
    for (
      let i = 1;
      i <= Math.ceil(this.totalResults / this.resultsPerPage);
      i++
    ) {
      arr.push(i)
    }
    this.pgNum = arr
  }

  get togglePrevDisabled() {
    if (this.currentPage === 1) {
      return true
    } else {
      return false
    }
  }

  get toggleNextDisabled() {
    //const pgNums = this.pageNumbers();
    if (this.currentPage >= this.pgNum[this.pgNum.length - 1]) {
      return true
    } else {
      return false
    }
  }
  // pages between first and last
  pagesForShow() {
    //const pgNums = this.pageNumbers();
    return this.pgNum.slice(1, this.pgNum.length - 1)
  }
}

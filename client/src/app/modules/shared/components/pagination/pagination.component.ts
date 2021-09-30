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
  @Output() prevPage = new EventEmitter();
  @Output() firstPage = new EventEmitter();
  @Output() paginate = new EventEmitter();
  @Output() lastPage = new EventEmitter();
  @Output() nextPage = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
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

  get pageNumbers() {
    let arr = []
    for (
      let i = 1;
      i <= Math.ceil(this.totalResults / this.resultsPerPage);
      i++
    ) {
      arr.push(i)
    }
    return arr
  }

  get togglePrevDisabled() {
    if (this.currentPage === 1) {
      return true
    } else {
      return false
    }
  }

  get toggleNextDisabled() {
    const pgNums = this.pageNumbers;
    if (this.currentPage >= pgNums[pgNums.length - 1]) {
      return true
    } else {
      return false
    }
  }
  // pages between first and last
  get pagesForShow() {
    const pgNums = this.pageNumbers;
    return pgNums.slice(1, pgNums.length - 1)
  }
}

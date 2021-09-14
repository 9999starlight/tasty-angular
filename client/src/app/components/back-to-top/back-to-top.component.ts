import { Component, OnInit, HostListener } from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-back-to-top',
  templateUrl: './back-to-top.component.html',
  styleUrls: ['./back-to-top.component.scss']
})
export class BackToTopComponent implements OnInit {
  isLongPage = false;

  @HostListener('window:scroll', ['$event']) onScroll(event: any) {
    if (window.pageYOffset > 500) {
      this.isLongPage = true;
    } else {
      this.isLongPage = false;
    }
  }

  constructor(private scroller: ViewportScroller) { }
  ngOnInit(): void { }

  scrollToTop() {
    this.scroller.scrollToPosition([0, 0]);
  }
}

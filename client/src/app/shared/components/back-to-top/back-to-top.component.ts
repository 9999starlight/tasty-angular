import { Component, HostListener, inject } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Icons } from '../../ui/icons';

@Component({
    selector: 'app-back-to-top',
    templateUrl: './back-to-top.component.html',
    styleUrls: ['./back-to-top.component.scss'],
    standalone: true,
    imports: [FontAwesomeModule]
})
export class BackToTopComponent {
  private scroller = inject(ViewportScroller);
  public faChevronUp = Icons.faChevronUp;

  isLongPage = false;

  @HostListener('window:scroll', ['$event']) onScroll(event: any) {
    if (window.pageYOffset > 500) {
      this.isLongPage = true;
    } else {
      this.isLongPage = false;
    }
  }

  scrollToTop() {
    this.scroller.scrollToPosition([0, 0]);
  }
}

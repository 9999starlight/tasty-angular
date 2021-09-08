import { Injectable } from '@angular/core';
import { ViewportScroller } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class HashScrollService {

  constructor(public viewportScroller: ViewportScroller) { }

  onBackToTop(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }
}

import { Component, OnInit, OnDestroy, Output, EventEmitter, Input, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements OnInit, OnDestroy {
  @Output() closeModal = new EventEmitter();
  @Input() editing: boolean = true;
  @Input() editModal: boolean = false;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'disable-scrolling');
  }

  closing() {
    this.closeModal.emit();
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'disable-scrolling');
  }

}

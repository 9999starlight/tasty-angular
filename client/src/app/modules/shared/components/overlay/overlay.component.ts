import { Component, OnInit, OnDestroy, Output, EventEmitter, Input, Renderer2, inject } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-overlay',
    templateUrl: './overlay.component.html',
    styleUrls: ['./overlay.component.scss'],
    standalone: true,
    imports: [NgClass],
})
export class OverlayComponent implements OnInit, OnDestroy {
  private renderer = inject(Renderer2);

  @Output() closeModal = new EventEmitter();
  @Input() editing: boolean = true;
  @Input() editModal: boolean = false;

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

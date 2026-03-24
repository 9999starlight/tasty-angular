import { Component, OnInit, OnDestroy, Input, Renderer2, inject, output } from '@angular/core';
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

  readonly closeModal = output();
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

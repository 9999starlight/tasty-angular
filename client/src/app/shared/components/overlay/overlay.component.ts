import { Component, inject, Input, OnDestroy, OnInit, output, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-overlay',
  imports: [],
  templateUrl: './overlay.component.html',
  styleUrl: './overlay.component.scss',
})
export class OverlayComponent implements OnInit, OnDestroy{
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

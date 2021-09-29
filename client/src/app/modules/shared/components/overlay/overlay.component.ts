import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements OnInit {
  @Output() closeModal = new EventEmitter();
  @Input() editing: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  closing() {
    this.closeModal.emit();
  }

}

import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';


@Component({
  selector: 'app-info-message',
  templateUrl: './info-message.component.html',
  styleUrls: ['./info-message.component.scss'],
})
export class InfoMessageComponent implements OnInit, OnDestroy {
  @Input() messageStatus: boolean = false;
  @Input() message: string = '';
  @Output() clear = new EventEmitter();
  timeSet = 0;
  constructor() {}

  ngOnInit() {
    this.timeSet = window.setTimeout(() => {
      this.clear.emit('');
    }, 5000);
  }

  ngOnDestroy() {
    clearTimeout(this.timeSet);
    this.timeSet = 0;
  }
}

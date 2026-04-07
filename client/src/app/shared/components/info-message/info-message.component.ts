import { Component, Input, OnDestroy, OnInit, output } from '@angular/core';

@Component({
  selector: 'app-info-message',
  imports: [],
  templateUrl: './info-message.component.html',
  styleUrl: './info-message.component.scss',
})
export class InfoMessageComponent implements OnInit, OnDestroy {
  @Input() messageStatus: boolean = false;
  @Input({ required: true }) message: string = '';
  readonly clear = output<string>();
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

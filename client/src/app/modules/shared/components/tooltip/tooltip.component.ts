import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-tooltip',
    templateUrl: './tooltip.component.html',
    styleUrls: ['./tooltip.component.scss'],
    standalone: true,
})
export class TooltipComponent implements OnInit {
  @Input() tooltipText: string = '';
  constructor() {}

  ngOnInit(): void {}
}

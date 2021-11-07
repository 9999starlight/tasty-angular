import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-statistic-bars',
  templateUrl: './statistic-bars.component.html',
  styleUrls: ['./statistic-bars.component.scss'],
})
export class StatisticBarsComponent implements OnInit {
  @Input() singleData!: {
    name: string;
    value: number;
    percentage: number;
  };

  constructor() {}

  ngOnInit(): void {
    //console.log('from bars: ',this.singleData)
  }
}

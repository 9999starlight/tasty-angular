import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-statistic-bars',
  imports: [],
  templateUrl: './statistic-bars.component.html',
  styleUrl: './statistic-bars.component.scss',
})
export class StatisticBarsComponent {
  @Input() singleData!: {
    name: string;
    value: number;
    percentage: number;
  };
}

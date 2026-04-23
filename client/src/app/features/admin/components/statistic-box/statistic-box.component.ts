import { Component, Input } from '@angular/core';
import { StatisticBarsComponent } from './statistic-bars/statistic-bars.component';

@Component({
  selector: 'app-statistic-box',
  imports: [StatisticBarsComponent],
  templateUrl: './statistic-box.component.html',
  styleUrl: './statistic-box.component.scss',
})
export class StatisticBoxComponent {
  @Input() title: string = '';
  @Input() dataArray: {
    name: string;
    value: number;
  }[] = [];
  @Input() autoHeight = false;
  addPercentages: any = [];

  constructor() {}

  ngOnInit(): void {
    this.percentages();
  }

  percentages() {
    const addWidth = this.dataArray.map((data: any) => ({
      ...data,
      percentage: (data.value / this.dataArray[0].value) * 100 + '%',
    }));
    this.addPercentages = addWidth;
  }
}

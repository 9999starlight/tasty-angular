import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-statistic-box',
  templateUrl: './statistic-box.component.html',
  styleUrls: ['./statistic-box.component.scss']
})
export class StatisticBoxComponent implements OnInit {
  @Input() title: string = '';
  @Input() dataArray: {
    name: string,
    value: number
  }[] = [];
  @Input() autoHeight = false;
  addPercentages: any = [];

  constructor() { }

  ngOnInit(): void {
    this.percentages();
  }

  percentages() {
    const addWidth = this.dataArray.map((data: any) => ({
      ...data,
      percentage: (data.value / this.dataArray[0].value) * 100 + '%'
    }))
    this.addPercentages = addWidth;
  }

}

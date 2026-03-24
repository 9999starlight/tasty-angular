import { Component, OnInit, Input, output } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
    selector: 'app-sorting-buttons',
    templateUrl: './sorting-buttons.component.html',
    styleUrls: ['./sorting-buttons.component.scss'],
    standalone: true,
    imports: [FontAwesomeModule],
})
export class SortingButtonsComponent implements OnInit {
  @Input() isRating: boolean = true;
  readonly titleAsc = output();
  readonly titleDesc = output();
  readonly ratingAsc = output();
  readonly ratingDesc = output();
  readonly dateAsc = output();
  readonly dateDesc = output();

  constructor() {}

  ngOnInit(): void {}
}

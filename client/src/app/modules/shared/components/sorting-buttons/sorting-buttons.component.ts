import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sorting-buttons',
  templateUrl: './sorting-buttons.component.html',
  styleUrls: ['./sorting-buttons.component.scss'],
})
export class SortingButtonsComponent implements OnInit {
  @Input() isRating: boolean = true;
  @Output() titleAsc = new EventEmitter();
  @Output() titleDesc = new EventEmitter();
  @Output() ratingAsc = new EventEmitter();
  @Output() ratingDesc = new EventEmitter();
  @Output() dateAsc = new EventEmitter();
  @Output() dateDesc = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}

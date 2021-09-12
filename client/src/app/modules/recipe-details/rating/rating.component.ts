import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  ratingDropdown: boolean = false;
  rateValue: number = 1;
  constructor() { }

  ngOnInit(): void {
  }

  toggleRating(){
    this.ratingDropdown = !this.ratingDropdown
  }

  fillTheStars() {}

  rateThisRecipe() {}
}

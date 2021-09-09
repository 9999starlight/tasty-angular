import { Component, OnInit, Input } from '@angular/core';
import { RecipeResponse } from 'src/app/types/RecipeResponse';
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  @Input() highestRatedRecipes: RecipeResponse[] = [];

  constructor() { }

  ngOnInit(): void {
    console.log(this.highestRatedRecipes)
  }
}

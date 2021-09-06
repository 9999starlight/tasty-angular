import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../../recipes/recipes.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  recipes = [];
  count: number = 0;

  constructor(private recipesService: RecipesService) { }

  ngOnInit(){
    this.recipesService.getRecipes()
      .subscribe(res => {
        console.log(res);
      });
  }

}

import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../../recipes/recipes.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { SingleRecipe } from 'src/app/types/SingleRecipe';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {
  recipe: any;
  constructor(private route: ActivatedRoute, private recipesService: RecipesService) { }

  ngOnInit(): void {
    console.log('route: ', this.route)

    this.route.params.pipe(
      switchMap(({ id }) => {
        return this.recipesService.getSingleRecipe(id);
      })
    ).subscribe((rec) => {
      this.recipe = rec;
      console.log(this.recipe)
    });

    
  }

}

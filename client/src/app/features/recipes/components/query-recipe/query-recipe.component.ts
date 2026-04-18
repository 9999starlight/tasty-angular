import { Component, Input } from '@angular/core';
import { Recipe } from '../../models/recipe.entity';
import { Icons } from '../../../../shared/ui/icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-query-recipe',
  imports: [RouterLink],
  templateUrl: './query-recipe.component.html',
  styleUrl: './query-recipe.component.scss',
})
export class QueryRecipeComponent {
  @Input() recipe!: Recipe;
  constructor() { }
  icons = Icons;
}

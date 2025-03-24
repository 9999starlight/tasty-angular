import { Component, OnInit } from '@angular/core';
import { RecipeFormComponent } from '../../shared/components/recipe-form/recipe-form.component';

@Component({
    selector: 'app-create-recipe',
    templateUrl: './create-recipe.component.html',
    styleUrls: ['./create-recipe.component.scss'],
    standalone: true,
    imports: [RecipeFormComponent],
})
export class CreateRecipeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

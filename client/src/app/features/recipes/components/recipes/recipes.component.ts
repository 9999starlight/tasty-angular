import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SearchComponent } from '../../../../shared/components/search/search.component';
import { SortingButtonsComponent } from '../../../../shared/components/sorting-buttons/sorting-buttons.component';
import { UiService } from '../../../../shared/services/ui.service';
import { RecipesFacade } from '../../facade/recipes.facade';
import { Recipe, RecipeSortDirection } from '../../models/recipe.entity';
import { QueryRecipeComponent } from '../query-recipe/query-recipe.component';
import { SearchParams } from '../../../../shared/components/models/search.model';

@Component({
  selector: 'app-recipes',
  imports: [AsyncPipe, SearchComponent, QueryRecipeComponent, SortingButtonsComponent],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss',
})
export class RecipesComponent implements OnInit {
  private recipesFacade = inject(RecipesFacade);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  readonly uiService = inject(UiService);
  recipes$: Observable<Recipe[]>;

  constructor() {
    this.recipes$ = this.recipesFacade.recipes$;
  }

  ngOnInit(): void {
    this.uiService.toggleSearchForm(false);
  }

  getNewResults(params: SearchParams) {
    this.recipesFacade.loadRecipes$(params);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'replace',
    });
  }

  onSortChange(sortConfig: {
    field: 'title' | 'rating' | 'date';
    direction: RecipeSortDirection;
  }) {
    this.recipesFacade.setSort$(sortConfig.field, sortConfig.direction);
  }
}

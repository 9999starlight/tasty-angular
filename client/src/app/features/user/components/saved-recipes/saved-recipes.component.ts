import { Component, inject } from '@angular/core';
import { Recipe, RecipeSortDirection } from '../../../recipes/models/recipe.entity';
import { RecipesFacade } from '../../../recipes/facade/recipes.facade';
import { UserFacade } from '../../facade/user.facade';
import { SortingService } from '../../../../shared/services/sorting.service';
import { Observable } from 'rxjs';
import { SortingButtonsComponent } from '../../../../shared/components/sorting-buttons/sorting-buttons.component';
import { PrivateRecipeComponent } from '../../../recipes/components/private-recipe/private-recipe.component';
import { PageErrorComponent } from '../../../../shared/components/page-error/page-error.component';
import { AsyncPipe } from '@angular/common';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { CurrentUser, UpdatedUser } from '../../models/userTypes';

@Component({
  selector: 'app-saved-recipes',
  imports: [
    SortingButtonsComponent,
    PrivateRecipeComponent,
    PageErrorComponent,
    AsyncPipe,
    LoaderComponent,
  ],
  templateUrl: './saved-recipes.component.html',
  styleUrl: './saved-recipes.component.scss',
})
export class SavedRecipesComponent {
  private recipesFacade = inject(RecipesFacade);
  private userFacade = inject(UserFacade);
  sortingService = inject(SortingService);
  isLoadingRecipe$: Observable<boolean>;
  isLoadingUser$: Observable<boolean>;
  recipes$: Observable<Recipe[]>;
  user$: Observable<CurrentUser | UpdatedUser | null>;

  constructor() {
    this.isLoadingRecipe$ = this.recipesFacade.loading$;
    this.isLoadingUser$ = this.userFacade.loading$;
    this.recipes$ = this.recipesFacade.recipes$;
    this.user$ = this.userFacade.currentUser$;
  }

  onSortChange(sortConfig: { field: 'title' | 'rating' | 'date'; direction: RecipeSortDirection }) {
    this.recipesFacade.setSort$(sortConfig.field, sortConfig.direction);
  }

  removeFromFavorites(recipeId: string, userId: string | undefined) {
    if (confirm('Remove from your saved recipes?') && userId) {
      this.userFacade.deleteFromFavorites$(recipeId, userId, true);
    }
  }
}

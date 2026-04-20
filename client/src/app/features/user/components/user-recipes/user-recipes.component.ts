import { Component, inject } from '@angular/core';
import { OverlayComponent } from '../../../../shared/components/overlay/overlay.component';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { PrivateRecipeComponent } from '../../../recipes/components/private-recipe/private-recipe.component';
import { RecipeFormComponent } from '../../../recipes/components/recipe-form/recipe-form.component';
import { TooltipComponent } from '../../../../shared/components/tooltip/tooltip.component';
import { PageErrorComponent } from '../../../../shared/components/page-error/page-error.component';
import { SortingButtonsComponent } from '../../../../shared/components/sorting-buttons/sorting-buttons.component';
import { SortingService } from '../../../../shared/services/sorting.service';
import { Icons } from '../../../../shared/ui/icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RecipesFacade } from '../../../recipes/facade/recipes.facade';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { Recipe, RecipeSortDirection } from '../../../recipes/models/recipe.entity';
import { SingleRecipe } from '../../../recipes/models/single-recipe.model';
import { AsyncPipe } from '@angular/common';
import { UserFacade } from '../../facade/user.facade';
import { CurrentUser, UpdatedUser } from '../../models/userTypes';
import { UiService } from '../../../../shared/services/ui.service';

@Component({
  selector: 'app-user-recipes',
  imports: [
    FontAwesomeModule,
    OverlayComponent,
    LoaderComponent,
    PrivateRecipeComponent,
    RecipeFormComponent,
    TooltipComponent,
    PageErrorComponent,
    SortingButtonsComponent,
    AsyncPipe,
  ],
  templateUrl: './user-recipes.component.html',
  styleUrl: './user-recipes.component.scss',
})
export class UserRecipesComponent {
  private recipesFacade = inject(RecipesFacade);
  private userFacade = inject(UserFacade);
  private uiService = inject(UiService);
  sortingService = inject(SortingService);
  icons = Icons;
  isLoadingRecipe$: Observable<boolean>;
  recipes$: Observable<Recipe[]>;
  singleRecipe$: Observable<SingleRecipe | null>;
  editingRecipe$: Observable<SingleRecipe | null>;
  isLoadingUser$: Observable<boolean>;
  user$: Observable<CurrentUser | UpdatedUser | null>;
  private pendingEditRecipeId$ = new BehaviorSubject<string | null>(null);

  constructor() {
    this.isLoadingRecipe$ = this.recipesFacade.loading$;
    this.recipes$ = this.recipesFacade.recipes$;
    this.singleRecipe$ = this.recipesFacade.selectedRecipe$;
    this.isLoadingUser$ = this.userFacade.loading$;
    this.user$ = this.userFacade.currentUser$;

    this.editingRecipe$ = combineLatest([
      this.singleRecipe$,
      this.isLoadingRecipe$,
      this.recipesFacade.error$,
      this.pendingEditRecipeId$,
    ]).pipe(
      map(([recipe, isLoading, error, pendingId]) => {
        if (!pendingId || isLoading || !!error || !recipe) {
          return null;
        }
        return recipe._id === pendingId ? recipe : null;
      }),
    );
  }

  onSortChange(sortConfig: { field: 'title' | 'rating' | 'date'; direction: RecipeSortDirection }) {
    this.recipesFacade.setSort$(sortConfig.field, sortConfig.direction);
  }

  editingStateSettings(id: string) {
    this.pendingEditRecipeId$.next(id);
    this.recipesFacade.loadSingleRecipe$(id);
    this.uiService.toggleEditState(true);
  }

  closeEditForm() {
    this.pendingEditRecipeId$.next(null);
  }

  deleteUserRecipe(id: string) {
    if (confirm('Are you sure you want to delete this recipe?')) {
      this.userFacade.deleteRecipe$(id);
    }
  }
}

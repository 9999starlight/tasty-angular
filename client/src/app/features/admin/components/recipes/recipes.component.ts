import { Component, inject, OnDestroy } from '@angular/core';
import { TooltipComponent } from '../../../../shared/components/tooltip/tooltip.component';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { SortingButtonsComponent } from '../../../../shared/components/sorting-buttons/sorting-buttons.component';
import { StatisticBoxComponent } from '../statistic-box/statistic-box.component';
import { RecipeFormComponent } from '../../../recipes/components/recipe-form/recipe-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UiService } from '../../../../shared/services/ui.service';
import { Icons } from '../../../../shared/ui/icons';
import { AsyncPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OverlayComponent } from '../../../../shared/components/overlay/overlay.component';
import { Recipe, RecipeSortDirection } from '../../../recipes/models/recipe.entity';
import { RecipesFacade } from '../../../recipes/facade/recipes.facade';
import { BehaviorSubject, combineLatest, filter, map, Observable, take } from 'rxjs';
import { SingleRecipe } from '../../../recipes/models/single-recipe.model';
import { DIFFICULTY_OPTIONS, DISH_TYPE_OPTIONS } from '../../../../core/constants/recipes/recipe-options';
import { UserFacade } from '../../../user/facade/user.facade';

@Component({
  selector: 'app-recipes',
  imports: [
    TooltipComponent,
    OverlayComponent,
    LoaderComponent,
    SortingButtonsComponent,
    StatisticBoxComponent,
    RecipeFormComponent,
    FontAwesomeModule,
    TitleCasePipe,
    AsyncPipe,
    DatePipe,
    RouterLink,
  ],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss',
})
export class RecipesComponent implements OnDestroy {
  uiService = inject(UiService);
  private recipesFacade = inject(RecipesFacade);
  private usersFacade = inject(UserFacade);
  readonly icons = Icons;
  private readonly statsLabels = {
    vegetarian: 'Vegetarian',
    glutenFree: 'Gluten Free',
    vegetarianAndGlutenFree: 'Vegetarian & Gluten free',
  } as const;
  adminRecipesOptions = ['meal name', 'user', 'recipe id'];

  selectedOption$ = new BehaviorSubject<'meal name' | 'user' | 'recipe id'>('meal name');
  searchTerm$ = new BehaviorSubject<string>('');
  levelArray$: Observable<{ name: string; value: number; }[]>;
  vegetarianGlutenFree$: Observable<{ name: string; value: number; }[]>;
  dishTypeOverview$: Observable<{ name: string; value: number; }[]>;
  filteredRecipes$: Observable<Recipe[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  recipe$: Observable<SingleRecipe | null>;
  recipeCount$: Observable<number>;

  constructor() {
    this.loading$ = this.recipesFacade.loading$;
    this.error$ = this.recipesFacade.error$;
    this.recipe$ = this.recipesFacade.selectedRecipe$;
    this.recipeCount$ = this.recipesFacade.totalCount$;
    this.filteredRecipes$ = combineLatest([
      this.recipesFacade.recipes$,
      this.searchTerm$,
      this.selectedOption$,
    ]).pipe(
      map(([recipes, searchTerm, selectedOption]) => {
        const query = searchTerm.trim().toLowerCase();
        if (!query) {
          return recipes;
        } else {
          return recipes.filter((recipe) => {
            if (selectedOption === 'meal name') {
              return recipe.mealName.toLowerCase().includes(query);
            } else if (selectedOption === 'user') {
              return recipe.author.username.toLowerCase().includes(query);
            } else {
              return recipe._id.toLowerCase().includes(query);
            }
          });
        }
      }),
    );
    // set streams for stats
    this.levelArray$ = this.recipesFacade.recipes$.pipe(
      map((recipes) =>
        this.buildOptionStats(
          recipes,
          DIFFICULTY_OPTIONS,
          (recipe) => (recipe as Recipe & { level?: string }).level,
        ),
      ),
    );
    this.dishTypeOverview$ = this.recipesFacade.recipes$.pipe(
      map((recipes) => this.buildOptionStats(recipes, DISH_TYPE_OPTIONS, (recipe) => recipe.dishType)),
    );

    this.vegetarianGlutenFree$ = this.recipesFacade.recipes$.pipe(
      map((recipes) => this.buildDietStats(recipes)),
    );
  }

  private buildOptionStats(
    recipes: Recipe[],
    options: string[],
    getValue: (recipe: Recipe) => string | undefined,
  ): { name: string; value: number; }[] {
    const counts = recipes.reduce<Record<string, number>>((acc, recipe) => {
      const value = getValue(recipe)?.trim().toLowerCase();
      if (value) {
        acc[value] = (acc[value] ?? 0) + 1;
      }
      return acc;
    }, {});
    return this.sortStatsDescending(
      options.map((option) => ({
        name: option,
        value: counts[option.toLowerCase()] ?? 0,
      })),
    );
  }

  private buildDietStats(recipes: Recipe[]): { name: string; value: number; }[] {
    const vegetarianCount = recipes.filter(
      (recipe) => (recipe as Recipe & { vegetarian?: boolean }).vegetarian === true,
    ).length;
    const glutenFreeCount = recipes.filter((recipe) => recipe.glutenFree === true).length;
    const vegetarianAndGlutenFreeCount = recipes.filter(
      (recipe) =>
        (recipe as Recipe & { vegetarian?: boolean }).vegetarian === true &&
        recipe.glutenFree === true,
    ).length;
    return this.sortStatsDescending([
      { name: this.statsLabels.vegetarian, value: vegetarianCount },
      { name: this.statsLabels.glutenFree, value: glutenFreeCount },
      { name: this.statsLabels.vegetarianAndGlutenFree, value: vegetarianAndGlutenFreeCount },
    ]);
  }

  private sortStatsDescending(stats: { name: string; value: number; }[]): { name: string; value: number; }[] {
    return [...stats].sort((a, b) => b.value - a.value);
  }

  deleteRecipe(recipe: Recipe) {
    if (!confirm('Are you sure you want to delete this recipe?')) {
      return;
    }
    this.usersFacade.currentUser$.pipe(take(1)).subscribe((currentUser) => {
      const isOwnRecipe = currentUser?.userId === recipe.author._id;
      this.usersFacade.deleteRecipe$(recipe._id, {
        skipUserUpdate: !isOwnRecipe,
        refetchMode: 'all',
      });
    });
  }

  editFormSettings(id: string) {
    this.recipesFacade.loadSingleRecipe$(id);
    combineLatest([
      this.recipe$,
      this.loading$,
      this.error$,
    ]).pipe(
      filter(([recipe, loading, error]) => recipe !== null && !loading && !error),
      take(1)
    ).subscribe(() => this.uiService.toggleEditState(true));
  }

  closeEditForm() {
    this.uiService.toggleEditState(false);
  }

  onChangeSelect(e: any) {
    this.selectedOption$.next(e.target.value);
  }

  filterRecipes(e: any) {
    this.searchTerm$.next(e.target.value);
  }

  onSortChange(sortConfig: { field: 'title' | 'rating' | 'date'; direction: RecipeSortDirection }) {
    this.recipesFacade.setSort$(sortConfig.field, sortConfig.direction);
  }

  ngOnDestroy(): void {
    this.closeEditForm();
  }
}

import { Component, inject } from '@angular/core';
import { AdminFacade } from '../../facade/admin.facade';
import { RecipesFacade } from '../../../recipes/facade/recipes.facade';
import { Recipe } from '../../../recipes/models/recipe.entity';
import { Observable } from 'rxjs';
import { RecipeComment } from '../../../recipes/models/comment.model';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { AsyncPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StatisticBoxComponent } from '../statistic-box/statistic-box.component';

@Component({
  selector: 'app-overview',
  imports: [LoaderComponent, StatisticBoxComponent, AsyncPipe, DatePipe, TitleCasePipe, RouterLink],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
})
export class OverviewComponent {
  private adminFacade = inject(AdminFacade);
  private recipesFacade = inject(RecipesFacade);
  adminLoading$: Observable<boolean>;
  recipesLoading$: Observable<boolean>;
  mostActiveUsers$: Observable<{ name: string; value: number; }[]>;
  usersCount$: Observable<number>;
  commentsCount$: Observable<number>;
  latestComments$: Observable<RecipeComment[]>;
  recipeCount$: Observable<number>;
  latestRecipes$: Observable<Recipe[]>;
  mostCommentedRecipes$: Observable<{ name: string; value: number; }[]>;

  constructor() {
    this.adminLoading$ = this.adminFacade.loading$;
    this.mostActiveUsers$ = this.adminFacade.mostActiveUsers$;
    this.usersCount$ = this.adminFacade.usersCount$;
    this.latestComments$ = this.adminFacade.latestComments$;
    this.commentsCount$ = this.adminFacade.commentsCount$;
    this.recipesLoading$ = this.recipesFacade.loading$;
    this.recipeCount$ = this.recipesFacade.totalCount$;
    this.latestRecipes$ = this.recipesFacade.latestRecipesByLimit$(10);
    this.mostCommentedRecipes$ = this.recipesFacade.mostCommentedRecipesStatsByLimit$(5);
  }
}

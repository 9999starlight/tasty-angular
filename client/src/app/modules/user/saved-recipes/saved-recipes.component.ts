import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { RecipesService } from '../../shared/sharedServices/recipes.service';
import { SortingService } from '../../shared/sharedServices/sorting.service';
import { UpdatedUser } from 'src/app/types/userTypes';
import { Subscription } from 'rxjs';
import { scaleIn, scaleOut } from 'src/app/animations/scale.animations';
import { transition, useAnimation, trigger } from '@angular/animations';
import { PrivateRecipeComponent } from '../../shared/components/private-recipe/private-recipe.component';
import { SortingButtonsComponent } from '../../shared/components/sorting-buttons/sorting-buttons.component';
import { PageErrorComponent } from '../../shared/components/page-error/page-error.component';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { NgIf, NgFor } from '@angular/common';
@Component({
    selector: 'app-saved-recipes',
    templateUrl: './saved-recipes.component.html',
    styleUrls: ['./saved-recipes.component.scss'],
    animations: [
        trigger('scaleAnimation', [
            transition('void => *', [
                useAnimation(scaleIn, { params: { time: '300ms' } })
            ]),
            transition('* => void', [
                useAnimation(scaleOut, { params: { time: '200ms' } })
            ]),
        ]),
    ],
    standalone: true,
    imports: [NgIf, LoaderComponent, PageErrorComponent, SortingButtonsComponent, NgFor, PrivateRecipeComponent]
})
export class SavedRecipesComponent implements OnInit, OnDestroy {
  @Output() deletedFromFavorites = new EventEmitter();
  isLoading = true;
  savedRecipes = [];
  recipeSubscription?: Subscription;
  favoritesSubscription?: Subscription;

  constructor(
    public authService: AuthService,
    private recipesService: RecipesService,
    public sortingService: SortingService
  ) {}

  ngOnInit(): void {
    this.fetchSavedRecipes();
    console.log(this.authService.user, console.log(this.savedRecipes));
  }

  fetchSavedRecipes() {
    if (!this.authService.user?.favorites.length) {
      this.isLoading = false;
      return;
    }
    this.isLoading = true;
    this.recipeSubscription = this.recipesService
      .getRecipesByQuery({
        _id: this.authService.user?.favorites,
      })
      .subscribe(
        (res) => {
          if (res) {
            console.log('res: ', res);
            //this.savedRecipes = [];
            this.isLoading = false;
            this.savedRecipes = JSON.parse(JSON.stringify(res));
            console.log(this.savedRecipes);
          }
        },
        (error) => {
          this.isLoading = false;
          console.log(error.statusText);
        }
      );
  }

  removeFromFavorites(id: string) {
    if (confirm('Remove from your saved recipes?')) {
      this.favoritesSubscription = this.authService.deleteFromFavorites(id).subscribe(
        (res: { message: string; updatedUser: UpdatedUser }) => {
          if (res) {
            console.log(res);
            this.authService.updateUser(res.updatedUser);
            this.savedRecipes = [];
            this.fetchSavedRecipes();
            console.log('user:', this.authService.user!);
          }
        },
        (error) => {
          console.log(error.statusText);
        }
      );
    }
  }

  ngOnDestroy() {
    this.recipeSubscription?.unsubscribe();
    this.favoritesSubscription?.unsubscribe();
  }
}

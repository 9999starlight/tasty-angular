import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { RecipeResponse } from 'src/app/types/RecipeResponse';
import { SortingService } from '../../shared/sharedServices/sorting.service';
import { RecipesService } from '../../shared/sharedServices/recipes.service';
import { UIService } from '../../shared/sharedServices/ui.service';
import { SingleRecipe } from 'src/app/types/SingleRecipe';
import { Subscription } from 'rxjs';
import { PrivateRecipeComponent } from '../../shared/components/private-recipe/private-recipe.component';
import { SortingButtonsComponent } from '../../shared/components/sorting-buttons/sorting-buttons.component';
import { PageErrorComponent } from '../../shared/components/page-error/page-error.component';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { RecipeFormComponent } from '../../shared/components/recipe-form/recipe-form.component';
import { TooltipComponent } from '../../shared/components/tooltip/tooltip.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OverlayComponent } from '../../shared/components/overlay/overlay.component';


@Component({
    selector: 'app-user-recipes',
    templateUrl: './user-recipes.component.html',
    styleUrls: ['./user-recipes.component.scss'],
    standalone: true,
    imports: [
    OverlayComponent,
    FontAwesomeModule,
    TooltipComponent,
    RecipeFormComponent,
    LoaderComponent,
    PageErrorComponent,
    SortingButtonsComponent,
    PrivateRecipeComponent
],
})
export class UserRecipesComponent implements OnInit, OnDestroy {
  isLoading = true;
  userRecipes: RecipeResponse[] = [];
  singleRecipe!: SingleRecipe;
  recipeSubscription?: Subscription;
  singleRecipeSubscription?: Subscription;
  deleteSubscription?: Subscription;
  subscriptions: (Subscription | undefined)[] = [];

  constructor(
    public authService: AuthService,
    private recipesService: RecipesService,
    public sortingService: SortingService,
    public uiService: UIService
  ) {}

  ngOnInit(): void {
    this.fetchUserRecipes();
    this.subscriptions.push(
      this.recipeSubscription,
      this.singleRecipeSubscription,
      this.deleteSubscription
    );
  }

  fetchUserRecipes() {
    /* if(!this.authService.user!.createdRecipes.length) {
      this.isLoading = false;
      return;
    } */
    this.recipesService
      .getRecipesByQuery({ author: this.authService.user!.userId })
      .subscribe(
        (res) => {
          if (res) {
            this.isLoading = false;
            this.userRecipes = JSON.parse(JSON.stringify(res));
          }
        },
        (error) => {
          this.isLoading = false;
          console.log(error.statusText);
        }
      );
  }

  editingStateSettings(id: string) {
    this.recipesService.getSingleRecipe(id).subscribe(
      (res: SingleRecipe) => {
        if (res) {
          this.singleRecipe = JSON.parse(JSON.stringify(res));
          this.uiService.toggleEditState(true);
        }
      },
      (error: any) => {
        console.log(error.statusText);
      }
    );
  }

  closeEditForm() {
    this.uiService.toggleEditState(false);
  }

  deleteUserRecipe(id: string) {
    if (confirm('Are you sure you want to delete this recipe?')) {
      this.recipesService.deleteRecipe(id).subscribe(
        (res: any) => {
          if (res) {
            // console.log(res);
            this.authService.updateUser(res.userUpdate);
            this.userRecipes = [];
            this.fetchUserRecipes();
            // console.log('user:', this.authService.user!)
          }
        },
        (error) => {
          console.log(error.statusText);
        }
      );
    }
  }

  ngOnDestroy() {
    this.closeEditForm();
    this.subscriptions.forEach((sub) => {
      if (!sub === undefined) sub?.unsubscribe();
    });
  }
}

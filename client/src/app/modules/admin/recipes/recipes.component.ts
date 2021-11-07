import { Component, OnInit, OnDestroy } from '@angular/core';
import { UIService } from '../../shared/sharedServices/ui.service';
import { RecipeResponse } from 'src/app/types/RecipeResponse';
import { SingleRecipe } from '../../../types/SingleRecipe';
import { RecipesService } from '../../shared/sharedServices/recipes.service';
import { SortingService } from '../../shared/sharedServices/sorting.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent implements OnInit, OnDestroy {
  constructor(
    public uiService: UIService,
    private recipesService: RecipesService,
    public sortingService: SortingService
  ) {}
  recipes: RecipeResponse[] = [];
  filteredRecipes: RecipeResponse[] = [];
  levelArray: any = [];
  vegetarianGlutenFree: any = [];
  dishTypeOverview: any = [];
  adminRecipesOptions = ['Meal Name', 'User', 'Recipe ID'];
  selectedOption = 'meal name';
  searchValue = '';
  singleRecipe?: SingleRecipe;
  recipeSubcription?: Subscription;
  deleteSubscription?: Subscription;
  singleRecipeSubscription?: Subscription;
  subscriptions: (Subscription | undefined)[] = [];

  ngOnInit(): void {
    this.fetchRecipes();
  }

  fetchRecipes() {
    this.recipeSubcription = this.recipesService.getRecipes().subscribe(
      (res) => {
        if (res) {
          this.recipes = JSON.parse(JSON.stringify(res));
          this.filteredRecipes = [...this.recipes];
          this.setStatisticBoxes();
        }
      },
      (error) => {
        console.log(error.statusText);
      }
    );
    this.subscriptions.push(this.recipeSubcription);
  }

  setStatisticBoxes() {
    // sort recipes by level count
    let reduceLevels = this.recipes.reduce(
      (item: any, { level: key }: any) => (
        (item[key] = (item[key] || 0) + 1), item
      ),
      {}
    );
    this.levelArray = [];
    for (let i in reduceLevels) {
      this.levelArray.push({ name: i, value: reduceLevels[i] });
    }
    this.levelArray.sort((a: any, b: any) => b.value - a.value);
    // sort recipes by dishType count
    let reducedDishType = this.recipes.reduce(
      (item: any, { dishType: key }: any) => (
        (item[key] = (item[key] || 0) + 1), item
      ),
      {}
    );
    this.dishTypeOverview = [];
    for (let i in reducedDishType) {
      this.dishTypeOverview.push({ name: i, value: reducedDishType[i] });
    }
    this.dishTypeOverview.sort((a: any, b: any) => b.value - a.value);
    // all vegetarian & gluten free count
    const vegetarian = this.recipes.filter(
      (recipe: any) => recipe.vegetarian === true
    );
    const glutenFree = this.recipes.filter(
      (recipe: any) => recipe.glutenFree === true
    );
    const combineVegetarian = this.recipes.filter(
      (recipe: any) => recipe.vegetarian === true && recipe.glutenFree === true
    );
    this.vegetarianGlutenFree = [];
    this.vegetarianGlutenFree.push(
      { name: 'Vegetarian', value: vegetarian.length },
      { name: 'Gluten Free', value: glutenFree.length },
      { name: 'Vegetarian & Gluten free', value: combineVegetarian.length }
    );
    this.vegetarianGlutenFree.sort((a: any, b: any) => b.value - a.value);
  }

  deleteRecipe(id: string) {
    this.deleteSubscription = this.recipesService
      .deleteRecipe(id)
      .subscribe((res) => {
        if (res) {
          // console.log(res);
          this.recipes = [];
          this.fetchRecipes();
        }
      });
    this.subscriptions.push(this.deleteSubscription);
  }

  editFormSettings(id: string) {
    this.singleRecipeSubscription = this.recipesService
      .getSingleRecipe(id)
      .subscribe(
        (res: SingleRecipe) => {
          if (res) {
            // console.log(res);
            this.singleRecipe = JSON.parse(JSON.stringify(res));
            this.uiService.toggleEditState(true);
          }
        },
        (error: any) => {
          console.log(error.statusText);
        }
      );
    this.subscriptions.push(this.singleRecipeSubscription);
  }

  closeEditForm() {
    this.uiService.toggleEditState(false);
  }

  onChangeSelect(e: any) {
    this.selectedOption = e.target.value;
  }

  filterRecipes() {
    if (!this.searchValue) {
      this.filteredRecipes = [...this.filteredRecipes];
    }
    this.filteredRecipes = this.recipes.filter((recipe) => {
      if (this.selectedOption === 'recipe id') {
        return recipe._id
          .toLowerCase()
          .includes(this.searchValue.toLowerCase());
      } else if (this.selectedOption === 'user') {
        return recipe.author.username
          .toLowerCase()
          .includes(this.searchValue.toLowerCase());
      } else {
        return recipe.mealName
          .toLowerCase()
          .includes(this.searchValue.toLowerCase());
      }
    });
  }

  ngOnDestroy() {
    this.closeEditForm();
    this.subscriptions.forEach((sub) => {
      if (!sub === undefined) sub?.unsubscribe();
    });
  }
}

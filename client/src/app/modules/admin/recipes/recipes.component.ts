import { Component, OnInit, OnDestroy } from '@angular/core';
import { UIService } from '../../shared/sharedServices/ui.service';
import { SingleRecipe } from '../../../types/SingleRecipe';
import { RecipesService } from '../../shared/sharedServices/recipes.service';
import { SortingService } from '../../shared/sharedServices/sorting.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit, OnDestroy {

  constructor(public uiService: UIService, private recipesService: RecipesService, public sortingService: SortingService) { }
  recipes: any = [];
  filteredRecipes: any = [];
  levelArray: any = [];
  vegetarianGlutenFree: any = [];
  dishTypeOverview: any = [];
  adminRecipesOptions = ['Meal Name', 'User', 'Recipe ID'];
  selectedOption = 'meal name';
  searchValue = '';
  singleRecipe!: SingleRecipe;

  ngOnInit(): void {
    this.fetchRecipes();
  }

  fetchRecipes() {
    this.recipesService.getRecipes().subscribe((res) => {
      if (res) {
        this.recipes = JSON.parse(JSON.stringify(res));
        this.setStatisticBoxes();
      }
    }, error => {
      /* this.errorMessage = `Error: ${error.statusText}`; */
      console.log(error.statusText);
    })
  }

  setStatisticBoxes() {
    // sort recipes by level count
    let reduceLevels = this.recipes.reduce(
      (item: any, { level: key }: any) => ((item[key] = (item[key] || 0) + 1), item),
      {}
    )
    this.levelArray = []
    for (let i in reduceLevels) {
      this.levelArray.push({ name: i, value: reduceLevels[i] })
    }
    this.levelArray.sort((a: any, b: any) => b.value - a.value)
    // sort recipes by dishType count
    let reducedDishType = this.recipes.reduce(
      (item: any, { dishType: key }: any) => ((item[key] = (item[key] || 0) + 1), item),
      {}
    )
    this.dishTypeOverview = []
    for (let i in reducedDishType) {
      this.dishTypeOverview.push({ name: i, value: reducedDishType[i] })
    }
    this.dishTypeOverview.sort((a: any, b: any) => b.value - a.value)
    // all vegetarian & gluten free count
    const vegetarian = this.recipes.filter(
      (recipe: any) => recipe.vegetarian === true
    )
    const glutenFree = this.recipes.filter(
      (recipe: any) => recipe.glutenFree === true
    )
    const combineVegetarian = this.recipes.filter(
      (recipe: any) => recipe.vegetarian === true && recipe.glutenFree === true
    )
    this.vegetarianGlutenFree = []
    this.vegetarianGlutenFree.push(
      { name: 'Vegetarian', value: vegetarian.length },
      { name: 'Gluten Free', value: glutenFree.length },
      { name: 'Vegetarian & Gluten free', value: combineVegetarian.length }
    )
    this.vegetarianGlutenFree.sort((a: any, b: any) => b.value - a.value)
  }

  deleteRecipe(id: string) {
    this.recipesService.deleteRecipe(id).subscribe((res) => {
      if (res) {
        console.log(res);
        this.recipes = [];
        this.fetchRecipes();
      }
    })
  }

  editFormSettings(id: string) {
    this.recipesService.getSingleRecipe(id).subscribe((res: SingleRecipe) => {
      if (res) {
        console.log(res)
        this.singleRecipe = JSON.parse(JSON.stringify(res));
        this.uiService.toggleEditState(true);
      }
    }, (error: any) => {
      console.log(error.statusText);
    });
  }

  closeEditForm() {
    this.uiService.toggleEditState(false);
  }

  ngOnDestroy() {
    this.closeEditForm();
  }
}

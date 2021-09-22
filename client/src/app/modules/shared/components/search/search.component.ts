import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RecipesService } from '../../sharedServices/recipes.service';
 
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchValue = '';
  basicOption = '';
  dishType = '';
  difficulty = '';
  basicOptions = ['Ingredient', 'Title'];
  dishTypeOptions = [
    'Bread',
    'Pasta',
    'Salad',
    'Soup',
    'Side Dish',
    'Main',
    'Roast',
    'Pizza',
    'Stew',
    'Sandwich',
    'Pastry',
    'Sauce',
    'Cookie',
    'Dessert',
    'Drink',
    'Snack'
  ];
  difficultyOptions = ['Easy', 'Medium', 'Hard'];
  vegetarian = false;
  glutenFree = false;
  queryParams!: { mealName?: string, title?: string, 'ingredients.ingredient'?: string };
  @Output() changeParams = new EventEmitter();

  constructor(private router: Router, private route: ActivatedRoute, private recipesService: RecipesService) {}

  ngOnInit(): void {
  }

  basicSearch(basicSearchForm: NgForm) {
    this.configBasicParams()
   }

  categoriesSearch(categoriesForm: NgForm) { 
    console.log(categoriesForm.value)
  }

  configBasicParams() {
    if (this.basicOption !== '') {
      if (this.basicOption === 'title')
        this.queryParams = { mealName: this.searchValue.toLowerCase() }
      if (this.basicOption === 'ingredient') {
        this.queryParams = { 'ingredients.ingredient': this.searchValue.toLowerCase() }
      }
    }
    console.log('from config basic params: ',this.queryParams)
    this.changeParams.emit(this.queryParams)
    //return this.queryParams
    
    //this.getNewResults()
    
  }

  

}

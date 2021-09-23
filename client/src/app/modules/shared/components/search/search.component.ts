import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  isResultsPage = false;
  queryParams: { mealName?: string, title?: string, 'ingredients.ingredient'?: string, dishType?: string, level?: string, vegetarian?: boolean, glutenFree?: boolean } = {};
  @Output() changeParams = new EventEmitter();
  @Input() isResultPage = false;
  constructor(private router: Router, private route: ActivatedRoute, private recipesService: RecipesService) { }

  ngOnInit(): void {
  }

  basicSearch(basicSearchForm: NgForm) {
    this.queryParams = {}
    if (this.basicOption !== '') {
      if (this.basicOption === 'title')
        this.queryParams = { mealName: this.searchValue.toLowerCase() }
      if (this.basicOption === 'ingredient') {
        this.queryParams = { 'ingredients.ingredient': this.searchValue.toLowerCase() }
      }
    }
    this.changeParams.emit(this.queryParams)
  }

  categoriesSearch(categoriesForm: NgForm) {
    this.queryParams = {}
    if (this.dishType !== '') {
      this.queryParams.dishType = this.dishType
    }
    if (this.difficulty !== '') {
      this.queryParams.level = this.difficulty
    }
    if (this.vegetarian) {
      this.queryParams.vegetarian = true
    }
    if (this.glutenFree) {
      this.queryParams.glutenFree = true
    }
    this.changeParams.emit(this.queryParams)
  }
}

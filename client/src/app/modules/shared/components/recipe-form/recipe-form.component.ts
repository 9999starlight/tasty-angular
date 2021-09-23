import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss']
})
export class RecipeFormComponent implements OnInit {
  isLoading = false;
  message = '';
  messageStatus = false;

  dishTypeOptions = [
    'Select Dish Type',
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
  filename = '';
  recipeImage = '';
  preview = null;
  mealName = '';
  intro = '';
  timing = 1;
  persons = 1;
  regional = '';
  vegetarian = false;
  glutenFree = false;
  preloadedDishType = 0;
  preloadedLevel = 0;
  ingredients = [{ ingredient: '', amount: '' }];
  steps = [{ step: '' }];

  constructor() { }

  ngOnInit(): void {
  }

  onClear(msg: string) {
    this.message = msg;
  }

  // timing
  decreaseTiming() {
    this.timing >= 2 ? this.timing-- : (this.timing = 1);
  }

  increaseTiming() {
    this.timing++
  }

  decreasePersons() {
    this.persons >= 2 ? this.persons-- : this.persons = 1;
  }

  increasePersons() {
    this.persons++
  }

  addIngredient() {
    this.ingredients.push({
      ingredient: '',
      amount: ''
    })
  }

  removeIngredient(index: number) {
    this.ingredients.splice(index, 1)
  }

  addStep() {
    this.steps.push({ step: '' })
  }

  removeStep(index: number) {
    this.steps.splice(index, 1)
  }
}

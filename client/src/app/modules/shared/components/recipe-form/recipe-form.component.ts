import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UIService } from '../../sharedServices/ui.service';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { RecipesService } from '../../sharedServices/recipes.service';
import { SingleRecipe } from 'src/app/types/SingleRecipe';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss']
})
export class RecipeFormComponent implements OnInit {
  isLoading = false;
  message = '';
  messageStatus = false;
  recipe: SingleRecipe | null = null;
  userId!: string | undefined;

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
  preview: any = '';

  // form
  /*  mealName = ''; */
  intro = '';
  dishType = '';
  level = '';
  timing = 1;
  persons = 1;
  regional = '';
  vegetarian = false;
  glutenFree = false;
  preloadedDishType = 0;
  preloadedLevel = 0;
  recipeImage = '';
  ingredients: any = [{ ingredient: '', amount: '' }];
  steps: any = [{ step: '' }];

  //recipeForm!: FormGroup;
  recipeForm = new FormGroup({
    mealName: new FormControl('', [Validators.required,
    Validators.minLength(4),
    Validators.maxLength(50)]),
    intro: new FormControl('', [Validators.required, Validators.minLength(4),
    Validators.maxLength(150)]),
    /* 
      level = '';
      timing = 1;
      persons = 1;
      regional = '';
      vegetarian = false;
      glutenFree = false;
      preloadedDishType = 0;
      preloadedLevel = 0;
      recipeImage = '';
      ingredients: any = [{ ingredient: '', amount: '' }];
      steps: any = [{ step: '' }]; */
  })

  constructor(private authService: AuthService, public uiService: UIService) {
    this.userId = this.authService.user?.userId;
  }


  ngOnInit(): void {
  }

  setForm() {

  }

  onClear(msg: string) {
    this.message = msg;
  }

  addIngredient() {
    /* this.ingredients.push({
      ingredient: '',
      amount: ''
    }) */
  }

  removeIngredient(index: number) {
    /* this.ingredients.splice(index, 1) */
  }

  addStep() {
    /* this.steps.push({ step: '' }) */
  }

  removeStep(index: number) {
    /* this.steps.splice(index, 1) */
  }

  uploadFile(value: any): void {
    const file = (value.target as HTMLInputElement)?.files?.[0];
    this.filename = file!.name;
    /* this.form.patchValue({
      avatar: file
    });
    this.form.get('avatar').updateValueAndValidity() */

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    }
    reader.readAsDataURL(file!)

    console.log(this.preview)
  }

  /*   configureFormData() {
      const formData = new FormData()
      if (this.recipeImage) {
        formData.append('image', this.recipeImage)
      }
      formData.append('mealName', this.mealName)
      if (!this.uiService.editState) {
        formData.append('author', this.userId as any)
      }
      formData.append('intro', this.intro)
      formData.append('dishType', this.dishType)
      formData.append('level', this.level)
      formData.append('timing', this.timing as any)
      formData.append('persons', this.persons as any)
      if (this.regional) {
        formData.append('regional', this.regional)
      }
      formData.append('vegetarian', this.vegetarian as any)
      formData.append('glutenFree', this.glutenFree as any)
      // form data - append arrays of objects (ingredients and steps)
      for (let i = 0; i < this.ingredients.length; i++) {
        for (let prop in this.ingredients[i]) {
          formData.append(
            `ingredients[${i}][${prop}]`,
            this.ingredients[i][prop]
          )
        }
      }
      for (let i = 0; i < this.steps.length; i++) {
        for (let prop in this.steps[i]) {
          formData.append(`steps[${i}][${prop}]`, this.steps[i][prop])
        }
      }
      return formData
    } */

  onRecipeSubmit() {
    /* if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    } */
  }
}

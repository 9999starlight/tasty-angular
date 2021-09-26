import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { UIService } from '../../sharedServices/ui.service';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { RecipesService } from '../../sharedServices/recipes.service';
import { SingleRecipe } from 'src/app/types/SingleRecipe';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss'],
})
export class RecipeFormComponent implements OnInit {
  isLoading = false;
  message = '';
  messageStatus = false;
  userId!: string | undefined;
  recipeForm!: FormGroup;
  singleRecipe!: SingleRecipe;

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
    'Snack',
  ];
  difficultyOptions = ['Easy', 'Medium', 'Hard'];
  filename = '';
  preview: any = '';

  /*ingredients: any = [{ ingredient: '', amount: '' }];
  steps: any = [{ step: '' }];*/

  
  constructor(
    private authService: AuthService,
    public uiService: UIService,
    public recipeService: RecipesService
  ) {
    this.userId = this.authService.user?.userId;
    //this.singleRecipe = this.recipeService.singleRecipe
  }
  get ingredientsControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  get stepsControl() {
    return (this.recipeForm.get('steps') as FormArray).controls;
  }
  ngOnInit(): void {
    this.formSetup()
    if (!this.uiService.editState) {
      this.addIngredient();
      this.addStep();
    }
  }

  formSetup() {
    let mealName = '';
    let intro = '';
    let dishType = '';
    let level = '';
    let timing = 1;
    let persons = 1;
    let regional = '';
    let vegetarian = false;
    let glutenFree = false;
    let image = '';
    let ingredients = new FormArray([], [Validators.required]);
    let steps = new FormArray([], [Validators.required]);

    if (this.uiService.editState) {
      console.log(this.singleRecipe)
      mealName = this.singleRecipe!.mealName;
      intro = this.singleRecipe!.intro;
      dishType = this.singleRecipe!.dishType;
      if(this.singleRecipe!.level) {
        level = this.singleRecipe!.level;
      }
      timing = this.singleRecipe!.timing;
      persons = this.singleRecipe!.persons;
      if(this.singleRecipe!.regional) {
        regional = this.singleRecipe!.regional;
      }
      if(this.singleRecipe!.vegetarian) {
        vegetarian = this.singleRecipe!.vegetarian;
      }
      if(this.singleRecipe!.glutenFree){
        glutenFree = this.singleRecipe!.glutenFree;
      }
      if(this.singleRecipe!.image) {
        image = this.singleRecipe.image.url;
      }

      // ingredients
      for (let ingred of this.singleRecipe!.ingredients) {
        ingredients.push(
          new FormGroup({
            ingredient: new FormControl(ingred.ingredient, Validators.required),
            amount: new FormControl(ingred.amount),
          })
        );
      }
      // steps
      for (let st of this.singleRecipe!.steps) {
        steps.push(
          new FormGroup({
            step: new FormControl(st.step, Validators.required),
          })
        );
      }
    }

    this.recipeForm = new FormGroup({
      mealName: new FormControl(mealName, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50),
      ]),
      intro: new FormControl(intro, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(150),
      ]),
      dishType: new FormControl(dishType, [Validators.required]),
      level: new FormControl(level),
      timing: new FormControl(timing, [
        Validators.required,
        Validators.pattern(/^[1-9]|([1-9][0-9]+?)$/),
        Validators.min(1),
      ]),
      persons: new FormControl(persons, [
        Validators.required,
        Validators.pattern(/^[1-9]|([1-9][0-9]+?)$/),
        Validators.min(1),
      ]),
      regional: new FormControl(regional),
      vegetarian: new FormControl(vegetarian),
      glutenFree: new FormControl(glutenFree),
      image: new FormControl(image),
      ingredients: ingredients,
      steps: steps
    });
  }

  onClear(msg: string) {
    this.message = msg;
  }

  increaseTiming() {
    this.recipeForm.patchValue({
      timing: this.recipeForm.get('timing')!.value + 1,
    });
  }

  decreaseTiming() {
    let calculateTiming =
      this.recipeForm.get('timing')!.value > 1
        ? this.recipeForm.get('timing')!.value - 1
        : 1;
    this.recipeForm.patchValue({
      timing: calculateTiming,
    });
  }

  increasePersons() {
    this.recipeForm.patchValue({
      persons: this.recipeForm.get('persons')!.value + 1,
    });
  }

  decreasePersons() {
    let calculatePersons =
      this.recipeForm.get('persons')!.value > 1
        ? this.recipeForm.get('persons')!.value - 1
        : 1;
    this.recipeForm.patchValue({
      persons: calculatePersons,
    });
  }

  addIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        ingredient: new FormControl('', Validators.required),
        amount: new FormControl(''),
      })
    );
  }

  removeIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  addStep() {
    (<FormArray>this.recipeForm.get('steps')).push(
      new FormGroup({
        step: new FormControl('', Validators.required),
      })
    );
  }

  removeStep(index: number) {
    (<FormArray>this.recipeForm.get('steps')).removeAt(index);
  }

  uploadFile(value: any): void {
    const file = (value.target as HTMLInputElement)?.files?.[0];
    this.filename = file!.name;
     this.recipeForm.patchValue({
      image: file
    });
    //this.recipeForm.get('image').updateValueAndValidity() 

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    };
    reader.readAsDataURL(file!);

    console.log(this.preview);
  }

  removeSelectedImage() {}

     /*configureFormData() {
      const formData = new FormData()
      if (this.image) {
        formData.append('image', this.image)
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
    console.log(this.recipeForm.value);
    if(this.recipeForm.invalid) {
      this.messageStatus = false;
      this.message = 'Please fill all required fields marked with *'
    }
    
    //console.log(this.configureFormData())


    /* if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    } */
  }
}

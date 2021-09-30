import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { UIService } from '../../sharedServices/ui.service';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { RecipesService } from '../../sharedServices/recipes.service';
import { ImageValidatorService } from '../../sharedServices/image-validator.service';
import { SingleRecipe } from 'src/app/types/SingleRecipe';
import { Router } from '@angular/router';

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
  @Input() singleRecipe!: SingleRecipe;
  imgMessage = '';

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

  constructor(
    private authService: AuthService,
    public uiService: UIService,
    public recipeService: RecipesService,
    private el: ElementRef,
    public imgValidator: ImageValidatorService,
    private router: Router
  ) {
    this.userId = this.authService.user?.userId;
  }

  get ingredientsControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  get stepsControl() {
    return (this.recipeForm.get('steps') as FormArray).controls;
  }

  ngOnInit(): void {
    // console.log(this.singleRecipe)
    this.formSetup();
    if (!this.uiService.editState) {
      this.addIngredient();
      this.addStep();
    } else {
      console.log('from form: ', this.singleRecipe)
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

    if (this.uiService.editState && this.singleRecipe) {
      // console.log(this.singleRecipe)
      mealName = this.singleRecipe.mealName;
      intro = this.singleRecipe.intro;
      dishType = this.singleRecipe!.dishType;
      if (this.singleRecipe.level) {
        level = this.singleRecipe.level;
      }
      timing = this.singleRecipe.timing;
      persons = this.singleRecipe.persons;
      if (this.singleRecipe.regional) {
        regional = this.singleRecipe.regional;
      }
      if (this.singleRecipe!.vegetarian) {
        vegetarian = this.singleRecipe.vegetarian;
      }
      if (this.singleRecipe!.glutenFree) {
        glutenFree = this.singleRecipe.glutenFree;
      }
      if (this.singleRecipe.image) {
        image = this.singleRecipe.image.url;
      }

      // ingredients
      for (let ingred of this.singleRecipe.ingredients) {
        ingredients.push(
          new FormGroup({
            ingredient: new FormControl(ingred.ingredient, Validators.required),
            amount: new FormControl(ingred.amount),
          })
        );
      }
      // steps
      for (let st of this.singleRecipe.steps) {
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
      /* image: new FormControl(image, [this.imgValidator.imageTypeValidation, this.imgValidator.imageSizeValidation]), */
      image: new FormControl(image),
      ingredients: ingredients,
      steps: steps
    });
  }

  onClear(msg: string) {
    this.message = msg;
    this.imgMessage = msg;
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
    console.log(this.imgValidator.typeValidation(file))
    /* if(file && this.imgValidator.typeValidation(file)) { */
    if (!this.imgValidator.typeValidation(file)) {
      this.imgMessage = 'Unsupported file! Please check image format and size';
      this.removeSelectedImage();
      return;
    }
    //this.imgMessage = '';
    this.filename = file!.name;
    this.recipeForm.patchValue({
      image: file
    });
    this.recipeForm.get('image')!.updateValueAndValidity()

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    };
    reader.readAsDataURL(file!);

    console.log(this.preview);
    //}

  }

  removeSelectedImage() {
    const fileInput = this.el.nativeElement.querySelector('#recipeImage-w');
    fileInput.value = '';
    //console.log(fileInput)
    this.filename = '';
    this.preview = null;
    this.recipeForm.patchValue({
      image: ''
    });
  }

  configureFormData() {
    const formData = new FormData()
    if (this.recipeForm.value.image) {
      formData.append('image', this.recipeForm.value.image)
    }
    formData.append('mealName', this.recipeForm.value.mealName)
    if (!this.uiService.editState) {
      formData.append('author', this.userId as any)
    }
    formData.append('intro', this.recipeForm.value.intro)
    formData.append('dishType', this.recipeForm.value.dishType)
    formData.append('level', this.recipeForm.value.level)
    formData.append('timing', this.recipeForm.value.timing as any)
    formData.append('persons', this.recipeForm.value.persons as any)
    if (this.recipeForm.value.regional) {
      formData.append('regional', this.recipeForm.value.regional)
    }
    formData.append('vegetarian', this.recipeForm.value.vegetarian as any)
    formData.append('glutenFree', this.recipeForm.value.glutenFree as any)
    // form data - append arrays of objects (ingredients and steps)
    for (let i = 0; i < this.recipeForm.value.ingredients.length; i++) {
      for (let prop in this.recipeForm.value.ingredients[i]) {
        formData.append(
          `ingredients[${i}][${prop}]`,
          this.recipeForm.value.ingredients[i][prop]
        )
      }
    }
    for (let i = 0; i < this.recipeForm.value.steps.length; i++) {
      for (let prop in this.recipeForm.value.steps[i]) {
        formData.append(`steps[${i}][${prop}]`, this.recipeForm.value.steps[i][prop])
      }
    }

    return formData
  }

  onRecipeSubmit() {
    this.isLoading = true;
    if (this.recipeForm.invalid) {
      this.recipeForm.markAllAsTouched();
      this.isLoading = false;
      this.messageStatus = false;
      this.message = 'Please check and fill in required fields'
      return
    }
    const fd = this.configureFormData()
    // fd check
    /* for (const [key, value] of fd.entries()) {
      console.log(key, value);
    } */

    if (this.uiService.editState) {
      this.recipeService.updateRecipe(this.singleRecipe!._id, fd).subscribe((res: any) => {
        if (res) {
          // console.log(res);
          this.isLoading = false;
          this.messageStatus = true;
          this.message = res.message;
          this.uiService.toggleEditState(false);
          this.router.navigate([`recipe/${res.updatedRecipe._id}`]);
        }
      }, error => {
        this.isLoading = false;
        this.messageStatus = false;
        this.message = `Error: ${error.statusText}`;
        console.log(error.statusText);
      });
    } else {
      this.recipeService.createRecipe(fd).subscribe((res: any) => {
        if (res) {
          // console.log(res); 
          this.authService.updateUser(res.updatedUser);
          this.isLoading = false;
          this.messageStatus = true;
          this.message = res.message;
          this.router.navigate([`recipe/${res.createdRecipe._id}`]);
        }
      }, error => {
        this.isLoading = false;
        this.messageStatus = false;
        this.message = `Error: ${error.statusText}`;
        console.log(error.statusText);
      });
    }
  }
}

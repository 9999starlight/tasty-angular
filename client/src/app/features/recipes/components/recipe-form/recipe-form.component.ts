import { Component, ElementRef, inject, Input, OnDestroy } from '@angular/core';
import { SingleRecipe } from '../../models/single-recipe.model';
import { Icons } from '../../../../shared/ui/icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TooltipComponent } from '../../../../shared/components/tooltip/tooltip.component';
import { InfoMessageComponent } from '../../../../shared/components/info-message/info-message.component';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UiService } from '../../../../shared/services/ui.service';
import { ImageValidatorService } from '../../../../shared/services/image-validator.service';
import { RecipesFacade } from '../../facade/recipes.facade';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import {
  IngredientFormGroup,
  RecipeFormGroup,
  RecipeFormInitData,
  StepFormGroup,
} from '../../models/recipe-form.model';
import { DIFFICULTY_OPTIONS, DISH_TYPE_OPTIONS } from '../../../../core/constants/recipes/recipe-options';
import {
  createIngredientForm,
  createIngredientsArray,
  createRecipeFormControls,
  createStepForm,
  createStepsArray,
} from './recipe-form-config';

@Component({
  selector: 'app-recipe-form',
  imports: [FontAwesomeModule, TooltipComponent, InfoMessageComponent, ReactiveFormsModule, LoaderComponent],
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.scss',
})
export class RecipeFormComponent implements OnDestroy {
  @Input() singleRecipe: SingleRecipe | null = null;
  @Input() userId: string | undefined;
  readonly icons = Icons;
  uiService = inject(UiService);
  private el = inject(ElementRef);
  imgValidator = inject(ImageValidatorService);
  private recipesFacade = inject(RecipesFacade);

  isLoading = false;
  message = '';
  messageStatus = false;
  recipeForm!: RecipeFormGroup;
  imgMessage = '';
  dishTypeOptions = DISH_TYPE_OPTIONS;
  difficultyOptions = DIFFICULTY_OPTIONS;
  filename = '';
  preview: any = '';
  private previewObjectUrl: string | null = null;

  get ingredientsControls() {
    return this.recipeForm.controls.ingredients.controls;
  }

  get stepsControl() {
    return this.recipeForm.controls.steps.controls;
  }

  ngOnInit(): void {
    this.formSetup();
  }

  createIngredient(): IngredientFormGroup {
    return createIngredientForm();
  }

  createStep(): StepFormGroup {
    return createStepForm();
  }

  private getRecipeFormInitData(isEditState: boolean): RecipeFormInitData {
    if (!isEditState || !this.singleRecipe) {
      return {
        mealName: '',
        intro: '',
        dishType: '',
        level: '',
        timing: 1,
        persons: 1,
        regional: '',
        vegetarian: false,
        glutenFree: false,
        image: '',
        ingredients: [{ ingredient: '', amount: '' }],
        steps: [{ step: '' }],
      };
    }

    return {
      mealName: this.singleRecipe.mealName,
      intro: this.singleRecipe.intro,
      dishType: this.singleRecipe.dishType,
      level: this.singleRecipe.level ?? '',
      timing: this.singleRecipe.timing,
      persons: this.singleRecipe.persons,
      regional: this.singleRecipe.regional ?? '',
      vegetarian: this.singleRecipe.vegetarian ?? false,
      glutenFree: this.singleRecipe.glutenFree ?? false,
      image: this.singleRecipe.image?.url ?? '',
      ingredients: this.singleRecipe.ingredients.map((ingredient) => ({
        ingredient: ingredient.ingredient,
        amount: ingredient.amount ?? '',
      })),
      steps: this.singleRecipe.steps.map((step) => ({
        step: step.step,
      })),
    };
  }

  formSetup() {
    const isEditState = this.uiService.isEditState();
    const data = this.getRecipeFormInitData(isEditState);
    const ingredients: FormArray<IngredientFormGroup> = createIngredientsArray(data.ingredients);
    const steps: FormArray<StepFormGroup> = createStepsArray(data.steps);

    this.recipeForm = new FormGroup({
      ...createRecipeFormControls({
        mealName: data.mealName,
        intro: data.intro,
        dishType: data.dishType,
        level: data.level,
        timing: data.timing,
        persons: data.persons,
        regional: data.regional,
        vegetarian: data.vegetarian,
        glutenFree: data.glutenFree,
        image: data.image,
      }),
      ingredients: ingredients,
      steps: steps,
    });
  }

  onClear(msg: string) {
    this.message = msg;
    this.imgMessage = msg;
  }

  increaseTiming() {
    const currentTiming = this.recipeForm.controls.timing.value ?? 1;
    this.recipeForm.patchValue({
      timing: currentTiming + 1,
    });
  }

  decreaseTiming() {
    const currentTiming = this.recipeForm.controls.timing.value ?? 1;
    let calculateTiming =
      currentTiming > 1
        ? currentTiming - 1
        : 1;
    this.recipeForm.patchValue({
      timing: calculateTiming,
    });
  }

  increasePersons() {
    const currentPersons = this.recipeForm.controls.persons.value ?? 1;
    this.recipeForm.patchValue({
      persons: currentPersons + 1,
    });
  }

  decreasePersons() {
    const currentPersons = this.recipeForm.controls.persons.value ?? 1;
    let calculatePersons =
      currentPersons > 1
        ? currentPersons - 1
        : 1;
    this.recipeForm.patchValue({
      persons: calculatePersons,
    });
  }

  addIngredient() {
    this.recipeForm.controls.ingredients.push(this.createIngredient());
  }

  removeIngredient(index: number) {
    this.recipeForm.controls.ingredients.removeAt(index);
  }

  addStep() {
    this.recipeForm.controls.steps.push(this.createStep());
  }

  removeStep(index: number) {
    this.recipeForm.controls.steps.removeAt(index);
  }

  uploadFile(value: any): void {
    const file = (value.target as HTMLInputElement)?.files?.[0];
    //console.log(this.imgValidator.typeValidation(file));
    if (!file || !this.imgValidator.typeValidation(file)) {
      this.imgMessage = 'Unsupported file! Please check image format and size';
      this.removeSelectedImage();
      return;
    }
    //this.imgMessage = '';
    this.filename = file.name;
    this.recipeForm.patchValue({
      image: file,
    });
    this.recipeForm.get('image')!.updateValueAndValidity();

    // Generate local preview URL for the selected file.
    if (this.previewObjectUrl) {
      URL.revokeObjectURL(this.previewObjectUrl);
    }

    this.previewObjectUrl = URL.createObjectURL(file);
    this.preview = this.previewObjectUrl;

    //console.log(this.preview);
  }

  removeSelectedImage() {
    const fileInput = this.el.nativeElement.querySelector('#recipeImage-w');
    fileInput.value = '';
    //console.log(fileInput)
    this.filename = '';
    this.preview = null;
    if (this.previewObjectUrl) {
      URL.revokeObjectURL(this.previewObjectUrl);
      this.previewObjectUrl = null;
    }
    this.recipeForm.patchValue({
      image: '',
    });
  }

  configureFormData() {
    const formData = new FormData();
    const formValue = this.recipeForm.getRawValue();

    if (formValue.image && this.el.nativeElement.querySelector('#recipeImage-w').value) {
      formData.append('image', formValue.image);
    }
    formData.append('mealName', formValue.mealName ?? '');
    if (!this.uiService.isEditState()) {
      formData.append('author', this.userId as any);
    }
    formData.append('intro', formValue.intro ?? '');
    formData.append('dishType', formValue.dishType ?? '');
    formData.append('level', formValue.level ?? '');
    formData.append('timing', String(formValue.timing ?? 1));
    formData.append('persons', String(formValue.persons ?? 1));
    if (formValue.regional) {
      formData.append('regional', formValue.regional);
    }
    formData.append('vegetarian', String(formValue.vegetarian ?? false));
    formData.append('glutenFree', String(formValue.glutenFree ?? false));
    // form data - append arrays of objects (ingredients and steps)
    for (let i = 0; i < formValue.ingredients.length; i++) {
      const ingredient = formValue.ingredients[i];
      formData.append(`ingredients[${i}][ingredient]`, ingredient.ingredient ?? '');
      formData.append(`ingredients[${i}][amount]`, String(ingredient.amount ?? ''));
    }
    for (let i = 0; i < formValue.steps.length; i++) {
      const step = formValue.steps[i];
      formData.append(`steps[${i}][step]`, step.step ?? '');
    }

    return formData;
  }

  onRecipeSubmit() {
    this.isLoading = true;
    if (this.recipeForm.invalid) {
      this.recipeForm.markAllAsTouched();
      this.isLoading = false;
      this.messageStatus = false;
      this.message = 'Please check and fill in required fields';
      return;
    }
    const fd = this.configureFormData();
    // fd check
    /* for (const [key, value] of fd.entries()) {
      console.log(key, value);
    } */

    if (this.uiService.isEditState() && this.singleRecipe) {
      this.recipesFacade.updateRecipe$(this.singleRecipe._id, fd);
    } else {
      this.recipesFacade.createRecipe$(fd);
    }
  }

  ngOnDestroy() {
    if (this.previewObjectUrl) {
      URL.revokeObjectURL(this.previewObjectUrl);
      this.previewObjectUrl = null;
    }
    this.uiService.toggleEditState(false);
  }
}

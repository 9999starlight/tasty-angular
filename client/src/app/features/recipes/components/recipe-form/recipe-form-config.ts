import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  IngredientFormGroup,
  IngredientFormValue,
  StepFormGroup,
  StepFormValue,
} from '../../models/recipe-form.model';

export const FORM_VALIDATORS = {
  mealName: [Validators.required, Validators.minLength(4), Validators.maxLength(50)],
  intro: [Validators.required, Validators.minLength(4), Validators.maxLength(150)],
  dishType: [Validators.required],
  timing: [
    Validators.required,
    Validators.pattern(/^[1-9]|([1-9][0-9]+?)$/),
    Validators.min(1),
  ],
  persons: [
    Validators.required,
    Validators.pattern(/^[1-9]|([1-9][0-9]+?)$/),
    Validators.min(1),
  ],
  ingredient: [Validators.required],
  amount: [Validators.required],
  step: [Validators.required],
  ingredientsArray: [Validators.required],
  stepsArray: [Validators.required],
};

export type RecipeFormControlValues = {
  mealName?: string;
  intro?: string;
  dishType?: string;
  level?: string;
  timing?: number;
  persons?: number;
  regional?: string;
  vegetarian?: boolean;
  glutenFree?: boolean;
  image?: File | string | null;
};

export function createIngredientForm(
  ingredient = '',
  amount: string | number | null = ''
): IngredientFormGroup {
  return new FormGroup({
    ingredient: new FormControl(ingredient, FORM_VALIDATORS.ingredient),
    amount: new FormControl<string | number | null>(amount, FORM_VALIDATORS.amount),
  });
}

export function createStepForm(step = ''): StepFormGroup {
  return new FormGroup({
    step: new FormControl(step, FORM_VALIDATORS.step),
  });
}

export function createIngredientsArray(
  values: IngredientFormValue[] = []
): FormArray<IngredientFormGroup> {
  const controls = values.map((item) => createIngredientForm(item.ingredient, item.amount));
  return new FormArray<IngredientFormGroup>(controls, FORM_VALIDATORS.ingredientsArray);
}

export function createStepsArray(
  values: StepFormValue[] = []
): FormArray<StepFormGroup> {
  const controls = values.map((item) => createStepForm(item.step));
  return new FormArray<StepFormGroup>(controls, FORM_VALIDATORS.stepsArray);
}

export function createRecipeFormControls(values: RecipeFormControlValues = {}) {
  return {
    mealName: new FormControl(values.mealName ?? '', FORM_VALIDATORS.mealName),
    intro: new FormControl(values.intro ?? '', FORM_VALIDATORS.intro),
    dishType: new FormControl(values.dishType ?? '', FORM_VALIDATORS.dishType),
    level: new FormControl(values.level ?? ''),
    timing: new FormControl(values.timing ?? 1, FORM_VALIDATORS.timing),
    persons: new FormControl(values.persons ?? 1, FORM_VALIDATORS.persons),
    regional: new FormControl(values.regional ?? ''),
    vegetarian: new FormControl(values.vegetarian ?? false),
    glutenFree: new FormControl(values.glutenFree ?? false),
    image: new FormControl<File | string | null>(values.image ?? ''),
  };
}

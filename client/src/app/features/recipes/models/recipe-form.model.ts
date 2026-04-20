import { FormArray, FormControl, FormGroup } from '@angular/forms';

export type IngredientFormGroup = FormGroup<{
  ingredient: FormControl<string | null>;
  amount: FormControl<string | number | null>;
}>;

export type StepFormGroup = FormGroup<{
  step: FormControl<string | null>;
}>;

export type IngredientFormValue = {
  ingredient: string;
  amount: string | number | null;
};

export type StepFormValue = {
  step: string;
};

export type RecipeFormInitData = {
  mealName: string;
  intro: string;
  dishType: string;
  level: string;
  timing: number;
  persons: number;
  regional: string;
  vegetarian: boolean;
  glutenFree: boolean;
  image: File | string | null;
  ingredients: IngredientFormValue[];
  steps: StepFormValue[];
};

export type RecipeFormGroup = FormGroup<{
  mealName: FormControl<string | null>;
  intro: FormControl<string | null>;
  dishType: FormControl<string | null>;
  level: FormControl<string | null>;
  timing: FormControl<number | null>;
  persons: FormControl<number | null>;
  regional: FormControl<string | null>;
  vegetarian: FormControl<boolean | null>;
  glutenFree: FormControl<boolean | null>;
  image: FormControl<File | string | null>;
  ingredients: FormArray<IngredientFormGroup>;
  steps: FormArray<StepFormGroup>;
}>;

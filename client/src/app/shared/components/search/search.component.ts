import { Component, inject, Input, output } from '@angular/core';
import { SearchParams } from '../models/search.model';
import { Icons } from '../../ui/icons';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { BASIC_OPTIONS, DIFFICULTY_OPTIONS, DISH_TYPE_OPTIONS } from '../../../core/constants/recipes/recipe-options';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

interface BasicSearchForm {
  searchValue: FormControl<string | null>;
  basicOption: FormControl<string | null>;
}

interface CategoriesSearchForm {
  dishType: FormControl<string | null>;
  difficulty: FormControl<string | null>;
  vegetarian: FormControl<boolean>;
  glutenFree: FormControl<boolean>;
}

@Component({
  selector: 'app-search',
  imports: [FontAwesomeModule, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {

  private fb = inject(FormBuilder);
  
  private readonly basicOptionMap = {
    'title': 'mealName',
    'ingredient': 'ingredients.ingredient'
  };

  private readonly categoriesFieldMap = {
    dishType: 'dishType',
    difficulty: 'level',
    vegetarian: 'vegetarian',
    glutenFree: 'glutenFree'
  } as const;

  basicOptions = BASIC_OPTIONS;
  dishTypeOptions = DISH_TYPE_OPTIONS;
  difficultyOptions = DIFFICULTY_OPTIONS;

  isResultsPage = false;
  queryParams: SearchParams = {};
  readonly changeParams = output<SearchParams>();
  @Input() isResultPage = false;
  icons = Icons;

  basicForm: FormGroup<BasicSearchForm> = this.fb.group({
    searchValue: [''],
    basicOption: [''],
  }) as FormGroup<BasicSearchForm>;

  categoriesForm: FormGroup<CategoriesSearchForm> = this.fb.group({
    dishType: [''],
    difficulty: [''],
    vegetarian: [false],
    glutenFree: [false],
  }) as FormGroup<CategoriesSearchForm>;

  basicSearch() {
    const { searchValue, basicOption } = this.basicForm.value;
    this.queryParams = this.buildBasicParams(basicOption ?? '', searchValue ?? '');
    // console.log('basic search params: ', this.queryParams);
    this.changeParams.emit(this.queryParams);
  }

  categoriesSearch() {
    const formValue = this.categoriesForm.getRawValue();
    this.queryParams = this.buildCategoriesParams(formValue);
    // console.log('categories search params: ', this.queryParams);
    this.changeParams.emit(this.queryParams);
  }

  private buildBasicParams(option: string, value: string): SearchParams {
    if (!option || !value) return {};
    const queryKey = this.basicOptionMap[option as keyof typeof this.basicOptionMap];
    return queryKey ? { [queryKey]: value.toLowerCase() } as SearchParams : {};
  }

  private buildCategoriesParams(formValue: { dishType: string | null; difficulty: string | null; vegetarian: boolean; glutenFree: boolean }): SearchParams {
    return Object.entries(formValue)
      .filter(([_, val]) => val)
      .reduce((acc, [key, val]) => {
        const queryKey = this.categoriesFieldMap[key as keyof typeof this.categoriesFieldMap];
        if (queryKey) {
          acc[queryKey as keyof SearchParams] = val as any;
        }
        return acc;
      }, {} as SearchParams);
  }
}

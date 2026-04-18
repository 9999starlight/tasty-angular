import { Injectable } from '@angular/core';
import { Recipe } from '../../features/recipes/models/recipe.entity';
import {
  sortDateAscending as sortDateAscendingUtil,
  sortDateDescending as sortDateDescendingUtil,
  sortRatingAscending as sortRatingAscendingUtil,
  sortRatingDescending as sortRatingDescendingUtil,
  sortTitleAscending as sortTitleAscendingUtil,
  sortTitleDescending as sortTitleDescendingUtil,
} from '../utils/sorting.utils';

@Injectable({
  providedIn: 'root',
})
export class SortingService {
  sortTitleAscending(arr: Recipe[]) {
    return sortTitleAscendingUtil(arr);
  }

  sortTitleDescending(arr: Recipe[]) {
    return sortTitleDescendingUtil(arr);
  }

  sortRatingAscending(arr: Recipe[]) {
    return sortRatingAscendingUtil(arr);
  }

  sortRatingDescending(arr: Recipe[]) {
    return sortRatingDescendingUtil(arr);
  }

  sortDateAscending(arr: Recipe[]) {
    return sortDateAscendingUtil(arr);
  }

  sortDateDescending(arr: Recipe[]) {
    return sortDateDescendingUtil(arr);
  }
}

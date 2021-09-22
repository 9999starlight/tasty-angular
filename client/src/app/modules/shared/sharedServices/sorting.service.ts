import { Injectable } from '@angular/core';
import { RecipeResponse } from 'src/app/types/RecipeResponse';

@Injectable({
  providedIn: 'root'
})
export class SortingService {

  constructor() { }

  sortTitleAscending(arr: RecipeResponse[]) {
    const sortedArr = arr.sort((a, b) =>
      a.mealName.toLowerCase().localeCompare(b.mealName.toLowerCase())
    )
    return sortedArr
  }

  sortTitleDescending(arr: RecipeResponse[]) {
    const sortedArr = arr.sort((a, b) =>
      b.mealName.toLowerCase().localeCompare(a.mealName.toLowerCase())
    )
    return sortedArr
  }

  sortRatingAscending(arr: RecipeResponse[]) {
    const sortedArr = arr.sort((a, b) => a.rating - b.rating)
    return sortedArr
  }

  sortRatingDescending(arr: RecipeResponse[]) {
    const sortedArr = arr.sort((a, b) => b.rating - a.rating)
    return sortedArr
  }

  sortDateAscending(arr: RecipeResponse[]) {
    const sortedArr = arr.sort(
      (a, b) => <any>new Date(a.createdAt) - <any>new Date(b.createdAt)
    )
    return sortedArr
  }//<any>new Date(b.createdAt) - <any>new Date(a.createdAt)

  sortDateDescending(arr: RecipeResponse[]) {
    const sortedArr = arr.sort(
      (a, b) => <any>new Date(b.createdAt) - <any>new Date(a.createdAt)
    )
    return sortedArr
  }
}


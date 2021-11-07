import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SortingService {
  constructor() {}

  sortTitleAscending(arr: any) {
    const sortedArr = arr.sort((a: any, b: any) =>
      a.mealName.toLowerCase().localeCompare(b.mealName.toLowerCase())
    );
    return sortedArr;
  }

  sortTitleDescending(arr: any) {
    const sortedArr = arr.sort((a: any, b: any) =>
      b.mealName.toLowerCase().localeCompare(a.mealName.toLowerCase())
    );
    return sortedArr;
  }

  sortRatingAscending(arr: any) {
    const sortedArr = arr.sort((a: any, b: any) => a.rating - b.rating);
    return sortedArr;
  }

  sortRatingDescending(arr: any) {
    const sortedArr = arr.sort((a: any, b: any) => b.rating - a.rating);
    return sortedArr;
  }

  sortDateAscending(arr: any) {
    const sortedArr = arr.sort(
      (a: any, b: any) =>
        <any>new Date(a.createdAt) - <any>new Date(b.createdAt)
    );
    return sortedArr;
  } //<any>new Date(b.createdAt) - <any>new Date(a.createdAt)

  sortDateDescending(arr: any) {
    const sortedArr = arr.sort(
      (a: any, b: any) =>
        <any>new Date(b.createdAt) - <any>new Date(a.createdAt)
    );
    return sortedArr;
  }
}

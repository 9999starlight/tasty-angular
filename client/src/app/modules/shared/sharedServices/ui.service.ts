import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UIService {
  isSearchShowed$ = new BehaviorSubject(false);
  isEditState$ = new BehaviorSubject(false);

  constructor() { }

  // show/hide Search Forms
  toggleSearchForm(payload: boolean) {
    this.isSearchShowed$.next(payload)
  }

  get searchForm(): boolean {
    return this.isSearchShowed$.value;
  }

  // edit state
  toggleEditState(payload: boolean) {
    this.isEditState$.next(payload)
  }

  get editState(): boolean {
    return this.isEditState$.value;
  }
}

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

  /* typeValidation(file: any): boolean {
    const ext = file.type.split('/')
    if (!ext[1].match(/jpg|jpeg|png|gif$/i)) {
      //this.valMessage = 'Unsupported file type!'
      return false
    } else if (file.size > 1024 * 1024 * 2) {
      //this.valMessage = 'File is larger than 2Mb!'
      return false
    } else {
      //this.valMessage = ''
      return true
    }
  } */
}

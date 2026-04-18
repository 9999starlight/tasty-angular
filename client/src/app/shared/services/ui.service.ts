import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UiService {
/*  isSearchShowed$ = new BehaviorSubject(false);
  isEditState$ = new BehaviorSubject(false);*/

  private _isSearchShown: WritableSignal<boolean>;
  readonly isSearchShowed: ReturnType<WritableSignal<boolean>['asReadonly']>;
  private _isEditState: WritableSignal<boolean>;
  readonly isEditState: ReturnType<WritableSignal<boolean>['asReadonly']>;

  constructor() {
    this._isSearchShown = signal(false);
    this.isSearchShowed = this._isSearchShown.asReadonly();
    this._isEditState = signal(false);
    this.isEditState = this._isEditState.asReadonly();
  }

  // show/hide Search Forms
  toggleSearchForm(payload: boolean) {
    this._isSearchShown.set(payload);
  }

/*  get searchForm(): boolean {
    return this.isSearchShowed$.value;
  }*/

  // edit state
  toggleEditState(payload: boolean) {
    this._isEditState.set(payload);
  }

/*  get editState(): boolean {
    return this.isEditState$.value;
  }*/
}

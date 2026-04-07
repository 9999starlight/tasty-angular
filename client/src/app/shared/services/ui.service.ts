import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UiService {
/*  isSearchShowed$ = new BehaviorSubject(false);
  isEditState$ = new BehaviorSubject(false);*/

  private readonly _isSearchShown = signal(false);
  readonly isSearchShowed = this._isSearchShown.asReadonly();
  private readonly _isEditState = signal(false);
  readonly isEditState = this._isEditState.asReadonly();

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

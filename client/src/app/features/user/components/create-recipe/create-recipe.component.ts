import { Component, inject } from '@angular/core';
import { RecipeFormComponent } from '../../../recipes/components/recipe-form/recipe-form.component';
import { UserFacade } from '../../facade/user.facade';
import { Observable } from 'rxjs';
import { CurrentUser, UpdatedUser } from '../../models/userTypes';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-create-recipe',
  imports: [RecipeFormComponent, AsyncPipe],
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.scss',
})
export class CreateRecipeComponent {
  private userFacade = inject(UserFacade);
  user$: Observable<CurrentUser | UpdatedUser | null>;

  constructor() {
    this.user$ = this.userFacade.currentUser$;
  }
}

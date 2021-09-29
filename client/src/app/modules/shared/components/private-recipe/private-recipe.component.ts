import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CurrentUser, UpdatedUser } from 'src/app/types/userTypes';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { RecipesService } from '../../sharedServices/recipes.service';
import { RecipeResponse } from 'src/app/types/RecipeResponse';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-private-recipe',
  templateUrl: './private-recipe.component.html',
  styleUrls: ['./private-recipe.component.scss']
})
export class PrivateRecipeComponent implements OnInit {
  @Input() recipe!: RecipeResponse;
  @Input() isUsersRecipes!: boolean;
  @Output() del = new EventEmitter();
  @Output() editing = new EventEmitter();
  @Output() updateFavorites = new EventEmitter();
  //user: CurrentUser | UpdatedUser;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;

  constructor(private authService: AuthService, private recipesService: RecipesService) {
    //this.user = this.authService.user!;
  }

  ngOnInit(): void {
    //console.log(this.faEdit)
  }

  /*  currentUserRecipes() { } */
  deleteFav(id: string) {
    this.updateFavorites.emit(id);
  }

  /* allUserRecipes(id: string) { } */

  editRecipe(id: string){
    this.editing.emit(id);
  }

  delete(id: string) {
    this.del.emit(id);
  }
}

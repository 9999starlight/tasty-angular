import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { RecipesService } from '../../shared/sharedServices/recipes.service';
import { CurrentUser, UpdatedUser } from 'src/app/types/userTypes';
@Component({
  selector: 'app-saved-recipes',
  templateUrl: './saved-recipes.component.html',
  styleUrls: ['./saved-recipes.component.scss']
})
export class SavedRecipesComponent implements OnInit {
  @Output() deletedFromFavorites = new EventEmitter();
  isLoading = true;
  user!: CurrentUser | UpdatedUser;
  savedRecipes = [];

  constructor(private authService: AuthService, private recipesService: RecipesService) {
    this.user = this.authService.user!;
  }

  ngOnInit(): void {
    this.fetchSavedRecipes();
  }

  fetchSavedRecipes() {
    if (!this.user.favorites.length) {
      this.isLoading = false;
      return;
    }
    this.recipesService.getRecipesByQuery({
      _id: this.user.favorites
    }).subscribe((res) => {
      if (res) {
        this.isLoading = false;
        this.savedRecipes = JSON.parse(JSON.stringify(res));
        console.log(this.savedRecipes);
      }
    }, error => {
      this.isLoading = false;
      console.log(error.statusText);
    });
  }

  currentUserFavorites() { }

}

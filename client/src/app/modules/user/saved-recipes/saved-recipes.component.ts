import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { RecipesService } from '../../shared/sharedServices/recipes.service';
import { SortingService } from '../../shared/sharedServices/sorting.service';
import { CurrentUser, UpdatedUser } from 'src/app/types/userTypes';
@Component({
  selector: 'app-saved-recipes',
  templateUrl: './saved-recipes.component.html',
  styleUrls: ['./saved-recipes.component.scss']
})
export class SavedRecipesComponent implements OnInit {
  @Output() deletedFromFavorites = new EventEmitter();
  isLoading = true;
  savedRecipes = [];

  constructor(public authService: AuthService, private recipesService: RecipesService, public sortingService: SortingService) {}

  ngOnInit(): void {
    this.fetchSavedRecipes();
    console.log(this.authService.user, console.log(this.savedRecipes))
  }

  fetchSavedRecipes() {
    if(!this.authService.user?.favorites.length) {
      this.isLoading = false;
      return
    }
    this.isLoading = true;
    this.recipesService.getRecipesByQuery({
      _id: this.authService.user?.favorites
    }).subscribe((res) => {
      if (res) {
        console.log('res: ', res)
        //this.savedRecipes = [];
        this.isLoading = false;
        this.savedRecipes = JSON.parse(JSON.stringify(res));
        console.log(this.savedRecipes);
      }
    }, error => {
      this.isLoading = false;
      console.log(error.statusText);
    });
  }

  removeFromFavorites(id: string) {
    if (confirm('Remove from your saved recipes?')) {
      this.authService.deleteFromFavorites(id).subscribe((res: any) => {
        if (res) {
          console.log(res);
          this.authService.updateUser(res.updatedUser);
          this.savedRecipes = [];
          this.fetchSavedRecipes()
          console.log('user:', this.authService.user!)
        }
      }, error => {
        console.log(error.statusText);
      });
    }
  }
}

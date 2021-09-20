import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { CurrentUser, UpdatedUser } from 'src/app/types/userTypes';
import { RecipeResponse } from 'src/app/types/RecipeResponse';
import { RecipesService } from '../../shared/sharedServices/recipes.service';

@Component({
  selector: 'app-user-recipes',
  templateUrl: './user-recipes.component.html',
  styleUrls: ['./user-recipes.component.scss']
})
export class UserRecipesComponent implements OnInit {
  user: CurrentUser | UpdatedUser;
  isLoading = true;
  userRecipes = [];


  constructor(private authService: AuthService, private recipesService: RecipesService) {
    this.user = this.authService.user!;
  }

  ngOnInit(): void {
    this.fetchUserRecipes();
  }

  fetchUserRecipes() {
    if(!this.user.createdRecipes.length) {
      this.isLoading = false;
      return;
    }
    this.recipesService.getRecipesByQuery({ author: this.user.userId }).subscribe((res) => {
      if(res) {
        this.isLoading = false;
        this.userRecipes = JSON.parse(JSON.stringify(res));
        console.log(this.userRecipes); 
      }
    }, error => {
      this.isLoading = false;
      console.log(error.statusText);
    });
  }

  editingStateSettings(){}
  currentUserRecipes(){}


}

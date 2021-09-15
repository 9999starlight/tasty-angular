import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CurrentUser } from 'src/app/types/userTypes';
import { Rate } from 'src/app/types/SingleRecipe';
import { AuthService } from '../../auth/auth.service';
import { RecipesService } from '../../shared/sharedServices/recipes.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
})
export class RecipeComponent implements OnInit {
  recipe: any;
  ratedByUser: Rate[] | [] = [];
  isSavingEnabled = false;
  isRatingEnabled = true;
  isLoading = false;
  infoMessage = '';
  msgStatus = false;

  // user state
  isLogged$: BehaviorSubject<boolean | null>;
  currentUser$: BehaviorSubject<CurrentUser | null>;

  //disableRecipeSaving: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private recipesService: RecipesService,
    private router: Router
  ) {

    // resolver
    this.route.data.subscribe(({ recipe }) => {
      this.recipe = recipe;
    });
    this.isLogged$ = this.authService.isLogged$.getValue();
    this.currentUser$ = this.authService.currentUser$;
  }

  ngOnInit(): void {
    //this.recipesService.singleRecipe$.subscribe(val => console.log('recipe state: ', val))
    console.log('user in recipe: ', this.currentUser$.value, this.isLogged$);
    console.log(this.recipe);
    this.checkRatedBy();
    this.enableSaving();
    this.enableRating();
    console.log(this.ratedByUser);
  }

  enableSaving() {
    if (!this.isLogged$) {
      this.isSavingEnabled = true;
    }
    const checkUserFavorites: string[] | [] | undefined =
      this.currentUser$.value?.favorites.filter(
        (fav: string) => fav === this.recipe._id
      );
    //console.log(checkUserFavorites);
    if (checkUserFavorites !== undefined && checkUserFavorites.length) {
      this.isSavingEnabled = false;
    } else {
      this.isSavingEnabled = true;
    }
  }

  checkRatedBy() {
    if (this.isLogged$) {
      /*console.log(
        'user id chackratedby: ',
        this.currentUser$.value?.userId,
        this.recipe.rates
      );*/
      this.ratedByUser = this.recipe.rates.filter(
        (rate: any) => rate.ratedBy == this.currentUser$.value?.userId
      );
    } else {
      this.ratedByUser = [];
    }
  }

  enableRating() {
    if (!this.isLogged$) {
      this.isRatingEnabled = true;
    }
    if (
      this.isLogged$ &&
      (this.recipe.author._id === this.currentUser$.value?.userId ||
        this.ratedByUser.length)
    ) {
      this.isRatingEnabled = false;
    } else {
      this.isRatingEnabled = true;
    }
  }

  userRate(): number | null {
    if (
      this.isLogged$ &&
      this.recipe.author.userId !== this.currentUser$.value?.userId &&
      this.ratedByUser.length
    ) {
      return this.ratedByUser[0].rate;
    } else {
      return null;
    }
  }

  onClear(msg: string) {
    this.infoMessage = msg;
  }

  updateMsgHandler(msg: string) {
    this.infoMessage = msg;
  }

  updateMsgStatusHandler(status: boolean) {
    this.msgStatus = status;
  }

  updateRecipeHandler(rateVal: number) {
    this.recipesService.updateRating(this.recipe._id, rateVal).subscribe((res: any) => {
      if (res) {
        this.updateMsgStatusHandler(true);
        this.updateMsgHandler('Recipe has been rated');
        this.getNewData(this.recipe._id);
      }
    })
  }

  getNewData(id: string) {
    this.recipesService.getSingleRecipe(id).subscribe((res: any) => {
      if (res) {
        this.recipe = res;
        this.checkRatedBy();
        this.enableRating();
        console.log(this.recipe)
      }

    }, (error: any) => {
      this.isLoading = false;
      this.infoMessage = `Error: ${error.statusText}`;
      console.log(error.statusText);
    });
  }

  /* updateFavorites(this.currentUser$.value?.userId, this.recipeId: string) {
    
  } */
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CurrentUser } from 'src/app/types/userTypes';
import { Rate } from 'src/app/types/SingleRecipe';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
})
export class RecipeComponent implements OnInit {
  recipe: any;
  ratedByUser: Rate[] | [] = [];
  isSavingEnabled: boolean = false;
  isRatingEnabled: boolean = true;
  isLoading: boolean = false;

  // user state
  isLogged$: BehaviorSubject<boolean | null>;
  currentUser$: BehaviorSubject<CurrentUser | null>;

  //disableRecipeSaving: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    // resolver
    this.route.data.subscribe(({ recipe }) => {
      this.recipe = recipe;
    });

    this.isLogged$ = this.authService.isLogged$.getValue();
    this.currentUser$ = this.authService.currentUser$;
  }

  ngOnInit(): void {
    

    //console.log('route: ', this.route)
    console.log('user in recipe: ', this.currentUser$.value, this.isLogged$);
    console.log(this.recipe);
    //console.log(this.checkRatedBy())
    //this.userRate()
    //console.log('ratedBy: ', this.checkRatedBy())
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
}

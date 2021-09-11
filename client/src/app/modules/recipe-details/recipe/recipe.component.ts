import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../../shared/sharedServices/recipes.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { SingleRecipe } from 'src/app/types/SingleRecipe';
import { BehaviorSubject } from 'rxjs';
import { CurrentUser } from 'src/app/types/userTypes';
import { AuthService } from '../../auth/auth.service';

interface Rate {
  ratedBy: string;
  rate: number;
}
@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
})
export class RecipeComponent implements OnInit {
  recipe: any;
  //disableRecipeSaving: boolean = true;
  // user state
  isLogged$: BehaviorSubject<boolean | null>;
  currentUser$: BehaviorSubject<CurrentUser | null>;

  ratedByUser: Rate[] | [] = [];

  disableRecipeSaving: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private recipesService: RecipesService,
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
    console.log(this.userRate());
  }

  /* disableRecipeSaving() {
    if (!this.isLogged$) {
      return true
    }
    const checkUserFavorites = this.currentUser$.value?.favorites.filter(
      (fav: string) => fav === this.recipe._id
    )
    if (checkUserFavorites.length) {
      return false
    } else {
      return true
    }
  } */
  checkRatedBy() {
    if (this.isLogged$) {
      console.log(
        'user id chackratedby: ',
        this.currentUser$.value?.userId,
        this.recipe.rates
      );
      this.ratedByUser = this.recipe.rates.filter(
        (rate: any) => rate.ratedBy == this.currentUser$.value?.userId
      );

      /* return this.recipe.rates.filter(
        (rate: any) => rate.ratedBy === this.currentUser$.value?.userId
      ) */
    } else {
      this.ratedByUser = [];
    }
  }
  disableRating() {
    if (!this.isLogged$) {
      return true;
    }
    if (
      this.isLogged$ &&
      (this.recipe.author._id === this.currentUser$.value?.userId ||
        this.ratedByUser.length)
    ) {
      return false;
    } else {
      return true;
    }
  }
  userRate() {
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

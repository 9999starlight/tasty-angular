import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import { BehaviorSubject } from 'rxjs';
//import { CurrentUser, UpdatedUser } from 'src/app/types/userTypes';
import { Rate } from 'src/app/types/SingleRecipe';
import { AuthService } from '../../auth/auth.service';
import { RecipesService } from '../../shared/sharedServices/recipes.service';
import { UIService } from '../../shared/sharedServices/ui.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
})
export class RecipeComponent implements OnInit, OnDestroy {
  recipe: any;
  ratedByUser: Rate[] | [] = [];
  isSavingEnabled = false;
  isRatingEnabled = true;
  isLoading = false;
  infoMessage = '';
  msgStatus = false;
  routeSubscription!: Subscription;
  updateRatingSubscription!: Subscription;
  recipeSubscription!: Subscription;
  favoritesSubscription!: Subscription;
  newResultSubscription!: Subscription;
  subscriptions!: Subscription[];

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private recipesService: RecipesService,
    public uiService: UIService,
    private router: Router
  ) {

    // resolver
    this.routeSubscription = this.route.data.subscribe(({ recipe }) => {
      this.recipe = recipe;
    });

  }

  ngOnInit(): void {
    this.uiService.toggleSearchForm(false);
    console.log('user in recipe: ', this.authService.user, this.authService.isLogged);
    console.log(this.recipe);
    this.checkRatedBy();
    this.enableSaving();
    this.enableRating();
    //console.log(this.ratedByUser);
    console.log('user getter in recipe: ', this.authService.user)


    this.subscriptions.push(
      this.routeSubscription,
      this.updateRatingSubscription,
      this.recipeSubscription,
      this.favoritesSubscription,
      this.newResultSubscription
    )

  }

  enableSaving() {
    if (!this.authService.isLogged) {
      this.isSavingEnabled = true;
    }
    const checkUserFavorites: string[] | [] | undefined =
      this.authService.user?.favorites.filter(
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
    if (this.authService.isLogged) {
      this.ratedByUser = this.recipe.rates.filter(
        (rate: any) => rate.ratedBy == this.authService.user?.userId
      );
    } else {
      this.ratedByUser = [];
    }
  }

  enableRating() {
    if (!this.authService.isLogged) {
      this.isRatingEnabled = true;
    }
    if (
      this.authService.isLogged &&
      (this.recipe.author._id === this.authService.user?.userId ||
        this.ratedByUser.length)
    ) {
      this.isRatingEnabled = false;
    } else {
      this.isRatingEnabled = true;
    }
  }

  userRate(): number | null {
    if (
      this.authService.isLogged &&
      this.recipe.author.userId !== this.authService.user?.userId &&
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

  updateRatingHandler(rateVal: number) {
    this.updateRatingSubscription = this.recipesService.updateRating(this.recipe._id, rateVal).subscribe((res: any) => {
      if (res) {
        this.updateMsgStatusHandler(true);
        this.updateMsgHandler('Recipe has been rated');
        this.getNewData(this.recipe._id);
      }
    })
  }

  getNewData(id: string) {
    this.recipeSubscription = this.recipesService.getSingleRecipe(id).subscribe((res: any) => {
      if (res) {
        this.recipe = Object.assign({}, res);
        this.checkRatedBy();
        this.enableRating();
        console.log(this.recipe)
      }
    }, (error: any) => {
      //this.isLoading = false;
      this.infoMessage = `Error: ${error.statusText}`;
      console.log(error.statusText);
    });
  }

  saveRecipe() {
    if (!this.authService.isLogged) {
      this.updateMsgStatusHandler(false)
      this.updateMsgHandler('Login to save this recipe')
      return
    }
    this.favoritesSubscription = this.authService.updateFavorites({ favoriteId: this.recipe._id }).subscribe((res: any) => {
      if (res) {
        //console.log(res)
        this.updateMsgStatusHandler(true)
        this.updateMsgHandler(res.message)
        this.enableSaving();
        //console.log('after getting recipe saving user getter: ', this.authService.user)
        //console.log('after recipe saving in component' ,this.currentUser$.value)
      }
    }, (error: any) => {
      console.log(error.statusText);
      this.updateMsgStatusHandler(false)
      this.updateMsgHandler(`Error: ${error.statusText}`)
    });

  }

  getNewResults(params: any) {
    this.newResultSubscription = this.recipesService.getRecipesByQuery(params).subscribe((res: any) => {
      console.log(params)
      this.router.navigate(['results'], { queryParams: params });
    }, (error: any) => {
      console.log(error.statusText);
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }
}

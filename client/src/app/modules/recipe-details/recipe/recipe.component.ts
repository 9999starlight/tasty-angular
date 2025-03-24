import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Rate } from 'src/app/types/SingleRecipe';
import { AuthService } from '../../auth/auth.service';
import { RecipesService } from '../../shared/sharedServices/recipes.service';
import { UIService } from '../../shared/sharedServices/ui.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SingleRecipe } from 'src/app/types/SingleRecipe';
import { SentenceCasePipe } from '../../shared/pipes/sentence-case.pipe';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { CommentsComponent } from '../../comments/comments/comments.component';
import { TooltipComponent } from '../../shared/components/tooltip/tooltip.component';
import { RatingComponent } from '../rating/rating.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InfoMessageComponent } from '../../shared/components/info-message/info-message.component';
import { SearchComponent } from '../../shared/components/search/search.component';
import { NgIf, NgClass, NgFor, DatePipe } from '@angular/common';
@Component({
    selector: 'app-recipe',
    templateUrl: './recipe.component.html',
    styleUrls: ['./recipe.component.scss'],
    standalone: true,
    imports: [
        NgIf,
        SearchComponent,
        InfoMessageComponent,
        FontAwesomeModule,
        NgClass,
        RatingComponent,
        TooltipComponent,
        RouterLink,
        NgFor,
        CommentsComponent,
        LoaderComponent,
        DatePipe,
        SentenceCasePipe,
    ],
})
export class RecipeComponent implements OnInit, OnDestroy {
  recipe!: SingleRecipe;
  ratedByUser: Rate[] | [] = [];
  isSavingEnabled = false;
  isRatingEnabled = true;
  isLoading = false;
  infoMessage = '';
  msgStatus = false;
  updateRatingSubscription?: Subscription;
  recipeSubscription?: Subscription;
  favoritesSubscription?: Subscription;
  newResultSubscription?: Subscription;
  subscriptions: (Subscription | undefined)[] = [];

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private recipesService: RecipesService,
    public uiService: UIService,
    private router: Router
  ) {
    // resolver
    this.route.data.subscribe(({ recipe }) => {
      this.recipe = recipe;
    });
  }

  ngOnInit(): void {
    this.uiService.toggleSearchForm(false);
    //console.log(this.recipe);
    this.checkRatedBy();
    this.enableSaving();
    this.enableRating();
    //console.log(this.ratedByUser);
    //console.log('user getter in recipe: ', this.authService.user)

    this.subscriptions.push(
      this.updateRatingSubscription,
      this.recipeSubscription,
      this.favoritesSubscription,
      this.newResultSubscription
    );
    console.log(this.authService.user)
    console.log(this.recipe.author)
  }

  enableSaving() {
    if (!this.authService.isLogged) {
      this.isSavingEnabled = true;
    }
    const checkUserFavorites =
      this.authService.user?.favorites.filter(
        (fav: string) => fav === this.recipe._id
      );
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
    } else {
      if (
        this.recipe.author._id === this.authService.user?.userId ||
        this.ratedByUser.length
      ) {
        this.isRatingEnabled = false;
      } else {
        this.isRatingEnabled = true;
      }
    }
  }

  userRate(): number | null {
    if (
      this.authService.isLogged &&
      this.recipe.author._id !== this.authService.user?.userId &&
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
    this.updateRatingSubscription = this.recipesService
      .updateRating(this.recipe._id, rateVal)
      .subscribe((res: any) => {
        if (res) {
          this.updateMsgStatusHandler(true);
          this.updateMsgHandler('Recipe has been rated');
          this.getNewData(this.recipe._id);
        }
      });
  }

  getNewData(id: string) {
    this.recipeSubscription = this.recipesService.getSingleRecipe(id).subscribe(
      (res: any) => {
        if (res) {
          this.recipe = Object.assign({}, res);
          this.checkRatedBy();
          this.enableRating();
          //console.log(this.recipe)
        }
      },
      (error: any) => {
        //this.isLoading = false;
        this.infoMessage = `Error: ${error.error.message}`;
        console.log(error.statusText);
      }
    );
  }

  saveRecipe() {
    if (!this.authService.isLogged) {
      this.updateMsgStatusHandler(false);
      this.updateMsgHandler('Login to save this recipe');
      return;
    }
    this.favoritesSubscription = this.authService
      .updateFavorites({ favoriteId: this.recipe._id })
      .subscribe(
        (res: any) => {
          if (res) {
            //console.log(res)
            this.updateMsgStatusHandler(true);
            this.updateMsgHandler(res.message);
            this.enableSaving();
            //console.log('after getting recipe saving user getter: ', this.authService.user)
          }
        },
        (error: any) => {
          console.log(error.error.message);
          this.updateMsgStatusHandler(false);
          this.updateMsgHandler(`Error: ${error.error.message}`);
        }
      );
  }

  getNewResults(params: any) {
    this.newResultSubscription = this.recipesService
      .getRecipesByQuery(params)
      .subscribe(
        (res: any) => {
          //console.log(params)
          this.router.navigate(['results'], { queryParams: params });
        },
        (error: any) => {
          console.log(error.error.message);
        }
      );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {
      if (!sub === undefined) sub?.unsubscribe();
    });
  }
}

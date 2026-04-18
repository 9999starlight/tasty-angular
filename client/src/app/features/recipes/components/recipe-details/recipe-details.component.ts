import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UiService } from '../../../../shared/services/ui.service';
import { Rate, SingleRecipe } from '../../models/single-recipe.model';
import { UserFacade } from '../../../user/facade/user.facade';
import { RecipesFacade } from '../../facade/recipes.facade';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { CurrentUser, UpdatedUser } from '../../../user/models/userTypes';
import { AsyncPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { SearchComponent } from '../../../../shared/components/search/search.component';
import { InfoMessageComponent } from '../../../../shared/components/info-message/info-message.component';
import { Icons } from '../../../../shared/ui/icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TooltipComponent } from '../../../../shared/components/tooltip/tooltip.component';
import { CommentsComponent } from '../comments/comments.component';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { RatingComponent } from '../rating/rating.component';
import {
  emptyInfoMessage,
  InfoMessage,
  mapTextToInfoMessage,
  mergeInfoMessages,
} from '../../../../shared/utils/info-message.utils';

interface RecipeDetailsActions {
  canSave: boolean;
  canRate: boolean;
  userRating: Rate | undefined;
}

@Component({
  selector: 'app-recipe-details',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss'],
  imports: [FontAwesomeModule, AsyncPipe, SearchComponent, TitleCasePipe, DatePipe,InfoMessageComponent, RouterLink, TooltipComponent, CommentsComponent, LoaderComponent, RatingComponent]
})
export class RecipeDetailsComponent {
  private userFacade = inject(UserFacade);
  private recipeFacade = inject(RecipesFacade);
  public uiService = inject(UiService);
  private router = inject(Router);
  readonly icons = Icons;
  recipe$: Observable<SingleRecipe | null>;
  user$: Observable<CurrentUser | UpdatedUser | null>;
  uiActions$: Observable<RecipeDetailsActions>;
  loading$: Observable<boolean>;
  private localInfoMessage$ = new BehaviorSubject<InfoMessage>(emptyInfoMessage);
  infoMessage$: Observable<InfoMessage>;

  constructor() {
    this.recipe$ = this.recipeFacade.selectedRecipe$;
    this.user$ = this.userFacade.currentUser$;
    this.loading$ = this.recipeFacade.loading$;
    this.uiActions$ = this.buildUIActions();
    this.infoMessage$ = this.buildInfoMessageStream();
  }

  private buildUIActions(): Observable<RecipeDetailsActions> {
    return combineLatest([this.user$, this.recipe$]).pipe(
      map(([user, recipe]) => {
        const userRating =
          user && recipe
            ? recipe.rates.find((rate) => rate.ratedBy === user.userId)
            : undefined;

        return {
          canSave: !!recipe && (!user || !user.favorites.includes(recipe._id)),
          canRate: !!user && !!recipe && recipe.author._id !== user.userId && !userRating,
          userRating,
        };
      })
    );
  }

  private buildInfoMessageStream(): Observable<InfoMessage> {
    const userError$ = mapTextToInfoMessage(this.userFacade.error$, false);
    const userSuccess$ = mapTextToInfoMessage(this.userFacade.successMessage$, true);
    const recipeError$ = mapTextToInfoMessage(this.recipeFacade.error$, false);
    const recipeSuccess$ = mapTextToInfoMessage(this.recipeFacade.successMessage$, true);

    return mergeInfoMessages(
      this.localInfoMessage$,
      userError$,
      userSuccess$,
      recipeError$,
      recipeSuccess$
    );
  }

  ngOnInit(): void {
    this.uiService.toggleSearchForm(false);
  }

  setInfoMessage(payload: { message: string, status: boolean }) {
    this.localInfoMessage$.next(payload);
  }

  onClear() {
    this.setInfoMessage({ message: '', status: false });
    this.userFacade.clearError$();
    this.userFacade.clearSuccessMessage$();
    this.recipeFacade.clearError$();
    this.recipeFacade.clearSuccessMessage$();
  }

  updateRatingHandler(payload: {recipeId: string, rate: number}) {
    this.recipeFacade.updateRating$(payload.recipeId, payload.rate);
  }

  saveRecipe(isLogged: boolean, recipeId: string, userId: string) {
    if (!isLogged) {
      this.setInfoMessage({ message: 'Login to save this recipe', status: false });
      return;
    }
    this.userFacade.updateFavorites$({ favoriteId: recipeId }, userId);
  }

  getNewResults(params: any) {
    this.router.navigate(['recipes'], { queryParams: params });
  }
}

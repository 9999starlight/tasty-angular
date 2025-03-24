import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipesService } from '../../shared/sharedServices/recipes.service';
import { SortingService } from '../../shared/sharedServices/sorting.service';
import { UIService } from '../../shared/sharedServices/ui.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { QueryRecipeComponent } from '../../shared/components/query-recipe/query-recipe.component';
import { SortingButtonsComponent } from '../../shared/components/sorting-buttons/sorting-buttons.component';
import { SearchComponent } from '../../shared/components/search/search.component';
import { NgIf, NgFor } from '@angular/common';

@Component({
    selector: 'app-results-home',
    templateUrl: './results-home.component.html',
    styleUrls: ['./results-home.component.scss'],
    standalone: true,
    imports: [
        NgIf,
        SearchComponent,
        SortingButtonsComponent,
        NgFor,
        QueryRecipeComponent,
    ],
})
export class ResultsHomeComponent implements OnInit, OnDestroy {
  queryResults = [];
  params: any;
  newResultsSubscription?: Subscription;
  //recipesList$: BehaviorSubject<any>;


  constructor(
    private route: ActivatedRoute,
    public sortingService: SortingService,
    private recipesService: RecipesService,
    public uiService: UIService,
    private router: Router
  ) {
    this.route.data.subscribe((res) => {
      this.queryResults = res.recipes.slice();
    });
    //this.recipesList$ = this.recipesService.recipesList$;
  }

  ngOnInit(): void {
    this.uiService.toggleSearchForm(false);
    //console.log(this.queryResults)
    //console.log('subject from component: ', this.recipesList$.value);
  }

  getNewResults(params: any) {
    this.newResultsSubscription = this.recipesService
      .getRecipesByQuery(params)
      .subscribe(
        (res: any) => {
          console.log(params);
          if (res) {
            this.router.navigate([], {
              relativeTo: this.route,
              queryParams: params,
              replaceUrl: true,
            });
            console.log(res);
            this.queryResults = res.slice();
          }
        },
        (error: any) => {
          console.log(error.statusText);
        }
      );
  }

  ngOnDestroy() {
    this.newResultsSubscription?.unsubscribe();
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Comment } from 'src/app/types/Comment';
import { RecipeResponse } from 'src/app/types/RecipeResponse';
import { RecipesService } from '../../shared/sharedServices/recipes.service';
import { AdminService } from '../admin.service';
import { SortingService } from '../../shared/sharedServices/sorting.service';
import { SentenceCasePipe } from '../../shared/pipes/sentence-case.pipe';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { StatisticBoxComponent } from '../statistic-box/statistic-box.component';
import { RouterLink } from '@angular/router';
import { NgIf, NgFor, DatePipe } from '@angular/common';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
    standalone: true,
    imports: [
        NgIf,
        NgFor,
        RouterLink,
        StatisticBoxComponent,
        LoaderComponent,
        DatePipe,
        SentenceCasePipe,
    ],
})
export class OverviewComponent implements OnInit, OnDestroy {
  latestRecipes: RecipeResponse[] = [];
  latestComments: Comment[] = [];
  mostCommented: {
    name: string;
    value: number;
  }[] = [];
  mostActiveUsers: {
    name: string;
    value: number;
  }[] = [];
  recipeCount = 0;
  usersCount = 0;
  commentsCount = 0;
  isLoading = true;
  commentSubscription?: Subscription;
  recipeSubscription?: Subscription;
  userSubscription?: Subscription;
  subscriptions: (Subscription | undefined)[]  = [];

  constructor(
    private recipesService: RecipesService,
    private adminService: AdminService,
    private sortingService: SortingService
  ) {}

  ngOnInit(): void {
    this.fetchRecipes();
    this.fetchUsers();
    this.fetchComments();
    this.subscriptions.push(
      this.recipeSubscription,
      this.userSubscription,
      this.commentSubscription
    );
  }

  fetchUsers() {
    this.userSubscription = this.adminService.getUsers().subscribe(
      (res) => {
        if (res) {
          // console.log(res);
          this.usersCount = res.length;
          const sortedByRecipes = [...res]
            .sort((a, b) => b.createdRecipes.length - a.createdRecipes.length)
            .slice(0, 5);
          sortedByRecipes.map((single) => {
            this.mostActiveUsers.push({
              name: single.username,
              value: single.createdRecipes.length,
            });
          });
        }
      },
      (error) => {
        this.isLoading = false;
        console.log(error.statusText);
      }
    );
  }

  fetchComments() {
    this.commentSubscription = this.adminService.getComments().subscribe(
      (res) => {
        if (res) {
          // console.log(res);
          this.isLoading = false;
          this.commentsCount = res.length;
          this.latestComments = this.sortingService
            .sortDateDescending([...res])
            .slice(0, 10);
        }
      },
      (error) => {
        this.isLoading = false;
        console.log(error.statusText);
      }
    );
  }

  fetchRecipes() {
    this.recipeSubscription = this.recipesService.getRecipes().subscribe(
      (res) => {
        if (res) {
          const recipes = JSON.parse(JSON.stringify(res));
          // console.log(recipes);
          this.latestRecipes = this.sortingService
            .sortDateDescending([...recipes])
            .slice(0, 10);
          this.recipeCount = recipes.length;
          // most commented
          const sortedByComments = [...recipes]
            .sort((a, b) => b.comments.length - a.comments.length)
            .slice(0, 5);
          sortedByComments.map((single) => {
            this.mostCommented.push({
              name: single.mealName,
              value: single.comments.length,
            });
          });
          // console.log(this.mostCommented);
        }
      },
      (error) => {
        this.isLoading = false;
        console.log(error.statusText);
      }
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {
      if (!sub === undefined) sub?.unsubscribe();
    });
  }
}

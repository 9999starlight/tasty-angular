import { Component, OnInit } from '@angular/core';
import { Comment } from 'src/app/types/Comment';
import { RecipeResponse } from 'src/app/types/RecipeResponse';
import { RecipesService } from '../../shared/sharedServices/recipes.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  latestRecipes: RecipeResponse[] = [];
  latestComments: Comment[] = [];
  mostCommented: {
    name: string,
    value: number
  }[] = [];
  mostActiveUsers: {
    name: string,
    value: number
  }[] = [];
  recipeCount = 0;
  usersCount = 0;
  commentsCount = 0;
  isLoading = true;

  constructor(private recipesService: RecipesService, private adminService: AdminService) { }

  ngOnInit(): void {
    this.fetchRecipes();
    this.fetchUsers();
    this.fetchComments();
  }

  fetchUsers() {
    this.adminService.getUsers().subscribe((res) => {
      if (res) {
        console.log(res)
        this.usersCount = res.length;
        const sortedByRecipes = [...res]
          .sort((a, b) => b.createdRecipes.length - a.createdRecipes.length)
          .slice(0, 5);
        sortedByRecipes.map((single) => {
          this.mostActiveUsers.push({
            name: single.username,
            value: single.createdRecipes.length
          })
        })
      }
    }, error => {
      this.isLoading = false;
      //this.errorMessage = `Error: ${error.statusText}`;
      console.log(error.statusText);
    })

  }

  fetchComments() {
    this.adminService.getComments().subscribe((res) => {
      if (res) {
        console.log(res)
        this.isLoading = false;
        this.commentsCount = res.length;
        this.latestComments = [...res].slice(0, 10);
      }
    },
      error => {
        this.isLoading = false;
        console.log(error.statusText);
      })
  }

  fetchRecipes() {
    this.recipesService.getRecipes().subscribe((res) => {
      if (res) {
        const recipes = JSON.parse(JSON.stringify(res));
        // console.log(recipes);
        this.latestRecipes = [...recipes].sort(
          (a: RecipeResponse, b: RecipeResponse) =>
            <any>new Date(b.createdAt) - <any>new Date(a.createdAt)
        ).slice(0, 10);

        this.recipeCount = recipes.length
        // most commented
        const sortedByComments = [...recipes]
          .sort((a, b) => b.comments.length - a.comments.length)
          .slice(0, 5)
        console.log(sortedByComments)
        sortedByComments.map((single) => {
          this.mostCommented.push({
            name: single.mealName,
            value: single.comments.length
          })
        })
        console.log(this.mostCommented)
      }
    }, error => {
      this.isLoading = false;
      //this.errorMessage = `Error: ${error.statusText}`;
      console.log(error.statusText);
    });
  }

}

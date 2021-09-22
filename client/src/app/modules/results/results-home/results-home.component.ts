import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../../shared/sharedServices/recipes.service';
import { SortingService } from '../../shared/sharedServices/sorting.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results-home',
  templateUrl: './results-home.component.html',
  styleUrls: ['./results-home.component.scss']
})
export class ResultsHomeComponent implements OnInit {
  queryResults = [];
  params: any;
  constructor(private route: ActivatedRoute, public sortingService: SortingService, private recipesService: RecipesService, private router: Router) { 
    this.route.data.subscribe((res) => {
      this.queryResults = res.recipes.slice();
    });
  }

  ngOnInit(): void {
    console.log(this.queryResults)
  }

  getNewResults(params: any) {
    this.recipesService.getRecipesByQuery(params).subscribe((res: any) => {
      console.log(params)
      if (res) {
        this.router.navigate([], { relativeTo: this.route, queryParams: params,  replaceUrl: true });
        console.log(res)
        this.queryResults = res.slice();    
      }
    }, (error: any) => {  
      console.log(error.statusText);
    });
  }

}

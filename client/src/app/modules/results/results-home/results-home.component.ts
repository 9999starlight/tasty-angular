import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../../shared/sharedServices/recipes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-results-home',
  templateUrl: './results-home.component.html',
  styleUrls: ['./results-home.component.scss']
})
export class ResultsHomeComponent implements OnInit {
  queryResults = [];
  constructor(private route: ActivatedRoute) { 
    this.route.data.subscribe((res) => {
      this.queryResults = res.recipes.slice();
    });
  }

  ngOnInit(): void {
    console.log(this.queryResults)
  }

}

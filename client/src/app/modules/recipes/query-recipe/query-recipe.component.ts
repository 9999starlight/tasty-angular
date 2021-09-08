import { Component, OnInit, Input } from '@angular/core';
import { RecipeResponse } from '../../../types/RecipeResponse'
import { faStar} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-query-recipe',
  templateUrl: './query-recipe.component.html',
  styleUrls: ['./query-recipe.component.scss']
})
export class QueryRecipeComponent implements OnInit {
  @Input() singleResult: any;
  constructor() { }
  fasStar = faStar;
  ngOnInit(): void {
    //console.log(this.singleResult)
  }

}

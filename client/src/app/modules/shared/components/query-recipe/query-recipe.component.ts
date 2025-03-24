import { Component, OnInit, Input } from '@angular/core';
import { RecipeResponse } from '../../../../types/RecipeResponse'
import { faStar} from '@fortawesome/free-solid-svg-icons';
import { SentenceCasePipe } from '../../pipes/sentence-case.pipe';

import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-query-recipe',
    templateUrl: './query-recipe.component.html',
    styleUrls: ['./query-recipe.component.scss'],
    standalone: true,
    imports: [RouterLink, SentenceCasePipe]
})
export class QueryRecipeComponent implements OnInit {
  @Input() singleResult!: RecipeResponse;
  constructor() { }
  fasStar = faStar;
  ngOnInit(): void {}
}

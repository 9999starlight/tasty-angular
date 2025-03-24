import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RecipeResponse } from 'src/app/types/RecipeResponse';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { SentenceCasePipe } from '../../pipes/sentence-case.pipe';
import { TooltipComponent } from '../tooltip/tooltip.component';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgIf, DatePipe } from '@angular/common';

@Component({
    selector: 'app-private-recipe',
    templateUrl: './private-recipe.component.html',
    styleUrls: ['./private-recipe.component.scss'],
    standalone: true,
    imports: [
        NgIf,
        FontAwesomeModule,
        RouterLink,
        TooltipComponent,
        DatePipe,
        SentenceCasePipe,
    ],
})
export class PrivateRecipeComponent implements OnInit {
  @Input() recipe!: RecipeResponse;
  @Input() isUsersRecipes!: boolean;
  @Output() del = new EventEmitter();
  @Output() editing = new EventEmitter();
  @Output() updateFavorites = new EventEmitter();
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;

  constructor() {}

  ngOnInit(): void {}

  deleteFav(id: string) {
    this.updateFavorites.emit(id);
  }

  editRecipe(id: string) {
    this.editing.emit(id);
  }

  delete(id: string) {
    this.del.emit(id);
  }
}

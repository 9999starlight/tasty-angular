import { Component, Input, output } from '@angular/core';
import { Recipe } from '../../models/recipe.entity';
import { Icons } from '../../../../shared/ui/icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterLink } from '@angular/router';
import { TooltipComponent } from '../../../../shared/components/tooltip/tooltip.component';
import { DatePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-private-recipe',
  imports: [FontAwesomeModule, RouterLink, TooltipComponent, DatePipe, TitleCasePipe],
  templateUrl: './private-recipe.component.html',
  styleUrl: './private-recipe.component.scss',
})
export class PrivateRecipeComponent {
  @Input() recipe!: Recipe;
  @Input() isUsersRecipes!: boolean;
  readonly del = output<string>();
  readonly editing = output<string>();
  readonly updateFavorites = output<string>();
  icons = Icons;

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

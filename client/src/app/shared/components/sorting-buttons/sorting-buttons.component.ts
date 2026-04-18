import { Component, Input, output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RecipeSortDirection } from '../../../features/recipes/models/recipe.entity';
import { Icons } from '../../ui/icons';

@Component({
  selector: 'app-sorting-buttons',
  imports: [FontAwesomeModule],
  templateUrl: './sorting-buttons.component.html',
  styleUrl: './sorting-buttons.component.scss',
})
export class SortingButtonsComponent {
  @Input() isRating: boolean = true;
  readonly sortChange = output<{
    field: 'title' | 'rating' | 'date';
    direction: RecipeSortDirection;
  }>();
  icons = Icons;

  sort(field: 'title' | 'rating' | 'date', direction: RecipeSortDirection) {
    this.sortChange.emit({ field, direction });
  }
}

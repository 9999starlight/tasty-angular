import { Component, Input, output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Recipe } from '../../../../recipes/models/recipe.entity';
import { Icons } from '../../../../../shared/ui/icons';

@Component({
  selector: 'app-slide',
  imports: [FontAwesomeModule, TitleCasePipe, RouterLink],
  templateUrl: './slide.component.html',
  styleUrl: './slide.component.scss',
  standalone: true
})
export class SlideComponent {
  @Input() recipe!: Recipe;
  readonly pauseSlides = output();
  readonly resumeSlides = output();
  icons = Icons;

  onMouseEnter() {
    this.pauseSlides.emit();
  }

  onMouseLeave() {
    this.resumeSlides.emit();
  }
}

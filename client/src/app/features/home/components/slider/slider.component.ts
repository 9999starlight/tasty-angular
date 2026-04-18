import { ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { Icons } from '../../../../shared/ui/icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SlideComponent } from './slide/slide.component';
import { Recipe } from '../../../recipes/models/recipe.entity';

@Component({
  selector: 'app-slider',
  standalone: true,
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
  imports: [FontAwesomeModule, SlideComponent]
})
export class SliderComponent {
  private cdr = inject(ChangeDetectorRef);

  @Input() sliderRecipes!: Recipe[];
  numberOfRecipes: number[] = [];

  currentRecipe: number = 0;
  timing!: ReturnType<typeof setInterval>;
  icons = Icons;

  ngOnInit(): void {
    this.numberOfRecipes = Array.from(
      { length: this.sliderRecipes.length },
      (v, i) => (v = i + 1)
    );
    this.slideInit();
  }

  previousRecipe() {
    this.currentRecipe--;
    if (this.currentRecipe < 0) {
      this.currentRecipe = this.sliderRecipes.length - 1;
    }
  }

  nextRecipe() {
    this.currentRecipe++;
    if (this.currentRecipe === this.sliderRecipes.length) {
      this.currentRecipe = 0;
    }
  }

  stopSlider() {
    clearInterval(this.timing);
  }

  slideInit() {
    this.timing = setInterval(() => {
      this.nextRecipe();
      this.cdr.detectChanges();
    }, 5000);
  }

  moveToSlide(dotIndex: number) {
    this.currentRecipe = dotIndex;
  }

  ngOnDestroy() {
    this.stopSlider();
  }
}

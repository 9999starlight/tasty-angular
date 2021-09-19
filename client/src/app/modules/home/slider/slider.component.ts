import { Component, OnInit, Input, OnDestroy, ElementRef } from '@angular/core';
import { RecipeResponse } from 'src/app/types/RecipeResponse';
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit, OnDestroy {
  @Input() sliderRecipes: RecipeResponse[] = [];
  numberOfRecipes: number[] = [];

  currentRecipe: number = 0;
  timing!: ReturnType<typeof setInterval>;
  sliderImages: any = null;

  constructor(private el: ElementRef) {
    this.sliderImages = this.el.nativeElement.querySelectorAll('.sliderImage');
  }

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
    this.sliderImages = this.sliderRecipes[this.currentRecipe];
  }

  nextRecipe() {
    this.currentRecipe++;
    if (this.currentRecipe === this.sliderRecipes.length) {
      this.currentRecipe = 0;
    }
    this.sliderImages = this.sliderRecipes[this.currentRecipe];
  }

  stopSlider() {
    clearInterval(this.timing);
  }

  slideInit() {
    this.timing = setInterval(() => {
      this.nextRecipe();
    }, 5000);
  }

  moveToSlide(dotIndex: number) {
    this.currentRecipe = dotIndex;
    this.sliderImages = this.sliderRecipes[this.currentRecipe];
  }

  ngOnDestroy() {
    this.stopSlider();
  }
}

import { Component, OnInit, Input, OnDestroy, ElementRef, inject } from '@angular/core';
import { RecipeResponse } from 'src/app/types/RecipeResponse';
import {
  trigger,
  transition,
  style,
  animate,
  useAnimation,
  state
} from '@angular/animations';
import { SlideComponent } from './slide/slide.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgClass } from '@angular/common';
//import { fadeIn, fadeOut } from 'src/app/animations/fade.animations';
@Component({
    selector: 'app-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss'],
    animations: [
    /* trigger('carouselAnimation', [
      transition(':enter', [
        useAnimation(fadeIn, { params: { time: '1000ms' } }),
      ]),
      transition(':leave', [
        useAnimation(fadeOut, { params: { time: '1000ms' } }),
      ]),
    ]), */
    /* trigger('carouselAnimation', [
      state('false', style({ opacity: 0 })),
      state('true', style({ opacity: 1 })),
      transition('false => true', animate('1000ms ease-in')),
      transition('true => false', animate('1000ms ease-out'))
    ]) */
    ],
    standalone: true,
    imports: [FontAwesomeModule, SlideComponent, NgClass]
})

/* trigger('fade', [
      state('false', style({ opacity: 0 })),
      state('true', style({ opacity: 1 })),
      transition('false => true', animate('2000ms ease-in')),
      transition('true => false', animate('2000ms ease-out'))
    ]), */
export class SliderComponent implements OnInit, OnDestroy {
  private el = inject(ElementRef);

  @Input() sliderRecipes: RecipeResponse[] = [];
  numberOfRecipes: number[] = [];

  currentRecipe: number = 0;
  timing!: ReturnType<typeof setInterval>;
  sliderImages: any = null;

  constructor() {
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

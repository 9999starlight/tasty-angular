import { Component, ElementRef, inject, Input, output } from '@angular/core';

@Component({
  selector: 'app-rating',
  imports: [],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss',
})
export class RatingComponent {
  private el = inject(ElementRef);

  // props & Output
  @Input() recipeId: string = '';
  @Input() isLogged: boolean = false;
  readonly updateMsg = output<{ message: string, status: boolean }>();
  readonly updateRecipe = output<{ recipeId: string, rate: number }>();
  ratingDropdown: boolean = false;
  rateValue: number = 1;
  counter: number = 1;

  ngOnInit(): void {}

  toggleRating() {
    this.ratingDropdown = !this.ratingDropdown;
  }

  fillTheStars(value: any) {
    let stars = this.el.nativeElement.querySelectorAll('.sp');
    stars.forEach((st: any) => {
      if (st.id <= Number(value.target.id)) {
        st.classList.add('coloring');
      } else {
        st.classList.remove('coloring');
      }
      this.counter = Number(value.target.id);
    });
  }

  rateThisRecipe(value: any) {
    this.rateValue = Number(value.target.id);
    if (!this.isLogged) {
      this.updateMsg.emit({ message: 'Login to rate this recipe', status: false });
      this.ratingDropdown = false;
      this.rateValue = 1;
      return;
    }
    this.ratingDropdown = false;
    this.updateRecipe.emit({ recipeId: this.recipeId, rate: this.rateValue});
  }
}

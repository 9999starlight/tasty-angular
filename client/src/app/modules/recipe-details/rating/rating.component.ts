import { Component, OnInit, Input, ElementRef, inject, output } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-rating',
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.scss'],
    standalone: true,
    imports: [
    NgClass
],
})
export class RatingComponent implements OnInit {
  private el = inject(ElementRef);
  private authService = inject(AuthService);

  // props & Output
  @Input() recipeId: string = '';
  readonly updateMsgStatus = output<boolean>();
  readonly updateMsg = output<string>();
  readonly updateRecipe = output<number>();
  ratingDropdown: boolean = false;
  rateValue: number = 1;
  counter: number = 1;

  ngOnInit(): void {}

  toggleRating() {
    this.ratingDropdown = !this.ratingDropdown;
  }

  fillTheStars(value: any) {
    //console.log(value.target.value)
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
    if (!this.authService.isLogged) {
      this.updateMsgStatus.emit(false);
      this.updateMsg.emit('Login to rate this recipe');
      this.ratingDropdown = false;
      this.rateValue = 1;
      return;
    }
    this.ratingDropdown = false;
    // update recipe rating
    this.updateRecipe.emit(this.rateValue);
  }
}

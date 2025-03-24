import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ElementRef,
} from '@angular/core';
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
  // props & Output
  @Input() recipeId: string = '';
  @Output() updateMsgStatus = new EventEmitter<boolean>();
  @Output() updateMsg = new EventEmitter<string>();
  @Output() updateRecipe = new EventEmitter<number>();
  ratingDropdown: boolean = false;
  rateValue: number = 1;
  counter: number = 1;

  constructor(private el: ElementRef, private authService: AuthService) {}

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

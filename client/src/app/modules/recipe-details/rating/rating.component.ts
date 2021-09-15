import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { RecipesService } from '../../shared/sharedServices/recipes.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  // login status
  isLogged$: BehaviorSubject<boolean | null>;
  // props & Output
  @Input() recipeId: string = '';
  @Output() updateMsgStatus = new EventEmitter<boolean>();
  @Output() updateMsg = new EventEmitter<string>();
  @Output() updateRecipe = new EventEmitter<number>();
  ratingDropdown: boolean = false;
  rateValue: number = 1;
  counter: number = 1;

  constructor(private el: ElementRef, private authService: AuthService, private recipesService: RecipesService) {
    this.isLogged$ = this.authService.isLogged$;
   }

  ngOnInit(): void {
    //console.log('from rating: ', this.isLogged$)
  }

  toggleRating(){
    this.ratingDropdown = !this.ratingDropdown
  }

  fillTheStars(value: any) {
    //console.log(value.target.value)
    let stars = this.el.nativeElement.querySelectorAll('.sp');
    stars.forEach((st: any) => {
      if(st.id <= Number(value.target.id)) {
        st.classList.add('coloring')
      } else {
        st.classList.remove('coloring')
      }
      this.counter = Number(value.target.id)
    })
  }

  rateThisRecipe(value: any) {
    this.rateValue = Number(value.target.id)
    //console.log(this.rateValue)
    if(!this.isLogged$.getValue()) {
      //console.log('logged: ', this.isLogged$.getValue())
      this.updateMsgStatus.emit(false);
      this.updateMsg.emit('Login to rate this recipe');
      this.ratingDropdown = false;
      this.rateValue = 1;
      return;
    }
    this.ratingDropdown = false;
    // update recipe rating
    //console.log(this.rateValue)
    this.updateRecipe.emit(this.rateValue);
  }
}

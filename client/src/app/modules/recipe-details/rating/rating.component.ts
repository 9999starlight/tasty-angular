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
  @Output() updateMsgStatus = new EventEmitter();
  @Output() updateMsg = new EventEmitter();
  @Output() updateRating = new EventEmitter();
  ratingDropdown: boolean = false;
  rateValue: number = 1;

  constructor(private el: ElementRef, private authService: AuthService, private recipesService: RecipesService) {
    this.isLogged$ = this.authService.isLogged$.getValue();
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
    })
  }

  /* fillTheStars(event) {
      this.rateValue = Number(event.target.id)
      const stars = this.$refs.stars.children
      stars.forEach((child) => {
        if (Number(child.children[1].id) <= Number(event.target.id)) {
          child.children[1].classList.add('coloring')
        } else child.children[1].classList.remove('coloring')
      })
    } */

  rateThisRecipe(value: any) {
    this.rateValue = Number(value.target.id)
    console.log(this.rateValue)
    if(!this.isLogged$) {
      this.updateMsgStatus.emit(false);
      this.updateMsg.emit('Login to rate this recipe');
      this.ratingDropdown = false;
      this.rateValue = 1;
      return;
    }
    this.ratingDropdown = false;
    // update recipe rating
    // call service to patch recipe
    this.recipesService.updateRating(this.recipeId, this.rateValue).subscribe((res) => {
      if(res) {
        this.rateValue = 1;
        this.updateRating.emit();
      }
    })
    /* if(res) {
      this.rateValue = 1;
      this.updateRating.emit(null);
    } */
  }
}

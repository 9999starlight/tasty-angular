import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { RecipeResponse } from 'src/app/types/RecipeResponse';
import { SimpleChanges } from '@angular/core';
import { fadeIn, fadeOut } from 'src/app/animations/fade.animations';
import {
  trigger,
  transition,
  style,
  animate,
  useAnimation,
  state,
  query
} from '@angular/animations';
import { SentenceCasePipe } from '../../../shared/pipes/sentence-case.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { RouterLink } from '@angular/router';
@Component({
    selector: 'app-slide',
    templateUrl: './slide.component.html',
    styleUrls: ['./slide.component.scss'],
    animations: [
        trigger('fadeAnimation', [
            /* transition(':enter', [
              useAnimation(fadeIn, { params: { time: '1000ms' } }),
            ]),
            transition(':leave', [
              useAnimation(fadeOut, { params: { time: '1000ms' } }),
            ]), */
            transition('void => *', [
                useAnimation(fadeIn, { params: { time: '500ms' } })
            ]),
            transition('* => void', [
                useAnimation(fadeOut, { params: { time: '500ms' } })
            ]),
        ]),
    ],
    standalone: true,
    imports: [
    RouterLink,
    FontAwesomeModule,
    SentenceCasePipe
],
})
export class SlideComponent implements OnInit, OnChanges {
  @Input() recipe!: RecipeResponse;
  @Output() pauseSlides = new EventEmitter();
  @Output() resumeSlides = new EventEmitter();
  //imgAnimate = true;
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    /* this.imgAnimate = false;
    const chng = changes.recipe;
    const cur  = JSON.stringify(chng.currentValue._id);
    let prev = chng.previousValue !== undefined ? JSON.stringify(chng.previousValue._id) : '';
    
    if(prev !== cur) {
      this.imgAnimate = true;
    }
    console.log(this.imgAnimate)
    console.log(`prevValue = ${prev}, currentValue = ${cur}`); */
    //console.log(`prevValue = ${prev}, currentValue = ${cur}`);
    //console.log(changes.recipe)
  }

  onMouseEnter() {
    this.pauseSlides.emit();
  }

  onMouseLeave() {
    this.resumeSlides.emit();
  }
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RecipeResponse } from 'src/app/types/RecipeResponse';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss'],
})
export class SlideComponent implements OnInit {
  @Input() recipe!: RecipeResponse;
  @Output() pauseSlides = new EventEmitter();
  @Output() resumeSlides = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onMouseEnter() {
    this.pauseSlides.emit();
  }

  onMouseLeave() {
    this.resumeSlides.emit();
  }
}

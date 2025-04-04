import { NgModule, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faChevronCircleUp, faStar, faAngleDoubleLeft, faAngleDoubleRight, faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import { SliderComponent } from './slider/slider.component';
import { SlideComponent } from './slider/slide/slide.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { TagsComponent } from './tags/tags.component';
import { TagComponent } from './tag/tag.component';
@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        FontAwesomeModule,
        SharedModule,
        HomePageComponent,
        SliderComponent,
        SlideComponent,
        TagsComponent,
        TagComponent
    ]
})
export class HomeModule {
  constructor(){
    const library = inject(FaIconLibrary);

    library.addIcons(faChevronCircleUp, faChevronCircleLeft, faChevronCircleRight, faStar, faAngleDoubleLeft, faAngleDoubleRight);
  }
 }

import { NgModule } from '@angular/core';
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
  declarations: [
    HomePageComponent,
    SliderComponent,
    SlideComponent,
    TagsComponent,
    TagComponent,

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FontAwesomeModule,
    SharedModule
  ]

})
export class HomeModule {
  constructor(library: FaIconLibrary){
    library.addIcons(faChevronCircleUp, faChevronCircleLeft, faChevronCircleRight, faStar, faAngleDoubleLeft, faAngleDoubleRight);
  }
 }

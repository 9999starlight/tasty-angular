import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faChevronCircleUp, faStar } from '@fortawesome/free-solid-svg-icons';
import { SliderComponent } from './slider/slider.component';
import { SlideComponent } from './slider/slide/slide.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
@NgModule({
  declarations: [
    HomePageComponent,
    SliderComponent,
    SlideComponent,

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
    library.addIcons(faChevronCircleUp, faStar);
  }
 }

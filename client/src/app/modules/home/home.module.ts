import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { QueryRecipeComponent } from '../recipes/query-recipe/query-recipe.component';
import { SentenceCasePipe } from 'src/app/shared/pipes/sentence-case.pipe';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faChevronCircleUp, faStar } from '@fortawesome/free-solid-svg-icons';

@NgModule({
  declarations: [
    HomePageComponent,
    QueryRecipeComponent,
    SentenceCasePipe
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FontAwesomeModule,
  ]
})
export class HomeModule {
  constructor(library: FaIconLibrary){
    library.addIcons(faChevronCircleUp, faStar);
  }
 }

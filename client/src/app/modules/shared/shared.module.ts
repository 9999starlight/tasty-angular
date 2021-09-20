import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SentenceCasePipe } from './pipes/sentence-case.pipe';
import { faArrowDown, faArrowUp, faEdit, faStar, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { InfoMessageComponent } from './components/info-message/info-message.component';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { LoaderComponent } from './components/loader/loader.component';
import { QueryRecipeComponent } from './components/query-recipe/query-recipe.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../auth/auth-interceptor';
import { PageErrorComponent } from './components/page-error/page-error.component';
import { PrivateRecipeComponent } from './components/private-recipe/private-recipe.component';
import { SortingButtonsComponent } from './components/sorting-buttons/sorting-buttons.component';
@NgModule({
  declarations: [
    SentenceCasePipe,
    InfoMessageComponent,
    TooltipComponent,
    LoaderComponent,
    QueryRecipeComponent,
    PageErrorComponent,
    PrivateRecipeComponent,
    SortingButtonsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    //FaIconLibrary
  ],
  exports: [
    SentenceCasePipe,
    InfoMessageComponent,
    TooltipComponent,
    LoaderComponent,
    QueryRecipeComponent,
    PrivateRecipeComponent,
    HttpClientModule,
    PageErrorComponent,
    SortingButtonsComponent
    /* FontAwesomeModule,
    FaIconLibrary */
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
})
export class SharedModule {
  constructor(library: FaIconLibrary){
    library.addIcons(faEdit, faTrashAlt, faStar, faArrowUp, faArrowDown);
  }
}

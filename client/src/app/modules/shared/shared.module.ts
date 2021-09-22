import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../auth/auth-interceptor';
// pipes
import { SentenceCasePipe } from './pipes/sentence-case.pipe';
// FA
import { faArrowDown, faArrowUp, faEdit, faSearch, faStar, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
// Components
import { InfoMessageComponent } from './components/info-message/info-message.component';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { LoaderComponent } from './components/loader/loader.component';
import { QueryRecipeComponent } from './components/query-recipe/query-recipe.component';
import { PageErrorComponent } from './components/page-error/page-error.component';
import { PrivateRecipeComponent } from './components/private-recipe/private-recipe.component';
import { SortingButtonsComponent } from './components/sorting-buttons/sorting-buttons.component';
import { SearchComponent } from './components/search/search.component';
@NgModule({
  declarations: [
    SentenceCasePipe,
    InfoMessageComponent,
    TooltipComponent,
    LoaderComponent,
    QueryRecipeComponent,
    PageErrorComponent,
    PrivateRecipeComponent,
    SortingButtonsComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    FormsModule
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
    SortingButtonsComponent,
    SearchComponent
    /* FontAwesomeModule,
    FaIconLibrary */
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
})
export class SharedModule {
  constructor(library: FaIconLibrary){
    library.addIcons(faEdit, faTrashAlt, faStar, faArrowUp, faArrowDown, faSearch);
  }
}

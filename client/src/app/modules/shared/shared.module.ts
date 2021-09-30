import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../auth/auth-interceptor';
// pipes
import { SentenceCasePipe } from './pipes/sentence-case.pipe';
// FA
import { faAngleDoubleDown, faAngleDoubleLeft, faAngleDoubleRight, faArrowDown, faArrowUp, faEdit, faInfoCircle, faMinus, faPlus, faSearch, faStar, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
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
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
import { OverlayComponent } from './components/overlay/overlay.component';
import { PaginationComponent } from './components/pagination/pagination.component';
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
    SearchComponent,
    RecipeFormComponent,
    OverlayComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
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
    SearchComponent,
    RecipeFormComponent,
    OverlayComponent,
    PaginationComponent
    /* FontAwesomeModule,
    FaIconLibrary */
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
})
export class SharedModule {
  constructor(library: FaIconLibrary){
    library.addIcons(faEdit, faTrashAlt, faStar, faArrowUp, faArrowDown, faSearch, faMinus, faPlus, faInfoCircle, faAngleDoubleLeft, faAngleDoubleRight);
  }
}

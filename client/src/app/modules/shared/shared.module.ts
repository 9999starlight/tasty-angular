import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SentenceCasePipe } from './pipes/sentence-case.pipe';
/* import { faSearch, faChevronDown, faUser, faBook, faEdit, faHeart, faUserShield, faHeartBroken } from '@fortawesome/free-solid-svg-icons'; */
//import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { InfoMessageComponent } from './components/info-message/info-message.component';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { LoaderComponent } from './components/loader/loader.component';
import { QueryRecipeComponent } from './components/query-recipe/query-recipe.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../auth/auth-interceptor';
@NgModule({
  declarations: [
    SentenceCasePipe,
    InfoMessageComponent,
    TooltipComponent,
    LoaderComponent,
    QueryRecipeComponent
  ],
  imports: [
    CommonModule,
    RouterModule
    /* FontAwesomeModule,
    FaIconLibrary */
  ],
  exports: [
    SentenceCasePipe,
    InfoMessageComponent,
    TooltipComponent,
    LoaderComponent,
    QueryRecipeComponent,
    HttpClientModule
    /* FontAwesomeModule,
    FaIconLibrary */
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
})
export class SharedModule {}

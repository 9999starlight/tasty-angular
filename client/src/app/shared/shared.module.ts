import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SentenceCasePipe } from './pipes/sentence-case.pipe';
/* import { faSearch, faChevronDown, faUser, faBook, faEdit, faHeart, faUserShield, faHeartBroken } from '@fortawesome/free-solid-svg-icons'; */
//import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { InfoMessageComponent } from './components/info-message/info-message.component';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { LoaderComponent } from './components/loader/loader.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../modules/auth/auth-interceptor';
@NgModule({
  declarations: [
    SentenceCasePipe,
    InfoMessageComponent,
    TooltipComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    /* FontAwesomeModule,
    FaIconLibrary */
  ],
  exports: [
    SentenceCasePipe,
    InfoMessageComponent,
    TooltipComponent,
    LoaderComponent,
    HttpClientModule
    /* FontAwesomeModule,
    FaIconLibrary */
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
})
export class SharedModule {}

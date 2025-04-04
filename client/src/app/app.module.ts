import { NgModule, inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BackToTopComponent } from './components/back-to-top/back-to-top.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSearch, faChevronDown, faChevronUp, faUser, faBook, faEdit, faHeart, faUserShield, faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './modules/auth/auth-interceptor';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
@NgModule(/* TODO(standalone-migration): clean up removed NgModule class manually. 
{
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        FontAwesomeModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HeaderComponent,
        NotFoundComponent,
        BackToTopComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
} */)
export class AppModule { 
  constructor(){
    const library = inject(FaIconLibrary);

    library.addIcons(faSearch, faChevronDown, faChevronUp, faUser, faBook, faEdit, faHeart, faUserShield, faHeartBroken);
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module' ;
import { LoginComponent } from './login/login.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faInfoCircle, faLock } from '@fortawesome/free-solid-svg-icons';
import { SharedModule } from 'src/app/modules/shared/shared.module';

//FaIconLibrary
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        FontAwesomeModule,
        AuthRoutingModule,
        SharedModule,
        LoginComponent
    ]
})
export class AuthModule {
  constructor(library: FaIconLibrary){
    library.addIcons(faLock, faInfoCircle);
  }
}

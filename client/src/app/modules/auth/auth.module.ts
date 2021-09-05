import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module' ;
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TooltipComponent } from 'src/app/components/shared/tooltip/tooltip.component';
import { InfoMessageComponent } from 'src/app/components/shared/info-message/info-message.component';
import { LoaderComponent } from 'src/app/components/shared/loader/loader.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faInfoCircle, faLock } from '@fortawesome/free-solid-svg-icons';

//FaIconLibrary
@NgModule({
  declarations: [
    LoginComponent,
    TooltipComponent,
    SignupComponent,
    InfoMessageComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    AuthRoutingModule
  ]
})
export class AuthModule {
  constructor(library: FaIconLibrary){
    library.addIcons(faLock, faInfoCircle);
  }
}

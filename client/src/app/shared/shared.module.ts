import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SentenceCasePipe } from './pipes/sentence-case.pipe';
/* import { faSearch, faChevronDown, faUser, faBook, faEdit, faHeart, faUserShield, faHeartBroken } from '@fortawesome/free-solid-svg-icons'; */
//import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { InfoMessageComponent } from './components/info-message/info-message.component';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { LoaderComponent } from './components/loader/loader.component';
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
    LoaderComponent
    /* FontAwesomeModule,
    FaIconLibrary */
  ]
})
export class SharedModule {}

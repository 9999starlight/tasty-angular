import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SentenceCasePipe } from './pipes/sentence-case.pipe';
/* import { faSearch, faChevronDown, faUser, faBook, faEdit, faHeart, faUserShield, faHeartBroken } from '@fortawesome/free-solid-svg-icons'; */
//import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    SentenceCasePipe
  ],
  imports: [
    CommonModule,
    /* FontAwesomeModule,
    FaIconLibrary */
  ],
  exports: [
    SentenceCasePipe,
    /* FontAwesomeModule,
    FaIconLibrary */
  ]
})
export class SharedModule { }

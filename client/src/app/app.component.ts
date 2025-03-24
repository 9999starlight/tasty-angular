import { Component } from '@angular/core';
import { fadeIn } from 'src/app/animations/fade.animations';
import {
  trigger,
  transition,
  style,
  animate,
  useAnimation,
  state,
  query,
} from '@angular/animations';
import { RouterOutlet } from '@angular/router';
import { BackToTopComponent } from './components/back-to-top/back-to-top.component';
import { HeaderComponent } from './components/header/header.component';
import { faSearch, faChevronDown, faChevronUp, faUser, faBook, faEdit, faHeart, faUserShield, faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [
        trigger('fadeAnimation', [
            transition('* => *', [
                query(':enter', [
                    useAnimation(fadeIn, { params: { time: '400ms' } })
                ], { optional: true }),
            ]),
        ]),
    ],
    standalone: true,
    imports: [
        HeaderComponent,
        RouterOutlet,
        BackToTopComponent,
    ],
})
export class AppComponent {
  constructor(library: FaIconLibrary){
    library.addIcons(faSearch, faChevronDown, faChevronUp, faUser, faBook, faEdit, faHeart, faUserShield, faHeartBroken);
  }

  // route transition
  prepareRoute(outlet: RouterOutlet) {
    if (!outlet.isActivated) return;
    else return outlet.activatedRoute.snapshot.url;
  }

  ngOnInit() {}
}

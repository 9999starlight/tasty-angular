import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { faSearch, faChevronDown, faChevronUp, faUser, faBook, faEdit, faHeart, faUserShield, faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  /*animations: [
        trigger('fadeAnimation', [
            transition('* => *', [
                query(':enter', [
                    useAnimation(fadeIn, { params: { time: '400ms' } })
                ], { optional: true }),
            ]),
        ]),
    ],*/
})
export class App {
  constructor(){
    const library = inject(FaIconLibrary);
    library.addIcons(faSearch, faChevronDown, faChevronUp, faUser, faBook, faEdit, faHeart, faUserShield, faHeartBroken);
  }

  prepareRoute(outlet: RouterOutlet) {
    if (!outlet.isActivated) return;
    else return outlet.activatedRoute.snapshot.url;
  }

}

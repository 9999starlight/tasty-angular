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
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fadeAnimation', [
      transition('* => *', [
        query(
          ':enter',
          [
            useAnimation(fadeIn, { params: { time: '400ms' } })
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class AppComponent {
  constructor() {}

  // route transition
  prepareRoute(outlet: RouterOutlet) {
    if (!outlet.isActivated) return;
    else return outlet.activatedRoute.snapshot.url;
  }

  ngOnInit() {}
}

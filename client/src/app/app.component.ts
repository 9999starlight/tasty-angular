import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BackToTopComponent } from "./shared/components/back-to-top/back-to-top.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BackToTopComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
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
export class AppComponent {
  prepareRoute(outlet: RouterOutlet) {
    if (!outlet.isActivated) return;
    else return outlet.activatedRoute.snapshot.url;
  }
}

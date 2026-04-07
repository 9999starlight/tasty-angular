import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BackToTopComponent } from "./shared/components/back-to-top/back-to-top.component";
import { HeaderComponent } from './core/layout/header/header.component';
import { UserFacade } from './features/user/facade/user.facade';
import { AuthFacade } from './features/auth/facade/auth.facade';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BackToTopComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private authFacade = inject(AuthFacade);
  private userFacade = inject(UserFacade);

  ngOnInit(): void {
    this.authFacade.initFromStorage$();
    this.userFacade.initFromStorage$();
  }
}

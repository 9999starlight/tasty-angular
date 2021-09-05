import { Component } from '@angular/core';
/* import { AuthService } from './modules/auth/auth.service';
import { BehaviorSubject } from 'rxjs'; 
import { CurrentUser } from './types/userTypes';*/
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(/*public authService: AuthService*/) {
    /*this.isLogged$ = this.authService.isLogged$;
    this.currentUser$ = this.authService.currentUser$; */
  } 
/*isLogged$: BehaviorSubject<boolean>;
  currentUser$: BehaviorSubject<CurrentUser | ''>;
   isLogged = false;
   currentUser = {};*/

  ngOnInit() {
    /*this.authService.isLogged$.subscribe((isLogged) => {
      this.isLogged = isLogged;
    });
    this.authService.currentUser$.subscribe((currentUser) => {
      this.currentUser = currentUser;
    });
    console.log('user: ', this.currentUser$.value, 'islogged$: ', this.isLogged$.value, 'islogged: ', this.isLogged,)*/
  }  
}

import { Component, OnInit } from '@angular/core';
import { faSignOutAlt, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { ElementRef } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { CurrentUser, UpdatedUser } from 'src/app/types/userTypes';
import { BehaviorSubject } from 'rxjs';
import { fromEvent, Observable, Subscription } from "rxjs";
import { debounceTime } from 'rxjs/operators';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  // user state
  isLogged$: BehaviorSubject<boolean | null>;
  currentUser$: BehaviorSubject<CurrentUser | UpdatedUser | null>;
  resizeObservable$!: Observable<any>
  resizeSubscription$: Subscription | undefined


  // menu/navigation
  displayMenu = false;
  mobileMenu = true;
  showUserDropdown = false;

  // icons
  faSignOutAlt = faSignOutAlt;
  faSignInAlt = faSignInAlt;

  constructor(
    private host: ElementRef,
    private router: Router,
    private authService: AuthService
  ) {
    // close mobile menu on route change:
    this.router.events.subscribe((event: Event) => {
      if ((this.mobileMenu && this.displayMenu) && event instanceof NavigationEnd) {
        this.displayMenu = false;
      }
    });

    this.isLogged$ = this.authService.isLogged$;
    this.currentUser$ = this.authService.currentUser$;
  }

  ngOnInit() {
    // show/hide mobile menu on different screen sizes
    this.menuDisplay(window.innerWidth)
    this.resizeObservable$ = fromEvent(window, 'resize')
    this.resizeSubscription$ = this.resizeObservable$.pipe(debounceTime(1)).subscribe(evt => { this.menuDisplay(evt.target.innerWidth) })
  }

  menuDisplay(width: number) {
    if (width < 992) {
      this.mobileMenu = true;
      this.displayMenu = false;
    } else {
      this.mobileMenu = false;
      this.displayMenu = true;
    }
  }

  getUserData() {
    console.log(this.currentUser$.value);
  }

  toggleUserDropdown() {
    this.showUserDropdown = !this.showUserDropdown;
  }

  toggleMobileMenu() {
    this.displayMenu = !this.displayMenu;
  }

  logout() {
    this.authService.signout();
    this.router.navigateByUrl('');
  }

  ngOnDestroy() {
    if (this.resizeSubscription$) {
      this.resizeSubscription$.unsubscribe();
    }
  }
}

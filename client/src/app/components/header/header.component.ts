import { Component, OnInit, inject } from '@angular/core';
import { faSignOutAlt, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { Router, Event, NavigationEnd, ActivationEnd, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { UIService } from 'src/app/modules/shared/sharedServices/ui.service';
import { CurrentUser, UpdatedUser } from 'src/app/types/userTypes';
import { BehaviorSubject } from 'rxjs';
import { fromEvent, Observable, Subscription } from "rxjs";
import { debounceTime } from 'rxjs/operators';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgClass, AsyncPipe } from '@angular/common';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [
    NgClass,
    RouterLink,
    FontAwesomeModule,
    RouterLinkActive,
    AsyncPipe
],
})
export class HeaderComponent implements OnInit {
  private router = inject(Router);
  private authService = inject(AuthService);
  private uiService = inject(UIService);

  // user state
  isLogged$: BehaviorSubject<boolean | null>;
  currentUser$: BehaviorSubject<CurrentUser | UpdatedUser | null>;
  resizeObservable$!: Observable<any>
  resizeSubscription$: Subscription | undefined

  // menu/navigation
  displayMenu = false;
  mobileMenu = true;
  showUserDropdown = false;
  showSearchBtn = false;

  // icons
  faSignOutAlt = faSignOutAlt;
  faSignInAlt = faSignInAlt;

  constructor() {

    this.router.events.subscribe((event: Event) => {
      // close mobile menu on route change:
      if ((this.mobileMenu && this.displayMenu) && event instanceof NavigationEnd) {
        this.displayMenu = false;
      }
      // show/hide search form button
      if (event instanceof ActivationEnd) {
        if (event.snapshot.data['search'] === true) {
          this.showSearchBtn = true;
        } else {
          this.showSearchBtn = false;
        }
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

  toggleSearch() {
    this.uiService.toggleSearchForm(!this.uiService.searchForm);
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

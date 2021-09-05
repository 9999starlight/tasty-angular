import { Component, OnInit } from '@angular/core';
import { faSignOutAlt, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { ElementRef } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { CurrentUser } from 'src/app/types/userTypes';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  // user state
  isLogged$: BehaviorSubject<boolean | null>;
  currentUser$: BehaviorSubject<CurrentUser | null>;

  // menu/navigation
  displayMenu = true;
  mobileMenu = false;
  showUserDropdown = false;
  observer: any;

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
    const observer = new ResizeObserver((entries) => {
      const width = entries[0].contentRect.width;
      //console.log(width);
      if (width < 992) {
        this.mobileMenu = true;
        this.displayMenu = false;
      } else {
        this.mobileMenu = false;
        this.displayMenu = true;
      }
    });
    observer.observe(this.host.nativeElement);
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

  ngOnDestroy() {
    this.observer.unobserve(this.host.nativeElement);
  }

  logout() {
    this.authService.signout();
    this.router.navigateByUrl('');
  }
}

import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {
  ActivationEnd,
  NavigationEnd,
  Router,
  Event,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { debounceTime, distinctUntilChanged, fromEvent, Observable } from 'rxjs';
import { Icons } from '../../../shared/ui/icons';
import { AuthFacade } from '../../../features/auth/facade/auth.facade';
import { CurrentUser, UpdatedUser } from '../../../features/user/models/userTypes';
import { UiService } from '../../../shared/services/ui.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { HEADER_TEXT } from '../../constants/texts/components-text';
import { UserFacade } from '../../../features/user/facade/user.facade';

@Component({
  selector: 'app-header',
  imports: [FontAwesomeModule, AsyncPipe, RouterLink, RouterLinkActive, JsonPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  private router = inject(Router);
  private uiService = inject(UiService);
  private destroyRef = inject(DestroyRef);
  private authFacade = inject(AuthFacade);
  private userFacade = inject(UserFacade);
  isLogged$: Observable<boolean>;
  currentUser$: Observable<CurrentUser | UpdatedUser | null>;
  headerText = HEADER_TEXT;
  resizeObservable$!: Observable<UIEvent>;

  // menu/navigation
  displayMenu = false;
  mobileMenu = true;
  showUserDropdown = false;
  showSearchBtn = false;
  icons = Icons;

  constructor() {
    this.router.events.subscribe((event: Event) => {
      // close mobile menu on route change:
      if (this.mobileMenu && this.displayMenu && event instanceof NavigationEnd) {
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
    this.isLogged$ = this.authFacade.isLogged$;
    this.currentUser$ = this.userFacade.currentUser$;
  }

  ngOnInit() {
    // show/hide mobile menu on different screen sizes
    this.menuDisplay(window.innerWidth);
    this.resizeObservable$ = fromEvent<UIEvent>(window, 'resize');
    this.resizeObservable$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        debounceTime(1),
        distinctUntilChanged())
      .subscribe(() => this.menuDisplay(window.innerWidth));
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
    this.uiService.toggleSearchForm(!this.uiService.isSearchShowed());
  }

  toggleMobileMenu() {
    this.displayMenu = !this.displayMenu;
  }

  logout() {
    this.authFacade.logout$();
    this.router.navigateByUrl('');
  }
}

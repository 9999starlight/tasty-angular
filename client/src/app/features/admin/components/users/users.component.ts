import { Component, inject, OnDestroy } from '@angular/core';
import { OverlayComponent } from '../../../../shared/components/overlay/overlay.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TooltipComponent } from '../../../../shared/components/tooltip/tooltip.component';
import { SortingButtonsComponent } from '../../../../shared/components/sorting-buttons/sorting-buttons.component';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { AsyncPipe, DatePipe } from '@angular/common';
import { UiService } from '../../../../shared/services/ui.service';
import { BehaviorSubject, combineLatest, filter, map, Observable, take } from 'rxjs';
import { UpdatedUser } from '../../../user/models/userTypes';
import { AdminFacade } from '../../facade/admin.facade';
import { Icons } from '../../../../shared/ui/icons';
import { sortByDate, sortByText, SortDirection } from '../../../../shared/utils/sorting.utils';
@Component({
  selector: 'app-users',
  imports: [
    OverlayComponent,
    FontAwesomeModule,
    TooltipComponent,
    SortingButtonsComponent,
    FormsModule,
    RouterLink,
    LoaderComponent,
    DatePipe,
    AsyncPipe,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnDestroy {
  uiService = inject(UiService);
  private adminFacade = inject(AdminFacade);
  searchTerm$ = new BehaviorSubject<string>('');
  selectedOption$ = new BehaviorSubject<'username' | 'user id'>('username');
  private usersSort$ = new BehaviorSubject<{
    field: 'title' | 'date' | null;
    direction: SortDirection;
  }>({
    field: null,
    direction: 'asc',
  });
  readonly icons = Icons;
  //searchValue = '';
  editModal = false;
  editAdmin: boolean | null = null;
  usersOptions = ['Username', 'User ID'];
  //selectedOption: 'username' | 'user id' = 'username';

  loading$: Observable<boolean>;
  usersCount$: Observable<number>;
  users$: Observable<UpdatedUser[]>;
  filteredUsers$: Observable<UpdatedUser[]>;
  error$: Observable<string | null>;
  userForEdit$: Observable<UpdatedUser | null>;
  userForEdit: UpdatedUser = {
    username: '',
    userId: '',
    isAdmin: false,
    isDisabled: false,
    createdAt: '',
    createdRecipes: [],
    favorites: [],
    user_image: '',
  };

  constructor() {
    this.loading$ = this.adminFacade.loading$;
    this.usersCount$ = this.adminFacade.usersCount$;
    this.users$ = this.adminFacade.users$;
    this.userForEdit$ = this.adminFacade.selectedUser$;
    this.error$ = this.adminFacade.error$;

    this.filteredUsers$ = combineLatest([
      this.users$,
      this.searchTerm$,
      this.selectedOption$,
      this.usersSort$,
    ]).pipe(
      map(([users, searchTerm, selectedOption, usersSort]) => {
        const query = searchTerm.trim().toLowerCase();
        const filteredUsers = !query
          ? users
          : users.filter((user) =>
              selectedOption === 'user id'
                ? user.userId.toLowerCase().includes(query)
                : user.username.toLowerCase().includes(query),
            );

        if (!usersSort.field) {
          return filteredUsers;
        }

        if (usersSort.field === 'title') {
          return sortByText(filteredUsers, (user) => user.username, usersSort.direction);
        }

        return sortByDate(filteredUsers, (user) => user.createdAt, usersSort.direction);
      }),
    );
  }

  openUserEdit(id: string, isAdminEdit: boolean) {
    this.adminFacade.setSelectedUserID$(id);
    this.userForEdit$ = this.adminFacade.selectedUser$;
    this.userForEdit$.pipe(take(1)).subscribe((selectedUser) => {
      if (!selectedUser) {
        return;
      }
      this.userForEdit = { ...selectedUser };
      this.editAdmin = isAdminEdit;
      this.uiService.toggleEditState(true);
    });
  }

  onChangeSelect(e: any) {
    this.selectedOption$.next(e.target.value);
  }

  closeUserEdit() {
    this.uiService.toggleEditState(false);
    this.adminFacade.setSelectedUserID$(null);
    this.userForEdit = {
      username: '',
      userId: '',
      isAdmin: false,
      isDisabled: false,
      createdAt: '',
      createdRecipes: [],
      favorites: [],
      user_image: '',
    };
    this.editAdmin = null;
  }

  onChangeAdmin(e: any) {
    this.userForEdit.isAdmin = e.target.checked;
  }

  onChangeUserStatus(e: any) {
    this.userForEdit.isDisabled = e.target.checked;
  }

  closeAfterEditing() {
    combineLatest([this.loading$, this.error$])
      .pipe(
        filter(([loading, error]) => !loading && !error),
        take(1),
      )
      .subscribe(() => this.closeUserEdit());
  }

  changeDisableStatus() {
    if (window.confirm('Change status for this user?')) {
      this.adminFacade.patchUser$(this.userForEdit.userId, 'disableStatus', {
        disableStatus: this.userForEdit.isDisabled,
      });
      this.closeAfterEditing();
    }
  }

  changeAdminStatus() {
    if (window.confirm('Change permissions for this user?')) {
      this.adminFacade.patchUser$(this.userForEdit.userId, 'adminStatus', {
        adminStatus: this.userForEdit.isAdmin,
      });
      this.closeAfterEditing();
    }
  }

  filterUsers(e: any) {
    this.searchTerm$.next(e.target.value);
  }

  onSortChange(sortConfig: { field: 'title' | 'rating' | 'date'; direction: 'asc' | 'desc' }) {
    if (sortConfig.field === 'rating') {
      return;
    }
    this.usersSort$.next({
      field: sortConfig.field,
      direction: sortConfig.direction,
    });
  }

  ngOnDestroy(): void {
    this.closeUserEdit();
  }
}

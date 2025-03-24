import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { UpdatedUser } from 'src/app/types/userTypes';
import { SortingService } from '../../shared/sharedServices/sorting.service';
import { UIService } from '../../shared/sharedServices/ui.service';
import { Subscription } from 'rxjs';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SortingButtonsComponent } from '../../shared/components/sorting-buttons/sorting-buttons.component';
import { TooltipComponent } from '../../shared/components/tooltip/tooltip.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OverlayComponent } from '../../shared/components/overlay/overlay.component';
import { NgClass, DatePipe } from '@angular/common';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    standalone: true,
    imports: [
    OverlayComponent,
    FontAwesomeModule,
    TooltipComponent,
    NgClass,
    SortingButtonsComponent,
    FormsModule,
    RouterLink,
    LoaderComponent,
    DatePipe
],
})
export class UsersComponent implements OnInit, OnDestroy {
  searchValue = '';
  editModal = false;
  isLoading = false;
  users: UpdatedUser[] = [];
  filteredUsers: UpdatedUser[] = [];
  usersOptions = ['Username', 'User ID'];
  selectedOption = 'username';
  editAdmin: boolean | null = null;
  userForEdit: any = {
    username: '',
    _id: '',
    isAdmin: false,
    isDisabled: false,
    createdAt: '',
    createdRecipes: [],
    favorites: [],
    user_image: '',
  };
  usersSubscription?: Subscription;
  userSubscription?: Subscription;
  disableSubscription?: Subscription;
  adminSubscription?: Subscription;
  subscriptions: (Subscription | undefined)[] = [];

  constructor(
    private adminService: AdminService,
    public sortingService: SortingService,
    public uiService: UIService
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
    this.subscriptions.push(
      this.usersSubscription,
      this.userSubscription,
      this.disableSubscription,
      this.adminSubscription
    );
  }

  onChangeSelect(e: any) {
    this.selectedOption = e.target.value;
  }

  sortUsernameAscending() {
    const sortByUser = this.filteredUsers.sort((a, b) =>
      a.username.toLowerCase().localeCompare(b.username.toLowerCase())
    );
    return sortByUser;
  }

  sortUsernameDescending() {
    const sortByUser = this.filteredUsers.sort((a, b) =>
      b.username.toLowerCase().localeCompare(a.username.toLowerCase())
    );
    return sortByUser;
  }

  openUserEdit(id: string, isAdminEdit: boolean) {
    this.userSubscription = this.adminService.getUser(id).subscribe(
      (res: UpdatedUser) => {
        if (res) {
          this.userForEdit = JSON.parse(JSON.stringify(res));
          isAdminEdit ? (this.editAdmin = true) : (this.editAdmin = false);
          this.uiService.toggleEditState(true);
        }
      },
      (error) => {
        console.log(error.statusText);
      }
    );
  }

  fetchUsers() {
    this.usersSubscription = this.adminService.getUsers().subscribe(
      (res) => {
        if (res) {
          console.log(res);
          this.users = [...res];
          this.filteredUsers = [...this.users];
        }
      },
      (error) => {
        this.isLoading = false;
        //this.errorMessage = `Error: ${error.statusText}`;
        console.log(error.statusText);
      }
    );
  }

  closeUserEdit() {
    this.uiService.toggleEditState(false);
    this.userForEdit = {
      username: '',
      _id: '',
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
    //console.log(this.userForEdit.isAdmin);
  }

  onChangeUserStatus(e: any) {
    this.userForEdit.isDisabled = e.target.checked;
    //console.log(this.userForEdit.isDisabled);
  }

  changeDisableStatus() {
    // console.log(this.userForEdit._id)
    if (window.confirm('Change status for this user?')) {
      this.disableSubscription = this.adminService
        .patchUser(this.userForEdit._id, 'disableStatus', {
          disableStatus: this.userForEdit.isDisabled,
        })
        .subscribe(
          (message: any) => {
            if (message) {
              console.log(message);
              this.closeUserEdit();
              this.fetchUsers();
            }
          },
          (error) => {
            console.log(error.statusText);
          }
        );
    }
  }
  changeAdminStatus() {
    if (window.confirm('Change permissions for this user?')) {
      this.adminSubscription = this.adminService
        .patchUser(this.userForEdit._id, 'adminStatus', {
          adminStatus: this.userForEdit.isAdmin,
        })
        .subscribe(
          (message: any) => {
            if (message) {
              console.log(message);
              this.closeUserEdit();
              this.fetchUsers();
            }
          },
          (error) => {
            console.log(error.statusText);
          }
        );
      this.closeUserEdit();
    }
  }

  filterUsers() {
    if (!this.searchValue) {
      this.filteredUsers = [...this.filteredUsers];
    }
    // console.log(this.selectedOption, this.searchValue);
    this.filteredUsers = this.users.filter((user) => {
      if (this.selectedOption === 'user id') {
        return user.userId
          .toLowerCase()
          .includes(this.searchValue.toLowerCase());
      } else {
        return user.username
          .toLowerCase()
          .includes(this.searchValue.toLowerCase());
      }
    });
  }

  ngOnDestroy() {
    this.closeUserEdit();
    this.subscriptions.forEach((sub) => {
      if (!sub === undefined) sub?.unsubscribe();
    });
  }
}

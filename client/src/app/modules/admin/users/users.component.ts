import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { CurrentUser, UpdatedUser } from 'src/app/types/userTypes';
import { SortingService } from '../../shared/sharedServices/sorting.service';
import { UIService } from '../../shared/sharedServices/ui.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  searchValue = '';
  //editModal = false;
  isLoading = false;
  users: UpdatedUser[] = [];
  filteredUsers = [];
  usersOptions = ['Username', 'User ID'];
  selectedOption = 'username';
  editAdmin = false;
  userForEdit!: UpdatedUser | CurrentUser | null;

  constructor(private adminService: AdminService, public sortingService: SortingService, public uiService: UIService) { }

  ngOnInit(): void {
    this.fetchUsers()
  }

  sortUsernameAscending() {
    const sortByUser = this.users.sort((a, b) =>
      a.username.toLowerCase().localeCompare(b.username.toLowerCase())
    )
    return sortByUser
  }

  sortUsernameDescending() {
    const sortByUser = this.users.sort((a, b) =>
      b.username.toLowerCase().localeCompare(a.username.toLowerCase())
    )
    return sortByUser
  }

  openUserEdit(id: string) {
    this.uiService.toggleEditState(true);
    this.editAdmin = true
    this.adminService.getUser(id).subscribe((res: any) => {
      if (res) {
        //this.userForEdit = Object.assign(this.userForEdit, res);
        console.log('res: ', res)
        console.log('user for edit: ' + this.userForEdit)
      }
    }, error => {
      console.log(error.statusText);
    })
  }

  adminEditing(id: string) {
    this.uiService.toggleEditState(true);
    this.editAdmin = true
    this.openUserEdit(id)
  }

  fetchUsers() {
    this.adminService.getUsers().subscribe((res) => {
      if (res) {
        console.log(res)
        this.users = [...res];
      }
    }, error => {
      this.isLoading = false;
      //this.errorMessage = `Error: ${error.statusText}`;
      console.log(error.statusText);
    })
  }

  closeUserEdit() {
    this.uiService.toggleEditState(false);
    this.userForEdit = null
    this.editAdmin = false
  }

  changeDisableStatus() {
    if (window.confirm('Change status for this user?')) {


      this.closeUserEdit()
    }
  }
  changeAdminStatus() {
    if (window.confirm('Change permissions for this user?')) {


      this.closeUserEdit()
    }
  }

  /* filterUsers() {
    // if there is no search set initial array for pagination
    if (!this.searchValue) {
      return this.allUsers.slice(this.firstResultIndex, this.lastResultIndex)
    }
    return this.allUsers.filter((user) => {
      if (this.selectedValueUsers === 'User ID') {
        return user.userId
          .toLowerCase()
          .includes(this.searchValue.toLowerCase())
      } else {
        return user.username
          .toLowerCase()
          .includes(this.searchValue.toLowerCase())
      }
    })
  } */

  /* async changeDisableStatus() {
    try {
      if (window.confirm('Change status for this user?')) {
        const res = await this.editUser(
          this.userForEdit._id,
          'disableStatus',
          {
            disableStatus: this.userForEdit.isDisabled
          }
        )
        if (res) {
          this.closeUserEdit()
          this.usersFetch()
        }
      }
    } catch (error) {
      console.log(error.message)
    }
  },
  async changeAdminStatus() {
    try {
      if (window.confirm('Change Admin status for this user?')) {
        const res = await this.editUser(this.userForEdit._id, 'adminStatus', {
          adminStatus: this.userForEdit.isAdmin
        })
        if (res) {
          this.closeUserEdit()
          this.usersFetch()
        }
      }
    } catch (error) {
      console.log(error.message)
    }
  },
  async openUserEdit(id) {
    try {
      const user = await this.fetchSingleUser(id)
      this.userForEdit = user.data
      this.editModal = true
    } catch (error) {
      console.log(error.message)
    }
  },
  adminEditing(id) {
    this.editAdmin = true
    this.openUserEdit(id)
  },
  closeUserEdit() {
    this.userForEdit = null
    this.editAdmin = false
    this.editModal = false
  }, */

}

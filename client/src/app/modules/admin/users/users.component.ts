import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { UpdatedUser } from 'src/app/types/userTypes';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  searchValue = '';
  editModal = false;
  isLoading = false;
  users: UpdatedUser[] = [];
  filteredUsers = [];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.fetchUsers()
  }

  allUserRecipes(id: string) {}

  openUserEdit(id: string) {}

  adminEditing(id: string) {}

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

}

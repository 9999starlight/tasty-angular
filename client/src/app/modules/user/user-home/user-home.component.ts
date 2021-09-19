import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { CurrentUser, UpdatedUser } from 'src/app/types/userTypes';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {
  user: CurrentUser | UpdatedUser;
  preview = false;
  filename = '';
  isLoading = false;
  message = '';
  messageStatus = false;

  constructor(private authService: AuthService) {
    this.user = this.authService.user!;
   }

  ngOnInit(): void {
  }

  selectImageFile() {}

  removeSelectedImage(){}

  updateMessage(msg: string) {}

  submitImage(){}

}

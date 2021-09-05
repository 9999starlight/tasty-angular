import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CurrentUser } from 'src/app/types/userTypes';

import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  username: string = '';
  password: string = '';
  currentUser!: CurrentUser | null;
  errorMessage:string | null = null;
  isLoading: boolean = false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onClear(msg: string) {
    this.errorMessage = msg;
 }

 onSubmit(registerForm: NgForm) {
   this.isLoading = true;
   if(registerForm.invalid) {
     return;
   }

   this.authService.register(registerForm.value).subscribe({
     next: res => {
      this.errorMessage = '';
      this.isLoading = false;
      this.router.navigateByUrl('');
     },
     error: (err) => {
       console.log(err.error.message);
       this.errorMessage = err.error.message;
       this.isLoading = false;
       //console.log('errorMessage: ', this.errorMessage)
     }
   });
 }

}

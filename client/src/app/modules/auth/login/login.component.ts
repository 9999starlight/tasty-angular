import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  errorMessage:string | null = null;
  isLoading: boolean = false;
  
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onClear(msg: string) {
     this.errorMessage = msg;
  }

  onSubmit(loginForm: NgForm) {
    this.isLoading = true;
    if(loginForm.invalid) {
      return;
    }

    this.authService.login(loginForm.value).subscribe({
      next: res => {
          this.errorMessage = '';
          this.isLoading = false;
          this.router.navigateByUrl('');
      },
      error: (err) => {
        console.log(err.error.message);
        this.errorMessage = err.error.message;
        this.isLoading = false;
      }
    });
  
  }
}

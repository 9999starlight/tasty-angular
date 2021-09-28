import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  errorMessage: string | null = null;
  isLoading: boolean = false;
  isRegisterState = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onClear(msg: string) {
    this.errorMessage = msg;
  }

  toggleRegisterState() {
    this.isRegisterState = !this.isRegisterState;
  }

  onSubmit(authForm: NgForm) {
    this.isLoading = true;
    if (authForm.invalid) {
      return;
    }

    let authObs;

    if (this.isRegisterState) {
      authObs = this.authService.register(authForm.value);
    } else {
      authObs = this.authService.login(authForm.value);
    }

    authObs.subscribe({
      next: (res) => {
        this.errorMessage = '';
        this.isLoading = false;
        this.router.navigateByUrl('');
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isLoading = false;
        console.log(err.error.message);
      },
    });
  }
}

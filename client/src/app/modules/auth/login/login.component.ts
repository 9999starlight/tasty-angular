import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ImageValidatorService } from '../../shared/sharedServices/image-validator.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { InfoMessageComponent } from '../../shared/components/info-message/info-message.component';
import { NgClass } from '@angular/common';
import { TooltipComponent } from '../../shared/components/tooltip/tooltip.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [
    FormsModule,
    FontAwesomeModule,
    TooltipComponent,
    NgClass,
    InfoMessageComponent,
    LoaderComponent
],
})
export class LoginComponent implements OnInit, OnDestroy {
  username: string = '';
  password: string = '';
  errorMessage: string | null = null;
  isLoading: boolean = false;
  isRegisterState = false;
  authSubscription?: Subscription;
  preview: string | null = '';
  filename = '';
  image: any = '';

  constructor(private authService: AuthService, private router: Router, private imgValidator: ImageValidatorService, private el: ElementRef) {}

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
    const formData = new FormData;
    formData.append('username', authForm.value.username)
    formData.append('password', authForm.value.password)
    if(this.isRegisterState && this.image) {
      console.log(this.image)
      formData.append('user_image', this.el.nativeElement.querySelector('#image').files[0])
    }
    let authObs;
    if (this.isRegisterState) {
      authObs = this.authService.register(formData);
    } else {
      authObs = this.authService.login(authForm.value);
    }

    this.authSubscription = authObs.subscribe({
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

  uploadFile(value: any): void {
    const file = (value.target as HTMLInputElement)?.files?.[0];
    console.log(this.imgValidator.typeValidation(file));
    if (!this.imgValidator.typeValidation(file)) {
      this.errorMessage = 'Unsupported file! Please check image format and size';
      this.removeSelectedImage();
      console.log('file after bad valid: ' + file)
      return;
    }
    this.filename = file!.name;
    this.image = file;

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
      console.log(this.preview)
    };
    reader.readAsDataURL(file!);
  }

  removeSelectedImage() {
    const fileInput = this.el.nativeElement.querySelector('#image');
    fileInput.value = '';
    this.image = null;
    this.filename = '';
    this.preview = null;
  }

  ngOnDestroy() {
    this.authSubscription?.unsubscribe();
  }
}

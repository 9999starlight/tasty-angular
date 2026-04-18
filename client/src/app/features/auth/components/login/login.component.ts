import { Component, ElementRef, inject, OnDestroy } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthFacade } from '../../facade/auth.facade';
import { ImageValidatorService } from '../../../../shared/services/image-validator.service';
import { Icons } from '../../../../shared/ui/icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthForm } from '../../models/auth-form';
import { InfoMessageComponent } from '../../../../shared/components/info-message/info-message.component';
import { TooltipComponent } from '../../../../shared/components/tooltip/tooltip.component';
import { LoaderComponent } from "../../../../shared/components/loader/loader.component";
import { Observable } from 'rxjs';
import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { LOGIN_TEXT } from '../../../../core/constants/texts/components-text';
import { toSignal } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [ReactiveFormsModule, FontAwesomeModule, InfoMessageComponent, TooltipComponent, LoaderComponent, AsyncPipe, TitleCasePipe]
})
export class LoginComponent implements OnDestroy{
  constructor(){
    this.loading$ = this.authFacade.loading$;
    this.authError$ = this.authFacade.error$;
  }
  private authFacade = inject(AuthFacade);
  private imgValidator = inject(ImageValidatorService);
  private el = inject(ElementRef);

  authError$: Observable<string | null>;
  loading$: Observable<boolean>;
  errorMessage: string | null = null;
  isRegisterState = false;
  preview: string | null = null;
  filename = '';
  image: File | null = null;
  readonly icons = Icons;
  readonly loginTexts = LOGIN_TEXT;
  readonly isSubmitting = toSignal(this.authFacade.loading$, { initialValue: false });

  authForm = new FormGroup<AuthForm>({
    username: new FormControl<string>('', {
      nonNullable: true,
      validators: [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9_-]{6,15}$/)
      ],
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [
      Validators.required,
      Validators.pattern(/\S{6,}/),
      ],
    }),
    user_image: new FormControl<File | null>(null, {
      validators: [this.imgValidator.imageValidator()],
    }),
  });


  onClearMessage(msg: string) {
    this.errorMessage = msg;
    this.authFacade.clearError$();
  }

  toggleRegisterState() {
    if (this.isRegisterState && this.authForm.controls.user_image.value) {
      this.removeSelectedImage();
    }
    this.isRegisterState = !this.isRegisterState;
  }

  uploadFile(event: Event): void {
    const file = (event.target as HTMLInputElement)?.files?.[0] ?? null;
    this.authForm.controls.user_image.setValue(file);
    this.authForm.controls.user_image.markAsTouched();
    this.authForm.controls.user_image.updateValueAndValidity();
    if (!file || this.authForm.controls.user_image.invalid) {
      this.errorMessage = this.loginTexts.errors.file_upload_error;
      this.removeSelectedImage();
      return;
    }
    this.errorMessage = null;
    this.revokePreviewUrl();
    this.filename = file.name;
    this.image = file;
    this.preview = URL.createObjectURL(file);
  }

  removeSelectedImage() {
    const fileInput = this.el.nativeElement.querySelector('#image') as HTMLInputElement | null;
    if (fileInput) {
      fileInput.value = '';
    }
    this.authForm.controls.user_image.setValue(null);
    this.authForm.controls.user_image.markAsPristine();
    this.authForm.controls.user_image.markAsUntouched();
    this.revokePreviewUrl();
    this.image = null;
    this.filename = '';
  }

  private revokePreviewUrl(): void {
    if (!this.preview) {
      return;
    }
    URL.revokeObjectURL(this.preview);
    this.preview = null;
  }

  onSubmit() {
    if (this.authForm.invalid || this.isSubmitting()) {
      return;
    }
    const { username, password } = this.authForm.getRawValue();
    if (this.isRegisterState) {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      if (this.image) {
        formData.append('user_image', this.image);
      }
      this.authFacade.register$(formData);
    } else {
      this.authFacade.login$({ username, password });
    }
  }

  ngOnDestroy(): void {
    this.revokePreviewUrl();
  }
}

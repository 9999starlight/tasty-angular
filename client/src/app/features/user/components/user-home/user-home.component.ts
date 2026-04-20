import { Component, DestroyRef, ElementRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserFacade } from '../../facade/user.facade';
import { ImageValidatorService } from '../../../../shared/services/image-validator.service';
import { CurrentUser, UpdatedUser } from '../../models/userTypes';
import { BehaviorSubject, filter, Observable } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { InfoMessageComponent } from '../../../../shared/components/info-message/info-message.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  emptyInfoMessage,
  InfoMessage,
  mapTextToInfoMessage,
  mergeInfoMessages,
} from '../../../../shared/utils/info-message.utils';

interface UserImageForm {
  user_image: FormControl<File | null>;
}

@Component({
  selector: 'app-user-home',
  imports: [AsyncPipe, DatePipe, ReactiveFormsModule, LoaderComponent, InfoMessageComponent],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.scss',
})
export class UserHomeComponent {
  private router = inject(Router);
  private userFacade = inject(UserFacade);
  private imgValidator = inject(ImageValidatorService);
  private el = inject(ElementRef);
  private destroyRef = inject(DestroyRef);

  currentUser$: Observable<CurrentUser | UpdatedUser | null>;
  loading$: Observable<boolean>;
  private localInfoMessage$ = new BehaviorSubject<InfoMessage>(emptyInfoMessage);
  infoMessage$: Observable<InfoMessage>;
  imageForm = new FormGroup<UserImageForm>({
    user_image: new FormControl<File | null>(null, {
      validators: [this.imgValidator.imageValidator()],
    }),
  });
  preview: string | null = null;
  private previewObjectUrl: string | null = null;
  filename = '';

  constructor() {
    this.currentUser$ = this.userFacade.currentUser$;
    this.loading$ = this.userFacade.loading$;
    this.infoMessage$ = this.buildInfoMessageStream();
  }

  private buildInfoMessageStream(): Observable<InfoMessage> {
    const userError$ = mapTextToInfoMessage(this.userFacade.error$, false);
    const userSuccess$ = mapTextToInfoMessage(this.userFacade.successMessage$, true);

    return mergeInfoMessages(this.localInfoMessage$, userError$, userSuccess$);
  }

  setInfoMessage(payload: { message: string; status: boolean }) {
    this.localInfoMessage$.next(payload);
  }

  onClear() {
    this.setInfoMessage({ message: '', status: false });
    this.userFacade.clearError$();
    this.userFacade.clearSuccessMessage$();
  }

  private handleInvalidImage(file: File | null, clearSelectionOnInvalid: boolean): file is null {
    const imageControl = this.imageForm.controls.user_image;

    if (!file || imageControl.invalid) {
      this.setInfoMessage({ message: 'Unsupported file! Please check image format and size', status: false });
      imageControl.markAsTouched();

      if (clearSelectionOnInvalid) {
        this.removeSelectedImage();
      }

      return true;
    }

    return false;
  }

  selectImageFile(event: Event): void {
    const file = (event.target as HTMLInputElement)?.files?.[0] ?? null;
    const imageControl = this.imageForm.controls.user_image;
    imageControl.setValue(file);
    imageControl.markAsTouched();
    imageControl.updateValueAndValidity();

    if (this.handleInvalidImage(file, true)) {
      return;
    }

    this.setInfoMessage({ message: '', status: false });
    this.filename = file.name;

    // Generate local preview URL for the selected file.
    if (this.previewObjectUrl) {
      URL.revokeObjectURL(this.previewObjectUrl);
    }
    this.previewObjectUrl = URL.createObjectURL(file);
    this.preview = this.previewObjectUrl;
  }

  removeSelectedImage() {
    const fileInput = this.el.nativeElement.querySelector('#userImageUpload') as HTMLInputElement | null;
    if (fileInput) {
      fileInput.value = '';
    }
    this.imageForm.controls.user_image.reset(null);
    this.filename = '';
    if (this.previewObjectUrl) {
      URL.revokeObjectURL(this.previewObjectUrl);
      this.previewObjectUrl = null;
    }
    this.preview = null;
  }

  submitImage(user: CurrentUser | UpdatedUser | null) {
    if (!user) {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: this.router.url },
      });
      return;
    }

    const selectedFile = this.imageForm.controls.user_image.value;
    this.imageForm.controls.user_image.updateValueAndValidity();
    if (this.handleInvalidImage(selectedFile, false)) {
      return;
    }

    const formData = new FormData();
    formData.append('user_image', selectedFile);
    this.userFacade.updateUserImage$(formData, user.userId);
    this.removeSelectedImage();
  }

}

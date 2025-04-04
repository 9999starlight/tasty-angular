import { Component, ElementRef, OnInit, OnDestroy, inject } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { CurrentUser, UpdatedUser } from 'src/app/types/userTypes';
import { ImageValidatorService } from '../../shared/sharedServices/image-validator.service';
import { Subscription } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { InfoMessageComponent } from '../../shared/components/info-message/info-message.component';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { AsyncPipe, DatePipe } from '@angular/common';
@Component({
    selector: 'app-user-home',
    templateUrl: './user-home.component.html',
    styleUrls: ['./user-home.component.scss'],
    standalone: true,
    imports: [
    LoaderComponent,
    InfoMessageComponent,
    AsyncPipe,
    DatePipe
],
})
export class UserHomeComponent implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private imgValidator = inject(ImageValidatorService);
  private el = inject(ElementRef);

  currentUser$: BehaviorSubject<CurrentUser | UpdatedUser | null>;
  preview: string | null = null;
  filename = '';
  isLoading = false;
  message = '';
  messageStatus = false;
  imgSubscription?: Subscription;

  constructor() {
    this.currentUser$ = this.authService.currentUser$;
  }

  ngOnInit(): void {
    console.log(this.currentUser$)
  }

  selectImageFile(value: any): void {
    const file = (value.target as HTMLInputElement)?.files?.[0];
    if (!this.imgValidator.typeValidation(file)) {
      this.messageStatus = false;
      this.message = 'Unsupported file! Please check image format and size';
      this.removeSelectedImage();
      // console.log('file after bad valid: ' + file)
      return;
    }
    this.filename = file!.name;

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    };
    reader.readAsDataURL(file!);
  }

  removeSelectedImage() {
    const fileInput = this.el.nativeElement.querySelector('#userImageUpload');
    fileInput.value = '';
    this.filename = '';
    this.preview = null;
  }

  updateMessage(msg: string) {
    this.message = msg;
  }

  submitImage() {
    this.isLoading = true;
    if (!this.el.nativeElement.querySelector('#userImageUpload').value) {
      return;
    }
    const formData = new FormData;
    formData.append('user_image', this.el.nativeElement.querySelector('#userImageUpload').files[0])

    this.imgSubscription = this.authService.updateUserImage(formData).subscribe({
      next: (res) => {
        this.messageStatus = true;
        this.message = 'Image uploaded successfully!';
        this.isLoading = false;

      },
      error: (err) => {
        this.messageStatus = false;
        this.message = err.error.message;
        this.isLoading = false;
        console.log(err.error.message);
      },
    });
    this.removeSelectedImage();
  }

  ngOnDestroy() {
    this.imgSubscription?.unsubscribe;
  }
}

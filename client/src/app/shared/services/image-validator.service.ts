import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ImageValidatorService {
  typeValidation(file: File): boolean {
    const ext = file.type.split('/');
    if (!ext[1].match(/jpg|jpeg|png|gif$/i)) {
      //this.valMessage = 'Unsupported file type!'
      return false;
    } else if (file.size > 1024 * 1024 * 2) {
      //this.valMessage = 'File is larger than 2Mb!'
      return false;
    } else {
      //this.valMessage = ''
      return true;
    }
  }

  imageValidator(): ValidatorFn {
    return (control: AbstractControl<File | null>): ValidationErrors | null => {
      const file = control.value;
      if (!file) {
        return null;
      }
      return this.typeValidation(file) ? null : { invalid_image: true };
    };
  }
}

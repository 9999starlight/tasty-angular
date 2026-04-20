import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ImageValidatorService {
  typeValidation(file: File): boolean {
    const typePart = file.type?.split('/')[1] ?? '';
    const namePart = file.name?.split('.').pop() ?? '';
    const imageType = (typePart || namePart).toLowerCase();
    if (!imageType.match(/jpg|jpeg|png|gif$/i)) {
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

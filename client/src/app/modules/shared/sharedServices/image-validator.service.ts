import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl, FormControl } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class ImageValidatorService {

  constructor() { }

  imageTypeValidation(control: FormControl | any): { [key: string]: boolean } | null {
    const file = control.value;
    if (file) {
      const ext = file.type.split('/')
      if (!ext[1].match(/jpg|jpeg|png|gif$/i)) {
        return {
          invalidFileType: true
        };
      }
    }
    return null;
  }

  imageSizeValidation(control: FormControl | any): { [key: string]: boolean } | null {
    const file = control.value;
    if (file) {
      if (file.size > 1024 * 1024 * 2) {
        return {
          invalidFileSize: true
        };
      }
    }
    return null;
  }
}


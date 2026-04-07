import { FormControl } from "@angular/forms";

export interface AuthForm {
  username: FormControl<string>;
  password: FormControl<string>;
  user_image: FormControl<File | null>;
}
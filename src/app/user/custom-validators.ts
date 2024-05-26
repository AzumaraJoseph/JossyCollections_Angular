
import { AbstractControl, ValidatorFn } from "@angular/forms";


export function passwordsMatchValidator(passwordField: string, confirmPasswordField: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const password = control.get(passwordField);
    const confirmPassword = control.get(confirmPasswordField);

   
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordsMismatch: true };
      }
      return null;
  }}


  // passwordsMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
  //   const password = control.get('password');
  //   const confirmPassword = control.get('confirmPassword');
  //   if (password && confirmPassword && password.value !== confirmPassword.value) {
  //     return { passwordsMismatch: true };
  //   }
  //   return null;
  // }




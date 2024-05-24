
import { AbstractControl, ValidatorFn } from "@angular/forms";

// export function confirmPasswordValidator(passwordField: string, confirmPasswordField: string): ValidatorFn {
//     return (control: AbstractControl): { [key: string]: boolean } | null => {
//         const password = control.get(passwordField);
//         const confirmPassword = control.get(confirmPasswordField);

//         if (!password || !confirmPassword) {
//         return null;
//         }

//         return password.value === confirmPassword.value ? null : { passwordMismatch: true };
//     };
// }




export function passwordsMatchValidator(passwordField: string, confirmPasswordField: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const password = control.get(passwordField);
    const confirmPassword = control.get(confirmPasswordField);

   

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordsMismatch: true };
      }
      return null;
  };

  
}

// export function passwordsMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
//   const password = control.get('password');
//   const confirmPassword = control.get('confirmPassword');
//   if (password && confirmPassword && password.value !== confirmPassword.value) {
//     return { passwordsMismatch: true };
//   }
//   return null;
// }


// import { AbstractControl, ValidatorFn, FormGroup } from '@angular/forms';

// export function confirmPasswordValidator(passwordField: string, confirmPasswordField: string): ValidatorFn {
//   return (control: AbstractControl): { [key: string]: boolean } | null => {
//     const formGroup = control as FormGroup;
//     const password = formGroup.get(passwordField);
//     const confirmPassword = formGroup.get(confirmPasswordField);

//     if (!password || !confirmPassword) {
//       return null;
//     }

//     return password.value === confirmPassword.value ? null : { passwordMismatch: true };
//   };
// }



// export function passwordsMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
//   const password = control.get('password');
//   const confirmPassword = control.get('confirmPassword');
//   if (password && confirmPassword && password.value !== confirmPassword.value) {
//     return { passwordsMismatch: true };
//   }
//   return null;
// }


// import { AbstractControl, ValidatorFn } from '@angular/forms';

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



// import { AbstractControl, ValidatorFn } from '@angular/forms';

// export function confirmPasswordValidator(passwordField: string, confirmPasswordField: string): ValidatorFn {
//   return (formGroup: AbstractControl): { [key: string]: boolean } | null => {
//     const password = formGroup.get(passwordField);
//     const confirmPassword = formGroup.get(confirmPasswordField);

//     if (!password || !confirmPassword) {
//       return null;
//     }

//     if (confirmPassword.errors && !confirmPassword.errors['passwordMismatch']) {
//       return null;
//     }

//     if (password.value !== confirmPassword.value) {
//       confirmPassword.setErrors({ passwordMismatch: true });
//     } else {
//       confirmPassword.setErrors(null);
//     }

//     return null;
//   };
// }


import { AbstractControl, ValidatorFn, FormGroup } from '@angular/forms';

export function confirmPasswordValidator(passwordField: string, confirmPasswordField: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const formGroup = control as FormGroup;
    const password = formGroup.get(passwordField);
    const confirmPassword = formGroup.get(confirmPasswordField);

    if (!password || !confirmPassword) {
      return null;
    }

    return password.value === confirmPassword.value ? null : { passwordMismatch: true };
  };
}



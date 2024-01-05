import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const samePasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password')!;
  const confirmPassword = control.get('confirmPassword')!;

  return password.value !== confirmPassword.value
    ? { passwordMatch: true }
    : null;
};

export const passwordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.value;

  if (!/^[A-Z]+/.test(password)) {
    return { startswithuppercase: true };
  }
  if (!/[0-9]+/.test(password)) {
    return { containnumber: true };
  }
  if (password.length < 8) {
    return { passwordlength: true };
  }
  if (!/[*$@?=]+/.test(password)) {
    return { containsymbol: true };
  }

  return null;
};

export const passwordContainsNoNameValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const name = <string>control.get('name')!.value;
  const username = <string>control.get('username')!.value;
  const password = control.get('password')!.value;

  if (
    password.toLowerCase().includes(name.toLowerCase()) ||
    password.toLowerCase().includes(username.toLowerCase())
  ) {
    return { passwordContainName: true };
  }

  return null;
};

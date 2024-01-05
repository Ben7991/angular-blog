import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertModalComponent } from 'src/app/components/alert-modal/alert-modal.component';
import { AlertModalDirective } from 'src/app/shared/directives/alert-modal.directive';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/types/user';
import {
  passwordContainsNoNameValidator,
  passwordValidator,
  samePasswordValidator,
} from 'src/app/shared/validators/password-validator';
import { UniqueUsernameValidator } from 'src/app/shared/validators/username-validator';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent {
  isLoading = false;
  registerSubscription: Subscription | undefined;
  @ViewChild(AlertModalDirective, { static: true })
  alertDirective!: AlertModalDirective;
  registerForm = new FormGroup(
    {
      name: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z ]+$/),
      ]),
      username: new FormControl(
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9]+[0-9]+[a-zA-Z0-9]+$/),
          Validators.maxLength(15),
        ],
        this.usernameValidator.validate.bind(this.usernameValidator)
      ),
      password: new FormControl('', [Validators.required, passwordValidator]),
      confirmPassword: new FormControl('', Validators.required),
    },
    { validators: [samePasswordValidator, passwordContainsNoNameValidator] }
  );

  get name(): FormControl {
    return this.registerForm.controls.name;
  }

  get username(): FormControl {
    return this.registerForm.controls.username;
  }

  get password(): FormControl {
    return this.registerForm.controls.password;
  }

  get confirmPassword(): FormControl {
    return this.registerForm.controls.confirmPassword;
  }

  constructor(
    private usernameValidator: UniqueUsernameValidator,
    private userService: UserService
  ) {}

  onSubmit() {
    this.isLoading = true;
    if (this.registerSubscription) {
      this.registerSubscription.unsubscribe();
    }

    const viewContainerRef = this.alertDirective.viewContainerRef;
    viewContainerRef.clear();

    let user = <User>this.registerForm.value;
    this.registerSubscription = this.userService
      .registerAdminUser(user)
      .subscribe({
        next: (value) => {
          const component =
            viewContainerRef.createComponent(AlertModalComponent);
          component.instance.message = value.message;
          component.instance.variant = 'success';
          this.isLoading = false;
          this.registerForm.reset({
            name: '',
            password: '',
            username: '',
            confirmPassword: '',
          });
        },
        error: (errorMessage) => {
          const component =
            viewContainerRef.createComponent(AlertModalComponent);
          component.instance.message = errorMessage;
          component.instance.variant = 'danger';
          this.isLoading = false;
        },
      });
  }
}

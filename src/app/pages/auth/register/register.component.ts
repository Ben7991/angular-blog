import {
  Component,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertModalComponent } from 'src/app/components/alert-modal/alert-modal.component';
import { AlertModalDirective } from 'src/app/shared/directives/alert-modal.directive';
import {
  RegisteredUserResponse,
  UserService,
} from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/types/user';
import {
  passwordContainsNoNameValidator,
  passwordValidator,
  samePasswordValidator,
} from 'src/app/shared/validators/password-validator';
import { UniqueUsernameValidator } from 'src/app/shared/validators/username-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnDestroy {
  @ViewChild(AlertModalDirective, { static: true })
  alertModalDirective!: AlertModalDirective;
  subscription: Subscription | undefined;
  isLoading = false;
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
    private userService: UserService,
    private router: Router
  ) {}

  onSubmit() {
    this.isLoading = true;

    const viewContainerRef = this.alertModalDirective.viewContainerRef;
    viewContainerRef.clear();
    const user = <User>this.registerForm.value;
    this.subscription = this.userService.registerReaderUser(user).subscribe({
      next: (response) =>
        this.handleSuccessResponse(response, viewContainerRef),
      error: (message) => {
        this.isLoading = false;
        this.showResponse(viewContainerRef, message, 'danger');
      },
    });
  }

  private handleSuccessResponse(
    response: RegisteredUserResponse,
    viewContainerRef: ViewContainerRef
  ) {
    this.showResponse(viewContainerRef, response.message, 'success');
    setTimeout(() => {
      this.isLoading = false;
      this.router.navigate(['/']);
    }, 2000);
    this.registerForm.reset();
  }

  private showResponse(
    viewContainerRef: ViewContainerRef,
    message: string,
    variant: 'success' | 'danger'
  ) {
    const component =
      viewContainerRef.createComponent<AlertModalComponent>(
        AlertModalComponent
      );
    component.instance.message = message;
    component.instance.variant = variant;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}

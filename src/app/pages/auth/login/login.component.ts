import {
  Component,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertModalComponent } from 'src/app/components/alert-modal/alert-modal.component';
import { AlertModalDirective } from 'src/app/shared/directives/alert-modal.directive';
import {
  RegisteredUserResponse,
  UserService,
} from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnDestroy {
  isLoading = false;
  username = '';
  password = '';
  subscription: Subscription | undefined;
  @ViewChild(AlertModalDirective, { static: true })
  alertModalDirective!: AlertModalDirective;

  constructor(private userService: UserService, private router: Router) {}

  onSubmit(form: NgForm) {
    this.isLoading = true;
    const viewContainerRef = this.alertModalDirective.viewContainerRef;
    viewContainerRef.clear();

    this.subscription = this.userService
      .login({ username: this.username, password: this.password })
      .subscribe({
        next: (response) =>
          this.handleSuccessResponse(response, viewContainerRef, form),
        error: (message) => {
          this.isLoading = false;
          this.showResponse(viewContainerRef, message, 'danger');
        },
      });
  }

  private handleSuccessResponse(
    response: RegisteredUserResponse,
    viewContainerRef: ViewContainerRef,
    form: NgForm
  ) {
    form.reset();
    if (response.data.status === 'active') {
      this.showResponse(viewContainerRef, response.message, 'success');
      if (response.data.user_type === 'admin') {
        setTimeout(() => {
          this.isLoading = false;
          this.router.navigate(['/admin']);
        }, 2000);
      } else if (response.data.user_type === 'reader') {
        setTimeout(() => {
          this.isLoading = false;
          this.router.navigate(['/']);
        }, 2000);
      }
      return;
    }

    this.isLoading = false;
    this.showResponse(viewContainerRef, response.message, 'danger');
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

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}

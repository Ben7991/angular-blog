import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertModalComponent } from 'src/app/components/alert-modal/alert-modal.component';
import { AlertModalDirective } from 'src/app/shared/directives/alert-modal.directive';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css'],
})
export class CreateCategoryComponent {
  isLoading = false;
  subscription: Subscription | undefined;
  @ViewChild(AlertModalDirective, { static: true })
  alertModalDirective!: AlertModalDirective;
  name = '';

  constructor(private categoryService: CategoryService) {}

  onSubmit(form: NgForm) {
    const viewContainerRef = this.alertModalDirective.viewContainerRef;
    viewContainerRef.clear();

    this.isLoading = true;
    this.subscription = this.categoryService
      .createCategory(this.name)
      .subscribe({
        next: (response) => {
          this.showAlert(viewContainerRef, response.message, 'success');
          this.isLoading = false;
          form.reset();
        },
        error: (message) => {
          this.isLoading = false;
          this.showAlert(viewContainerRef, message, 'danger');
        },
      });
  }

  private showAlert(
    containerRef: ViewContainerRef,
    message: string,
    variant: 'success' | 'danger'
  ) {
    const component =
      containerRef.createComponent<AlertModalComponent>(AlertModalComponent);
    component.instance.message = message;
    component.instance.variant = variant;
  }
}

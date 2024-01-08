import { Component, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertModalDirective } from 'src/app/shared/directives/alert-modal.directive';
import { TagService } from 'src/app/shared/services/tag.service';
import { ShowAlert } from 'src/app/shared/utility/show-alert';

@Component({
  selector: 'app-create-tag',
  templateUrl: './create-tag.component.html',
  styleUrls: ['./create-tag.component.css'],
})
export class CreateTagComponent extends ShowAlert implements OnDestroy {
  subscription: Subscription | undefined;
  @ViewChild(AlertModalDirective, { static: true })
  alertModalDirective!: AlertModalDirective;
  isLoading = false;
  name = '';

  constructor(private tagService: TagService) {
    super();
  }

  onSubmit(form: NgForm) {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.isLoading = true;
    let viewContainerRef = this.alertModalDirective.viewContainerRef;
    viewContainerRef.clear();

    this.subscription = this.tagService.createTag(this.name).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.showAlert(viewContainerRef, response.message, 'success');
        form.reset();
      },
      error: (message) => {
        this.isLoading = false;
        this.showAlert(viewContainerRef, message, 'danger');
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}

import { ViewContainerRef } from '@angular/core';
import { AlertModalComponent } from 'src/app/components/alert-modal/alert-modal.component';

export class ShowAlert {
  protected showAlert(
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

import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appAlertModal]',
})
export class AlertModalDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}

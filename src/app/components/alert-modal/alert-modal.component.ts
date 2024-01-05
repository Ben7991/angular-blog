import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css'],
})
export class AlertModalComponent {
  @Input() variant: 'danger' | 'success' = 'success';
  @Input() message = '';
  isShown = true;
}

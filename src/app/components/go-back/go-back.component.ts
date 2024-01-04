import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-go-back',
  templateUrl: './go-back.component.html',
  styleUrls: ['./go-back.component.css'],
})
export class GoBackComponent {
  @Input() title = '';
  @Input() path = '';
}

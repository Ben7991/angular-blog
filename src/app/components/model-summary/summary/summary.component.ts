import { Component, Input } from '@angular/core';
import { ModelSummary } from 'src/app/shared/types/ModelSummary';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent {
  @Input() summary: ModelSummary | undefined;
}

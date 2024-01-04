import { Component, Input } from '@angular/core';
import { ModelSummary } from 'src/app/shared/types/ModelSummary';

@Component({
  selector: 'app-model-summary',
  templateUrl: './model-summary.component.html',
  styleUrls: ['./model-summary.component.css'],
})
export class ModelSummaryComponent {
  @Input() modelSummary: ModelSummary[] = [];
}

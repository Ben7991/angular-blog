import { Component } from '@angular/core';
import { ModelSummary } from 'src/app/shared/types/ModelSummary';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css'],
})
export class TagsComponent {
  modelSummary: ModelSummary[];

  constructor() {
    this.modelSummary = [
      { title: 'All Tags', icon: 'tags', total: 10 },
      { title: 'Visible', icon: 'eye', total: 8 },
      { title: 'Hidden', icon: 'eye-slash', total: 2 },
    ];
  }
}

import { Component, OnInit } from '@angular/core';
import { ModelSummary } from 'src/app/shared/types/ModelSummary';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent {
  modelSummary: ModelSummary[];

  constructor() {
    this.modelSummary = [
      { title: 'All Categories', icon: 'bookmarks', total: 10 },
      { title: 'Visible', icon: 'eye', total: 8 },
      { title: 'Hidden', icon: 'eye-slash', total: 2 },
    ];
  }
}

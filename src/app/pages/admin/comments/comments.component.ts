import { Component } from '@angular/core';
import { ModelSummary } from 'src/app/shared/types/ModelSummary';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent {
  modelSummary: ModelSummary[];

  constructor() {
    this.modelSummary = [
      { title: 'All Comments', icon: 'bookmarks', total: 10 },
      { title: 'Approved', icon: 'check2', total: 8 },
      { title: 'Pending', icon: 'clock', total: 2 },
    ];
  }
}

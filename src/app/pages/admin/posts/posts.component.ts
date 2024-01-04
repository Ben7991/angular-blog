import { Component } from '@angular/core';
import { ModelSummary } from 'src/app/shared/types/ModelSummary';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent {
  modelSummary: ModelSummary[];

  constructor() {
    this.modelSummary = [
      { title: 'All Posts', icon: 'book-half', total: 10 },
      { title: 'Visible', icon: 'eye', total: 8 },
      { title: 'Hidden', icon: 'eye-slash', total: 2 },
    ];
  }
}

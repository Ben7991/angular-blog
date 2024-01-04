import { Component } from '@angular/core';
import { ModelSummary } from 'src/app/shared/types/ModelSummary';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  modelSummary: ModelSummary[];

  constructor() {
    this.modelSummary = [
      { title: 'All Users', icon: 'people', total: 10 },
      { title: 'Readers', icon: 'person-vcard', total: 8 },
      { title: 'Admin', icon: 'person-gear', total: 2 },
    ];
  }
}

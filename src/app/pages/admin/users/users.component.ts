import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AlertModalComponent } from 'src/app/components/alert-modal/alert-modal.component';
import { AlertModalDirective } from 'src/app/shared/directives/alert-modal.directive';
import { UserService } from 'src/app/shared/services/user.service';
import { ModelSummary } from 'src/app/shared/types/ModelSummary';
import { CreatedUser } from 'src/app/shared/types/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  @ViewChild(AlertModalDirective, { static: true })
  alertModalDirective!: AlertModalDirective;
  users: CreatedUser[] = [];
  modelSummary: ModelSummary[];

  constructor(private userService: UserService, private route: ActivatedRoute) {
    this.modelSummary = [
      { title: 'All Users', icon: 'people', total: 0 },
      { title: 'Readers', icon: 'person-vcard', total: 0 },
      { title: 'Admin', icon: 'person-gear', total: 0 },
    ];
  }

  ngOnInit(): void {
    this.route.data.subscribe({
      next: (response) => {
        this.modelSummary[0].total = response['users'].totalUsers;
        this.modelSummary[1].total = response['users'].totalReaders;
        this.modelSummary[2].total = response['users'].totalAdmins;

        this.users.push(...response['users'].data);
      },
    });
  }
}

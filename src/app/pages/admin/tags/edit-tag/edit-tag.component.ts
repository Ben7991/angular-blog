import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertModalDirective } from 'src/app/shared/directives/alert-modal.directive';
import { TagService } from 'src/app/shared/services/tag.service';
import { Tag } from 'src/app/shared/types/tag';
import { ShowAlert } from 'src/app/shared/utility/show-alert';

@Component({
  selector: 'app-edit-tag',
  templateUrl: './edit-tag.component.html',
  styleUrls: ['./edit-tag.component.css'],
})
export class EditTagComponent extends ShowAlert implements OnInit, OnDestroy {
  @ViewChild(AlertModalDirective, { static: true })
  alertModalDirective!: AlertModalDirective;
  isLoading = false;
  paramsSubscription: Subscription | undefined;
  updateSubscription: Subscription | undefined;
  private _tag: Tag | undefined;
  name = '';
  selectedStatus = '';
  statuses = ['active', 'hidden'];

  constructor(
    private tagService: TagService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.paramsSubscription = this.activatedRoute.params.subscribe((params) => {
      this._tag = this.tagService.findById(+params['id']);

      if (!this._tag) {
        this.router.navigate(['/admin/tags']);
      }

      this.name = this._tag!.name;
      this.selectedStatus = this._tag!.status;
    });
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.updateSubscription?.unsubscribe();
  }

  onSubmit(form: NgForm) {
    this.isLoading = true;
    this._tag!.name = this.name;
    this._tag!.status = <'hidden' | 'active'>this.selectedStatus;

    let viewContainerRef = this.alertModalDirective.viewContainerRef;
    viewContainerRef.clear();

    this.updateSubscription = this.tagService.updateTag(this._tag!).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.showAlert(viewContainerRef, response.message, 'success');
      },
      error: (message) => {
        this.isLoading = false;
        this.showAlert(viewContainerRef, message, 'danger');
      },
    });
  }
}

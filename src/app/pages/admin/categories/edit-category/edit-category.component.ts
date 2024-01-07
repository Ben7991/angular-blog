import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertModalComponent } from 'src/app/components/alert-modal/alert-modal.component';
import { AlertModalDirective } from 'src/app/shared/directives/alert-modal.directive';
import { CategoryService } from 'src/app/shared/services/category.service';
import { Category } from 'src/app/shared/types/category';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css'],
})
export class EditCategoryComponent implements OnInit, OnDestroy {
  @ViewChild(AlertModalDirective, { static: true })
  alertModalDirective!: AlertModalDirective;
  isLoading = false;
  subscription: Subscription | undefined;
  private _category: Category | undefined;
  name = '';
  selectedStatus = '';
  statuses = ['active', 'hidden'];

  constructor(
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscription = this.activatedRoute.params.subscribe((params) => {
      let category = this.categoryService.findById(+params['id']);

      if (category === undefined) {
        this.router.navigate(['/admin/categories']);
        return;
      }

      this.name = category.name;
      this.selectedStatus = category.status;
      this._category = category;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onSubmit() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.isLoading = true;
    const viewContainerRef = this.alertModalDirective.viewContainerRef;
    viewContainerRef.clear();

    this._category!.name = this.name;
    this._category!.status = <'active' | 'hidden'>this.selectedStatus;
    this.subscription = this.categoryService
      .updateCategory(this._category!)
      .subscribe({
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

  private showAlert(
    containerRef: ViewContainerRef,
    message: string,
    variant: 'success' | 'danger'
  ) {
    const component =
      containerRef.createComponent<AlertModalComponent>(AlertModalComponent);
    component.instance.message = message;
    component.instance.variant = variant;
  }
}

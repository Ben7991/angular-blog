import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertModalComponent } from 'src/app/components/alert-modal/alert-modal.component';
import { AlertModalDirective } from 'src/app/shared/directives/alert-modal.directive';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ModelSummary } from 'src/app/shared/types/ModelSummary';
import { Category, CategoryData } from 'src/app/shared/types/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit, OnDestroy {
  @ViewChild(AlertModalDirective, { static: true })
  alertModalDirective!: AlertModalDirective;
  fetchSubscription: Subscription | undefined;
  updateSubscription: Subscription | undefined;
  modelSummary: ModelSummary[];
  categories: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute
  ) {
    this.modelSummary = [
      { title: 'All Categories', icon: 'bookmarks', total: 10 },
      { title: 'Visible', icon: 'eye', total: 8 },
      { title: 'Hidden', icon: 'eye-slash', total: 2 },
    ];
  }

  ngOnInit(): void {
    this.fetchSubscription = this.activatedRoute.data.subscribe((data) => {
      this.categories = data['categories'].data;
      this.modelSummary[0].total = data['categories'].total;
      this.modelSummary[1].total = data['categories'].active;
      this.modelSummary[2].total = data['categories'].hidden;
    });
  }

  ngOnDestroy(): void {
    this.fetchSubscription?.unsubscribe();
    this.updateSubscription?.unsubscribe();
  }

  onChangeStatus(id: number) {
    let category = this.categories.find((category) => category.id === id);
    if (!category) {
      return;
    }

    category.status = category.status === 'active' ? 'hidden' : 'active';
    let viewContainerRef = this.alertModalDirective.viewContainerRef;
    viewContainerRef.clear();

    this.updateSubscription = this.categoryService
      .updateCategory(category)
      .subscribe({
        next: (response) => {
          let component =
            viewContainerRef.createComponent<AlertModalComponent>(
              AlertModalComponent
            );
          component.instance.message = response.message;
          component.instance.variant = 'success';
          this.categories = this.categoryService.categoryData!.data;
          this.modelSummary[0].total = response.total;
          this.modelSummary[1].total = response.active;
          this.modelSummary[2].total = response.hidden;
        },
        error: (message) => {
          let component =
            viewContainerRef.createComponent<AlertModalComponent>(
              AlertModalComponent
            );
          component.instance.message = message;
          component.instance.variant = 'danger';
        },
      });
  }
}

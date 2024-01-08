import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertModalComponent } from 'src/app/components/alert-modal/alert-modal.component';
import { AlertModalDirective } from 'src/app/shared/directives/alert-modal.directive';
import { TagService } from 'src/app/shared/services/tag.service';
import { ModelSummary } from 'src/app/shared/types/ModelSummary';
import { Tag } from 'src/app/shared/types/tag';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css'],
})
export class TagsComponent implements OnInit, OnDestroy {
  @ViewChild(AlertModalDirective, { static: true })
  alertModalDirective!: AlertModalDirective;
  tags: Tag[] = [];
  dataSubscription: Subscription | undefined;
  updateSubscription: Subscription | undefined;
  modelSummary: ModelSummary[];

  constructor(
    private tagService: TagService,
    private activatedRoute: ActivatedRoute
  ) {
    this.modelSummary = [
      { title: 'All Tags', icon: 'tags', total: 10 },
      { title: 'Visible', icon: 'eye', total: 8 },
      { title: 'Hidden', icon: 'eye-slash', total: 2 },
    ];
  }

  private updateModelSummary(total: number, active: number, hidden: number) {
    this.modelSummary[0].total = total;
    this.modelSummary[1].total = active;
    this.modelSummary[2].total = hidden;
  }

  onUpdate(id: number) {
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }

    const viewContainerRef = this.alertModalDirective.viewContainerRef;
    viewContainerRef.clear();

    let tag = this.tags.find((tag) => tag.id === id)!;

    if (tag.status === 'active') {
      tag.status = 'hidden';
    } else {
      tag.status = 'active';
    }

    this.updateSubscription = this.tagService.updateTag(tag).subscribe({
      next: (response) => {
        this.updateModelSummary(
          response.total,
          response.active,
          response.hidden
        );
        this.tags = this.tagService.tagData!.data;
        this.showAlert(viewContainerRef, response.message, 'success');
      },
      error: (message) => {
        this.showAlert(viewContainerRef, message, 'success');
      },
    });
  }

  ngOnInit(): void {
    this.dataSubscription = this.activatedRoute.data.subscribe((data) => {
      this.tags = data['tags'].data;
      this.updateModelSummary(
        data['tags'].total,
        data['tags'].active,
        data['tags'].hidden
      );
    });
  }

  ngOnDestroy(): void {
    this.updateSubscription?.unsubscribe();
    this.dataSubscription?.unsubscribe();
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

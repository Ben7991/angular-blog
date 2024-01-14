import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/shared/types/category';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit, OnDestroy {
  categoriesDataSubscription: Subscription | undefined;
  categories: Category[] = [];

  constructor(private activateRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.categoriesDataSubscription = this.activateRoute.data.subscribe(
      (data) => {
        this.categories = data['categories'].data;
      }
    );
  }

  ngOnDestroy(): void {
    this.categoriesDataSubscription?.unsubscribe();
  }
}

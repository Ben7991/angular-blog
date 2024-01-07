import { ResolveFn } from '@angular/router';
import { CategoryData } from '../types/category';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { CategoryService } from '../services/category.service';

export const categoryResolver: ResolveFn<
  CategoryData | Observable<CategoryData> | Promise<CategoryData>
> = (route, state) => {
  const categoryService = inject(CategoryService);
  if (categoryService.categoryData) {
    return categoryService.categoryData;
  }

  return categoryService.all();
};

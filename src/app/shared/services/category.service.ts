import { Injectable } from '@angular/core';
import { Category, CategoryData } from '../types/category';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';

type CategoryUpdateResponse = {
  message: string;
  total: number;
  active: number;
  hidden: number;
};

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private _categoryData: CategoryData | undefined;

  constructor(private httpClient: HttpClient) {}

  get categoryData(): CategoryData | undefined {
    return this._categoryData;
  }

  all(): Observable<CategoryData> {
    return this.httpClient
      .get<CategoryData>('http://localhost:8000/api/categories')
      .pipe(
        tap((categoryData) => {
          this._categoryData = categoryData;
        }),
        catchError((error) => throwError(error.error.message))
      );
  }

  updateCategory(category: Category): Observable<CategoryUpdateResponse> {
    return this.httpClient
      .put<CategoryUpdateResponse>(
        `http://localhost:8000/api/categories/${category.id}`,
        category
      )
      .pipe(
        tap((response) => {
          let index = this._categoryData!.data.findIndex(
            (cat) => cat.id === category.id
          );
          this._categoryData!.data[index] = category;
        }),
        catchError((error) => throwError(error.error.message))
      );
  }
}

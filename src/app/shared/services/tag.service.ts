import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tag, TagData } from '../types/tag';
import { catchError, tap, throwError } from 'rxjs';

type UpdateTagResponse = {
  message: string;
  active: number;
  total: number;
  hidden: number;
};

type CreateTagResponse = {
  data: Tag;
  message: string;
};

@Injectable({
  providedIn: 'root',
})
export class TagService {
  private _tagData: TagData | undefined;

  constructor(private httpClient: HttpClient) {}

  get tagData() {
    return this._tagData;
  }

  allTags() {
    return this.httpClient.get<TagData>('http://localhost:8000/api/tags').pipe(
      tap((tagData) => {
        this._tagData = tagData;
      }),
      catchError((error) => throwError(error.error.message))
    );
  }

  updateTag(tag: Tag) {
    return this.httpClient
      .put<UpdateTagResponse>(`http://localhost:8000/api/tags/${tag.id}`, tag)
      .pipe(
        tap((response) => {
          const index = this._tagData!.data.findIndex((t) => t.id === tag.id);
          if (index !== -1) {
            this._tagData!.data[index] = tag;
          }
        }),
        catchError((error) => throwError(error.error.message))
      );
  }

  createTag(name: string) {
    return this.httpClient
      .post<CreateTagResponse>('http://localhost:8000/api/tags', { name })
      .pipe(
        tap((tag) => {
          this._tagData!.data.push(tag.data);
          this._tagData!.active++;
        }),
        catchError((error) => throwError(error.error.message))
      );
  }

  findById(id: number) {
    return this._tagData!.data.find((tag) => tag.id === id);
  }
}

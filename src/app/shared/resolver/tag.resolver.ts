import { ResolveFn } from '@angular/router';
import { TagData } from '../types/tag';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { TagService } from '../services/tag.service';

export const tagResolver: ResolveFn<TagData> = (route, state) => {
  const tagService = inject(TagService);

  if (tagService.tagData) {
    return tagService.tagData;
  }

  return tagService.allTags();
};

import { inject } from '@angular/core';
import {
  ActivatedRoute,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';
import { CreatedUser } from 'src/app/shared/types/user';

export const userResolver = (
  route: ActivatedRoute,
  state: RouterStateSnapshot
): CreatedUser[] | Observable<CreatedUser[]> | Promise<CreatedUser[]> => {
  return inject(UserService).allUsers();
};

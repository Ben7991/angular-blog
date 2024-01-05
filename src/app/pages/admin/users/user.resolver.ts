import { inject } from '@angular/core';
import {
  ActivatedRoute,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService, UsersData } from 'src/app/shared/services/user.service';

export const userResolver = (
  route: ActivatedRoute,
  state: RouterStateSnapshot
): UsersData | Observable<UsersData> | Promise<UsersData> => {
  const userService = inject(UserService);

  if (userService.usersData) {
    return userService.usersData;
  }

  return userService.allUsers();
};

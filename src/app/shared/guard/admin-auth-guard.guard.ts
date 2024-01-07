import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { map, take } from 'rxjs';

export const adminAuthGuardGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  return userService.loggedInUser.pipe(
    take(1),
    map((user) => {
      if (user?.user_type === 'admin') {
        return true;
      }

      return router.createUrlTree(['/']);
    })
  );
};

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, exhaustMap } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.userService.loggedInUser.pipe(
      exhaustMap((user) => {
        if (!user) {
          return next.handle(request);
        }

        const clonedRequest = request.clone({
          headers: new HttpHeaders({
            Authorization: `Bearer ${user!.token}`,
          }),
        });

        return next.handle(clonedRequest);
      })
    );
  }
}

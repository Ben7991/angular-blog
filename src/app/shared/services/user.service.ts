import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { catchError, map, of, throwError } from 'rxjs';
import { User } from '../types/user';

type RegisterUserResponse = {
  data: {
    id: number;
    name: string;
    username: string;
    user_type: string;
  };
  token: string;
  message: string;
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  public checkUsername(username: string) {
    return this.httpClient
      .get<{ message: string }>('http://localhost:8000/api/users/username', {
        params: new HttpParams().set('value', username),
      })
      .pipe(
        map((response) => {
          if (response.message === 'taken') {
            return { usernameTaken: true };
          }
          return null;
        }),
        catchError(() => of(null))
      );
  }

  public registerAdminUser(user: User) {
    return this.httpClient
      .post<RegisterUserResponse>(
        'http://localhost:8000/api/users/register',
        user,
        {
          params: new HttpParams().set('admin', true),
        }
      )
      .pipe(catchError((error) => throwError(error.error.message)));
  }
}

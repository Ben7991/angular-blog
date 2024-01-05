import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, of, tap, throwError } from 'rxjs';
import { CreatedUser, User } from '../types/user';

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

type UsersData = {
  data: {
    id: number;
    name: string;
    username: string;
    user_type: string;
    status: string;
  }[];
  totalUsers: number;
  totalAdmins: number;
  totalReaders: number;
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
      .pipe(catchError((error) => of(error.error.message)));
  }

  public allUsers() {
    return this.httpClient
      .get<UsersData>('http://localhost:8000/api/users')
      .pipe(catchError((error) => of(error.error.message)));
  }
}

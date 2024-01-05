import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { CreatedUser, User } from '../types/user';

type RegisterUserResponse = {
  data: {
    id: number;
    name: string;
    username: string;
    user_type: string;
    status: string;
  };
  token: string;
  message: string;
};

export type UsersData = {
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
  usersData: UsersData | undefined;
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
      .pipe(
        tap((user) => {
          const createdUser = {
            id: user.data.id,
            name: user.data.name,
            username: user.data.username,
            user_type: user.data.user_type,
            status: user.data.status,
          };
          this.usersData?.data.push(createdUser);
          this.usersData!.totalAdmins++;
          this.usersData!.totalUsers++;
        }),
        catchError((error) => of(error.error.message))
      );
  }

  public allUsers(): Observable<UsersData> {
    return this.httpClient
      .get<UsersData>('http://localhost:8000/api/users')
      .pipe(
        tap((usersData) => {
          this.usersData = usersData;
        }),
        catchError((error) => of(error.error.message))
      );
  }
}

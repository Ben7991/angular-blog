import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  of,
  tap,
  throwError,
} from 'rxjs';
import { CreatedUser, LoggedInUser, User } from '../types/user';

export type RegisteredUserResponse = {
  duration: number;
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

export type LoggedInUserResponse = CreatedUser & {
  expirationDate: Date;
  token: string;
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
  loggedInUser = new BehaviorSubject<LoggedInUser | undefined>(undefined);
  usersData: UsersData | undefined;
  constructor(private httpClient: HttpClient) {}

  checkUsername(username: string) {
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

  registerAdminUser(user: User) {
    return this.httpClient
      .post<RegisteredUserResponse>(
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

  allUsers(): Observable<UsersData> {
    return this.httpClient
      .get<UsersData>('http://localhost:8000/api/users')
      .pipe(
        tap((usersData) => {
          this.usersData = usersData;
        }),
        catchError((error) => of(error.error.message))
      );
  }

  login(user: {
    username: string;
    password: string;
  }): Observable<RegisteredUserResponse> {
    return this.httpClient
      .post<RegisteredUserResponse>(
        'http://localhost:8000/api/users/login',
        user
      )
      .pipe(
        tap((registeredUser) => this.handleAuthentication(registeredUser)),
        catchError((error) => throwError(error.error.message))
      );
  }

  private handleAuthentication(registeredUser: RegisteredUserResponse) {
    let logoutDate = new Date(
      new Date().getTime() * registeredUser.duration * 1000
    );
    let loggedInUser: LoggedInUserResponse = {
      id: registeredUser.data.id,
      name: registeredUser.data.name,
      status: registeredUser.data.status,
      token: registeredUser.token,
      user_type: registeredUser.data.user_type,
      username: registeredUser.data.username,
      expirationDate: logoutDate,
    };
    const user = new LoggedInUser(loggedInUser);
    this.loggedInUser.next(user);
    localStorage.setItem('auth', JSON.stringify(user));
  }

  registerReaderUser(user: User) {
    return this.httpClient
      .post<RegisteredUserResponse>(
        'http://localhost:8000/api/users/register',
        user
      )
      .pipe(
        tap((userData) => this.handleAuthentication(userData)),
        catchError((error) => throwError(error.error.message))
      );
  }
}

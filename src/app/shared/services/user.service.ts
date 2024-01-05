import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';

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
        catchError((error) => of(null))
      );
  }
}

import { LoggedInUserResponse } from '../services/user.service';

export type User = {
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
};

export type CreatedUser = {
  id: number;
  name: string;
  username: string;
  user_type: string;
  status: string;
};

export class LoggedInUser {
  private _id: number;
  public name: string;
  private _username: string;
  public status: string;
  public user_type: string;
  private _expirationDate: Date;
  private _token: string;

  constructor(user: LoggedInUserResponse) {
    this._id = user.id;
    this.name = user.name;
    this._username = user.username;
    this.status = user.status;
    this.user_type = user.user_type;
    this._expirationDate = user.expirationDate;
    this._token = user.token;
  }

  get id() {
    return this._id;
  }

  get token() {
    if (new Date() > this._expirationDate) {
      return '';
    }

    return this._token;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILoginData } from '../model/auth.model';
import { environment } from '../../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import jwtDecoder from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { ApiEndpoint, IActionResponse } from '../../shared/model/shared.model';
import { IUser } from '../../security/security.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }
  public static USER_DATA_KEY = 'user_data';
  public static AUTH_TOKEN_KEY = 'auth_token';

  LOGIN_URL = environment.baseUrl + '/login';

  private loginStatusSubject = new BehaviorSubject<boolean>(false);

  login(loginData: ILoginData) {
    return this.http.post<any>(ApiEndpoint.LOGIN, loginData);
  }

  logout() {
    localStorage.removeItem(AuthService.AUTH_TOKEN_KEY);
    localStorage.removeItem(AuthService.USER_DATA_KEY);
    this.router.navigate(["/login"]);
  }

  sendLoginSignal(data: boolean) {
    this.loginStatusSubject.next(data);
  }

  recieveLoginSignal() {
    return this.loginStatusSubject.asObservable();
  }

  setAuthToken(token: string) {
    localStorage.setItem(AuthService.AUTH_TOKEN_KEY, token);
  }

  getAuthToken(): string {
    return localStorage.getItem(AuthService.AUTH_TOKEN_KEY);
  }

  setUserDataToLocalStorage() {
    const decodedToken = jwtDecoder(this.getAuthToken());
    const user = JSON.parse(decodedToken.sub).data;
    localStorage.setItem(AuthService.USER_DATA_KEY, JSON.stringify(user));
  }

  getUserDataFromLocalStorage(): IUser {
    const userDataStr = localStorage.getItem(AuthService.USER_DATA_KEY);
    if (!userDataStr) {
      return null;
    }
    const user: IUser = JSON.parse(userDataStr);
    return user;
  }

}
 
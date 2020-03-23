import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  BASE_URL,
  EMAIL_KEY,
  TOKEN_KEY,
  USER_KEY
} from '../../constants/api';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { AuthPayload, AuthResponse } from '../../models/auth';
import { LocalStorageService } from './local-storage.service';
import { User } from '../../models/user';

@Injectable()
export class AuthService {
  public isLoggedIn$: BehaviorSubject<boolean>;

  constructor(private localStorageService: LocalStorageService,
              private http: HttpClient) {
    this.isLoggedIn$ = new BehaviorSubject<boolean>(!!this.token && !!this.email);
  }

  // Generates a request body and sends a request for the login.
  public login(requestBody: AuthPayload): Observable<AuthResponse> {
    this.localStorageService.set(EMAIL_KEY, requestBody.email);
    return this.http.post<AuthResponse>(`${BASE_URL}/login?rememberMe=true`, requestBody).pipe(
      tap(authData => {
        this.localStorageService.set(TOKEN_KEY, authData.result.token);
        this.isLoggedIn$.next(true);
      })
    );
  }

  public logout(): Observable<AuthResponse> {
    this.localStorageService.clear();
    this.isLoggedIn$.next(false);
    return this.http.post<AuthResponse>(`${BASE_URL}/logout`, null);
  }

  // Sends a request to the server to register a new user.
  public registerUser(requestBody: AuthPayload): Observable<AuthResponse> {
    this.localStorageService.set(EMAIL_KEY, requestBody.email);
    return this.http.post<AuthResponse>(`${BASE_URL}/register?rememberMe=true`, requestBody).pipe(
      tap(authData => {
        this.localStorageService.set(TOKEN_KEY, authData.result.token);
        this.isLoggedIn$.next(true);
      })
    );
  }

  public fetchUserData(): Observable<User> {
    return this.getUser();
  }

  private getUser(): Observable<User> {
    return this.http.get<User>(`v1/user?perPage=1&page=1`).pipe(
      tap(user => {
        this.localStorageService.set('pageCount', Math.ceil(user._meta.pagination.pageCount / 50));
      })
    );
  }

  public get token(): string {
    return this.localStorageService.get(TOKEN_KEY);
  }

  public get user(): User {
    return this.localStorageService.get(USER_KEY);
  }

  public get email(): string {
    return this.localStorageService.get(EMAIL_KEY);
  }

}

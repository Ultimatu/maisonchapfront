import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, mergeMap} from 'rxjs/operators';

import { Login } from './login.model';
import {AccountService} from "../services/auth/account.service";
import {AuthServerProvider} from "../services/auth/auth.service";
import {Account} from "../services/auth/account.model";

@Injectable({ providedIn: 'root' })
export class LoginService {
    constructor(private accountService: AccountService, private authServerProvider: AuthServerProvider) {}


  login(credentials: Login): Observable<Account | null> {
    return this.authServerProvider.login(credentials).pipe(
      mergeMap(() => this.accountService.identity(true)),
      catchError((error) => {
        console.error('Erreur lors de la connexion :', error);
        return throwError(error);
      })
    );
  }


  logout(): void {
        this.authServerProvider.logout().subscribe({ complete: () => this.accountService.authenticate(null) });
    }

    refreshToken(): Observable<Account | null> {
        return this.authServerProvider.refreshToken().pipe(mergeMap(() => this.accountService.identity(true)));
    }

    isRefreshTokenExpired(): boolean {
        return this.authServerProvider.isRefreshTokenExpired();
    }


}

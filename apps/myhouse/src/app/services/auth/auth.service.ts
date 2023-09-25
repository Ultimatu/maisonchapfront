import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

import { Login } from '../../login/login.model';
import {AUTH_BASE_URL} from "../constants/constant";

type JwtToken = {
    "access_token": string,
    "refresh_token": string,

};



@Injectable({ providedIn: 'root' })
export class AuthServerProvider {
    constructor(
        private http: HttpClient,
        private localStorageService: LocalStorageService,
        private sessionStorageService: SessionStorageService,
    ) {}

    getToken(): string {
        const tokenInLocalStorage: string | null = this.localStorageService.retrieve('authenticationToken');
        const tokenInSessionStorage: string | null = this.sessionStorageService.retrieve('authenticationToken');
        return tokenInLocalStorage ?? tokenInSessionStorage ?? '';
    }
    getRefreshToken(): string {
        const tokenInLocalStorage: string | null = this.localStorageService.retrieve('refreshToken');
        const tokenInSessionStorage: string | null = this.sessionStorageService.retrieve('refreshToken');
        return tokenInLocalStorage ?? tokenInSessionStorage ?? '';
    }

    isRefreshTokenExpired(): boolean {
        const refreshToken: string | null = this.getRefreshToken();
        if (refreshToken !== null) {
            const refreshTokenPayload = this.localStorageService.retrieve('storedDate');
            if (refreshTokenPayload) {
                const storedDate = new Date(refreshTokenPayload);
                const currentDate = new Date();
                const diff = currentDate.getTime() - storedDate.getTime();
                const diffMinutes = Math.round(diff / 60000);
                if (diffMinutes >= 10080) {
                    return true;
                }
            }
        }
        return false;
    }



    login(credentials: Login): Observable<void> {
        return this.http
            .post<JwtToken>(AUTH_BASE_URL+"/authenticate", credentials)
            .pipe(
                map(response =>
                    this.authenticateSuccess
                    (response, credentials.rememberMe)
                )
            );
    }


     /**
      * Authenticate the user and store authentication token with remember me option set to true if login sucessful
     */
    logout(): Observable<void> {
        return new Observable(observer => {
            this.localStorageService.clear('authenticationToken');
            this.sessionStorageService.clear('authenticationToken');
            this.localStorageService.clear('refreshToken');
            this.sessionStorageService.clear('refreshToken');
            this.localStorageService.clear('storedDate');
            observer.complete();
        });
    }


     /**
      *  Authenticate the user and store authentication token with remember me option set to true if login sucessful
     */
    refreshToken(): Observable<void> {
        return this.http
            .post<JwtToken>(AUTH_BASE_URL+"/refresh-token", {})
            .pipe(
                map(response =>
                    this.authenticateSuccess
                    (response, true)
                )
            );
    }

    private authenticateSuccess(response: JwtToken, rememberMe: boolean): void {
        console.log(response);
        console.log("waiting for token to be stored");
        const jwt = response.access_token;
        if (rememberMe) {
            this.localStorageService.store('authenticationToken', jwt);
            this.localStorageService.store('refreshToken', response.refresh_token);

            this.sessionStorageService.clear('authenticationToken');
            this.sessionStorageService.clear('refreshToken');
        } else {
            this.sessionStorageService.store('authenticationToken', jwt)
            this.sessionStorageService.store('refreshToken', response.refresh_token);
            this.localStorageService.clear('authenticationToken');
            this.localStorageService.clear('refreshToken');
        }
        const storedDate: Date | null = this.localStorageService.retrieve('storedDate');
        if (storedDate === null) {
            this.localStorageService.store('storedDate', new Date().getTime());
        }

    }

}

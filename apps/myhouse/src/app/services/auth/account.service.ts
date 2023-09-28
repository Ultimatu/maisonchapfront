import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SessionStorageService } from 'ngx-webstorage';
import { Observable, ReplaySubject, of } from 'rxjs';
import { shareReplay, tap, catchError } from 'rxjs/operators';

import { Account } from './account.model';
import {StateStorageService} from "./stat-storage.service";
import {AUTH_BASE_URL, BASE_URL, USER_BASE_URL} from "../constants/constant";

@Injectable({ providedIn: 'root' })
export class AccountService {
  private userIdentity: Account | null = null;
  private authenticationState = new ReplaySubject<Account | null>(1);
  private accountCache$?: Observable<Account> | null;

  constructor(
    private sessionStorageService: SessionStorageService,
    private http: HttpClient,
    private stateStorageService: StateStorageService,
    private router: Router,
  ) {}

  save(account: Account): Observable<{}> {
    return this.http.post(AUTH_BASE_URL+"/register", account);
  }

  authenticate(identity: Account | null): void {
    this.userIdentity = identity;
    this.authenticationState.next(this.userIdentity);
    if (!identity) {
      this.accountCache$ = null;
    }
  }

  hasAnyAuthority(authorities: string[] | string): boolean {
    if (!this.userIdentity) {
      return false;
    }
    if (!Array.isArray(authorities)) {
      authorities = [authorities];
    }
    return this.userIdentity.authorities.some((authority: string) => authorities.includes(authority));
  }




  identity(force?: boolean): Observable<Account | null> {
    if (!this.accountCache$ || force) {
      console.log("identity");
      this.accountCache$ = this.fetch().pipe(
        tap((account: Account) => {
          this.authenticate(account);

          this.navigateToStoredUrl();
        }),
        shareReplay()
      );
    }
    console.log("identity");
    return this.accountCache$.pipe(catchError(() => of(null)));
  }

  isAuthenticated(): boolean {
    return this.userIdentity !== null;
  }

  getAuthenticationState(): Observable<Account | null> {
    return this.authenticationState.asObservable();
  }

  fetch(): Observable<Account> {

    return this.http.get<Account>(USER_BASE_URL+"/my-details");
  }

  private navigateToStoredUrl(): void {
    const previousUrl = this.stateStorageService.getUrl();
    if (previousUrl) {
      this.stateStorageService.clearUrl();
      this.router.navigateByUrl(previousUrl).then(r => {});
    }
  }

  getMyDatas(): Observable<Account | null> {
    return this.fetch().pipe(
      tap((userData) => {
        console.log(userData);
      }),
      catchError((error) => {
        console.error(error);
        return of(null);
      })
    );
  }

}

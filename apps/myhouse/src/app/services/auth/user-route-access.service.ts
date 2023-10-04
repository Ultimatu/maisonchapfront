import { Injectable, isDevMode } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AccountService } from './account.service';
import {StateStorageService} from "./stat-storage.service";

@Injectable({ providedIn: 'root' })
export class UserRouteAccessService {
  constructor(private router: Router, private accountService: AccountService, private stateStorageService: StateStorageService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.accountService.identity().pipe(
      map(account => {
        if (account) {
          const authorities = route.data['authorities'];

          console.log("authorities", authorities);
          if (!authorities || authorities.length === 0 || this.accountService.hasAnyAuthority(authorities)) {
            return true;
          }

          if (isDevMode()) {
            console.error('User has not any of required authorities: ', authorities);
          }
          this.router.navigate(['accessdenied']).then(r => {
          });
          return false;
        }

        this.stateStorageService.storeUrl(state.url);
        this.router.navigate(['/login']).then(r => {
        });
        return false;
      })
    );

  }
}

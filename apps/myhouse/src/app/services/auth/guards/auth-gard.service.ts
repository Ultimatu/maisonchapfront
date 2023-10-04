import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../account.service';
import { map } from 'rxjs/operators';
import {Authority} from "../../constants/authority-constant";

@Injectable({ providedIn: 'root' })
export class AuthGardService {
  constructor(private router: Router, private accountService: AccountService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.accountService.isAuthenticated()) {
      return true;
    } else {
      return this.accountService.identity().pipe(
        map((account) => {
          if (!this.accountService.isAuthenticated()) {
            this.router.navigate(['/login']);
            return false;
          }
          return true;
        })
      );
    }
  }
}

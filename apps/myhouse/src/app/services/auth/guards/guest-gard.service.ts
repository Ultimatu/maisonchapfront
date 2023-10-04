import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../account.service';
import {Authority} from "../../constants/authority-constant";

@Injectable({
  providedIn: 'root'
})
export class GuestGuard{
  constructor(private router: Router, private accountService: AccountService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.accountService.isAuthenticated()) {
      return true;
    }
    if (this.accountService.userIdentity?.role === Authority.ADMIN){
      this.router.navigate(['/admin']);
      return false;
    }
    else if (this.accountService.userIdentity?.role?.includes("PROPRIO")){
      this.router.navigate(['/proprio']);
      return false;
    }
    this.router.navigate(['/']);
    return false;
  }
}

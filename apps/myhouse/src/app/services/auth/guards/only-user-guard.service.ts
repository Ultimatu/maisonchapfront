import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../account.service';
import {Authority} from "../../constants/authority-constant";

@Injectable({
  providedIn: 'root'
})
export class OnlyUserGuard{
  isTrue: boolean = true;
  constructor(private router: Router, private accountService: AccountService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.accountService.isAuthenticated()) {

      console.log("OnlyUserGuard: User is not authenticated");
      this.accountService.identity().subscribe((account) => {
        if (account && account.role  === Authority.ADMIN){
          this.isTrue = false;
          this.router.navigate(['admin']).then((r) => console.log(r));
        }else if (account && account.role?.includes("PROPRIO")){
          this.isTrue = false;
          this.router.navigate(['proprio']).then((r) => console.log(r));
        }
        else {
          this.isTrue = true;
        }
        console.log("OnlyUserGuard: User is authenticated");
      });
      console.log("OnlyUserGuard: User is not authenticated" + this.isTrue);
      return this.isTrue;
    }
    if (this.accountService.userIdentity?.role === 'ADMIN'){
      this.router.navigate(['/admin']);
      return false;
    }
    else if (this.accountService.userIdentity?.role?.includes("PROPRIO")){
      this.router.navigate(['/proprio']);
      return false;
    }
    console.log("OnlyUserGuard: User is authenticated");
    return true;
  }
}

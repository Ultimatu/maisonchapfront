import { Component ,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {AccountService} from "../../services/auth/account.service";
import {LoginService} from "../../login/login.service";
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit{

  constructor(private router: Router, private accountService: AccountService, private logoutService: LoginService) {}
  ngOnInit() {
    if (this.accountService.isAuthenticated()) {
      this.logout();
    }
    else {
      this.router.navigate(['login']).then((r) => console.log(r));
    }

  }

  logout() {
    this.logoutService.logout();
    this.router.navigate(['login']).then((r) => console.log(r));
  }


}

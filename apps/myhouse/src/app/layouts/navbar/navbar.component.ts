import { Component } from '@angular/core';
import {AccountService} from "../../services/auth/account.service";
import {AuthServerProvider} from "../../services/auth/auth.service";
import {User} from "../../services/model/models";
import {Account} from "../../services/auth/account.model";
import {Observable} from "rxjs";
import {INewUser} from "../../entities/user/user";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  user: INewUser = new INewUser();
  account: Account | null = null;

  constructor(private authService: AccountService, private authServerProvider: AuthServerProvider) {
  }

  ngOnInit(): void {
    if (this.isAuthenticated()) {
      this.myData().subscribe(account => {
        this.account = account;
      });

    }

  }

  myData(): Observable<Account | null> {
    this.authService.identity().subscribe(account => {
      this.account = account;
      this.user = account as INewUser;
    });
    return this.authService.identity();
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout(): void {
    this.authServerProvider.logout().subscribe({ complete: () => this.authService.authenticate(null) });
  }


}

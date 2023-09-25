import { Component } from '@angular/core';
import {AccountService} from "../../services/auth/account.service";
import {AuthServerProvider} from "../../services/auth/auth.service";
import {User} from "../../services/models";
import {Account} from "../../services/auth/account.model";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  user: User | null = null;
  account: Account | null = null;

  constructor(private authService: AccountService, private authServerProvider: AuthServerProvider) {
  }

  ngOnInit(): void {
    if (this.isAuthenticated()) {
      this.authService.identity().subscribe(account => {
        this.account = account;
      });
    }
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout(): void {
    this.authServerProvider.logout().subscribe({ complete: () => this.authService.authenticate(null) });
  }


}

import {Component, ElementRef, inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "./login.service";
import {AccountService} from "../services/auth/account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit{
  @ViewChild('email', { static: false })
  email!: ElementRef;

  authenticationError = false;

  loginForm = new FormGroup({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    rememberMe: new FormControl(false, { nonNullable: true, validators: [Validators.required] }),
  });

  constructor(private accountService: AccountService, private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {

    this.accountService.identity().subscribe(() => {
      if (this.accountService.isAuthenticated()) {
        this.router.navigate(['']).then(r => console.log(r));
      }
    });
  }

  login(): void {
    console.log(this.loginForm.getRawValue());
    this.loginService.login(this.loginForm.getRawValue()).subscribe({
      next: () => {
        this.authenticationError = false;
        console.log("login");
        if (!this.router.getCurrentNavigation()) {
          this.router.navigate(['']).then(r => console.log(r));
        }
      },
      error: () => (this.authenticationError = true),
    });
  }

}

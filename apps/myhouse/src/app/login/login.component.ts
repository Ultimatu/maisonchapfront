import {Component, ElementRef, inject, OnInit, Renderer2, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "./login.service";
import {AccountService} from "../services/auth/account.service";
import {Router} from "@angular/router";
import {Authority} from "../services/constants/authority-constant";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit{
  @ViewChild('email', { static: false })
  email!: ElementRef;

  authenticationError = false;
  isLoading :boolean = false;

  loginForm = new FormGroup({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    rememberMe: new FormControl(false, { nonNullable: true, validators: [Validators.required] }),
  });

  constructor(private accountService: AccountService, private loginService: LoginService, private router: Router, private renderer: Renderer2) {}

  ngOnInit(): void {

    this.accountService.identity().subscribe((account) => {
      if (!this.accountService.isAuthenticated()) {
        return;
      }
      if (account && account.role  === Authority.ADMIN){
        this.router.navigate(['admin']).then((r) => console.log(r));
      }
      this.router.navigate(['']).then(r => console.log(r));
    });
  }

  login(): void {
    this.isLoading = true
    this.loginService.login(this.loginForm.getRawValue()).subscribe({
      next: () => {
        this.authenticationError = false;
        this.accountService.getMyDatas().subscribe((userData) => {
          if (userData && userData.role === Authority.ADMIN) {
            this.router.navigate(['admin']).then((r) => console.log(r));
          }else if (userData && userData.role?.includes("PROPRIO")){
            this.router.navigate(['manager']).then((r) => console.log(r));
          }
          else {
            this.router.navigate(['']).then((r) => console.log(r));
          }
        });

      },
      error: () => {
        this.isLoading = false
        this.authenticationError = true;

        // Masquer l'alerte après 1 minute (60000 millisecondes)
        setTimeout(() => {
          this.authenticationError = false;
        }, 3000);

      },
    });
  }


}

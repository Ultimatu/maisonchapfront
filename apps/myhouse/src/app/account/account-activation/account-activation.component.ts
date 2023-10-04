import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../services/auth/account.service';
import {catchError, tap} from "rxjs/operators";
import {throwError} from "rxjs";

@Component({
    selector: 'app-account-activation',
    templateUrl: './account-activation.component.html',
    styleUrls: ['./account-activation.component.css'],
})
export class AccountActivationComponent implements OnInit {
    isLoading = false;
    activationError = false;
    displayForm = true;
    email: string = '';
    code: string = '';
    isExpired: boolean = false;
    countdown: number = 600;
    isActivated: boolean = false;
    displayResendButton: boolean = false;

    activateForm = new FormGroup({
        code: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    });

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private accountService: AccountService
    ) {}

    ngOnInit(): void {
        this.email = <string>this.accountService.getMailPending();
        if (this.displayForm) {
           setInterval(() => {
                this.checkIfAccountIsActivated();
            }, 500);
            this.startCountdown();
        }
    }

    checkIfAccountIsActivated() {
        this.accountService.checkIfAccountActivated(this.email).pipe(
          tap((res: any) => {
            if (res && res.message) {
              if (res.message === 'Account activated') {
                this.isActivated = true;
                this.displayForm = false;
                this.activationError = false;
                this.isExpired = false;
                this.displayResendButton = false;
                setTimeout(() => {
                  this.accountService.setMailSent(false);
                  this.router.navigate(['login']);
                }, 100000);

              }
            }
            console.log(res);
          }),
          catchError(error => {
            console.error(error);
            return throwError(error); // Vous pouvez choisir de relancer l'erreur ou de renvoyer une autre valeur
          })
        )
          .subscribe();
    }

    startCountdown() {
        const interval = setInterval(() => {
            this.countdown--;
            if (this.countdown <= 0) {
                clearInterval(interval);
                this.isExpired = true;
                this.displayForm = false;
            }
            if (this.countdown <= 500) {
                this.displayResendButton = true;
            }
        }, 1000);
    }

    regenerateToken() {
        this.isLoading = true;
        this.accountService.regenerateCode(this.email).pipe(
          tap((res: any) => {
            if (res && res.message) {
              if (res.message === 'Code generated') {
                this.isLoading = false;
                this.activationError = false;
                this.isExpired = false;
                this.displayForm = true;
                this.displayResendButton = false;
                this.startCountdown();
              }
            }
            console.log(res);
          }
          ),
          catchError(error => {
            console.error(error);
            return throwError(error);
          }
          )
        )
          .subscribe();

    }

  activate() {
    this.isLoading = true;
    this.code = <string>this.activateForm.get('code')?.value;
    console.log(this.code);

    this.accountService.activateAccountWithCode(this.code, this.email)
      .pipe(
        tap((res: any) => {
          console.log(res);
          this.isLoading = false;
          this.displayForm = false;
          if (res && res.message) {
            if (res.message === 'Account activated') {
              this.isActivated = true;
              setTimeout(() => {
                this.accountService.setMailSent(false);
                this.router.navigate(['login']);
              }, 10000);

            } else {
              this.activationError = true;
            }
          } else {
            this.activationError = true;
          }
          console.log(res);
        }),
        catchError(error => {
          this.isLoading = false;
          this.activationError = true;
          // Gérer les erreurs ici
          console.error(error);
          return throwError(error); // Vous pouvez choisir de relancer l'erreur ou de renvoyer une autre valeur
        })
      )
      .subscribe();

  }

  displaySuccessMessage() {
    return this.isActivated && !this.activationError && !this.isExpired && !this.displayForm;
  }

  goToLogin() {
      this.accountService.setMailSent(false);
    this.router.navigate(['login']);
  }

}

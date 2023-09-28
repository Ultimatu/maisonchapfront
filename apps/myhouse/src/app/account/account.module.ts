import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AccountActivationComponent} from "./account-activation/account-activation.component";
import {RegisterComponent} from "./register/register.component";
import {PasswordRecoveryComponent} from "./password-recovery/password-recovery.component";
import {RouterModule} from "@angular/router";
import {AccountComponent} from "./account.component";



@NgModule({
  declarations: [
    AccountActivationComponent,
    RegisterComponent,
    PasswordRecoveryComponent
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AccountComponent,


      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'activation',
        component: AccountActivationComponent
      },
      {
        path: 'recovery-password',
        component: PasswordRecoveryComponent
      }

    ]),
    CommonModule
  ],
  exports: [
    AccountActivationComponent,
    RegisterComponent,
    PasswordRecoveryComponent
  ]
})
export class AccountModule { }

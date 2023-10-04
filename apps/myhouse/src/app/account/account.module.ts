import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountActivationComponent } from './account-activation/account-activation.component';
import { RegisterComponent } from './register/register.component';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';
import { RouterModule } from '@angular/router';
import { AccountComponent } from './account.component';
import { FooterComponent } from '../layouts/footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MailGuard} from "../services/auth/guards/mail-guard.service";
import {FormatCountdownPipe} from "./account-activation/form-countdown.component";

@NgModule({
  declarations: [
    AccountActivationComponent,
    AccountComponent,
    RegisterComponent,
    PasswordRecoveryComponent,
    FormatCountdownPipe
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AccountComponent,
        children: [
          {
            path: '',
            component: FooterComponent,
            outlet: 'app-footer',
          }
        ],
      },
      {
        path: 'register/:role',
        component: RegisterComponent,
        children: [
          {
            path: '',
            component: FooterComponent,
            outlet: 'app-footer',
          }
        ],

      },
      {
        canActivate: [MailGuard],
        path: 'activation',
        component: AccountActivationComponent,
        children: [
          {
            path: '',
            component: FooterComponent,
            outlet: 'app-footer',
          }
        ],

      },
      {
        path: 'recovery-password',
        component: PasswordRecoveryComponent,
        children: [
          {
            path: '',
            component: FooterComponent,
            outlet: 'app-footer',
          }
        ],

      },
    ]),
    CommonModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatCheckboxModule,
    ReactiveFormsModule,
  ],
  exports: [
    AccountActivationComponent,
    RegisterComponent,
    PasswordRecoveryComponent,
    AccountComponent,
    FormatCountdownPipe
  ],
})
export class AccountModule {}

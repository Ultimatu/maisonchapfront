import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { LOGIN_ROUTE } from './login.route';
import { LoginComponent } from './login.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatRadioModule} from "@angular/material/radio";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {NgIf} from "@angular/common";
import {MatProgressBarModule} from "@angular/material/progress-bar";

@NgModule({
    imports: [
        RouterModule.forChild([LOGIN_ROUTE]),
        SharedModule,
        ReactiveFormsModule,
        MatRadioModule,
        MatInputModule,
        MatButtonModule,
        MatCheckboxModule,
        NgIf,
        MatProgressBarModule

    ],
  declarations: [LoginComponent],
  exports: [
    LoginComponent
  ]
})
export class LoginModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SidenavComponent} from "./sidenav/sidenav.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {RouterModule} from "@angular/router";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import {LogoutComponent} from "../component/logout/logout.component";

@NgModule({
  declarations: [SidenavComponent, DashboardComponent],
  imports: [
    RouterModule.forChild([{
      path: '',
      component: SidenavComponent,
      children: [
        {
          path: 'dashboard',
          component: DashboardComponent,
        },
        {
          path: 'house',
          component: DashboardComponent,

        },
        {
          path: 'logout',
          component: LogoutComponent
        }
      ],
      data: {
        pageTitle: 'login.title',
      },
    }]),
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatGridListModule
  ],
  exports: [
    SidenavComponent, DashboardComponent
  ]
})
export class AdminModule { }

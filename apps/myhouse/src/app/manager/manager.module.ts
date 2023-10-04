import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerComponent } from "./manager.component";
import { RouterModule } from "@angular/router";
import { MANAGER_ROUTE } from "./manager.route";
import { DashboardProprioComponent } from './dashboard-proprio/dashboard-proprio.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SidebarProprioComponent } from './sidebar-proprio/sidebar-proprio.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';



@NgModule({
  declarations: [ManagerComponent, DashboardProprioComponent, SidebarProprioComponent],
  imports: [
    RouterModule.forChild([MANAGER_ROUTE]),
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule
  ],
  exports: [
    ManagerComponent, DashboardProprioComponent
  ]
})
export class ManagerModule { }

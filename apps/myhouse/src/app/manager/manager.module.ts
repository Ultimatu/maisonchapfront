import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ManagerComponent} from "./manager.component";
import {RouterModule} from "@angular/router";
import {MANAGER_ROUTE} from "./manager.route";



@NgModule({
  declarations: [ManagerComponent],
  imports: [
    RouterModule.forChild([MANAGER_ROUTE]),
    CommonModule
  ],
  exports: [
    ManagerComponent
  ]
})
export class ManagerModule { }

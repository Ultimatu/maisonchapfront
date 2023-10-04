import { Route } from '@angular/router';
import {DashboardProprioComponent} from "./dashboard-proprio/dashboard-proprio.component";
import {SidebarProprioComponent} from "./sidebar-proprio/sidebar-proprio.component";


export const MANAGER_ROUTE: Route = {
  path: '',
  component: SidebarProprioComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardProprioComponent,
    },
  ],
  data: {
    pageTitle: 'proprio page',
  },
};

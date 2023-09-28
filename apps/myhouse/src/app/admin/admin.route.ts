import {Route} from "@angular/router";
import {SidenavComponent} from "./sidenav/sidenav.component";
import {DashboardComponent} from "./dashboard/dashboard.component";

export const ADMIN_ROUTE: Route = {
  path: '',
  component: SidenavComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent
    }
  ],
  data: {
    pageTitle: 'login.title',
  },
};

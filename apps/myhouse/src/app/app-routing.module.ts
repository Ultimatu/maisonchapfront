import { RouterModule } from '@angular/router';


import {NgModule} from "@angular/core";
import {NavbarComponent} from "./layouts/navbar/navbar.component";
import {Authority} from "./services/constants/authority-constant";
import {UserRouteAccessService} from "./services/auth/user-route-access.service";
import {errorRoute} from "./layouts/error/error.route";
import {MainComponent} from "./layouts/main/main.component";
import {navbarRoute} from "./layouts/navbar/navbar.route";
import {FooterComponent} from "./layouts/footer/footer.component";
import {HouseComponent} from "./component/house/house.component";
import {LoginComponent} from "./login/login.component";
import {SidenavComponent} from "./admin/sidenav/sidenav.component";
import {DashboardComponent} from "./admin/dashboard/dashboard.component";

@NgModule({
  imports: [
    RouterModule.forRoot(
      [

        {
          path: 'admin',
          data: {
            authorities: [Authority.ADMIN],
          },
          canActivate: [UserRouteAccessService],
          loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
        },
        {
          path: 'account',
          loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
        },

        {
          path: 'login',
          loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
        },
        {
          path: '',
          component: MainComponent,
          children: [
            {
              path: '',
              component: NavbarComponent,
              outlet: 'app-navbar',
            },
            {
              path: '',
              component: FooterComponent,
              outlet: 'app-footer',
            },
            {
              path: '',
              component: HouseComponent

            }

          ],
        },
        ...errorRoute,
      ],
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

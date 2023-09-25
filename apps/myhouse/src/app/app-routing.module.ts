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

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
      /*
        {
          path: 'admin',
          data: {
            authorities: [Authority.ADMIN],
          },
          canActivate: [UserRouteAccessService],
          //loadChildren: () => import('./admin/admin-routing.module').then(m => m.AdminRoutingModule),
        },
        {
          path: 'account',
          //loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
        },*/
        {
          path: 'login',
          component: LoginComponent,
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

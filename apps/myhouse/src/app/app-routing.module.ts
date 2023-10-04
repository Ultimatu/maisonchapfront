import { RouterModule } from '@angular/router';


import {NgModule} from "@angular/core";
import {NavbarComponent} from "./layouts/navbar/navbar.component";
import {Authority} from "./services/constants/authority-constant";
import {UserRouteAccessService} from "./services/auth/user-route-access.service";
import {errorRoute} from "./layouts/error/error.route";
import {MainComponent} from "./layouts/main/main.component";
import {FooterComponent} from "./layouts/footer/footer.component";
import {HouseComponent} from "./component/house/house.component";
import {GuestGuard} from "./services/auth/guards/guest-gard.service";
import {OnlyUserGuard} from "./services/auth/guards/only-user-guard.service";
import {LogoutComponent} from "./component/logout/logout.component";
import {HouseDetailComponent} from "./component/house-detail/house-detail.component";

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
              path: 'proprio',
              data: {
                  authorities: [Authority.FREE_PROPRIO, Authority.PREMIUM_PROPRIO, Authority.STANDARD_PROPRIO],
              },
              canActivate: [UserRouteAccessService],
              loadChildren: () => import('./manager/manager.module').then(m => m.ManagerModule),


          },
        {
          canActivate: [GuestGuard],
          path: 'account',
          loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
        },

        {
          canActivate: [GuestGuard],
          path: 'login',
          loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
        },
        {

          canActivate: [OnlyUserGuard],
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
            },
            {
              path: 'house:id',
              component: HouseDetailComponent
            },
            {
              path: 'house:userId',
              component: HouseDetailComponent
            },
            {
              path: 'house/reserve:id',
              component: HouseDetailComponent
            },

          ],

        },

        {
          path: 'logout',
          component: LogoutComponent
        },
        {
          path: '**',
          redirectTo: '',
        }
        //...errorRoute,
      ],
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

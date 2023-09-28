import { Route } from '@angular/router';
import {ManagerComponent} from "./manager.component";


export const MANAGER_ROUTE: Route = {
  path: '',
  component: ManagerComponent,
  data: {
    pageTitle: 'proprio page',
  },
};

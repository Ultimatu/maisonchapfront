import { NgModule } from '@angular/core';

import { SharedLibsModule } from './shared-libs.module';
import {AlertComponent} from "./alert/alert.component";
import {HasAnyAuthorityDirective} from "./auth/has-any-authority.directive";

@NgModule({
  imports: [SharedLibsModule],
  declarations: [
    AlertComponent,
    HasAnyAuthorityDirective

  ],
  exports: [
    AlertComponent,
    HasAnyAuthorityDirective

  ]
})
export class SharedModule {}

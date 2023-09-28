import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DataViewModule, DataViewLayoutOptions } from 'primeng/dataview';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DropdownModule } from 'primeng/dropdown';
import { MenuModule } from 'primeng/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FormGroupComponent } from './component/form-group/form-group.component';
import { NgOptimizedImage } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ButtonModule } from 'primeng/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { SwipperComponent } from './component/swipper/swipper.component';
import { CarouselModule } from 'primeng/carousel';
import { ErrorComponent } from './layouts/error/error.component';
import { MainComponent } from './layouts/main/main.component';
import { ProfilesComponent } from './layouts/profiles/profiles.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {FooterComponent} from "./layouts/footer/footer.component";
import { HouseComponent } from './component/house/house.component';
import { HttpClientModule} from '@angular/common/http';
import {TagModule} from "primeng/tag";
import {RatingModule} from "primeng/rating";
import { AddressFormComponent } from './component/address-form/address-form.component';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import {SearchbarComponent} from "./shared/searchbar/searchbar.component";
import { NgxWebstorageModule} from "ngx-webstorage";
import {httpInterceptorProviders} from "./services/interceptor";
import {SharedLibsModule} from "./shared/shared-libs.module";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SwipperComponent,
    ErrorComponent,
    MainComponent,
    ProfilesComponent,
    FooterComponent,
    HouseComponent,
    AddressFormComponent,
    SearchbarComponent,
    FormGroupComponent
  ],
  imports: [
    BrowserModule,
    NgxWebstorageModule.forRoot({prefix: 'app', separator: '-', caseSensitive: true}),
    AppRoutingModule,
    ButtonModule,
    DropdownModule,
    MenuModule,
    BrowserAnimationsModule,
    NgOptimizedImage,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatToolbarModule,
    CarouselModule,
    MatMenuModule,
    MatChipsModule,
    MatSidenavModule,
    MatListModule,
    HttpClientModule,
    DataViewModule,
    TagModule,
    RatingModule,
    FormsModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatInputModule,
    SharedLibsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]

})
export class AppModule {}

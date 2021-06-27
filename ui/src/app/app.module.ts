import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideNavComponent } from './modules/shared/components/side-nav/side-nav.component';
import { MaterialModule } from './modules/shared/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { HTTP_INTERCEPTOR_PROVIDERS } from './modules/shared/interceptors';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './modules/auth/services/auth.service';
import { SharedModule } from './modules/shared/shared.module';
import { LoaderComponent } from './modules/shared/components/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    NgxMaterialTimepickerModule,
    SharedModule
  ],
  providers: [HTTP_INTERCEPTOR_PROVIDERS, CookieService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

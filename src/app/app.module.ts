import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { TokenInterceptorService } from './auth/services/token-interceptor.service';
import { NestedTableComponent } from './core/components/nested-table/nested-table.component';
import { EnvTokenInterceptor } from './auth/services/env-token.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NestedTableComponent,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  //// providers: [
  ////   provideHttpClient(withInterceptors([
  ////     TokenInterceptorService
  ////   ]))
  //// ],
  providers: [
   {
     provide: HTTP_INTERCEPTORS,
     useClass: EnvTokenInterceptor,
     multi: true
   }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

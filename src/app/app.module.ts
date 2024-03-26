import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { TokenInterceptorService } from './auth/services/token-interceptor.service';
import { NestedTableComponent } from './core/components/nested-table/nested-table.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NestedTableComponent,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    provideHttpClient(withInterceptors([
      TokenInterceptorService
    ]))
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

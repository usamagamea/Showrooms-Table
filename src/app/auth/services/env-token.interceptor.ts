import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { AuthToken } from '../token/token';

@Injectable()
export class EnvTokenInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let headers: HttpHeaders = new HttpHeaders({
  'Access-Control-Allow-Origin': '*',
Authorization: `Bearer ${AuthToken}`,
})
return next.handle(request.clone({
  headers: headers,
  url: ` ${environment.baseUrl}/${request.url}`
}))
  }
  }


import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthenticationService} from "../service/authentication.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService) {}

  intercept(httpRequest: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
    if (httpRequest.url.includes(`{$this.authService.host}/user/login`)) {
      return httpHandler.handle(httpRequest);
    }

    if (httpRequest.url.includes(`{$this.authService.host}/user/register`)) {
      return httpHandler.handle(httpRequest);
    }

    if (httpRequest.url.includes(`{$this.authService.host}/user/reset-password`)) {
      return httpHandler.handle(httpRequest);
    }

    this.authService.loadToken();
    const token: string = this.authService.getToken();
    const clonedWithAuthorization = httpRequest.clone({ setHeaders: { Authorization: `Bearer ${token}`} });

    return httpHandler.handle(clonedWithAuthorization);
  }
}
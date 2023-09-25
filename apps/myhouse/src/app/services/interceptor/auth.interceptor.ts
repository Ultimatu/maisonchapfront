import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { ApplicationConfigService } from '../config/application-coonfig.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private localStorageService: LocalStorageService,
    private sessionStorageService: SessionStorageService,
    private applicationConfigService: ApplicationConfigService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const serverApiUrl = this.applicationConfigService.getEndpointFor('');

    if (
      request.url &&
      !request.url.includes('/auth/') &&
      !request.url.includes('/public/')
    ) {
      const token: string | null =
        this.localStorageService.retrieve('authenticationToken') ??
        this.sessionStorageService.retrieve('authenticationToken');
      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("token", token);
      }
    }

    return next.handle(request);
  }
}

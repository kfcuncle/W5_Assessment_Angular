import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private keycloak: KeycloakService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Get the access token from KeycloakService
    const accessToken = this.keycloak.getKeycloakInstance().token;

    // Clone the request and append the token to the Authorization header
    const authReq = request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Pass the cloned request with the token header to the next handler
    return next.handle(authReq);
  }
}

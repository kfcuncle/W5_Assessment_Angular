import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard extends KeycloakAuthGuard {
  constructor(
    protected readonly router: Router,
    protected readonly keycloak: KeycloakService
  ) {
    super(router, keycloak);
  }

  async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    if (!this.authenticated) {
      await this.keycloak.login({
        redirectUri: window.location.origin + state.url,
      });
    }

    // Check if user has required roles
    const requiredRoles = route.data.roles as string[];
    if (!requiredRoles || requiredRoles.every(role => this.roles.includes(role))) {
      localStorage.setItem('accessToken', this.keycloak.getKeycloakInstance().token);
      return true; // Access allowed
    } else {
      return this.router.parseUrl('/access-denied'); // Redirect to access denied page
    }
  }
}

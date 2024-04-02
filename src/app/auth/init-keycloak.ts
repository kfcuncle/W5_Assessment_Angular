import { KeycloakService } from 'keycloak-angular';

export function initKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8081',
        realm: 'W5-Assessment',
        clientId: 'todotask-ui',
      },
      initOptions: {
        onLoad: 'check-sso',
        checkLoginIframe: false,
      },
      enableBearerInterceptor: true,
      bearerPrefix: 'Bearer',
    });
}

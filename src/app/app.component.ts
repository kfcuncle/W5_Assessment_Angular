import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'W5_Assessment_Angular';
  constructor(private keycloak: KeycloakService) {}

  logout() {
    this.keycloak.logout()
  }
}

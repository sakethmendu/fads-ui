import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // constructor(private readonly keycloak: KeycloakService) {}

  ngOnInit(): void {
    // this.keycloak.login();
  }
  title = 'product-app';
}

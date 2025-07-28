import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-left-nav',
  imports: [
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './left-nav.component.html',
  styleUrl: './left-nav.component.scss'
})
export class LeftNavComponent {
  protected domain = environment.auth0.domain;
  protected clientId = environment.auth0.clientId;
  protected audience = environment.auth0.audience;
  protected redirectUri = environment.auth0.redirectUri;
  protected scope = environment.auth0.scope;
  protected state = environment.auth0.state;
}

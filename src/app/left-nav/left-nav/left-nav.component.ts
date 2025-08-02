import {Component, inject} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {AuthButtonComponent} from '../../auth/auth-button/auth-button.component';
import {AuthService} from '@auth0/auth0-angular';
import {AsyncPipe} from '@angular/common';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-left-nav',
  imports: [
    RouterLinkActive,
    RouterLink,
    AuthButtonComponent,
    AsyncPipe
  ],
  templateUrl: './left-nav.component.html',
  styleUrl: './left-nav.component.scss'
})
export class LeftNavComponent {
  protected auth = inject(AuthService);
  protected userService = inject(UserService);
  isAuthenticated$ = this.auth.isAuthenticated$;
}

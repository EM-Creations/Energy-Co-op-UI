import {Component, DOCUMENT, inject} from '@angular/core';
import {AuthService} from '@auth0/auth0-angular';
import {AsyncPipe} from '@angular/common';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-auth-button',
  imports: [
    AsyncPipe
  ],
  templateUrl: './auth-button.component.html',
  styleUrl: './auth-button.component.scss'
})
export class AuthButtonComponent {
  document = inject<Document>(DOCUMENT);
  auth = inject(AuthService);
  userService = inject(UserService);

  handleLogin(): void {
    this.auth.loginWithRedirect().subscribe(() => {
        this.userService.retrieveUser();
        this.userService.retrieveAccessToken();
      }
    )
  }

}

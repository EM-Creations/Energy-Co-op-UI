import {Component, inject} from '@angular/core';
import {AuthService} from '@auth0/auth0-angular';
import {AsyncPipe} from '@angular/common';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-profile',
  imports: [
    AsyncPipe
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  auth = inject(AuthService);
  userService = inject(UserService);

  title = 'Your Profile';

  protected readonly JSON = JSON;
}

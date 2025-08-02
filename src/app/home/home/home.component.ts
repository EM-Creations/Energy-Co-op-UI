import {Component, inject} from '@angular/core';
import {AuthService} from '@auth0/auth0-angular';
import {AsyncPipe} from '@angular/common';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-home',
  imports: [
    AsyncPipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  auth = inject(AuthService);
  userService = inject(UserService);

  title = 'Energy Co-op UI';
  protected readonly JSON = JSON;
}

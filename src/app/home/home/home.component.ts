import {Component, inject} from '@angular/core';
import {AuthService} from '@auth0/auth0-angular';
import {AsyncPipe} from '@angular/common';

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

  title = 'Energy Co-op UI';
}

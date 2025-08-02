import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {AuthButtonComponent} from '../../auth/auth-button/auth-button.component';

@Component({
  selector: 'app-left-nav',
  imports: [
    RouterLinkActive,
    RouterLink,
    AuthButtonComponent
  ],
  templateUrl: './left-nav.component.html',
  styleUrl: './left-nav.component.scss'
})
export class LeftNavComponent {
}

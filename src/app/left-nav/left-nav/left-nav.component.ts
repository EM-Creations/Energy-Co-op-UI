import {Component, inject, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {AuthButtonComponent} from '../../auth/auth-button/auth-button.component';
import {AuthService} from '@auth0/auth0-angular';
import {AsyncPipe} from '@angular/common';
import {UserService} from '../../service/user.service';
import {MatTooltip} from '@angular/material/tooltip';

@Component({
  selector: 'app-left-nav',
  imports: [
    RouterLinkActive,
    RouterLink,
    AuthButtonComponent,
    AsyncPipe,
    MatTooltip
  ],
  templateUrl: './left-nav.component.html',
  styleUrl: './left-nav.component.scss'
})
export class LeftNavComponent implements OnInit {
  protected auth = inject(AuthService);
  protected userService = inject(UserService);
  isAuthenticated = false;
  canViewGraigFatha = false;

  get showGraigFathaLink(): boolean {
    return this.isAuthenticated && this.canViewGraigFatha;
  }

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(auth => {
      this.isAuthenticated = auth;
    });
    this.userService.hasPermission$('read:gf-stats-basic').subscribe(hasPermission => {
      this.canViewGraigFatha = hasPermission;
    });
  }
}

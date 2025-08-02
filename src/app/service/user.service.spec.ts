import {TestBed} from '@angular/core/testing';

import {UserService} from './user.service';
import {InjectionToken} from '@angular/core';
import {AuthService} from '@auth0/auth0-angular';

describe('UserService', () => {
  let service: UserService;
  const AUTH0_CLIENT = new InjectionToken('auth0.client');

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AuthService, useValue: AUTH0_CLIENT }]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

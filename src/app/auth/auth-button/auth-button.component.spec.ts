import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AuthButtonComponent} from './auth-button.component';
import {InjectionToken} from '@angular/core';
import {AuthService} from '@auth0/auth0-angular';

describe('AuthButtonComponent', () => {
  let component: AuthButtonComponent;
  let fixture: ComponentFixture<AuthButtonComponent>;
  const AUTH0_CLIENT = new InjectionToken('auth0.client');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthButtonComponent],
      providers: [{ provide: AuthService, useValue: AUTH0_CLIENT }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

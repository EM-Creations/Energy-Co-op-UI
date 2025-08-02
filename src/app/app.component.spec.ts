/* Copyright (C) 2025 Edward McKnight - All Rights Reserved */
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {provideRouter} from '@angular/router';
import {InjectionToken} from '@angular/core';
import {AuthService} from '@auth0/auth0-angular';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  const AUTH0_CLIENT = new InjectionToken('auth0.client');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter([]), { provide: AuthService, useValue: AUTH0_CLIENT }] // Mock value for auth0.client
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });
});

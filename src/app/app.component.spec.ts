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

  describe('versionString', () => {
    let originalVersion: any;
    beforeAll(() => {
      // Save the original VERSION object
      // eslint-disable-next-line  @typescript-eslint/no-require-imports
      originalVersion = { ...require('../environments/version').VERSION };
    });
    afterEach(() => {
      // Restore the original VERSION object after each test
      // eslint-disable-next-line  @typescript-eslint/no-require-imports
      Object.assign(require('../environments/version').VERSION, originalVersion);
    });

    it('should show only version if tag and hash are missing', () => {
      // eslint-disable-next-line  @typescript-eslint/no-require-imports
      const VERSION = require('../environments/version').VERSION;
      VERSION.version = '1.0.0';
      VERSION.tag = null;
      VERSION.hash = null;
      const app = new AppComponent();
      expect(app.versionString).toBe('1.0.0');
    });

    it('should show version and tag if tag is present', () => {
      // eslint-disable-next-line  @typescript-eslint/no-require-imports
      const VERSION = require('../environments/version').VERSION;
      VERSION.version = '1.0.0';
      VERSION.tag = 'beta';
      VERSION.hash = null;
      const app = new AppComponent();
      expect(app.versionString).toBe('1.0.0 [beta]');
    });

    it('should show version and hash if hash is present', () => {
      // eslint-disable-next-line  @typescript-eslint/no-require-imports
      const VERSION = require('../environments/version').VERSION;
      VERSION.version = '1.0.0';
      VERSION.tag = null;
      VERSION.hash = 'abc123';
      const app = new AppComponent();
      expect(app.versionString).toBe('1.0.0 #abc123');
    });

    it('should show version, tag, and hash if both are present', () => {
      // eslint-disable-next-line  @typescript-eslint/no-require-imports
      const VERSION = require('../environments/version').VERSION;
      VERSION.version = '1.0.0';
      VERSION.tag = 'rc1';
      VERSION.hash = 'def456';
      const app = new AppComponent();
      expect(app.versionString).toBe('1.0.0 [rc1] #def456');
    });
  });
});

import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LeftNavComponent} from './left-nav.component';
import {provideRouter} from '@angular/router';
import {InjectionToken} from '@angular/core';
import {AuthService} from '@auth0/auth0-angular';

describe('LeftNavComponent', () => {
  let component: LeftNavComponent;
  let fixture: ComponentFixture<LeftNavComponent>;
  const AUTH0_CLIENT = new InjectionToken('auth0.client');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeftNavComponent],
      providers: [provideRouter([]), { provide: AuthService, useValue: AUTH0_CLIENT }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeftNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

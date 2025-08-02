import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeComponent} from './home.component';
import {InjectionToken} from '@angular/core';
import {AuthService} from '@auth0/auth0-angular';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const AUTH0_CLIENT = new InjectionToken('auth0.client');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [{ provide: AuthService, useValue: AUTH0_CLIENT }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('title should be set.', () => {
    expect(component.title).toEqual('Energy Co-op UI');
  });
});

import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StatsComponent} from './stats.component';
import {provideRouter} from '@angular/router';
import {of} from 'rxjs';
import {AuthService} from '@auth0/auth0-angular';
import {InjectionToken} from '@angular/core';
import {HttpClient} from '@angular/common/http';

describe('StatsComponent', () => {
  let component: StatsComponent;
  let fixture: ComponentFixture<StatsComponent>;
  let siteDataService;
  let httpClient;
  const AUTH0_CLIENT = new InjectionToken('auth0.client');

  beforeEach(async () => {
    httpClient = {
      get: jest.fn(),
      post: jest.fn()
    };

    siteDataService = {
      getTodayGenerationWatts: jest.fn()
    };

    siteDataService.getTodayGenerationWatts.mockReturnValue(of(null));

    await TestBed.configureTestingModule({
      imports: [StatsComponent],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: AUTH0_CLIENT },
        { provide: HttpClient, useValue: httpClient }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

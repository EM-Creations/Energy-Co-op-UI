import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeComponent} from './home.component';
import {InjectionToken} from '@angular/core';
import {AuthService} from '@auth0/auth0-angular';
import {of} from 'rxjs';
import {EnergyMixService} from '../../service/energy-mix.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const AUTH0_CLIENT = new InjectionToken('auth0.client');
  let energyMixService;

  beforeEach(async () => {
    energyMixService = {
      getCurrentGenerationMix: jest.fn()
    };

    energyMixService.getCurrentGenerationMix.mockReturnValue(of(null));

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [{provide: AuthService, useValue: AUTH0_CLIENT}, {
        provide: EnergyMixService,
        useValue: energyMixService
      }]
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

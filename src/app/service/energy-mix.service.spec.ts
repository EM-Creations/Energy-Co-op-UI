import {TestBed} from '@angular/core/testing';

import {EnergyMixService} from './energy-mix.service';
import {HttpClient} from '@angular/common/http';

describe('EnergyMixService', () => {
  let service: EnergyMixService;
  let httpClient;

  beforeEach(() => {
    httpClient = {
      get: jest.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        {provide: HttpClient, useValue: httpClient}
      ]
    });
    service = TestBed.inject(EnergyMixService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

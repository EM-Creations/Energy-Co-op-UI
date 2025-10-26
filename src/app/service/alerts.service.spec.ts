import {TestBed} from '@angular/core/testing';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '@auth0/auth0-angular';
import {AlertsService} from './alerts.service';
import {environment} from '../../environments/environment';
import {of} from 'rxjs';

describe('AlertsService', () => {
  let service: AlertsService;
  let httpClient: { get: jest.Mock };
  let authService: { getAccessTokenSilently: jest.Mock };

  beforeEach(() => {
    httpClient = {
      get: jest.fn()
    };

    authService = {
      getAccessTokenSilently: jest.fn().mockReturnValue(of('fake-token'))
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpClient },
        { provide: AuthService, useValue: authService }
      ]
    });

    service = TestBed.inject(AlertsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAlerts', () => {
    it('should get alerts for a site with auth token', () => {
      const testSite = 'test-site';
      const mockAlerts = [
        { id: 1, message: 'Alert 1' },
        { id: 2, message: 'Alert 2' }
      ];

      httpClient.get.mockReturnValue(of(mockAlerts));

      service.getAlerts(testSite).subscribe(alerts => {
        expect(alerts).toEqual(mockAlerts);
        expect(httpClient.get).toHaveBeenCalledWith(
          `${environment.api.baseURL}/alerts/${testSite}`,
          expect.objectContaining({
            headers: expect.any(Object)
          })
        );
        expect(authService.getAccessTokenSilently).toHaveBeenCalled();
      });
    });
  });
});

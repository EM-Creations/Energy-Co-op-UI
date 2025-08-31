import {TestBed} from '@angular/core/testing';

import {MemberService} from './member.service';
import {UserService} from './user.service';
import {of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {SiteInfo} from '../model/site-info';
import {EnergySaving} from '../model/EnergySaving';

describe('MemberService', () => {
  let service: MemberService;
  let userService;
  let httpClient;

  beforeEach(() => {
    httpClient = {
      get: jest.fn(),
      post: jest.fn()
    };

    userService = {
      getAccessTokenSilently$: jest.fn(() => of('mock-token'))
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpClient },
        { provide: UserService, useValue: userService }
      ]
    });
    service = TestBed.inject(MemberService);
  });

  describe('getTodaySavings', () => {
    it('should call userService and httpClient for Graig Fatha', (done) => {
      const site: SiteInfo = { name: 'Graig Fatha', description: '', mapUrl: '', dashboardUrl: '' };
      const mockSaving: EnergySaving = { amount: 5, currency: 'GBP', from: new Date(), to: new Date() };
      httpClient.get.mockReturnValue(of(mockSaving));
      service.getTodaySavings(site).subscribe(result => {
        expect(userService.getAccessTokenSilently$).toHaveBeenCalled();
        expect(httpClient.get).toHaveBeenCalledWith(expect.stringContaining('/graigFatha/member/todaySavings'), expect.any(Object));
        expect(result).toEqual(mockSaving);
        done();
      });
    });

    it('should return default for non-Graig Fatha', (done) => {
      const site: SiteInfo = { name: 'Other', description: '', mapUrl: '', dashboardUrl: '' };
      service.getTodaySavings(site).subscribe(result => {
        expect(result.amount).toBe(0);
        expect(result.currency).toBe('GBP');
        done();
      });
    });
  });

  describe('getHistoricalSavings', () => {
    it('should call userService and httpClient for Graig Fatha', (done) => {
      const site: SiteInfo = { name: 'Graig Fatha', description: '', mapUrl: '', dashboardUrl: '' };
      const from = new Date('2023-01-01');
      const to = new Date('2023-01-31');
      const mockSet = new Set<EnergySaving>([{ amount: 10, currency: 'GBP', from, to }]);
      httpClient.get.mockReturnValue(of(mockSet));
      service.getHistoricalSavings(site, from, to).subscribe(result => {
        expect(userService.getAccessTokenSilently$).toHaveBeenCalled();
        expect(httpClient.get).toHaveBeenCalledWith(expect.stringContaining('/graigFatha/member/savings/2023-01-01/2023-01-31'), expect.any(Object));
        expect(result).toEqual(mockSet);
        done();
      });
    });

    it('should return default Set for non-Graig Fatha', (done) => {
      const site: SiteInfo = { name: 'Other', description: '', mapUrl: '', dashboardUrl: '' };
      const from = new Date();
      const to = new Date();
      service.getHistoricalSavings(site, from, to).subscribe(result => {
        expect(result.size).toBe(1);
        const entry = Array.from(result)[0];
        expect(entry.amount).toBe(0);
        expect(entry.currency).toBe('GBP');
        done();
      });
    });
  });
});

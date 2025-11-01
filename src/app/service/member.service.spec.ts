import {TestBed} from '@angular/core/testing';
import {MemberService} from './member.service';
import {UserService} from './user.service';
import {of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {SiteInfo} from '../model/site-info';
import {EnergySaving} from '../model/EnergySaving';

describe('MemberService', () => {
  let service: MemberService;
  let userService: Partial<UserService>;
  let httpClient: { get: jest.Mock; post: jest.Mock };

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
      const site: SiteInfo = { name: 'Graig Fatha', description: '', mapURL: '', statsURL: '' };
      const mockSaving: EnergySaving = {
        amount: 5,
        currency: 'GBP',
        from: new Date(),
        to: new Date(),
        savingsRate: 0
      };
      httpClient.get.mockReturnValue(of(mockSaving));
      service.getTodaySavings(site).subscribe(result => {
        expect(userService.getAccessTokenSilently$).toHaveBeenCalled();
        expect(httpClient.get).toHaveBeenCalledWith(expect.stringContaining('/graigFatha/member/todaySavings'), expect.any(Object));
        expect(result).toEqual(mockSaving);
        done();
      });
    });

    it('should return default for non-Graig Fatha', (done) => {
      const site: SiteInfo = { name: 'Other', description: '', mapURL: '', statsURL: '' };
      service.getTodaySavings(site).subscribe(result => {
        expect(result.amount).toBe(0);
        expect(result.currency).toBe('GBP');
        done();
      });
    });
  });

  describe('getHistoricalSavings', () => {
    it('should call userService and httpClient for Graig Fatha', (done) => {
      const site: SiteInfo = { name: 'Graig Fatha', description: '', mapURL: '', statsURL: '' };
      const from = new Date('2023-01-01');
      const to = new Date('2023-01-31');
      const mockSet = new Set<EnergySaving>([{
        amount: 10,
        currency: 'GBP',
        from,
        to,
        savingsRate: 0
      }]);
      httpClient.get.mockReturnValue(of(mockSet));
      service.getHistoricalSavings(site, from, to).subscribe(result => {
        expect(userService.getAccessTokenSilently$).toHaveBeenCalled();
        expect(httpClient.get).toHaveBeenCalledWith(expect.stringContaining('/graigFatha/member/savings/2023-01-01/2023-01-31'), expect.any(Object));
        expect(result).toEqual(mockSet);
        done();
      });
    });

    it('should return default Set for non-Graig Fatha', (done) => {
      const site: SiteInfo = { name: 'Other', description: '', mapURL: '', statsURL: '' };
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

  describe('generateTaxDocument', () => {
    const mockFileName = 'tax-document.pdf';

    it('should call userService and httpClient for Graig Fatha and handle PDF response', (done) => {
      const site: SiteInfo = { name: 'Graig Fatha', description: '', mapURL: '', statsURL: '' };
      const from = new Date('2023-01-01');
      const to = new Date('2023-01-31');
      const mockPdfBlob = new Blob(['mock pdf content'], { type: 'application/pdf' });

      // Mock response with headers and body
      const mockResponse = {
        headers: {
          get: jest.fn().mockReturnValue('attachment; filename=test.pdf')
        },
        body: mockPdfBlob
      };

      httpClient.get.mockReturnValue(of(mockResponse));

      service.generateTaxDocument(site, from, to, mockFileName).subscribe(result => {
        expect(userService.getAccessTokenSilently$).toHaveBeenCalled();
        expect(httpClient.get).toHaveBeenCalledWith(
          expect.stringContaining('/graigFatha/member/tax-document/2023-01-01/2023-01-31'),
          expect.objectContaining({
            headers: expect.any(Object),
            responseType: 'blob',
            observe: 'response'
          })
        );

        // Verify the result is a Blob with PDF type
        expect(result).toBeInstanceOf(Blob);
        expect(result.type).toBe('application/pdf');
        done();
      });
    });

    it('should return empty blob for non-Graig Fatha site', (done) => {
      const site: SiteInfo = { name: 'Other', description: '', mapURL: '', statsURL: '' };
      const from = new Date('2023-01-01');
      const to = new Date('2023-01-31');

      service.generateTaxDocument(site, from, to, mockFileName).subscribe(result => {
        expect(result).toBeInstanceOf(Blob);
        expect(result.size).toBe(0);
        expect(httpClient.get).not.toHaveBeenCalled();
        done();
      });
    });

    it('should return empty blob when site is undefined', (done) => {
      const from = new Date('2023-01-01');
      const to = new Date('2023-01-31');

      service.generateTaxDocument(undefined, from, to, mockFileName).subscribe(result => {
        expect(result).toBeInstanceOf(Blob);
        expect(result.size).toBe(0);
        expect(httpClient.get).not.toHaveBeenCalled();
        done();
      });
    });
  });
});

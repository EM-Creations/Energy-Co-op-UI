import {SiteInfoService} from './site-info.service';
import {SiteInfo} from '../model/site-info';
import {HttpClient} from '@angular/common/http';
import {UserService} from './user.service';
import {TestBed} from '@angular/core/testing';
import {of, throwError} from 'rxjs';

describe('SiteInfoService', () => {
  let service: SiteInfoService;
  let mockHttp: jest.Mocked<HttpClient>;
  let mockUserService;

  beforeEach(() => {
    mockHttp = {
      get: jest.fn()
    };

    mockUserService = {
      getAccessTokenSilently$: jest.fn(() => of('mock-token'))
    };

    TestBed.configureTestingModule({
      providers: [
        SiteInfoService,
        { provide: HttpClient, useValue: mockHttp },
        { provide: UserService, useValue: mockUserService }
      ]
    });

    service = TestBed.inject(SiteInfoService);
  });

  describe('getSiteInfoFromName', () => {
    it('should return correct SiteInfo for Graig Fatha', () => {
      const info = service.getSiteInfoFromName('Graig Fatha');
      expect(info).toBeInstanceOf(SiteInfo);
      expect(info.name).toBe('Graig Fatha');
      expect(info.description).toContain('Graig Fatha Wind Turbine');
      expect(info.mapURL).toContain('Graig+Fatha+Wind+Farm');
    });

    it('should return correct SiteInfo for Kirk Hill', () => {
      const info = service.getSiteInfoFromName('Kirk Hill');
      expect(info).toBeInstanceOf(SiteInfo);
      expect(info.name).toBe('Kirk Hill');
      expect(info.description).toContain('Kirk Hill Wind Farm');
      expect(info.mapURL).toContain('Kirk+Hill+Windfarm');
    });

    it('should return correct SiteInfo for Derril Water', () => {
      const info = service.getSiteInfoFromName('Derril Water');
      expect(info).toBeInstanceOf(SiteInfo);
      expect(info.name).toBe('Derril Water');
      expect(info.description).toContain('Derril Water solar park');
      expect(info.mapURL).toContain('Derrill+Water');
    });

    it('should return default SiteInfo for unknown site', () => {
      const info = service.getSiteInfoFromName('Unknown');
      expect(info).toBeInstanceOf(SiteInfo);
      expect(info.name).toBe('Unknown Site');
      expect(info.description).toBe('No description available.');
      expect(info.mapURL).toBe('https://www.google.com/maps');
    });

    it('should return default SiteInfo for null', () => {
      const info = service.getSiteInfoFromName(null);
      expect(info).toBeInstanceOf(SiteInfo);
      expect(info.name).toBe('Unknown Site');
      expect(info.description).toBe('No description available.');
      expect(info.mapURL).toBe('https://www.google.com/maps');
    });
  });

  describe('getSuppportedSites', () => {
    const mockToken = 'mock-token';
    const mockSites = ['Graig Fatha', 'Kirk Hill', 'Derril Water'];

    beforeEach(() => {
      mockUserService.getAccessTokenSilently$.mockReturnValue(of(mockToken));
      mockHttp.get.mockReturnValue(of(mockSites));
    });

    it('should get auth token and make HTTP request with correct headers', (done) => {
      service.getSuppportedSites().subscribe(result => {
        expect(mockUserService.getAccessTokenSilently$).toHaveBeenCalled();
        expect(mockHttp.get).toHaveBeenCalledWith(expect.stringContaining('/info/sites'), expect.any(Object));
        expect(result).toEqual(mockSites);
        done();
      });
    });

    it('should pass through the error if HTTP request fails', (done) => {
      const mockError = new Error('HTTP error');
      mockHttp.get.mockReturnValue(throwError(() => mockError));

      service.getSuppportedSites().subscribe({
        next: () => done.fail('Should have errored'),
        error: (error) => {
          expect(error).toBe(mockError);
          done();
        }
      });
    });

    it('should pass through the error if token acquisition fails', (done) => {
      const mockError = new Error('Token error');
      mockUserService.getAccessTokenSilently$.mockReturnValue(throwError(() => mockError));

      service.getSuppportedSites().subscribe({
        next: () => done.fail('Should have errored'),
        error: (error) => {
          expect(error).toBe(mockError);
          done();
        }
      });
    });
  });
});

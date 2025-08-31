import {TestBed} from '@angular/core/testing';

import {UserService} from './user.service';
import {AuthService} from '@auth0/auth0-angular';
import {of} from 'rxjs';
import {jwtDecode} from 'jwt-decode';

jest.mock('jwt-decode');

describe('UserService', () => {
  let service: UserService;
  let authServiceMock: any;

  beforeEach(() => {
    authServiceMock = {
      getAccessTokenSilently: jest.fn(),
      user$: of({ name: 'Test User' }),
      isAuthenticated$: true
    };
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceMock }
      ]
    });
    service = TestBed.inject(UserService);
  });

  describe('getAccessTokenSilently$', () => {
    it('should emit token', (done) => {
      authServiceMock.getAccessTokenSilently.mockReturnValue(of('token123'));
      service.getAccessTokenSilently$().subscribe(token => {
        expect(token).toBe('token123');
        done();
      });
    });
  });

  describe('getDecodedAccessToken$', () => {
    it('should decode valid token', (done) => {
      authServiceMock.getAccessTokenSilently.mockReturnValue(of('valid.jwt.token'));
      (jwtDecode as jest.Mock).mockReturnValue({sub: 'abc'});
      service.getDecodedAccessToken$().subscribe(decoded => {
        expect(decoded).toEqual({sub: 'abc'});
        done();
      });
    });

    it('should return null on decode error', (done) => {
      authServiceMock.getAccessTokenSilently.mockReturnValue(of('bad.token'));
      (jwtDecode as jest.Mock).mockImplementation(() => { throw new Error('bad'); });
      service.getDecodedAccessToken$().subscribe(decoded => {
        expect(decoded).toBeNull();
        done();
      });
    });

    it('should return null if token is undefined', (done) => {
      authServiceMock.getAccessTokenSilently.mockReturnValue(of(undefined));
      (jwtDecode as jest.Mock).mockImplementation(() => { throw new Error('bad'); });
      service.getDecodedAccessToken$().subscribe(decoded => {
        expect(decoded).toBeNull();
        done();
      });
    });

    it('should return null if token is empty string', (done) => {
      authServiceMock.getAccessTokenSilently.mockReturnValue(of(''));
      (jwtDecode as jest.Mock).mockImplementation(() => { throw new Error('bad'); });
      service.getDecodedAccessToken$().subscribe(decoded => {
        expect(decoded).toBeNull();
        done();
      });
    });
  });

  describe('retrieveUser', () => {
    it('should set user property', (done) => {
      service.retrieveUser();
      setTimeout(() => {
        expect(service['user']).toEqual({ name: 'Test User' });
        done();
      }, 0);
    });

    it('should not set user property if not authenticated', (done) => {
      authServiceMock.isAuthenticated$ = false;
      service = TestBed.inject(UserService); // re-inject to use new mock value
      service.retrieveUser();
      setTimeout(() => {
        expect(service['user']).toBeNull();
        done();
      }, 0);
    });
  });
});

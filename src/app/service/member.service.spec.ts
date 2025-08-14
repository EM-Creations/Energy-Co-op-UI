import {TestBed} from '@angular/core/testing';

import {MemberService} from './member.service';
import {UserService} from './user.service';
import {of} from 'rxjs';
import {HttpClient} from '@angular/common/http';

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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import {TestBed} from '@angular/core/testing';
import {AdminService} from './admin.service';
import {HttpClient} from '@angular/common/http';
import {UserService} from './user.service';
import {of} from 'rxjs';
import {SavingsRateUpdate} from '../model/SavingsRateUpdate';
import {SavingsRate} from '../model/SavingsRate';

describe('AdminService', () => {
  let service: AdminService;
  let httpClientMock;
  let userServiceMock;

  beforeEach(() => {
    httpClientMock = {
      post: jest.fn(),
    };

    userServiceMock = {
      getAccessTokenSilently$: jest.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        AdminService,
        { provide: HttpClient, useValue: httpClientMock },
        { provide: UserService, useValue: userServiceMock }
      ]
    });
    service = TestBed.inject(AdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setSavingsRate', () => {
    it('should make authenticated POST request with correct payload', (done) => {
      const mockToken = 'test-token-123';
      const mockPayload: SavingsRateUpdate = {
        site: '123',
        effectiveDate: '',
        ratePerKWH: 0.15
      };
      const mockResponse: SavingsRate = {
        id: '1',
        site: '123',
        effectiveDate: new Date(),
        ratePerKWH: 0.15,
        createdAt: new Date()
      };

      userServiceMock.getAccessTokenSilently$.mockReturnValue(of(mockToken));
      httpClientMock.post.mockReturnValue(of(mockResponse));

      service.setSavingsRate(mockPayload).subscribe(response => {
        expect(userServiceMock.getAccessTokenSilently$).toHaveBeenCalled();
        expect(httpClientMock.post).toHaveBeenCalledWith(expect.stringContaining('/admin/savings-rate'), expect.any(Object), expect.any(Object));
        expect(response).toEqual(mockResponse);
        done();
      });
    });
  });
});

import {ComponentFixture, TestBed} from '@angular/core/testing';
import {of} from 'rxjs';

import {AuthButtonComponent} from './auth-button.component';
import {AuthService} from '@auth0/auth0-angular';
import {UserService} from '../../service/user.service';

describe('AuthButtonComponent', () => {
  let component: AuthButtonComponent;
  let fixture: ComponentFixture<AuthButtonComponent>;
  let mockAuthService: any;
  let mockUserService: any;

  beforeEach(async () => {
    mockAuthService = {
      loginWithRedirect: jest.fn(() => of({}))
    };
    mockUserService = {
      retrieveUser: jest.fn()
    };
    await TestBed.configureTestingModule({
      imports: [AuthButtonComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: UserService, useValue: mockUserService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('handleLogin', () => {
    it('should call loginWithRedirect and retrieveUser', () => {
      component.handleLogin();
      expect(mockAuthService.loginWithRedirect).toHaveBeenCalled();
      expect(mockUserService.retrieveUser).toHaveBeenCalled();
    });
  });

  describe('component creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
});

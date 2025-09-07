import {ComponentFixture, TestBed} from '@angular/core/testing';
import {LeftNavComponent} from './left-nav.component';
import {provideRouter} from '@angular/router';
import {AuthService} from '@auth0/auth0-angular';
import {UserService} from '../../service/user.service';
import {Subject} from 'rxjs';

describe('LeftNavComponent', () => {
  let component: LeftNavComponent;
  let fixture: ComponentFixture<LeftNavComponent>;
  let mockAuthService: any;
  let mockUserService: any;
  let isAuthenticatedSubject: Subject<boolean>;
  let hasPermissionSubject: Subject<boolean>;

  beforeEach(async () => {
    isAuthenticatedSubject = new Subject<boolean>();
    hasPermissionSubject = new Subject<boolean>();

    mockAuthService = {
      isAuthenticated$: isAuthenticatedSubject.asObservable()
    };
    mockUserService = {
      hasPermission$: jest.fn().mockReturnValue(hasPermissionSubject.asObservable())
    };

    await TestBed.configureTestingModule({
      imports: [LeftNavComponent],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: mockAuthService },
        { provide: UserService, useValue: mockUserService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeftNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set isAuthenticated when auth emits', () => {
      isAuthenticatedSubject.next(true);
      expect(component.isAuthenticated).toBe(true);
      isAuthenticatedSubject.next(false);
      expect(component.isAuthenticated).toBe(false);
    });

    it('should set canViewGraigFatha when userService emits', () => {
      hasPermissionSubject.next(true);
      expect(component.canViewGraigFatha).toBe(true);
      hasPermissionSubject.next(false);
      expect(component.canViewGraigFatha).toBe(false);
    });
  });

  describe('showGraigFathaLink', () => {
    it('should return true only if both isAuthenticated and canViewGraigFatha are true', () => {
      component.isAuthenticated = false;
      component.canViewGraigFatha = false;
      expect(component.showGraigFathaLink).toBe(false);

      component.isAuthenticated = true;
      component.canViewGraigFatha = false;
      expect(component.showGraigFathaLink).toBe(false);

      component.isAuthenticated = false;
      component.canViewGraigFatha = true;
      expect(component.showGraigFathaLink).toBe(false);

      component.isAuthenticated = true;
      component.canViewGraigFatha = true;
      expect(component.showGraigFathaLink).toBe(true);
    });
  });
});

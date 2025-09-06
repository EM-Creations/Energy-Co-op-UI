import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StatsComponent} from './stats.component';
import {ActivatedRoute, provideRouter} from '@angular/router';
import {of} from 'rxjs';
import {AuthService} from '@auth0/auth0-angular';
import {InjectionToken} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SiteInfoService} from '../service/site-info.service';
import {MemberService} from '../service/member.service';
import {UserService} from '../service/user.service';

describe('StatsComponent', () => {
  let component: StatsComponent;
  let fixture: ComponentFixture<StatsComponent>;
  let mockRoute: any;
  let mockSiteInfoService: any;
  let mockMemberService: any;
  let mockAuthService: any;
  let mockUserService: any;
  let httpClient;
  const AUTH0_CLIENT = new InjectionToken('auth0.client');

  beforeEach(async () => {
    httpClient = {
      get: jest.fn(),
      post: jest.fn()
    };

    mockRoute = { snapshot: { paramMap: { get: jest.fn().mockReturnValue('Graig Fatha') } } };
    mockSiteInfoService = { getSiteInfoFromName: jest.fn().mockReturnValue({ name: 'Graig Fatha' }) };
    mockMemberService = {
      getTodaySavings: jest.fn().mockReturnValue(of({ amount: 42 })),
      getHistoricalSavings: jest.fn().mockReturnValue(of([
        { amount: 10, to: new Date().toISOString() },
        { amount: 20, to: new Date(Date.now() - 86400000).toISOString() }
      ]))
    };
    mockAuthService = {
      isAuthenticated$: true,
      user$: of({ ownerships: { 'gf-wattage': 123, 'kh-wattage': 456, 'dw-wattage': 789 } })
    };
    mockUserService = {};

    await TestBed.configureTestingModule({
      imports: [StatsComponent],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: AUTH0_CLIENT },
        { provide: HttpClient, useValue: httpClient },
        { provide: ActivatedRoute, useValue: mockRoute },
        { provide: SiteInfoService, useValue: mockSiteInfoService },
        { provide: MemberService, useValue: mockMemberService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: UserService, useValue: mockUserService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set siteName and siteInfo', () => {
      expect(component['siteName']).toBe('Graig Fatha');
      expect(component['siteInfo']).toEqual({ name: 'Graig Fatha' });
    });

    it('should set savingsToday from memberService', () => {
      expect(component['savingsToday']).toBe(42);
    });

    it('should set savingsLast30Days and barChartData from historical savings', () => {
      expect(component['savingsLast30Days']).toBe(30);
      expect(component['barChartData'].labels?.length).toBe(2);
      expect(component['barChartData'].datasets[0].data).toEqual([20, 10]);
      expect(component['barChartData'].datasets[0].label).toBe('Savings');
    });
  });

  describe('setOwnershipForSite', () => {
    it('should set ownership for Graig Fatha', (done) => {
      component['siteName'] = 'Graig Fatha';
      component.setOwnershipForSite();
      setTimeout(() => {
        expect(component['ownership']).toBe(123);
        done();
      }, 0);
    });

    it('should set ownership for Kirk Hill', (done) => {
      component['siteName'] = 'Kirk Hill';
      component.setOwnershipForSite();
      setTimeout(() => {
        expect(component['ownership']).toBe(456);
        done();
      }, 0);
    });

    it('should set ownership for Derril Water', (done) => {
      component['siteName'] = 'Derril Water';
      component.setOwnershipForSite();
      setTimeout(() => {
        expect(component['ownership']).toBe(789);
        done();
      }, 0);
    });

    it('should set ownership to 0 for unknown site', (done) => {
      component['siteName'] = 'Unknown';
      component.setOwnershipForSite();
      setTimeout(() => {
        expect(component['ownership']).toBe(0);
        done();
      }, 0);
    });
  });

  describe('barChartOptions', () => {
    it('should format y-axis ticks with £ symbol', () => {
      const callback = component['barChartOptions'].scales!.y!.ticks!.callback!;
      expect(typeof callback).toBe('function');
      expect(callback(100)).toBe('£100');
    });
    it('should format tooltip label with savingsRate present', () => {
      component['barChartSavingsRates'] = [0.1234];
      const context: any = {
        dataIndex: 0,
        parsed: { y: 10 }
      };
      const callback = component['barChartOptions'].plugins!.tooltip!.callbacks!.label!;
      expect(typeof callback).toBe('function');
      const label = callback(context);
      expect(label).toContain('£10.00');
      expect(label).toContain('12.34p/kWh');
    });
    it('should format tooltip label with savingsRate undefined', () => {
      component['barChartSavingsRates'] = [undefined];
      const context: any = {
        dataIndex: 0,
        parsed: { y: 5 }
      };
      const callback = component['barChartOptions'].plugins!.tooltip!.callbacks!.label!;
      expect(typeof callback).toBe('function');
      const label = callback(context);
      expect(label).toContain('£5.00');
      expect(label).toContain('N/A');
    });
  });

  describe('ngOnInit edge cases', () => {
    it('should handle missing savingsRate in historical savings', () => {
      mockMemberService.getHistoricalSavings = jest.fn().mockReturnValue(of([
        { amount: 10, to: new Date().toISOString() },
        { amount: 20, to: new Date(Date.now() - 86400000).toISOString(), savingsRate: 0.2 }
      ]));
      component.ngOnInit();
      // barChartSavingsRates should have [undefined, 0.2]
      setTimeout(() => {
        expect(component['barChartSavingsRates'][0]).toBeUndefined();
        expect(component['barChartSavingsRates'][1]).toBe(0.2);
      }, 0);
    });
  });
});

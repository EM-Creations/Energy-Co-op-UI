import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DirectorAlertsComponent} from './director-alerts.component';
import {SiteInfoService} from '../../service/site-info.service';
import {AlertsService} from '../../service/alerts.service';
import {of, throwError} from 'rxjs';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSortModule, Sort} from '@angular/material/sort';

describe('DirectorAlertsComponent', () => {
  let component: DirectorAlertsComponent;
  let fixture: ComponentFixture<DirectorAlertsComponent>;
  let mockSiteInfoService: jest.Mocked<SiteInfoService>;
  let mockAlertsService: jest.Mocked<AlertsService>;

  const mockSites = ['Site 1', 'Site 2'];
  const mockAlerts = [
    { createdAt: '2025-10-26T10:00:00Z', message: 'Alert 1', site: 'Site 1' },
    { createdAt: '2025-10-26T11:00:00Z', message: 'Alert 2', site: 'Site 1' }
  ];

  beforeEach(async () => {
    mockSiteInfoService = {
      getSuppportedSites: jest.fn().mockReturnValue(of(mockSites))
    } as any;

    mockAlertsService = {
      getAlerts: jest.fn().mockReturnValue(of(mockAlerts))
    } as any;

    await TestBed.configureTestingModule({
      imports: [
        DirectorAlertsComponent,
        MatTableModule,
        MatTabsModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatSortModule
      ],
      providers: [
        { provide: SiteInfoService, useValue: mockSiteInfoService },
        { provide: AlertsService, useValue: mockAlertsService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DirectorAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load sites on init', () => {
    expect(mockSiteInfoService.getSuppportedSites).toHaveBeenCalled();
    // Access protected sites through the template
    const tabLabels = fixture.debugElement.queryAll(By.css('mat-tab')).map(el => el.attributes['label']);
    setTimeout(() => {
      expect(tabLabels).toEqual(mockSites);
    }, 1000);
  });

  it('should load alerts for each site', () => {
    expect(mockAlertsService.getAlerts).toHaveBeenCalledWith('Site 1');
    expect(mockAlertsService.getAlerts).toHaveBeenCalledWith('Site 2');
    // Check if the tables exist for each site
    const tables = fixture.debugElement.queryAll(By.css('mat-table'));
    setTimeout(() => {
      expect(tables.length).toBe(2);
    }, 1000);
  });

  it('should handle errors when loading sites', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    mockSiteInfoService.getSuppportedSites.mockReturnValue(throwError(() => new Error('Test error')));

    component.ngOnInit();

    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('should filter alerts correctly', () => {
    const event = { target: { value: 'Alert 1' } } as any;
    component.applyFilter(event, 'Site 1');

    expect(component.alertsBySite['Site 1'].filter).toBe('alert 1');
    expect(component.alertsBySite['Site 1'].filteredData.length).toBe(1);
  });

  it('should sort alerts correctly', () => {
    const sort: Sort = { active: 'createdAt', direction: 'desc' };
    component.sortData(sort, 'Site 1');

    const sortedData = component.alertsBySite['Site 1'].data;
    expect(new Date(sortedData[0].createdAt).getTime())
      .toBeGreaterThan(new Date(sortedData[1].createdAt).getTime());
  });

  it('should handle empty sort direction', () => {
    const originalData = [...component.alertsBySite['Site 1'].data];
    const sort: Sort = { active: 'createdAt', direction: '' };

    component.sortData(sort, 'Site 1');

    expect(component.alertsBySite['Site 1'].data).toEqual(originalData);
  });
});

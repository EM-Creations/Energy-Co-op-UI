import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StatsComponent} from './stats.component';
import {provideRouter} from '@angular/router';
import {GraigFathaSiteDataService} from '../service/impl/graig-fatha-site-data.service';
import {of} from 'rxjs';

describe('StatsComponent', () => {
  let component: StatsComponent;
  let fixture: ComponentFixture<StatsComponent>;
  let siteDataService;

  beforeEach(async () => {
    siteDataService = {
      getTodayGenerationWatts: jest.fn()
    };

    siteDataService.getTodayGenerationWatts.mockReturnValue(of(null));

    await TestBed.configureTestingModule({
      imports: [StatsComponent],
      providers: [
        provideRouter([]),

        { provide: GraigFathaSiteDataService, useValue: siteDataService }
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
});
